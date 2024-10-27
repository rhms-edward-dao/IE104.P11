import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Import Context Here
import { useTheme } from "../../contexts/ThemeContext";

// Import Assets Here
import { addProduct } from "../../assets/Products/ProductData";
import { getAllCategoryName } from "../../assets/Products/ProductCategoryData";
import { getAllStoreName } from "../../assets/Stores/StoreData";

// Import Components Here
import Header from "../../components/Header";

// Import Icons Here
import GoBackIcon from "../../images/icons/button/GoBack.svg";
import GoBackDarkIcon from "../../images/icons/button/GoBack_Dark.svg";

const ProductAdminAddPage = () => {
  // Variable here
  // // For Theme Mode
  const { theme } = useTheme();
  // // For Multi-Language
  const { t } = useTranslation();
  const { AP_Products, AP_Stores } = t("AddPage");
  const { SF_Products } = t("SearchFilter");
  const { Add } = t("Buttons");
  // // For adding product
  const [newProductName, setNewProductName] = useState("");

  const [newUnitPrice, setNewUnitPrice] = useState("");
  const [newStockQuantity, setNewStockQuantity] = useState("");
  const [newUnit, setNewUnit] = useState("");

  const [newProductCategoryName, setNewProductCategoryName] = useState("");
  const [existedProductCategoryName, setExistedProductCategoryName] = useState(
    []
  );

  const [newStoreName, setNewStoreName] = useState("");
  const [existedStoreName, setExistedStoreName] = useState([]);

  const [newImage, setNewImage] = useState();
  const [imageForShow, setImageForShow] = useState();
  // // For navigating
  const navigate = useNavigate();

  // Use Effect here
  // // For getting all existed product categories name, stores name
  useEffect(() => {
    const fetchAllExistedData = async () => {
      // Set all existed product categories name
      const productCategoriesName = await getAllCategoryName();
      setExistedProductCategoryName(productCategoriesName);
      // Set initial value for the dropdown-selected box
      setNewProductCategoryName(productCategoriesName[0]);

      // Set all existed stores name
      const storeName = await getAllStoreName();
      setExistedStoreName(storeName);
      // Set initial value for the dropdown-selected box
      setNewStoreName(storeName[0]);
    };
    fetchAllExistedData();
  }, []);

  // Functions here
  // // For uploading new image
  const handleUploadImage = (e) => {
    setNewImage(e.target.files[0]);
    setImageForShow(URL.createObjectURL(e.target.files[0]));
  };
  // // For adding new product
  const addData = async (
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
    } else if (tendaily.length > 200) {
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
    if (soluongton < 1) {
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
      let item = {
        tenmathang: tenmathang,
        tenloaimathang: tenloaimathang,
        tendaily: tendaily,
        dongia: dongia,
        soluongton: soluongton,
        tendvt: tendvt,
        hinhanh: hinhanh,
      };
      const data = await addProduct(item);
      if (data.message === "Thêm mặt hàng thất bại") {
        alert("Thêm mặt hàng thất bại");
      } else if (data.message === "Tên mặt hàng đã tồn tại") {
        alert("Tên mặt hàng đã tồn tại");
      } else if (data.message === "Thêm mặt hàng thành công") {
        alert("Thêm mặt hàng thành công");
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
            {AP_Products.Title}
          </p>
          <button
            className="rounded-xl bg-red-500 px-2 py-3 text-lg font-bold text-white"
            onClick={() =>
              addData(
                newProductName,
                newProductCategoryName,
                newStoreName,
                newUnitPrice,
                newStockQuantity,
                newUnit,
                newImage
              )
            }
          >
            {Add}
          </button>
        </div>
        <div className="space-y-10">
          {/* Type product name */}
          <div className="space-y-4">
            <label
              className="text-lg font-bold text-black transition-colors duration-300 dark:text-white"
              htmlFor="product-name-add"
            >
              {SF_Products.Columns.Col1}
            </label>
            <input
              className="w-full rounded-lg border border-black bg-white px-5 py-2 text-lg text-black transition-colors duration-300 dark:border-white dark:bg-[#363636] dark:text-white"
              id="product-name-add"
              name="product-name-add"
              type="text"
              placeholder={`${SF_Products.Columns.Col1} ...`}
              values={newProductName}
              onChange={(e) => setNewProductName(e.target.value)}
              required
            />
          </div>
          {/* Type unit price */}
          <div className="space-y-4">
            <label
              className="text-lg font-bold text-black transition-colors duration-300 dark:text-white"
              htmlFor="unit-price-add"
            >
              {SF_Products.Columns.Col2}
            </label>
            <input
              className="w-full rounded-lg border border-black bg-white px-5 py-2 text-lg text-black transition-colors duration-300 dark:border-white dark:bg-[#363636] dark:text-white"
              id="unit-price-add"
              name="unit-price-add"
              type="number"
              placeholder={`${SF_Products.Columns.Col2} ...`}
              values={newUnitPrice}
              onChange={(e) => setNewUnitPrice(e.target.value)}
              required
            />
          </div>
          {/* Type stock quantity */}
          <div className="space-y-4">
            <label
              className="text-lg font-bold text-black transition-colors duration-300 dark:text-white"
              htmlFor="stock-quantity-add"
            >
              {SF_Products.Columns.Col3}
            </label>
            <input
              className="w-full rounded-lg border border-black bg-white px-5 py-2 text-lg text-black transition-colors duration-300 dark:border-white dark:bg-[#363636] dark:text-white"
              id="stock-quantity-add"
              name="stock-quantity-add"
              type="number"
              placeholder={`${SF_Products.Columns.Col3} ...`}
              values={newStockQuantity}
              onChange={(e) => setNewStockQuantity(e.target.value)}
              required
            />
          </div>
          {/* Type unit */}
          <div className="space-y-4">
            <label
              className="text-lg font-bold text-black transition-colors duration-300 dark:text-white"
              htmlFor="unit-add"
            >
              {SF_Products.Columns.Col4}
            </label>
            <input
              className="w-full rounded-lg border border-black bg-white px-5 py-2 text-lg text-black transition-colors duration-300 dark:border-white dark:bg-[#363636] dark:text-white"
              id="unit-add"
              name="unit-add"
              type="text"
              placeholder={`${SF_Products.Columns.Col4} ...`}
              values={newUnit}
              onChange={(e) => setNewUnit(e.target.value)}
              required
            />
          </div>
          {/* Select product category name */}
          <div className="space-y-4">
            <label
              className="block text-lg font-bold text-black transition-colors duration-300 dark:text-white"
              htmlFor="product-category-name-add"
            >
              {SF_Products.Columns.Col5}
            </label>
            <select
              className="rounded-md border border-black bg-white px-3 py-3 text-lg font-semibold text-black transition-colors duration-300 dark:border-white dark:bg-[#363636] dark:text-white"
              id="product-category-name-add"
              name="product-category-name-add"
              value={newProductCategoryName}
              onChange={(e) => setNewProductCategoryName(e.target.value)}
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
              htmlFor="store-name-add"
            >
              {SF_Products.Columns.Col6}
            </label>
            <select
              className="rounded-md border border-black bg-white px-3 py-3 text-lg font-semibold text-black transition-colors duration-300 dark:border-white dark:bg-[#363636] dark:text-white"
              id="store-name-add"
              name="store-name-add"
              value={newStoreName}
              onChange={(e) => setNewStoreName(e.target.value)}
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
          {/* Upload image */}
          <div className="space-y-4">
            <label
              className="block text-lg font-bold text-black transition-colors duration-300 dark:text-white"
              htmlFor="product-image-upload"
            >
              {AP_Stores.UploadImage}
            </label>
            <input
              className="text-lg text-black transition-colors duration-300 dark:text-white"
              id="product-image-upload"
              name="product-image-upload"
              type="file"
              accept="image/"
              onChange={handleUploadImage}
              required
            />
            <img
              src={imageForShow}
              alt="Hình ảnh mặt hàng"
              className="text-black transition-colors duration-300 dark:text-white xl:h-20"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductAdminAddPage;

//
//
// -------------------------------------------- OLD VERSION BACKUP --------------------------------------------
//
// import { useEffect, useState } from "react";
// import { NavLink, useNavigate } from "react-router-dom";

// import ReturnIcon from "../../images/icons/return-button.png";
// import Header from "../../components/Header";

// import { addProduct } from "../../assets/AdminProduct";
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
//   // Functions here
//   useEffect(() => {
//     const fetchAllData = async () => {
//       const existedCatData = await getAllCategoryName();
//       setCatName(existedCatData[0]);
//       setCatData(existedCatData);

//       const existedStoreData = await getAllStoreName();
//       setStoreName(existedStoreData[0]);
//       setStoreData(existedStoreData);
//     };
//     fetchAllData();
//   }, []);

//   const handleUploadImage = (e) => {
//     setImageData(e.target.files[0]);
//     setImage(URL.createObjectURL(e.target.files[0]));
//   };

//   const addData = async (
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
//       let item = {
//         tenmathang: tenmathang,
//         dongia: dongia,
//         soluongton: soluongton,
//         tendvt: tendvt,
//         tenloaimathang: tenloaimathang,
//         tendaily: tendaily,
//         hinhanh: hinhanh,
//       };
//       const data = await addProduct(item);
//       console.log(data);
//       if (data.message === "Thêm mặt hàng thành công") {
//         alert("Thêm mặt hàng thành công");
//         nagivate("/product-categorys");
//       } else if (data.message === "Tên mặt hàng đã tồn tại") {
//         alert("Tên mặt hàng đã tồn tại");
//       } else {
//         alert("Thêm mặt hàng thất bại");
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
//               <p className="text-xl font-bold italic">{"Thêm mặt hàng"}</p>
//             </div>
//             <div className="w-1/2 flex justify-end mr-5">
//               <button
//                 className="px-2 py-3 bg-red-500 rounded rounded-xl"
//                 onClick={() =>
//                   addData(
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
//                 <p className="font-bold text-white text-lg">Thêm</p>
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
//               values={productName}
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
//               values={productPrice}
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
//               values={productAmount}
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
//               values={productUnitName}
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
//             <label htmlFor="product-image-add" className="font-bold text-lg">
//               Hình mặt hàng
//             </label>
//             <br />
//             <input
//               id="product-image-add"
//               name="product-image-add"
//               type="file"
//               accept="image/*"
//               onChange={handleUploadImage}
//             />

//             <img src={image} alt="Hình ảnh mặt hàng" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductAdminAddPage;
