import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";

import ReturnIcon from "../../images/icons/button/GoBack.svg";
import Header from "../../components/Header";

import { updatePosition, getPositionById } from "../../assets/Staffs/StaffData";

// Import icon here
import GoBackIcon from "../../images/icons/button/GoBack.svg";
import GoBackDarkIcon from "../../images/icons/button/GoBack_Dark.svg";
import { useTheme } from "../../contexts/ThemeContext";
import { useTranslation } from "react-i18next";

function PositionEditPage() {
  // Variables here
  // // For Dark Mode
  const { theme } = useTheme();
  // // For multi-language
  const { t } = useTranslation();
  const { EP_Position } = t("EditPage");
  const { SF_Positions } = t("SearchFilter");

  const [positionName, setPositionName] = useState("");
  const [level, setLevel] = useState(1);
  const [salary, setSalary] = useState(0);
  const { positionId } = useParams();
  const navigate = useNavigate();
  // Functions here
  useEffect(() => {
    // Getting existed data
    const fetchData = async (id) => {
      const existedData = await getPositionById(id);
      setPositionName(existedData.tenchucvu);
      setLevel(existedData.capdo);
      setSalary(existedData.luong);
    };
    fetchData(positionId);
  }, []);
  const updateData = async (machucvu, tenchucvu, capdo, luong) => {
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
      const response = await updatePosition(machucvu, item);
      if (
        response.message === "Cập nhật chức vụ thất bại do chức vụ đã tồn tại"
      ) {
        alert("Tên chức vụ đã tồn tại");
      } else if (response.message === "Cập nhật chức vụ thất bại") {
        alert("Cập nhật chức vụ thất bại");
      } else {
        alert("Cập nhật chức vụ thành công");
        navigate("/staff-management");
      }
    }
  };
  // Return here
  return (
    <div>
      <div>
        <Header></Header>
      </div>
      <div className="m-5 bg-white p-5 shadow-lg transition-colors duration-300 dark:bg-[#363636] dark:text-white">
        <div>
          <div>
            <div className="flex items-center gap-40">
              <NavLink to={"/staff-management"}>
                <button>
                  <img
                    src={theme === "light" ? GoBackIcon : GoBackDarkIcon}
                    alt="Icon trở lại"
                    className="w-15 h-12"
                  />
                </button>
              </NavLink>
            </div>
            <div className="my-5 flex flex-wrap items-center justify-between">
              <p className="text-2xl font-bold italic">{EP_Position.Title}</p>
              <div className="flex justify-end">
                <button
                  className="rounded-xl bg-red-500 px-2 py-3"
                  onClick={() =>
                    updateData(positionId, positionName, level, salary)
                  }
                >
                  <p className="text-lg font-bold text-white">Cập nhật</p>
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
export default PositionEditPage;
