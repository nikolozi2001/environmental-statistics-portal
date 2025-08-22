import React from "react";
import { motion as Motion } from "framer-motion";
import { useLanguage } from "../contexts/useLanguage";
import HeroSection from "../components/HeroSection";

function Dashboard() {
  const { isGeorgian } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.6, staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <Motion.div 
      className="min-h-screen bg-gray-50"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Hero Section with Category Cards */}
      <HeroSection />

      {/* Additional Dashboard Content */}
      <div className="container mx-auto px-4 py-16">
        <Motion.div variants={itemVariants} className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            {isGeorgian ? "რეალ-დროში მონიტორინგი" : "Real-time Monitoring"}
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            {isGeorgian
              ? "თვალყური ადევნეთ საქართველოს გარემოსდაცვით მაჩვენებლებს რეალურ დროში და მიიღეთ ზუსტი ინფორმაცია გადაწყვეტილებების მისაღებად"
              : "Monitor Georgia's environmental indicators in real-time and get accurate information for decision-making"}
          </p>
        </Motion.div>

        {/* Enhanced Stats Section */}
        <Motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <span className="text-green-600 text-xl">🌫️</span>
              </div>
              <span className="text-sm font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">
                ↓ 12% წლიურად
              </span>
            </div>
            <div className="text-3xl font-bold text-gray-800 mb-2">42.3</div>
            <div className="text-gray-600 font-medium">
              {isGeorgian ? "AQI საშუალო" : "Average AQI"}
            </div>
            <div className="text-sm text-gray-500 mt-2">
              {isGeorgian ? "კარგი ხარისხი" : "Good Quality"}
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <span className="text-blue-600 text-xl">💧</span>
              </div>
              <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                ↑ 5% წლიურად
              </span>
            </div>
            <div className="text-3xl font-bold text-gray-800 mb-2">88.1%</div>
            <div className="text-gray-600 font-medium">
              {isGeorgian ? "წყლის ხარისხი" : "Water Quality"}
            </div>
            <div className="text-sm text-gray-500 mt-2">
              {isGeorgian ? "ძალიან კარგი" : "Excellent"}
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                <span className="text-amber-600 text-xl">🌡️</span>
              </div>
              <span className="text-sm font-semibold text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
                ↑ 1.2°C 10 წელში
              </span>
            </div>
            <div className="text-3xl font-bold text-gray-800 mb-2">22.4°C</div>
            <div className="text-gray-600 font-medium">
              {isGeorgian ? "საშუალო ტემპერატურა" : "Average Temperature"}
            </div>
            <div className="text-sm text-gray-500 mt-2">
              {isGeorgian ? "წლიური საშუალო" : "Annual Average"}
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <span className="text-green-600 text-xl">🌿</span>
              </div>
              <span className="text-sm font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">
                39.4% ქვეყნის
              </span>
            </div>
            <div className="text-3xl font-bold text-gray-800 mb-2">2.74M</div>
            <div className="text-gray-600 font-medium">
              {isGeorgian ? "ჰექტარი ტყე" : "Hectares Forest"}
            </div>
            <div className="text-sm text-gray-500 mt-2">
              {isGeorgian ? "დაცული ტერიტორია" : "Protected Area"}
            </div>
          </div>
        </Motion.div>

        {/* Featured Insights */}
        <Motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-8 text-white">
            <h3 className="text-2xl font-bold mb-2">
              {isGeorgian ? "ბოლო განახლებები და ანალიზი" : "Latest Updates & Analysis"}
            </h3>
            <p className="text-blue-100">
              {isGeorgian 
                ? "გარემოსდაცვითი მონაცემების ბოლო ტენდენციები და მნიშვნელოვანი ცვლილებები"
                : "Latest environmental data trends and significant changes"}
            </p>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full mt-1">
                    {isGeorgian ? "ახალი" : "NEW"}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800 mb-2">
                      {isGeorgian
                        ? "2023 წლის ჰაერის ხარისხის ანგარიში გამოქვეყნდა"
                        : "2023 Air Quality Report Published"}
                    </h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {isGeorgian
                        ? "კვლევამ აჩვენა ჰაერის ხარისხის გაუმჯობესება ძირითად ქალაქებში. PM2.5 კონცენტრაცია შემცირდა 12%-ით."
                        : "Study shows air quality improvement in major cities. PM2.5 concentration decreased by 12%."}
                    </p>
                    <div className="flex items-center mt-3 text-sm text-gray-500">
                      <span>📅 {isGeorgian ? "2 დღის წინ" : "2 days ago"}</span>
                      <span className="mx-2">•</span>
                      <span>👁️ 1,247 {isGeorgian ? "ნახვა" : "views"}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full mt-1">
                    {isGeorgian ? "ანალიზი" : "ANALYSIS"}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800 mb-2">
                      {isGeorgian
                        ? "წყლის რესურსების გრძელვადიანი ტენდენციები"
                        : "Long-term Water Resource Trends"}
                    </h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {isGeorgian
                        ? "ბოლო 10 წლის მონაცემებზე დაყრდნობით, წყალსაცავების დონე სტაბილურია, მაგრამ ხარისხი მნიშვნელოვნად გაუმჯობესდა."
                        : "Based on 10-year data, reservoir levels remain stable while quality has significantly improved."}
                    </p>
                    <div className="flex items-center mt-3 text-sm text-gray-500">
                      <span>📅 {isGeorgian ? "1 კვირის წინ" : "1 week ago"}</span>
                      <span className="mx-2">•</span>
                      <span>👁️ 892 {isGeorgian ? "ნახვა" : "views"}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-purple-100 text-purple-800 text-xs font-bold px-3 py-1 rounded-full mt-1">
                    {isGeorgian ? "კვლევა" : "RESEARCH"}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800 mb-2">
                      {isGeorgian
                        ? "ბიომრავალფეროვნების მონიტორინგის ახალი მეთოდები"
                        : "New Biodiversity Monitoring Methods"}
                    </h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {isGeorgian
                        ? "დრონების და AI ტექნოლოგიების გამოყენებით, ეროვნულ პარკებში ცხოველების პოპულაციის აღრიცხვა გაუმჯობესდა."
                        : "Using drones and AI technology, wildlife population counting in national parks has improved."}
                    </p>
                    <div className="flex items-center mt-3 text-sm text-gray-500">
                      <span>📅 {isGeorgian ? "2 კვირის წინ" : "2 weeks ago"}</span>
                      <span className="mx-2">•</span>
                      <span>👁️ 654 {isGeorgian ? "ნახვა" : "views"}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full mt-1">
                    {isGeorgian ? "გაფრთხილება" : "ALERT"}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800 mb-2">
                      {isGeorgian
                        ? "კლიმატის ცვლილების გავლენა ალპურ ზონაზე"
                        : "Climate Change Impact on Alpine Zones"}
                    </h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {isGeorgian
                        ? "მაღალმთიან რეგიონებში ტემპერატურის ზრდა სახეობების მიგრაციას იწვევს. მონიტორინგი გააძლიერეს."
                        : "Temperature rise in high-altitude regions is causing species migration. Monitoring has been intensified."}
                    </p>
                    <div className="flex items-center mt-3 text-sm text-gray-500">
                      <span>📅 {isGeorgian ? "3 კვირის წინ" : "3 weeks ago"}</span>
                      <span className="mx-2">•</span>
                      <span>👁️ 1,098 {isGeorgian ? "ნახვა" : "views"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Motion.div>
      </div>
    </Motion.div>
  );
}

export default Dashboard;
