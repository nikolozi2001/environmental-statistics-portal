import React from 'react';
import { useLanguage } from '../contexts/useLanguage';

function Dashboard() {
  const { language, isGeorgian } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        {isGeorgian ? 'მთავარი გვერდი' : 'Dashboard'}
      </h1>
      <p className="text-lg text-gray-600">
        {isGeorgian 
          ? `მოგესალმებით მთავარ გვერდზე! მიმდინარე ენა: ${language}`
          : `Welcome to the Dashboard! Current language: ${language}`
        }
      </p>
    </div>
  );
}

export default Dashboard;
