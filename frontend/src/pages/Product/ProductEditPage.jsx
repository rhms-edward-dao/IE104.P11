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

const ProductStaffEditPage = () => {
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

  const [currentUnitPrice, setCurrentUnitPrice] = useState(0);
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
        setCurrentImage(currentProduct.Mathang.hinhanh);
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
  // For updating image
  const handleUploadImage = (e) => {
    setCurrentImage(e.target.files[0]);
    setImageForShow(URL.createObjectURL(e.target.files[0]));
  };
  // // For editing current product
  const updateData = async (
    mamathang,
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
    }
    // // Check soluongton
    if (soluongton < 0) {
      alert("Số lượng tồn không âm");
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
    if (check_tenmathang && check_dongia && check_soluongton && check_tendvt) {
      if (imageForShow === undefined) {
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
      const data = await updateProduct(mamathang, item);
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
              value={currentProductName}
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
              value={currentUnitPrice}
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
              value={currentStockQuantity}
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
              value={currentUnit}
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
                imageForShow
                  ? imageForShow
                  : `data:image/jpeg;base64, ${currentImage}`
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

export default ProductStaffEditPage;