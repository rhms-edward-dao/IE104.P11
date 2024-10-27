import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Import Contexts Here
import { useTheme } from "../../contexts/ThemeContext";
import { useStoreTab } from "../../contexts/StoreTabState";

// Import Assets Here
import {
  getAllProducts,
  deleteProduct,
} from "../../assets/Products/ProductData";
import {
  getAllTypeOfProduct,
  deleteOneCategory,
} from "../../assets/Products/ProductCategoryData";
import { ProductDataCard } from "../../assets/Products/ProductDataCard";

// Import Components Here
import Header from "../../components/Header";
import Card from "../../components/content/Card";
import Button from "../../components/UI/Button";
import PaginationButtons from "../../components/UI/PaginationButtons";

// Import Icons Here
import EditIcon from "../../images/icons/button/Edit.svg";
import DeleteIcon from "../../images/icons/button/Delete.svg";

const ProductCategorys = () => {
  // Variables here
  // // For Theme Mode and Switch Tab
  const { theme } = useTheme();
  // // For Multi-Language
  const { t } = useTranslation();
  const { Title } = t("Header");
  const { DC_Products } = t("DataCard");
  const { Product, ProductCategory } = t("TabView");
  const { SearchBy, SF_Products, SF_ProductCategories } = t("SearchFilter");
  const { Add, Edit, Delete } = t("Buttons");
  // // For tab state here
  const { isProductTab, activateProductTab, deactivateProductTab } =
    useStoreTab();
  // // For fetching products & product category data
  const [productData, setProductData] = useState([]);
  const [productCategoryData, setProductCategoryData] = useState([]);
  // // For searching products & product category
  const [productSearchTerm, setProductSearchTerm] = useState("");
  const [productCategorySearchTerm, setProductCategorySearchTerm] =
    useState("");
  const [productSearchResults, setProductSearchResults] = useState([]);
  const [productCategorySearchResults, setProductCategorySearchResults] =
    useState([]);
  // // For pagination products & product category
  const [currentProductPage, setCurrentProductPage] = useState(0);
  const [currentProductCategoryPage, setCurrentProductCategoryPage] =
    useState(0);
  const itemsPerPage = 5;
  // // For tracking the search-filter option and placeholder text on products & product category
  const [productFilterOption, setProductFilterOption] = useState(
    SF_Products.Columns.Col1
  );
  const [productCategoryFilterOption, setProductCategoryFilterOption] =
    useState(SF_ProductCategories.Columns.Col1);

  // Use Effect here
  // // For getting all existing products and product categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get Exsisted Products
        const existedProduct = await getAllProducts();
        if (existedProduct.length === 0) {
          setProductData([]);
        } else {
          setProductData(existedProduct);
        }
        // Get Exsisted Product Categories
        const existedProductCategory = await getAllTypeOfProduct();
        if (existedProductCategory.length === 0) {
          setProductCategoryData([]);
        } else {
          setProductCategoryData(existedProductCategory);
        }
      } catch (error) {
        console.error("Error while fetching: ", error);
      }
    };
    fetchData();
  }, []);
  // // For searching
  useEffect(() => {
    // Filtering products base on filter option and input text
    if (productSearchTerm.trim() !== "") {
      const results = productData.filter((item) => {
        if (productFilterOption === SF_Products.Columns.Col1) {
          return item.Mathang.tenmathang
            .toLowerCase()
            .includes(productSearchTerm.toLowerCase());
        } else if (productFilterOption === SF_Products.Columns.Col2) {
          return item.Mathang.dongia
            .toString()
            .toLowerCase()
            .includes(productSearchTerm.toLowerCase());
        } else if (productFilterOption === SF_Products.Columns.Col3) {
          return item.Mathang.soluongton
            .toLowerCase()
            .includes(productSearchTerm.toLowerCase());
        } else if (productFilterOption === SF_Products.Columns.Col4) {
          return item.Mathang.tendvt
            .toLowerCase()
            .includes(productSearchTerm.toLowerCase());
        } else if (productFilterOption === SF_Products.Columns.Col5) {
          return item.tenloaimathang
            .toLowerCase()
            .includes(productSearchTerm.toLowerCase());
        } else if (productFilterOption === SF_Products.Columns.Col6) {
          return item.tendaily
            .toLowerCase()
            .includes(productSearchTerm.toLowerCase());
        }
        return false;
      });
      setProductSearchResults(results);
    } else {
      setProductSearchResults(productData);
    }
    // Filtering products category base on filter option and input text
    if (productCategorySearchTerm.trim() !== "") {
      const results = productCategoryData.filter((item) => {
        if (productCategoryFilterOption === SF_ProductCategories.Columns.Col1) {
          return item.tenloaimathang
            .toLowerCase()
            .includes(productCategorySearchTerm.toLowerCase());
        }
        return false;
      });
      setProductCategorySearchResults(results);
    } else {
      setProductCategorySearchResults(productCategoryData);
    }
  }, [
    productSearchTerm,
    productCategorySearchTerm,
    productData,
    productCategoryData,
    productFilterOption,
    productCategoryFilterOption,
  ]);

  // Functions here
  // // For deleting one product
  const deleteAProduct = async (id) => {
    const productResponse = await deleteProduct(id);

    if (productResponse.message === "Xóa mặt hàng thất bại") {
      alert(productResponse.message);
    } else {
      alert(productResponse.message);
      setProductData(
        productData.filter((item) => item.Mathang.mamathang !== id)
      );
    }
  };
  // // For deleting one product category
  const deleteAProductCategory = async (id) => {
    const productCategoryResponse = await deleteOneCategory(id);

    if (productCategoryResponse.message === "Xóa loại mặt hàng thất bại") {
      alert(productCategoryResponse.message);
    } else {
      alert(productCategoryResponse.message);
      setProductCategoryData(
        productCategoryData.filter((item) => item.maloaimathang !== id)
      );
    }
  };

  // // For changing placeholder text base on the selected search-filter option
  const getPlaceholderText = () => {
    switch (isProductTab ? productFilterOption : productCategoryFilterOption) {
      case `${
        isProductTab
          ? SF_Products.Columns.Col1
          : SF_ProductCategories.Columns.Col1
      }`:
        return `${
          isProductTab
            ? SF_Products.Placeholders.Text1
            : SF_ProductCategories.Placeholders.Text1
        }`;
      case SF_Products.Columns.Col2:
        return SF_Products.Placeholders.Text2;
      case SF_Products.Columns.Col3:
        return SF_Products.Placeholders.Text3;
      case SF_Products.Columns.Col4:
        return SF_Products.Placeholders.Text4;
      case SF_Products.Columns.Col5:
        return SF_Products.Placeholders.Text5;
      case SF_Products.Columns.Col6:
        return SF_Products.Placeholders.Text6;
      default:
        return `${
          isProductTab
            ? SF_Products.Placeholders.Text1
            : SF_ProductCategories.Placeholders.Text1
        }`;
    }
  };

  // Items for render
  const productItems = productSearchTerm ? productSearchResults : productData;
  const productCategoryItems = productCategorySearchTerm
    ? productCategorySearchResults
    : productCategoryData;

  // Calculate offset for products
  const productOffset = currentProductPage * itemsPerPage;
  const currentProductItems =
    productItems.length > 0
      ? productItems.slice(productOffset, productOffset + itemsPerPage)
      : [];
  const productPageCount =
    productItems.length > 0
      ? Math.ceil(parseFloat(productItems.length / itemsPerPage))
      : 0;
  // Calculate offset for product categories
  const productCategoryOffset = currentProductCategoryPage * itemsPerPage;
  const currentProductCategoryItems =
    productCategoryItems.length > 0
      ? productCategoryItems.slice(
          productCategoryOffset,
          productCategoryOffset + itemsPerPage
        )
      : [];
  const productCategoryPageCount =
    productCategoryItems.length > 0
      ? Math.ceil(parseFloat(productCategoryItems.length / itemsPerPage))
      : 0;

  // Return here
  return (
    <div>
      <div>
        <Header
          headerTitle={isProductTab ? Title.Products : Title.ProductCategories}
        ></Header>
      </div>
      <div className="m-5 flex flex-wrap justify-center gap-5">
        {ProductDataCard(theme, DC_Products).map((card, index) => (
          <Card
            key={index}
            image={card.img}
            description={card.description}
            value={card.value}
          />
        ))}
      </div>
      <div className="m-5 bg-white p-5 shadow-lg transition-colors duration-300 dark:bg-[#363636]">
        {/* Tab for changing what to show */}
        <div className="text-md mb-6 text-center font-bold text-gray-500 dark:text-gray-200">
          <ul className="-mb-px flex flex-wrap">
            <li className="me-2">
              <button
                className={`inline-block rounded-t-lg border-b-2 p-2 transition-colors duration-300 ${
                  isProductTab
                    ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400"
                    : "border-gray-300 hover:text-gray-800 dark:border-gray-800 dark:hover:text-white"
                }`}
                onClick={() => (isProductTab ? <></> : activateProductTab())}
              >
                {Product}
              </button>
            </li>
            <li className="me-2">
              <button
                className={`inline-block rounded-t-lg border-b-2 p-2 transition-colors duration-300 ${
                  isProductTab
                    ? "border-gray-300 hover:text-gray-800 dark:border-gray-800 dark:hover:text-white"
                    : "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400"
                }`}
                onClick={() => (isProductTab ? deactivateProductTab() : <></>)}
              >
                {ProductCategory}
              </button>
            </li>
          </ul>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center justify-start gap-5">
            <p className="whitespace-nowrap font-bold text-black transition-colors duration-300 dark:text-white">
              {SearchBy}
            </p>
            <select
              className="rounded-md border border-black bg-white px-3 py-0.5 text-lg font-semibold text-black transition-colors duration-300 dark:border-white dark:bg-[#363636] dark:text-white"
              value={
                isProductTab ? productFilterOption : productCategoryFilterOption
              }
              onChange={(e) =>
                isProductTab
                  ? setProductFilterOption(e.target.value)
                  : setProductCategoryFilterOption(e.target.value)
              }
            >
              {isProductTab ? (
                <>
                  <option value={SF_Products.Columns.Col1}>
                    {SF_Products.Columns.Col1}
                  </option>
                  <option value={SF_Products.Columns.Col2}>
                    {SF_Products.Columns.Col2}
                  </option>
                  <option value={SF_Products.Columns.Col3}>
                    {SF_Products.Columns.Col3}
                  </option>
                  <option value={SF_Products.Columns.Col4}>
                    {SF_Products.Columns.Col4}
                  </option>
                  <option value={SF_Products.Columns.Col5}>
                    {SF_Products.Columns.Col5}
                  </option>
                  <option value={SF_Products.Columns.Col6}>
                    {SF_Products.Columns.Col6}
                  </option>
                </>
              ) : (
                <>
                  <option value={SF_ProductCategories.Columns.Col1}>
                    {SF_ProductCategories.Columns.Col1}
                  </option>
                </>
              )}
            </select>
            <input
              className="w-96 rounded-md border border-black bg-white px-2 py-0.5 text-lg text-black transition-colors duration-300 dark:border-white dark:bg-[#363636] dark:text-white"
              type="text"
              placeholder={getPlaceholderText()}
              value={
                isProductTab ? productSearchTerm : productCategorySearchTerm
              }
              onChange={(e) =>
                isProductTab
                  ? setProductSearchTerm(e.target.value)
                  : setProductCategorySearchTerm(e.target.value)
              }
            />
          </div>
          <NavLink
            to={
              isProductTab ? "product-add-page" : "product-categorys-add-page"
            }
          >
            <Button />
          </NavLink>
        </div>
        <table className="mt-5 w-full text-center text-black transition-colors duration-300 dark:text-white">
          <thead className="border-b-4 border-red-500">
            <tr className="text-md">
              <th scope="col"></th>
              {isProductTab ? (
                <>
                  <th scop="col" className="py-5 border-r-2">
                    Hình ảnh
                  </th>
                  <th className="border-r-2 py-5 text-lg" scope="col">
                    {SF_Products.Columns.Col1}
                  </th>
                  <th className="border-r-2 py-5 text-lg" scope="col">
                    {SF_Products.Columns.Col2}
                  </th>
                  <th className="border-r-2 py-5 text-lg" scope="col">
                    {SF_Products.Columns.Col3}
                  </th>
                  <th className="border-r-2 py-5 text-lg" scope="col">
                    {SF_Products.Columns.Col4}
                  </th>
                  <th className="border-r-2 py-5 text-lg" scope="col">
                    {SF_Products.Columns.Col5}
                  </th>
                  <th className="py-5 text-lg" scope="col">
                    {SF_Products.Columns.Col6}
                  </th>
                </>
              ) : (
                <>
                  <th className="border-r-2 py-5 text-lg" scope="col">
                    {SF_ProductCategories.Columns.Col1}
                  </th>
                </>
              )}
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {(isProductTab ? currentProductItems : currentProductCategoryItems)
              .length >= 1 ? (
              <>
                {(isProductTab
                  ? currentProductItems
                  : currentProductCategoryItems
                ).map((list, index) => (
                  <tr
                    className="border-b border-slate-300 text-black transition-colors duration-300 hover:bg-slate-200 dark:border-white dark:text-white dark:hover:bg-slate-500"
                    key={index}
                  >
                    <td className="py-5 pl-3">
                      <input type="checkbox" />
                    </td>
                    {isProductTab ? (
                      <>
                        <td scope="row" className="py-5">
                          <img
                            width="250px"
                            src={`data:image/jpeg;base64, ${list.Mathang.hinhanh}`}
                            alt="Hình đại lý"
                            className="rounded 2xl:h-20 2xl:w-20"
                          />
                        </td>
                        <td scope="row" className="border-r-2 py-5 text-lg">
                          {list.Mathang.tenmathang}
                        </td>
                        <td scope="row" className="border-r-2 py-5 text-lg">
                          {list.Mathang.dongia}
                        </td>
                        <td scope="row" className="border-r-2 py-5 text-lg">
                          {list.Mathang.soluongton}
                        </td>
                        <td scope="row" className="border-r-2 py-5 text-lg">
                          {list.Mathang.tendvt}
                        </td>
                        <td scope="row" className="border-r-2 py-5 text-lg">
                          {list.tenloaimathang}
                        </td>
                        <td scope="row" className="py-5 text-lg">
                          {list.tendaily}
                        </td>
                      </>
                    ) : (
                      <>
                        <td scope="row" className="border-r-2 py-5 text-lg">
                          {list.tenloaimathang}
                        </td>
                      </>
                    )}
                    <td scope="row">
                      <div className="flex justify-center gap-20">
                        <NavLink
                          className="flex items-center gap-2 rounded-lg bg-green-500 px-4 py-2 font-bold text-white"
                          to={
                            isProductTab
                              ? `product-edit-page/${list.Mathang.mamathang}`
                              : `product-categorys-edit-page/${list.maloaimathang}`
                          }
                        >
                          <p className="hidden sm:hidden md:hidden lg:inline-block">
                            {Edit}
                          </p>
                          <img src={EditIcon} alt="Icon chỉnh sửa" />
                        </NavLink>
                        <button
                          className="flex items-center gap-2 rounded-lg bg-amber-400 px-4 py-2 font-bold text-white"
                          onClick={() =>
                            isProductTab
                              ? deleteAProduct(list.Mathang.mamathang)
                              : deleteAProductCategory(list.maloaimathang)
                          }
                        >
                          <p className="hidden sm:hidden md:hidden lg:inline-block">
                            {Delete}
                          </p>
                          <img src={DeleteIcon} alt="Icon thùng rác" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </>
            ) : (
              <></>
            )}
          </tbody>
        </table>
        <PaginationButtons
          pageCount={isProductTab ? productPageCount : productCategoryPageCount}
          currentPage={
            isProductTab ? currentProductPage : currentProductCategoryPage
          }
          setCurrentPage={
            isProductTab ? setCurrentProductPage : setCurrentProductCategoryPage
          }
        />
      </div>
    </div>
  );
};

export default ProductCategorys;

//
//
// -------------------------------------------- OLD VERSION BACKUP --------------------------------------------
//
// import { useEffect, useState } from "react";
// import { NavLink } from "react-router-dom";

// import Card from "../../components/content/Card";
// import Header from "../../components/Header";
// import Button from "../../components/UI/Button";
// import PaginationButtons from "../../components/UI/PaginationButtons";

// import DWCardData from "../../assets/WarehouseCardData";

// import TrashIcon from "../../images/icons/trash.png";
// import EditIcon from "../../images/icons/edit.png";

// import {
//   getAllTypeOfProduct,
//   deleteOneCategory,
// } from "../../assets/TypeOfProduct";
// import { getAllProducts, deleteProduct } from "../../assets/AdminProduct";
// import { useStoreTab } from "../../contexts/StoreTabState";

// function ProductCategorys() {
//   // Variabls for product category here
//   const [data, setData] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [searchResults, setSearchResults] = useState([]);

//   // Variables for products here
//   const [productData, setProductData] = useState([]);
//   const [productSearchTerm, setProductSearchTerm] = useState("");
//   const [productSearchResults, setProductSearchResults] = useState([]);

//   // Variables for tab state here
//   const { isProductTab, activateProductTab, deactivateProductTab } =
//     useStoreTab();

//   // Pagination states - for kind of product
//   const [currentPage, setCurrentPage] = useState(0);
//   const itemsPerPage = 5;

//   // Pagination states - for products
//   const [currentPageProduct, setCurrentPageProduct] = useState(0);

//   // State to track the selected option and placeholder text
//   const [selectedOption, setSelectedOption] = useState("Tên mặt hàng");
//   const [selectedOptionCat, setSelectedOptionCat] =
//     useState("Tên loại mặt hàng");

//   // Function to handle the change of the dropdown and update placeholder
//   const handleOptionChange = (e) => {
//     setSelectedOption(e.target.value);
//   };
//   const handleOptionChangeCat = (e) => {
//     setSelectedOptionCat(e.target.value);
//   };

//   // Placeholder text based on the selected option
//   const getPlaceholderText = () => {
//     switch (selectedOption) {
//       case "Tên đại lý":
//         return "Tìm kiếm theo tên mặt hàng ...";
//       case "Tên loại mặt hàng":
//         return "Tìm kiếm theo tên loại mặt hàng ...";
//       default:
//         return "Tìm kiếm ...";
//     }
//   };
//   // Get data from server here - data must be fetched before this page has been loaded
//   useEffect(() => {
//     const fetchData = async () => {
//       // Getting data for type of product
//       const data = await getAllTypeOfProduct();
//       setData(data);

//       // Getting data for product
//       const proData = await getAllProducts();
//       setProductData(proData);
//     };
//     fetchData();
//   }, []);

//   //  Function for deleteing category
//   const deleteData = async (id) => {
//     const response = await deleteOneCategory(id);
//     if (response.message === "Xóa loại mặt hàng thành công") {
//       alert("Xóa loại mặt hàng thành công");
//       setData(data.filter((item) => item.maloaimathang != id));
//     }
//   };

//   // Function for deleting product
//   const deleteProductData = async (id) => {
//     const response = await deleteProduct(id);
//     if (response.message == "Xóa mặt hàng thành công") {
//       alert("Xóa mặt hành thành công");
//       setProductData(
//         productData.filter((item) => item.Mathang.mamathang != id)
//       );
//     }
//   };

//   // Search feature here
//   useEffect(() => {
//     if (searchTerm.trim() !== "") {
//       const result = data.filter((item) =>
//         item.tenloaimathang.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//       setSearchResults(result);
//     } else {
//       setSearchResults(data);
//     }

//     if (productSearchTerm.trim() !== "") {
//       const presult = productData.filter((item) => {
//         if (selectedOption === "Tên mặt hàng") {
//           return item.Mathang.tenmathang
//             .toLowerCase()
//             .includes(productSearchTerm.toLowerCase());
//         } else {
//           return item.tenloaimathang
//             .toLowerCase()
//             .includes(productSearchTerm.toLowerCase());
//         }
//       });
//       setProductSearchResults(presult);
//     } else {
//       setProductSearchResults(productData);
//     }
//   }, [
//     searchTerm,
//     productSearchTerm,
//     data,
//     productData,
//     selectedOption,
//     selectedOptionCat,
//   ]);

//   const items = searchTerm ? searchResults : data;
//   const product_items = productSearchTerm ? productSearchResults : productData;

//   // Calculate amount of items that will be shown - for items
//   const offset = currentPage * itemsPerPage;
//   const currentItems = items.slice(offset, offset + itemsPerPage);
//   const pageCount = Math.ceil(parseFloat(items.length / itemsPerPage));

//   // Calculate amount of items that will be shown - for products
//   const offsetProduct = currentPageProduct * itemsPerPage;
//   // const currentItemsProduct = product_items.slice(
//   //   offsetProduct,
//   //   offsetProduct + itemsPerPage
//   // );
//   const pageCountProduct = Math.ceil(
//     parseFloat(product_items.length / itemsPerPage)
//   );

//   // Return here
//   return (
//     <div>
//       <div>
//         <Header
//           headerTitle={
//             isProductTab ? "Danh sách mặt hàng" : "Danh sách loại mặt hàng"
//           }
//         ></Header>
//       </div>

//       <div className="flex flex-wrap gap-5 xl:gap-16 2xl:gap-44 justify-center m-5">
//         {DWCardData.map((card, index) => (
//           <Card
//             key={index}
//             image={card.img}
//             description={card.description}
//             value={card.value}
//           />
//         ))}
//       </div>

//       <div className="m-5 p-5 bg-white shadow-lg">
//         {/* Tab for changing what to show */}
//         {isProductTab ? (
//           <div className="mt-6 text-md font-bold text-center text-gray-500">
//             <ul className="flex flex-wrap -mb-px">
//               <li className="me-2">
//                 <button className="inline-block p-4 border-b-2 rounded-t-lg text-blue-600 border-blue-600">
//                   Mặt hàng
//                 </button>
//               </li>
//               <li className="me-2">
//                 <button
//                   className="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-800"
//                   onClick={() => deactivateProductTab()}
//                 >
//                   Loại mặt hàng
//                 </button>
//               </li>
//             </ul>
//           </div>
//         ) : (
//           <div className="mt-6 text-md font-bold text-center text-gray-500">
//             <ul className="flex flex-wrap -mb-px">
//               <li className="me-2">
//                 <button
//                   className="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-800"
//                   onClick={() => activateProductTab()}
//                 >
//                   Mặt hàng
//                 </button>
//               </li>
//               <li className="me-2">
//                 <button className="inline-block p-4 border-b-2 rounded-t-lg text-blue-600 border-blue-600">
//                   Loại mặt hàng
//                 </button>
//               </li>
//             </ul>
//           </div>
//         )}

//         {isProductTab ? (
//           <div className="mt-5">
//             <div className="flex flex-wrap gap-3 justify-between">
//               <div className="flex flex-wrap gap-5 items-center justify-start">
//                 <p className="font-bold whitespace-nowrap">Tìm kiếm theo:</p>
//                 <select
//                   value={selectedOption}
//                   onChange={handleOptionChange}
//                   className="font-semibold text-lg py-3 px-3 rounded-md"
//                 >
//                   <option value="Tên mặt hàng">Tên mặt hàng</option>
//                   <option value="Tên loại mặt hàng">Tên loại mặt hàng</option>
//                 </select>
//                 <input
//                   type="text"
//                   placeholder={getPlaceholderText()}
//                   className="border border-black rounded-md py-0.5 px-2 text-lg w-24 lg:w-72 xl:w-96"
//                   value={productSearchTerm}
//                   onChange={(e) => setProductSearchTerm(e.target.value)}
//                 />
//               </div>
//               <NavLink to="/product-categorys/product-add-page">
//                 <Button />
//               </NavLink>
//             </div>

//             <table className="w-full mt-5 text-center">
//               <thead className="border-b-4 border-red-500">
//                 <tr className="text-md text-gray-500">
//                   <th scope="col"></th>
//                   <th scop="col" className="py-5 border-r-2">
//                     Hình ảnh
//                   </th>
//                   <th scope="col" className="py-5 border-r-2">
//                     Tên mặt hàng
//                   </th>
//                   <th scope="col" className="py-5 border-r-2">
//                     Đơn giá
//                   </th>
//                   <th scope="col" className="py-5 border-r-2">
//                     Số lượng tồn
//                   </th>
//                   <th scope="col" className="py-5 border-r-2">
//                     Tên DVT
//                   </th>
//                   <th scope="col" className="py-5 border-r-2">
//                     Tên loại mặt hàng
//                   </th>
//                   <th scope="col" className="py-5 border-r-2">
//                     Tên đại lý
//                   </th>
//                   <th scope="col"></th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {product_items.length > 0 ? (
//                   <>
//                     {product_items.map((list, index) => (
//                       <tr
//                         key={index}
//                         className="border-b border-slate-300 hover:bg-slate-200 text-md"
//                       >
//                         <td className="py-5 pl-3">
//                           <input type="checkbox" />
//                         </td>
//                         <td scope="row" className="py-5 border-r-2">
//                           <img
//                             width="250px"
//                             src={`data:image/jpeg;base64, ${list.Mathang.hinhanh}`}
//                             alt="Hình mặt hàng"
//                             className="rounded 2xl:h-20 2xl:w-40"
//                           ></img>
//                         </td>
//                         <td scope="row" className="py-5 border-r-2">
//                           {list.Mathang.tenmathang}
//                         </td>
//                         <td scope="row" className="py-5 border-r-2">
//                           {list.Mathang.dongia}
//                         </td>
//                         <td scope="row" className="py-5 border-r-2">
//                           {list.Mathang.soluongton}
//                         </td>
//                         <td scope="row" className="py-5 border-r-2">
//                           {list.Mathang.tendvt}
//                         </td>
//                         <td scope="row" className="py-5 border-r-2">
//                           {list.tenloaimathang}
//                         </td>
//                         <td scope="row" className="py-5 border-r-2">
//                           {list.tendaily}
//                         </td>
//                         <td scope="row">
//                           <div className="flex flex-wrap justify-center gap-3">
//                             <NavLink
//                               to={`product-edit-page/${list.Mathang.mamathang}`}
//                             >
//                               <button>
//                                 <div className="flex gap-2 bg-green-500 p-2 rounded-md">
//                                   <img src={EditIcon} alt="Icon chỉnh sửa" />
//                                   <p className="font-bold text-white hidden lg:block">
//                                     Chỉnh sửa
//                                   </p>
//                                 </div>
//                               </button>
//                             </NavLink>
//                             <button
//                               onClick={() =>
//                                 deleteProductData(list.Mathang.mamathang)
//                               }
//                             >
//                               <div className="flex gap-2 bg-amber-400 p-2 rounded-md">
//                                 <img src={TrashIcon} alt="Icon thùng rác" />
//                                 <p className="font-bold text-white hidden lg:block">
//                                   Xóa
//                                 </p>
//                               </div>
//                             </button>
//                           </div>
//                         </td>
//                       </tr>
//                     ))}
//                   </>
//                 ) : (
//                   <></>
//                 )}
//               </tbody>
//             </table>
//             <PaginationButtons
//               pageCount={pageCountProduct}
//               currentPage={currentPageProduct}
//               setCurrentPage={setCurrentPageProduct}
//             ></PaginationButtons>
//           </div>
//         ) : (
//           <div className="mt-5">
//             <div className="flex flex-wrap gap-3 justify-between">
//               <div className="flex flex-wrap gap-5 items-center justify-start">
//                 <p className="font-bold whitespace-nowrap">Tìm kiếm theo:</p>
//                 <select
//                   value={selectedOptionCat}
//                   onChange={handleOptionChangeCat}
//                   className="font-semibold text-lg py-3 px-3 rounded-md"
//                 >
//                   <option value="Tên loại mặt hàng">Tên loại mặt hàng</option>
//                 </select>
//                 <input
//                   type="text"
//                   placeholder={getPlaceholderText()}
//                   className="border border-black rounded-md py-0.5 px-2 text-lg w-24 lg:w-72 xl:w-96"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//               </div>
//               <NavLink to="/product-categorys/product-categorys-add-page">
//                 <Button />
//               </NavLink>
//             </div>

//             <table className="w-full mt-5 text-left">
//               <thead className="border-b-4 border-red-500">
//                 <tr className="text-md text-gray-500">
//                   <th scope="col"></th>
//                   <th scope="col" className="py-5 border-r-2">
//                     Tên loại mặt hàng{" "}
//                   </th>
//                   <th scope="col"></th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {currentItems.length > 0 ? (
//                   <>
//                     {currentItems.map((list, index) => (
//                       <tr
//                         key={index}
//                         className="border-b border-slate-300 hover:bg-slate-200 text-md"
//                       >
//                         <td className="py-5">
//                           <input type="checkbox" />
//                         </td>
//                         <td scope="row" className="py-5 border-r-2">
//                           {list.tenloaimathang}
//                         </td>
//                         <td scope="row">
//                           <div className="flex flex-wrap justify-center gap-3">
//                             <NavLink
//                               to={`product-categorys-edit-page/${list.maloaimathang}`}
//                             >
//                               <button>
//                                 <div className="flex gap-2 bg-green-500 p-2 rounded-md">
//                                   <img src={EditIcon} alt="Icon chỉnh sửa" />
//                                   <p className="font-bold text-white hidden sm:hidden md:hidden lg:inline-block">
//                                     Chỉnh sửa
//                                   </p>
//                                 </div>
//                               </button>
//                             </NavLink>
//                             <button
//                               onClick={() => deleteData(list.maloaimathang)}
//                             >
//                               <div className="flex gap-2 bg-amber-400 p-2 rounded-md">
//                                 <img src={TrashIcon} alt="Icon thùng rác" />
//                                 <p className="font-bold text-white hidden sm:hidden md:hidden lg:inline-block">
//                                   Xóa
//                                 </p>
//                               </div>
//                             </button>
//                           </div>
//                         </td>
//                       </tr>
//                     ))}
//                   </>
//                 ) : (
//                   <></>
//                 )}
//               </tbody>
//             </table>
//             <PaginationButtons
//               pageCount={pageCount}
//               currentPage={currentPage}
//               setCurrentPage={setCurrentPage}
//             ></PaginationButtons>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default ProductCategorys;
