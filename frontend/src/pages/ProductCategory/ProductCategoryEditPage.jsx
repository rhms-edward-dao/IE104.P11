import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Import Context Here
import { useTheme } from "../../contexts/ThemeContext";

// Import Assets Here
import {
  getProductTypeById,
  updateOneCategory,
} from "../../assets/Products/ProductCategoryData";

// Import Components Here
import Header from "../../components/Header";

// Import Icons Here
import GoBackIcon from "../../images/icons/button/GoBack.svg";
import GoBackDarkIcon from "../../images/icons/button/GoBack_Dark.svg";

const ProductCategorysEditPage = () => {
  // Variable here
  // // For Theme Mode
  const { theme } = useTheme();
  // // For Multi-Language
  const { t } = useTranslation();
  const { EP_ProductCategories } = t("EditPage");
  const { SF_ProductCategories } = t("SearchFilter");
  const { Update } = t("Buttons");
  // // For adding product category
  const [currentProductCategoryName, setCurrentProductCategoryName] =
    useState("");
  // // For navigating
  const navigate = useNavigate();
  const { productCategoryId } = useParams();
  // // Get existed data
  const location = useLocation();
  const { existedData } = location.state;
  // Use Effect here
  // // For getting data to edit
  useEffect(() => {
    const fetchData = async () => {
      // Get current product category infomation by its id
      const currentProductCategory = await getProductTypeById(
        productCategoryId
      );
      setCurrentProductCategoryName(currentProductCategory.tenloaimathang);
    };
    fetchData();
  }, []);

  // Functions here
  // // For editing current product category
  const updateData = async (id, tenloaimathang) => {
    const checkExistedData = existedData.some(item => item.tenloaimathang === tenloaimathang && parseInt(id) !== parseInt(item.maloaimathang));
    if (checkExistedData) {
      alert("Loại mặt hàng đã tồn tài");
    } else {
      // Variables here for condition to call addProductCategoryApi
      let checkName = true;
      // Functions for checking string format tenloaimathang
      const isSpecicalLetter = (input) => /[!@#\$%\^\&*\)\(+=._-]/.test(input);
      // Check tenloaimathang: non-special-letter, length in [1, 200]
      if (tenloaimathang.length < 1 || tenloaimathang.length > 200) {
        alert(
          "Độ dài tên loại mặt hàng không hợp lệ. Tên loại mặt hàng không được rỗng và không dài quá 200 ký tự"
        );
        checkName = false;
      } else if (isSpecicalLetter(tenloaimathang)) {
        alert("Tên loại đại lý không được chứa các ký tự đặc biệt");
        checkName = false;
      }
      if (checkName) {
        const data = await updateOneCategory(id, tenloaimathang);        
        if (data.message === "Đã cập nhật") {
          alert("Cập nhật loại mặt hàng thành công");
          navigate("/product-categorys");
        };
      };    
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
          <NavLink to={"/product-categorys"}>
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
            {EP_ProductCategories.Title}
          </p>
          <button
            className="rounded-xl bg-red-500 px-2 py-3 text-lg font-bold text-white"
            onClick={() =>
              updateData(productCategoryId, currentProductCategoryName)
            }
          >
            {Update}
          </button>
        </div>
        <div className="space-y-10">
          {/* Type product category name */}
          <div className="space-y-4">
            <label
              className="text-lg font-bold text-black transition-colors duration-300 dark:text-white"
              htmlFor="product-category-name-edit"
            >
              {SF_ProductCategories.Columns.Col1}
            </label>
            <input
              className="w-full rounded-lg border border-black bg-white px-5 py-2 text-lg text-black transition-colors duration-300 dark:border-white dark:bg-[#363636] dark:text-white"
              id="product-category-name-edit"
              name="product-category-name-edit"
              type="text"
              value={currentProductCategoryName}
              onChange={(e) => setCurrentProductCategoryName(e.target.value)}
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCategorysEditPage;