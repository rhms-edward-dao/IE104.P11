import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Import Context Here
import { useTheme } from "../../contexts/ThemeContext";

// Import Assets Here
import {
  getAllCityName,
  getAllDistrictName,
} from "../../assets/Districts/DistrictData";
import { addStore } from "../../assets/Stores/StoreData";
import { getAllStoreCategoryName } from "../../assets/Stores/StoreCategoryData";

// Import Components Here
import Header from "../../components/Header";

// Import Icons Here
import GoBackIcon from "../../images/icons/button/GoBack.svg";
import GoBackDarkIcon from "../../images/icons/button/GoBack_Dark.svg";

const StoreAddPage = () => {
  // Variable here
  // // For Theme Mode
  const { theme } = useTheme();
  // // For Multi-Language
  const { t } = useTranslation();
  const { AP_Stores } = t("AddPage");
  const { SF_Districts, SF_Stores } = t("SearchFilter");
  const { Add } = t("Buttons");
  // // For adding store
  const [newStoreName, setNewStoreName] = useState("");

  const [newStoreCategoryName, setNewStoreCategoryName] = useState("");
  const [existedStoreCategoryName, setExistedStoreCategoryName] = useState([]);

  const [newReceiveDate, setNewReceiveDate] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");

  const [newDistrictName, setNewDistrictName] = useState("");
  const [existedDistrictName, setExistedDistrictName] = useState([]);

  const [newCityName, setNewCityName] = useState("");
  const [existedCityName, setExistedCityName] = useState([]);

  const [newAddress, setNewAddress] = useState("");

  const [newImage, setNewImage] = useState();
  const [imageForShow, setImageForShow] = useState();
  // // For navigating
  const navigate = useNavigate();

  // Use Effect here
  // // For getting all existed store categories name, districts name, cities name
  useEffect(() => {
    const fetchAllExistedData = async () => {
      // Set all existed store categories name
      const storeCategoriesName = await getAllStoreCategoryName();
      setExistedStoreCategoryName(storeCategoriesName);
      // Set initial value for the dropdown-selected box
      setNewStoreCategoryName(storeCategoriesName[0]);

      // Set all existed districts name
      const districtName = await getAllDistrictName();
      setExistedDistrictName(districtName);
      // Set initial value for the dropdown-selected box
      setNewDistrictName(districtName[0]);

      // Set all existed cities name
      const cityName = await getAllCityName();
      setExistedCityName(cityName);
      // Set initial value for the dropdown-selected box
      setNewCityName(cityName[0]);

      // Set initial value for the ReceiveDate input
      var date = new Date();
      var year = date.getFullYear();
      var month = String(date.getMonth() + 1).padStart(2, "0");
      var day = String(date.getDate()).padStart(2, "0");
      setNewReceiveDate(`${year}-${month}-${day}`);
    };
    fetchAllExistedData();
  }, []);

  // Functions here
  // // For uploading new image
  const handleUploadImage = (e) => {
    setNewImage(e.target.files[0]);
    setImageForShow(URL.createObjectURL(e.target.files[0]));
  };
  // // For adding new store
  const addData = async (
    tendaily,
    tenloaidaily,
    ngaytiepnhan,
    sodienthoai,
    tenquan,
    tenthanhpho,
    diachi,
    hinhanh,
  ) => {
    let check_tendaily = true;
    let check_tenloaidaily = true;
    let check_sodienthoai = true;
    let check_diachi = true;
    let check_hinhanh = true;

    // Constraints for checking format
    const isOnlyDigit = (input) => /^\d+$/.test(input);

    // Checking before calling add api
    // // Check tendaily
    if (tendaily.length < 1) {
      alert("Tên đại lý không được rỗng");
      check_tendaily = false;
    } else if (tendaily.length > 100) {
      alert("Tên đại lý quá dài");
      check_tendaily = false;
    }
    // // Check loaidaily
    if (tenloaidaily.length < 1) {
      alert("Tên loại đại lý không được rỗng");
      check_tenloaidaily = false;
    } else if (tenloaidaily.length > 100) {
      alert("Tên loại đại lý quá dài");
      check_tenloaidaily = false;
    }
    // // Check sodienthoai
    if (sodienthoai.length < 10) {
      alert("Số điện thoại tối thiểu p hải có 10 chữ số");
      check_sodienthoai = false;
    } else if (sodienthoai.length > 15) {
      alert("Số điện thoại quá dài");
      check_sodienthoai = false;
    } else {
      if (!isOnlyDigit(sodienthoai)) {
        alert("Số điện thoại chỉ được có ký tự chữ số");
        check_sodienthoai = false;
      }
    }
    // // Check diachi
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
    // // Check hinhanh
    if (hinhanh === undefined) {
      alert("Chưa chọn hình ảnh");
      check_hinhanh = false;
    }

    if (
      check_tendaily &&
      check_tenloaidaily &&
      check_sodienthoai &&
      check_diachi &&
      check_hinhanh
    ) {
      let item = {
        tendaily: tendaily,
        loaidaily: tenloaidaily,
        ngaytiepnhan: ngaytiepnhan,
        sodienthoai: sodienthoai,
        tenquan: tenquan,
        tenthanhpho: tenthanhpho,
        diachi: diachi,
        hinhanh: hinhanh,
      };
      const data = await addStore(item);
      console.log(data);
      if (data.message === "Thêm đại lý thất bại") {
        alert("Thêm đại lý thất bại");
      } else if (data.message === "Tên đại lý đã tồn tại") {
        alert("Tên đại lý đã tồn tại");
      } else if (data.message === "Số điện thoại đã tồn tại") {
        alert("Số điện thoại đã tồn tại");
      } else if (data.message === "Địa chỉ đã tồn tại") {
        alert("Địa chỉ đã tồn tại");
      } else if (data.message === "Địa chỉ không tồn tại") {
        alert("Địa chỉ không tồn tại");
      } else if (data.message === "Thêm đại lý thành công") {
        alert("Thêm đại lý thành công");
        navigate("/stores");
      }
    }
  };

  // Return render here
  return (
    <div>
      <div>
        <Header path="/stores"></Header>
      </div>
      <div className="m-5 bg-white p-5 shadow-lg transition-colors duration-300 dark:bg-[#363636]">
        <div className="my-5 flex flex-wrap items-center justify-between">
          <p className="w-1/2 text-2xl font-bold italic text-black transition-colors duration-300 dark:text-white">
            {AP_Stores.Title}
          </p>
          <button
            className="rounded-md bg-gradient-to-tr from-red-600 via-[#ea4444] to-[#ee7272] px-4 py-3 text-lg font-bold text-white transition-all duration-300 hover:scale-105 hover:bg-gradient-to-br hover:from-red-600 hover:via-[#ea4444] hover:to-[#ee7272]"
            onClick={() =>
              addData(
                newStoreName,
                newStoreCategoryName,
                newReceiveDate,
                newPhoneNumber,
                newDistrictName,
                newCityName,
                newAddress,
                newImage,
              )
            }
          >
            {Add}
          </button>
        </div>
        <div className="space-y-10">
          {/* Type store name */}
          <div className="space-y-4">
            <label
              className="text-lg font-bold text-black transition-colors duration-300 dark:text-white"
              htmlFor="store-name-add"
            >
              {SF_Stores.Columns.Col1}
            </label>
            <input
              className="w-full rounded-lg border border-black bg-white px-5 py-2 text-lg text-black transition-colors duration-300 dark:border-white dark:bg-[#363636] dark:text-white"
              id="store-name-add"
              name="store-name-add"
              type="text"
              placeholder={`${SF_Stores.Columns.Col1} ...`}
              value={newStoreName}
              onChange={(e) => setNewStoreName(e.target.value)}
              required
            />
          </div>
          {/* Select store category name */}
          <div className="space-y-4">
            <label
              className="block text-lg font-bold text-black transition-colors duration-300 dark:text-white"
              htmlFor="store-category-name-add"
            >
              {SF_Stores.Columns.Col2}
            </label>

            <select
              className="rounded-md border border-black bg-white px-3 py-3 text-lg font-semibold text-black transition-colors duration-300 dark:border-white dark:bg-[#363636] dark:text-white"
              id="store-category-name-add"
              name="store-category-name-add"
              value={newStoreCategoryName}
              onChange={(e) => setNewStoreCategoryName(e.target.value)}
            >
              {existedStoreCategoryName.map((item) => (
                <>
                  <option key={item} value={item}>
                    {item}
                  </option>
                </>
              ))}
            </select>
          </div>
          {/* Select receive date */}
          <div className="space-y-4">
            <label
              className="block text-lg font-bold text-black transition-colors duration-300 dark:text-white"
              htmlFor="receive-date-add"
            >
              {SF_Stores.Columns.Col3}
            </label>
            <input
              className="rounded-lg border border-black bg-white px-5 py-2 text-lg text-black transition-colors duration-300 dark:border-white dark:bg-[#363636] dark:text-white"
              id="receive-date-add"
              name="receive-date-add"
              type="date"
              value={newReceiveDate}
              onChange={(e) => setNewReceiveDate(e.target.value)}
              required
            />
          </div>
          {/* Type phone number */}
          <div className="space-y-4">
            <label
              className="text-lg font-bold text-black transition-colors duration-300 dark:text-white"
              htmlFor="phone-number-add"
            >
              {SF_Stores.Columns.Col4}
            </label>
            <input
              className="w-full rounded-lg border border-black bg-white px-5 py-2 text-lg text-black transition-colors duration-300 dark:border-white dark:bg-[#363636] dark:text-white"
              id="phone-number-add"
              name="phone-number-add"
              type="text"
              placeholder={`${SF_Stores.Columns.Col4} ...`}
              value={newPhoneNumber}
              onChange={(e) => setNewPhoneNumber(e.target.value)}
              required
            />
          </div>
          {/* Select district name */}
          <div className="space-y-4">
            <label
              className="block text-lg font-bold text-black transition-colors duration-300 dark:text-white"
              htmlFor="district-name-add"
            >
              {SF_Districts.Columns.Col1}
            </label>

            <select
              className="rounded-md border border-black bg-white px-3 py-3 text-lg font-semibold text-black transition-colors duration-300 dark:border-white dark:bg-[#363636] dark:text-white"
              id="district-name-add"
              name="district-name-add"
              value={newDistrictName}
              onChange={(e) => setNewDistrictName(e.target.value)}
            >
              {existedDistrictName.map((item) => (
                <>
                  <option key={item} value={item}>
                    {item}
                  </option>
                </>
              ))}
            </select>
          </div>
          {/* Select city name */}
          <div className="space-y-4">
            <label
              className="block text-lg font-bold text-black transition-colors duration-300 dark:text-white"
              htmlFor="city-name-add"
            >
              {SF_Districts.Columns.Col2}
            </label>

            <select
              className="rounded-md border border-black bg-white px-3 py-3 text-lg font-semibold text-black transition-colors duration-300 dark:border-white dark:bg-[#363636] dark:text-white"
              id="city-name-add"
              name="city-name-add"
              value={newCityName}
              onChange={(e) => setNewCityName(e.target.value)}
            >
              {existedCityName.map((item) => (
                <>
                  <option key={item} value={item}>
                    {item}
                  </option>
                </>
              ))}
            </select>
          </div>
          {/* Type address */}
          <div className="space-y-4">
            <label
              className="text-lg font-bold text-black transition-colors duration-300 dark:text-white"
              htmlFor="address-add"
            >
              {SF_Stores.Columns.Col5}
              {AP_Stores.Col5Note}
            </label>
            <input
              className="w-full rounded-lg border border-black bg-white px-5 py-2 text-lg text-black transition-colors duration-300 dark:border-white dark:bg-[#363636] dark:text-white"
              id="address-add"
              name="address-add"
              type="text"
              placeholder={AP_Stores.Col5Placeholder}
              value={newAddress}
              onChange={(e) => setNewAddress(e.target.value)}
              required
            />
          </div>
          {/* Upload image */}
          <div className="space-y-4">
            <label
              className="block text-lg font-bold text-black transition-colors duration-300 dark:text-white"
              htmlFor="store-image-upload"
            >
              {AP_Stores.UploadImage}
            </label>
            <input
              className="text-lg text-black transition-colors duration-300 dark:text-white"
              id="store-image-upload"
              name="store-image-upload"
              type="file"
              accept="image/"
              onChange={handleUploadImage}
              required
            />
            <img
              src={imageForShow}
              alt="Hình ảnh đại lý"
              className="text-black transition-colors duration-300 dark:text-white xl:h-20"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreAddPage;
