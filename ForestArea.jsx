import React, { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import { useLanguage } from "../../contexts/useLanguage";

// --- SOLUTION ---
// Define constant data outside the component to prevent re-creation on every render.
const dataGeo = [
  { name: "დაცული ტერიტორიები", value: 574.0 },
  { name: "აფხაზეთი", value: 423.3 },
  { name: "შიდა ქართლი", value: 284.3 },
  { name: "კახეთი", value: 283.6 },
  { name: "იმერეთი", value: 280.2 },
  { name: "სამეგრელო-ზემო სვანეთი", value: 271.6 },
  { name: "რაჭა-ლეჩხუმი და ქვემო სვანეთი", value: 267.9 },
  { name: "მცხეთა-მთიანეთი", value: 181.9 },
  { name: "აჭარის ავტონომიური რესპუბლიკა", value: 149.6 },
];

const dataEng = [
  { name: "Protected Areas", value: 574.0 },
  { name: "Abkhazia", value: 423.3 },
  { name: "Shida Kartli", value: 284.3 },
  { name: "Kakheti", value: 283.6 },
  { name: "Imereti", value: 280.2 },
  { name: "Samegrelo-Zemo Svaneti", value: 271.6 },
  { name: "Racha-Lechkhumi & Kvemo Svaneti", value: 267.9 },
  { name: "Mtskheta-Mtianeti", value: 181.9 },
  { name: "Adjara A.R.", value: 149.6 },
];

const ForestArea = () => {
  const chartRef = useRef(null);
  const { isGeorgian } = useLanguage();
  const [chartData, setChartData] = useState(isGeorgian ? dataGeo : dataEng);
  const [isLoading, setIsLoading] = useState(true);

  // This effect now only runs when the language changes.
  useEffect(() => {
    setChartData(isGeorgian ? dataGeo : dataEng);
  }, [isGeorgian]);

  useEffect(() => {
    if (chartData.length === 0 || !chartRef.current) return;

    const chart = echarts.init(chartRef.current);
    setIsLoading(true);

    // Modern gradient color palette with better accessibility
    const colorPalette = [
      "#10b981", // emerald-500
      "#3b82f6", // blue-500
      "#8b5cf6", // violet-500
      "#f59e0b", // amber-500
      "#ef4444", // red-500
      "#06b6d4", // cyan-500
      "#84cc16", // lime-500
      "#f97316", // orange-500
      "#ec4899", // pink-500
      "#6366f1", // indigo-500
    ];

    const option = {
      backgroundColor: "transparent",
      title: {
        text: isGeorgian
          ? "ტყის ფართობი რეგიონების მიხედვით"
          : "Forest Area by Region",
        left: "center",
        top: "2%",
        textStyle: {
          fontSize: 24,
          fontWeight: "600",
          color: "#1f2937",
          fontFamily: "Inter, system-ui, sans-serif",
        },
        subtext: isGeorgian
          ? "ათასი ჰექტარი • საქართველოს რეგიონები"
          : "Thousand Hectares • Georgian Regions",
        subtextStyle: {
          fontSize: 14,
          color: "#6b7280",
          fontFamily: "Inter, system-ui, sans-serif",
          lineHeight: 20,
        },
        padding: [0, 0, 30, 0],
      },
      tooltip: {
        trigger: "item",
        triggerOn: "mousemove",
        backgroundColor: "rgba(255, 255, 255, 0.98)",
        borderColor: "rgba(0, 0, 0, 0.1)",
        borderWidth: 1,
        borderRadius: 12,
        padding: [16, 20],
        textStyle: {
          color: "#1f2937",
          fontFamily: "Inter, system-ui, sans-serif",
          fontSize: 14,
        },
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        formatter: (params) => {
          return `
            <div style="font-weight: 600; margin-bottom: 8px; font-size: 16px; color: #111827;">
              ${params.name}
            </div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <div style="width: 12px; height: 12px; background: ${params.color}; border-radius: 50%;"></div>
              <span style="color: #6b7280;">${isGeorgian ? "ფართობი" : "Area"}:</span>
              <span style="font-weight: 600; color: #111827;">${params.value}</span>
              <span style="color: #9ca3af; font-size: 12px;">${isGeorgian ? "ათ. ჰა" : "k ha"}</span>
            </div>
          `;
        },
      },
      series: [
        {
          type: "tree",
          data: [
            {
              name: isGeorgian ? "ტყის საერთო ფართობი" : "Total Forest Area",
              value: 3069.1,
              children: chartData,
              itemStyle: {
                color: "#059669",
                borderColor: "#047857",
                borderWidth: 2,
                shadowColor: "rgba(5, 150, 105, 0.3)",
                shadowBlur: 8,
              },
            },
          ],
          top: "15%",
          left: "8%",
          bottom: "10%",
          right: "20%",
          symbolSize: [18, 18],
          orient: "horizontal",
          roam: true,
          scaleLimit: {
            min: 0.5,
            max: 2
          },
          label: {
            position: "left",
            verticalAlign: "middle",
            align: "right",
            fontSize: 14,
            color: "#374151",
            fontWeight: "600",
            fontFamily: "Inter, system-ui, sans-serif",
            formatter: function (params) {
              if (params.data.children) {
                return `{title|${params.name}}\n{value|${params.value} ${
                  isGeorgian ? "ათ. ჰა" : "k ha"
                }}`;
              }
              return params.name;
            },
            rich: {
              title: {
                fontSize: 16,
                fontWeight: "600",
                color: "#111827",
                lineHeight: 22,
              },
              value: {
                fontSize: 14,
                fontWeight: "500",
                color: "#059669",
                lineHeight: 20,
              },
            },
          },
          leaves: {
            label: {
              position: "right",
              verticalAlign: "middle",
              align: "left",
              fontSize: 13,
              color: "#4b5563",
              fontFamily: "Inter, system-ui, sans-serif",
              fontWeight: "500",
              formatter: function (params) {
                return `{name|${params.name}}\n{value|${params.value} ${
                  isGeorgian ? "ათ. ჰა" : "k ha"
                }}`;
              },
              rich: {
                name: {
                  fontSize: 13,
                  fontWeight: "500",
                  color: "#374151",
                  lineHeight: 18,
                },
                value: {
                  fontSize: 12,
                  fontWeight: "600",
                  lineHeight: 16,
                },
              },
            },
            itemStyle: {
              color: function (params) {
                return colorPalette[params.dataIndex % colorPalette.length];
              },
              borderWidth: 2,
              borderColor: "#ffffff",
              shadowColor: "rgba(0, 0, 0, 0.1)",
              shadowBlur: 4,
              shadowOffsetY: 2,
            },
          },
          expandAndCollapse: true,
          animationDuration: 1000,
          animationEasing: "cubicOut",
          initialTreeDepth: 2,
          lineStyle: {
            color: "#d1d5db",
            width: 2,
            curveness: 0.3,
            shadowColor: "rgba(0, 0, 0, 0.1)",
            shadowBlur: 2,
          },
          itemStyle: {
            color: "#059669",
            borderColor: "#047857",
            borderWidth: 2,
            shadowColor: "rgba(5, 150, 105, 0.3)",
            shadowBlur: 8,
          },
          emphasis: {
            focus: "descendant",
            scale: 1.1,
            lineStyle: {
              width: 3,
              color: "#6b7280",
              shadowColor: "rgba(0, 0, 0, 0.2)",
              shadowBlur: 4,
            },
            itemStyle: {
              shadowBlur: 12,
              shadowColor: "rgba(0, 0, 0, 0.3)",
            },
          },
        },
      ],
    };

    chart.setOption(option);
    
    // Add loading completion
    setTimeout(() => {
      setIsLoading(false);
    }, 500);

    const handleResize = () => {
      chart.resize();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.dispose();
    };
  }, [isGeorgian, chartData]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Modern Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-green-600 to-teal-700"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
        
        <div className="relative px-6 py-20 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-8 inline-flex items-center rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
              <span className="mr-2">🌲</span>
              {isGeorgian ? "გარემოს სტატისტიკა" : "Environmental Statistics"}
            </div>
            
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6">
              {isGeorgian ? "ტყის ფართობი" : "Forest Area"}
            </h1>
            
            <p className="text-xl leading-8 text-emerald-100 max-w-2xl mx-auto">
              {isGeorgian
                ? "საქართველოს რეგიონების ტყის რესურსების ვიზუალური ანალიზი და სტატისტიკური მონაცემები"
                : "Visual analysis and statistical data of forest resources across Georgian regions"}
            </p>
            
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <div className="flex items-center gap-4 text-emerald-100">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-300 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">
                    {isGeorgian ? "რეალურ დროში" : "Real-time Data"}
                  </span>
                </div>
                <div className="w-px h-4 bg-emerald-300/30"></div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">2015-2022</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10">
        {/* Main Chart Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl shadow-black/5 border border-white/20 p-8 mb-12">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {isGeorgian ? "ტყის ფართობის დინამიკა" : "Forest Area Distribution"}
                </h2>
                <p className="text-gray-600 text-lg">
                  {isGeorgian
                    ? "ინტერაქტიული ხის დიაგრამა რეგიონული განაწილებისთვის"
                    : "Interactive tree diagram for regional distribution"}
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span>{isGeorgian ? "ინტერაქტიული" : "Interactive"}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>{isGeorgian ? "მასშტაბირება" : "Zoomable"}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm rounded-2xl z-10">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
                  <span className="text-gray-600 font-medium">
                    {isGeorgian ? "იტვირთება..." : "Loading..."}
                  </span>
                </div>
              </div>
            )}
            <div 
              ref={chartRef} 
              className="w-full h-[600px] rounded-2xl transition-opacity duration-500"
              style={{ opacity: isLoading ? 0.5 : 1 }}
            />
          </div>
        </div>

        {/* Enhanced Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {[
            {
              title: isGeorgian ? "დაცული ტერიტორიები" : "Protected Areas",
              value: "574.0",
              icon: "🌲",
              gradient: "from-emerald-500 to-green-600",
              bg: "from-emerald-50 to-green-50",
              border: "border-emerald-200",
              badge: isGeorgian ? "ყველაზე დიდი" : "Largest",
              badgeColor: "bg-emerald-100 text-emerald-700",
            },
            {
              title: isGeorgian ? "რეგიონული საშუალო" : "Regional Average",
              value: "307.7",
              icon: "📊",
              gradient: "from-blue-500 to-cyan-600",
              bg: "from-blue-50 to-cyan-50",
              border: "border-blue-200",
              badge: isGeorgian ? "საშუალო" : "Average",
              badgeColor: "bg-blue-100 text-blue-700",
            },
            {
              title: isGeorgian ? "აჭარის ავტონომიური რესპუბლიკა" : "Adjara A.R.",
              value: "149.6",
              icon: "🏔️",
              gradient: "from-purple-500 to-pink-600",
              bg: "from-purple-50 to-pink-50",
              border: "border-purple-200",
              badge: isGeorgian ? "ყველაზე პატარა" : "Smallest",
              badgeColor: "bg-purple-100 text-purple-700",
            },
          ].map((stat, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br ${stat.bg} rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border ${stat.border} group hover:scale-105`}
            >
              <div className="flex items-center justify-between mb-6">
                <div className={`w-14 h-14 bg-gradient-to-br ${stat.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-2xl">{stat.icon}</span>
                </div>
                <span className={`text-sm font-semibold ${stat.badgeColor} px-3 py-1.5 rounded-full`}>
                  {stat.badge}
                </span>
              </div>
              
              <h4 className="text-lg font-semibold text-gray-900 mb-3 leading-tight">
                {stat.title}
              </h4>
              
              <div className="flex items-baseline gap-2">
                <p className="text-4xl font-bold bg-gradient-to-br from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  {stat.value}
                </p>
                <span className="text-sm text-gray-600 font-medium">
                  {isGeorgian ? "ათ. ჰა" : "k ha"}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Information Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-xl">📋</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                {isGeorgian ? "მონაცემების წყარო" : "Data Sources"}
              </h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700 leading-relaxed">
                  {isGeorgian
                    ? "საქართველოს სტატისტიკის ეროვნული სამსახური (საქსტატი)"
                    : "National Statistics Office of Georgia (Geostat)"}
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700 leading-relaxed">
                  {isGeorgian
                    ? "გარემოს დაცვისა და სოფლის მეურნეობის სამინისტრო"
                    : "Ministry of Environmental Protection and Agriculture"}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                <span className="text-xl">🔬</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                {isGeorgian ? "მეთოდოლოგია" : "Methodology"}
              </h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700 leading-relaxed">
                  {isGeorgian
                    ? "სატელიტური მონაცემები და დისტანციური ზონდირება"
                    : "Satellite data and remote sensing technology"}
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700 leading-relaxed">
                  {isGeorgian
                    ? "მიწისზედა კვლევები და ველური დაკვირვებები (2015-2022)"
                    : "Ground surveys and field observations (2015-2022)"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* New Insights Section */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 text-white mb-12">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">
              {isGeorgian ? "მთავარი დასკვნები" : "Key Insights"}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-400 mb-2">18.7%</div>
                <p className="text-gray-300 text-sm">
                  {isGeorgian ? "საქართველოს ტერიტორიის" : "of Georgia's Territory"}
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">9</div>
                <p className="text-gray-300 text-sm">
                  {isGeorgian ? "ადმინისტრაციული რეგიონი" : "Administrative Regions"}
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">3.1M</div>
                <p className="text-gray-300 text-sm">
                  {isGeorgian ? "ჰექტარი სულ" : "Total Hectares"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForestArea;