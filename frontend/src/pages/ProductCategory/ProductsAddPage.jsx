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