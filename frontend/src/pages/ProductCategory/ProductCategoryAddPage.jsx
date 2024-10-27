import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
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

const ProductCategorysAddPage = () => {
  // Variable here
  // // For Theme Mode
  const { theme } = useTheme();
  // // For Multi-Language
  const { t } = useTranslation();
  const { AP_ProductCategories } = t("AddPage");
  const { SF_ProductCategories } = t("SearchFilter");
  const { Add } = t("Buttons");
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
        "Độ dài tên loại mặt hàng không hợp lệ. Tên loại mặt hàng không được rỗng và không dài quá 200 ký tự"
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
        navigate("/product-categorys");
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
            {AP_ProductCategories.Title}
          </p>
          <button
            className="rounded-xl bg-red-500 px-2 py-3 text-lg font-bold text-white"
            onClick={() => addData(newProductCategoryName)}
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

export default ProductCategorysAddPage;

//
//
// -------------------------------------------- OLD VERSION BACKUP --------------------------------------------
//
// import { useState } from "react";
// import { NavLink, useNavigate } from "react-router-dom";

// import ReturnIcon from "../../images/icons/return-button.png";
// import Header from "../../components/Header";

// import { addOneCategory } from "../../assets/TypeOfProduct";

// function ProductCategorysAddPage() {
//   // Variable for adding here
//   const [productCategoryName, setProductCategoryName] = useState("");
//   // Variables here
//   const navigate = useNavigate();

//   // Function for adding here
//   const addData = async (tenloaimathang) => {
//     if (tenloaimathang.length < 1) {
//       alert("Tên loại mặt hàng không được để rỗng");
//     } else {
//       const data = await addOneCategory(tenloaimathang);
//       if (
//         data.message ===
//         "Thêm loại mặt hàng thất bại do loại mặt hàng đã tồn tại"
//       ) {
//         alert("Thêm loại mặt hàng thất bại do loại mặt hàng đã tồn tại");
//       } else {
//         alert("Thêm loại mặt hàng thành công");
//         // Navigate back to product category page
//         navigate("/product-categorys");
//       }
//     }
//   };
//   // Return render here
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
//               <p className="text-xl font-bold italic">{"Thêm loại mặt hàng"}</p>
//             </div>
//             <div className="w-1/2 flex justify-end mr-5">
//               <button
//                 className="px-2 py-3 bg-red-500 rounded-xl"
//                 onClick={() => addData(productCategoryName)}
//               >
//                 <p className="font-bold text-white text-lg">Thêm</p>
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
//             id="store-name-edit"
//             name="product-category-name-edit"
//             type="text"
//             className="w-full py-2 text-lg border border-black rounded-lg"
//             placeholder="   Tên loại mặt hàng..."
//             values={productCategoryName}
//             onChange={(e) => setProductCategoryName(e.target.value)}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProductCategorysAddPage;
