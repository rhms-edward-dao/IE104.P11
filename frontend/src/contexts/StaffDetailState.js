import { createContext, useContext, useState } from "react";

const PopupContext = createContext();

export const PopupProvider = ({children}) => {
    const [showPopup, setShownPopup] = useState(false);
    const [staffData, setStaffData]= useState(0);

    const openPopup = (data) => {
        setStaffData(data);
        setShownPopup(true);
    }
    const closePopup = () => {
        setShownPopup(false);
    };
    
    return (
        <PopupContext.Provider
            value = {{
                showPopup,
                staffData,
                openPopup,
                closePopup
            }}
        >
            {children}
        </PopupContext.Provider>
    )
};

export const useDetailPopup = () => useContext(PopupContext);