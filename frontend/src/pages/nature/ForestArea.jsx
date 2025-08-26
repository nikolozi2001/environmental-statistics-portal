import React, { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import { useLanguage } from "../../contexts/useLanguage";

const ForestArea = () => {
  const chartRef = useRef(null);
  const { isGeorgian } = useLanguage();
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Define data in both languages
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

    // Set the appropriate data based on language
    setChartData(isGeorgian ? dataGeo : dataEng);
  }, [isGeorgian]);

  useEffect(() => {
    if (chartData.length === 0) return;

    const chart = echarts.init(chartRef.current);

    // Color palette for the chart
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
      backgroundColor: "#f9fafb",
      title: {
        text: isGeorgian
          ? "ტყის ფართობი რეგიონების მიხედვით (ათ. ჰა)"
          : "Forest Area by Region (Thous. Ha)",
        left: "center",
        textStyle: {
          fontSize: 20,
          fontWeight: "bold",
          color: "#1f2937",
        },
        subtext: isGeorgian
          ? "საქართველოს რეგიონები ტყის ფართობის მიხედვით"
          : "Georgian regions by forest area",
        subtextStyle: {
          fontSize: 14,
          color: "#6b7280",
        },
        padding: [20, 0, 30, 0],
      },
      tooltip: {
        trigger: "item",
        triggerOn: "mousemove",
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        borderColor: "#e5e7eb",
        borderWidth: 1,
        textStyle: {
          color: "#1f2937",
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
          top: "15%",
          left: "10%",
          bottom: "10%",
          right: "15%",
          symbolSize: 10,
          orient: "vertical",
          label: {
            position: "left",
            verticalAlign: "middle",
            align: "right",
            fontSize: 12,
            color: "#374151",
            fontWeight: "normal",
          },
          leaves: {
            label: {
              position: "right",
              verticalAlign: "middle",
              align: "left",
              fontSize: 12,
              color: "#4b5563",
            },
            itemStyle: {
              color: function (params) {
                return colorPalette[params.dataIndex % colorPalette.length];
              },
              borderWidth: 1,
              borderColor: "#e5e7eb",
            },
          },
          expandAndCollapse: true,
          animationDuration: 750,
          initialTreeDepth: 2,
          lineStyle: {
            color: "#9ca3af",
            width: 1.5,
            curveness: 0.2,
          },
          itemStyle: {
            color: "#065f46",
            borderColor: "#064e3b",
            borderWidth: 1.5,
          },
          emphasis: {
            focus: "descendant",
            lineStyle: {
              width: 2.5,
              color: "#4b5563",
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
  }, [isGeorgian, chartData]);

  return (
    <div className="bg-gray-50 min-h-screen pb-10">
      <section className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-8 text-center rounded-b-2xl shadow-lg">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">
            {isGeorgian ? "ტყის ფართობი" : "Forest Area"}
          </h1>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            {isGeorgian
              ? "ტყის საფარის და ტყით სარგებლობის ტენდენციების სტატისტიკა."
              : "Statistics on forest cover and forest use trends."}
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 mt-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              {isGeorgian ? "ტყის ფართობის დინამიკა" : "Forest Area Dynamics"}
            </h2>
            <p className="text-gray-600 mt-2">
              {isGeorgian
                ? "საქართველოს რეგიონების ტყის ფართობის განაწილება ხის დიაგრამაზე"
                : "Distribution of forest area across Georgian regions on a tree diagram"}
            </p>
          </div>
          <div ref={chartRef} style={{ width: "100%", height: "600px" }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              {isGeorgian ? "მონაცემების წყარო" : "Data Source"}
            </h3>
            <p className="text-gray-600">
              {isGeorgian
                ? "ინფორმაცია მოწოდებულია საქართველოს სტატისტიკის ეროვნული სამსახურის და გარემოს დაცვის სამინისტროს მიერ."
                : "Information provided by the National Statistics Office of Georgia and the Ministry of Environmental Protection."}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              {isGeorgian ? "მეთოდოლოგია" : "Methodology"}
            </h3>
            <p className="text-gray-600">
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
