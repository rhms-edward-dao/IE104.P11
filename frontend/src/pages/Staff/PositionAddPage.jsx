import React, { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";

import Header from "../../components/Header";

import { addPosition } from "../../assets/Staffs/StaffData";
import { useTheme } from "../../contexts/ThemeContext";

// Import icon here
import GoBackIcon from "../../images/icons/button/GoBack.svg";
import GoBackDarkIcon from "../../images/icons/button/GoBack_Dark.svg";
import { useTranslation } from "react-i18next";

function PositionAddPage() {
  // Variables here
  // // For Dark Mode
  const { theme } = useTheme();

  // // For multi-language
  const { t } = useTranslation();
  const { AP_Position } = t("AddPage");
  const { SF_Positions } = t("SearchFilter");

  const [positionName, setPositionName] = useState("");
  const [level, setLevel] = useState(1);
  const [salary, setSalary] = useState(3000000);

  const navigate = useNavigate();
  // // Get existedData
  const location = useLocation();
  const { existedData } = location.state;
  // Functions here
  const addData = async (tenchucvu, capdo, luong) => {
    const checkExistedData = existedData.some(
      (item) => item.tenchucvu === tenchucvu,
    );
    if (checkExistedData) {
      alert("Tên chức vụ đã tồn tại");
    } else {
      let check_tenchucvu = true;
      let check_capdo = true;
      let check_luong = true;
      // if - else condition here
      // Check tenchucvu
      if (tenchucvu.length < 2) {
        alert("Tên chức vụ không được để trống");
        check_tenchucvu = false;
      } else if (tenchucvu.length > 100) {
        alert("Tên chức vụ quá dài");
        check_tenchucvu = false;
      }
      // Check capdo
      if (capdo < 1 || capdo > 2) {
        alert("Chỉ có cấp độ 1 - nhân viên và cấp độ 2 - quản lý");
        check_capdo = false;
      }
      // Check luong
      if (luong < 3000000) {
        alert("Lương tối thiểu là 3000000");
        check_luong = false;
      }

      // Send data to server here
      if (check_tenchucvu && check_capdo && check_luong) {
        let item = {
          tenchucvu: tenchucvu,
          capdo: capdo,
          luong: luong,
        };
        const response = await addPosition(item);
        if (
          response.message === "Thêm chức vụ thất bại do chức vụ đã tồn tại"
        ) {
          alert("Tên chức vụ đã tồn tại");
        } else if (response.message === "Thêm chức vụ thất bại") {
          alert("Thêm chức vụ thất bại");
        } else {
          alert("Thêm chức vụ thành công");
          navigate("/staff-management");
        }
      }
    }
  };
  // Return here
  return (
    <div>
      <div>
        <Header path="/staff-management"></Header>
      </div>
      <div className="m-5 bg-white p-5 shadow-lg transition-colors duration-300 dark:bg-[#363636] dark:text-white">
        <div>
          <div>
            <div className="my-5 flex flex-wrap items-center justify-between">
              <p className="w-1/2 text-2xl font-bold italic text-black transition-colors duration-300 dark:text-white">
                {AP_Position.Title}
              </p>
              <div className="flex justify-end">
                <button
                  className="rounded-md bg-gradient-to-tr from-red-600 via-[#ea4444] to-[#ee7272] px-4 py-3 text-lg font-bold text-white transition-all duration-300 hover:scale-105 hover:bg-gradient-to-br hover:from-red-600 hover:via-[#ea4444] hover:to-[#ee7272]"
                  onClick={() => addData(positionName, level, salary)}
                >
                  <p className="text-lg font-bold text-white">Thêm</p>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="block space-y-8">
            <div className="space-y-4">
              <label htmlFor="district-name-add" className="text-lg font-bold">
                {SF_Positions.Columns.Col1}
              </label>
              <br />
              <input
                id="district-name-add"
                name="district-name-add"
                type="text"
                className="w-full rounded-lg border border-black bg-white px-5 py-2 text-lg text-black transition-colors duration-300 dark:border-white dark:bg-[#363636] dark:text-white"
                placeholder={`${SF_Positions.Columns.Col1} ...`}
                value={positionName}
                onChange={(e) => setPositionName(e.target.value)}
              />
            </div>

            <div className="space-y-4">
              <label htmlFor="level-add" className="text-lg font-bold">
                {SF_Positions.Columns.Col2}
              </label>
              <br />
              <input
                id="level-add"
                name="level-add"
                type="number"
                className="w-full rounded-lg border border-black bg-white px-5 py-2 text-lg text-black transition-colors duration-300 dark:border-white dark:bg-[#363636] dark:text-white"
                placeholder="  Cấp độ..."
                value={level}
                onChange={(e) => setLevel(e.target.value)}
              />
            </div>

            <div className="space-y-4">
              <label htmlFor="salary-add" className="text-lg font-bold">
                {SF_Positions.Columns.Col3}
              </label>
              <br />
              <input
                id="salary-add"
                name="salary-add"
                type="number"
                className="w-full rounded-lg border border-black bg-white px-5 py-2 text-lg text-black transition-colors duration-300 dark:border-white dark:bg-[#363636] dark:text-white"
                placeholder="   Lương..."
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default PositionAddPage;
