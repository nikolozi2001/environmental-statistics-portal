import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Toaster } from "react-hot-toast";
import { LanguageProvider } from "./contexts/LanguageContext.jsx";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import AirQuality from "./pages/AirQuality";
import Climate from "./pages/Climate";
import WaterResources from "./pages/WaterResources";
import Nature from "./pages/Nature";
import TransportEnergy from "./pages/TransportEnergy";
import Waste from "./pages/Waste";
import EconomicAccounts from "./pages/EconomicAccounts";
import Others from "./pages/Others";
import "./App.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <LanguageProvider>
          <div className="App">
            <Header />
            <Toaster position="top-right" reverseOrder={false} />
            <main>
              <Routes>
                {/* Default redirect to Georgian */}
                <Route path="/" element={<Navigate to="/ge" replace />} />

                {/* Language-specific routes */}
                <Route path="/ge" element={<Dashboard />} />
                <Route path="/en" element={<Dashboard />} />
                
                {/* Air Quality routes */}
                <Route path="/ge/air-quality" element={<AirQuality />} />
                <Route path="/en/air-quality" element={<AirQuality />} />
                
                {/* Climate routes */}
                <Route path="/ge/climate" element={<Climate />} />
                <Route path="/en/climate" element={<Climate />} />
                
                {/* Water Resources routes */}
                <Route path="/ge/water" element={<WaterResources />} />
                <Route path="/en/water" element={<WaterResources />} />
                
                {/* Nature routes */}
                <Route path="/ge/nature" element={<Nature />} />
                <Route path="/en/nature" element={<Nature />} />
                
                {/* Transport & Energy routes */}
                <Route path="/ge/transport-energy" element={<TransportEnergy />} />
                <Route path="/en/transport-energy" element={<TransportEnergy />} />
                
                {/* Waste routes */}
                <Route path="/ge/waste" element={<Waste />} />
                <Route path="/en/waste" element={<Waste />} />
                
                {/* Economic Accounts routes */}
                <Route path="/ge/economic-accounts" element={<EconomicAccounts />} />
                <Route path="/en/economic-accounts" element={<EconomicAccounts />} />
                
                {/* Others routes */}
                <Route path="/ge/others" element={<Others />} />
                <Route path="/en/others" element={<Others />} />

                {/* Catch all other routes and redirect to Georgian */}
                <Route path="*" element={<Navigate to="/ge" replace />} />
              </Routes>
            </main>
          </div>
        </LanguageProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
