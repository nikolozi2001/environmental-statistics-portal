import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { motion } from "framer-motion";
import { Trash2, Recycle, AlertTriangle, TrendingDown } from "lucide-react";
import { useLanguage } from "../contexts/useLanguage";

const Waste = () => {
  const { isGeorgian } = useLanguage();
  const wasteCompositionRef = useRef(null);
  const disposalMethodsRef = useRef(null);
  const recyclingTrendRef = useRef(null);

  const wasteCompositionData = React.useMemo(() => [
    { name: isGeorgian ? "ორგანული" : "Organic", value: 42.5, color: "#10b981" },
    { name: isGeorgian ? "ქაღალდი/მუყაო" : "Paper/Cardboard", value: 18.3, color: "#3b82f6" },
    { name: isGeorgian ? "პლასტიკი" : "Plastic", value: 15.8, color: "#ef4444" },
    { name: isGeorgian ? "მინა" : "Glass", value: 8.2, color: "#06b6d4" },
    { name: isGeorgian ? "ლითონი" : "Metal", value: 4.7, color: "#f59e0b" },
    { name: isGeorgian ? "ტექსტილი" : "Textile", value: 6.1, color: "#8b5cf6" },
    { name: isGeorgian ? "სხვა" : "Others", value: 4.4, color: "#6b7280" }
  ], [isGeorgian]);

  const disposalMethodsData = React.useMemo(() => [
    { name: isGeorgian ? "ნაგავსაყრელი" : "Landfill", value: 65.2, color: "#ef4444" },
    { name: isGeorgian ? "გადამუშავება" : "Recycling", value: 18.7, color: "#10b981" },
    { name: isGeorgian ? "კომპოსტირება" : "Composting", value: 12.1, color: "#f59e0b" },
    { name: isGeorgian ? "დაწვა" : "Incineration", value: 4.0, color: "#6b7280" }
  ], [isGeorgian]);

  const recyclingTrendData = React.useMemo(() => [
    12.3, 13.8, 15.2, 16.7, 18.1, 19.4, 20.8, 22.1, 23.5, 24.9, 26.2, 27.6
  ], []);

  useEffect(() => {
    // Waste Composition Chart
    if (wasteCompositionRef.current) {
      const chart = echarts.init(wasteCompositionRef.current);
      
      const option = {
        title: {
          text: isGeorgian ? "ნარჩენების შემადგენლობა" : "Waste Composition",
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
          name: isGeorgian ? "ნარჩენები" : "Waste",
          type: 'pie',
          radius: ['40%', '70%'],
          center: ['60%', '60%'],
          data: wasteCompositionData.map(item => ({
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
  }, [isGeorgian, wasteCompositionData]);

  useEffect(() => {
    // Disposal Methods Chart
    if (disposalMethodsRef.current) {
      const chart = echarts.init(disposalMethodsRef.current);
      
      const option = {
        title: {
          text: isGeorgian ? "ნარჩენების მოპყრობის მეთოდები" : "Waste Disposal Methods",
          left: 'center',
          textStyle: { fontSize: 18, fontWeight: 'bold' }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'shadow' }
        },
        xAxis: {
          type: 'category',
          data: disposalMethodsData.map(item => item.name),
          axisLabel: {
            interval: 0,
            rotate: 45
          }
        },
        yAxis: {
          type: 'value',
          name: '%'
        },
        series: [{
          data: disposalMethodsData.map(item => ({
            value: item.value,
            itemStyle: { color: item.color }
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
  }, [isGeorgian, disposalMethodsData]);

  useEffect(() => {
    // Recycling Trend Chart
    if (recyclingTrendRef.current) {
      const chart = echarts.init(recyclingTrendRef.current);
      
      const option = {
        title: {
          text: isGeorgian ? "გადამუშავების მაჩვენებელი %" : "Recycling Rate %",
          left: 'center',
          textStyle: { fontSize: 18, fontWeight: 'bold' }
        },
        tooltip: {
          trigger: 'axis',
          formatter: function (params) {
            const month = params[0].axisValue;
            const value = params[0].value;
            return `${month}<br/>${isGeorgian ? "გადამუშავება" : "Recycling"}: ${value}%`;
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
          name: '%'
        },
        series: [{
          data: recyclingTrendData,
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
  }, [isGeorgian, recyclingTrendData]);

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
      className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 py-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Trash2 className="w-12 h-12 text-amber-600 mr-4" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              {isGeorgian ? "ნარჩენები" : "Waste Management"}
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {isGeorgian 
              ? "ნარჩენების მართვისა და გადამუშავების მონიტორინგი"
              : "Monitoring waste management and recycling processes"}
          </p>
        </motion.div>

        {/* Key Metrics */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center justify-between mb-2">
              <Trash2 className="w-8 h-8 text-gray-600" />
              <TrendingDown className="w-6 h-6 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">1.2M</h3>
            <p className="text-gray-600 text-sm">
              {isGeorgian ? "ტონა ნარჩენები/წელი" : "Tons Waste/Year"}
            </p>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center justify-between mb-2">
              <Recycle className="w-8 h-8 text-green-600" />
              <span className="text-sm font-medium text-green-600">+15%</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">27.6%</h3>
            <p className="text-gray-600 text-sm">
              {isGeorgian ? "გადამუშავების მაჩვენებელი" : "Recycling Rate"}
            </p>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center justify-between mb-2">
              <AlertTriangle className="w-8 h-8 text-red-600" />
              <span className="text-sm font-medium text-red-600">65.2%</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">784K</h3>
            <p className="text-gray-600 text-sm">
              {isGeorgian ? "ტონა ნაგავსაყრელში" : "Tons to Landfill"}
            </p>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center justify-between mb-2">
              <Recycle className="w-8 h-8 text-blue-600" />
              <span className="text-sm font-medium text-blue-600">42.5%</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">510K</h3>
            <p className="text-gray-600 text-sm">
              {isGeorgian ? "ტონა ორგანული" : "Tons Organic"}
            </p>
          </div>
        </motion.div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <motion.div variants={itemVariants} className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div ref={wasteCompositionRef} style={{ width: '100%', height: '400px' }} />
          </motion.div>

          <motion.div variants={itemVariants} className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div ref={disposalMethodsRef} style={{ width: '100%', height: '400px' }} />
          </motion.div>
        </div>

        <motion.div variants={itemVariants} className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 mb-12">
          <div ref={recyclingTrendRef} style={{ width: '100%', height: '400px' }} />
        </motion.div>

        {/* Waste Management Facilities */}
        <motion.div variants={itemVariants} className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
          <h3 className="text-2xl font-bold mb-6 text-gray-800">
            {isGeorgian ? "ნარჩენების მართვის ობიექტები" : "Waste Management Facilities"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-red-50 rounded-xl">
              <h4 className="font-semibold text-red-700 mb-2">
                {isGeorgian ? "ნაგავსაყრელები" : "Landfills"}
              </h4>
              <p className="text-2xl font-bold text-gray-800 mb-1">15</p>
              <p className="text-sm text-gray-600">
                {isGeorgian ? "ოფიციალური" : "Official"}
              </p>
            </div>
            
            <div className="text-center p-6 bg-green-50 rounded-xl">
              <h4 className="font-semibold text-green-700 mb-2">
                {isGeorgian ? "გადამუშავების ქარხნები" : "Recycling Plants"}
              </h4>
              <p className="text-2xl font-bold text-gray-800 mb-1">8</p>
              <p className="text-sm text-gray-600">
                {isGeorgian ? "აქტიური" : "Active"}
              </p>
            </div>
            
            <div className="text-center p-6 bg-amber-50 rounded-xl">
              <h4 className="font-semibold text-amber-700 mb-2">
                {isGeorgian ? "კომპოსტირების ცენტრები" : "Composting Centers"}
              </h4>
              <p className="text-2xl font-bold text-gray-800 mb-1">12</p>
              <p className="text-sm text-gray-600">
                {isGeorgian ? "ოპერირებული" : "Operational"}
              </p>
            </div>

            <div className="text-center p-6 bg-blue-50 rounded-xl">
              <h4 className="font-semibold text-blue-700 mb-2">
                {isGeorgian ? "ტრანსფერ სადგურები" : "Transfer Stations"}
              </h4>
              <p className="text-2xl font-bold text-gray-800 mb-1">25</p>
              <p className="text-sm text-gray-600">
                {isGeorgian ? "ფუნქციონალური" : "Functional"}
              </p>
            </div>
          </div>

          {/* Action Items */}
          <div className="mt-8 bg-gradient-to-r from-green-100 to-blue-100 rounded-xl p-6">
            <h4 className="text-lg font-semibold mb-4 text-gray-800">
              {isGeorgian ? "რეკომენდაციები" : "Recommendations"}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start space-x-3">
                <Recycle className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <h5 className="font-medium text-gray-800">
                    {isGeorgian ? "გადამუშავების გაზრდა" : "Increase Recycling"}
                  </h5>
                  <p className="text-sm text-gray-600">
                    {isGeorgian 
                      ? "მიზნობრივი მაჩვენებელი: 35% 2025 წლისთვის"
                      : "Target: 35% by 2025"}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
                <div>
                  <h5 className="font-medium text-gray-800">
                    {isGeorgian ? "ნაგავსაყრელების შემცირება" : "Reduce Landfilling"}
                  </h5>
                  <p className="text-sm text-gray-600">
                    {isGeorgian 
                      ? "მიზნობრივი მაჩვენებელი: 50% 2030 წლისთვის"
                      : "Target: 50% by 2030"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Waste;
