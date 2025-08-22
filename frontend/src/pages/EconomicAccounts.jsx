import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { motion as Motion } from "framer-motion";
import { BarChart3, TrendingUp, DollarSign, FileText } from "lucide-react";
import { useLanguage } from "../contexts/useLanguage";

const EconomicAccounts = () => {
  const { isGeorgian } = useLanguage();
  const materialFlowRef = useRef(null);
  const economicImpactRef = useRef(null);
  const resourceEfficiencyRef = useRef(null);

  const materialFlowData = React.useMemo(() => [
    { name: isGeorgian ? "ბიომასა" : "Biomass", input: 45.2, output: 12.8, color: "#10b981" },
    { name: isGeorgian ? "ლითონები" : "Metals", input: 8.7, output: 6.2, color: "#6b7280" },
    { name: isGeorgian ? "არამეტალური მინერალები" : "Non-metallic Minerals", input: 125.3, output: 15.4, color: "#f59e0b" },
    { name: isGeorgian ? "ფოსილური საწვავი" : "Fossil Fuels", input: 18.9, output: 2.1, color: "#ef4444" }
  ], [isGeorgian]);

  const economicSectorsData = React.useMemo(() => [
    { name: isGeorgian ? "სოფლის მეურნეობა" : "Agriculture", value: 28.5, emissions: 15.2 },
    { name: isGeorgian ? "მრეწველობა" : "Industry", value: 35.7, emissions: 45.8 },
    { name: isGeorgian ? "სერვისები" : "Services", value: 25.8, emissions: 12.3 },
    { name: isGeorgian ? "ენერგეტიკა" : "Energy", value: 10.0, emissions: 26.7 }
  ], [isGeorgian]);

  const efficiencyTrendData = React.useMemo(() => [
    2.1, 2.3, 2.5, 2.8, 3.1, 3.4, 3.7, 4.0, 4.3, 4.6, 4.9, 5.2
  ], []);

  useEffect(() => {
    // Material Flow Chart
    if (materialFlowRef.current) {
      const chart = echarts.init(materialFlowRef.current);
      
      const option = {
        title: {
          text: isGeorgian ? "მატერიალური ნაკადები (მლნ ტონა)" : "Material Flows (Million Tons)",
          left: 'center',
          textStyle: { fontSize: 18, fontWeight: 'bold' }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'shadow' }
        },
        legend: {
          data: [isGeorgian ? 'შემოსავალი' : 'Input', isGeorgian ? 'გამოსავალი' : 'Output'],
          top: 30
        },
        xAxis: {
          type: 'category',
          data: materialFlowData.map(item => item.name),
          axisLabel: {
            interval: 0,
            rotate: 45
          }
        },
        yAxis: {
          type: 'value',
          name: isGeorgian ? 'მლნ ტონა' : 'Million Tons'
        },
        series: [
          {
            name: isGeorgian ? 'შემოსავალი' : 'Input',
            type: 'bar',
            data: materialFlowData.map(item => item.input),
            itemStyle: { color: '#3b82f6' }
          },
          {
            name: isGeorgian ? 'გამოსავალი' : 'Output',
            type: 'bar',
            data: materialFlowData.map(item => item.output),
            itemStyle: { color: '#ef4444' }
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
  }, [isGeorgian, materialFlowData]);

  useEffect(() => {
    // Economic Impact vs Emissions
    if (economicImpactRef.current) {
      const chart = echarts.init(economicImpactRef.current);
      
      const option = {
        title: {
          text: isGeorgian ? "ეკონომიკური წვლილი vs ემისიები" : "Economic Contribution vs Emissions",
          left: 'center',
          textStyle: { fontSize: 18, fontWeight: 'bold' }
        },
        tooltip: {
          trigger: 'item',
          formatter: function(params) {
            const data = economicSectorsData[params.dataIndex];
            return `${data.name}<br/>${isGeorgian ? 'GDP წვლილი' : 'GDP Contribution'}: ${data.value}%<br/>${isGeorgian ? 'ემისიები' : 'Emissions'}: ${data.emissions}%`;
          }
        },
        xAxis: {
          type: 'value',
          name: isGeorgian ? 'GDP წვლილი (%)' : 'GDP Contribution (%)',
          max: 40
        },
        yAxis: {
          type: 'value',
          name: isGeorgian ? 'ემისიები (%)' : 'Emissions (%)',
          max: 50
        },
        series: [{
          data: economicSectorsData.map((item, index) => ({
            value: [item.value, item.emissions],
            name: item.name,
            symbolSize: Math.sqrt(item.value) * 8,
            itemStyle: {
              color: ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'][index]
            }
          })),
          type: 'scatter'
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
  }, [isGeorgian, economicSectorsData]);

  useEffect(() => {
    // Resource Efficiency Trend
    if (resourceEfficiencyRef.current) {
      const chart = echarts.init(resourceEfficiencyRef.current);
      
      const option = {
        title: {
          text: isGeorgian ? "რესურსის ეფექტურობა (ლარი/კგ)" : "Resource Efficiency (GEL/kg)",
          left: 'center',
          textStyle: { fontSize: 18, fontWeight: 'bold' }
        },
        tooltip: {
          trigger: 'axis',
          formatter: function (params) {
            const month = params[0].axisValue;
            const value = params[0].value;
            return `${month}<br/>${isGeorgian ? "ეფექტურობა" : "Efficiency"}: ${value} ${isGeorgian ? "ლარი/კგ" : "GEL/kg"}`;
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
          name: isGeorgian ? 'ლარი/კგ' : 'GEL/kg'
        },
        series: [{
          data: efficiencyTrendData,
          type: 'line',
          smooth: true,
          lineStyle: { width: 3, color: '#8b5cf6' },
          itemStyle: { color: '#8b5cf6' },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(139, 92, 246, 0.3)' },
              { offset: 1, color: 'rgba(139, 92, 246, 0.05)' }
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
  }, [isGeorgian, efficiencyTrendData]);

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
      className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <Motion.div variants={itemVariants} className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <BarChart3 className="w-12 h-12 text-indigo-600 mr-4" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {isGeorgian ? "გარემოს ეკონომიკური ანგარიშები" : "Environmental Economic Accounts"}
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {isGeorgian 
              ? "ეკონომიკისა და გარემოს ურთიერთქმედების ანალიზი"
              : "Analysis of the interaction between economy and environment"}
          </p>
        </Motion.div>

        {/* Key Metrics */}
        <Motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center justify-between mb-2">
              <BarChart3 className="w-8 h-8 text-indigo-600" />
              <TrendingUp className="w-6 h-6 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">5.2</h3>
            <p className="text-gray-600 text-sm">
              {isGeorgian ? "რესურსის ეფექტურობა" : "Resource Efficiency"}
            </p>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="w-8 h-8 text-green-600" />
              <span className="text-sm font-medium text-green-600">GDP</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">₾54.8B</h3>
            <p className="text-gray-600 text-sm">
              {isGeorgian ? "მთლიანი შიდა პროდუქტი" : "Gross Domestic Product"}
            </p>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center justify-between mb-2">
              <FileText className="w-8 h-8 text-purple-600" />
              <span className="text-sm font-medium text-purple-600">198M</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">42.5%</h3>
            <p className="text-gray-600 text-sm">
              {isGeorgian ? "მატერიალური ეფექტურობა" : "Material Efficiency"}
            </p>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-8 h-8 text-amber-600" />
              <span className="text-sm font-medium text-amber-600">+12%</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">₾2.8T</h3>
            <p className="text-gray-600 text-sm">
              {isGeorgian ? "ნატურალური კაპიტალი" : "Natural Capital"}
            </p>
          </div>
        </Motion.div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Motion.div variants={itemVariants} className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div ref={materialFlowRef} style={{ width: '100%', height: '400px' }} />
          </Motion.div>

          <Motion.div variants={itemVariants} className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div ref={economicImpactRef} style={{ width: '100%', height: '400px' }} />
          </Motion.div>
        </div>

        <Motion.div variants={itemVariants} className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 mb-12">
          <div ref={resourceEfficiencyRef} style={{ width: '100%', height: '400px' }} />
        </Motion.div>

        {/* Key Indicators */}
        <Motion.div variants={itemVariants} className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
          <h3 className="text-2xl font-bold mb-6 text-gray-800">
            {isGeorgian ? "ძირითადი ინდიკატორები" : "Key Indicators"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-blue-50 rounded-xl">
              <h4 className="font-semibold text-blue-700 mb-2">
                {isGeorgian ? "მატერიალური ინტენსივობა" : "Material Intensity"}
              </h4>
              <p className="text-2xl font-bold text-gray-800 mb-1">3.6</p>
              <p className="text-sm text-gray-600">
                {isGeorgian ? "კგ/ლარი GDP" : "kg/GEL GDP"}
              </p>
            </div>
            
            <div className="text-center p-6 bg-green-50 rounded-xl">
              <h4 className="font-semibold text-green-700 mb-2">
                {isGeorgian ? "ენერგიის ინტენსივობა" : "Energy Intensity"}
              </h4>
              <p className="text-2xl font-bold text-gray-800 mb-1">0.18</p>
              <p className="text-sm text-gray-600">
                {isGeorgian ? "MJ/ლარი GDP" : "MJ/GEL GDP"}
              </p>
            </div>
            
            <div className="text-center p-6 bg-purple-50 rounded-xl">
              <h4 className="font-semibold text-purple-700 mb-2">
                {isGeorgian ? "CO₂ ინტენსივობა" : "CO₂ Intensity"}
              </h4>
              <p className="text-2xl font-bold text-gray-800 mb-1">0.89</p>
              <p className="text-sm text-gray-600">
                {isGeorgian ? "კგ/ლარი GDP" : "kg/GEL GDP"}
              </p>
            </div>

            <div className="text-center p-6 bg-amber-50 rounded-xl">
              <h4 className="font-semibold text-amber-700 mb-2">
                {isGeorgian ? "წყლის ინტენსივობა" : "Water Intensity"}
              </h4>
              <p className="text-2xl font-bold text-gray-800 mb-1">25.4</p>
              <p className="text-sm text-gray-600">
                {isGeorgian ? "მ³/ლარი GDP" : "m³/GEL GDP"}
              </p>
            </div>
          </div>
        </Motion.div>
      </div>
    </Motion.div>
  );
};

export default EconomicAccounts;
