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

    // Government-appropriate color palette (blues and greens)
    const colorPalette = [
      "#1a56db",
      "#2563eb",
      "#3b82f6",
      "#0e7490",
      "#0891b2",
      "#0d9488",
      "#059669",
      "#16a34a",
      "#15803d",
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
          fontSize: 24,
          fontWeight: "bold",
          color: "#1f2937",
          fontFamily: "system-ui, -apple-system, sans-serif",
        },
        subtext: isGeorgian
          ? "ინტერაქტიული ვიზუალიზაცია • ათასი ჰექტარი"
          : "Interactive Visualization • Thousand Hectares",
        subtextStyle: {
          fontSize: 14,
          color: "#6b7280",
          fontFamily: "system-ui, -apple-system, sans-serif",
        },
      },
      tooltip: {
        trigger: "item",
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        borderColor: "#d1d5db",
        borderWidth: 1,
        textStyle: {
          color: "#1f2937",
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
          "border-radius: 6px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);",
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
                },
              })),
              itemStyle: {
                color: "#1e40af",
                borderColor: "#1d4ed8",
                borderWidth: 2,
              },
            },
          ],
          top: "15%",
          left: "5%",
          bottom: "10%",
          right: "20%",
          symbolSize: 14,
          orient: "horizontal",
          label: {
            position: "left",
            verticalAlign: "middle",
            align: "right",
            fontSize: 14,
            color: "#374151",
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
                fontSize: 16,
                fontWeight: "bold",
                color: "#1f2937",
                padding: [0, 0, 6, 0],
              },
              value: {
                fontSize: 12,
                color: "#6b7280",
              },
            },
          },
          leaves: {
            label: {
              position: "right",
              verticalAlign: "middle",
              align: "left",
              fontSize: 12,
              color: "#374151",
              fontFamily: "system-ui, -apple-system, sans-serif",
              formatter: function (params) {
                return `{name|${params.name}}\n{value|${params.value} ${
                  isGeorgian ? "ათ. ჰა" : "thous. ha"
                }}`;
              },
              rich: {
                name: {
                  fontSize: 12,
                  color: "#1f2937",
                  padding: [0, 0, 4, 0],
                },
                value: {
                  fontSize: 11,
                  color: "#6b7280",
                  fontWeight: "bold",
                },
              },
            },
            itemStyle: {
              borderRadius: 4,
              borderWidth: 1,
              borderColor: "#e5e7eb",
            },
          },
          expandAndCollapse: true,
          animationDuration: 800,
          animationEasing: "cubicOut",
          initialTreeDepth: 2,
          lineStyle: {
            color: "#9ca3af",
            width: 1.5,
            curveness: 0.4,
          },
          emphasis: {
            focus: "descendant",
            lineStyle: {
              width: 2,
              color: "#2563eb",
            },
            itemStyle: {
              borderColor: "#2563eb",
              borderWidth: 2,
            },
          },
        },
      ],
      animation: true,
      animationThreshold: 100,
      animationDurationUpdate: 600,
      animationEasingUpdate: "cubicOut",
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
      className={`transform transition-all duration-500 ${
        isAnimated ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="bg-white rounded-lg shadow-sm p-5 h-full border border-gray-200 hover:shadow-md transition-all duration-300">
        <div className="flex items-start justify-between mb-3">
          <div
            className={`w-10 h-10 ${color} bg-opacity-10 rounded-lg flex items-center justify-center`}
          >
            <Icon className={`w-5 h-5 ${color.split(" ")[1]}`} />
          </div>
          <span
            className={`text-xs font-medium text-gray-500 ${color} bg-opacity-5 px-2 py-1 rounded-full`}
          >
            {subtitle}
          </span>
        </div>
        <h4 className="text-base font-medium text-gray-700 mb-2">{title}</h4>
        <p className={`text-2xl font-bold ${color.split(" ")[1]}`}>{value}</p>
        <p className="text-xs text-gray-500 mt-1">
          {isGeorgian ? "ათასი ჰექტარი" : "Thousand Hectares"}
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white">
          <div className="px-4 py-12 text-center">
            <div className="max-w-5xl mx-auto">
              <div
                className={`transform transition-all duration-500 ${
                  isAnimated
                    ? "translate-y-0 opacity-100"
                    : "translate-y-6 opacity-0"
                }`}
              >
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <TreePine className="w-8 h-8 text-blue-700" />
                  </div>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
                  {isGeorgian
                    ? "საქართველოს ტყის რესურსები"
                    : "Georgian Forest Resources"}
                </h1>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-6">
                  {isGeorgian
                    ? "ინტერაქტიული ვიზუალიზაცია და დეტალური ანალიზი რეგიონების მიხედვით"
                    : "Interactive visualization and detailed analysis by regions"}
                </p>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-w-3xl mx-auto">
                  <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-3">
                    <div className="text-xl font-bold text-blue-700">
                      3,069.1
                    </div>
                    <div className="text-xs text-gray-500">
                      {isGeorgian ? "ათ. ჰა სულ" : "thous. ha total"}
                    </div>
                  </div>
                  <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-3">
                    <div className="text-xl font-bold text-green-700">
                      44.2%
                    </div>
                    <div className="text-xs text-gray-500">
                      {isGeorgian ? "ტერიტორიის" : "of territory"}
                    </div>
                  </div>
                  <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-3">
                    <div className="text-xl font-bold text-teal-700">9</div>
                    <div className="text-xs text-gray-500">
                      {isGeorgian ? "რეგიონი" : "regions"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="px-4 py-12">
          <div className="max-w-7xl mx-auto">
            {/* Main Chart */}
            <div
              className={`transform transition-all duration-500 ${
                isAnimated
                  ? "translate-y-0 opacity-100"
                  : "translate-y-6 opacity-0"
              }`}
              style={{ transitionDelay: "100ms" }}
            >
              <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-200">
                <div
                  ref={chartRef}
                  style={{ width: "100%", height: "500px" }}
                />

                {/* Selected Region Info */}
                {selectedRegion && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200 animate-fadeIn">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-base font-semibold text-blue-800">
                          {selectedRegion.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {selectedRegion.value}{" "}
                          {isGeorgian ? "ათ. ჰა" : "thous. ha"} •
                          {calculatePercentage(selectedRegion.value)}%{" "}
                          {isGeorgian ? "მთლიანი ფართობიდან" : "of total area"}
                        </p>
                      </div>
                      <button
                        onClick={() => setSelectedRegion(null)}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <StatCard
                icon={MapPin}
                title={isGeorgian ? "დაცული ტერიტორიები" : "Protected Areas"}
                value="574.0"
                subtitle={isGeorgian ? "ყველაზე დიდი" : "Largest"}
                color="text-blue-700"
                delay={200}
              />
              <StatCard
                icon={BarChart3}
                title={isGeorgian ? "რეგიონული საშუალო" : "Regional Average"}
                value="307.7"
                subtitle={isGeorgian ? "საშუალო" : "Average"}
                color="text-blue-600"
                delay={300}
              />
              <StatCard
                icon={TrendingUp}
                title={isGeorgian ? "აჭარის ა.რ." : "Adjara A.R."}
                value="149.6"
                subtitle={isGeorgian ? "ყველაზე პატარა" : "Smallest"}
                color="text-blue-500"
                delay={400}
              />
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                className={`transform transition-all duration-500 ${
                  isAnimated
                    ? "translate-y-0 opacity-100"
                    : "translate-y-6 opacity-0"
                }`}
                style={{ transitionDelay: "500ms" }}
              >
                <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-200">
                  <div className="flex items-center gap-3 mb-3">
                    <Info className="w-5 h-5 text-blue-600" />
                    <h3 className="text-lg font-semibold text-gray-800">
                      {isGeorgian ? "მონაცემების წყარო" : "Data Source"}
                    </h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {isGeorgian
                      ? "ინფორმაცია მოწოდებულია საქართველოს სტატისტიკის ეროვნული სამსახურის და გარემოს დაცვის სამინისტროს მიერ."
                      : "Information provided by the National Statistics Office of Georgia and the Ministry of Environmental Protection."}
                  </p>
                </div>
              </div>

              <div
                className={`transform transition-all duration-500 ${
                  isAnimated
                    ? "translate-y-0 opacity-100"
                    : "translate-y-6 opacity-0"
                }`}
                style={{ transitionDelay: "600ms" }}
              >
                <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-200">
                  <div className="flex items-center gap-3 mb-3">
                    <Leaf className="w-5 h-5 text-green-600" />
                    <h3 className="text-lg font-semibold text-gray-800">
                      {isGeorgian ? "მეთოდოლოგია" : "Methodology"}
                    </h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
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

      {/* Floating action button */}
      <button
        className="fixed bottom-6 right-6 w-12 h-12 bg-blue-600 rounded-full shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <ArrowUp className="w-5 h-5 text-white" />
      </button>
    </div>
  );
};

export default ForestArea;
