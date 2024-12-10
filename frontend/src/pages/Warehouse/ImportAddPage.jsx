import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Import Context Here
import { useTheme } from "../../contexts/ThemeContext";
import { useAuth } from "../../contexts/AuthContext";

// Import Assets Here
import { getProductByStoreId } from "../../assets/Products/ProductData";
import { addImportBill } from "../../assets/Warehouses/WarehouseData";

// Import Components Here
import Header from "../../components/Header";

// Import Icons Here
import GoBackIcon from "../../images/icons/button/GoBack.svg";
import GoBackDarkIcon from "../../images/icons/button/GoBack_Dark.svg";

const ImportAddPage = () => {
  // Variable here
  // // For Theme Mode
  const { theme } = useTheme();
  // // For Multi-Language
  const { t } = useTranslation();
  const { AP_Import } = t("AddPage");
  const { Import, Confirm } = t("Buttons");
  // // For Checking If Staff Account Or Not
  const { userInfo } = useAuth();
  // // For Adding New Import Bill
  const [productData, setProductData] = useState([]);
  const [soLuongNhap, setSoLuongNhap] = useState({});
  const [donGiaNhap, setDonGiaNhap] = useState({});
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
        if (existedProduct.length === 0) {
          setProductData([]);
        } else {
          setProductData(existedProduct);
        }
      } catch (error) {
        console.error("Error while fetching: ", error);
      }
    };
    fetchData();
  }, []);

  // Functions here
  // // For setting the number of products to add to import bill
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
    setSoLuongNhap({});
    setDonGiaNhap({});
  };
  // // For handling the selected product
  const handleSelectChange = (index, value) => {
    setDropdownValues((prev) => ({
      ...prev,
      [index]: parseInt(value, 10),
    }));
  };
  // // For handling the ammount of product to import
  const handleSoLuongNhapChange = (index, value) => {
    setSoLuongNhap((prev) => ({
      ...prev,
      [index]: parseInt(value, 10),
    }));
  };
  // // For handling the price of product to import
  const handleDonGiaNhapChange = (index, value) => {
    setDonGiaNhap((prev) => ({
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

  // // For adding new import bill
  const addData = async () => {
    // Prepare a list to hold the data for each selected product
    const itemsToImport = [];

    // Iterate over dropdownValues to collect necessary data
    Object.keys(dropdownValues).forEach((index) => {
      const mamathang = dropdownValues[index]; // Selected product ID
      const soluongnhap = soLuongNhap[index]; // Inputted quantity
      const dongianhap = donGiaNhap[index]; // Inputted price

      // Add the product details to the list
      itemsToImport.push({
        mamathang,
        soluongnhap,
        dongianhap,
      });
    });

    // Constraints check for `soluongnhap` and `dongianhap`
    const isValidInput = itemsToImport.every((item) => {
      if (item.soluongnhap < 0) {
        alert(`Số lượng nhập cho mặt hàng ${item.mamathang} không được âm.`);
        return false;
      }
      if (!/^\d+$/.test(item.soluongnhap)) {
        alert(
          `Số lượng nhập cho mặt hàng ${item.mamathang} chỉ được có ký tự chữ số.`,
        );
        return false;
      }
      if (item.dongianhap < 0) {
        alert(`Đơn giá nhập cho mặt hàng ${item.mamathang} không được âm.`);
        return false;
      }
      if (!/^\d+$/.test(item.dongianhap)) {
        alert(
          `Đơn giá nhập cho mặt hàng ${item.mamathang} chỉ được có ký tự chữ số.`,
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
      const data = await addImportBill(userInfo.storeID, itemsToImport);

      // Handle response
      if (data.message === "Thêm phiếu nhập hàng thành công.") {
        alert("Thêm phiếu nhập hàng thành công");
        navigate("/warehouse"); // Navigate to warehouse page on success
      } else {
        console.log(data.message);
        alert("Thêm phiếu nhập hàng thất bại");
      }
    } catch (error) {
      console.error("Error while adding import bill:", error);
      alert("Đã xảy ra lỗi khi thêm phiếu nhập hàng.");
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
            {AP_Import.Title}
          </p>
          <button
            className="rounded-xl bg-red-500 px-2 py-3 text-lg font-bold text-white"
            onClick={addData}
          >
            {Import}
          </button>
        </div>
        <div className="space-y-10">
          <form
            onSubmit={handleGenerateDropdowns}
            className="flex items-center space-x-6"
          >
            <label
              className="text-lg font-bold text-black transition-colors duration-300 dark:text-white"
              htmlFor="numberInput"
            >
              {AP_Import.Labels.Lb1}
            </label>
            <input
              className="flex-grow rounded-lg border border-black bg-white px-5 py-2 text-lg text-black transition-colors duration-300 dark:border-white dark:bg-[#363636] dark:text-white"
              id="numberInput"
              name="numberInput"
              type="number"
              placeholder={`${AP_Import.Placeholders.Text1} 1-${productData.length}`}
              min="1"
              max={productData.length}
            />
            <button
              type="submit"
              className="rounded bg-indigo-600 px-4 py-2 text-lg font-bold text-white hover:bg-indigo-700 focus:ring focus:ring-indigo-300"
            >
              {Confirm}
            </button>
          </form>
          <div className="space-y-10">
            {Array.from({ length: numDropdowns }).map((_, index) => {
              const selectedProduct = productData.find(
                (product) =>
                  product.Mathang.mamathang === dropdownValues[index],
              );
              return (
                <div key={index} className="space-y-5 border-b pb-4">
                  <div className="flex items-center space-x-8">
                    <label
                      className="text-lg font-bold text-black transition-colors duration-300 dark:text-white"
                      htmlFor={`dropdown-${index}`}
                    >
                      {AP_Import.Labels.Lb2} {index + 1}:
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
                        {AP_Import.Placeholders.Text2}
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
                        {AP_Import.Labels.Lb3}:
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
                        htmlFor={`soluongnhap-${index}`}
                      >
                        {AP_Import.Labels.Lb4}:
                      </label>
                      <input
                        className="w-fit rounded-md border border-black bg-white px-5 py-2 text-lg text-black transition-colors duration-300 dark:border-white dark:bg-[#363636] dark:text-white"
                        id={`soluongnhap-${index}`}
                        type="number"
                        value={soLuongNhap[index] || ""}
                        onChange={(e) =>
                          handleSoLuongNhapChange(index, e.target.value)
                        }
                      />
                    </div>
                    <div className="flex items-center space-x-5">
                      <label
                        className="text-lg font-bold text-black transition-colors duration-300 dark:text-white"
                        htmlFor={`dongianhap-${index}`}
                      >
                        Đơn giá nhập:
                      </label>
                      <input
                        className="w-fit rounded-md border border-black bg-white px-5 py-2 text-lg text-black transition-colors duration-300 dark:border-white dark:bg-[#363636] dark:text-white"
                        id={`dongianhap-${index}`}
                        type="number"
                        value={
                          donGiaNhap[index] ||
                          (donGiaNhap[index] = selectedProduct?.Mathang.dongia)
                        }
                        onChange={(e) =>
                          handleDonGiaNhapChange(index, e.target.value)
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

export default ImportAddPage;
