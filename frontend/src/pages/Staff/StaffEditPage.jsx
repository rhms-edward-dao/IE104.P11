import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";

import ReturnIcon from "../../images/icons/return-button.png";
import Header from "../../components/Header";

import { getAllCityName, getAllDistrictName } from "../../assets/StoreDistrict";
import {
  updateStaff,
  getStaffById,
  getAllPositionName,
} from "../../assets/Staffs/StaffData";
import { getAllStoreName } from "../../assets/Stores/StoreData";
import { useTheme } from "../../contexts/ThemeContext";

// Import icon here
import GoBackIcon from "../../images/icons/button/GoBack.svg";
import GoBackDarkIcon from "../../images/icons/button/GoBack_Dark.svg";
import { useTranslation } from "react-i18next";

function StaffManagementEditPage() {
  // Variable for adding here
  // // For Dark Mode
  const { theme } = useTheme();
  // // For multi-language - adding something here
  const { t } = useTranslation();
  const { EP_Staff } = t("EditPage");
  const { SF_Districts, SF_Staffs } = t("SearchFilter");

  const [staffName, setStaffName] = useState("");
  const [staffBirthday, setStaffBirthday] = useState("");
  const [staffPhone, setStaffPhone] = useState("");
  const [staffEmail, setStaffEmail] = useState("");

  const [staffStore, setStaffStore] = useState("");
  const [staffStoreData, setStaffStoreData] = useState([]);

  const [staffPosition, setStaffPosition] = useState("");
  const [staffPositionData, setStaffPositionData] = useState([]);

  const [staffCityName, setStaffCityName] = useState("");
  const [staffCityData, setStaffCityData] = useState([]);

  const [staffDistrictName, setStaffDistrictName] = useState("");
  const [staffDistrictData, setStaffDistrictData] = useState([]);

  const [staffAddress, setStaffAddress] = useState("");

  const [image, setImage] = useState();
  const [imageData, setImageData] = useState();

  // Variables here
  const { staffId } = useParams();
  const navigate = useNavigate();

  // Function for getting some existed information
  useEffect(() => {
    const fetchAllData = async (id) => {
      // Getting existed data about 'DAILY'
      const existed_store = await getAllStoreName();
      setStaffStoreData(existed_store);
      // Getting existed data about 'CHUCVU'
      const existed_position = await getAllPositionName();
      setStaffPositionData(existed_position);
      // Getting existed data about 'THANH PHO'
      const existed_city = await getAllCityName();
      setStaffCityData(existed_city);
      // Getting existed data about 'QUAN'
      const existed_district = await getAllDistrictName();
      setStaffDistrictData(existed_district);
      // Getting all existedData
      const existedData = await getStaffById(id);
      setStaffName(existedData[0].Nhanvien.hoten);
      setStaffBirthday(existedData[0].Nhanvien.ngaysinh);
      setStaffPhone(existedData[0].Nhanvien.sodienthoai);
      setStaffEmail(existedData[0].Nhanvien.email);
      setStaffStore(existedData[0].tendaily);
      setStaffPosition(existedData[0].tenchucvu);
      setStaffCityName(existedData[0].tenthanhpho);
      setStaffDistrictName(existedData[0].tenquan);
      setImageData(existedData[0].Nhanvien.hinhanh);
      // Solving problem with address (just get house's number and ward information)
      setStaffAddress(existedData[0].diachi.split(",").slice(0, 2).join(","));
    };
    fetchAllData(staffId);
  }, []);

  const handleUploadImage = (e) => {
    setImageData(e.target.files[0]);
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  // Function for adding here
  const updateData = async (
    manhanvien,
    hoten,
    ngaysinh,
    sodienthoai,
    email,
    tendaily,
    tenchucvu,
    tenthanhpho,
    tenquan,
    diachi,
    hinhanh
  ) => {
    let check_hoten = true;
    let check_sodienthoai = true;
    let check_email = true;
    let check_diachi = true;
    let check_hinhanh = true;
    let check_ngaysinh = true;

    // Hoten length mút be in range [1, 100] and at least two word
    const isNameFormat = (input) => /^\S+( \S+){1,}$/.test(input);
    if (hoten.length < 1) {
      alert("Họ tên nhân viên không được để trống");
      check_hoten = false;
    } else if (hoten.length > 100) {
      alert("Họ tên nhân viên quá dài");
      check_hoten = false;
    } else {
      if (!isNameFormat(hoten)) {
        alert("Họ tên phải có ít nhất hai ký tự");
        check_hoten = false;
      }
    }
    // Staff's age mút be bigger than 18
    if (parseInt(2024) - parseInt(ngaysinh.split("-")[0]) < 18) {
      alert("Tuổi của nhân viên phải từ 18");
      check_ngaysinh = false;
    }
    // sodienthoai length must be in range [10; 15] and cannot include any letter or special character
    const isOnlyNumber = (input) => /^\d+$/.test(input);
    if (sodienthoai.length < 10) {
      alert("Số điện thoại không được ít hơn 10 chữ số");
      check_sodienthoai = false;
    } else if (sodienthoai.length > 15) {
      alert("Số điện thoại không được vượt qua 15 chữ số");
      check_sodienthoai = false;
    } else {
      if (!isOnlyNumber(sodienthoai)) {
        alert("Số điện thoại không được chứa chữ cái hoặc ký tự đặc biệt");
        check_sodienthoai = false;
      }
    }
    // email format checking
    const isEmailFormat = (input) =>
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(input);
    if (!isEmailFormat(email)) {
      alert("Sai định dạng của email");
      check_email = false;
    }
    // diachi must contain 1 ',' and some constraints else
    const countComma = (input) => {
      let commaCount = parseInt(0);
      let input_length = input.length;
      for (let i = 0; i < input_length; i++) {
        if (input[i] === ",") {
          commaCount++;
        }
      }
      return commaCount;
    };
    if (countComma(diachi) === 0) {
      alert("Địa chỉ nhập tới phường");
      check_diachi = false;
    } else if (countComma(diachi) > 1) {
      alert("Địa chỉ chỉ nhập tới phường");
      check_diachi = false;
    } else {
      const isToWardFormat = (input) => /^\s+\S+(?: \S+)*$/.test(input);
      const isAddressFormat = (input) => {
        let input_split = input.split(",");
        if (input_split[1] === "") return 1;
        if (!isToWardFormat(input_split[1])) return -1;
      };
      if (isAddressFormat(diachi) === -1) {
        alert("Nhập phường sai");
        check_diachi = false;
      } else if (isAddressFormat(diachi) === 1) {
        alert("Chưa nhập phường");
        check_diachi = false;
      } else {
        if (diachi.length < 1) {
          alert("Địa chỉ không được rỗng");
          check_diachi = false;
        } else if (diachi.length > 200) {
          alert("Địa chỉ nhập vào quá dài");
          check_diachi = false;
        }
      }
    }
    // Hinhanh cannot be null value
    if (hinhanh === undefined) {
      alert("Chưa chọn hình ảnh");
      check_hinhanh = false;
    }
    if (
      check_hoten &&
      check_ngaysinh &&
      check_sodienthoai &&
      check_email &&
      check_diachi &&
      check_hinhanh
    ) {
      if (image === undefined) {
        hinhanh = null;
      }
      let item = {
        tennhanvien: hoten,
        ngaysinh: ngaysinh,
        sodienthoai: sodienthoai,
        email: email,
        tendaily: tendaily,
        tenchucvu: tenchucvu,
        tenquan: tenquan,
        tenthanhpho: tenthanhpho,
        diachi: diachi,
        hinhanh: hinhanh,
      };
      const response = await updateStaff(manhanvien, item);
      if (response.message === "Số điện thoại đã tồn tại") {
        alert("Số điện thoại đã tồn tại");
      } else if (response.message === "Email đã tồn tại") {
        alert("Email này đã tồn tại");
      } else if (response.message === "Cập nhật nhân viên thất bại") {
        alert("Cập nhật nhân viên thất bại");
      } else if (response.message === "Địa chỉ không tồn tại") {
        alert("Địa chỉ không tồn tại");
      } else {
        alert("Cập nhật nhân viên thành công");
        navigate("/staff-management");
      }
    }
  };

  // Return render here
  return (
    <div>
      <div>
        <Header></Header>
      </div>
      <div className="m-5 bg-white p-5 shadow-lg transition-colors duration-300 dark:bg-[#363636] dark:text-white">
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
            <p className="w-1/2 text-2xl font-bold italic text-black transition-colors duration-300 dark:text-white">
              {EP_Staff.Title}
            </p>
            <button
              className="rounded-xl bg-red-500 px-2 py-3 text-lg font-bold text-white"
              onClick={() =>
                updateData(
                  staffId,
                  staffName,
                  staffBirthday,
                  staffPhone,
                  staffEmail,
                  staffStore,
                  staffPosition,
                  staffCityName,
                  staffDistrictName,
                  staffAddress,
                  imageData
                )
              }
            >
              <p className="font-bold text-white text-lg">Cập nhật</p>
            </button>
          </div>
      <div className="m-5">
        <div className="block space-y-8">
          <div className="space-y-4">
            <label htmlFor="staff-name-add" className="font-bold text-lg">
              {SF_Staffs.Columns.Col1}
            </label>
            <br />
            <input
              id="staff-name-add"
              name="staff-name-add"
              type="text"
              className="w-full rounded-lg border border-black bg-white px-5 py-2 text-lg text-black transition-colors duration-300 dark:border-white dark:bg-[#363636] dark:text-white"
              placeholder={`${SF_Staffs.Columns.Col2} ...`}
              value={staffName}
              onChange={(e) => setStaffName(e.target.value)}
            />
          </div>

          <div className="space-y-4">
            <label htmlFor="birthdate-add" className="font-bold text-lg">
              {SF_Staffs.Columns.Col2}
            </label>
            <br />
            <input
              id="birthdate-add"
              name="birthdate-add"
              type="date"
              className="w-full rounded-lg border border-black bg-white px-5 py-2 text-lg text-black transition-colors duration-300 dark:border-white dark:bg-[#363636] dark:text-white"
              value={staffBirthday}
              onChange={(e) => setStaffBirthday(e.target.value)}
            />
          </div>

          <div className="space-y-4">
            <label htmlFor="staff-phone-add" className="font-bold text-lg">
              {SF_Staffs.Columns.Col6}
            </label>
            <br />
            <input
              id="staff-phone-add"
              name="staff-phone-add"
              type="text"
              className="w-full rounded-lg border border-black bg-white px-5 py-2 text-lg text-black transition-colors duration-300 dark:border-white dark:bg-[#363636] dark:text-white"
              placeholder={`${SF_Staffs.Columns.Col6} ...`}
              value={staffPhone}
              onChange={(e) => setStaffPhone(e.target.value)}
            />
          </div>

          <div className="space-y-4">
            <label htmlFor="staff-email-add" className="font-bold text-lg">
              {SF_Staffs.Columns.Col7}
            </label>
            <br />
            <input
              id="staff-email-add"
              name="staff-email-add"
              type="email"
              className="w-full rounded-lg border border-black bg-white px-5 py-2 text-lg text-black transition-colors duration-300 dark:border-white dark:bg-[#363636] dark:text-white"
              placeholder={`${SF_Staffs.Columns.Col7} ...`}
              value={staffEmail}
              onChange={(e) => setStaffEmail(e.target.value)}
            />
          </div>

          <div className="space-y-4">
            <label htmlFor="store-name-add" className="font-bold text-lg">
              {SF_Staffs.Columns.Col3}
            </label>
            <br />
            <select
              id="store-name-add"
              name="store-name-add"
              type="email"
              className="rounded-md border border-black bg-white px-3 py-3 text-lg font-semibold text-black transition-colors duration-300 dark:border-white dark:bg-[#363636] dark:text-white"
              value={staffStore}
              onChange={(e) => setStaffStore(e.target.value)}
            >
              {staffStoreData.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-4">
            <label htmlFor="position-name-add" className="font-bold text-lg">
              {SF_Staffs.Columns.Col4}
            </label>
            <br />
            <select
              id="position-name-add"
              name="position-name-add"
              type="email"
              className="rounded-md border border-black bg-white px-3 py-3 text-lg font-semibold text-black transition-colors duration-300 dark:border-white dark:bg-[#363636] dark:text-white"
              value={staffPosition}
              onChange={(e) => setStaffPosition(e.target.value)}
            >
              {staffPositionData.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="space-x-20 flex">
            <div className="space-y-4">
              <label htmlFor="city-name-add" className="font-bold text-lg">
                {SF_Districts.Columns.Col2}
              </label>
              <br />
              {/* It must be a combobox -> selecting which city you need - fetch all city name from server for showing options */}
              <select
                id="city-name-add"
                name="city-name-add"
                className="rounded-md border border-black bg-white px-3 py-3 text-lg font-semibold text-black transition-colors duration-300 dark:border-white dark:bg-[#363636] dark:text-white"
                value={staffCityName}
                onChange={(e) => setStaffCityName(e.target.value)}
              >
                {staffCityData.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-4">
              <label htmlFor="district-name-add" className="font-bold text-lg">
                {SF_Districts.Columns.Col1}
              </label>
              <br />
              {/* It must be a combobox -> selecting which city you need - fetch all city name from server for showing options */}
              <select
                id="district-name-add"
                name="district-name-add"
                className="rounded-md border border-black bg-white px-3 py-3 text-lg font-semibold text-black transition-colors duration-300 dark:border-white dark:bg-[#363636] dark:text-white"
                value={staffDistrictName}
                onChange={(e) => setStaffDistrictName(e.target.value)}
              >
                {staffDistrictData.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <label htmlFor="address-add" className="font-bold text-lg">
              {SF_Staffs.Columns.Col5}
            </label>
            <br />
            <input
              id="address-add"
              name="address-add"
              type="email"
              className="w-full rounded-lg border border-black bg-white px-5 py-2 text-lg text-black transition-colors duration-300 dark:border-white dark:bg-[#363636] dark:text-white"
              placeholder={`${SF_Staffs.Columns.Col5} ...`}
              value={staffAddress}
              onChange={(e) => setStaffAddress(e.target.value)}
            />
          </div>

          <div className="space-y-4">
            <label htmlFor="image-add" className="font-bold text-lg">
              {SF_Staffs.Columns.Col8}
            </label>
            <br />
            <input
              id="image-add"
              name="image-add"
              type="file"
              accept="images/*"
              onChange={handleUploadImage}
            />

            {image !== undefined ? (
              <img src={image} alt="Hình đại diện" />
            ) : (
              <img
                src={`data:images/jpeg;base64, ${imageData}`}
                alt="Hình đại diện"
              />
            )}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

export default StaffManagementEditPage;
