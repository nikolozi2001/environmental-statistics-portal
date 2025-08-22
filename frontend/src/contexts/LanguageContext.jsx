import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LanguageContext } from './languageContext';

export function LanguageProvider({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Extract language from URL path
  const getLanguageFromPath = useCallback(() => {
    const pathSegments = location.pathname.split('/');
    const langSegment = pathSegments[1];
    return ['ge', 'en'].includes(langSegment) ? langSegment : 'ge';
  }, [location.pathname]);

  const [language, setLanguage] = useState(getLanguageFromPath());

  // Update language when location changes
  useEffect(() => {
    const newLang = getLanguageFromPath();
    if (newLang !== language) {
      setLanguage(newLang);
    }
  }, [getLanguageFromPath, language]);

  const changeLanguage = (newLang) => {
    if (newLang === language) return;
    
    // Replace the language part in the current path
    const pathSegments = location.pathname.split('/');
    pathSegments[1] = newLang;
    const newPath = pathSegments.join('/');
    
    navigate(newPath, { replace: true });
    setLanguage(newLang);
  };

  const value = {
    language,
    changeLanguage,
    isGeorgian: language === 'ge',
    isEnglish: language === 'en'
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}
