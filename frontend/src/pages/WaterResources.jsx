import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { motion as Motion } from "framer-motion";
import { Droplets, Filter, Gauge, TrendingUp } from "lucide-react";
import { useLanguage } from "../contexts/useLanguage";

const WaterResources = () => {
  const { isGeorgian } = useLanguage();
  const usageChartRef = useRef(null);
  const qualityChartRef = useRef(null);
  const reservoirChartRef = useRef(null);

  const waterUsageData = React.useMemo(() => [
    { name: isGeorgian ? "მუნიციპალური" : "Municipal", value: 35, color: "#3b82f6" },
    { name: isGeorgian ? "სოფლის მეურნეობა" : "Agriculture", value: 45, color: "#10b981" },
    { name: isGeorgian ? "მრეწველობა" : "Industry", value: 15, color: "#f59e0b" },
    { name: isGeorgian ? "ენერგეტიკა" : "Energy", value: 5, color: "#ef4444" }
  ], [isGeorgian]);

  const waterQualityData = React.useMemo(() => [
    85.5, 87.2, 84.8, 86.1, 88.3, 89.7, 91.2, 90.8, 89.4, 87.6, 86.9, 88.1
  ], []);

  const reservoirLevels = React.useMemo(() => [
    { name: isGeorgian ? "ენგური" : "Enguri", level: 85, capacity: 1100 },
    { name: isGeorgian ? "ვარდნილი" : "Vardnili", level: 72, capacity: 680 },
    { name: isGeorgian ? "ხრამი III" : "Khrami III", level: 94, capacity: 175 },
    { name: isGeorgian ? "შამალდი-სავარ" : "Shamaldi-Savar", level: 68, capacity: 170 }
  ], [isGeorgian]);

  useEffect(() => {
    // Water Usage Pie Chart
    if (usageChartRef.current) {
      const chart = echarts.init(usageChartRef.current);
      
      const option = {
        title: {
          text: isGeorgian ? "წყლის გამოყენება სექტორების მიხედვით" : "Water Usage by Sector",
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
          name: isGeorgian ? "წყლის გამოყენება" : "Water Usage",
          type: 'pie',
          radius: ['40%', '70%'],
          center: ['60%', '60%'],
          data: waterUsageData.map(item => ({
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
  }, [isGeorgian, waterUsageData]);

  useEffect(() => {
    // Water Quality Trend Chart
    if (qualityChartRef.current) {
      const chart = echarts.init(qualityChartRef.current);
      
      const option = {
        title: {
          text: isGeorgian ? "წყლის ხარისხის ინდექსი" : "Water Quality Index",
          left: 'center',
          textStyle: { fontSize: 18, fontWeight: 'bold' }
        },
        tooltip: {
          trigger: 'axis',
          formatter: function (params) {
            const month = params[0].axisValue;
            const value = params[0].value;
            return `${month}<br/>${isGeorgian ? "ხარისხი" : "Quality"}: ${value}%`;
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
          name: '%',
          min: 80,
          max: 95
        },
        series: [{
          data: waterQualityData,
          type: 'line',
          smooth: true,
          lineStyle: { width: 3, color: '#06b6d4' },
          itemStyle: { color: '#06b6d4' },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(6, 182, 212, 0.3)' },
              { offset: 1, color: 'rgba(6, 182, 212, 0.05)' }
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
  }, [isGeorgian, waterQualityData]);

  useEffect(() => {
    // Reservoir Levels Chart
    if (reservoirChartRef.current) {
      const chart = echarts.init(reservoirChartRef.current);
      
      const option = {
        title: {
          text: isGeorgian ? "წყალსაცავების დონე" : "Reservoir Levels",
          left: 'center',
          textStyle: { fontSize: 18, fontWeight: 'bold' }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'shadow' },
          formatter: function (params) {
            const data = reservoirLevels[params[0].dataIndex];
            return `${data.name}<br/>${isGeorgian ? "დონე" : "Level"}: ${data.level}%<br/>${isGeorgian ? "ტევადობა" : "Capacity"}: ${data.capacity} მლნ მ³`;
          }
        },
        xAxis: {
          type: 'category',
          data: reservoirLevels.map(item => item.name)
        },
        yAxis: {
          type: 'value',
          name: '%',
          max: 100
        },
        series: [{
          data: reservoirLevels.map(item => ({
            value: item.level,
            itemStyle: {
              color: item.level > 80 ? '#10b981' : item.level > 60 ? '#f59e0b' : '#ef4444'
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
  }, [isGeorgian, reservoirLevels]);

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
      className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-50 py-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <Motion.div variants={itemVariants} className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Droplets className="w-12 h-12 text-blue-600 mr-4" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              {isGeorgian ? "წყლის რესურსები" : "Water Resources"}
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {isGeorgian 
              ? "საქართველოს წყლის რესურსების მონიტორინგი და მართვა"
              : "Monitoring and management of Georgia's water resources"}
          </p>
        </Motion.div>

        {/* Key Metrics */}
        <Motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center justify-between mb-2">
              <Droplets className="w-8 h-8 text-blue-600" />
              <TrendingUp className="w-6 h-6 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">88.1%</h3>
            <p className="text-gray-600 text-sm">
              {isGeorgian ? "წყლის ხარისხი" : "Water Quality"}
            </p>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center justify-between mb-2">
              <Gauge className="w-8 h-8 text-cyan-600" />
              <span className="text-sm font-medium text-green-600">GOOD</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">79.8%</h3>
            <p className="text-gray-600 text-sm">
              {isGeorgian ? "წყალსაცავების საშუალო დონე" : "Avg Reservoir Level"}
            </p>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center justify-between mb-2">
              <Filter className="w-8 h-8 text-green-600" />
              <span className="text-sm font-medium text-blue-600">94%</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">2.8B</h3>
            <p className="text-gray-600 text-sm">
              {isGeorgian ? "გაწმენდილი (ლიტრი)" : "Treated (Liters)"}
            </p>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center justify-between mb-2">
              <Droplets className="w-8 h-8 text-red-600" />
              <span className="text-sm font-medium text-amber-600">-15%</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">12.3%</h3>
            <p className="text-gray-600 text-sm">
              {isGeorgian ? "წყლის დანაკარგები" : "Water Losses"}
            </p>
          </div>
        </Motion.div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Motion.div variants={itemVariants} className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div ref={usageChartRef} style={{ width: '100%', height: '400px' }} />
          </Motion.div>

          <Motion.div variants={itemVariants} className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div ref={qualityChartRef} style={{ width: '100%', height: '400px' }} />
          </Motion.div>
        </div>

        <Motion.div variants={itemVariants} className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 mb-12">
          <div ref={reservoirChartRef} style={{ width: '100%', height: '400px' }} />
        </Motion.div>

        {/* Water Treatment Plants */}
        <Motion.div variants={itemVariants} className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
          <h3 className="text-2xl font-bold mb-6 text-gray-800">
            {isGeorgian ? "მთავარი წყალგამწმენდი ნაგებობები" : "Major Water Treatment Plants"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-blue-50 rounded-xl">
              <h4 className="font-semibold text-blue-700 mb-2">
                {isGeorgian ? "თბილისი" : "Tbilisi"}
              </h4>
              <p className="text-2xl font-bold text-gray-800 mb-1">850,000</p>
              <p className="text-sm text-gray-600">
                {isGeorgian ? "მ³/დღე" : "m³/day"}
              </p>
            </div>
            
            <div className="text-center p-6 bg-cyan-50 rounded-xl">
              <h4 className="font-semibold text-cyan-700 mb-2">
                {isGeorgian ? "ბათუმი" : "Batumi"}
              </h4>
              <p className="text-2xl font-bold text-gray-800 mb-1">120,000</p>
              <p className="text-sm text-gray-600">
                {isGeorgian ? "მ³/დღე" : "m³/day"}
              </p>
            </div>
            
            <div className="text-center p-6 bg-teal-50 rounded-xl">
              <h4 className="font-semibold text-teal-700 mb-2">
                {isGeorgian ? "ქუთაისი" : "Kutaisi"}
              </h4>
              <p className="text-2xl font-bold text-gray-800 mb-1">95,000</p>
              <p className="text-sm text-gray-600">
                {isGeorgian ? "მ³/დღე" : "m³/day"}
              </p>
            </div>

            <div className="text-center p-6 bg-indigo-50 rounded-xl">
              <h4 className="font-semibold text-indigo-700 mb-2">
                {isGeorgian ? "რუსთავი" : "Rustavi"}
              </h4>
              <p className="text-2xl font-bold text-gray-800 mb-1">75,000</p>
              <p className="text-sm text-gray-600">
                {isGeorgian ? "მ³/დღე" : "m³/day"}
              </p>
            </div>
          </div>
        </Motion.div>
      </div>
    </Motion.div>
  );
};

export default WaterResources;
