import React from "react";
import { useLanguage } from "../contexts/useLanguage";
import HeroSection from "../components/HeroSection";

function Dashboard() {
  const { isGeorgian } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Category Cards */}
      <HeroSection />

      {/* Additional Dashboard Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            {isGeorgian ? "რეალ-დროში მონიტორინგი" : "Real-time Monitoring"}
          </h2>
          <p className="text-lg text-gray-600">
            {isGeorgian
              ? "თვალყური ადევნეთ საქართველოს გარემოსდაცვით მაჩვენებლებს რეალურ დროში"
              : "Monitor Georgia's environmental indicators in real-time"}
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-green-600 mb-2">42.3</div>
            <div className="text-gray-600">
              {isGeorgian ? "AQI საშუალო" : "Average AQI"}
            </div>
            <div className="text-sm text-green-500 mt-1">
              ↓ 12% წლის განმავლობაში
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-blue-600 mb-2">78%</div>
            <div className="text-gray-600">
              {isGeorgian ? "სუფთა წყალი" : "Clean Water"}
            </div>
            <div className="text-sm text-blue-500 mt-1">
              ↑ 5% წლის განმავლობაში
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-amber-600 mb-2">9.2°C</div>
            <div className="text-gray-600">
              {isGeorgian ? "საშუალო ტემპერატურა" : "Average Temperature"}
            </div>
            <div className="text-sm text-amber-500 mt-1">
              ↑ 1.2°C 10 წელიწადში
            </div>
          </div>
        </div>

        {/* Recent Updates */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            {isGeorgian ? "ბოლო განახლებები" : "Recent Updates"}
          </h3>

          <div className="space-y-4">
            <div className="flex items-start">
              <div className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full mr-3">
                {isGeorgian ? "ახალი" : "New"}
              </div>
              <div>
                <h4 className="font-medium text-gray-800">
                  {isGeorgian
                    ? "2023 წლის ჰაერის ხარისხის ანგარიში"
                    : "2023 Air Quality Report"}
                </h4>
                <p className="text-sm text-gray-600">
                  {isGeorgian
                    ? "გამოქვეყნდა ახალი მონაცემები ქვეყნის ჰაერის ხარისხის შესახებ"
                    : "New data published on nationwide air quality"}
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full mr-3">
                {isGeorgian ? "ანალიზი" : "Analysis"}
              </div>
              <div>
                <h4 className="font-medium text-gray-800">
                  {isGeorgian
                    ? "წყლის რესურსების ტენდენციები"
                    : "Water Resource Trends"}
                </h4>
                <p className="text-sm text-gray-600">
                  {isGeorgian
                    ? "წყლის რესურსების გრძელვადიანი ტენდენციების ანალიზი"
                    : "Analysis of long-term trends in water resources"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
