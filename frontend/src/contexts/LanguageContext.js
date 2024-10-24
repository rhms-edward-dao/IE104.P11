import { createContext, useContext, useState } from "react";
import { useTranslation } from "react-i18next";

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  // Variables here
  const { i18n } = useTranslation();

  const [isDropdown, setIsDropdown] = useState(false);

  // Functions here
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  // Return here
  return (
    <LanguageContext.Provider
      value={{ isDropdown, setIsDropdown, changeLanguage }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
