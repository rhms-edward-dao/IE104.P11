import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Import Context Here
import { useTheme } from "../../contexts/ThemeContext";
import { useAuth } from "../../contexts/AuthContext";

// Import Assets Here
import { getProductByStoreId } from "../../assets/Products/ProductData";
import { getAllCustomer } from "../../assets/Customers/CustomerData";
import { addExportBill } from "../../assets/Warehouses/WarehouseData";

// Import Components Here
import Header from "../../components/Header";

// Import Icons Here
import GoBackIcon from "../../images/icons/button/GoBack.svg";
import GoBackDarkIcon from "../../images/icons/button/GoBack_Dark.svg";

const ExportAddPage = () => {
  // Variable here
  const { userInfo } = useAuth();
  // // For Theme Mode
  const { theme } = useTheme();
  // // For Multi-Language
  const { t } = useTranslation();
  const { AP_Export } = t("AddPage");
  const { Export, Confirm } = t("Buttons");
  // // For Adding New Export Bill
  const [productData, setProductData] = useState([]);
  const [CustomerData, setCustomerData] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [soLuongXuat, setSoLuongXuat] = useState({});
  const [numDropdowns, setNumDropdowns] = useState(0);
  const [dropdownValues, setDropdownValues] = useState({});
  // // For navigating
  const navigate = useNavigate();

  // Use Effect here
  // // For getting all existing products
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get Exsisted Products By Store's ID
        const existedProduct = await getProductByStoreId(userInfo.storeID);
        if (existedProduct.message === "Danh sách mặt hàng rỗng") {
          setProductData([]);
        } else {
          setProductData(existedProduct);
        }
        // Get All Existed Customer
        const existedCustomer = await getAllCustomer();
        if (existedCustomer.message === "Danh sách khách hàng rỗng") {
          setCustomerData([]);
        } else {
          setCustomerData(existedCustomer);
        }
      } catch (error) {
        console.error("Error while fetching: ", error);
      }
    };
    fetchData();
  }, []);

  // Functions here
  // // For setting the number of products to add to export bill
  const handleGenerateDropdowns = (e) => {
    e.preventDefault();
    const inputNumber = parseInt(e.target.elements.numberInput.value, 10);
    if (
      isNaN(inputNumber) ||
      inputNumber < 1 ||
      inputNumber > productData.length
    ) {
      alert(`Vui lòng nhập con số từ 1 đến ${productData.length}.`);
      return;
    }
    setNumDropdowns(inputNumber);
    setDropdownValues({});
    setSoLuongXuat({});
  };
  // // For handling the selected customer
  const handleCustomerChange = (e) => {
    const selectedId = e.target.value; // Get the selected customer ID
    setSelectedCustomer(selectedId);
  };
  // // For handling the selected product
  const handleSelectChange = (index, value) => {
    setDropdownValues((prev) => ({
      ...prev,
      [index]: parseInt(value, 10),
    }));
  };
  // // For handling the ammount of product to export
  const handleSoLuongXuatChange = (index, value) => {
    const selectedProduct = productData.find(
      (product) => product.Mathang.mamathang === dropdownValues[index],
    );

    const maxQuantity = selectedProduct?.Mathang.soluongton || 0;

    if (parseInt(value, 10) > maxQuantity) {
      alert(`Số lượng xuất (${value}) vượt quá số lượng tồn (${maxQuantity}).`);
      return; // Prevent state update if the value is invalid
    }

    setSoLuongXuat((prev) => ({
      ...prev,
      [index]: parseInt(value, 10),
    }));
  };
  // // For showing product name in option list
  const getAvailableOptions = (currentIndex) => {
    const selectedValues = Object.values(dropdownValues);
    return productData.filter(
      (product) =>
        !selectedValues.includes(product.Mathang.mamathang) ||
        dropdownValues[currentIndex] === product.Mathang.mamathang,
    );
  };

  // // For adding new export bill
  const addData = async () => {
    // Prepare a list to hold the data for each selected product
    const itemsToExport = [];

    // Iterate over dropdownValues to collect necessary data
    Object.keys(dropdownValues).forEach((index) => {
      const mamathang = dropdownValues[index]; // Selected product ID
      const soluongxuat = soLuongXuat[index]; // Inputted quantity

      const product = productData.find(
        (product) => product.Mathang.mamathang === mamathang,
      );

      if (product) {
        const dongia = product.Mathang.dongia;
        // Add the product details to the list
        itemsToExport.push({
          mamathang,
          dongia,
          soluongxuat,
        });
      }
    });

    // Constraints check for `soluongxuat`
    const isValidInput = itemsToExport.every((item) => {
      if (item.soluongxuat < 0) {
        alert(`Số lượng xuất cho mặt hàng ${item.mamathang} không được âm.`);
        return false;
      }
      if (!/^\d+$/.test(item.soluongxuat)) {
        alert(
          `Số lượng xuất cho mặt hàng ${item.mamathang} chỉ được có ký tự chữ số.`,
        );
        return false;
      }
      return true;
    });

    if (!isValidInput) {
      return; // Exit if any input is invalid
    }

    // Call the API to add import bill
    try {
      const data = await addExportBill(
        userInfo.storeID,
        selectedCustomer,
        itemsToExport,
      );

      // Handle response
      if (data.message === "Thêm phiếu xuất hàng thành công.") {
        alert("Thêm phiếu xuất hàng thành công");
        navigate("/warehouse"); // Navigate to warehouse page on success
      } else {
        console.log(data.message);
        alert("Thêm phiếu xuất hàng thất bại");
      }
    } catch (error) {
      console.error("Error while adding import bill:", error);
      alert("Đã xảy ra lỗi khi thêm phiếu xuất hàng.");
    }
  };

  return (
    <div>
      <div>
        <Header path="/warehouse"></Header>
      </div>
      <div className="m-5 bg-white p-5 shadow-lg transition-colors duration-300 dark:bg-[#363636]">
        <div className="my-5 flex flex-wrap items-center justify-between">
          <p className="w-1/2 text-2xl font-bold italic text-black transition-colors duration-300 dark:text-white">
            {AP_Export.Title}
          </p>
          <button
            className="rounded-md bg-gradient-to-tr from-red-600 via-[#ea4444] to-[#ee7272] px-4 py-3 text-lg font-bold text-white transition-all duration-300 hover:scale-105 hover:bg-gradient-to-br hover:from-red-600 hover:via-[#ea4444] hover:to-[#ee7272]"
            onClick={addData}
          >
            {Export}
          </button>
        </div>
        <div className="space-y-10">
          <form onSubmit={handleGenerateDropdowns} className="grid gap-8">
            <div className="flex items-center space-x-4">
              <label
                className="text-lg font-bold text-black transition-colors duration-300 dark:text-white"
                htmlFor="customer-select"
              >
                {AP_Export.Labels.Lb1}:
              </label>
              <select
                className="flex-grow rounded-md border border-black bg-white px-3 py-3 text-lg font-semibold text-black transition-colors duration-300 dark:border-white dark:bg-[#363636] dark:text-white"
                id="customer-select"
                name="customer-select"
                value={selectedCustomer}
                onChange={handleCustomerChange}
              >
                <option value="" disabled>
                  {AP_Export.Placeholders.Text1}
                </option>
                {CustomerData.map((item) => (
                  <option
                    key={item.Khachhang.makhachhang}
                    value={item.Khachhang.makhachhang}
                  >
                    {item.Khachhang.tenkhachhang}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-wrap items-center space-x-4">
              <label
                className="text-lg font-bold text-black transition-colors duration-300 dark:text-white"
                htmlFor="numberInput"
              >
                {AP_Export.Labels.Lb2}:
              </label>
              <input
                className="w-1/5 rounded-lg border border-black bg-white px-5 py-2 text-lg text-black transition-colors duration-300 dark:border-white dark:bg-[#363636] dark:text-white"
                id="numberInput"
                name="numberInput"
                type="number"
                placeholder={`${AP_Export.Placeholders.Text2} 1-${productData.length}`}
                min="1"
                max={productData.length}
              />
              <button
                type="submit"
                className="rounded bg-indigo-600 px-4 py-2 text-lg font-bold text-white transition-all duration-300 hover:scale-105 hover:bg-indigo-700 focus:ring focus:ring-indigo-300"
              >
                {Confirm}
              </button>
            </div>
          </form>
          <div className="space-y-10">
            {Array.from({ length: numDropdowns }).map((_, index) => {
              const selectedProduct = productData.find(
                (product) =>
                  product.Mathang.mamathang === dropdownValues[index],
              );
              return (
                <div key={index} className="space-y-5 border-b pb-4">
                  <div className="flex flex-wrap items-center space-x-8">
                    <label
                      className="text-lg font-bold text-black transition-colors duration-300 dark:text-white"
                      htmlFor={`dropdown-${index}`}
                    >
                      {AP_Export.Labels.Lb3} {index + 1}:
                    </label>
                    <select
                      className="flex-grow rounded-md border border-black bg-white px-3 py-3 text-lg font-semibold text-black transition-colors duration-300 dark:border-white dark:bg-[#363636] dark:text-white"
                      id={`dropdown-${index}`}
                      value={dropdownValues[index] || ""}
                      onChange={(e) =>
                        handleSelectChange(index, e.target.value)
                      }
                    >
                      <option value="" disabled>
                        {AP_Export.Placeholders.Text3}
                      </option>
                      {getAvailableOptions(index).map((product) => (
                        <option
                          key={product.Mathang.mamathang}
                          value={product.Mathang.mamathang}
                        >
                          {product.Mathang.tenmathang}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-center space-x-5">
                    <div className="flex items-center space-x-5">
                      <label
                        className="text-lg font-bold text-black transition-colors duration-300 dark:text-white"
                        htmlFor={`soluongton-${index}`}
                      >
                        {AP_Export.Labels.Lb4}:
                      </label>
                      <input
                        className="w-fit rounded-md border border-black bg-white px-5 py-2 text-lg text-black transition-colors duration-300 dark:border-white dark:bg-[#363636] dark:text-white"
                        id={`soluongton-${index}`}
                        type="number"
                        value={selectedProduct?.Mathang.soluongton}
                        readOnly
                      />
                    </div>
                    <div className="flex items-center space-x-5">
                      <label
                        className="text-lg font-bold text-black transition-colors duration-300 dark:text-white"
                        htmlFor={`dongiaban-${index}`}
                      >
                        {AP_Export.Labels.Lb5}:
                      </label>
                      <input
                        className="w-fit rounded-md border border-black bg-white px-5 py-2 text-lg text-black transition-colors duration-300 dark:border-white dark:bg-[#363636] dark:text-white"
                        id={`dongiaban-${index}`}
                        type="number"
                        value={selectedProduct?.Mathang.dongia}
                        readOnly
                      />
                    </div>
                    <div className="flex items-center space-x-5">
                      <label
                        className="text-lg font-bold text-black transition-colors duration-300 dark:text-white"
                        htmlFor={`soluongxuat-${index}`}
                      >
                        {AP_Export.Labels.Lb6}:
                      </label>
                      <input
                        className="w-fit rounded-md border border-black bg-white px-5 py-2 text-lg text-black transition-colors duration-300 dark:border-white dark:bg-[#363636] dark:text-white"
                        id={`soluongxuat-${index}`}
                        type="number"
                        value={soLuongXuat[index] || ""}
                        onChange={(e) =>
                          handleSoLuongXuatChange(index, e.target.value)
                        }
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportAddPage;
