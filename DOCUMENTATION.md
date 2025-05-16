# CMC Medical - Project Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Technical Stack](#technical-stack)
3. [Project Structure](#project-structure)
4. [Routing System](#routing-system)
5. [State Management](#state-management)
6. [Build & Deployment](#build--deployment)
7. [Development Workflow](#development-workflow)
8. [Troubleshooting](#troubleshooting)
9. [Future Improvements](#future-improvements)

## Project Overview

CMC Medical is a healthcare management platform built with React and Vite, featuring:
- Patient referral system
- Telemedicine interface
- Administrative dashboard
- Careers portal
- Service information pages

Key requirements that shaped the architecture:
- Client-side routing for seamless navigation
- Responsive design with Tailwind CSS
- State management for complex data flows
- Netlify deployment compatibility

## Technical Stack

### Core Technologies
- **React 18** (With hooks)
- **Vite 5** (Build tool)
- **React Router 6** (Client-side routing)
- **Redux Toolkit** (State management)
- **Tailwind CSS 3** (Styling)

### Supporting Libraries
- `framer-motion` for animations
- `react-icons` for iconography
- `echarts` for data visualization
- `date-fns` for date handling
- `xlsx` for Excel export functionality

## Project Structure

```
cmc-medical/
├── public/                  # Static assets
│   ├── _redirects           # Netlify routing rules
│   └── index.html           # Main HTML entry
├── src/
│   ├── components/          # Reusable components
│   │   ├── layout/          # Site-wide layout
│   │   ├── admin/           # Admin components
│   │   ├── hr/              # HR components
│   │   ├── referral/        # Referral system
│   │   └── telemedicine/    # Telemedicine features
│   ├── pages/               # Route-level components
│   ├── store/               # Redux store
│   │   ├── slices/          # Redux state slices
│   │   └── store.js         # Store configuration
│   ├── utils/               # Utility functions
│   ├── App.jsx              # Main app component
│   └── main.jsx             # React entry point
├── .gitignore
├── netlify.toml             # Netlify configuration
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js           # Build configuration
```

## Routing System

### Configuration
The app uses `HashRouter` for Netlify compatibility:

```jsx
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        {/* Other routes */}
      </Routes>
    </Router>
  );
}
```

### Key Routes
- `/` - Homepage
- `/services` - Services overview
- `/referral` - Patient referral system
- `/careers` - Job listings
- `/admin` - Administrative dashboard
- `/telemedicine` - Virtual care interface

## State Management

### Redux Toolkit Setup
Configured in `src/store/store.js`:

```js
import { configureStore } from '@reduxjs/toolkit';
import telemedicineReducer from './slices/telemedicineSlice';
// Other reducers...

export const store = configureStore({
  reducer: {
    telemedicine: telemedicineReducer,
    // Other state slices...
  },
});
```

### Slice Example
`telemedicineSlice.js` demonstrates RTK pattern:

```js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeChats: [],
  availableDoctors: [],
};

export const telemedicineSlice = createSlice({
  name: 'telemedicine',
  initialState,
  reducers: {
    // Action creators...
  },
});
```

## Build & Deployment

### Configuration Files

1. **vite.config.js** - Critical settings:
   ```js
   export default defineConfig({
     base: '/', // Essential for Netlify
     build: {
       outDir: 'dist',
       emptyOutDir: true,
     }
   });
   ```

2. **netlify.toml** - Deployment rules:
   ```toml
   [build]
   command = "npm run build"
   publish = "dist"
   ```

3. **package.json scripts**:
   ```json
   "scripts": {
     "dev": "vite",
     "build": "vite build",
     "serve": "vite preview",
     "deploy": "npm run build && netlify deploy --prod"
   }
   ```

### Deployment Process
1. Push changes to `main` branch
2. Netlify automatically:
   - Runs `npm run build`
   - Deploys from `dist` folder
   - Applies `_redirects` rules

## Development Workflow

### Getting Started
1. Install dependencies:
   ```bash
   npm install
   ```

2. Run development server:
   ```bash
   npm run dev
   ```

3. Access at `http://localhost:3000`

### Creating New Features
1. Add new route in `App.jsx`
2. Create page component in `src/pages/`
3. Create supporting components in `src/components/`
4. Add state management (if needed) in `src/store/slices/`

### Testing Before Deployment
```bash
npm run build
npm run serve
```
Visiting `http://localhost:4173` should match production behavior.

## Troubleshooting

### Common Issues

**Blank Page on Netlify**
1. Verify `base: '/'` in vite.config.js
2. Check for `_redirects` file in public folder
3. Ensure using `HashRouter`

**Build Failures**
1. Check Node version (recommended: 18+)
2. Verify all imports are correct
3. Examine Netlify build logs

**Routing Issues**
1. Confirm all route components exist
2. Check for typos in path definitions
3. Verify component exports are default

## Future Improvements

1. **Performance Optimization**
   - Implement code splitting for routes
   - Add lazy loading for heavy components

2. **Enhanced Features**
   - Real-time chat with WebSockets
   - PDF report generation
   - Advanced analytics dashboard

3. **Developer Experience**
   - Add Storybook for components
   - Implement Cypress for E2E testing
   - Setup CI/CD pipeline

4. **Accessibility**
   - Audit with axe-core
   - Improve keyboard navigation
   - Enhance ARIA attributes

This documentation provides a comprehensive overview while maintaining flexibility for future development. The architecture balances structure with adaptability, allowing new features to be added systematically.