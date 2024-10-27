import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Import Context Here
import { useTheme } from "../../contexts/ThemeContext";

// Import Assets Here
import {
  getProductById,
  updateProduct,
} from "../../assets/Products/ProductData";
import { getAllCategoryName } from "../../assets/Products/ProductCategoryData";
import { getAllStoreName } from "../../assets/Stores/StoreData";

// Import Components Here
import Header from "../../components/Header";

// Import Icons Here
import GoBackIcon from "../../images/icons/button/GoBack.svg";
import GoBackDarkIcon from "../../images/icons/button/GoBack_Dark.svg";

const ProductAdminEditPage = () => {
  // Variable here
  // // For Theme Mode
  const { theme } = useTheme();
  // // For Multi-Language
  const { t } = useTranslation();
  const { AP_Stores } = t("AddPage");
  const { EP_Products } = t("EditPage");
  const { SF_Products } = t("SearchFilter");
  const { Update } = t("Buttons");
  // // For editing product
  const [currentProductName, setCurrentProductName] = useState("");

  const [currentUnitPrice, setCurrentUnitPrice] = useState("");
  const [currentStockQuantity, setCurrentStockQuantity] = useState("");
  const [currentUnit, setCurrentUnit] = useState("");

  const [currentProductCategoryName, setCurrentProductCategoryName] =
    useState("");
  const [existedProductCategoryName, setExistedProductCategoryName] = useState(
    []
  );

  const [currentStoreName, setCurrentStoreName] = useState("");
  const [existedStoreName, setExistedStoreName] = useState([]);

  const [currentImage, setCurrentImage] = useState();
  const [imageForShow, setImageForShow] = useState();
  // // For navigating
  const navigate = useNavigate();
  const { productId } = useParams();

  // Use Effect here
  // // For getting data to edit
  useEffect(() => {
    const fetchData = async () => {
      // Get current product infomation by its id
      const currentProduct = await getProductById(productId);
      setCurrentProductName(currentProduct.Mathang.tenmathang);
      setCurrentUnitPrice(currentProduct.Mathang.dongia);
      setCurrentStockQuantity(currentProduct.Mathang.soluongton);
      setCurrentUnit(currentProduct.Mathang.tendvt);
      setCurrentProductCategoryName(currentProduct.tenloaimathang);
      setCurrentStoreName(currentProduct.tendaily);

      if (currentProduct.Mathang.hinhanh !== null) {
        setImageForShow(currentProduct.Mathang.hinhanh);
      }

      // Get all existed product category name
      const productCategoryData = await getAllCategoryName();
      setExistedProductCategoryName(productCategoryData);

      // Get all existed stores name
      const storeData = await getAllStoreName();
      setExistedStoreName(storeData);
    };
    fetchData();
  }, []);

  // Functions here
  // // For updating image
  const handleUploadImage = (e) => {
    setImageForShow(e.target.files[0]);
    setCurrentImage(URL.createObjectURL(e.target.files[0]));
  };
  // // For editing current product
  const updateData = async (
    tenmathang,
    tenloaimathang,
    tendaily,
    dongia,
    soluongton,
    tendvt,
    hinhanh
  ) => {
    let check_tenmathang = true;
    let check_dongia = true;
    let check_soluongton = true;
    let check_tendvt = true;
    let check_hinhanh = true;

    // Constraints for checking format
    const isOnlyDigit = (input) => /^\d+$/.test(input);

    // Checking before calling add api
    // // Check tenmathang
    if (tenmathang.length < 1) {
      alert("Tên mặt hàng không được rỗng");
      check_tenmathang = false;
    } else if (tenmathang.length > 200) {
      alert("Tên mặt hàng quá dài");
      check_tenmathang = false;
    }
    // // Check dongia
    if (dongia < 1000) {
      alert("Đơn giá tối thiểu là 1000 đồng");
      check_dongia = false;
    } else if (!isOnlyDigit(dongia)) {
      alert("Đơn giá chỉ được có ký tự chữ số");
      check_dongia = false;
    }
    // // Check soluongton
    if (soluongton < 0) {
      alert("Số lượng tồn không âm");
      check_soluongton = false;
    } else if (!isOnlyDigit(soluongton)) {
      alert("Số lượng tồn chỉ được có ký tự chữ số");
      check_soluongton = false;
    }
    // // Check tendvt
    if (tendvt.length < 1) {
      alert("Tên đơn vị tính không được rỗng");
      check_tendvt = false;
    } else if (tendvt.length > 50) {
      alert("Tên đơn vị tính quá dài");
      check_tendvt = false;
    }
    // // Check hinhanh
    if (hinhanh === undefined) {
      alert("Chưa chọn hình ảnh");
      check_hinhanh = false;
    }

    if (
      check_tenmathang &&
      check_dongia &&
      check_soluongton &&
      check_tendvt &&
      check_hinhanh
    ) {
      if (currentImage === undefined) {
        hinhanh = null;
      }
      let item = {
        tenmathang: tenmathang,
        tenloaimathang: tenloaimathang,
        tendaily: tendaily,
        dongia: dongia,
        soluongton: soluongton,
        tendvt: tendvt,
        hinhanh: hinhanh,
      };
      const data = await updateProduct(item);
      if (data.message === "Cập nhật mặt hàng thất bại") {
        alert("Cập nhật mặt hàng thất bại");
      } else if (data.message === "Tên mặt hàng đã tồn tại") {
        alert("Tên mặt hàng đã tồn tại");
      } else if (data.message === "Cập nhật mặt hàng thành công") {
        alert("Cập nhật mặt hàng thành công");
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
            {EP_Products.Title}
          </p>
          <button
            className="rounded-xl bg-red-500 px-2 py-3 text-lg font-bold text-white"
            onClick={() =>
              updateData(
                productId,
                currentProductName,
                currentProductCategoryName,
                currentStoreName,
                currentUnitPrice,
                currentStockQuantity,
                currentUnit,
                currentImage
              )
            }
          >
            {Update}
          </button>
        </div>
        <div className="space-y-10">
          {/* Type product name */}
          <div className="space-y-4">
            <label
              className="text-lg font-bold text-black transition-colors duration-300 dark:text-white"
              htmlFor="product-name-edit"
            >
              {SF_Products.Columns.Col1}
            </label>
            <input
              className="w-full rounded-lg border border-black bg-white px-5 py-2 text-lg text-black transition-colors duration-300 dark:border-white dark:bg-[#363636] dark:text-white"
              id="product-name-edit"
              name="product-name-edit"
              type="text"
              placeholder={currentProductName}
              values={currentProductName}
              onChange={(e) => setCurrentProductName(e.target.value)}
              required
            />
          </div>
          {/* Type unit price */}
          <div className="space-y-4">
            <label
              className="text-lg font-bold text-black transition-colors duration-300 dark:text-white"
              htmlFor="unit-price-edit"
            >
              {SF_Products.Columns.Col2}
            </label>
            <input
              className="w-full rounded-lg border border-black bg-white px-5 py-2 text-lg text-black transition-colors duration-300 dark:border-white dark:bg-[#363636] dark:text-white"
              id="unit-price-edit"
              name="unit-price-edit"
              type="number"
              placeholder={currentUnitPrice}
              values={currentUnitPrice}
              onChange={(e) => setCurrentUnitPrice(e.target.value)}
              required
            />
          </div>
          {/* Type stock quantity */}
          <div className="space-y-4">
            <label
              className="text-lg font-bold text-black transition-colors duration-300 dark:text-white"
              htmlFor="stock-quantity-edit"
            >
              {SF_Products.Columns.Col3}
            </label>
            <input
              className="w-full rounded-lg border border-black bg-white px-5 py-2 text-lg text-black transition-colors duration-300 dark:border-white dark:bg-[#363636] dark:text-white"
              id="stock-quantity-edit"
              name="stock-quantity-edit"
              type="number"
              placeholder={currentStockQuantity}
              values={currentStockQuantity}
              onChange={(e) => setCurrentStockQuantity(e.target.value)}
              required
            />
          </div>
          {/* Type unit */}
          <div className="space-y-4">
            <label
              className="text-lg font-bold text-black transition-colors duration-300 dark:text-white"
              htmlFor="unit-edit"
            >
              {SF_Products.Columns.Col4}
            </label>
            <input
              className="w-full rounded-lg border border-black bg-white px-5 py-2 text-lg text-black transition-colors duration-300 dark:border-white dark:bg-[#363636] dark:text-white"
              id="unit-edit"
              name="unit-edit"
              type="text"
              placeholder={currentUnit}
              values={currentUnit}
              onChange={(e) => setCurrentUnit(e.target.value)}
              required
            />
          </div>
          {/* Select product category name */}
          <div className="space-y-4">
            <label
              className="block text-lg font-bold text-black transition-colors duration-300 dark:text-white"
              htmlFor="product-category-name-edit"
            >
              {SF_Products.Columns.Col5}
            </label>
            <select
              className="rounded-md border border-black bg-white px-3 py-3 text-lg font-semibold text-black transition-colors duration-300 dark:border-white dark:bg-[#363636] dark:text-white"
              id="product-category-name-edit"
              name="product-category-name-edit"
              value={currentProductCategoryName}
              onChange={(e) => setCurrentProductCategoryName(e.target.value)}
            >
              {existedProductCategoryName.map((item) => (
                <>
                  <option key={item} value={item}>
                    {item}
                  </option>
                </>
              ))}
            </select>
          </div>
          {/* Select store name */}
          <div className="space-y-4">
            <label
              className="block text-lg font-bold text-black transition-colors duration-300 dark:text-white"
              htmlFor="store-name-edit"
            >
              {SF_Products.Columns.Col6}
            </label>
            <select
              className="rounded-md border border-black bg-white px-3 py-3 text-lg font-semibold text-black transition-colors duration-300 dark:border-white dark:bg-[#363636] dark:text-white"
              id="store-name-edit"
              name="store-name-edit"
              value={currentStoreName}
              onChange={(e) => setCurrentStoreName(e.target.value)}
            >
              {existedStoreName.map((item) => (
                <>
                  <option key={item} value={item}>
                    {item}
                  </option>
                </>
              ))}
            </select>
          </div>
          {/* Update image */}
          <div className="space-y-4">
            <label
              className="block text-lg font-bold text-black transition-colors duration-300 dark:text-white"
              htmlFor="product-image-update"
            >
              {AP_Stores.UploadImage}
            </label>
            <input
              className="text-lg text-black transition-colors duration-300 dark:text-white"
              id="product-image-update"
              name="product-image-update"
              type="file"
              accept="image/"
              onChange={handleUploadImage}
              required
            />
            <img
              width={"250px"}
              src={
                currentImage !== undefined
                  ? currentImage
                  : `data:image/jpeg;base64, ${imageForShow}`
              }
              alt="Hình ảnh mặt hàng"
              className="rounded text-black transition-colors duration-300 dark:text-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductAdminEditPage;

//
//
// -------------------------------------------- OLD VERSION BACKUP --------------------------------------------
//
// import React, { useEffect, useState } from "react";
// import { NavLink, useNavigate, useParams } from "react-router-dom";

// import ReturnIcon from "../../images/icons/return-button.png";
// import Header from "../../components/Header";

// import { updateProduct, getProductById } from "../../assets/AdminProduct";
// import { getAllCategoryName } from "../../assets/TypeOfProduct";
// import { getAllStoreName } from "../../assets/Stores/StoreData";

// const ProductAdminAddPage = () => {
//   // Variables here
//   const [productName, setProductName] = useState("");
//   const [productPrice, setProductPrice] = useState(0);
//   const [productAmount, setProductAmount] = useState(0);
//   const [productUnitName, setProductUnitName] = useState("");

//   const [catData, setCatData] = useState([]);
//   const [catName, setCatName] = useState("");

//   const [storeData, setStoreData] = useState([]);
//   const [storeName, setStoreName] = useState("");

//   const [image, setImage] = useState();
//   const [imageData, setImageData] = useState();

//   const nagivate = useNavigate();
//   const { productId } = useParams();

//   // Functions here
//   useEffect(() => {
//     const fetchAllData = async (id) => {
//       const existedCatData = await getAllCategoryName();
//       setCatData(existedCatData);

//       const existedStoreData = await getAllStoreName();
//       setStoreData(existedStoreData);

//       // Set existed data to other stuff
//       const existedData = await getProductById(id);

//       setCatName(existedData.tenloaimathang);
//       setStoreName(existedData.tendaily);
//       setProductName(existedData.Mathang.tenmathang);
//       setProductPrice(existedData.Mathang.dongia);
//       setProductAmount(existedData.Mathang.soluongton);
//       setProductUnitName(existedData.Mathang.tendvt);

//       if (existedData.Mathang.hinhanh !== null) {
//         setImageData(existedData.Mathang.hinhanh);
//       }
//     };
//     fetchAllData(productId);
//   }, []);
//   const handleUploadImage = (e) => {
//     setImageData(e.target.files[0]);
//     setImage(URL.createObjectURL(e.target.files[0]));
//   };

//   const updateData = async (
//     mamathang,
//     tenmathang,
//     dongia,
//     soluongton,
//     tendvt,
//     tenloaimathang,
//     tendaily,
//     hinhanh
//   ) => {
//     // Checking before adding
//     let check_tenmathang = true;
//     let check_tendvt = true;
//     let check_hinhanh = true;

//     if (tenmathang.length < 1) {
//       alert("Tên mặt hàng không được rỗng");
//       check_tenmathang = false;
//     } else if (tenmathang.length > 100) {
//       alert("Tên mặt hàng quá dài");
//       check_tenmathang = false;
//     }

//     if (tendvt.length < 1) {
//       alert("Tên đơn vị tính không được rỗng");
//       check_tendvt = false;
//     } else if (tendvt.length > 50) {
//       alert("Tên đơn vị tính quá dài");
//       check_tendvt = false;
//     }

//     if (hinhanh === undefined) {
//       alert("Chưa chọn hình ảnh");
//       check_hinhanh = false;
//     }

//     if (check_tenmathang && check_tendvt && check_hinhanh) {
//       if (image === undefined) {
//         hinhanh = null;
//       }
//       let item = {
//         tenmathang: tenmathang,
//         dongia: dongia,
//         soluongton: soluongton,
//         tendvt: tendvt,
//         tenloaimathang: tenloaimathang,
//         tendaily: tendaily,
//         hinhanh: hinhanh,
//       };
//       const data = await updateProduct(mamathang, item);
//       if (data.message === "Cập nhật mặt hàng thành công") {
//         alert("Cập nhật mặt hàng thành công");
//         nagivate("/product-categorys");
//       } else if (data.message === "Tên mặt hàng đã tồn tại") {
//         alert("Tên mặt hàng đã tồn tại");
//       } else {
//         alert("Cập nhật mặt hàng thất bại");
//       }
//     }
//   };
//   // Return here
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
//               <p className="text-xl font-bold italic">{"Cập nhật mặt hàng"}</p>
//             </div>
//             <div className="w-1/2 flex justify-end mr-5">
//               <button
//                 className="px-2 py-3 bg-red-500 rounded rounded-xl"
//                 onClick={() =>
//                   updateData(
//                     productId,
//                     productName,
//                     productPrice,
//                     productAmount,
//                     productUnitName,
//                     catName,
//                     storeName,
//                     imageData
//                   )
//                 }
//               >
//                 <p className="font-bold text-white text-lg">Cập nhật</p>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="m-5">
//         <div className="block space-y-8">
//           <div className="space-y-4">
//             <label htmlFor="product-name-add" className="font-bold text-lg">
//               Tên mặt hàng
//             </label>
//             <br />
//             <input
//               id="product-name-add"
//               name="product-name-add"
//               type="text"
//               className="w-full py-2 text-lg border border-black rounded-lg"
//               placeholder="   Tên mặt hàng..."
//               value={productName}
//               onChange={(e) => setProductName(e.target.value)}
//               required
//             />
//           </div>

//           <div className="space-y-4">
//             <label htmlFor="product-price-add" className="font-bold text-lg">
//               Đơn giá
//             </label>
//             <br />
//             <input
//               id="product-price-add"
//               name="product-price-add"
//               type="number"
//               className="w-full py-2 text-lg border border-black rounded-lg"
//               placeholder="   Đơn giá..."
//               value={productPrice}
//               onChange={(e) => setProductPrice(e.target.value)}
//               required
//             />
//           </div>

//           <div className="space-y-4">
//             <label htmlFor="product-amount-add" className="font-bold text-lg">
//               Số lượng tồn
//             </label>
//             <br />
//             <input
//               id="product-amount-add"
//               name="product-amount-add"
//               type="number"
//               className="w-full py-2 text-lg border border-black rounded-lg"
//               placeholder="   Số lượng tồn..."
//               value={productAmount}
//               onChange={(e) => setProductAmount(e.target.value)}
//               required
//             />
//           </div>

//           <div className="space-y-4">
//             <label
//               htmlFor="product-unit-name-add"
//               className="font-bold text-lg"
//             >
//               Tên đơn vị tính
//             </label>
//             <br />
//             <input
//               id="product-unit-name-add"
//               name="product-unit-name-add"
//               type="text"
//               className="w-full py-2 text-lg border border-black rounded-lg"
//               placeholder="   Tên đơn vị tính..."
//               value={productUnitName}
//               onChange={(e) => setProductUnitName(e.target.value)}
//               required
//             />
//           </div>

//           <div className="space-y-4">
//             <label htmlFor="cat-name-add" className="font-bold text-lg">
//               Tên loại mặt hàng
//             </label>
//             <br />
//             <select
//               id="cat-name-add"
//               name="cat-name-add"
//               type="text"
//               className="px-5 py-3 rounded bg-stone-300"
//               value={catName}
//               onChange={(e) => setCatName(e.target.value)}
//             >
//               {catData.map((item) => (
//                 <option key={item} value={item}>
//                   {item}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="space-y-4">
//             <label htmlFor="store-name-add" className="font-bold text-lg">
//               Tên đại lý
//             </label>
//             <br />
//             <select
//               id="store-name-add"
//               name="store-name-add"
//               type="text"
//               className="px-5 py-3 rounded bg-stone-300"
//               value={storeName}
//               onChange={(e) => setStoreName(e.target.value)}
//             >
//               {storeData.map((item) => (
//                 <option key={item} value={item}>
//                   {item}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="space-y-4">
//             <label htmlFor="product-image-edit" className="font-bold text-lg">
//               Hình mặt hàng
//             </label>
//             <br />
//             <input
//               id="product-image-edit"
//               name="product-image-edit"
//               type="file"
//               accept="image/*"
//               onChange={handleUploadImage}
//             />
//             {image !== undefined ? (
//               <img src={image} alt="Hình ảnh mặt hàng" />
//             ) : (
//               <img
//                 width="250px"
//                 src={`data:image/jpeg;base64, ${imageData}`}
//                 alt="Hình ảnh mặt hàng"
//                 className="rounded"
//               />
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductAdminAddPage;
