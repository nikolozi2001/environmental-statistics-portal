# Environmental Statistics Portal - Georgia 🇬🇪

A modern, interactive web application for monitoring and visualizing Georgia's environmental data. This application provides comprehensive insights into air quality, climate, water resources, biodiversity, and more.

## 🌟 Features

### 📊 Interactive Data Visualization

- **ECharts Integration**: Beautiful, responsive charts and graphs
- **Real-time Data**: Live environmental monitoring
- **Interactive Maps**: Geographic data visualization
- **Trend Analysis**: Historical data trends and patterns

### 🌍 Environmental Categories

- **Air Quality**: AQI monitoring, emissions tracking, ozone levels
- **Climate**: Temperature trends, precipitation data, seasonal analysis
- **Water Resources**: Quality monitoring, reservoir levels, usage statistics
- **Nature & Biodiversity**: Forest coverage, protected areas, species tracking
- **Transport & Energy**: Vehicle statistics, energy consumption, renewable sources
- **Waste Management**: Composition analysis, recycling rates, disposal methods
- **Economic Accounts**: Environmental economic indicators, material flows
- **Wildlife & Rural**: Animal populations, rural land use, migration patterns

### 🎨 Modern Design

- **Glassmorphism UI**: Modern, translucent design elements
- **Responsive Layout**: Mobile-first, adaptive design
- **Smooth Animations**: Framer Motion powered transitions
- **Gradient Backgrounds**: Beautiful color schemes for each category
- **Dark/Light Support**: Automatic theme adaptation

### 🌐 Bilingual Support

- **Georgian (ქართული)**: Full native language support
- **English**: Complete international accessibility
- **Dynamic Translation**: Real-time language switching
- **Cultural Adaptation**: Localized content and formatting

## 🚀 Technology Stack

### Frontend

- **React 19**: Latest React with modern features
- **Vite**: Lightning-fast build tool and dev server
- **TypeScript**: Type-safe development
- **Tailwind CSS 4**: Modern utility-first CSS framework
- **Material-UI**: Pre-built React components
- **ECharts**: Professional data visualization library
- **Framer Motion**: Smooth animations and transitions
- **React Router**: Client-side routing
- **Lucide React**: Beautiful icon library

### Development Tools

- **ESLint**: Code linting and formatting
- **Vite**: Modern build tool
- **Hot Reload**: Real-time development updates

## 📦 Installation & Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd environment
   ```

2. **Install dependencies**

   ```bash
   cd frontend
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

## 🏗️ Project Structure

```
environment/
├── frontend/
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   │   ├── Header.jsx       # Navigation header
│   │   │   └── HeroSection.jsx  # Landing page hero
│   │   ├── pages/               # Main application pages
               nature/ForestArea.jsx
│   │   │   ├── Dashboard.jsx    # Main dashboard
│   │   │   ├── AirQuality.jsx   # Air quality monitoring
│   │   │   ├── Climate.jsx      # Climate data visualization
│   │   │   ├── WaterResources.jsx # Water management
│   │   │   ├── Nature.jsx       # Biodiversity tracking
│   │   │   ├── TransportEnergy.jsx # Transport & energy
│   │   │   ├── Waste.jsx        # Waste management
│   │   │   ├── EconomicAccounts.jsx # Economic indicators
│   │   │   └── Others.jsx       # Rural & wildlife data
│   │   ├── contexts/            # React context providers
│   │   │   └── LanguageContext.jsx # Internationalization
│   │   ├── assets/              # Static assets
│   │   │   └── images/          # Logos and flags
│   │   └── App.jsx              # Main application component
│   ├── public/                  # Public assets
│   ├── package.json             # Dependencies and scripts
│   └── vite.config.js           # Vite configuration
└── README.md                    # Project documentation
```

## 📱 Pages & Features

### 🏠 Dashboard

