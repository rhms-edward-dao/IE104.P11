import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
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

const ProductCategoriesEditPage = () => {
  // Variable here
  // // For Theme Mode
  const { theme } = useTheme();
  // // For Multi-Language
  const { t } = useTranslation();
  const { EP_ProductCategories } = t("EditPage");
  const { SF_ProductCategories } = t("SearchFilter");
  const { Update } = t("Buttons");
  // // For checking existed product category
  const location = useLocation();
  const { existedData } = location.state;
  // // For adding product category
  const [currentProductCategoryName, setCurrentProductCategoryName] =
    useState("");
  // // For navigating
  const navigate = useNavigate();
  const { productCategoryId } = useParams();

  // Use Effect here
  // // For getting data to edit
  useEffect(() => {
    const fetchData = async () => {
      // Get current product category infomation by its id
      const currentProductCategory =
        await getProductTypeById(productCategoryId);
      setCurrentProductCategoryName(currentProductCategory.tenloaimathang);
    };
    fetchData();
  }, []);

  // Functions here
  // // For editing current product category
  const updateData = async (id, tenloaimathang) => {
    const data = await updateOneCategory(id, tenloaimathang);
    if (data.message === "loại mặt hàng không tồn tại") {
      alert("Cập nhật loại mặt hàng thất bại. Loại mặt hàng không tồn tại");
    } else if (data.message === "Đã cập nhật") {
      alert("Cập nhật loại mặt hàng thành công");
      navigate("/products");
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
            {EP_ProductCategories.Title}
          </p>
          <button
            className="rounded-md bg-gradient-to-tr from-red-600 via-[#ea4444] to-[#ee7272] px-4 py-3 text-lg font-bold text-white transition-all duration-300 hover:scale-105 hover:bg-gradient-to-br hover:from-red-600 hover:via-[#ea4444] hover:to-[#ee7272]"
            onClick={() =>
              existedData.some(
                (item) =>
                  item.tenloaimathang === currentProductCategoryName.trim(),
              )
                ? alert(
                    "Chỉnh sửa loại mặt hàng thất bại !!!\nTên loại mặt hàng đã tồn tại",
                  )
                : updateData(
                    productCategoryId,
                    currentProductCategoryName.trim(),
                  )
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

export default ProductCategoriesEditPage;
