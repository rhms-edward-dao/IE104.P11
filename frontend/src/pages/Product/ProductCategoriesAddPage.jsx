import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Import Context Here
import { useTheme } from "../../contexts/ThemeContext";

// Import Assets Here
import { addOneCategory } from "../../assets/Products/ProductCategoryData";

// Import Components Here
import Header from "../../components/Header";

// Import Icons Here
import GoBackIcon from "../../images/icons/button/GoBack.svg";
import GoBackDarkIcon from "../../images/icons/button/GoBack_Dark.svg";

const ProductCategoriesAddPage = () => {
  // Variable here
  // // For Theme Mode
  const { theme } = useTheme();
  // // For Multi-Language
  const { t } = useTranslation();
  const { AP_ProductCategories } = t("AddPage");
  const { SF_ProductCategories } = t("SearchFilter");
  const { Add } = t("Buttons");
  // // For checking existed product category
  const location = useLocation();
  const { existedData } = location.state;
  // // For adding product category
  const [newProductCategoryName, setNewProductCategoryName] = useState("");
  // // For navigating
  const navigate = useNavigate();

  // Functions here
  const addData = async (tenloaimathang) => {
    // Variables here for condition to call addProductCategoryApi
    let checkName = true;

    // Functions for checking string format tenloaimathang
    const isSpecicalLetter = (input) => /[!@#\$%\^\&*\)\(+=._-]/.test(input);

    // Check tenloaimathang: non-special-letter, length in [1, 200]
    if (tenloaimathang.length < 1 || tenloaimathang.length > 200) {
      alert(
        "Độ dài tên loại mặt hàng không hợp lệ. Tên loại mặt hàng không được rỗng và không dài quá 200 ký tự",
      );
      checkName = false;
    } else if (isSpecicalLetter(tenloaimathang)) {
      alert("Tên loại đại lý không được chứa các ký tự đặc biệt");
      checkName = false;
    }

    if (checkName === true) {
      const data = await addOneCategory(tenloaimathang);
      if (
        data.message ===
        "Thêm loại mặt hàng thất bại do loại mặt hàng đã tồn tại"
      ) {
        alert("Thêm loại mặt hàng thất bại do loại mặt hàng đã tồn tại");
      } else {
        alert("Thêm loại mặt hàng thành công");
        navigate("/products");
      }
    }
  };

  // Return render here
  return (
    <div>
      <div>
        <Header path="/products"></Header>
      </div>
      <div className="m-5 bg-white p-5 shadow-lg transition-colors duration-300 dark:bg-[#363636]">
        <div className="my-5 flex flex-wrap items-center justify-between">
          <p className="w-1/2 text-2xl font-bold italic text-black transition-colors duration-300 dark:text-white">
            {AP_ProductCategories.Title}
          </p>
          <button
            className="rounded-md bg-gradient-to-tr from-red-600 via-[#ea4444] to-[#ee7272] px-4 py-3 text-lg font-bold text-white transition-all duration-300 hover:scale-105 hover:bg-gradient-to-br hover:from-red-600 hover:via-[#ea4444] hover:to-[#ee7272]"
            onClick={() =>
              existedData.some(
                (item) => item.tenloaimathang === newProductCategoryName.trim(),
              )
                ? alert(
                    "Thêm loại mặt hàng thất bại !!! Tên loại mặt hàng đã tồn tại",
                  )
                : addData(newProductCategoryName.trim())
            }
          >
            {Add}
          </button>
        </div>
        <div className="space-y-10">
          {/* Type product category name */}
          <div className="space-y-4">
            <label
              className="text-lg font-bold text-black transition-colors duration-300 dark:text-white"
              htmlFor="product-category-name-add"
            >
              {SF_ProductCategories.Columns.Col1}
            </label>
            <input
              className="w-full rounded-lg border border-black bg-white px-5 py-2 text-lg text-black transition-colors duration-300 dark:border-white dark:bg-[#363636] dark:text-white"
              id="product-category-name-add"
              name="product-category-name-add"
              type="text"
              placeholder={`${SF_ProductCategories.Columns.Col1} ...`}
              values={newProductCategoryName}
              onChange={(e) => setNewProductCategoryName(e.target.value)}
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCategoriesAddPage;
