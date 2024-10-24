// import { NavLink } from "react-router-dom";
// import StoreIcon from "../images/icons/warehouse.png";
// import ProductIcon from "../images/icons/product.png";
// import ImExIcon from "../images/icons/import-export.png";
// import ReportIcon from "../images/icons/report.png";
// import RuleIcon from "../images/icons/rule.png";
// import CustomerIcon from "../images/icons/customer.png";
// import RegulationIcon from "../images/icons/regulation.png";
// import DistrictMapIcon from "../images/icons/map_district.png";
// import LogoIcon from "../images/icons/logo.png";
// import Logout from "../images/icons/logout.png";

// import { useEffect, useState } from "react";

// import { useAuth } from "../contexts/AuthContext";
// import { ActiveButton } from "../contexts/ActiveButton";

import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Import Context Here
import { useAuth } from "../contexts/AuthContext";
import { ActiveButton } from "../contexts/ActiveButton";

// Import Icons Here
// Admin Sidebar Icons
import DistrictsIcon from "../images/icons/sidebar/Districts.svg";
import StoresIcon from "../images/icons/sidebar/Stores.svg";
import StaffsIcon from "../images/icons/sidebar/Staffs.svg";
import RulesIcon from "../images/icons/sidebar/Rules.svg";
// Staff Sidebar Icons
import WarehousesIcon from "../images/icons/sidebar/Warehouses.svg";
// Both Admin & Staff Sidebar Icons
import LogoIcon from "../images/icons/sidebar/Logo.svg";
import LogoutIcon from "../images/icons/sidebar/Logout.svg";
import ProductsIcon from "../images/icons/sidebar/Products.svg";
import CustomersIcon from "../images/icons/sidebar/Customers.svg";
import ReportsIcon from "../images/icons/sidebar/Reports.svg";

