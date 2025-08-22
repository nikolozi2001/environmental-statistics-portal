# Environmental Statistics Portal

A multilingual React application for environmental statistics and data visualization with support for Georgian (ქარ) and English (EN) languages.

## 🌟 Features

- **🌍 Multilingual Support**: Switch between Georgian and English
- **🚀 Modern Tech Stack**: React 19, Vite, Material-UI, Tailwind CSS
- **📱 Responsive Design**: Mobile-first responsive design
- **🔄 Dynamic Routing**: Language-aware routing system
- **🎨 Beautiful UI**: Material-UI components with Tailwind CSS styling
- **📊 Data Visualization**: Gender statistics and regional comparisons
- **⚡ Hot Module Reload**: Fast development with Vite

## 🛠️ Tech Stack

- **Frontend**: React 19, JavaScript (ES6+)
- **Routing**: React Router DOM v6
- **Styling**: Material-UI + Tailwind CSS
- **Notifications**: React Hot Toast
- **Build Tool**: Vite
- **Development**: ESLint for code quality

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── Header.jsx       # Navigation header with language switcher
│   └── RegionComp.jsx   # Region comparison component
├── pages/               # Page components
│   ├── Dashboard.jsx    # Main dashboard
│   ├── AdminPanel.jsx   # Admin interface
│   ├── GenderStatistics.jsx  # Gender statistics page
│   ├── MunicipalComp.jsx     # Municipal comparison
│   └── RegionDetail.jsx      # Region detail view
├── contexts/            # React contexts for state management
│   ├── languageContext.js    # Language context definition
│   ├── LanguageContext.jsx   # Language provider component
│   ├── useLanguage.js        # Language hook
│   └── index.js              # Barrel exports
└── assets/              # Static assets
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in terminal)

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## 🌍 Language Routing

The application supports automatic language routing:

- **Default**: `/` → redirects to `/ge` (Georgian)
- **Georgian routes**: `/ge/*` (e.g., `/ge/gender-statistics`)
- **English routes**: `/en/*` (e.g., `/en/gender-statistics`)

### Supported Routes

| Georgian | English | Description |
# Frontend — Environmental Statistics Portal

This folder contains the React frontend for the Environmental Statistics Portal. It is a small multilingual app (Georgian + English) built with Vite.

## Quick start

1. Change into the frontend directory:

```bash
cd frontend
```

2. Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

3. Open the URL printed in the terminal (usually http://localhost:5173).

## Scripts

- `npm run dev` — start development server
- `npm run build` — production build
- `npm run preview` — preview production build locally
- `npm run lint` — run ESLint

## Project layout (important files)

- `src/main.jsx` — app entry
- `src/App.jsx` — routes and top-level layout
- `src/components/Header.jsx` — header and language switcher
- `src/contexts/` — language context and hooks
- `src/pages/Dashboard.jsx` — main dashboard
- `public/` — static assets

## Language routing

The app uses language-aware routes. Examples:

- `/ge` — Georgian home
- `/en` — English home
- `/ge/gender-statistics` and `/en/gender-statistics` — gender stats

The header contains a language switcher that keeps the selected language across navigation.

## Notes for contributors

- Follow the existing contexts pattern when adding language-aware content.
- Keep components small and prefer Tailwind classes for layout; use Material UI for complex widgets.

If you want, I can also add a short CONTRIBUTING.md, or wire up a simple GitHub Action for linting on push.

---

MIT License — see `../LICENSE`
