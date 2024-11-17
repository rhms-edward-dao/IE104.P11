import { createContext, useContext, useEffect, useState } from "react";

const ActiveButtonContext = createContext();

export const ActiveButtonProvider = ({ children }) => {
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
  const [isKhachhang, setIsKhachhang] = useState(false);
  const [isQuanlydaily, setIsQuanlydaily] = useState(false);
  const [isBaocaoStaff, setIsBaocaoStaff] = useState(false);

  // Functions here
  useEffect(() => {
    // // // FOR ADMIN
    const storedIsDaily = sessionStorage.getItem("isDaily");
    const storedIsQuan = sessionStorage.getItem("isQuan");
    const storedIsMatHang = sessionStorage.getItem("isMathang");
    const storedIsBaocao = sessionStorage.getItem("isBaocao");
    const storedIsNhanvien = sessionStorage.getItem("isNhanvien");
    const storedIsQuitac = sessionStorage.getItem("isQuitac");
    const storedIsCustomer = sessionStorage.getItem("isCustomer");

    // SessionStorage for isDaily
    if (storedIsDaily === "true") {
      setIsDaily(true);
    } else {
      setIsDaily(false);
    } // If there is no information about this state, it will be false

    // SessionStorage for isQuan
    if (storedIsQuan === "true") {
      setIsQuan(true);
    } else {
      setIsQuan(false);
    } // If there is no information about this state, it will be false

    // SessionStorage for isMathang
    if (storedIsMatHang === "true") {
      setIsMathang(true);
    } else {
      setIsMathang(false);
    } // If there is no information about this state, it will be false

    // SessionStorage for isBaocao
    if (storedIsBaocao === "true") {
      setIsBaocao(true);
    } else {
      setIsBaocao(false);
    } // If there is no information about this state, it will be false

    // SessionStorage for isNhanvien
    if (storedIsNhanvien === "true") {
      setIsNhanvien(true);
    } else {
      setIsNhanvien(false);
    } // If there is no information about this state, it will be false

    // SessionStorage for isQuitac
    if (storedIsQuitac === "true") {
      setIsQuitac(true);
    } else {
      setIsQuitac(false);
    } // If there is no information about this state, it will be false

    // SessionStorage for isCustomer
    if (storedIsCustomer === "true") {
      setIsCustomer(true);
    } else {
      setIsCustomer(false);
    } // If there is no information about this state, it will be false

    // // // FOR NORMAL STAFF    
    const storedIsSanpham = sessionStorage.getItem("isSanpham");
    const storedIsQuanlykho = sessionStorage.getItem("isQuanlykho");
    const storedIsKhachhang = sessionStorage.getItem("isKhachhang");
    const storedIsQuanlydaily = sessionStorage.getItem("isQuanlydaily");
    const storedIsBaocaoStaff = sessionStorage.getItem("isBaocaoStaff");

    // SessionStorage for isDaily
    if (storedIsSanpham === "true") {
      setIsSanpham(true);
    } else {
      setIsSanpham(false);
    } // If there is no information about this state, it will be false

    // SessionStorage for isQuan
    if (storedIsQuanlykho === "true") {
      setIsQuanlykho(true);
    } else {
      setIsQuanlykho(false);
    } // If there is no information about this state, it will be false

    // SessionStorage for isMathang
    if (storedIsKhachhang === "true") {
      setIsKhachhang(true);
    } else {
      setIsKhachhang(false);
    } // If there is no information about this state, it will be false

    // SessionStorage for isBaocao
    if (storedIsQuanlydaily === "true") {
      setIsQuanlydaily(true);
    } else {
      setIsQuanlydaily(false);
    } // If there is no information about this state, it will be false

    // SessionStorage for isNhanvien
    if (storedIsBaocaoStaff === "true") {
      setIsBaocaoStaff(true);
    } else {
      setIsBaocaoStaff(false);
    } // If there is no information about this state, it will be false
  }, []);

  // For admin
  const activateQuan = () => {
    setIsQuan(true);
    setIsDaily(false);
    setIsMathang(false);
    setIsBaocao(false);
    setIsNhanvien(false);
    setIsQuitac(false);
    setIsCustomer(false);
    // Save state in Session Storage
    sessionStorage.setItem("isQuan", "true");
    sessionStorage.setItem("isDaily", "false");
    sessionStorage.setItem("isMathang", "false");
    sessionStorage.setItem("isBaocao", "false");
    sessionStorage.setItem("isNhanvien", "false");
    sessionStorage.setItem("isQuitac", "false");
    sessionStorage.setItem("isCustomer", "false");
  };

  const activateDaily = () => {
    setIsQuan(false);
    setIsDaily(true);
    setIsMathang(false);
    setIsBaocao(false);
    setIsNhanvien(false);
    setIsQuitac(false);
    setIsCustomer(false);
    // Save state in Session Storage
    sessionStorage.setItem("isQuan", "false");
    sessionStorage.setItem("isDaily", "true");
    sessionStorage.setItem("isMathang", "false");
    sessionStorage.setItem("isBaocao", "false");
    sessionStorage.setItem("isNhanvien", "false");
    sessionStorage.setItem("isQuitac", "false");
    sessionStorage.setItem("isCustomer", "false");
  };

  const activateMathang = () => {
    setIsQuan(false);
    setIsDaily(false);
    setIsMathang(true);
    setIsBaocao(false);
    setIsNhanvien(false);
    setIsQuitac(false);
    setIsCustomer(false);
    // Save state in Session Storage
    sessionStorage.setItem("isQuan", "false");
    sessionStorage.setItem("isDaily", "false");
    sessionStorage.setItem("isMathang", "true");
    sessionStorage.setItem("isBaocao", "false");
    sessionStorage.setItem("isNhanvien", "false");
    sessionStorage.setItem("isQuitac", "false");
    sessionStorage.setItem("isCustomer", "false");
  };

  const activateBaocao = () => {
    setIsQuan(false);
    setIsDaily(false);
    setIsMathang(false);
    setIsBaocao(true);
    setIsNhanvien(false);
    setIsQuitac(false);
    setIsCustomer(false);
    // Save state in Session Storage
    sessionStorage.setItem("isQuan", "false");
    sessionStorage.setItem("isDaily", "false");
    sessionStorage.setItem("isMathang", "false");
    sessionStorage.setItem("isBaocao", "true");
    sessionStorage.setItem("isNhanvien", "false");
    sessionStorage.setItem("isQuitac", "false");
    sessionStorage.setItem("isCustomer", "false");
  };

  const activateNhanvien = () => {
    setIsQuan(false);
    setIsDaily(false);
    setIsMathang(false);
    setIsBaocao(false);
    setIsNhanvien(true);
    setIsQuitac(false);
    setIsCustomer(false);
    // Save state in Session Storage
    sessionStorage.setItem("isQuan", "false");
    sessionStorage.setItem("isDaily", "false");
    sessionStorage.setItem("isMathang", "false");
    sessionStorage.setItem("isBaocao", "false");
    sessionStorage.setItem("isNhanvien", "true");
    sessionStorage.setItem("isQuitac", "false");
    sessionStorage.setItem("isCustomer", "false");
  };

  const activateQuitac = () => {
    setIsQuan(false);
    setIsDaily(false);
    setIsMathang(false);
    setIsBaocao(false);
    setIsNhanvien(false);
    setIsQuitac(true);
    setIsCustomer(false);
     // Save state in Session Storage
     sessionStorage.setItem("isQuan", "false");
     sessionStorage.setItem("isDaily", "false");
     sessionStorage.setItem("isMathang", "false");
     sessionStorage.setItem("isBaocao", "false");
     sessionStorage.setItem("isNhanvien", "false");
     sessionStorage.setItem("isQuitac", "true");
     sessionStorage.setItem("isCustomer", "false");
  };

  const activateKhachhang = () => {
    setIsQuan(false);
    setIsDaily(false);
    setIsMathang(false);
    setIsBaocao(false);
    setIsNhanvien(false);
    setIsQuitac(false);
    setIsCustomer(true);
     // Save state in Session Storage
     sessionStorage.setItem("isQuan", "false");
     sessionStorage.setItem("isDaily", "false");
     sessionStorage.setItem("isMathang", "false");
     sessionStorage.setItem("isBaocao", "false");
     sessionStorage.setItem("isNhanvien", "false");
     sessionStorage.setItem("isQuitac", "false");
     sessionStorage.setItem("isCustomer", "true");
  };

  // For normal staff
  const activateSanpham = () => {
    setIsSanpham(true);
    setIsQuanlykho(false);
    setIsKhachhang(false);
    setIsQuanlydaily(false);
    setIsBaocaoStaff(false);
    // Save state in Session Storage
    sessionStorage.setItem("isSanpham", "true");
    sessionStorage.setItem("isQuanlykho", "false");
    sessionStorage.setItem("isKhachhang", "false");
    sessionStorage.setItem("isQuanlydaily", "false");
    sessionStorage.setItem("isBaocaoStaff", "false");
  };

  const activateQuanlykho = () => {
    setIsSanpham(false);
    setIsQuanlykho(true);
    setIsKhachhang(false);
    setIsQuanlydaily(false);
    setIsBaocaoStaff(false);
    // Save state in Session Storage
    sessionStorage.setItem("isSanpham", "false");
    sessionStorage.setItem("isQuanlykho", "true");
    sessionStorage.setItem("isKhachhang", "false");
    sessionStorage.setItem("isQuanlydaily", "false");
    sessionStorage.setItem("isBaocaoStaff", "false");
  };

  const activateKhachhangStaff = () => {
    setIsSanpham(false);
    setIsQuanlykho(false);
    setIsKhachhang(true);
    setIsQuanlydaily(false);
    setIsBaocaoStaff(false);
    // Save state in Session Storage
    sessionStorage.setItem("isSanpham", "false");
    sessionStorage.setItem("isQuanlykho", "false");
    sessionStorage.setItem("isKhachhang", "true");
    sessionStorage.setItem("isQuanlydaily", "false");
    sessionStorage.setItem("isBaocaoStaff", "false");
  };

  const activateQuanlydaily = () => {
    setIsSanpham(false);
    setIsQuanlykho(false);
    setIsKhachhang(false);
    setIsQuanlydaily(true);
    setIsBaocaoStaff(false);
    // Save state in Session Storage
    sessionStorage.setItem("isSanpham", "false");
    sessionStorage.setItem("isQuanlykho", "false");
    sessionStorage.setItem("isKhachhang", "false");
    sessionStorage.setItem("isQuanlydaily", "true");
    sessionStorage.setItem("isBaocaoStaff", "false");
  };

  const activateBaocaoStaff = () => {
    setIsSanpham(false);
    setIsQuanlykho(false);
    setIsKhachhang(false);
    setIsQuanlydaily(false);
    setIsBaocaoStaff(true);
    // Save state in Session Storage
    sessionStorage.setItem("isSanpham", "false");
    sessionStorage.setItem("isQuanlykho", "false");
    sessionStorage.setItem("isKhachhang", "false");
    sessionStorage.setItem("isQuanlydaily", "false");
    sessionStorage.setItem("isBaocaoStaff", "true");
  };

  // Return here
  return (
    <ActiveButtonContext.Provider
      value={{
        isQuan,
        isDaily,
        isMathang,
        isBaocao,
        isNhanvien,
        isCustomer,
        isQuitac,
        isSanpham,
        isQuanlykho,
        isKhachhang,
        isQuanlydaily,
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
        activateKhachhangStaff,
        activateQuanlydaily,
        activateBaocaoStaff,
      }}
    >
      {children}
    </ActiveButtonContext.Provider>
  );
};

//  Export as an easy-to-use feature
export const ActiveButton = () => useContext(ActiveButtonContext);
