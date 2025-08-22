import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { motion } from "framer-motion";
import { Trees, Shield, Leaf, Bird } from "lucide-react";
import { useLanguage } from "../contexts/useLanguage";

const Nature = () => {
  const { isGeorgian } = useLanguage();
  const forestChartRef = useRef(null);
  const protectedAreasChartRef = useRef(null);
  const biodiversityChartRef = useRef(null);

  const forestData = React.useMemo(() => [
    2.75, 2.74, 2.73, 2.72, 2.71, 2.70, 2.69, 2.70, 2.71, 2.72, 2.73, 2.74
  ], []);

  const protectedAreasData = React.useMemo(() => [
    { name: isGeorgian ? "ნაკრძალები" : "Strict Nature Reserves", value: 12, color: "#059669" },
    { name: isGeorgian ? "ეროვნული პარკები" : "National Parks", value: 11, color: "#0d9488" },
    { name: isGeorgian ? "ბუნების ძეგლები" : "Natural Monuments", value: 23, color: "#0891b2" },
    { name: isGeorgian ? "დაცული ლანდშაფტები" : "Protected Landscapes", value: 8, color: "#06b6d4" }
  ], [isGeorgian]);

  const speciesData = React.useMemo(() => ({
    mammals: { count: 107, trend: 'stable' },
    birds: { count: 330, trend: 'increasing' },
    reptiles: { count: 52, trend: 'stable' },
    amphibians: { count: 12, trend: 'decreasing' },
    fish: { count: 84, trend: 'stable' },
    plants: { count: 4130, trend: 'stable' }
  }), []);

  useEffect(() => {
    // Forest Coverage Chart
    if (forestChartRef.current) {
      const chart = echarts.init(forestChartRef.current);
      
      const option = {
        title: {
          text: isGeorgian ? "ტყის საფარი (მლნ ჰა)" : "Forest Coverage (Million Ha)",
          left: 'center',
          textStyle: { fontSize: 18, fontWeight: 'bold' }
        },
        tooltip: {
          trigger: 'axis',
          formatter: function (params) {
            const year = 2012 + params[0].dataIndex;
            const value = params[0].value;
            return `${year}<br/>${isGeorgian ? "ტყის საფარი" : "Forest Coverage"}: ${value} ${isGeorgian ? "მლნ ჰა" : "Million Ha"}`;
          }
        },
        xAxis: {
          type: 'category',
          data: Array.from({ length: 12 }, (_, i) => 2012 + i)
        },
        yAxis: {
          type: 'value',
          name: isGeorgian ? 'მლნ ჰა' : 'Million Ha',
          min: 2.65,
          max: 2.8
        },
        series: [{
          data: forestData,
          type: 'line',
          smooth: true,
          lineStyle: { width: 3, color: '#059669' },
          itemStyle: { color: '#059669' },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(5, 150, 105, 0.3)' },
              { offset: 1, color: 'rgba(5, 150, 105, 0.05)' }
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
  }, [isGeorgian, forestData]);

  useEffect(() => {
    // Protected Areas Chart
    if (protectedAreasChartRef.current) {
      const chart = echarts.init(protectedAreasChartRef.current);
      
      const option = {
        title: {
          text: isGeorgian ? "დაცული ტერიტორიების კატეგორიები" : "Protected Area Categories",
          left: 'center',
          textStyle: { fontSize: 18, fontWeight: 'bold' }
        },
        tooltip: {
          trigger: 'item',
          formatter: function (params) {
            return `${params.data.name}<br/>${isGeorgian ? "რაოდენობა" : "Count"}: ${params.data.value}`;
          }
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [{
          name: isGeorgian ? "დაცული ტერიტორიები" : "Protected Areas",
          type: 'pie',
          radius: ['40%', '70%'],
          center: ['60%', '60%'],
          data: protectedAreasData.map(item => ({
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
  }, [isGeorgian, protectedAreasData]);

  useEffect(() => {
    // Biodiversity Chart
    if (biodiversityChartRef.current) {
      const chart = echarts.init(biodiversityChartRef.current);
      
      const categories = [
        { name: isGeorgian ? "ძუძუმწოვრები" : "Mammals", value: speciesData.mammals.count },
        { name: isGeorgian ? "ფრინველები" : "Birds", value: speciesData.birds.count },
        { name: isGeorgian ? "ქვეწარმავლები" : "Reptiles", value: speciesData.reptiles.count },
        { name: isGeorgian ? "ამფიბიები" : "Amphibians", value: speciesData.amphibians.count },
        { name: isGeorgian ? "თევზები" : "Fish", value: speciesData.fish.count },
        { name: isGeorgian ? "მცენარეები" : "Plants", value: speciesData.plants.count }
      ];

      const option = {
        title: {
          text: isGeorgian ? "სახეობრივი მრავალფეროვნება" : "Species Diversity",
          left: 'center',
          textStyle: { fontSize: 18, fontWeight: 'bold' }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'shadow' }
        },
        xAxis: {
          type: 'category',
          data: categories.map(item => item.name),
          axisLabel: {
            interval: 0,
            rotate: 45
          }
        },
        yAxis: {
          type: 'value',
          name: isGeorgian ? 'სახეობების რაოდენობა' : 'Number of Species'
        },
        series: [{
          data: categories.map(item => ({
            value: item.value,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#10b981' },
                { offset: 1, color: '#059669' }
              ])
            }
          })),
          type: 'bar',
          barWidth: '60%'
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
  }, [isGeorgian, speciesData]);

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
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 py-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Trees className="w-12 h-12 text-green-600 mr-4" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              {isGeorgian ? "ბუნება" : "Nature"}
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {isGeorgian 
              ? "საქართველოს ბუნებრივი მემკვიდრეობის დაცვა და მონიტორინგი"
              : "Protection and monitoring of Georgia's natural heritage"}
          </p>
        </motion.div>

        {/* Key Metrics */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center justify-between mb-2">
              <Trees className="w-8 h-8 text-green-600" />
              <span className="text-sm font-medium text-green-600">39.4%</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">2.74M</h3>
            <p className="text-gray-600 text-sm">
              {isGeorgian ? "ჰექტარი ტყე" : "Hectares of Forest"}
            </p>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center justify-between mb-2">
              <Shield className="w-8 h-8 text-blue-600" />
              <span className="text-sm font-medium text-blue-600">54</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">7.7%</h3>
            <p className="text-gray-600 text-sm">
              {isGeorgian ? "დაცული ტერიტორია" : "Protected Territory"}
            </p>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center justify-between mb-2">
              <Leaf className="w-8 h-8 text-emerald-600" />
              <span className="text-sm font-medium text-emerald-600">4,130</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">585</h3>
            <p className="text-gray-600 text-sm">
              {isGeorgian ? "ცხოველთა სახეობები" : "Animal Species"}
            </p>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center justify-between mb-2">
              <Bird className="w-8 h-8 text-sky-600" />
              <span className="text-sm font-medium text-sky-600">330</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">11</h3>
            <p className="text-gray-600 text-sm">
              {isGeorgian ? "ეროვნული პარკი" : "National Parks"}
            </p>
          </div>
        </motion.div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <motion.div variants={itemVariants} className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div ref={forestChartRef} style={{ width: '100%', height: '400px' }} />
          </motion.div>

          <motion.div variants={itemVariants} className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div ref={protectedAreasChartRef} style={{ width: '100%', height: '400px' }} />
          </motion.div>
        </div>

        <motion.div variants={itemVariants} className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 mb-12">
          <div ref={biodiversityChartRef} style={{ width: '100%', height: '400px' }} />
        </motion.div>

        {/* National Parks */}
        <motion.div variants={itemVariants} className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
          <h3 className="text-2xl font-bold mb-6 text-gray-800">
            {isGeorgian ? "ეროვნული პარკები" : "National Parks"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 bg-green-50 rounded-xl">
              <h4 className="font-semibold text-green-700 mb-2">
                {isGeorgian ? "ბორჯომ-ხარაგაული" : "Borjomi-Kharagauli"}
              </h4>
              <p className="text-sm text-gray-600 mb-2">85,083 {isGeorgian ? "ჰა" : "ha"}</p>
              <p className="text-xs text-gray-500">
                {isGeorgian ? "ყველაზე დიდი ეროვნული პარკი" : "Largest national park"}
              </p>
            </div>
            
            <div className="p-6 bg-blue-50 rounded-xl">
              <h4 className="font-semibold text-blue-700 mb-2">
                {isGeorgian ? "მტირალა" : "Mtirala"}
              </h4>
              <p className="text-sm text-gray-600 mb-2">15,806 {isGeorgian ? "ჰა" : "ha"}</p>
              <p className="text-xs text-gray-500">
                {isGeorgian ? "სუბტროპიკული ტყეები" : "Subtropical forests"}
              </p>
            </div>
            
            <div className="p-6 bg-purple-50 rounded-xl">
              <h4 className="font-semibold text-purple-700 mb-2">
                {isGeorgian ? "კინტრიში" : "Kintrishi"}
              </h4>
              <p className="text-sm text-gray-600 mb-2">10,518 {isGeorgian ? "ჰა" : "ha"}</p>
              <p className="text-xs text-gray-500">
                {isGeorgian ? "კოლხური ტყეები" : "Colchic forests"}
              </p>
            </div>

            <div className="p-6 bg-amber-50 rounded-xl">
              <h4 className="font-semibold text-amber-700 mb-2">
                {isGeorgian ? "კაზბეგი" : "Kazbegi"}
              </h4>
              <p className="text-sm text-gray-600 mb-2">8,707 {isGeorgian ? "ჰა" : "ha"}</p>
              <p className="text-xs text-gray-500">
                {isGeorgian ? "მაღალმთიანი ლანდშაფტები" : "High mountain landscapes"}
              </p>
            </div>

            <div className="p-6 bg-teal-50 rounded-xl">
              <h4 className="font-semibold text-teal-700 mb-2">
                {isGeorgian ? "თუშეთი" : "Tusheti"}
              </h4>
              <p className="text-sm text-gray-600 mb-2">11,080 {isGeorgian ? "ჰა" : "ha"}</p>
              <p className="text-xs text-gray-500">
                {isGeorgian ? "ალპური მდელოები" : "Alpine meadows"}
              </p>
            </div>

            <div className="p-6 bg-rose-50 rounded-xl">
              <h4 className="font-semibold text-rose-700 mb-2">
                {isGeorgian ? "ჯავახეთი" : "Javakheti"}
              </h4>
              <p className="text-sm text-gray-600 mb-2">28,289 {isGeorgian ? "ჰა" : "ha"}</p>
              <p className="text-xs text-gray-500">
                {isGeorgian ? "ვულკანური ლანდშაფტი" : "Volcanic landscape"}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Nature;
