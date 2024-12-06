import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Import Context Here
import { useTheme } from "../../contexts/ThemeContext";

// Import Assets Here
import {
  getExportBillByBillId,
  updateExportBill,
} from "../../assets/Warehouses/WarehouseData";
import { getAllCustomer } from "../../assets/Customers/CustomerData";

// Import Components Here
import Header from "../../components/Header";

// Import Icons Here
import GoBackIcon from "../../images/icons/button/GoBack.svg";
import GoBackDarkIcon from "../../images/icons/button/GoBack_Dark.svg";

const ExportEditPage = () => {
  // Variable here
  // // For Theme Mode
  const { theme } = useTheme();
  // // For Multi-Language
  const { t } = useTranslation();
  const { Update } = t("Buttons");
  // // For Editing Import Bill
  const [currentCustomerName, setCurrentCustomerName] = useState("");
  const [currentCustomerId, setCurrentCustomerId] = useState(0);
  const [existedCustomerName, setExistedCustomerName] = useState([]);
  // // For navigating
  const navigate = useNavigate();
  const { exportId } = useParams();

  // Use Effect here
  // // For getting data to edit
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get current export bill's infomation by its id
        const currentExport = await getExportBillByBillId(exportId);
        console.log(currentExport);
        setCurrentCustomerId(currentExport[0].makhachhang);

        // Get all existed customer
        const currentCustomer = await getAllCustomer();
        if (currentCustomer.message === "Danh sách khách hàng rỗng") {
          setExistedCustomerName([]);
        } else {
          setExistedCustomerName(currentCustomer);
        }

        if (currentExport.message === "Phiếu xuất hàng không tồn tại") {
          alert(currentExport.message);
        }
      } catch (error) {
        console.error("Error while fetching: ", error);
      }
    };
    fetchData();
  }, []);

  // Functions here
  // // For editing current import bill
  const updateData = async (makhachhang) => {
    const data = await updateExportBill(exportId, makhachhang);
    if (data.message === "Cập nhật phiếu xuất hàng thất bại") {
      alert(data.message);
    } else if (data.message === "Cập nhật phiếu xuất hàng thành công.") {
      alert(data.message);
      navigate("/warehouse");
    } else {
      alert(data.message);
    }
  };

  return (
    <div>
      <div>
        <Header></Header>
      </div>
      <div className="m-5 bg-white p-5 shadow-lg transition-colors duration-300 dark:bg-[#363636]">
        <div className="flex items-center gap-40">
          <NavLink to={"/warehouse"}>
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
            Cập nhật phiếu xuất hàng
          </p>
          <button
            className="rounded-xl bg-red-500 px-2 py-3 text-lg font-bold text-white"
            onClick={() => updateData(currentCustomerId)}
          >
            {Update}
          </button>
        </div>
        <div className="space-y-10">
          {/* Select customer's name */}
          <div className="space-y-4">
            <label
              className="block text-lg font-bold text-black transition-colors duration-300 dark:text-white"
              htmlFor="customer-name-edit"
            >
              Tên khách hàng:
            </label>
            <select
              className="rounded-md border border-black bg-white px-3 py-3 text-lg font-semibold text-black transition-colors duration-300 dark:border-white dark:bg-[#363636] dark:text-white"
              id="customer-name-edit"
              name="customer-name-edit"
              value={currentCustomerId} // Bind to customer ID instead
              onChange={(e) => {
                const selectedCustomerId = e.target.value;
                const selectedCustomerName =
                  e.target.options[e.target.selectedIndex].text; // Get the text (customer name)
                setCurrentCustomerId(selectedCustomerId); // Update ID
                setCurrentCustomerName(selectedCustomerName); // Update Name
              }}
            >
              {existedCustomerName.map((item) => (
                <option
                  key={item.Khachhang.makhachhang}
                  value={item.Khachhang.makhachhang} // Store ID in value
                >
                  {item.Khachhang.tenkhachhang}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportEditPage;
