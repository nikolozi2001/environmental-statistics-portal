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
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <Routes>
                {/* Default redirect to Georgian */}
                <Route path="/" element={<Navigate to="/ge" replace />} />

                {/* Language-specific routes */}
                <Route path="/ge" element={<Dashboard />} />
                <Route path="/en" element={<Dashboard />} />

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
