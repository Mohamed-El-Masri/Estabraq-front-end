import { useState, useContext, createContext, useEffect, ReactNode } from 'react';
import { 
  authAPI, 
  LoginRequest, 
  RegisterRequest, 
  setAuthToken, 
  removeAuthToken, 
  getAuthToken 
} from '../services/estabraqAPI';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (credentials: LoginRequest) => Promise<{ success: boolean; message: string }>;
  register: (userData: RegisterRequest) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  loading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing auth data on app start
    const savedToken = getAuthToken();
    const savedUser = localStorage.getItem('user');
    
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
    
    setLoading(false);
  }, []);

  const login = async (credentials: LoginRequest): Promise<{ success: boolean; message: string }> => {
    try {
      setLoading(true);
      const response = await authAPI.login(credentials);
      
      if (response.success) {
        const { token: authToken, user: userData } = response.data;
        
        setToken(authToken);
        setUser(userData);
        setAuthToken(authToken);
        localStorage.setItem('user', JSON.stringify(userData));
        
        return { success: true, message: 'تم تسجيل الدخول بنجاح' };
      } else {
        return { success: false, message: response.message || 'فشل في تسجيل الدخول' };
      }
    } catch (error: any) {
      console.error('Login error:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || error.message || 'حدث خطأ أثناء تسجيل الدخول' 
      };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: RegisterRequest): Promise<{ success: boolean; message: string }> => {
    try {
      setLoading(true);
      const response = await authAPI.register(userData);
      
      if (response.success) {
        return { success: true, message: 'تم التسجيل بنجاح. يمكنك الآن تسجيل الدخول' };
      } else {
        return { success: false, message: response.message || 'فشل في التسجيل' };
      }
    } catch (error: any) {
      console.error('Register error:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || error.message || 'حدث خطأ أثناء التسجيل' 
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    removeAuthToken();
  };

  const value: AuthContextType = {
    user,
    token,
    login,
    register,
    logout,
    loading,
    isAuthenticated: !!user && !!token,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
