import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { motion as Motion } from "framer-motion";
import {
  Trees,
  Shield,
  Leaf,
  Bird,
  Mountain,
  Flame,
  Sprout,
} from "lucide-react";
import { useLanguage } from "../contexts/useLanguage";
import { Link } from "react-router-dom";

const Nature = () => {
  const { isGeorgian } = useLanguage();
  const forestChartRef = useRef(null);
  const protectedAreasChartRef = useRef(null);
  const biodiversityChartRef = useRef(null);

  const forestData = React.useMemo(
    () => [
      2.75, 2.74, 2.73, 2.72, 2.71, 2.7, 2.69, 2.7, 2.71, 2.72, 2.73, 2.74,
    ],
    []
  );

  const protectedAreasData = React.useMemo(
    () => [
      {
        name: isGeorgian ? "ნაკრძალები" : "Strict Nature Reserves",
        value: 12,
        color: "#059669",
      },
      {
        name: isGeorgian ? "ეროვნული პარკები" : "National Parks",
        value: 11,
        color: "#0d9488",
      },
      {
        name: isGeorgian ? "ბუნების ძეგლები" : "Natural Monuments",
        value: 23,
        color: "#0891b2",
      },
      {
        name: isGeorgian ? "დაცული ლანდშაფტები" : "Protected Landscapes",
        value: 8,
        color: "#06b6d4",
      },
    ],
    [isGeorgian]
  );

  const speciesData = React.useMemo(
    () => ({
      mammals: { count: 107, trend: "stable" },
      birds: { count: 330, trend: "increasing" },
      reptiles: { count: 52, trend: "stable" },
      amphibians: { count: 12, trend: "decreasing" },
      fish: { count: 84, trend: "stable" },
      plants: { count: 4130, trend: "stable" },
    }),
    []
  );

  useEffect(() => {
    // Forest Coverage Chart
    if (forestChartRef.current) {
      const chart = echarts.init(forestChartRef.current);

      const option = {
        title: {
          text: isGeorgian
            ? "ტყის საფარი (მლნ ჰა)"
            : "Forest Coverage (Million Ha)",
          left: "center",
          textStyle: { fontSize: 18, fontWeight: "bold" },
        },
        tooltip: {
          trigger: "axis",
          formatter: function (params) {
            const year = 2012 + params[0].dataIndex;
            const value = params[0].value;
            return `${year}<br/>${
              isGeorgian ? "ტყის საფარი" : "Forest Coverage"
            }: ${value} ${isGeorgian ? "მლნ ჰა" : "Million Ha"}`;
          },
        },
        xAxis: {
          type: "category",
          data: Array.from({ length: 12 }, (_, i) => 2012 + i),
        },
        yAxis: {
          type: "value",
          name: isGeorgian ? "მლნ ჰა" : "Million Ha",
          min: 2.65,
          max: 2.8,
        },
        series: [
          {
            data: forestData,
            type: "line",
            smooth: true,
            lineStyle: { width: 3, color: "#059669" },
            itemStyle: { color: "#059669" },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "rgba(5, 150, 105, 0.3)" },
                { offset: 1, color: "rgba(5, 150, 105, 0.05)" },
              ]),
            },
          },
        ],
      };

      chart.setOption(option);

      const handleResize = () => chart.resize();
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        chart.dispose();
      };
    }
  }, [isGeorgian, forestData]);

  useEffect(() => {
    // Protected Areas Chart
    if (protectedAreasChartRef.current) {
      const chart = echarts.init(protectedAreasChartRef.current);

      const option = {
        title: {
          text: isGeorgian
            ? "დაცული ტერიტორიების კატეგორიები"
            : "Protected Area Categories",
          left: "center",
          textStyle: { fontSize: 18, fontWeight: "bold" },
        },
        tooltip: {
          trigger: "item",
          formatter: function (params) {
            return `${params.data.name}<br/>${
              isGeorgian ? "რაოდენობა" : "Count"
            }: ${params.data.value}`;
          },
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        series: [
          {
            name: isGeorgian ? "დაცული ტერიტორიები" : "Protected Areas",
            type: "pie",
            radius: ["40%", "70%"],
            center: ["60%", "60%"],
            data: protectedAreasData.map((item) => ({
              value: item.value,
              name: item.name,
              itemStyle: { color: item.color },
            })),
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };

      chart.setOption(option);

      const handleResize = () => chart.resize();
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        chart.dispose();
      };
    }
  }, [isGeorgian, protectedAreasData]);

  useEffect(() => {
    // Biodiversity Chart
    if (biodiversityChartRef.current) {
      const chart = echarts.init(biodiversityChartRef.current);

      const categories = [
        {
          name: isGeorgian ? "ძუძუმწოვრები" : "Mammals",
          value: speciesData.mammals.count,
        },
        {
          name: isGeorgian ? "ფრინველები" : "Birds",
          value: speciesData.birds.count,
        },
        {
          name: isGeorgian ? "ქვეწარმავლები" : "Reptiles",
          value: speciesData.reptiles.count,
        },
        {
          name: isGeorgian ? "ამფიბიები" : "Amphibians",
          value: speciesData.amphibians.count,
        },
        {
          name: isGeorgian ? "თევზები" : "Fish",
          value: speciesData.fish.count,
        },
        {
          name: isGeorgian ? "მცენარეები" : "Plants",
          value: speciesData.plants.count,
        },
      ];

      const option = {
        title: {
          text: isGeorgian ? "სახეობრივი მრავალფეროვნება" : "Species Diversity",
          left: "center",
          textStyle: { fontSize: 18, fontWeight: "bold" },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: { type: "shadow" },
        },
        xAxis: {
          type: "category",
          data: categories.map((item) => item.name),
          axisLabel: {
            interval: 0,
            rotate: 45,
          },
        },
        yAxis: {
          type: "value",
          name: isGeorgian ? "სახეობების რაოდენობა" : "Number of Species",
        },
        series: [
          {
            data: categories.map((item) => ({
              value: item.value,
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#10b981" },
                  { offset: 1, color: "#059669" },
                ]),
              },
            })),
            type: "bar",
            barWidth: "60%",
          },
        ],
      };

      chart.setOption(option);

      const handleResize = () => chart.resize();
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        chart.dispose();
      };
    }
  }, [isGeorgian, speciesData]);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <Motion.div
      className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 py-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <Motion.div variants={itemVariants} className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Trees className="w-12 h-12 text-green-600 mr-4" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              {isGeorgian ? "ბუნება" : "Nature"}
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {isGeorgian
              ? "საქართველოს ბუნებრივი მემკვიდრეობის დაცვა და მონიტორინგი"
              : "Protection and monitoring of Georgia's natural heritage"}
          </p>
        </Motion.div>

        {/* Card Grid Section - Added here */}
        {/* Modern Card Grid Section */}
        <Motion.div
          variants={itemVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {/* Protected Areas Card */}
          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-green-50 shadow-lg transition-all duration-500 hover:shadow-xl hover:-translate-y-2 border border-green-100">
            <div className="absolute top-4 right-4 w-14 h-14 bg-green-100 rounded-full flex items-center justify-center text-green-700 text-2xl group-hover:scale-110 transition-transform duration-300">
              <Mountain className="w-7 h-7" />
            </div>
            <div className="p-7 pt-16">
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                {isGeorgian ? "დაცული ტერიტორიები" : "Protected Areas"}
              </h3>
              <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                {isGeorgian
                  ? "ინფორმაცია საქართველოს დაცული ტერიტორიების ფართობების, რაოდენობების და ტიპების შესახებ."
                  : "Information about the areas, quantities and types of protected areas in Georgia."}
              </p>
              <div className="flex items-center justify-between">
                <a
                  href={
                    isGeorgian
                      ? "Protected_area_GEO.html"
                      : "Protected_area_ENG.html"
                  }
                  className="text-green-700 font-medium flex items-center gap-2 hover:gap-3 transition-all duration-300"
                >
                  {isGeorgian ? "დეტალურად" : "View details"}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <span className="text-xs font-semibold text-green-800 bg-green-100 px-3 py-1 rounded-full">
                  {isGeorgian ? "54 ზონა" : "54 zones"}
                </span>
              </div>
            </div>
          </div>

          {/* Forest Area Card */}
          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-emerald-50 shadow-lg transition-all duration-500 hover:shadow-xl hover:-translate-y-2 border border-emerald-100">
            <div className="absolute top-4 right-4 w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 text-2xl group-hover:scale-110 transition-transform duration-300">
              <Sprout className="w-7 h-7" />
            </div>
            <div className="p-7 pt-16">
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                {isGeorgian ? "ტყის ფართობი" : "Forest Area"}
              </h3>
              <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                {isGeorgian
                  ? "ინფორმაციას ტყის საფარის, ხე-ტყის ჭრის და ტყის განახლების შესახებ."
                  : "Information about forest cover, timber cutting and forest renewal."}
              </p>
              <div className="flex items-center justify-between">
                <Link
                  to={
                    isGeorgian
                      ? "/ge/nature/forest-area"
                      : "/en/nature/forest-area"
                  }
                  className="text-emerald-700 font-medium flex items-center gap-2 hover:gap-3 transition-all duration-300"
                >
                  {isGeorgian ? "დეტალურად" : "View details"}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
                <span className="text-xs font-semibold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                  {isGeorgian ? "39.4% ფართობი" : "39.4% area"}
                </span>
              </div>
            </div>
          </div>

          {/* Forest and Field Fires Card */}
          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-orange-50 shadow-lg transition-all duration-500 hover:shadow-xl hover:-translate-y-2 border border-orange-100">
            <div className="absolute top-4 right-4 w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center text-orange-700 text-2xl group-hover:scale-110 transition-transform duration-300">
              <Flame className="w-7 h-7" />
            </div>
            <div className="p-7 pt-16">
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                {isGeorgian
                  ? "ტყისა და ველის ხანძრები"
                  : "Forest and Field Fires"}
              </h3>
              <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                {isGeorgian
                  ? "მონაცემები ბუნებაში ხანძრების და დამწვარი ტერიტორიებისა შესახებ."
                  : "Data on fires in nature and burned areas."}
              </p>
              <div className="flex items-center justify-between">
                <a
                  href={
                    isGeorgian
                      ? "Forest_Field_Fires_GEO.html"
                      : "Forest_Field_Fires_ENG.html"
                  }
                  className="text-orange-700 font-medium flex items-center gap-2 hover:gap-3 transition-all duration-300"
                >
                  {isGeorgian ? "დეტალურად" : "View details"}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <span className="text-xs font-semibold text-orange-800 bg-orange-100 px-3 py-1 rounded-full">
                  {isGeorgian ? "მონიტორინგი" : "Monitoring"}
                </span>
              </div>
            </div>
          </div>
        </Motion.div>

        {/* Key Metrics */}
        <Motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
        >
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center justify-between mb-2">
              <Trees className="w-8 h-8 text-green-600" />
              <span className="text-sm font-medium text-green-600">39.4%</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">2.74M</h3>
            <p className="text-gray-600 text-sm">
              {isGeorgian ? "ჰექტარი ტყე" : "Hectares of Forest"}
            </p>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center justify-between mb-2">
              <Shield className="w-8 h-8 text-blue-600" />
              <span className="text-sm font-medium text-blue-600">54</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">7.7%</h3>
            <p className="text-gray-600 text-sm">
              {isGeorgian ? "დაცული ტერიტორია" : "Protected Territory"}
            </p>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center justify-between mb-2">
              <Leaf className="w-8 h-8 text-emerald-600" />
              <span className="text-sm font-medium text-emerald-600">
                4,130
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">585</h3>
            <p className="text-gray-600 text-sm">
              {isGeorgian ? "ცხოველთა სახეობები" : "Animal Species"}
            </p>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center justify-between mb-2">
              <Bird className="w-8 h-8 text-sky-600" />
              <span className="text-sm font-medium text-sky-600">330</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">11</h3>
            <p className="text-gray-600 text-sm">
              {isGeorgian ? "ეროვნული პარკი" : "National Parks"}
            </p>
          </div>
        </Motion.div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Motion.div
            variants={itemVariants}
            className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20"
          >
            <div
              ref={forestChartRef}
              style={{ width: "100%", height: "400px" }}
            />
          </Motion.div>

          <Motion.div
            variants={itemVariants}
            className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20"
          >
            <div
              ref={protectedAreasChartRef}
              style={{ width: "100%", height: "400px" }}
            />
          </Motion.div>
        </div>

        <Motion.div
          variants={itemVariants}
          className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 mb-12"
        >
          <div
            ref={biodiversityChartRef}
            style={{ width: "100%", height: "400px" }}
          />
        </Motion.div>

        {/* National Parks */}
        <Motion.div
          variants={itemVariants}
          className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20"
        >
          <h3 className="text-2xl font-bold mb-6 text-gray-800">
            {isGeorgian ? "ეროვნული პარკები" : "National Parks"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 bg-green-50 rounded-xl">
              <h4 className="font-semibold text-green-700 mb-2">
                {isGeorgian ? "ბორჯომ-ხარაგაული" : "Borjomi-Kharagauli"}
              </h4>
              <p className="text-sm text-gray-600 mb-2">
                85,083 {isGeorgian ? "ჰა" : "ha"}
              </p>
              <p className="text-xs text-gray-500">
                {isGeorgian
                  ? "ყველაზე დიდი ეროვნული პარკი"
                  : "Largest national park"}
              </p>
            </div>

            <div className="p-6 bg-blue-50 rounded-xl">
              <h4 className="font-semibold text-blue-700 mb-2">
                {isGeorgian ? "მტირალა" : "Mtirala"}
              </h4>
              <p className="text-sm text-gray-600 mb-2">
                15,806 {isGeorgian ? "ჰა" : "ha"}
              </p>
              <p className="text-xs text-gray-500">
                {isGeorgian ? "სუბტროპიკული ტყეები" : "Subtropical forests"}
              </p>
            </div>

            <div className="p-6 bg-purple-50 rounded-xl">
              <h4 className="font-semibold text-purple-700 mb-2">
                {isGeorgian ? "კინტრიში" : "Kintrishi"}
              </h4>
              <p className="text-sm text-gray-600 mb-2">
                10,518 {isGeorgian ? "ჰა" : "ha"}
              </p>
              <p className="text-xs text-gray-500">
                {isGeorgian ? "კოლხური ტყეები" : "Colchic forests"}
              </p>
            </div>

            <div className="p-6 bg-amber-50 rounded-xl">
              <h4 className="font-semibold text-amber-700 mb-2">
                {isGeorgian ? "კაზბეგი" : "Kazbegi"}
              </h4>
              <p className="text-sm text-gray-600 mb-2">
                8,707 {isGeorgian ? "ჰა" : "ha"}
              </p>
              <p className="text-xs text-gray-500">
                {isGeorgian
                  ? "მაღალმთიანი ლანდშაფტები"
                  : "High mountain landscapes"}
              </p>
            </div>

            <div className="p-6 bg-teal-50 rounded-xl">
              <h4 className="font-semibold text-teal-700 mb-2">
                {isGeorgian ? "თუშეთი" : "Tusheti"}
              </h4>
              <p className="text-sm text-gray-600 mb-2">
                11,080 {isGeorgian ? "ჰა" : "ha"}
              </p>
              <p className="text-xs text-gray-500">
                {isGeorgian ? "ალპური მდელოები" : "Alpine meadows"}
              </p>
            </div>

            <div className="p-6 bg-rose-50 rounded-xl">
              <h4 className="font-semibold text-rose-700 mb-2">
                {isGeorgian ? "ჯავახეთი" : "Javakheti"}
              </h4>
              <p className="text-sm text-gray-600 mb-2">
                28,289 {isGeorgian ? "ჰა" : "ha"}
              </p>
              <p className="text-xs text-gray-500">
                {isGeorgian ? "ვულკანური ლანდშაფტი" : "Volcanic landscape"}
              </p>
            </div>
          </div>
        </Motion.div>
      </div>
    </Motion.div>
  );
};

export default Nature;
