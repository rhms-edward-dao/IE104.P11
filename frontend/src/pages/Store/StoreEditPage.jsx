import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Import Context Here
import { useTheme } from "../../contexts/ThemeContext";

// Import Assets Here
import { getStoreById, updateStore } from "../../assets/Stores/StoreData";
import { getAllStoreCategoryName } from "../../assets/Stores/StoreCategoryData";
import {
  getAllCityName,
  getAllDistrictName,
} from "../../assets/Districts/DistrictData";

// Import Components Here
import Header from "../../components/Header";

// Import Icons Here
import GoBackIcon from "../../images/icons/button/GoBack.svg";
import GoBackDarkIcon from "../../images/icons/button/GoBack_Dark.svg";

const StoreEditPage = () => {
  // Variable here
  // // For Theme Mode
  const { theme } = useTheme();
  // // For Multi-Language
  const { t } = useTranslation();
  const { AP_Stores } = t("AddPage");
  const { EP_Stores } = t("EditPage");
  const { SF_Districts, SF_Stores } = t("SearchFilter");
  const { Update } = t("Buttons");
  // // For editing store
  const [currentStoreName, setCurrentStoreName] = useState("");

  const [currentStoreCategoryName, setCurrentStoreCategoryName] = useState("");
  const [existedStoreCategoryName, setExistedStoreCategoryName] = useState([]);

  const [currentReceiveDate, setCurrentReceiveDate] = useState("");
  const [currentPhoneNumber, setCurrentPhoneNumber] = useState("");

  const [currentDistrictName, setCurrentDistrictName] = useState("");
  const [existedDistrictName, setExistedDistrictName] = useState([]);

  const [currentCityName, setCurrentCityName] = useState("");
  const [existedCityName, setExistedCityName] = useState([]);

  const [currentAddress, setCurrentAddress] = useState("");

  const [currentImage, setCurrentImage] = useState();
  const [imageForShow, setImageForShow] = useState();
  // // For navigating
  const navigate = useNavigate();
  const { storeId } = useParams();

  // Use Effect here
  // // For getting data to edit
  useEffect(() => {
    const fetchData = async () => {
      // Get current store infomation by its id
      const currentStore = await getStoreById(storeId);      
      if (currentStore.message === "Không tồn tại đại lý cần tìm") {
        alert("Không tồn tại đại lý cần tìm");
      } else {
        setCurrentStoreName(currentStore[0].tendaily);
        setCurrentStoreCategoryName(currentStore[0].tenloaidaily);
        setCurrentReceiveDate(currentStore[0].ngaytiepnhan);
        setCurrentPhoneNumber(currentStore[0].sodienthoai);
        setCurrentDistrictName(currentStore[0].tenquan);
        setCurrentCityName(currentStore[0].tenthanhpho);
        setCurrentAddress(
          currentStore[0].diachi.split(",").slice(0, 2).join(", ")
        );
        if (currentStore[0].hinhanh !== null) {
          setCurrentImage(currentStore[0].hinhanh);
        }
      }

      // Get all existed store category name
      const storeCategoryData = await getAllStoreCategoryName();
      setExistedStoreCategoryName(storeCategoryData);
      // Get all existed district name
      const districtData = await getAllDistrictName();
      setExistedDistrictName(districtData);
      // Get all existed city name
      const cityData = await getAllCityName();
      setExistedCityName(cityData);
    };
    fetchData();
  }, []);
  // Function here
  // // For changing store image
  const handleUploadImage = (e) => {
    setCurrentImage(e.target.files[0]);
    setImageForShow(URL.createObjectURL(e.target.files[0]));
  };
  // // For editing current store
  const updateData = async (
    madaily,
    tendaily,
    tenloaidaily,
    ngaytiepnhan,
    sodienthoai,
    tenquan,
    tenthanhpho,
    diachi,
    hinhanh
  ) => {
    let check_tendaily = true;
    let check_tenloaidaily = true;
    let check_sodienthoai = true;
    let check_diachi = true;
    let check_hinhanh = true;
    console.log(hinhanh);
    // Constraints for checking format
    const isOnlyDigit = (input) => /^\d+$/.test(input);

    // Checking before calling add api
    // Check tendaily
    if (tendaily.length < 1) {
      alert("Tên đại lý không được rỗng");
      check_tendaily = false;
    } else if (tendaily.length > 100) {
      alert("Tên đại lý quá dài");
      check_tendaily = false;
    }
    // Check Loaidaily
    if (tenloaidaily.length < 1) {
      alert("Tên loại đại lý không được rỗng");
      check_tenloaidaily = false;
    } else if (tenloaidaily.length > 100) {
      alert("Tên loại đại lý quá dài");
      check_tenloaidaily = false;
    }
    // Check sodienthoai
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
    // Check diachi
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
    // Check hinhanh
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
      if (imageForShow === undefined) {
        item.hinhanh = null;
      }

      const data = await updateStore(madaily, item);
      if (data.message === "Tên đại lý đã tồn tại") {
        alert("Tên đại lý đã tồn tại");
      } else if (data.message === "Số điện thoại đã tồn tại") {
        alert("Số điện thoại đã tồn tại");
      } else if (data.message === "Địa chỉ đã tồn tại") {
        alert("Địa chỉ đã tồn tại");
      } else if (data.message === "Đại lý cập nhật thất bại") {
        alert("Đại lý cập nhật thất bại");
      } else if (data.message === "Địa chỉ không tồn tại") {
        alert("Địa chỉ không tồn tại");
      } else if (data.message === "Đại lý cập nhật thành công") {
        alert("Đại lý cập nhật thành công");
        navigate("/stores");
      }
    }
  };

  // Return render here
  return (
    <div>
      <div>
        <Header></Header>
      </div>
      <div className="m-5 bg-white p-5 shadow-lg transition-colors duration-300 dark:bg-[#363636]">
        <div className="flex items-center gap-40">
          <NavLink to={"/stores"}>
            <button>
              <img
                src={theme === "light" ? GoBackIcon : GoBackDarkIcon}
                alt="Icon trở lại"
                className="h-12 w-12"
              />
            </button>
          </NavLink>
        </div>
        <div className="my-5 flex flex-wrap items-center justify-between">
          <p className="w-1/2 text-2xl font-bold italic text-black transition-colors duration-300 dark:text-white">
            {EP_Stores.Title}
          </p>
          <button
            className="rounded-xl bg-red-500 px-2 py-3 text-lg font-bold text-white"
            onClick={() =>
              updateData(
                storeId,
                currentStoreName,
                currentStoreCategoryName,
                currentReceiveDate,
                currentPhoneNumber,
                currentDistrictName,
                currentCityName,
                currentAddress,
                currentImage
              )
            }
          >
            {Update}
          </button>
        </div>
        <div className="space-y-10">
          {/* Type store name */}
          <div className="space-y-4">
            <label
              className="text-lg font-bold text-black transition-colors duration-300 dark:text-white"
              htmlFor="store-name-edit"
            >
              {SF_Stores.Columns.Col1}
            </label>
            <input
              className="w-full rounded-lg border border-black bg-white px-5 py-2 text-lg text-black transition-colors duration-300 dark:border-white dark:bg-[#363636] dark:text-white"
              id="store-name-edit"
              name="store-name-edit"
              type="text"
              value={currentStoreName}
              onChange={(e) => setCurrentStoreName(e.target.value)}
              required
            />
          </div>
          {/* Select store category name */}
          <div className="space-y-4">
            <label
              className="block text-lg font-bold text-black transition-colors duration-300 dark:text-white"
              htmlFor="store-category-name-edit"
            >
              {SF_Stores.Columns.Col2}
            </label>

            <select
              className="rounded-md border border-black bg-white px-3 py-3 text-lg font-semibold text-black transition-colors duration-300 dark:border-white dark:bg-[#363636] dark:text-white"
              id="store-category-name-edit"
              name="store-category-name-edit"
              value={currentStoreCategoryName}
              onChange={(e) => setCurrentStoreCategoryName(e.target.value)}
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
              htmlFor="receive-date-edit"
            >
              {SF_Stores.Columns.Col3}
            </label>
            <input
              className="rounded-lg border border-black bg-white px-5 py-2 text-lg text-black transition-colors duration-300 dark:border-white dark:bg-[#363636] dark:text-white"
              id="receive-date-edit"
              name="receive-date-edit"
              type="date"
              value={currentReceiveDate}
              onChange={(e) => setCurrentReceiveDate(e.target.value)}
              required
            />
          </div>
          {/* Type phone number */}
          <div className="space-y-4">
            <label
              className="text-lg font-bold text-black transition-colors duration-300 dark:text-white"
              htmlFor="phone-number-edit"
            >
              {SF_Stores.Columns.Col4}
            </label>
            <input
              className="w-full rounded-lg border border-black bg-white px-5 py-2 text-lg text-black transition-colors duration-300 dark:border-white dark:bg-[#363636] dark:text-white"
              id="phone-number-edit"
              name="phone-number-edit"
              type="text"
              value={currentPhoneNumber}
              onChange={(e) => setCurrentPhoneNumber(e.target.value)}
              required
            />
          </div>
          {/* Select district name */}
          <div className="space-y-4">
            <label
              className="block text-lg font-bold text-black transition-colors duration-300 dark:text-white"
              htmlFor="district-name-edit"
            >
              {SF_Districts.Columns.Col1}
            </label>

            <select
              className="rounded-md border border-black bg-white px-3 py-3 text-lg font-semibold text-black transition-colors duration-300 dark:border-white dark:bg-[#363636] dark:text-white"
              id="district-name-edit"
              name="district-name-edit"
              value={currentDistrictName}
              onChange={(e) => setCurrentDistrictName(e.target.value)}
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
              htmlFor="city-name-edit"
            >
              {SF_Districts.Columns.Col2}
            </label>

            <select
              className="rounded-md border border-black bg-white px-3 py-3 text-lg font-semibold text-black transition-colors duration-300 dark:border-white dark:bg-[#363636] dark:text-white"
              id="city-name-edit"
              name="city-name-edit"
              value={currentCityName}
              onChange={(e) => setCurrentCityName(e.target.value)}
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
              htmlFor="address-edit"
            >
              {SF_Stores.Columns.Col5}
              {AP_Stores.Col5Note}
            </label>
            <input
              className="w-full rounded-lg border border-black bg-white px-5 py-2 text-lg text-black transition-colors duration-300 dark:border-white dark:bg-[#363636] dark:text-white"
              id="address-edit"
              name="address-edit"
              type="text"
              value={currentAddress}
              onChange={(e) => setCurrentAddress(e.target.value)}
              required
            />
          </div>
          {/* Update image */}
          <div className="space-y-4">
            <label
              className="block text-lg font-bold text-black transition-colors duration-300 dark:text-white"
              htmlFor="store-image-update"
            >
              {AP_Stores.UploadImage}
            </label>
            <input
              className="text-lg text-black transition-colors duration-300 dark:text-white"
              id="store-image-update"
              name="store-image-update"
              type="file"
              accept="image/"
              onChange={handleUploadImage}
              required
            />
            <img
              width={"250px"}
              src={
                imageForShow
                  ? imageForShow
                  : `data:image/jpeg;base64, ${currentImage}`
              }
              alt="Hình ảnh đại lý"
              className="rounded text-black transition-colors duration-300 dark:text-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreEditPage;
