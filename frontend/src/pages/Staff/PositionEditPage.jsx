import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";

import ReturnIcon from "../../images/icons/return-button.png";
import Header from "../../components/Header";

import { updatePosition, getPositionById } from "../../assets/Staffs/StaffData";

function PositionEditPage() {
  // Variables here
  const [positionName, setPositionName] = useState("");
  const [level, setLevel] = useState(1);
  const [salary, setSalary] = useState(0);
  const [time, setTime] = useState(1);
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
      setTime(existedData.thoihan);
    };
    fetchData(positionId);
  }, []);
  const updateData = async (machucvu, tenchucvu, capdo, luong, thoihan) => {
    let check_tenchucvu = true;
    let check_capdo = true;
    let check_luong = true;
    let check_thoihan = true;
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
    if (luong < 0) {
      alert("Lương không được âm");
      check_luong = false;
    }
    // Check thoihan
    if (thoihan < 1) {
      alert("Thời hạn làm việc ít nhất 1 năm");
      check_thoihan = false;
    } else if (thoihan > 5) {
      alert("Thời hạn tối đa là 5 năm");
      check_thoihan = false;
    }
    // Send data to server here
    if (check_tenchucvu && check_capdo && check_luong && check_thoihan) {
      let item = {
        tenchucvu: tenchucvu,
        capdo: capdo,
        luong: luong,
        thoihan: thoihan,
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
      <hr />

      <div>
        <div>
          <div className="flex items-center gap-40">
            <NavLink to={"/staff-management"}>
              <button>
                <img
                  src={ReturnIcon}
                  alt="Icon trở lại"
                  className="w-15 h-12"
                />
              </button>
            </NavLink>
          </div>
          <div className="flex mt-5">
            <div className="w-1/2">
              <p className="text-xl font-bold italic">{"Cập nhật chức vụ"}</p>
            </div>
            <div className="w-1/2 flex justify-end mr-5">
              <button
                className="px-2 py-3 bg-red-500 rounded rounded-xl"
                onClick={() =>
                  updateData(positionId, positionName, level, salary, time)
                }
              >
                <p className="font-bold text-white text-lg">Cập nhật</p>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="m-5">
        <div className="block space-y-8">
          <div className="space-y-4">
            <label htmlFor="district-name-add" className="font-bold text-lg">
              Tên quận
            </label>
            <br />
            <input
              id="district-name-add"
              name="district-name-add"
              type="text"
              className="w-full py-2 text-lg border border-black rounded-lg"
              placeholder="   Tên quận..."
              value={positionName}
              onChange={(e) => setPositionName(e.target.value)}
            />
          </div>

          <div className="space-y-4">
            <label htmlFor="level-add" className="font-bold text-lg">
              Cấp độ
            </label>
            <br />
            <input
              id="level-add"
              name="level-add"
              type="number"
              className="w-full py-2 text-lg border border-black rounded-lg"
              placeholder="  Cấp độ..."
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            />
          </div>

          <div className="space-y-4">
            <label htmlFor="salary-add" className="font-bold text-lg">
              Lương
            </label>
            <br />
            <input
              id="salary-add"
              name="salary-add"
              type="number"
              className="w-full py-2 text-lg border border-black rounded-lg"
              placeholder="   Lương..."
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
            />
          </div>

          <div className="space-y-4">
            <label htmlFor="time-add" className="font-bold text-lg">
              Thời hạn
            </label>
            <br />
            <input
              id="time-add"
              name="time-add"
              type="number"
              className="w-full py-2 text-lg border border-black rounded-lg"
              placeholder="   Thời hạn..."
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default PositionEditPage;
