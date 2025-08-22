import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { motion as Motion } from "framer-motion";
import { Thermometer, Cloud, CloudRain, Sun } from "lucide-react";
import { useLanguage } from "../contexts/useLanguage";

const Climate = () => {
  const { isGeorgian } = useLanguage();
  const temperatureChartRef = useRef(null);
  const precipitationChartRef = useRef(null);
  const seasonalChartRef = useRef(null);

  const temperatureData = React.useMemo(() => [
    12.5, 14.2, 16.8, 20.1, 24.3, 28.7, 31.2, 30.8, 26.9, 21.4, 16.3, 13.1
  ], []);

  const precipitationData = React.useMemo(() => [
    65, 58, 72, 85, 92, 78, 45, 52, 68, 88, 95, 78
  ], []);

  const seasonalData = React.useMemo(() => [
    { name: isGeorgian ? "გაზაფხული" : "Spring", temp: 18.4, precipitation: 84.3 },
    { name: isGeorgian ? "ზაფხული" : "Summer", temp: 30.2, precipitation: 58.3 },
    { name: isGeorgian ? "შემოდგომა" : "Autumn", temp: 21.5, precipitation: 83.7 },
    { name: isGeorgian ? "ზამთარი" : "Winter", temp: 13.3, precipitation: 67.0 }
  ], [isGeorgian]);

  useEffect(() => {
    // Temperature Trend Chart
    if (temperatureChartRef.current) {
      const chart = echarts.init(temperatureChartRef.current);
      
      const option = {
        title: {
          text: isGeorgian ? "წლიური ტემპერატურის ტენდენცია" : "Annual Temperature Trend",
          left: 'center',
          textStyle: { fontSize: 18, fontWeight: 'bold' }
        },
        tooltip: {
          trigger: 'axis',
          formatter: function (params) {
            const month = params[0].axisValue;
            const value = params[0].value;
            return `${month}<br/>${isGeorgian ? "ტემპერატურა" : "Temperature"}: ${value}°C`;
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
          name: '°C'
        },
        series: [{
          data: temperatureData,
          type: 'line',
          smooth: true,
          lineStyle: { width: 3, color: '#ef4444' },
          itemStyle: { color: '#ef4444' },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(239, 68, 68, 0.3)' },
              { offset: 1, color: 'rgba(239, 68, 68, 0.05)' }
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
  }, [isGeorgian, temperatureData]);

  useEffect(() => {
    // Precipitation Chart
    if (precipitationChartRef.current) {
      const chart = echarts.init(precipitationChartRef.current);
      
      const option = {
        title: {
          text: isGeorgian ? "ნალექების რაოდენობა" : "Precipitation Amount",
          left: 'center',
          textStyle: { fontSize: 18, fontWeight: 'bold' }
        },
        tooltip: {
          trigger: 'axis',
          formatter: function (params) {
            const month = params[0].axisValue;
            const value = params[0].value;
            return `${month}<br/>${isGeorgian ? "ნალექები" : "Precipitation"}: ${value}mm`;
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
          name: 'mm'
        },
        series: [{
          data: precipitationData,
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
  }, [isGeorgian, precipitationData]);

  useEffect(() => {
    // Seasonal Comparison Chart
    if (seasonalChartRef.current) {
      const chart = echarts.init(seasonalChartRef.current);
      
      const option = {
        title: {
          text: isGeorgian ? "სეზონური შედარება" : "Seasonal Comparison",
          left: 'center',
          textStyle: { fontSize: 18, fontWeight: 'bold' }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'shadow' }
        },
        legend: {
          data: [isGeorgian ? 'ტემპერატურა (°C)' : 'Temperature (°C)', isGeorgian ? 'ნალექები (mm)' : 'Precipitation (mm)'],
          top: 30
        },
        xAxis: {
          type: 'category',
          data: seasonalData.map(item => item.name)
        },
        yAxis: [
          {
            type: 'value',
            name: '°C',
            position: 'left'
          },
          {
            type: 'value',
            name: 'mm',
            position: 'right'
          }
        ],
        series: [
          {
            name: isGeorgian ? 'ტემპერატურა (°C)' : 'Temperature (°C)',
            type: 'bar',
            data: seasonalData.map(item => item.temp),
            itemStyle: { color: '#ef4444' }
          },
          {
            name: isGeorgian ? 'ნალექები (mm)' : 'Precipitation (mm)',
            type: 'bar',
            yAxisIndex: 1,
            data: seasonalData.map(item => item.precipitation),
            itemStyle: { color: '#06b6d4' }
          }
        ]
      };

      chart.setOption(option);
      
      const handleResize = () => chart.resize();
      window.addEventListener('resize', handleResize);
      
      return () => {
        window.removeEventListener('resize', handleResize);
        chart.dispose();
      };
    }
  }, [isGeorgian, seasonalData]);

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
      className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 py-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <Motion.div variants={itemVariants} className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Thermometer className="w-12 h-12 text-red-600 mr-4" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
              {isGeorgian ? "კლიმატი" : "Climate"}
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {isGeorgian 
              ? "საქართველოს კლიმატური მონაცემები და ტენდენციები"
              : "Georgia's climate data and trends"}
          </p>
        </Motion.div>

        {/* Key Metrics */}
        <Motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center justify-between mb-2">
              <Thermometer className="w-8 h-8 text-red-600" />
              <Sun className="w-6 h-6 text-yellow-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">22.4°C</h3>
            <p className="text-gray-600 text-sm">
              {isGeorgian ? "საშუალო ტემპერატურა" : "Average Temperature"}
            </p>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center justify-between mb-2">
              <CloudRain className="w-8 h-8 text-blue-600" />
              <Cloud className="w-6 h-6 text-gray-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">776mm</h3>
            <p className="text-gray-600 text-sm">
              {isGeorgian ? "წლიური ნალექები" : "Annual Precipitation"}
            </p>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center justify-between mb-2">
              <Thermometer className="w-8 h-8 text-orange-600" />
              <span className="text-sm font-medium text-red-600">MAX</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">31.2°C</h3>
            <p className="text-gray-600 text-sm">
              {isGeorgian ? "მაქსიმალური (ივლისი)" : "Maximum (July)"}
            </p>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center justify-between mb-2">
              <Thermometer className="w-8 h-8 text-blue-600" />
              <span className="text-sm font-medium text-blue-600">MIN</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">12.5°C</h3>
            <p className="text-gray-600 text-sm">
              {isGeorgian ? "მინიმალური (იანვარი)" : "Minimum (January)"}
            </p>
          </div>
        </Motion.div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Motion.div variants={itemVariants} className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div ref={temperatureChartRef} style={{ width: '100%', height: '400px' }} />
          </Motion.div>

          <Motion.div variants={itemVariants} className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div ref={precipitationChartRef} style={{ width: '100%', height: '400px' }} />
          </Motion.div>
        </div>

        <Motion.div variants={itemVariants} className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 mb-12">
          <div ref={seasonalChartRef} style={{ width: '100%', height: '400px' }} />
        </Motion.div>

        {/* Climate Zones */}
        <Motion.div variants={itemVariants} className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
          <h3 className="text-2xl font-bold mb-6 text-gray-800">
            {isGeorgian ? "კლიმატური ზონები" : "Climate Zones"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-green-50 rounded-xl">
              <h4 className="font-semibold text-green-700 mb-2">
                {isGeorgian ? "დასავლეთი საქართველო" : "Western Georgia"}
              </h4>
              <p className="text-sm text-gray-600 mb-2">
                {isGeorgian ? "სუბტროპიკული ნოტიო" : "Subtropical Humid"}
              </p>
              <p className="text-xs text-gray-500">
                {isGeorgian ? "წლიური ნალექები: 1000-3000mm" : "Annual precipitation: 1000-3000mm"}
              </p>
            </div>
            
            <div className="text-center p-6 bg-amber-50 rounded-xl">
              <h4 className="font-semibold text-amber-700 mb-2">
                {isGeorgian ? "აღმოსავლეთი საქართველო" : "Eastern Georgia"}
              </h4>
              <p className="text-sm text-gray-600 mb-2">
                {isGeorgian ? "კონტინენტური" : "Continental"}
              </p>
              <p className="text-xs text-gray-500">
                {isGeorgian ? "წლიური ნალექები: 400-800mm" : "Annual precipitation: 400-800mm"}
              </p>
            </div>
            
            <div className="text-center p-6 bg-blue-50 rounded-xl">
              <h4 className="font-semibold text-blue-700 mb-2">
                {isGeorgian ? "მთიანი რეგიონები" : "Mountain Regions"}
              </h4>
              <p className="text-sm text-gray-600 mb-2">
                {isGeorgian ? "ალპური" : "Alpine"}
              </p>
              <p className="text-xs text-gray-500">
                {isGeorgian ? "მცირე ტემპერატურა, ხშირი თოვლი" : "Low temperature, frequent snow"}
              </p>
            </div>
          </div>
        </Motion.div>
      </div>
    </Motion.div>
  );
};

export default Climate;
