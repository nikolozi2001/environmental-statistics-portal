import React, { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import { motion as Motion } from "framer-motion";
import { Wind, AlertTriangle, TrendingDown, TrendingUp } from "lucide-react";
import { useLanguage } from "../contexts/useLanguage";

const AirQuality = () => {
  const { isGeorgian } = useLanguage();
  const aqiChartRef = useRef(null);
  const emissionsChartRef = useRef(null);
  const ozoneChartRef = useRef(null);
  const [selectedCity, setSelectedCity] = useState("tbilisi");

  const cities = {
    tbilisi: { en: "Tbilisi", ge: "თბილისი" },
    batumi: { en: "Batumi", ge: "ბათუმი" },
    kutaisi: { en: "Kutaisi", ge: "ქუთაისი" },
    rustavi: { en: "Rustavi", ge: "რუსთავი" }
  };

  const aqiData = React.useMemo(() => ({
    tbilisi: [45, 52, 38, 61, 47, 55, 42, 48, 56, 39, 44, 50],
    batumi: [32, 28, 35, 41, 33, 37, 29, 31, 38, 26, 30, 34],
    kutaisi: [41, 48, 35, 53, 42, 49, 38, 44, 51, 36, 40, 46],
    rustavi: [58, 65, 52, 71, 59, 67, 54, 61, 69, 51, 57, 63]
  }), []);

  const emissionsData = React.useMemo(() => [
    { name: isGeorgian ? "ტრანსპორტი" : "Transport", value: 45, color: "#ef4444" },
    { name: isGeorgian ? "ენერგეტიკა" : "Energy", value: 30, color: "#f97316" },
    { name: isGeorgian ? "მრეწველობა" : "Industry", value: 15, color: "#eab308" },
    { name: isGeorgian ? "საყოფაცხოვრებო" : "Residential", value: 7, color: "#22c55e" },
    { name: isGeorgian ? "სხვა" : "Others", value: 3, color: "#6366f1" }
  ], [isGeorgian]);

  useEffect(() => {
    // AQI Trend Chart
    if (aqiChartRef.current) {
      const chart = echarts.init(aqiChartRef.current);
      
      const option = {
        title: {
          text: isGeorgian ? "AQI ტენდენციები" : "AQI Trends",
          left: 'center',
          textStyle: { fontSize: 18, fontWeight: 'bold' }
        },
        tooltip: {
          trigger: 'axis',
          formatter: function (params) {
            const month = params[0].axisValue;
            const value = params[0].value;
            return `${month}<br/>AQI: ${value}`;
          }
        },
        xAxis: {
          type: 'category',
          data: isGeorgian 
            ? ['იან', 'თებ', 'მარ', 'აპრ', 'მაი', 'ივნ', 'ივლ', 'აგვ', 'სექ', 'ოქტ', 'ნოე', 'დეკ']
            : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        yAxis: {
          type: 'value',
          name: 'AQI'
        },
        series: [{
          data: aqiData[selectedCity],
          type: 'line',
          smooth: true,
          lineStyle: { width: 3, color: '#3b82f6' },
          itemStyle: { color: '#3b82f6' },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(59, 130, 246, 0.3)' },
              { offset: 1, color: 'rgba(59, 130, 246, 0.05)' }
            ])
          }
        }]
      };

      chart.setOption(option);
      
      const handleResize = () => chart.resize();
      window.addEventListener('resize', handleResize);
      
      return () => {
        window.removeEventListener('resize', handleResize);
        chart.dispose();
      };
    }
  }, [selectedCity, isGeorgian, aqiData]);

  useEffect(() => {
    // Emissions Pie Chart
    if (emissionsChartRef.current) {
      const chart = echarts.init(emissionsChartRef.current);
      
      const option = {
        title: {
          text: isGeorgian ? "ემისიების წყაროები" : "Emission Sources",
          left: 'center',
          textStyle: { fontSize: 18, fontWeight: 'bold' }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c}% ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [{
          name: isGeorgian ? "ემისიები" : "Emissions",
          type: 'pie',
          radius: ['40%', '70%'],
          center: ['60%', '60%'],
          data: emissionsData.map(item => ({
            value: item.value,
            name: item.name,
            itemStyle: { color: item.color }
          })),
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }]
      };

      chart.setOption(option);
      
      const handleResize = () => chart.resize();
      window.addEventListener('resize', handleResize);
      
      return () => {
        window.removeEventListener('resize', handleResize);
        chart.dispose();
      };
    }
  }, [isGeorgian, emissionsData]);

  useEffect(() => {
    // Ozone Levels Chart
    if (ozoneChartRef.current) {
      const chart = echarts.init(ozoneChartRef.current);
      
      const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);
      const ozoneData = [
        20, 18, 16, 15, 14, 16, 22, 28, 35, 42, 48, 52,
        55, 58, 62, 59, 56, 48, 42, 35, 28, 24, 22, 21
      ];

      const option = {
        title: {
          text: isGeorgian ? "ოზონის დღიური ცვლილება" : "Daily Ozone Variation",
          left: 'center',
          textStyle: { fontSize: 18, fontWeight: 'bold' }
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          data: hours,
          name: isGeorgian ? "საათი" : "Hour"
        },
        yAxis: {
          type: 'value',
          name: 'μg/m³'
        },
        series: [{
          data: ozoneData,
          type: 'bar',
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#06b6d4' },
              { offset: 1, color: '#0891b2' }
            ])
          }
        }]
      };

      chart.setOption(option);
      
      const handleResize = () => chart.resize();
      window.addEventListener('resize', handleResize);
      
      return () => {
        window.removeEventListener('resize', handleResize);
        chart.dispose();
      };
    }
  }, [isGeorgian]);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <Motion.div 
      className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 py-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <Motion.div variants={itemVariants} className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Wind className="w-12 h-12 text-blue-600 mr-4" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              {isGeorgian ? "ჰაერის ხარისხი" : "Air Quality"}
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {isGeorgian 
              ? "მონიტორინგი და ანალიზი საქართველოს ჰაერის ხარისხის მდგომარეობისა"
              : "Monitoring and analysis of Georgia's air quality status"}
          </p>
        </Motion.div>

        {/* Key Metrics */}
        <Motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center justify-between mb-2">
              <Wind className="w-8 h-8 text-blue-600" />
              <span className="text-sm font-medium text-green-600 flex items-center">
                <TrendingDown className="w-4 h-4 mr-1" />
                -12%
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">
              {aqiData[selectedCity][aqiData[selectedCity].length - 1]}
            </h3>
            <p className="text-gray-600 text-sm">
              {isGeorgian ? "მიმდინარე AQI" : "Current AQI"}
            </p>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center justify-between mb-2">
              <AlertTriangle className="w-8 h-8 text-amber-600" />
              <span className="text-sm font-medium text-amber-600">
                {isGeorgian ? "ზომიერი" : "Moderate"}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">PM2.5</h3>
            <p className="text-gray-600 text-sm">25 μg/m³</p>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center justify-between mb-2">
              <Wind className="w-8 h-8 text-cyan-600" />
              <span className="text-sm font-medium text-green-600 flex items-center">
                <TrendingDown className="w-4 h-4 mr-1" />
                -8%
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">NO₂</h3>
            <p className="text-gray-600 text-sm">18 μg/m³</p>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center justify-between mb-2">
              <Wind className="w-8 h-8 text-purple-600" />
              <span className="text-sm font-medium text-red-600 flex items-center">
                <TrendingUp className="w-4 h-4 mr-1" />
                +5%
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">O₃</h3>
            <p className="text-gray-600 text-sm">52 μg/m³</p>
          </div>
        </Motion.div>

        {/* City Selector */}
        <Motion.div variants={itemVariants} className="mb-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              {isGeorgian ? "აირჩიეთ ქალაქი" : "Select City"}
            </h3>
            <div className="flex flex-wrap gap-3">
              {Object.entries(cities).map(([key, city]) => (
                <button
                  key={key}
                  onClick={() => setSelectedCity(key)}
                  className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                    selectedCity === key
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {isGeorgian ? city.ge : city.en}
                </button>
              ))}
            </div>
          </div>
        </Motion.div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Motion.div variants={itemVariants} className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div ref={aqiChartRef} style={{ width: '100%', height: '400px' }} />
          </Motion.div>

          <Motion.div variants={itemVariants} className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div ref={emissionsChartRef} style={{ width: '100%', height: '400px' }} />
          </Motion.div>

          <Motion.div variants={itemVariants} className="lg:col-span-2 bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div ref={ozoneChartRef} style={{ width: '100%', height: '400px' }} />
          </Motion.div>
        </div>

        {/* Additional Information */}
        <Motion.div variants={itemVariants} className="mt-12 bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
          <h3 className="text-2xl font-bold mb-6 text-gray-800">
            {isGeorgian ? "რჩევები ჯანმრთელობისთვის" : "Health Recommendations"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-green-600">
                {isGeorgian ? "კარგი ხარისხი (0-50)" : "Good Quality (0-50)"}
              </h4>
              <ul className="space-y-2 text-gray-600">
                <li>• {isGeorgian ? "უსაფრთხოა ყველასთვის" : "Safe for everyone"}</li>
                <li>• {isGeorgian ? "შეიძლება გარე აქტივობები" : "Outdoor activities recommended"}</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-amber-600">
                {isGeorgian ? "ზომიერი (51-100)" : "Moderate (51-100)"}
              </h4>
              <ul className="space-y-2 text-gray-600">
                <li>• {isGeorgian ? "მგრძნობიარე ადამიანებმა შეზღუდონ გარე აქტივობები" : "Sensitive individuals should limit outdoor activities"}</li>
                <li>• {isGeorgian ? "მასკის ტარება შეიძლება სასარგებლო იყოს" : "Mask usage may be beneficial"}</li>
              </ul>
            </div>
          </div>
        </Motion.div>
      </div>
    </Motion.div>
  );
};

export default AirQuality;
