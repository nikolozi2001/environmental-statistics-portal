import React, { useEffect, useRef, useState, useMemo } from "react";
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
  // Initialize state directly, which is slightly more efficient
  const [chartData, setChartData] = useState(isGeorgian ? dataGeo : dataEng);

  // Derived stats
  const { largest, smallest, average } = useMemo(() => {
    const data = isGeorgian ? dataGeo : dataEng;
    const sorted = [...data].sort((a, b) => b.value - a.value);
    const sum = data.reduce((acc, d) => acc + d.value, 0);
    return {
      largest: sorted[0],
      smallest: sorted[sorted.length - 1],
      average: +(sum / data.length).toFixed(1),
    };
  }, [isGeorgian]);

  // This effect now only runs when the language changes.
  useEffect(() => {
    setChartData(isGeorgian ? dataGeo : dataEng);
  }, [isGeorgian]);

  useEffect(() => {
    if (chartData.length === 0 || !chartRef.current) return;

    const chart = echarts.init(chartRef.current);

    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    const colorPalette = [
      "#059669",
      "#10b981",
      "#34d399",
      "#6ee7b7",
      "#a7f3d0",
      "#065f46",
      "#047857",
      "#0d9488",
      "#0e7490",
      "#0369a1",
    ];

    const option = {
      backgroundColor: prefersDark ? "#0b1220" : "#f9fafb",
      title: {
        text: isGeorgian
          ? "ტყის ფართობი რეგიონების მიხედვით (ათ. ჰა)"
          : "Forest Area by Region (Thous. Ha)",
        left: "center",
        textStyle: {
          fontSize: 20,
          fontWeight: "bold",
          color: prefersDark ? "#e5e7eb" : "#1f2937",
        },
        subtext: isGeorgian
          ? "საქართველოს რეგიონები ტყის ფართობის მიხედვით"
          : "Georgian regions by forest area",
        subtextStyle: {
          fontSize: 14,
          color: prefersDark ? "#9ca3af" : "#6b7280",
        },
        padding: [20, 0, 30, 0],
      },
      tooltip: {
        trigger: "item",
        triggerOn: "mousemove",
        backgroundColor: prefersDark ? "rgba(17, 24, 39, 0.95)" : "rgba(255, 255, 255, 0.95)",
        borderColor: prefersDark ? "#374151" : "#e5e7eb",
        borderWidth: 1,
        textStyle: {
          color: prefersDark ? "#e5e7eb" : "#1f2937",
        },
        formatter: (params) => {
          return `<div style="font-weight: bold; margin-bottom: 5px;">${
            params.name
          }</div>
                  <div>${
                    isGeorgian ? "ფართობი" : "Area"
                  }: <span style="font-weight: bold; color: ${params.color}">${
            params.value
          } ${isGeorgian ? "ათ. ჰა" : "thous. ha"}</span></div>`;
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
                color: "#065f46",
              },
            },
          ],
          top: "12%",
          left: "5%",
          bottom: "10%",
          right: "25%",
          symbolSize: 15,
          orient: "horizontal",
          label: {
            position: "left",
            verticalAlign: "middle",
            align: "right",
            fontSize: 14,
            color: prefersDark ? "#e5e7eb" : "#374151",
            fontWeight: "600",
            formatter: function (params) {
              if (params.data.children) {
                return `${params.name}\n${params.value} ${
                  isGeorgian ? "ათ. ჰა" : "thous. ha"
                }`;
              }
              return params.name;
            },
          },
          leaves: {
            label: {
              position: "right",
              verticalAlign: "middle",
              align: "left",
              fontSize: 12,
              color: prefersDark ? "#cbd5e1" : "#4b5563",
              formatter: function (params) {
                return `${params.name}\n${params.value} ${
                  isGeorgian ? "ათ. ჰა" : "thous. ha"
                }`;
              },
            },
            itemStyle: {
              color: function (params) {
                return colorPalette[params.dataIndex % colorPalette.length];
              },
              borderWidth: 1,
              borderColor: prefersDark ? "#334155" : "#e5e7eb",
            },
          },
          expandAndCollapse: true,
          animationDuration: 750,
          initialTreeDepth: 2,
          lineStyle: {
            color: prefersDark ? "#475569" : "#9ca3af",
            width: 1.5,
            curveness: 0.5,
          },
          itemStyle: {
            color: "#065f46",
            borderColor: "#064e3b",
            borderWidth: 1.5,
          },
          emphasis: {
            focus: "descendant",
            scale: true,
            lineStyle: {
              width: 2.5,
              color: prefersDark ? "#94a3b8" : "#4b5563",
            },
          },
        },
      ],
    };

    chart.setOption(option);

    const handleResize = () => {
      chart.resize();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.dispose();
    };
  }, [isGeorgian, chartData]); // chartData is still needed here to redraw the chart when data changes

  return (
    <div className="bg-gray-50 dark:bg-slate-900 min-h-screen pb-12 transition-colors">
      <section className="relative overflow-hidden bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-14 text-center shadow-lg">
        <div className="pointer-events-none absolute inset-0 opacity-20" aria-hidden>
          <svg className="absolute -top-10 -right-10 w-64 h-64" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#99f6e4" />
                <stop offset="100%" stopColor="#86efac" />
              </linearGradient>
            </defs>
            <circle cx="100" cy="100" r="80" fill="url(#grad)" />
          </svg>
        </div>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            {isGeorgian ? "ტყის ფართობი" : "Forest Area"}
          </h1>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
            {isGeorgian
              ? "ტყის საფარის და ტყით სარგებლობის ტენდენციების სტატისტიკა."
              : "Statistics on forest cover and forest use trends."}
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 -mt-8 md:-mt-12">
        {/* Stat cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
          <div className="group rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 shadow ring-1 ring-emerald-100 dark:ring-emerald-900/40 p-6 transition hover:shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/40 rounded-xl grid place-items-center">
                <span className="text-2xl">🌲</span>
              </div>
              <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900/40 px-3 py-1 rounded-full">
                {isGeorgian ? "ყველაზე დიდი" : "Largest"}
              </span>
            </div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-slate-100 mb-2">
              {largest.name}
            </h4>
            <p className="text-3xl font-bold text-emerald-700 dark:text-emerald-300 mb-1">{largest.value.toFixed(1)}</p>
            <p className="text-sm text-gray-600 dark:text-slate-300">
              {isGeorgian ? "ათასი ჰექტარი" : "Thousand Hectares"}
            </p>
          </div>

          <div className="group rounded-2xl bg-gradient-to-br from-sky-50 to-cyan-50 dark:from-sky-900/20 dark:to-cyan-900/20 shadow ring-1 ring-sky-100 dark:ring-sky-900/40 p-6 transition hover:shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-sky-100 dark:bg-sky-900/40 rounded-xl grid place-items-center">
                <span className="text-2xl">📊</span>
              </div>
              <span className="text-xs font-semibold text-sky-700 dark:text-sky-300 bg-sky-100 dark:bg-sky-900/40 px-3 py-1 rounded-full">
                {isGeorgian ? "საშუალო" : "Average"}
              </span>
            </div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-slate-100 mb-2">
              {isGeorgian ? "რეგიონული საშუალო" : "Regional Average"}
            </h4>
            <p className="text-3xl font-bold text-sky-700 dark:text-sky-300 mb-1">{average.toFixed(1)}</p>
            <p className="text-sm text-gray-600 dark:text-slate-300">
              {isGeorgian ? "ათასი ჰექტარი" : "Thousand Hectares"}
            </p>
          </div>

          <div className="group rounded-2xl bg-gradient-to-br from-fuchsia-50 to-pink-50 dark:from-fuchsia-900/20 dark:to-pink-900/20 shadow ring-1 ring-fuchsia-100 dark:ring-fuchsia-900/40 p-6 transition hover:shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-fuchsia-100 dark:bg-fuchsia-900/40 rounded-xl grid place-items-center">
                <span className="text-2xl">🏔️</span>
              </div>
              <span className="text-xs font-semibold text-fuchsia-700 dark:text-fuchsia-300 bg-fuchsia-100 dark:bg-fuchsia-900/40 px-3 py-1 rounded-full">
                {isGeorgian ? "ყველაზე პატარა" : "Smallest"}
              </span>
            </div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-slate-100 mb-2">
              {smallest.name}
            </h4>
            <p className="text-3xl font-bold text-fuchsia-700 dark:text-fuchsia-300 mb-1">{smallest.value.toFixed(1)}</p>
            <p className="text-sm text-gray-600 dark:text-slate-300">
              {isGeorgian ? "ათასი ჰექტარი" : "Thousand Hectares"}
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg ring-1 ring-gray-100 dark:ring-slate-700 p-6 mb-8">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-slate-100">
              {isGeorgian ? "ტყის ფართობის დინამიკა" : "Forest Area Dynamics"}
            </h2>
            <p className="text-gray-600 dark:text-slate-300 mt-2">
              {isGeorgian
                ? "საქართველოს რეგიონების ტყის ფართობის განაწილება ხის დიაგრამაზე"
                : "Distribution of forest area across Georgian regions on a tree diagram"}
            </p>
          </div>
          <div ref={chartRef} className="w-full h-[480px] md:h-[600px]" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg ring-1 ring-gray-100 dark:ring-slate-700 p-6">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-slate-100 mb-3">
              {isGeorgian ? "მონაცემების წყარო" : "Data Source"}
            </h3>
            <p className="text-gray-600 dark:text-slate-300">
              {isGeorgian
                ? "ინფორმაცია მოწოდებულია საქართველოს სტატისტიკის ეროვნული სამსახურის და გარემოს დაცვის სამინისტროს მიერ."
                : "Information provided by the National Statistics Office of Georgia and the Ministry of Environmental Protection."}
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg ring-1 ring-gray-100 dark:ring-slate-700 p-6">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-slate-100 mb-3">
              {isGeorgian ? "მეთოდოლოგია" : "Methodology"}
            </h3>
            <p className="text-gray-600 dark:text-slate-300">
              {isGeorgian
                ? "მონაცემები დაფუძნებულია სატელიტურ გამოსახულებებზე და მიწისზედა დაკვირვებებზე 2015-2022 წლებში."
                : "Data is based on satellite imagery and ground observations from 2015-2022."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForestArea;
