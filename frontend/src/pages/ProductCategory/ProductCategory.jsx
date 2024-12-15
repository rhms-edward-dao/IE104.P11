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
  // // For calculating statistic datacard
  const [statisticData, setStatisticData] = useState([]);
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
    SF_Products.Columns.Col1,
  );
  const [productCategoryFilterOption, setProductCategoryFilterOption] =
    useState(SF_ProductCategories.Columns.Col1);
  // // For table sorting
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" }); // Table Columns Header Sorting A-Z and Z-A

  // Use Effect here
  // // For getting all existing products and product categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get Exsisted Products
        const existedProduct = await getAllProducts();
        if (existedProduct.message === "Danh sách mặt hàng rỗng") {
          setStatisticData({ card1: 0, card2: 0, card3: 0 });
          setProductData([]);
        } else {
          const [card1, card2, card3] = [
            existedProduct.length,
            existedProduct.reduce(
              (sum, item) =>
                sum + item.Mathang.dongia * item.Mathang.soluongton,
              0,
            ),
            existedProduct.reduce(
              (count, item) =>
                [0].includes(item.Mathang.soluongton) ? count + 1 : count,
              0,
            ),
          ];
          setStatisticData({ card1: card1, card2: card2, card3: card3 });
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
  // // Handle sorting
  const handleSort = (key) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";

    const sortedData = [...productData].sort((a, b) => {
      const aValue = key.includes("Mathang")
        ? a.Mathang[key.split(".")[1]]
        : a[key];
      const bValue = key.includes("Mathang")
        ? b.Mathang[key.split(".")[1]]
        : b[key];

      if (aValue < bValue) return direction === "asc" ? -1 : 1;
      if (aValue > bValue) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setProductData(sortedData);
  };
  // // For deleting one product
  const deleteAProduct = async (id) => {
    const productResponse = await deleteProduct(id);

    if (productResponse.message === "Xóa mặt hàng thất bại") {
      alert(productResponse.message);
    } else {
      alert(productResponse.message);
      setProductData(
        productData.filter((item) => item.Mathang.mamathang !== id),
      );
      const [card1, card2, card3] = [
        productData.filter((item) => item.Mathang.mamathang !== id).length,
        productData
          .filter((item) => item.Mathang.mamathang !== id)
          .reduce(
            (sum, item) => sum + item.Mathang.dongia * item.Mathang.soluongton,
            0,
          ),
        productData
          .filter((item) => item.Mathang.mamathang !== id)
          .reduce(
            (count, item) =>
              [0].includes(item.Mathang.soluongton) ? count + 1 : count,
            0,
          ),
      ];
      setStatisticData({ card1: card1, card2: card2, card3: card3 });
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
        productCategoryData.filter((item) => item.maloaimathang !== id),
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
          productCategoryOffset + itemsPerPage,
        )
      : [];
  const productCategoryPageCount =
    productCategoryItems.length > 0
      ? Math.ceil(parseFloat(productCategoryItems.length / itemsPerPage))
      : 0;
  // Items for rendering
  const PItems = productSearchTerm ? productSearchResults : currentProductItems;
  const CItems = productCategorySearchTerm
    ? productCategorySearchResults
    : currentProductCategoryItems;
  // Return here
  return (
    <div className="h-screen">
      <div>
        <Header
          headerTitle={isProductTab ? Title.Products : Title.ProductCategories}
        ></Header>
      </div>
      <div className="m-5 flex flex-wrap justify-center gap-5">
        {ProductDataCard(theme, DC_Products, statisticData).map(
          (card, index) => (
            <Card
              key={index}
              image={card.img}
              description={card.description}
              value={card.value}
            />
          ),
        )}
      </div>
      <div className="m-5 bg-white p-5 shadow-lg transition-colors duration-300 dark:bg-[#363636]">
        {/* Tab for changing what to show */}
        <div className="text-md mb-6 text-center font-bold text-gray-500 dark:text-gray-200">
          <ul className="-mb-px flex flex-wrap">
            <li className="me-2">
              <button
                className={`inline-block rounded-t-lg border-b-2 p-2 transition-all duration-300 hover:scale-110 ${
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
                className={`inline-block rounded-t-lg border-b-2 p-2 transition-all duration-300 hover:scale-110 ${
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
        <div className="flex flex-wrap justify-between">
          <div className="flex flex-wrap items-center justify-start gap-5">
            <p className="whitespace-nowrap font-bold text-black transition-colors duration-300 hover:cursor-default dark:text-white">
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
          {isProductTab ? (
            <></>
          ) : (
            <NavLink
              className="my-5"
              to={"product-categorys-add-page"}
              state={{
                existedData: isProductTab ? productData : productCategoryData,
              }}
            >
              <Button addBtn={Add} />
            </NavLink>
          )}
        </div>
        <table className="mt-5 w-full text-center text-black transition-colors duration-300 dark:text-white">
          <thead className="border-b-4 border-red-500">
            <tr className="text-lg">
              {isProductTab ? (
                <>
                  <th scop="col" className="border-r-2 py-5"></th>
                  <th
                    className="border-r-2 py-5 hover:cursor-default"
                    scope="col"
                  >
                    {SF_Products.Columns.Col1}
                  </th>
                  <th
                    className="border-r-2 py-5 hover:cursor-pointer"
                    scope="col"
                    onClick={() => handleSort("Mathang.dongia")}
                  >
                    {SF_Products.Columns.Col2}
                    {sortConfig.key === "Mathang.dongia" &&
                      (sortConfig.direction === "asc" ? " ▲" : " ▼")}
                  </th>
                  <th
                    className="border-r-2 py-5 hover:cursor-pointer"
                    scope="col"
                    onClick={() => handleSort("Mathang.soluongton")}
                  >
                    {SF_Products.Columns.Col3}
                    {sortConfig.key === "Mathang.soluongton" &&
                      (sortConfig.direction === "asc" ? " ▲" : " ▼")}
                  </th>
                  <th
                    className="border-r-2 py-5 hover:cursor-default"
                    scope="col"
                  >
                    {SF_Products.Columns.Col4}
                  </th>
                  <th
                    className="border-r-2 py-5 hover:cursor-default"
                    scope="col"
                  >
                    {SF_Products.Columns.Col5}
                  </th>
                  <th
                    className="border-r-2 py-5 hover:cursor-default"
                    scope="col"
                  >
                    {SF_Products.Columns.Col6}
                  </th>
                </>
              ) : (
                <>
                  <th
                    className="border-r-2 py-5 hover:cursor-default"
                    scope="col"
                  >
                    {SF_ProductCategories.Columns.Col1}
                  </th>
                </>
              )}
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {(isProductTab ? PItems : CItems).length >= 1 ? (
              <>
                {(isProductTab ? PItems : CItems).map((list, index) => (
                  <tr
                    className="text-md border-b border-slate-300 text-black transition-colors duration-300 hover:bg-slate-200 dark:border-white dark:text-white dark:hover:bg-slate-500"
                    key={index}
                  >
                    {isProductTab ? (
                      <>
                        <td
                          scope="row"
                          className="border-r-2 py-5 hover:cursor-default"
                        >
                          <img
                            width="250px"
                            src={`data:image/jpeg;base64, ${list.Mathang.hinhanh}`}
                            alt="Hình đại lý"
                            className="rounded 2xl:h-20 2xl:w-20"
                          />
                        </td>
                        <td
                          scope="row"
                          className="border-r-2 py-5 hover:cursor-default"
                        >
                          {list.Mathang.tenmathang}
                        </td>
                        <td
                          scope="row"
                          className="border-r-2 py-5 hover:cursor-default"
                        >
                          {list.Mathang.dongia}
                        </td>
                        <td
                          scope="row"
                          className="border-r-2 py-5 hover:cursor-default"
                        >
                          {list.Mathang.soluongton}
                        </td>
                        <td
                          scope="row"
                          className="border-r-2 py-5 hover:cursor-default"
                        >
                          {list.Mathang.tendvt}
                        </td>
                        <td
                          scope="row"
                          className="border-r-2 py-5 hover:cursor-default"
                        >
                          {list.tenloaimathang}
                        </td>
                        <td
                          scope="row"
                          className="border-r-2 py-5 hover:cursor-default"
                        >
                          {list.tendaily}
                        </td>
                      </>
                    ) : (
                      <>
                        <td
                          scope="row"
                          className="border-r-2 py-5 hover:cursor-default"
                        >
                          {list.tenloaimathang}
                        </td>
                      </>
                    )}
                    <td scope="row">
                      <div className="my-5 flex flex-wrap justify-center gap-5">
                        <NavLink
                          className="flex flex-wrap items-center gap-2 rounded-lg bg-gradient-to-r from-[#03DF04] via-[#2AED2D] to-[#62F163] px-4 py-2 font-bold text-white transition-all duration-300 hover:scale-105 hover:bg-gradient-to-l hover:from-[#03DF04] hover:via-[#2AED2D] hover:to-[#62F163]"
                          to={
                            isProductTab
                              ? `product-edit-page/${list.Mathang.mamathang}`
                              : `product-categorys-edit-page/${list.maloaimathang}`
                          }
                          state={{
                            existedData: isProductTab
                              ? productData
                              : productCategoryData,
                          }}
                        >
                          <p className="hidden lg:inline-block">{Edit}</p>
                          <img src={EditIcon} alt="Icon chỉnh sửa" />
                        </NavLink>
                        <button
                          className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#ff9f01] via-[#feb130] to-[#fdc360] px-4 py-2 font-bold text-white transition-all duration-300 hover:scale-105 hover:bg-gradient-to-l hover:from-[#ff9f01] hover:via-[#feb130] hover:to-[#fdc360]"
                          onClick={() =>
                            isProductTab
                              ? deleteAProduct(list.Mathang.mamathang)
                              : deleteAProductCategory(list.maloaimathang)
                          }
                        >
                          <p className="hidden lg:inline-block">{Delete}</p>
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
