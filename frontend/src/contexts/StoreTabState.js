import { createContext, useContext, useState, useEffect } from "react";

const StoreTabContext = createContext();

export const StoreTabProvider = ({ children }) => {
  // Declare variables here
  const [isStoreTab, setIsStoreTab] = useState(true);
  const [isProductTab, setIsProductTab] = useState(true);
  const [isStaffTab, setIsStaffTab] = useState(true);
  const [isWarehouseTab, setIsWarehouseTab] = useState(true);

  // Use useEffect for getting state from session storage
  useEffect(() => {
    // // // FOR ADMIN
    const storedIsStoreTab = sessionStorage.getItem("isStoreTab");
    const storedIsProductTab = sessionStorage.getItem("isProductTab");
    const storedIsStaffTab = sessionStorage.getItem("isStaffTab");
    const storedIsWarehouseTab = sessionStorage.getItem("isWarehouseTab");

    if (storedIsStoreTab === "true") {
      setIsStoreTab(true);
    } else {
      setIsStoreTab(false);
    } // If there is no information about this state, it will be false

    if (storedIsProductTab === "true") {
      setIsProductTab(true);
    } else {
      setIsProductTab(false);
    } // If there is no information about this state, it will be false

    if (storedIsStaffTab === "true") {
      setIsStaffTab(true);
    } else {
      setIsStaffTab(false);
    } // If there is no information about this state, it will be false

    if (storedIsWarehouseTab === "true") {
      setIsWarehouseTab(true);
    } else {
      setIsWarehouseTab(false);
    } // If there is no information about this state, it will be false
  }, []);
  // Declare other functions here
  const activateStoreTab = () => {
    setIsStoreTab(true);
    // Save state in Session Storage
    sessionStorage.setItem("isStoreTab", "true");
  };
  const deactivateStoreTab = () => {
    setIsStoreTab(false);
    // Save state in Session Storage
    sessionStorage.setItem("isStoreTab", "false");
  };
  const activateProductTab = () => {
    setIsProductTab(true);
    // Save state in Session Storage
    sessionStorage.setItem("isProductTab", "true");
  };
  const deactivateProductTab = () => {
    setIsProductTab(false);
    // Save state in Session Storage
    sessionStorage.setItem("isProductTab", "false");
  };
  const activateStaffTab = () => {
    setIsStaffTab(true);
    // Save state in Session Storage
    sessionStorage.setItem("isStaffTab", "true");
  };
  const deactivateStaffTab = () => {
    setIsStaffTab(false);
    // Save state in Session Storage
    sessionStorage.setItem("isStaffTab", "false");
  };
  const activateWarehouseTab = () => {
    setIsWarehouseTab(true);
    // Save state in Session Storage
    sessionStorage.setItem("isWarehouseTab", "true");
  };
  const deactivateWarehouseTab = () => {
    setIsWarehouseTab(false);
    // Save state in Session Storage
    sessionStorage.setItem("isWarehouseTab", "false");
  };

  return (
    <StoreTabContext.Provider
      value={{
        isStoreTab,
        isProductTab,
        isStaffTab,
        isWarehouseTab,
        activateStoreTab,
        deactivateStoreTab,
        activateProductTab,
        deactivateProductTab,
        activateStaffTab,
        deactivateStaffTab,
        activateWarehouseTab,
        deactivateWarehouseTab,
      }}
    >
      {children}
    </StoreTabContext.Provider>
  );
};

export const useStoreTab = () => useContext(StoreTabContext);
