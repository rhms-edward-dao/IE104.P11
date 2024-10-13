import { Children, createContext, useContext, useState } from "react";

const StoreTabContext = createContext();

export const StoreTabProvider = ({children}) => {
    const [isStoreTab, setIsStoreTab] = useState(true);
    const [isProductTab, setIsProductTab] = useState(true);
    const [isStaffTab, setIsStaffTab] = useState(true);

    const activateStoreTab = () => {
        setIsStoreTab(true);
    };
    const deactivateStoreTab = () => {
        setIsStoreTab(false);
    };
    const activateProductTab = () => {
        setIsProductTab(true);
    };
    const deactivateProductTab = () => {
        setIsProductTab(false);
    };
    const activateStaffTab = () => {
        setIsStaffTab(true);
    };
    const deactivateStaffTab = () => {
        setIsStaffTab(false);
    };

    return (
        <StoreTabContext.Provider
            value={{
                isStoreTab,
                isProductTab,
                isStaffTab,
                activateStoreTab,
                deactivateStoreTab,
                activateProductTab,
                deactivateProductTab,
                activateStaffTab,
                deactivateStaffTab
            }}
        >
            {children}
        </StoreTabContext.Provider>
    )
};

export const useStoreTab = () => useContext(StoreTabContext);