import { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export const ModalProvider = ({children}) => {
    const [show, setShown] = useState(false);
    const [lng, setLng] = useState('');
    const [lat, setLat] = useState('');

    const openModal = () => {
        setShown(true);
    }
    const closeModal = () => {
        setShown(false);
    };
    
    return (
        <ModalContext.Provider
            value = {{
                show,
                lng,
                lat,
                openModal,
                closeModal,
                setLng,
                setLat,
            }}
        >
            {children}
        </ModalContext.Provider>
    )
};

export const useModal = () => useContext(ModalContext);