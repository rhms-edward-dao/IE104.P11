import { createContext, useContext, useState } from "react";

const PopupContext = createContext();

export const PopupProvider = ({ children }) => {
  const [showPopup, setShownPopup] = useState(false);
  const [popupData, setPopupData] = useState(0);

  const openPopup = (data) => {
    setPopupData(data);
    setShownPopup(true);
  };
  const closePopup = () => {
    setShownPopup(false);
  };

  return (
    <PopupContext.Provider
      value={{
        showPopup,
        popupData,
        openPopup,
        closePopup,
      }}
    >
      {children}
    </PopupContext.Provider>
  );
};

export const useDetailPopup = () => useContext(PopupContext);
