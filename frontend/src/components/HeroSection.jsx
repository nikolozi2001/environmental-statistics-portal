import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/useLanguage";

const HeroSection = () => {
  const { language, isGeorgian } = useLanguage();

  const categories = [
    {
      icon: "🌫️",
      title: isGeorgian ? "ჰაერის ხარისხი" : "Air Quality",
      description: isGeorgian 
        ? "ემისიები, AQI და ოზონის სტატისტიკა" 
        : "Emissions, AQI and ozone statistics",
      link: `/${language}/air-quality`
    },
    {
      icon: "🌿",
      title: isGeorgian ? "ბუნება" : "Nature",
      description: isGeorgian 
        ? "დაცული ტერიტორიები, ტყეები, ბიომრავალფეროვნება" 
        : "Protected areas, forests, biodiversity",
      link: `/${language}/nature`
    },
    {
      icon: "💧",
      title: isGeorgian ? "წყლის რესურსები" : "Water Resources",
      description: isGeorgian 
        ? "გამოყენება, გაწმენდა, დანაკარგები" 
        : "Usage, purification, losses",
      link: `/${language}/water`
    },
    {
      icon: "🌡️",
      title: isGeorgian ? "კლიმატი" : "Climate",
      description: isGeorgian 
        ? "ტემპერატურისა და ნალექების ტენდენციები" 
        : "Temperature and precipitation trends",
      link: `/${language}/climate`
    },
    {
      icon: "🚛",
      title: isGeorgian ? "ტრანსპორტი და ენერგია" : "Transport & Energy",
      description: isGeorgian 
        ? "მანქანები, სატრანსპორტო მოთხოვნა, ენერგიის მოხმარება, განახლებადი რესურსები" 
        : "Vehicles, transport demand, energy consumption, renewable resources",
      link: `/${language}/transport-energy`
    },
    {
      icon: "📊",
      title: isGeorgian ? "გარემოს ეკონომიკური ანგარიშები" : "Environmental Economic Accounts",
      description: isGeorgian 
        ? "მატერიალური ნაკადების ანგარიშები" 
        : "Material flow accounts",
      link: `/${language}/economic-accounts`
    },
    {
      icon: "🗑️",
      title: isGeorgian ? "ნარჩენები" : "Waste",
      description: isGeorgian 
        ? "მუნიციპალური ნარჩენების განთავსება" 
        : "Municipal waste disposal",
      link: `/${language}/waste`
    },
    {
      icon: "📁",
      title: isGeorgian ? "სხვა" : "Others",
      description: isGeorgian 
        ? "სოფლის გარემოსდაცვითი ანგარიშები, გარეული ცხოველები და ფრინველები" 
        : "Rural environmental accounts, wildlife and birds",
      link: `/${language}/others`
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-700 via-green-600 to-blue-600 text-white py-16 md:py-24 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            {isGeorgian ? "აღმოაჩინე საქართველოს გარემო" : "Discover Georgia's Environment"}
          </h1>
          <p className="mb-8 text-xl md:text-2xl opacity-95 max-w-2xl mx-auto">
            {isGeorgian ? "გამჭვირვალე მონაცემები მდგრადი მომავლისთვის" : "Transparent data for a sustainable future"}
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-green-700 hover:bg-green-50 font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl">
              {isGeorgian ? "დაწყება" : "Get Started"}
            </button>
            <button className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-semibold py-3 px-8 rounded-lg transition-all duration-300">
              {isGeorgian ? "გაიგე მეტი" : "Learn More"}
            </button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            {isGeorgian ? "გარემოსდაცვითი მონაცემები" : "Environmental Data"}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {isGeorgian 
              ? "შეისწავლეთ საქართველოს გარემოსდაცვითი მდგომარეობა სხვადასხვა კატეგორიებში" 
              : "Explore Georgia's environmental status across various categories"}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div 
              key={index}
              className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col group"
            >
              <div className="text-4xl mb-4 transition-transform duration-300 group-hover:scale-110">
                {category.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800 group-hover:text-green-700 transition-colors">
                {category.title}
              </h3>
              <p className="text-sm text-gray-600 mb-4 flex-grow">
                {category.description}
              </p>
              <Link
                to={category.link}
                className="text-green-700 font-medium mt-auto inline-flex items-center gap-2 group-hover:gap-3 transition-all"
              >
                {isGeorgian ? "ნახვა" : "View"} 
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HeroSection;