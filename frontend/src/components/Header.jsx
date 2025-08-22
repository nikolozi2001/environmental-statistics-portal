import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "../contexts/useLanguage";
import iconEn from "../assets/images/en.png";
import iconGe from "../assets/images/ge.png";
import logoEn from "../assets/images/logo_transparency_en.png";
import logoGe from "../assets/images/logo_transparency_ge.png";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, changeLanguage, isGeorgian } = useLanguage();
  const location = useLocation();

  const navigation = [
    {
      name: isGeorgian ? "მთავარი" : "Home",
      href: `/${language}`,
      current: location.pathname === `/${language}`,
    },
    {
      name: isGeorgian ? "ჰაერის ხარისხი" : "Air Quality",
      href: `/${language}/air-quality`,
      current: location.pathname.includes("air-quality"),
    },
    {
      name: isGeorgian ? "კლიმატი" : "Climate",
      href: `/${language}/climate`,
      current: location.pathname.includes("climate"),
    },
    {
      name: isGeorgian ? "წყალი" : "Water",
      href: `/${language}/water`,
      current: location.pathname.includes("water"),
    },
    {
      name: isGeorgian ? "ბუნება" : "Nature",
      href: `/${language}/nature`,
      current: location.pathname.includes("nature"),
    },
    {
      name: isGeorgian ? "ტრანსპორტი" : "Transport",
      href: `/${language}/transport-energy`,
      current: location.pathname.includes("transport-energy"),
    },
    {
      name: isGeorgian ? "ნარჩენები" : "Waste",
      href: `/${language}/waste`,
      current: location.pathname.includes("waste"),
    },
  ];

  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link
              to={`/${language}`}
              className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 flex items-center"
            >
              <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mr-2 shadow-sm">
                <img
                  src={isGeorgian ? logoGe : logoEn}
                  alt="Logo"
                  className="w-6 h-6 md:w-8 md:h-8 object-contain"
                />
              </div>
              {isGeorgian ? "გარემოს სტატისტიკა" : "EnvStats"}
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-1">
            <div className="flex items-baseline space-x-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 group ${
                    item.current
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                  }`}
                >
                  {item.name}
                  {item.current && (
                    <span className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-blue-600 rounded-full"></span>
                  )}
                </Link>
              ))}
            </div>

            {/* Language Switcher */}
            <div className="ml-4 flex items-center space-x-2 border-l border-gray-200 pl-4">
              <button
                onClick={() => changeLanguage("ge")}
                className={`p-2 rounded-full transition-all duration-300 transform hover:scale-110 ${
                  language === "ge"
                    ? "bg-gradient-to-r from-amber-400 to-amber-500 shadow-md ring-2 ring-amber-200"
                    : "bg-gray-100 hover:bg-gray-200 opacity-90 hover:opacity-100"
                }`}
                title="Georgian"
              >
                <img
                  src={iconGe}
                  alt="Georgian"
                  className="w-5 h-5 object-contain"
                />
              </button>
              <button
                onClick={() => changeLanguage("en")}
                className={`p-2 rounded-full transition-all duration-300 transform hover:scale-110 ${
                  language === "en"
                    ? "bg-gradient-to-r from-blue-400 to-blue-500 shadow-md ring-2 ring-blue-200"
                    : "bg-gray-100 hover:bg-gray-200 opacity-90 hover:opacity-100"
                }`}
                title="English"
              >
                <img
                  src={iconEn}
                  alt="English"
                  className="w-5 h-5 object-contain"
                />
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            {/* Mobile Language Switcher */}
            <div className="flex mr-3 space-x-2">
              <button
                onClick={() => changeLanguage("ge")}
                className={`p-1.5 rounded-full transition-all ${
                  language === "ge"
                    ? "bg-amber-100 ring-2 ring-amber-300"
                    : "bg-gray-100"
                }`}
                title="Georgian"
              >
                <img
                  src={iconGe}
                  alt="Georgian"
                  className="w-4 h-4 object-contain"
                />
              </button>
              <button
                onClick={() => changeLanguage("en")}
                className={`p-1.5 rounded-full transition-all ${
                  language === "en"
                    ? "bg-blue-100 ring-2 ring-blue-300"
                    : "bg-gray-100"
                }`}
                title="English"
              >
                <img
                  src={iconEn}
                  alt="English"
                  className="w-4 h-4 object-contain"
                />
              </button>
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 focus:outline-none transition-colors duration-300"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">
                {isGeorgian ? "მენიუს გახსნა" : "Open main menu"}
              </span>
              {!isOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div
          className="md:hidden bg-white/95 backdrop-blur-lg border-t border-gray-100 shadow-xl"
          id="mobile-menu"
        >
          <div className="px-2 pt-2 pb-6 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
                  item.current
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.current && (
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-3"></span>
                )}
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
