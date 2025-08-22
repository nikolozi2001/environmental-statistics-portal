import React from 'react';
import { useLanguage } from '../contexts/useLanguage';

function RegionComp() {
  const { isGeorgian } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        {isGeorgian ? 'რეგიონული შედარება' : 'Region Comparison'}
      </h1>
      <p className="text-lg text-gray-600">
        {isGeorgian 
          ? 'რეგიონული შედარების ინფორმაცია'
          : 'Region comparison information'
        }
      </p>
    </div>
  );
}

export default RegionComp;
