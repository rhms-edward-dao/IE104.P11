import { createContext, useContext, useState } from "react";

const ActiveButtonContext =  createContext();

export const ActiveButtonProvider = ({children}) => {
    // Variables here
        // For admin
    const [isQuan, setIsQuan] = useState(false);
    const [isDaily, setIsDaily] = useState(false);
    const [isMathang, setIsMathang] = useState(false);
    const [isBaocao, setIsBaocao] = useState(false);
    const [isNhanvien, setIsNhanvien] = useState(false);
    const [isQuitac, setIsQuitac] = useState(false);
    const [isCustomer, setIsCustomer] = useState(false);
        // For normal staff
    const [isSanpham, setIsSanpham] = useState(false);
    const [isQuanlykho, setIsQuanlykho] = useState(false);
    const [isBaocaoStaff, setIsBaocaoStaff] = useState(false);

    // Functions here
        // For admin
    const activateQuan = () => {
        setIsQuan(true);
        setIsDaily(false);
        setIsMathang(false);
        setIsBaocao(false);
        setIsNhanvien(false);
        setIsQuitac(false);
        setIsCustomer(false);
    };
    
    const activateDaily = () => {
        setIsQuan(false);
        setIsDaily(true);
        setIsMathang(false);
        setIsBaocao(false);
        setIsNhanvien(false);
        setIsQuitac(false);
        setIsCustomer(false);
    };

    const activateMathang = () => {
        setIsQuan(false);
        setIsDaily(false);
        setIsMathang(true);
        setIsBaocao(false);
        setIsNhanvien(false);
        setIsQuitac(false);
        setIsCustomer(false);
    };

    const activateBaocao = () => {
        setIsQuan(false);
        setIsDaily(false);
        setIsMathang(false);
        setIsBaocao(true);
        setIsNhanvien(false);
        setIsQuitac(false);
        setIsCustomer(false);
    };

    const activateNhanvien = () => {
        setIsQuan(false);
        setIsDaily(false);
        setIsMathang(false);
        setIsBaocao(false);
        setIsNhanvien(true);
        setIsQuitac(false);
        setIsCustomer(false);
    };

    const activateQuitac = () => {
        setIsQuan(false);
        setIsDaily(false);
        setIsMathang(false);
        setIsBaocao(false);
        setIsNhanvien(false);
        setIsQuitac(true);
        setIsCustomer(false);
    };

    const activateKhachhang = () => {
        setIsQuan(false);
        setIsDaily(false);
        setIsMathang(false);
        setIsBaocao(false);
        setIsNhanvien(false);
        setIsQuitac(false);
        setIsCustomer(true);
    };

        // For normal staff
    const activateSanpham = () => {
        setIsSanpham(true);
        setIsQuanlykho(false);
        setIsBaocaoStaff(false);
    };

    const activateQuanlykho = () => {
        setIsSanpham(false);
        setIsQuanlykho(true);
        setIsBaocaoStaff(false);
    };

    const activateBaocaoStaff = () => {
        setIsSanpham(false);
        setIsQuanlykho(false);
        setIsBaocaoStaff(true);
    };

    // Return here
    return (
        <ActiveButtonContext.Provider
            value = {{
                isQuan,
                isDaily,
                isMathang,
                isBaocao,
                isNhanvien,
                isCustomer,
                isQuitac,
                isSanpham,
                isQuanlykho,
                isBaocaoStaff,
                activateQuan,
                activateDaily,
                activateMathang,
                activateBaocao,
                activateNhanvien,
                activateQuitac,
                activateKhachhang,
                activateSanpham,
                activateQuanlykho,
                activateBaocaoStaff
            }}
        >
            {children}
        </ActiveButtonContext.Provider>
    );
};

//  Export as an easy-to-use feature
export const ActiveButton = () => useContext(ActiveButtonContext);


