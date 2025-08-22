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
|----------|---------|-------------|
| `/ge` | `/en` | Dashboard |
| `/ge/gender-statistics` | `/en/gender-statistics` | Gender Statistics |
| `/ge/region-comparison` | `/en/region-comparison` | Region Comparison |
| `/ge/municipal-comparison` | `/en/municipal-comparison` | Municipal Comparison |
| `/ge/region/:id` | `/en/region/:id` | Region Detail |
| `/ge/admin` | `/en/admin` | Admin Panel |

## 🔧 Development

### Language Context

The application uses React Context for language management:

```jsx
import { useLanguage } from './contexts/useLanguage';

const MyComponent = () => {
  const { language, changeLanguage, isGeorgian } = useLanguage();
  
  return (
    <div>
      <p>{isGeorgian ? 'ქართული' : 'English'}</p>
      <button onClick={() => changeLanguage('en')}>Switch to English</button>
    </div>
  );
};
```

### Adding New Pages

1. Create component in `src/pages/`
2. Add routes in `App.jsx` for both languages
3. Update navigation in `Header.jsx`

### Styling Guidelines

- Use Tailwind CSS for layout and spacing
- Use Material-UI for complex components
- Follow mobile-first responsive design
- Maintain consistent color scheme

## 📦 Dependencies

### Core Dependencies
- `react` & `react-dom` - React framework
- `react-router-dom` - Client-side routing
- `@mui/material` - Material-UI components
- `@emotion/react` & `@emotion/styled` - CSS-in-JS styling
- `react-hot-toast` - Toast notifications
- `tailwindcss` - Utility-first CSS framework

### Development Dependencies
- `vite` - Build tool and dev server
- `eslint` - Code linting
- `@vitejs/plugin-react-swc` - React plugin for Vite

## 🚢 Deployment

### Build for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

### Deploy to Vercel

1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically on push

### Deploy to Netlify

1. Run `npm run build`
2. Upload `dist/` folder to Netlify
3. Configure redirects for SPA routing

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👥 Authors

- **Your Name** - *Initial work*

## 🙏 Acknowledgments

- Material-UI team for excellent component library
- Tailwind CSS for utility-first styling approach
- Vite team for blazing fast build tool
- React team for the amazing framework
