import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Import Context Here
import { useTheme } from "../../contexts/ThemeContext";

// Import Assets Here
import {
  getCustomerById,
  updateCustomer,
} from "../../assets/Customers/CustomerData";

// Import Components Here
import Header from "../../components/Header";

// Import Icons Here
import GoBackIcon from "../../images/icons/button/GoBack.svg";
import GoBackDarkIcon from "../../images/icons/button/GoBack_Dark.svg";
import { getAllCityName, getAllDistrict } from "../../assets/StoreDistrict";

const CustomerEditPage = () => {
  // Variable here
  // // For Theme Mode
  const { theme } = useTheme();
  // // For Multi-Language
  const { t } = useTranslation();
  const { Update } = t("Buttons");
  const { SF_Customers } = t("SearchFilter");
  const { EP_Customer } = t("EditPage");
  // // For editing customer
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [newDistrictId, setNewDistrictId] = useState(0);
  const [newDistrictName, setNewDistrictName] = useState("");
  const [existedDistrictName, setExistedDistrictName] = useState([]);
  // City
  const [newCityName, setNewCityName] = useState("");
  const [existedCityName, setExistedCityName] = useState([]);
  // // For navigating
  const navigate = useNavigate();
  const { customerId } = useParams();
  // Use Effect here
  // // For getting data to edit
  useEffect(() => {
    const fetchData = async () => {
      // Get data for current customer
      const currentCustomer = await getCustomerById(customerId);
      setName(currentCustomer[0].Khachhang.tenkhachhang);
      setPhoneNumber(currentCustomer[0].Khachhang.sodienthoai);
      setAddress(
        currentCustomer[0].Diachi.diachi.split(", ").slice(0, 2).join(", "),
      );
      setNewDistrictName(
        currentCustomer[0].Diachi.diachi
          .split(", ")
          .slice(2, 3)
          .join(", ")
          .trim(),
      );
      setNewDistrictId(currentCustomer[0].Diachi.maquan);
      // Get all existed districts
      const existedDistrict = await getAllDistrict();
      if (existedDistrict.message === "Danh sách quận rỗng") {
        setExistedDistrictName([]);
      } else {
        setExistedDistrictName(existedDistrict);
      }
      // Get all existed cities
      const existedCity = await getAllCityName();
      if (existedCity.message === "Danh sách quận rỗng") {
        setExistedCityName([]);
      } else {
        setExistedCityName(existedCity);
        setNewCityName(existedCity[0]);
      }
    };
    fetchData();
  }, []);
  // Function here
  // // For editing current district
  const updateData = async (
    id,
    tenkhachhang,
    sodienthoai,
    quan,
    tenquan,
    thanhpho,
    diachi,
  ) => {
    let check_tenkhachhang = true;
    let check_sodienthoai = true;
    let check_diachi = true;
    // Constraints for checking format
    const isOnlyDigit = (input) => /^\d+$/.test(input);

    // Checking before calling add api
    // // Check tenkhachhang
    if (tenkhachhang.length < 1) {
      alert("Tên khách hàng không được rỗng");
      check_tenkhachhang = false;
    } else if (tenkhachhang.length > 100) {
      alert("Tên khách hàng quá dài (tối đa 100 ký tự");
      check_tenkhachhang = false;
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
    diachi = diachi + ", " + tenquan + ", " + thanhpho;
    if (check_tenkhachhang && check_sodienthoai && check_diachi) {
      let item = {
        tenkhachhang: tenkhachhang,
        sodienthoai: sodienthoai,
        maquan: quan.toString(),
        diachi: diachi,
      };
      const data = await updateCustomer(id, item);

      if (data.success === true) {
        alert("Cập nhật khách hàng thành công");
        navigate("/customer");
      } else {
        if (data.message === "Số điện thoại đã được sử dụng") {
          alert("Số điện thoại đã được sử dụng");
        } else {
          alert("Cập nhật khách hàng thất bại");
        }
      }
    }
  };
  // Return render here
  return (
    <div className="h-screen">
      <div>
        <Header></Header>
      </div>
      <div className="m-5 bg-white p-5 shadow-lg transition-colors duration-300 dark:bg-[#363636]">
        <div className="flex items-center gap-40">
          <NavLink to={"/customer"}>
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
            {EP_Customer.Title}
          </p>
          <button
            className="rounded-xl bg-red-500 px-2 py-3 text-lg font-bold text-white"
            onClick={() =>
              updateData(
                customerId,
                name.trim(),
                phoneNumber.trim(),
                newDistrictId,
                newDistrictName,
                newCityName,
                address,
              )
            }
          >
            {Update}
          </button>
        </div>
        <div className="space-y-10">
          <div className="space-y-4">
            <label
              className="text-lg font-bold text-black transition-colors duration-300 dark:text-white"
              htmlFor="customer-name-edit"
            >
              {SF_Customers.Columns.Col1}
            </label>
            <input
              className="w-full rounded-lg border border-black bg-white px-5 py-2 text-lg text-black transition-colors duration-300 dark:border-white dark:bg-[#363636] dark:text-white"
              id="customer-name-edit"
              name="customer-name-edit"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-4">
            <label
              className="text-lg font-bold text-black transition-colors duration-300 dark:text-white"
              htmlFor="customer-phone-edit"
            >
              {SF_Customers.Columns.Col2}
            </label>
            <input
              className="w-full rounded-lg border border-black bg-white px-5 py-2 text-lg text-black transition-colors duration-300 dark:border-white dark:bg-[#363636] dark:text-white"
              id="customer-phone-edit"
              name="customer-phone-edit"
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>
          {/* Select district name */}
          <div className="flex space-x-20">
            <div>
              <label
                className="block text-lg font-bold text-black transition-colors duration-300 dark:text-white"
                htmlFor="district-name-add"
              >
                {SF_Customers.Columns.Col4}
              </label>
              <select
                className="rounded-md border border-black bg-white px-3 py-3 text-lg font-semibold text-black transition-colors duration-300 dark:border-white dark:bg-[#363636] dark:text-white"
                id="district-name-add"
                name="district-name-add"
                value={newDistrictId}
                onChange={(e) => {
                  const selectedDistrictId = e.target.value;
                  const selectedDistrictName =
                    e.target.options[e.target.selectedIndex].text; // Get the text (district name)
                  setNewDistrictId(selectedDistrictId); // Update ID
                  setNewDistrictName(selectedDistrictName); // Update Name
                }}
              >
                {existedDistrictName.map((item) => (
                  <option key={item.maquan} value={item.maquan}>
                    {item.tenquan}
                  </option>
                ))}
              </select>
            </div>
            {/* Select city name */}
            <div>
              <label
                className="block text-lg font-bold text-black transition-colors duration-300 dark:text-white"
                htmlFor="city-name-add"
              >
                {SF_Customers.Columns.Col5}
              </label>
              {/* It must be a combobox -> selecting which city you need - fetch all city name from server for showing options */}
              <select
                id="city-name-add"
                name="city-name-add"
                className="rounded-md border border-black bg-white px-3 py-3 text-lg font-semibold text-black transition-colors duration-300 dark:border-white dark:bg-[#363636] dark:text-white"
                value={newCityName}
                onChange={(e) => setNewCityName(e.target.value)}
              >
                {existedCityName.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="space-y-4">
            <label
              className="text-lg font-bold text-black transition-colors duration-300 dark:text-white"
              htmlFor="address-edit"
            >
              {SF_Customers.Columns.Col3}
            </label>
            <input
              className="w-full rounded-lg border border-black bg-white px-5 py-2 text-lg text-black transition-colors duration-300 dark:border-white dark:bg-[#363636] dark:text-white"
              id="address-edit"
              name="address-edit"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerEditPage;
