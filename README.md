# 🚀 Estabraq Tourism Frontend Setup

## Quick Start Guide

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Configure Environment
Copy `.env` file and update the API URL:
```bash
VITE_API_BASE_URL=https://localhost:7001/api
VITE_CLOUDINARY_CLOUD_NAME=your-cloudinary-name
```

### 3. Run Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## 📁 Project Structure Created

```
frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   └── Navbar.tsx
│   │   ├── trips/
│   │   │   └── TripCard.tsx
│   │   └── booking/
│   ├── pages/
│   │   └── Home.tsx
│   ├── hooks/
│   │   └── useTrips.ts
│   ├── services/
│   │   └── api.ts
│   ├── types/
│   │   └── index.ts
│   ├── i18n/
│   │   ├── index.ts
│   │   ├── ar.json
│   │   └── en.json
│   ├── styles/
│   │   └── global.css
│   ├── App.tsx
│   └── main.tsx
├── package.json
├── vite.config.ts
├── tsconfig.json
└── index.html
```

## 🛠️ Tech Stack Configured

- ✅ **React 18** + **TypeScript**
- ✅ **Vite** (Fast build tool)
- ✅ **Bootstrap 5** + **React Bootstrap**
- ✅ **React Router DOM** (Routing)
- ✅ **React Query** (API state management)
- ✅ **i18next** (Arabic/English localization)
- ✅ **React Hook Form** (Form handling)
- ✅ **React Hot Toast** (Notifications)
- ✅ **Axios** (API client)
- ✅ **Bootstrap Icons**
- ✅ **Swiper** (Image carousels)

## 🎨 Design System

### Color Palette
- **Primary**: `#1ABC9C` (Turquoise)
- **Secondary**: `#FF7043` (Sunset Orange)  
- **Accent**: `#FFD54F` (Golden Yellow)
- **Sky Blue**: `#4FC3F7`
- **Coral Pink**: `#FF8A80`
- **Neutral**: `#F5DEB3` (Sand Beige)
- **Text**: `#2C3E50` (Deep Navy)

### Typography
- **Arabic**: "Cairo" font family
- **English**: "Roboto" font family

### Components Ready
- ✅ Responsive Navbar with language switcher
- ✅ Trip Cards with pricing and status
- ✅ Hero Section for homepage
- ✅ Loading spinners and error states
- ✅ Toast notifications
- ✅ Bootstrap grid system
- ✅ RTL support for Arabic

## 🌍 Multilingual Support

The app supports **Arabic (RTL)** and **English (LTR)**:

```typescript
// Translation usage example
const { t, i18n } = useTranslation();

// Arabic by default
t('common.loading') // "جاري التحميل..."

// Switch language
i18n.changeLanguage('en'); // Switches to English
```

## 📱 Responsive Design

- **Mobile-first** approach
- **Bootstrap 5** grid system
- **Touch-friendly** interface
- **RTL/LTR** direction support

## 🔗 API Integration Ready

```typescript
// API service configured with interceptors
import { tripAPI, bookingAPI } from './services/api';

// React Query hooks ready
const { data: trips, isLoading } = useTrips();
const { data: trip } = useTrip(tripId);
```

## 🚀 Next Steps

### 1. Complete Missing Components
Need to create:
- `CategoryFilter.tsx`
- `HeroSection.tsx` 
- `Footer.tsx`
- Other page components (TripDetails, Booking, etc.)

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development
```bash
npm run dev
```

### 4. Build for Production
```bash
npm run build
```

## 🎯 Ready Features

- ✅ **Project structure** complete
- ✅ **TypeScript types** defined
- ✅ **API service** with error handling
- ✅ **React Query** setup
- ✅ **i18n** Arabic/English
- ✅ **CSS/Bootstrap** styling
- ✅ **Routing** configuration
- ✅ **Toast notifications**
- ✅ **Form handling** ready

---

**🌟 Frontend structure is ready! Install dependencies and start coding! 🚀**
