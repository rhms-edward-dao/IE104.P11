import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import ReturnIcon from "../../images/icons/return-button.png";
import Header from "../../components/Header";

import { getAllCityName, getAllDistrictName } from "../../assets/StoreDistrict";
import { addStaff, getAllPositionName } from "../../assets/Staffs/StaffData";
import { getAllStoreName } from "../../assets/Stores/StoreData";
function StaffManagementAddPage() {
  // Variable for adding here
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
  const navigate = useNavigate();

  // Function for getting some existed information
  useEffect(() => {
    const fetchAllData = async () => {
      // Getting existed data about 'DAILY'
      const existed_store = await getAllStoreName();
      setStaffStore(existed_store[0]);
      setStaffStoreData(existed_store);
      // Getting existed data about 'CHUCVU'
      const existed_position = await getAllPositionName();
      setStaffPosition(existed_position[0]);
      setStaffPositionData(existed_position);
      // Getting existed data about 'THANH PHO'
      const existed_city = await getAllCityName();
      setStaffCityName(existed_city[0]);
      setStaffCityData(existed_city);
      // Getting existed data about 'QUAN'
      const existed_district = await getAllDistrictName();
      setStaffDistrictName(existed_district[0]);
      setStaffDistrictData(existed_district);
      // Set today as default value for ngaysinh
      var date = new Date();
      var today = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
        2,
        "0"
      )}-${String(date.getDate()).padStart(2, "0")}`;
      setStaffBirthday(today);
    };
    fetchAllData();
  }, []);

  const handleUploadImage = (e) => {
    setImageData(e.target.files[0]);
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  // Function for adding here
  const addData = async (
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
      const response = await addStaff(item);
      if (response.message === "Số điện thoại đã tồn tại") {
        alert("Số điện thoại đã tồn tại");
      } else if (response.message === "Email đã tồn tại") {
        alert("Email này đã tồn tại");
      } else if (response.message === "Thêm nhân viên thất bại") {
        alert("Thêm nhân viên thất bại");
      } else {
        alert("Thêm nhân viên thành công");
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
              <p className="text-xl font-bold italic">{"Thêm nhân viên"}</p>
            </div>
            <div className="w-1/2 flex justify-end mr-5">
              <button
                className="px-2 py-3 bg-red-500 rounded rounded-xl"
                onClick={() =>
                  addData(
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
                <p className="font-bold text-white text-lg">Thêm</p>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="m-5">
        <div className="block space-y-8">
          <div className="space-y-4">
            <label htmlFor="staff-name-add" className="font-bold text-lg">
              Họ tên nhân viên
            </label>
            <br />
            <input
              id="staff-name-add"
              name="staff-name-add"
              type="text"
              className="w-full py-2 text-lg border border-black rounded-lg"
              placeholder="   Họ tên nhân viên..."
              value={staffName}
              onChange={(e) => setStaffName(e.target.value)}
            />
          </div>

          <div className="space-y-4">
            <label htmlFor="birthdate-add" className="font-bold text-lg">
              Ngày sinh
            </label>
            <br />
            <input
              id="birthdate-add"
              name="birthdate-add"
              type="date"
              className="px-5 py-3 rounded bg-stone-300"
              value={staffBirthday}
              onChange={(e) => setStaffBirthday(e.target.value)}
            />
          </div>

          <div className="space-y-4">
            <label htmlFor="staff-phone-add" className="font-bold text-lg">
              Số điện thoại
            </label>
            <br />
            <input
              id="staff-phone-add"
              name="staff-phone-add"
              type="text"
              className="w-full py-2 text-lg border border-black rounded-lg"
              placeholder="   Số điện thoại..."
              value={staffPhone}
              onChange={(e) => setStaffPhone(e.target.value)}
            />
          </div>

          <div className="space-y-4">
            <label htmlFor="staff-email-add" className="font-bold text-lg">
              Email cơ quan
            </label>
            <br />
            <input
              id="staff-email-add"
              name="staff-email-add"
              type="email"
              className="w-full py-2 text-lg border border-black rounded-lg"
              placeholder="   Email cơ quan..."
              value={staffEmail}
              onChange={(e) => setStaffEmail(e.target.value)}
            />
          </div>

          <div className="space-y-4">
            <label htmlFor="store-name-add" className="font-bold text-lg">
              Tên đại lý
            </label>
            <br />
            <select
              id="store-name-add"
              name="store-name-add"
              type="email"
              className="px-5 py-3 rounded bg-stone-300"
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
              Chức vụ
            </label>
            <br />
            <select
              id="position-name-add"
              name="position-name-add"
              type="email"
              className="px-5 py-3 rounded bg-stone-300"
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
                Thành phố
              </label>
              <br />
              {/* It must be a combobox -> selecting which city you need - fetch all city name from server for showing options */}
              <select
                id="city-name-add"
                name="city-name-add"
                className="px-5 py-3 rounded bg-stone-300"
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
                Quận
              </label>
              <br />
              {/* It must be a combobox -> selecting which city you need - fetch all city name from server for showing options */}
              <select
                id="district-name-add"
                name="district-name-add"
                className="px-5 py-3 rounded bg-stone-300"
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
              Địa chỉ
            </label>
            <br />
            <input
              id="address-add"
              name="address-add"
              type="email"
              className="w-full py-2 text-lg border border-black rounded-lg"
              placeholder="   Địa chỉ (tới phường)..."
              value={staffAddress}
              onChange={(e) => setStaffAddress(e.target.value)}
            />
          </div>

          <div className="space-y-4">
            <label htmlFor="image-add" className="font-bold text-lg">
              Hình ảnh
            </label>
            <br />
            <input
              id="image-add"
              name="image-add"
              type="file"
              accept="images/*"
              onChange={handleUploadImage}
            />

            <img src={image} alt="Hình đại diện" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default StaffManagementAddPage;
