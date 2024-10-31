import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
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

const CustomerEditPage = () => {
  // Variable here
  // // For Theme Mode
  const { theme } = useTheme();
  // // For Multi-Language
  const { t } = useTranslation();
  const { Update } = t("Buttons");
  // // For editing customer
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  // // For navigating
  const navigate = useNavigate();
  const { customerId } = useParams();

  // Use Effect here
  // // For getting data to edit
  useEffect(() => {
    const fetchData = async () => {
      // Get data for current customer
      const currentCustomer = await getCustomerById(customerId);
      setName(currentCustomer.tenkhachhang);
      setPhoneNumber(currentCustomer.sodienthoai);
    };
    fetchData();
  }, []);
  // Function here
  // // For editing current district
  const updateData = async (id, tenkhachhang, sodienthoai) => {
    if (tenkhachhang.length < 1) {
      alert("Tên khách hàng không thể rỗng");
    } else {
      const data = await updateCustomer(id, tenkhachhang, sodienthoai);
      console.log(data);
      if (data.message === "Cập nhật khách hàng thành công") {
        alert("Cập nhật khách hàng thành công");
        navigate("/customer");
      } else if (data.message === "Số điện thoại đã tồn tại") {
        alert("Số điện thoại đã tồn tại");
      } else {
        alert("Cập nhật khách hàng thất bại");
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
            Chỉnh sửa khách hàng
          </p>
          <button
            className="rounded-xl bg-red-500 px-2 py-3 text-lg font-bold text-white"
            onClick={() =>
              updateData(customerId, name, phoneNumber)
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
              Tên khách hàng
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
              Số điện thoại
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
        </div>
      </div>
    </div>
  );
};

export default CustomerEditPage;
