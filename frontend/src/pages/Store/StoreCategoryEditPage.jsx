// Import Hook
import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
// Import Context Here
import { useTheme } from "../../contexts/ThemeContext";
// Import Assets Here
import {
  getStoreCategoryById,
  updateStoreCategory,
} from "../../assets/Stores/StoreCategoryData";
// Import Components Here
import Header from "../../components/Header";
// Import Icons Here
import GoBackIcon from "../../images/icons/button/GoBack.svg";
import GoBackDarkIcon from "../../images/icons/button/GoBack_Dark.svg";
// Main function
const StoreCategoryEditPage = () => {
  // Variable here
  // // For Theme Mode
  const { theme } = useTheme();
  // // For Multi-Language
  const { t } = useTranslation();
  const { EP_StoreCategories } = t("EditPage");
  const { SF_StoreCategories } = t("SearchFilter");
  const { Update } = t("Buttons");
  // // For editing store category
  const [currentStoreCategoryName, setCurrentStoreCategoryName] = useState("");
  const [currentMaxDebt, setCurrentMaxDebt] = useState("");
  // // For navigating
  const navigate = useNavigate();
  const { storeCategoryId } = useParams();
  // // Get exostedData
  const location = useLocation();
  const { existedData } = location.state;
  // Use Effect here
  // // For getting data to edit
  useEffect(() => {
    const fetchData = async () => {
      // Get current store category infomation by its id
      const currentStoreCategory = await getStoreCategoryById(storeCategoryId);
      setCurrentStoreCategoryName(currentStoreCategory.tenloaidaily);
      setCurrentMaxDebt(currentStoreCategory.sotiennotoida);
    };
    fetchData();
  }, []);
  // Functions here
  // For editing current store category
  const updateData = async (id, tenloaidaily, sotiennotoida) => {
    const checkExistedData = existedData.some(
      (item) =>
        item.tenloaidaily === tenloaidaily &&
        parseInt(id) !== parseInt(item.maloaidaily),
    );
    if (checkExistedData) {
      alert("Tên loại đại lý đã tồn tại");
    } else {
      // Variables here for condition to call addStoreApi
      let checkName = true;
      let checkMaxDepth = true;
      // Functions for checking string format tenloaidaily + sotiennotoida
      const isSpecicalLetter = (input) => /[!@#\$%\^\&*\)\(+=._-]/.test(input);

      // Check tenloaidaily: non-special-letter, length in [1, 100]
      if (tenloaidaily.length < 1 || tenloaidaily.length > 100) {
        alert(
          "Độ dài tên loại đại lý không hợp lệ. Tên loại đại lý không được rỗng và không dài quá 100 ký tự",
        );
        checkName = false;
      } else if (isSpecicalLetter(tenloaidaily)) {
        alert("Tên loại đại lý không được chứa các ký tự đặc biệt");
        checkName = false;
      }

      // Check Sotiennotoida
      if (sotiennotoida < 0) {
        alert("Số tiền nợ tối đa phải là số dương");
        checkMaxDepth = false;
      }
      if (sotiennotoida >= Math.pow(10, 8)) {
        alert("Số tiền nợ tối đa là 99999999");
        checkMaxDepth = false;
      }

      if (checkName && checkMaxDepth) {
        const data = await updateStoreCategory(id, tenloaidaily, sotiennotoida);
        if (data.message === "loại đại lý không tồn tại") {
          alert("Cập nhật loại đại lý thất bại. Loại đại lý không tồn tại");
        } else {
          alert("Cập nhật loại đại lý thành công");
          navigate("/stores");
        }
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
            {EP_StoreCategories.Title}
          </p>
          <button
            className="rounded-md bg-gradient-to-tr from-red-600 via-[#ea4444] to-[#ee7272] px-4 py-3 text-lg font-bold text-white transition-all duration-300 hover:scale-105 hover:bg-gradient-to-br hover:from-red-600 hover:via-[#ea4444] hover:to-[#ee7272]"
            onClick={() =>
              updateData(
                storeCategoryId,
                currentStoreCategoryName,
                currentMaxDebt,
              )
            }
          >
            {Update}
          </button>
        </div>
        <div className="space-y-10">
          {/* Type store category name */}
          <div className="space-y-4">
            <label
              className="text-lg font-bold text-black transition-colors duration-300 dark:text-white"
              htmlFor="store-category-name-edit"
            >
              {SF_StoreCategories.Columns.Col1}
            </label>
            <input
              className="w-full rounded-lg border border-black bg-white px-5 py-2 text-lg text-black transition-colors duration-300 dark:border-white dark:bg-[#363636] dark:text-white"
              id="store-category-name-edit"
              name="store-category-name-edit"
              type="text"
              value={currentStoreCategoryName}
              onChange={(e) => setCurrentStoreCategoryName(e.target.value)}
              required
            />
          </div>
          {/* Type max debt */}
          <div className="space-y-4">
            <label
              className="text-lg font-bold text-black transition-colors duration-300 dark:text-white"
              htmlFor="max-debt-edit"
            >
              {SF_StoreCategories.Columns.Col2}
            </label>
            <input
              className="w-full rounded-lg border border-black bg-white px-5 py-2 text-lg text-black transition-colors duration-300 dark:border-white dark:bg-[#363636] dark:text-white"
              id="max-debt-edit"
              name="max-debt-edit"
              type="number"
              value={currentMaxDebt}
              onChange={(e) => setCurrentMaxDebt(e.target.value)}
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreCategoryEditPage;