- **Overview Metrics**: Key environmental indicators
- **Real-time Updates**: Latest monitoring data
- **Quick Navigation**: Access to all categories
- **News & Analysis**: Recent environmental updates

### 🌫️ Air Quality

- **AQI Monitoring**: Real-time air quality index
- **City Comparison**: Multi-city air quality data
- **Emission Sources**: Pollutant source breakdown
- **Health Recommendations**: Safety guidelines

### 🌡️ Climate

- **Temperature Trends**: Historical and current data
- **Precipitation Analysis**: Rainfall and snow data
- **Seasonal Patterns**: Weather pattern analysis
- **Climate Zones**: Regional climate classification

### 💧 Water Resources

- **Quality Monitoring**: Water purity indicators
- **Reservoir Levels**: Water storage capacity
- **Usage Statistics**: Consumption by sector
- **Treatment Plants**: Infrastructure overview

### 🌿 Nature & Biodiversity

- **Forest Coverage**: Woodland area tracking
- **Protected Areas**: Conservation zone data
- **Species Diversity**: Flora and fauna statistics
- **National Parks**: Protected area information

### 🚛 Transport & Energy

- **Vehicle Statistics**: Registration and usage data
- **Energy Sources**: Power generation breakdown
- **Renewable Growth**: Clean energy progress
- **Infrastructure**: Charging stations and facilities

### 🗑️ Waste Management

- **Composition Analysis**: Waste type breakdown
- **Disposal Methods**: Treatment and recycling
- **Recycling Trends**: Sustainability progress
- **Facility Management**: Infrastructure overview

### 📊 Economic Accounts

- **Material Flows**: Resource input/output analysis
- **Economic Impact**: GDP vs environmental impact
- **Resource Efficiency**: Productivity indicators
- **Natural Capital**: Environmental asset valuation

### 🦅 Wildlife & Rural

- **Wildlife Population**: Animal count and trends
- **Rural Land Use**: Agricultural land analysis
- **Bird Migration**: Seasonal movement patterns
- **Conservation Programs**: Protection initiatives

## 🎯 Key Features Detail

### Interactive Charts

- **Line Charts**: Trend visualization over time
- **Pie Charts**: Composition and distribution data
- **Bar Charts**: Comparative analysis
- **Scatter Plots**: Correlation analysis
- **Area Charts**: Cumulative data visualization

### Responsive Design

- **Mobile Optimized**: Touch-friendly interface
- **Tablet Support**: Medium screen adaptation
- **Desktop Enhanced**: Full feature access
- **Progressive Enhancement**: Graceful degradation

### Performance

- **Code Splitting**: Optimized loading
- **Lazy Loading**: On-demand resource loading
- **Caching**: Efficient data management
- **Compression**: Optimized asset delivery

## 🌐 Internationalization

### Language Support

- **Georgian (ge)**: `საქართველოს გარემოსდაცვითი სტატისტიკა`
- **English (en)**: `Georgia's Environmental Statistics`

### URL Structure

- `/{language}` - Dashboard
- `/{language}/air-quality` - Air Quality
- `/{language}/climate` - Climate Data
- `/{language}/water` - Water Resources
- `/{language}/nature` - Nature & Biodiversity
- `/{language}/transport-energy` - Transport & Energy
- `/{language}/waste` - Waste Management
- `/{language}/economic-accounts` - Economic Accounts
- `/{language}/others` - Wildlife & Rural

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Preview Build

```bash
npm run preview
```

### Environment Variables

```env
VITE_API_URL=your_api_endpoint
VITE_APP_TITLE=Environmental Statistics Portal
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and questions:

- Create an issue on GitHub
- Contact the development team
- Check the documentation

## 🙏 Acknowledgments

- **ECharts** - For powerful data visualization
- **Tailwind CSS** - For modern styling
- **Framer Motion** - For smooth animations
- **React Team** - For the excellent framework
- **Vite Team** - For the amazing build tool

---

**Built with ❤️ for Georgia's Environmental Future**
