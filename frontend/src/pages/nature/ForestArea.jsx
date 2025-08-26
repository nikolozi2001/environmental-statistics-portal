import React, { useEffect, useRef, useState, useCallback } from "react";
import * as echarts from "echarts";
import {
  ArrowUp,
  TreePine,
  BarChart3,
  Leaf,
  MapPin,
  TrendingUp,
  Globe,
  Info,
} from "lucide-react";
import { useLanguage } from "../../contexts/useLanguage";

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
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    setChartData(isGeorgian ? dataGeo : dataEng);
  }, [isGeorgian]);

  useEffect(() => {
    // Trigger animations after mount
    setTimeout(() => setIsAnimated(true), 100);
  }, []);

  useEffect(() => {
    if (chartData.length === 0 || !chartRef.current) return;

    const chart = echarts.init(chartRef.current, null, {
      renderer: "canvas",
    });

    // Modern gradient colors
    const colorPalette = [
      "#10b981",
      "#059669",
      "#047857",
      "#065f46",
      "#14b8a6",
      "#0d9488",
      "#0f766e",
      "#115e59",
      "#06b6d4",
    ];

    const option = {
      backgroundColor: "transparent",
      title: {
        text: isGeorgian
          ? "ტყის ფართობი რეგიონების მიხედვით"
          : "Forest Area by Region",
        left: "center",
        top: "20",
        textStyle: {
          fontSize: 28,
          fontWeight: "bold",
          color: "#f3f4f6",
          fontFamily: "system-ui, -apple-system, sans-serif",
        },
        subtext: isGeorgian
          ? "ინტერაქტიული ვიზუალიზაცია • ათასი ჰექტარი"
          : "Interactive Visualization • Thousand Hectares",
        subtextStyle: {
          fontSize: 16,
          color: "#9ca3af",
          fontFamily: "system-ui, -apple-system, sans-serif",
        },
      },
      tooltip: {
        trigger: "item",
        backgroundColor: "rgba(17, 24, 39, 0.95)",
        borderColor: "#374151",
        borderWidth: 1,
        textStyle: {
          color: "#f3f4f6",
          fontSize: 14,
        },
        formatter: (params) => {
          const percentage = ((params.value / 3069.1) * 100).toFixed(1);
          return `
            <div style="padding: 8px;">
              <div style="font-weight: bold; font-size: 16px; margin-bottom: 8px; color: ${
                params.color
              }">
                ${params.name}
              </div>
              <div style="display: flex; justify-content: space-between; gap: 20px;">
                <span>${isGeorgian ? "ფართობი" : "Area"}:</span>
                <span style="font-weight: bold;">${params.value} ${
            isGeorgian ? "ათ. ჰა" : "thous. ha"
          }</span>
              </div>
              <div style="display: flex; justify-content: space-between; gap: 20px; margin-top: 4px;">
                <span>${isGeorgian ? "წილი" : "Share"}:</span>
                <span style="font-weight: bold; color: ${
                  params.color
                }">${percentage}%</span>
              </div>
            </div>
          `;
        },
        extraCssText:
          "backdrop-filter: blur(10px); border-radius: 8px; box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);",
      },
      series: [
        {
          type: "tree",
          data: [
            {
              name: isGeorgian ? "საქართველოს ტყეები" : "Georgian Forests",
              value: 3069.1,
              children: chartData.map((item, index) => ({
                ...item,
                itemStyle: {
                  color: colorPalette[index % colorPalette.length],
                  shadowBlur: 10,
                  shadowColor: "rgba(0, 0, 0, 0.3)",
                },
              })),
              itemStyle: {
                color: "#065f46",
                borderColor: "#10b981",
                borderWidth: 3,
                shadowBlur: 20,
                shadowColor: "rgba(16, 185, 129, 0.5)",
              },
            },
          ],
          top: "15%",
          left: "5%",
          bottom: "10%",
          right: "20%",
          symbolSize: 16,
          orient: "horizontal",
          label: {
            position: "left",
            verticalAlign: "middle",
            align: "right",
            fontSize: 16,
            color: "#e5e7eb",
            fontWeight: "600",
            fontFamily: "system-ui, -apple-system, sans-serif",
            formatter: function (params) {
              if (params.data.children) {
                return `{title|${params.name}}\n{value|${params.value} ${
                  isGeorgian ? "ათ. ჰა" : "thous. ha"
                }}`;
              }
              return params.name;
            },
            rich: {
              title: {
                fontSize: 18,
                fontWeight: "bold",
                color: "#f3f4f6",
                padding: [0, 0, 8, 0],
              },
              value: {
                fontSize: 14,
                color: "#9ca3af",
              },
            },
          },
          leaves: {
            label: {
              position: "right",
              verticalAlign: "middle",
              align: "left",
              fontSize: 14,
              color: "#e5e7eb",
              fontFamily: "system-ui, -apple-system, sans-serif",
              formatter: function (params) {
                return `{name|${params.name}}\n{value|${params.value} ${
                  isGeorgian ? "ათ. ჰა" : "thous. ha"
                }}`;
              },
              rich: {
                name: {
                  fontSize: 14,
                  color: "#f3f4f6",
                  padding: [0, 0, 4, 0],
                },
                value: {
                  fontSize: 12,
                  color: "#9ca3af",
                  fontWeight: "bold",
                },
              },
            },
            itemStyle: {
              borderRadius: 4,
              borderWidth: 2,
              borderColor: "#1f2937",
            },
          },
          expandAndCollapse: true,
          animationDuration: 1000,
          animationEasing: "elasticOut",
          initialTreeDepth: 2,
          lineStyle: {
            color: "#4b5563",
            width: 2,
            curveness: 0.5,
            shadowBlur: 2,
            shadowColor: "rgba(0, 0, 0, 0.2)",
          },
          emphasis: {
            focus: "descendant",
            lineStyle: {
              width: 3,
              color: "#10b981",
              shadowBlur: 10,
              shadowColor: "rgba(16, 185, 129, 0.5)",
            },
            itemStyle: {
              borderColor: "#10b981",
              borderWidth: 3,
              shadowBlur: 20,
              shadowColor: "rgba(16, 185, 129, 0.5)",
            },
          },
        },
      ],
      animation: true,
      animationThreshold: 100,
      animationDurationUpdate: 750,
      animationEasingUpdate: "elasticOut",
    };

    chart.setOption(option);

    const handleResize = () => {
      chart.resize();
    };
    window.addEventListener("resize", handleResize);

    // Add click handler
    chart.on("click", (params) => {
      if (params.data && !params.data.children) {
        setSelectedRegion(params.data);
      }
    });

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.dispose();
    };
  }, [isGeorgian, chartData]);

  const calculatePercentage = (value) => {
    return ((value / 3069.1) * 100).toFixed(1);
  };

  const StatCard = ({ icon: Icon, title, value, subtitle, color, delay }) => (
    <div
      className={`transform transition-all duration-700 ${
        isAnimated ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="relative group h-full">
        <div
          className={`absolute -inset-1 ${color} rounded-2xl blur-lg opacity-25 group-hover:opacity-40 transition-opacity`}
        ></div>
        <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 h-full border border-gray-700 hover:border-gray-600 transition-all duration-300">
          <div className="flex items-start justify-between mb-4">
            <div
              className={`w-12 h-12 ${color} bg-opacity-20 rounded-xl flex items-center justify-center`}
            >
              <Icon className={`w-6 h-6 text-white`} />
            </div>
            <span
              className={`text-xs font-semibold text-gray-400 ${color} bg-opacity-10 px-3 py-1 rounded-full`}
            >
              {subtitle}
            </span>
          </div>
          <h4 className="text-lg font-medium text-gray-200 mb-2">{title}</h4>
          <p
            className={`text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${color}`}
          >
            {value}
          </p>
          <p className="text-sm text-gray-400 mt-1">
            {isGeorgian ? "ათასი ჰექტარი" : "Thousand Hectares"}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-500 rounded-full filter blur-[120px] opacity-20 animate-pulse"></div>
        <div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-emerald-500 rounded-full filter blur-[120px] opacity-20 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-500 rounded-full filter blur-[150px] opacity-10"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/50 to-gray-900"></div>
          <div className="relative px-4 py-20 text-center">
            <div className="max-w-5xl mx-auto">
              <div
                className={`transform transition-all duration-700 ${
                  isAnimated
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
              >
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-green-500 blur-xl opacity-50"></div>
                    <TreePine className="relative w-20 h-20 text-green-400" />
                  </div>
                </div>
                <h1 className="text-5xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
                  {isGeorgian
                    ? "საქართველოს ტყის რესურსები"
                    : "Georgian Forest Resources"}
                </h1>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                  {isGeorgian
                    ? "ინტერაქტიული ვიზუალიზაცია და დეტალური ანალიზი რეგიონების მიხედვით"
                    : "Interactive visualization and detailed analysis by regions"}
                </p>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
                  <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-xl p-4 hover:bg-gray-800/50 transition-all">
                    <div className="text-2xl font-bold text-green-400">
                      3,069.1
                    </div>
                    <div className="text-sm text-gray-400">
                      {isGeorgian ? "ათ. ჰა სულ" : "thous. ha total"}
                    </div>
                  </div>
                  <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-xl p-4 hover:bg-gray-800/50 transition-all">
                    <div className="text-2xl font-bold text-emerald-400">
                      44.2%
                    </div>
                    <div className="text-sm text-gray-400">
                      {isGeorgian ? "ტერიტორიის" : "of territory"}
                    </div>
                  </div>
                  <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-xl p-4 hover:bg-gray-800/50 transition-all">
                    <div className="text-2xl font-bold text-teal-400">9</div>
                    <div className="text-sm text-gray-400">
                      {isGeorgian ? "რეგიონი" : "regions"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="px-4 pb-20">
          <div className="max-w-7xl mx-auto">
            {/* Main Chart */}
            <div
              className={`transform transition-all duration-700 ${
                isAnimated
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-md rounded-3xl shadow-2xl p-8 mb-12 border border-gray-700">
                <div
                  ref={chartRef}
                  style={{ width: "100%", height: "600px" }}
                />

                {/* Selected Region Info */}
                {selectedRegion && (
                  <div className="mt-6 p-4 bg-gray-800/50 rounded-xl border border-gray-700 animate-fadeIn">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-green-400">
                          {selectedRegion.name}
                        </h3>
                        <p className="text-gray-400">
                          {selectedRegion.value}{" "}
                          {isGeorgian ? "ათ. ჰა" : "thous. ha"} •
                          {calculatePercentage(selectedRegion.value)}%{" "}
                          {isGeorgian ? "მთლიანი ფართობიდან" : "of total area"}
                        </p>
                      </div>
                      <button
                        onClick={() => setSelectedRegion(null)}
                        className="text-gray-500 hover:text-gray-300 transition-colors"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <StatCard
                icon={MapPin}
                title={isGeorgian ? "დაცული ტერიტორიები" : "Protected Areas"}
                value="574.0"
                subtitle={isGeorgian ? "ყველაზე დიდი" : "Largest"}
                color="from-green-400 to-emerald-500"
                delay={300}
              />
              <StatCard
                icon={BarChart3}
                title={isGeorgian ? "რეგიონული საშუალო" : "Regional Average"}
                value="307.7"
                subtitle={isGeorgian ? "საშუალო" : "Average"}
                color="from-blue-400 to-cyan-500"
                delay={400}
              />
              <StatCard
                icon={TrendingUp}
                title={isGeorgian ? "აჭარის ა.რ." : "Adjara A.R."}
                value="149.6"
                subtitle={isGeorgian ? "ყველაზე პატარა" : "Smallest"}
                color="from-purple-400 to-pink-500"
                delay={500}
              />
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div
                className={`transform transition-all duration-700 ${
                  isAnimated
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: "600ms" }}
              >
                <div className="group relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
                  <div className="relative bg-gray-800/80 backdrop-blur-md rounded-2xl p-6 border border-gray-700">
                    <div className="flex items-center gap-3 mb-4">
                      <Info className="w-6 h-6 text-green-400" />
                      <h3 className="text-xl font-semibold text-gray-100">
                        {isGeorgian ? "მონაცემების წყარო" : "Data Source"}
                      </h3>
                    </div>
                    <p className="text-gray-300 leading-relaxed">
                      {isGeorgian
                        ? "ინფორმაცია მოწოდებულია საქართველოს სტატისტიკის ეროვნული სამსახურის და გარემოს დაცვის სამინისტროს მიერ."
                        : "Information provided by the National Statistics Office of Georgia and the Ministry of Environmental Protection."}
                    </p>
                  </div>
                </div>
              </div>

              <div
                className={`transform transition-all duration-700 ${
                  isAnimated
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: "700ms" }}
              >
                <div className="group relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
                  <div className="relative bg-gray-800/80 backdrop-blur-md rounded-2xl p-6 border border-gray-700">
                    <div className="flex items-center gap-3 mb-4">
                      <Leaf className="w-6 h-6 text-emerald-400" />
                      <h3 className="text-xl font-semibold text-gray-100">
                        {isGeorgian ? "მეთოდოლოგია" : "Methodology"}
                      </h3>
                    </div>
                    <p className="text-gray-300 leading-relaxed">
                      {isGeorgian
                        ? "მონაცემები დაფუძნებულია სატელიტურ გამოსახულებებზე და მიწისზედა დაკვირვებებზე 2015-2022 წლებში."
                        : "Data is based on satellite imagery and ground observations from 2015-2022."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating action button */}
      <button
        className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center group animate-bounce"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <ArrowUp className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
      </button>
    </div>
  );
};

export default ForestArea;
