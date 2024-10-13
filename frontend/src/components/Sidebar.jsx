import { NavLink } from "react-router-dom";
import StoreIcon from "../images/icons/warehouse.png";
import ProductIcon from "../images/icons/product.png";
import ImExIcon from "../images/icons/import-export.png";
import ReportIcon from "../images/icons/report.png";
import RuleIcon from "../images/icons/rule.png";
import CustomerIcon from "../images/icons/customer.png";
import RegulationIcon from "../images/icons/regulation.png";
import DistrictMapIcon from "../images/icons/map_district.png";
import LogoIcon from "../images/icons/logo.png";
import Logout from "../images/icons/logout.png";

import { useEffect, useState } from "react";

import { useAuth } from "../AuthContext";
import { ActiveButton } from "../ActiveButton";

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
                  <img src={DistrictMapIcon} alt="" className="ml-1 " />
                  <p className="text-white font-bold">Quận</p>
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
                  <img src={DistrictMapIcon} alt="" className="ml-1 " />
                  <p className="text-white font-bold">Quận</p>
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
                    <img src={StoreIcon} alt="" className="ml-1 " />
                    <p className="text-white font-bold">Đại lý</p>
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
                  <img src={StoreIcon} alt="" className="ml-1 " />
                  <p className="text-white font-bold">Đại lý</p>
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
                  <img src={ProductIcon} alt="" className="ml-1 " />
                  <p className="text-white font-bold">Mặt hàng</p>
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
                  <img src={ProductIcon} alt="" className="ml-1 " />
                  <p className="text-white font-bold">Mặt hàng</p>
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
                  <img src={RegulationIcon} alt="" className="ml-1 " />
                  <p className="text-white font-bold">Nhân viên</p>
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
                  <img src={RegulationIcon} alt="" className="ml-1 " />
                  <p className="text-white font-bold">Nhân viên</p>
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
                  <img src={RuleIcon} alt="" className="ml-1 " />
                  <p className="text-white font-bold">Qui tắc</p>
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
                  <img src={RuleIcon} alt="" className="ml-1 " />
                  <p className="text-white font-bold">Qui tắc</p>
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
                  <img src={CustomerIcon} alt="" className="ml-1 " />
                  <p className="text-white font-bold">Khách hàng</p>
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
                  <img src={CustomerIcon} alt="" className="ml-1" />
                  <p className="text-white font-bold">Khách hàng</p>
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
                  <img src={ReportIcon} alt="" className="ml-1 " />
                  <p className="text-white font-bold">Báo cáo</p>
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
                  <img src={ReportIcon} alt="" className="ml-1 " />
                  <p className="text-white font-bold">Báo cáo</p>
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
                  <img src={ProductIcon} alt="" className="ml-1 " />
                  <p className="text-white font-bold">Sản phẩm</p>
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
                  <img src={ProductIcon} alt="" className="ml-1 " />
                  <p className="text-white font-bold">Sản phẩm</p>
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
                  <img src={ImExIcon} alt="" className="ml-1 " />
                  <p className="text-white font-bold">Quản lý kho</p>
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
                  <img src={ImExIcon} alt="" className="ml-1 " />
                  <p className="text-white font-bold">Quản lý kho</p>
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
                  <img src={CustomerIcon} alt="" className="ml-1 " />
                  <p className="text-white font-bold">Khách hàng</p>
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
                  <img src={CustomerIcon} alt="" className="ml-1" />
                  <p className="text-white font-bold">Khách hàng</p>
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
                  <img src={ReportIcon} alt="" className="ml-1 " />
                  <p className="text-white font-bold">Báo cáo</p>
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
                  <img src={ReportIcon} alt="" className="ml-1 " />
                  <p className="text-white font-bold">Báo cáo</p>
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
              <img src={Logout} alt="" className="ml-1 " />
              <p className="text-white font-bold">Đăng xuất</p>
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