function Sidebar() {
  // Variables here
  // Variables for controlling sidebar
  const { isLoggedIn, logout, isAdmin } = useAuth();
  const {
    isQuan,
    isDaily,
    isMathang,
    isBaocao,
    isNhanvien,
    isQuitac,
    isCustomer,
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
    activateBaocaoStaff,
  } = ActiveButton();

  const { t } = useTranslation();
  const {
    Districts,
    Stores,
    ProductCategories,
    Staffs,
    Rules,
    Reports,
    Products,
    Warehouses,
    Customers,
    LogOut_Btn,
  } = t("Sidebar");

  // Functions here
  // Function for logout
  const handleLogout = () => {
    logout();
  };
  // Function for change button's state
  // Render return here
  return (
    <div className="block bg-black w-full h-full">
      {/* If in login page, show only 'KietStore' */}
      <div className="flex flex-wrap space-x-3 items-center justify-center pt-5">
        <img src={LogoIcon} alt="Logo" className="w-18 h-15" />
        <p className="text-white font-bold text-2xl">KietStore</p>
      </div>

      {/* isAdmin */}
      {isLoggedIn == true && isAdmin == true ? (
        <>
          {isQuan ? (
            <div className="my-4 py-4 bg-red-500">
              <NavLink to="/districts">
                <div className="flex gap-3 items-center">
                  <img src={DistrictsIcon} alt="" className="mx-5 h-10 w-10" />
                  <p className="text-white font-bold">{Districts}</p>
                </div>
              </NavLink>
            </div>
          ) : (
            <div className="my-4 py-4 hover:bg-red-500">
              <NavLink to="/districts">
                <button
                  className="w-full flex gap-3 items-center"
                  onClick={() => activateQuan()}
                >
                  <img src={DistrictsIcon} alt="" className="mx-5 h-10 w-10" />
                  <p className="text-white font-bold">{Districts}</p>
                </button>
              </NavLink>
            </div>
          )}
        </>
      ) : (
        <></>
      )}

      {isLoggedIn == true && isAdmin == true ? (
        <>
          {isDaily ? (
            <>
              <div className="my-4 py-4 bg-red-500">
                <NavLink to="/stores">
                  <div className="flex gap-3 items-center">
                    <img src={StoresIcon} alt="" className="mx-5 h-10 w-10" />
                    <p className="text-white font-bold">{Stores}</p>
                  </div>
                </NavLink>
              </div>
            </>
          ) : (
            <div className="my-4 py-4 hover:bg-red-500">
              <NavLink to="/stores">
                <button
                  className="w-full flex gap-3 items-center"
                  onClick={() => activateDaily()}
                >
                  <img src={StoresIcon} alt="" className="mx-5 h-10 w-10" />
                  <p className="text-white font-bold">{Stores}</p>
                </button>
              </NavLink>
            </div>
          )}
        </>
      ) : (
        <></>
      )}

      {isLoggedIn == true && isAdmin == true ? (
        <>
          {isMathang ? (
            <div className="my-4 py-4 bg-red-500">
              <NavLink to="/product-categorys">
                <div className="flex gap-3 items-center">
                  <img src={ProductsIcon} alt="" className="mx-5 h-10 w-10" />
                  <p className="text-white font-bold">{ProductCategories}</p>
                </div>
              </NavLink>
            </div>
          ) : (
            <div className="my-4 py-4 hover:bg-red-500">
              <NavLink to="/product-categorys">
                <button
                  className="w-full flex gap-3 items-center"
                  onClick={() => activateMathang()}
                >
                  <img src={ProductsIcon} alt="" className="mx-5 h-10 w-10" />
                  <p className="text-white font-bold">{ProductCategories}</p>
                </button>
              </NavLink>
            </div>
          )}
        </>
      ) : (
        <></>
      )}

      {isLoggedIn == true && isAdmin == true ? (
        <>
          {isNhanvien ? (
            <div className="my-4 py-4 bg-red-500">
              <NavLink to="/staff-management">
                <div className="flex gap-3 items-center">
                  <img src={StaffsIcon} alt="" className="mx-5 h-10 w-10" />
                  <p className="text-white font-bold">{Staffs}</p>
                </div>
              </NavLink>
            </div>
          ) : (
            <div className="my-4 py-4 hover:bg-red-500">
              <NavLink to="/staff-management">
                <button
                  className="w-full flex gap-3 items-center"
                  onClick={() => activateNhanvien()}
                >
                  <img src={StaffsIcon} alt="" className="mx-5 h-10 w-10" />
                  <p className="text-white font-bold">{Staffs}</p>
                </button>
              </NavLink>
            </div>
          )}
        </>
      ) : (
        <></>
      )}

      {isLoggedIn == true && isAdmin == true ? (
        <>
          {isQuitac ? (
            <div className="my-4 py-4 bg-red-500">
              <NavLink to="/rule-management">
                <div className="flex gap-3 items-center">
                  <img src={RulesIcon} alt="" className="mx-5 h-10 w-10" />
                  <p className="text-white font-bold">{Rules}</p>
                </div>
              </NavLink>
            </div>
          ) : (
            <div className="my-4 py-4 hover:bg-red-500">
              <NavLink to="/rule-management">
                <button
                  className="w-full flex gap-3 items-center"
                  onClick={() => activateQuitac()}
                >
                  <img src={RulesIcon} alt="" className="mx-5 h-10 w-10" />
                  <p className="text-white font-bold">{Rules}</p>
                </button>
              </NavLink>
            </div>
          )}
        </>
      ) : (
        <></>
      )}

      {isLoggedIn == true && isAdmin == true ? (
        <>
          {isCustomer ? (
            <div className="my-4 py-4 bg-red-500">
              <NavLink to="/customer">
                <div className="flex gap-3 items-center">
                  <img src={CustomersIcon} alt="" className="mx-5 h-10 w-10" />
                  <p className="text-white font-bold">{Customers}</p>
                </div>
              </NavLink>
            </div>
          ) : (
            <div className="my-4 py-4 hover:bg-red-500">
              <NavLink to="/customer">
                <button
                  className="w-full flex gap-3 items-center"
                  onClick={() => activateKhachhang()}
                >
                  <img src={CustomersIcon} alt="" className="mx-5 h-10 w-10" />
                  <p className="text-white font-bold">{Customers}</p>
                </button>
              </NavLink>
            </div>
          )}
        </>
      ) : (
        <></>
      )}

      {isLoggedIn == true && isAdmin == true ? (
        <>
          {isBaocao ? (
            <div className="my-4 py-4 bg-red-500">
              <NavLink to="/admin-report">
                <div className="flex gap-3 items-center">
                  <img src={ReportsIcon} alt="" className="mx-5 h-10 w-10" />
                  <p className="text-white font-bold">{Reports}</p>
                </div>
              </NavLink>
            </div>
          ) : (
            <div className="my-4 py-4 hover:bg-red-500">
              <NavLink to="/admin-report">
                <button
                  className="w-full flex gap-3 items-center"
                  onClick={() => activateBaocao()}
                >
                  <img src={ReportsIcon} alt="" className="mx-5 h-10 w-10" />
                  <p className="text-white font-bold">{Reports}</p>
                </button>
              </NavLink>
            </div>
          )}
        </>
      ) : (
        <></>
      )}

      {/* !isAdmin */}
      {isLoggedIn == true && isAdmin == false ? (
        <>
          {isSanpham ? (
            <div className="my-4 py-4 bg-red-500">
              <NavLink to="/products">
                <div className="flex gap-3 items-center">
                  <img src={ProductsIcon} alt="" className="mx-5 h-10 w-10" />
                  <p className="text-white font-bold">{Products}</p>
                </div>
              </NavLink>
            </div>
          ) : (
            <div className="my-4 py-4 hover:bg-red-500">
              <NavLink to="/products">
                <button
                  className="w-full flex gap-3items-center"
                  onClick={() => activateSanpham()}
                >
                  <img src={ProductsIcon} alt="" className="mx-5 h-10 w-10" />
                  <p className="text-white font-bold">{Products}</p>
                </button>
              </NavLink>
            </div>
          )}
        </>
      ) : (
        <></>
      )}

      {isLoggedIn == true && isAdmin == false ? (
        <>
          {isQuanlykho ? (
            <div className="my-4 py-4 bg-red-500">
              <NavLink tp="store-transaction">
                <div className="flex gap-3 items-center">
                  <img src={WarehousesIcon} alt="" className="mx-5 h-10 w-10" />
                  <p className="text-white font-bold">{Warehouses}</p>
                </div>
              </NavLink>
            </div>
          ) : (
            <div className="my-4 py-4 hover:bg-red-500">
              <NavLink to="/store-transaction">
                <button
                  className="w-full flex gap-3 items-center"
                  onClick={() => activateQuanlykho()}
                >
                  <img src={WarehousesIcon} alt="" className="mx-5 h-10 w-10" />
                  <p className="text-white font-bold">{Warehouses}</p>
                </button>
              </NavLink>
            </div>
          )}
        </>
      ) : (
        <></>
      )}
      {isLoggedIn == true && isAdmin == false ? (
        <>
          {isCustomer ? (
            <div className="my-4 py-4 bg-red-500">
              <NavLink to="/customer">
                <div className="flex gap-3 items-center">
                  <img src={CustomersIcon} alt="" className="mx-5 h-10 w-10" />
                  <p className="text-white font-bold">{Customers}</p>
                </div>
              </NavLink>
            </div>
          ) : (
            <div className="my-4 py-4 hover:bg-red-500">
              <NavLink to="/customer">
                <button
                  className="w-full flex gap-3 items-center"
                  onClick={() => activateKhachhang()}
                >
                  <img src={CustomersIcon} alt="" className="mx-5 h-10 w-10" />
                  <p className="text-white font-bold">{Customers}</p>
                </button>
              </NavLink>
            </div>
          )}
        </>
      ) : (
        <></>
      )}

      {isLoggedIn == true && isAdmin == false ? (
        <>
          {isBaocaoStaff ? (
            <div className="my-4 py-4 bg-red-500">
              <NavLink to="/store-report">
                <div className="flex gap-3 items-center">
                  <img src={ReportsIcon} alt="" className="mx-5 h-10 w-10" />
                  <p className="text-white font-bold">{Reports}</p>
                </div>
              </NavLink>
            </div>
          ) : (
            <div className="my-4 py-4 hover:bg-red-500">
              <NavLink to="/store-report">
                <button
                  className="w-full flex gap-3 items-center"
                  onClick={() => activateBaocaoStaff()}
                >
                  <img src={ReportsIcon} alt="" className="mx-5 h-10 w-10" />
                  <p className="text-white font-bold">{Reports}</p>
                </button>
              </NavLink>
            </div>
          )}
        </>
      ) : (
        <></>
      )}

      {/* Logout button */}
      {isLoggedIn ? (
        <div className="my-4 py-4 hover:bg-red-500">
          <NavLink to="/login" onClick={() => handleLogout()}>
            <div className="flex gap-3 items-center">
              <img src={LogoutIcon} alt="" className="mx-5 h-10 w-10" />
              <p className="text-white font-bold">{LogOut_Btn}</p>
            </div>
          </NavLink>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Sidebar;
