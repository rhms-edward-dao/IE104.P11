import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
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
    const data = await updateOneCategory(id, tenloaimathang);
    if (data.message === "loại mặt hàng không tồn tại") {
      alert("Cập nhật loại mặt hàng thất bại. Loại mặt hàng không tồn tại");
    } else if (data.message === "Đã cập nhật") {
      alert("Cập nhật loại mặt hàng thành công");
      navigate("/product-categorys");
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
              placeholder={currentProductCategoryName}
              values={currentProductCategoryName}
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

//
//
// -------------------------------------------- OLD VERSION BACKUP --------------------------------------------
//
// import { useEffect, useState } from "react";
// import { NavLink, useParams, useNavigate } from "react-router-dom";

// import ReturnIcon from "../../images/icons/return-button.png";

// import Header from "../../components/Header";
// import {
//   updateOneCategory,
//   getProductTypeById,
// } from "../../assets/TypeOfProduct";

// function WarehousesEditPage() {
//   // Variables
//   const [productCategoryName, setProductCategoryName] = useState("");
//   const { categoryId } = useParams();

//   // Variables for using navigation
//   const navigate = useNavigate();

//   // Function for updating data
//   useEffect(() => {
//     const fetchExistData = async (id) => {
//       const data = await getProductTypeById(id);
//       setProductCategoryName(data.tenloaimathang);
//     };
//     fetchExistData(categoryId);
//   }, []);

//   const updateData = async (id, tenloaimathang) => {
//     const data = await updateOneCategory(id, tenloaimathang);
//     if (data.message === "Đã cập nhật") {
//       alert("Loại mặt hàng cập nhật thành công");
//       navigate("/product-categorys");
//     } else if (data.message === "loại mặt hàng không tồn tại") {
//       alert("Loại mặt hàng không tồn tài");
//     } else {
//       alert("Cập nhật loại mặt hàng thất bại");
//     }
//   };

//   // Return render
//   return (
//     <div>
//       <div>
//         <Header></Header>
//       </div>
//       <hr />

//       <div>
//         <div>
//           <div className="flex items-center gap-40">
//             <NavLink to={"/product-categorys"}>
//               <button>
//                 <img
//                   src={ReturnIcon}
//                   alt="Icon trở lại"
//                   className="w-15 h-12"
//                 />
//               </button>
//             </NavLink>
//           </div>
//           <div className="flex mt-5">
//             <div className="w-1/2">
//               <p className="text-xl font-bold italic">
//                 Chỉnh sửa loại mặt hàng
//               </p>
//             </div>
//             <div className="w-1/2 flex justify-end mr-5">
//               <button
//                 className="px-2 py-3 bg-red-500 rounded-xl"
//                 onClick={() => updateData(categoryId, productCategoryName)}
//               >
//                 <p className="font-bold text-white text-lg">Cập nhật</p>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="m-5">
//         <div className="block">
//           <label
//             htmlFor="product-category-name-edit"
//             className="font-bold text-lg"
//           >
//             Tên loại mặt hàng
//           </label>
//           <br />
//           <input
//             id="product-category-name-edit"
//             name="product-category-name-edit"
//             type="text"
//             className="w-full py-2 text-lg border border-black rounded-lg"
//             placeholder="   Tên loại mặt hàng..."
//             value={productCategoryName}
//             onChange={(e) => setProductCategoryName(e.target.value)}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default WarehousesEditPage;
