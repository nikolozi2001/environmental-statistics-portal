import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { motion } from "framer-motion";
import { Map, Camera, Users, Sparkles } from "lucide-react";
import { useLanguage } from "../contexts/useLanguage";

const Others = () => {
  const { isGeorgian } = useLanguage();
  const wildlifeChartRef = useRef(null);
  const ruralAccountsRef = useRef(null);
  const landUseRef = useRef(null);

  const wildlifeData = React.useMemo(() => [
    { name: isGeorgian ? "ყვირილა" : "Brown Bear", count: 1850, trend: "stable", region: isGeorgian ? "კავკასიონი" : "Caucasus" },
    { name: isGeorgian ? "ფოცხვერი" : "Lynx", count: 120, trend: "increasing", region: isGeorgian ? "მთიანეთი" : "Highlands" },
    { name: isGeorgian ? "კავკასიური ჯიხვი" : "Caucasian Deer", count: 4200, trend: "stable", region: isGeorgian ? "ტყის ზონა" : "Forest Zone" },
    { name: isGeorgian ? "არწივი" : "Golden Eagle", count: 320, trend: "declining", region: isGeorgian ? "მთებში" : "Mountains" },
    { name: isGeorgian ? "კავკასიური ზვარტლი" : "Caucasian Grouse", count: 2800, trend: "stable", region: isGeorgian ? "ალპური ზონა" : "Alpine Zone" }
  ], [isGeorgian]);

  const ruralLandUseData = React.useMemo(() => [
    { name: isGeorgian ? "სასოფლო სამეურნეო მიწები" : "Agricultural Land", value: 43.2, color: "#10b981" },
    { name: isGeorgian ? "საძოვრები" : "Pastures", value: 28.7, color: "#f59e0b" },
    { name: isGeorgian ? "მებაღეობა" : "Orchards", value: 8.9, color: "#ef4444" },
    { name: isGeorgian ? "ვენახები" : "Vineyards", value: 4.1, color: "#8b5cf6" },
    { name: isGeorgian ? "სხვა" : "Others", value: 15.1, color: "#6b7280" }
  ], [isGeorgian]);

  const seasonalMigrationData = React.useMemo(() => [
    { month: isGeorgian ? "მარტი" : "March", species: 45, individuals: 12500 },
    { month: isGeorgian ? "აპრილი" : "April", species: 78, individuals: 25600 },
    { month: isGeorgian ? "მაისი" : "May", species: 95, individuals: 34200 },
    { month: isGeorgian ? "ივნისი" : "June", species: 68, individuals: 18900 },
    { month: isGeorgian ? "ივლისი" : "July", species: 52, individuals: 14200 },
    { month: isGeorgian ? "აგვისტო" : "August", species: 61, individuals: 16800 },
    { month: isGeorgian ? "სექტემბერი" : "September", species: 89, individuals: 28400 },
    { month: isGeorgian ? "ოქტომბერი" : "October", species: 112, individuals: 41300 },
    { month: isGeorgian ? "ნოემბერი" : "November", species: 67, individuals: 19500 }
  ], [isGeorgian]);

  useEffect(() => {
    // Wildlife Population Chart
    if (wildlifeChartRef.current) {
      const chart = echarts.init(wildlifeChartRef.current);
      
      const option = {
        title: {
          text: isGeorgian ? "გარეული ფაუნის პოპულაცია" : "Wildlife Population",
          left: 'center',
          textStyle: { fontSize: 18, fontWeight: 'bold' }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'shadow' }
        },
        xAxis: {
          type: 'category',
          data: wildlifeData.map(item => item.name),
          axisLabel: {
            interval: 0,
            rotate: 45
          }
        },
        yAxis: {
          type: 'value',
          name: isGeorgian ? 'ინდივიდების რაოდენობა' : 'Number of Individuals'
        },
        series: [{
          data: wildlifeData.map(item => ({
            value: item.count,
            itemStyle: {
              color: item.trend === 'increasing' ? '#10b981' : 
                     item.trend === 'declining' ? '#ef4444' : '#3b82f6'
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
  }, [isGeorgian, wildlifeData]);

  useEffect(() => {
    // Rural Land Use Chart
    if (ruralAccountsRef.current) {
      const chart = echarts.init(ruralAccountsRef.current);
      
      const option = {
        title: {
          text: isGeorgian ? "სოფლის მიწათსარგებლობა" : "Rural Land Use",
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
          name: isGeorgian ? "მიწათსარგებლობა" : "Land Use",
          type: 'pie',
          radius: ['40%', '70%'],
          center: ['60%', '60%'],
          data: ruralLandUseData.map(item => ({
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
  }, [isGeorgian, ruralLandUseData]);

  useEffect(() => {
    // Seasonal Bird Migration Chart
    if (landUseRef.current) {
      const chart = echarts.init(landUseRef.current);
      
      const option = {
        title: {
          text: isGeorgian ? "ფრინველების სეზონური მიგრაცია" : "Seasonal Bird Migration",
          left: 'center',
          textStyle: { fontSize: 18, fontWeight: 'bold' }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'cross' }
        },
        legend: {
          data: [isGeorgian ? 'სახეობების რაოდენობა' : 'Number of Species', isGeorgian ? 'ინდივიდების რაოდენობა' : 'Number of Individuals']
        },
        xAxis: {
          type: 'category',
          data: seasonalMigrationData.map(item => item.month)
        },
        yAxis: [
          {
            type: 'value',
            name: isGeorgian ? 'სახეობები' : 'Species',
            position: 'left'
          },
          {
            type: 'value',
            name: isGeorgian ? 'ინდივიდები' : 'Individuals',
            position: 'right'
          }
        ],
        series: [
          {
            name: isGeorgian ? 'სახეობების რაოდენობა' : 'Number of Species',
            type: 'line',
            data: seasonalMigrationData.map(item => item.species),
            itemStyle: { color: '#3b82f6' }
          },
          {
            name: isGeorgian ? 'ინდივიდების რაოდენობა' : 'Number of Individuals',
            type: 'bar',
            yAxisIndex: 1,
            data: seasonalMigrationData.map(item => item.individuals),
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
  }, [isGeorgian, seasonalMigrationData]);

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
      className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 py-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="w-12 h-12 text-rose-600 mr-4" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
              {isGeorgian ? "სხვა გარემოსდაცვითი ანგარიშები" : "Other Environmental Accounts"}
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {isGeorgian 
              ? "სოფლის გარემოსდაცვითი ანგარიშები, გარეული ცხოველები და ფრინველები"
              : "Rural environmental accounts, wildlife and bird statistics"}
          </p>
        </motion.div>

        {/* Key Metrics */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center justify-between mb-2">
              <Camera className="w-8 h-8 text-green-600" />
              <span className="text-sm font-medium text-green-600">585</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">9,490</h3>
            <p className="text-gray-600 text-sm">
              {isGeorgian ? "გარეული ცხოველების რაოდენობა" : "Wildlife Population"}
            </p>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center justify-between mb-2">
              <Map className="w-8 h-8 text-blue-600" />
              <span className="text-sm font-medium text-blue-600">43.2%</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">1.85M</h3>
            <p className="text-gray-600 text-sm">
              {isGeorgian ? "ჰექტარი სასოფლო მიწა" : "Hectares Agricultural Land"}
            </p>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-8 h-8 text-purple-600" />
              <span className="text-sm font-medium text-purple-600">330</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">95</h3>
            <p className="text-gray-600 text-sm">
              {isGeorgian ? "მიგრირებადი ფრინველების სახეობა" : "Migratory Bird Species"}
            </p>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center justify-between mb-2">
              <Sparkles className="w-8 h-8 text-amber-600" />
              <span className="text-sm font-medium text-amber-600">28.7%</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">1.23M</h3>
            <p className="text-gray-600 text-sm">
              {isGeorgian ? "ჰექტარი საძოვარი" : "Hectares Pasture Land"}
            </p>
          </div>
        </motion.div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <motion.div variants={itemVariants} className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div ref={wildlifeChartRef} style={{ width: '100%', height: '400px' }} />
          </motion.div>

          <motion.div variants={itemVariants} className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div ref={ruralAccountsRef} style={{ width: '100%', height: '400px' }} />
          </motion.div>
        </div>

        <motion.div variants={itemVariants} className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 mb-12">
          <div ref={landUseRef} style={{ width: '100%', height: '400px' }} />
        </motion.div>

        {/* Conservation Programs */}
        <motion.div variants={itemVariants} className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
          <h3 className="text-2xl font-bold mb-6 text-gray-800">
            {isGeorgian ? "კონსერვაციის პროგრამები" : "Conservation Programs"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 bg-green-50 rounded-xl">
              <h4 className="font-semibold text-green-700 mb-3">
                {isGeorgian ? "კავკასიური ჯიხვის კონსერვაცია" : "Caucasian Deer Conservation"}
              </h4>
              <p className="text-sm text-gray-600 mb-3">
                {isGeorgian 
                  ? "პროგრამა მიზნად ისახავს კავკასიური ჯიხვის პოპულაციის დაცვას და აღდგენას"
                  : "Program aims to protect and restore Caucasian deer population"}
              </p>
              <div className="flex items-center text-sm text-green-700">
                <span className="font-medium">სტატუსი:</span>
                <span className="ml-2 bg-green-100 px-2 py-1 rounded">
                  {isGeorgian ? "აქტიური" : "Active"}
                </span>
              </div>
            </div>
            
            <div className="p-6 bg-blue-50 rounded-xl">
              <h4 className="font-semibold text-blue-700 mb-3">
                {isGeorgian ? "ფრინველების მიგრაციის მონიტორინგი" : "Bird Migration Monitoring"}
              </h4>
              <p className="text-sm text-gray-600 mb-3">
                {isGeorgian 
                  ? "ფრინველების მიგრაციის მარშრუტების თვალყურევნება და დაცვა"
                  : "Monitoring and protection of bird migration routes"}
              </p>
              <div className="flex items-center text-sm text-blue-700">
                <span className="font-medium">სტატუსი:</span>
                <span className="ml-2 bg-blue-100 px-2 py-1 rounded">
                  {isGeorgian ? "აქტიური" : "Active"}
                </span>
              </div>
            </div>
            
            <div className="p-6 bg-purple-50 rounded-xl">
              <h4 className="font-semibold text-purple-700 mb-3">
                {isGeorgian ? "სოფლის ეკოსისტემების აღდგენა" : "Rural Ecosystem Restoration"}
              </h4>
              <p className="text-sm text-gray-600 mb-3">
                {isGeorgian 
                  ? "სოფლის გარემოში დეგრადირებული ეკოსისტემების აღდგენა"
                  : "Restoration of degraded ecosystems in rural areas"}
              </p>
              <div className="flex items-center text-sm text-purple-700">
                <span className="font-medium">სტატუსი:</span>
                <span className="ml-2 bg-purple-100 px-2 py-1 rounded">
                  {isGeorgian ? "დაგეგმილი" : "Planned"}
                </span>
              </div>
            </div>
          </div>

          {/* Research Initiatives */}
          <div className="mt-8 bg-gradient-to-r from-rose-100 to-pink-100 rounded-xl p-6">
            <h4 className="text-lg font-semibold mb-4 text-gray-800">
              {isGeorgian ? "მიმდინარე კვლევები" : "Ongoing Research"}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start space-x-3">
                <Camera className="w-5 h-5 text-rose-600 mt-0.5" />
                <div>
                  <h5 className="font-medium text-gray-800">
                    {isGeorgian ? "ფოტო-კაფნების მონიტორინგი" : "Camera Trap Monitoring"}
                  </h5>
                  <p className="text-sm text-gray-600">
                    {isGeorgian 
                      ? "150 ფოტო-კაფანი 12 ნაკრძალში დაყენებულია"
                      : "150 camera traps deployed across 12 reserves"}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Map className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h5 className="font-medium text-gray-800">
                    {isGeorgian ? "GIS კარტოგრაფია" : "GIS Mapping"}
                  </h5>
                  <p className="text-sm text-gray-600">
                    {isGeorgian 
                      ? "ჰაბიტატების დეტალური კარტირება"
                      : "Detailed habitat mapping and analysis"}
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

export default Others;
