import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Import Context Here
import { useTheme } from "../../contexts/ThemeContext";

// Import Assets Here
import { addCustomer } from "../../assets/Customers/CustomerData";

// Import Components Here
import Header from "../../components/Header";

// Import Icons Here
import GoBackIcon from "../../images/icons/button/GoBack.svg";
import GoBackDarkIcon from "../../images/icons/button/GoBack_Dark.svg";
import { getAllDistrict } from "../../assets/StoreDistrict";

const CustomerAddPage = () => {
  // Variable here
  // // For Theme Mode
  const { theme } = useTheme();
  // // For Multi-Language
  const { t } = useTranslation();
  const { Add } = t("Buttons");
  // // For checking existed customers
  const location = useLocation();
  const { existedData } = location.state;
  // // For adding customer
  const [newCustomerName, setNewCustomerName] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [newDistrictName, setNewDistrictName] = useState("");
  const [newDistrictId, setNewDistrictId] = useState(0);
  const [existedDistrictName, setExistedDistrictName] = useState([]);
  // // For navigating
  const navigate = useNavigate();

  // Use Effect here
  // // For getting data to edit
  useEffect(() => {
    const fetchData = async () => {
      // Get all existed districts
      const existedDistrict = await getAllDistrict();
      if (existedDistrict.message === "Danh sách quận rỗng") {
        setExistedDistrictName([]);
      } else {
        setExistedDistrictName(existedDistrict);
        setNewDistrictId(existedDistrict[0].maquan);
      }
    };
    fetchData();
  }, []);
  // Function here
  // // For editing current district
  const addData = async (tenkhachhang, sodienthoai, quan, diachi) => {
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

    if (check_tenkhachhang && check_sodienthoai && check_diachi) {
      let item = [
        {
          tenkhachhang: tenkhachhang,
          sodienthoai: sodienthoai,
          maquan: quan,
          diachi: diachi,
        },
      ];
      const data = await addCustomer(item);
      console.log(data);
      if (data.message === "Thêm khách hàng thất bại") {
        alert(data.message);
      } else if (data.message === "Thêm khách hàng thành công.") {
        alert(data.message);
        navigate("/customer");
      } else {
        alert(data.message);
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
            Thêm khách hàng
          </p>
          <button
            className="rounded-xl bg-red-500 px-2 py-3 text-lg font-bold text-white"
            onClick={() =>
              existedData.some(
                (item) => item.Khachhang.sodienthoai === newPhoneNumber.trim()
              )
                ? alert("Thêm khách hàng thất bại !!! Số điện thoại đã tồn tại")
                : addData(
                    newCustomerName.trim(),
                    newPhoneNumber.trim(),
                    newDistrictId,
                    newAddress.trim()
                  )
            }
          >
            {Add}
          </button>
        </div>
        <div className="space-y-10">
          {/* Type customer name */}
          <div className="space-y-4">
            <label
              className="text-lg font-bold text-black transition-colors duration-300 dark:text-white"
              htmlFor="product-name-add"
            >
              Tên khách hàng
            </label>
            <input
              className="w-full rounded-lg border border-black bg-white px-5 py-2 text-lg text-black transition-colors duration-300 dark:border-white dark:bg-[#363636] dark:text-white"
              id="customer-name-add"
              name="customer-name-add"
              type="text"
              placeholder={`Tên khách hàng ...`}
              values={newCustomerName}
              onChange={(e) => setNewCustomerName(e.target.value)}
              required
            />
          </div>
          {/* Type customer phone number */}
          <div className="space-y-4">
            <label
              className="text-lg font-bold text-black transition-colors duration-300 dark:text-white"
              htmlFor="phone-number-add"
            >
              Số điện thoại
            </label>
            <input
              className="w-full rounded-lg border border-black bg-white px-5 py-2 text-lg text-black transition-colors duration-300 dark:border-white dark:bg-[#363636] dark:text-white"
              id="phone-number-add"
              name="phone-number-add"
              type="text"
              placeholder={`Số điện thoại ...`}
              values={newPhoneNumber}
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
              Quận
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
                <>
                  <option key={item.maquan} value={item.maquan}>
                    {item.tenquan}
                  </option>
                </>
              ))}
            </select>
          </div>
          {/* Type customer address */}
          <div className="space-y-4">
            <label
              className="text-lg font-bold text-black transition-colors duration-300 dark:text-white"
              htmlFor="address-add"
            >
              Địa chỉ
            </label>
            <input
              className="w-full rounded-lg border border-black bg-white px-5 py-2 text-lg text-black transition-colors duration-300 dark:border-white dark:bg-[#363636] dark:text-white"
              id="address-add"
              name="address-add"
              type="text"
              placeholder={`Địa chỉ ...`}
              values={newAddress}
              onChange={(e) => setNewAddress(e.target.value)}
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerAddPage;
