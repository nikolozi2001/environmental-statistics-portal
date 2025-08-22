import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { motion } from "framer-motion";
import { Car, Zap, Fuel, TrendingUp } from "lucide-react";
import { useLanguage } from "../contexts/useLanguage";

const TransportEnergy = () => {
  const { isGeorgian } = useLanguage();
  const vehiclesChartRef = useRef(null);
  const energyChartRef = useRef(null);
  const renewableChartRef = useRef(null);

  const vehicleData = React.useMemo(() => [
    { name: isGeorgian ? "სამგზავრო ავტომობილები" : "Passenger Cars", value: 68.5, color: "#3b82f6" },
    { name: isGeorgian ? "სამუშაო ავტომობილები" : "Commercial Vehicles", value: 15.2, color: "#10b981" },
    { name: isGeorgian ? "ავტობუსები" : "Buses", value: 2.8, color: "#f59e0b" },
    { name: isGeorgian ? "მოტოციკლები" : "Motorcycles", value: 8.1, color: "#ef4444" },
    { name: isGeorgian ? "სხვა" : "Others", value: 5.4, color: "#8b5cf6" }
  ], [isGeorgian]);

  const energyConsumptionData = React.useMemo(() => [
    { year: '2019', hydro: 85.2, thermal: 12.8, renewable: 2.0 },
    { year: '2020', hydro: 87.1, thermal: 10.9, renewable: 2.0 },
    { year: '2021', hydro: 83.5, thermal: 14.2, renewable: 2.3 },
    { year: '2022', hydro: 79.8, thermal: 17.1, renewable: 3.1 },
    { year: '2023', hydro: 81.2, thermal: 14.8, renewable: 4.0 }
  ], []);

  const renewableData = React.useMemo(() => [
    15.2, 18.7, 22.1, 28.4, 35.8, 42.3, 48.9, 55.6, 62.1, 68.7, 75.2, 82.4
  ], []);

  useEffect(() => {
    // Vehicle Distribution Chart
    if (vehiclesChartRef.current) {
      const chart = echarts.init(vehiclesChartRef.current);
      
      const option = {
        title: {
          text: isGeorgian ? "ტრანსპორტის განაწილება" : "Vehicle Distribution",
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
          name: isGeorgian ? "ტრანსპორტი" : "Vehicles",
          type: 'pie',
          radius: ['40%', '70%'],
          center: ['60%', '60%'],
          data: vehicleData.map(item => ({
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
  }, [isGeorgian, vehicleData]);

  useEffect(() => {
    // Energy Source Chart
    if (energyChartRef.current) {
      const chart = echarts.init(energyChartRef.current);
      
      const option = {
        title: {
          text: isGeorgian ? "ენერგიის წყაროები" : "Energy Sources",
          left: 'center',
          textStyle: { fontSize: 18, fontWeight: 'bold' }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'shadow' }
        },
        legend: {
          data: [
            isGeorgian ? 'ჰიდროენერგია' : 'Hydropower',
            isGeorgian ? 'თერმული' : 'Thermal',
            isGeorgian ? 'განახლებადი' : 'Renewable'
          ]
        },
        xAxis: {
          type: 'category',
          data: energyConsumptionData.map(item => item.year)
        },
        yAxis: {
          type: 'value',
          name: '%'
        },
        series: [
          {
            name: isGeorgian ? 'ჰიდროენერგია' : 'Hydropower',
            type: 'bar',
            stack: 'total',
            data: energyConsumptionData.map(item => item.hydro),
            itemStyle: { color: '#06b6d4' }
          },
          {
            name: isGeorgian ? 'თერმული' : 'Thermal',
            type: 'bar',
            stack: 'total',
            data: energyConsumptionData.map(item => item.thermal),
            itemStyle: { color: '#ef4444' }
          },
          {
            name: isGeorgian ? 'განახლებადი' : 'Renewable',
            type: 'bar',
            stack: 'total',
            data: energyConsumptionData.map(item => item.renewable),
            itemStyle: { color: '#10b981' }
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
  }, [isGeorgian, energyConsumptionData]);

  useEffect(() => {
    // Renewable Energy Growth Chart
    if (renewableChartRef.current) {
      const chart = echarts.init(renewableChartRef.current);
      
      const option = {
        title: {
          text: isGeorgian ? "განახლებადი ენერგიის ზრდა (მვტ)" : "Renewable Energy Growth (MW)",
          left: 'center',
          textStyle: { fontSize: 18, fontWeight: 'bold' }
        },
        tooltip: {
          trigger: 'axis',
          formatter: function (params) {
            const month = params[0].axisValue;
            const value = params[0].value;
            return `${month}<br/>${isGeorgian ? "შესაძლებლობა" : "Capacity"}: ${value} ${isGeorgian ? "მვტ" : "MW"}`;
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
          name: isGeorgian ? 'მვტ' : 'MW'
        },
        series: [{
          data: renewableData,
          type: 'line',
          smooth: true,
          lineStyle: { width: 3, color: '#10b981' },
          itemStyle: { color: '#10b981' },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(16, 185, 129, 0.3)' },
              { offset: 1, color: 'rgba(16, 185, 129, 0.05)' }
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
  }, [isGeorgian, renewableData]);

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
      className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Car className="w-12 h-12 text-purple-600 mr-4" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {isGeorgian ? "ტრანსპორტი და ენერგია" : "Transport & Energy"}
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {isGeorgian 
              ? "ტრანსპორტისა და ენერგეტიკის სექტორის მონაცემები"
              : "Transport and energy sector data and statistics"}
          </p>
        </motion.div>

        {/* Key Metrics */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center justify-between mb-2">
              <Car className="w-8 h-8 text-blue-600" />
              <TrendingUp className="w-6 h-6 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">1.2M</h3>
            <p className="text-gray-600 text-sm">
              {isGeorgian ? "რეგისტრირებული ავტომობილები" : "Registered Vehicles"}
            </p>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center justify-between mb-2">
              <Zap className="w-8 h-8 text-yellow-600" />
              <span className="text-sm font-medium text-blue-600">81.2%</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">3,847</h3>
            <p className="text-gray-600 text-sm">
              {isGeorgian ? "მვტ ჰიდროენერგია" : "MW Hydropower"}
            </p>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center justify-between mb-2">
              <Fuel className="w-8 h-8 text-green-600" />
              <span className="text-sm font-medium text-green-600">+65%</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">82.4</h3>
            <p className="text-gray-600 text-sm">
              {isGeorgian ? "მვტ განახლებადი ენერგია" : "MW Renewable Energy"}
            </p>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center justify-between mb-2">
              <Car className="w-8 h-8 text-emerald-600" />
              <span className="text-sm font-medium text-emerald-600">EV</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">2,450</h3>
            <p className="text-gray-600 text-sm">
              {isGeorgian ? "ელექტრო ავტომობილები" : "Electric Vehicles"}
            </p>
          </div>
        </motion.div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <motion.div variants={itemVariants} className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div ref={vehiclesChartRef} style={{ width: '100%', height: '400px' }} />
          </motion.div>

          <motion.div variants={itemVariants} className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div ref={energyChartRef} style={{ width: '100%', height: '400px' }} />
          </motion.div>
        </div>

        <motion.div variants={itemVariants} className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 mb-12">
          <div ref={renewableChartRef} style={{ width: '100%', height: '400px' }} />
        </motion.div>

        {/* Energy Infrastructure */}
        <motion.div variants={itemVariants} className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
          <h3 className="text-2xl font-bold mb-6 text-gray-800">
            {isGeorgian ? "ენერგეტიკული ინფრასტრუქტურა" : "Energy Infrastructure"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-blue-50 rounded-xl">
              <h4 className="font-semibold text-blue-700 mb-2">
                {isGeorgian ? "ჰიდროელექტროსადგურები" : "Hydropower Plants"}
              </h4>
              <p className="text-2xl font-bold text-gray-800 mb-1">87</p>
              <p className="text-sm text-gray-600">
                {isGeorgian ? "საერთო რაოდენობა" : "Total Count"}
              </p>
            </div>
            
            <div className="text-center p-6 bg-green-50 rounded-xl">
              <h4 className="font-semibold text-green-700 mb-2">
                {isGeorgian ? "მზის ელექტროსადგურები" : "Solar Power Plants"}
              </h4>
              <p className="text-2xl font-bold text-gray-800 mb-1">23</p>
              <p className="text-sm text-gray-600">
                {isGeorgian ? "საერთო რაოდენობა" : "Total Count"}
              </p>
            </div>
            
            <div className="text-center p-6 bg-purple-50 rounded-xl">
              <h4 className="font-semibold text-purple-700 mb-2">
                {isGeorgian ? "ქარის ელექტროსადგურები" : "Wind Power Plants"}
              </h4>
              <p className="text-2xl font-bold text-gray-800 mb-1">8</p>
              <p className="text-sm text-gray-600">
                {isGeorgian ? "საერთო რაოდენობა" : "Total Count"}
              </p>
            </div>

            <div className="text-center p-6 bg-amber-50 rounded-xl">
              <h4 className="font-semibold text-amber-700 mb-2">
                {isGeorgian ? "EV დამტენი სადგურები" : "EV Charging Stations"}
              </h4>
              <p className="text-2xl font-bold text-gray-800 mb-1">145</p>
              <p className="text-sm text-gray-600">
                {isGeorgian ? "საერთო რაოდენობა" : "Total Count"}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TransportEnergy;
