import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Import Context Here
import { useTheme } from "../../contexts/ThemeContext";

// Import Assets Here
import { addStoreCategory } from "../../assets/Stores/StoreCategoryData";

// Import Components Here
import Header from "../../components/Header";

// Import Icons Here
import GoBackIcon from "../../images/icons/button/GoBack.svg";
import GoBackDarkIcon from "../../images/icons/button/GoBack_Dark.svg";

const StoreCategoryAddPage = () => {
  // Variable here
  // // For Theme Mode
  const { theme } = useTheme();
  // // For Multi-Language
  const { t } = useTranslation();
  const { AP_StoreCategories } = t("AddPage");
  const { SF_StoreCategories } = t("SearchFilter");
  const { Add } = t("Buttons");
  // // For adding store category
  const [newStoreCategoryName, setNewStoreCategoryName] = useState("");
  const [newMaxDebt, setNewMaxDebt] = useState(0);
  // // For navigating
  const navigate = useNavigate();

  // Functions here
  const addData = async (tenloaidaily, sotiennotoida) => {
    // Variables here for condition to call addStoreApi
    let checkName = true;
    let checkMaxDepth = true;
    // Functions for checking string format tenloaidaily + sotiennotoida
    const isSpecicalLetter = (input) => /[!@#\$%\^\&*\)\(+=._-]/.test(input);

    // Check tenloaidaily: non-special-letter, length in [1, 100]
    if (tenloaidaily.length < 1 || tenloaidaily.length > 100) {
      alert(
        "Độ dài tên loại đại lý không hợp lệ. Tên loại đại lý không được rỗng và không dài quá 100 ký tự"
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
    };
    if (sotiennotoida >= Math.pow(10, 8)) {
      alert("Số tiền nợ tối đa là 99999999");
      checkMaxDepth = false;
    }

    if (checkName && checkMaxDepth) {
      const data = await addStoreCategory(tenloaidaily, sotiennotoida);
      console.log(data);
      if (
        data.message === "Thêm loại đại lý thất bại do loại đại lý đã tồn tại"
      ) {
        alert("Thêm loại đại lý thất bại do loại đại lý đã tồn tại");
      } else {
        alert("Thêm loại đại lý thành công");
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
            {AP_StoreCategories.Title}
          </p>
          <button
            className="rounded-xl bg-red-500 px-2 py-3 text-lg font-bold text-white"
            onClick={() => addData(newStoreCategoryName, newMaxDebt)}
          >
            {Add}
          </button>
        </div>
        <div className="space-y-10">
          {/* Type store category name */}
          <div className="space-y-4">
            <label
              className="text-lg font-bold text-black transition-colors duration-300 dark:text-white"
              htmlFor="store-category-name-add"
            >
              {SF_StoreCategories.Columns.Col1}
            </label>
            <input
              className="w-full rounded-lg border border-black bg-white px-5 py-2 text-lg text-black transition-colors duration-300 dark:border-white dark:bg-[#363636] dark:text-white"
              id="store-category-name-add"
              name="store-category-name-add"
              type="text"
              placeholder={`${SF_StoreCategories.Columns.Col1} ...`}
              values={newStoreCategoryName}
              onChange={(e) => setNewStoreCategoryName(e.target.value)}
              required
            />
          </div>
          {/* Type max debt */}
          <div className="space-y-4">
            <label
              className="text-lg font-bold text-black transition-colors duration-300 dark:text-white"
              htmlFor="max-debt-add"
            >
              {SF_StoreCategories.Columns.Col2}
            </label>
            <input
              className="w-full rounded-lg border border-black bg-white px-5 py-2 text-lg text-black transition-colors duration-300 dark:border-white dark:bg-[#363636] dark:text-white"
              id="max-debt-add"
              name="max-debt-add"
              type="number"
              placeholder={`${SF_StoreCategories.Columns.Col2} ...`}
              values={newMaxDebt}
              onChange={(e) => setNewMaxDebt(e.target.value)}
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreCategoryAddPage;