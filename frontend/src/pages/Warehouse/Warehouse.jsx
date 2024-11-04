import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Import Context Here
import { useTheme } from "../../contexts/ThemeContext";

// Import Assets Here
import { getAllProducts } from "../../assets/Products/ProductData";
import { WarehouseDataCard } from "../../assets/Warehouses/WarehouseDataCard";

// Import Components Here
import Header from "../../components/Header";
import Card from "../../components/content/Card";
import PaginationButtons from "../../components/UI/PaginationButtons";

// Import Icons Here
import EditIcon from "../../images/icons/button/Edit.svg";

function Warehouse() {
  // Variables here
  // // For Theme Mode
  const { theme } = useTheme();
  // // For Multi-Language
  const { t } = useTranslation();
  const { Warehouses } = t("Sidebar");
  const { DC_Warehouses } = t("DataCard");
  const { SearchBy, SF_Products } = t("SearchFilter");
  const { Add, Edit, Delete } = t("Buttons");
  // // For fetching products data of the warehouse
  const [productData, setProductData] = useState([]);
  // // For searching products of the warehouse
  const [productSearchTerm, setProductSearchTerm] = useState("");
  const [productSearchResults, setProductSearchResults] = useState([]);
  // // For pagination products of the warehouse
  const [currentProductPage, setCurrentProductPage] = useState(0);
  const itemsPerPage = 5;
  // // For tracking the search-filter option and placeholder text on products of the warehouse
  const [productFilterOption, setProductFilterOption] = useState(
    SF_Products.Columns.Col1
  );

  // Use Effect here
  // // For getting all existing products of the warehouse
  useEffect(() => {
    const fetchData = async () => {
      try {
        const existedProduct = await getAllProducts();
        if (existedProduct.length === 0) {
          setProductData([]);
        } else {
          setProductData(existedProduct);
        }
      } catch (error) {
        console.error("Error while fetching: ", error);
      }
    };
    fetchData();
  }, []);

  // // For searching
  useEffect(() => {
    // Filtering products of the warehouse base on filter option and input text
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
  }, [productSearchTerm, productData, productFilterOption]);

  // Functions here
  // // For importing one product of warehouse
  // const importItem = async (id) => {
  //   console.alert("Import Product");
  // };
  // // For exporting one product of warehouse
  // const exportItem = async (id) => {
  //   console.alert("Export Product");
  // };

  // // For changing placeholder text base on the selected search-filter option
  const getPlaceholderText = () => {
    switch (productFilterOption) {
      case SF_Products.Columns.Col1:
        return SF_Products.Placeholders.Text1;
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
        return SF_Products.Placeholders.Text1;
    }
  };

  // Items for render
  const productItems = productSearchTerm ? productSearchResults : productData;

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

  // Return here
  return (
    <div>
      <div>
        <Header headerTitle={Warehouses}></Header>
      </div>
      <div className="m-5 flex flex-wrap justify-center gap-5 xl:gap-16 2xl:gap-44">
        {WarehouseDataCard(theme, DC_Warehouses).map((card, index) => (
          <Card
            key={index}
            image={card.img}
            description={card.description}
            value={card.value}
          />
        ))}
      </div>
      <div className="m-5 bg-white p-5 shadow-lg transition-colors duration-300 dark:bg-[#363636]">
        <div className="flex flex-wrap justify-between">
          <div className="flex flex-wrap items-center justify-start gap-5 my-5">
            <p className="text-lg whitespace-nowrap font-bold text-black transition-colors duration-300 dark:text-white">
              {SearchBy}
            </p>
            <select
              className="rounded-md border border-black bg-white px-3 py-0.5 text-lg font-semibold text-black transition-colors duration-300 dark:border-white dark:bg-[#363636] dark:text-white"
              value={productFilterOption}
              onChange={(e) => setProductFilterOption(e.target.value)}
            >
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
            </select>
            <input
              className="w-96 rounded-md border border-black bg-white px-2 py-0.5 text-lg text-black transition-colors duration-300 dark:border-white dark:bg-[#363636] dark:text-white"
              type="text"
              placeholder={getPlaceholderText()}
              value={productSearchTerm}
              onChange={(e) => setProductSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <table className="mt-5 w-full text-center text-black transition-colors duration-300 dark:text-white">
          <thead className="border-b-4 border-red-500">
            <tr className="text-lg">
              <th scope="col"></th>
              <th scop="col" className="py-5 border-r-2">
                Hình ảnh
              </th>
              <th className="border-r-2 py-5" scope="col">
                {SF_Products.Columns.Col1}
              </th>
              <th className="border-r-2 py-5" scope="col">
                {SF_Products.Columns.Col2}
              </th>
              <th className="border-r-2 py-5" scope="col">
                {SF_Products.Columns.Col3}
              </th>
              <th className="border-r-2 py-5" scope="col">
                {SF_Products.Columns.Col4}
              </th>
              <th className="border-r-2 py-5" scope="col">
                {SF_Products.Columns.Col5}
              </th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {currentProductItems.length >= 1 ? (
              <>
                {currentProductItems.map((list, index) => (
                  <tr
                    className="border-b border-slate-300 text-black transition-colors duration-300 hover:bg-slate-200 dark:border-white dark:text-white dark:hover:bg-slate-500"
                    key={index}
                  >
                    <td className="py-5 pl-3">
                      <input type="checkbox" />
                    </td>

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
                    <td scope="row">
                      <div className="flex justify-center gap-20">
                        <NavLink
                          className="flex items-center gap-2 rounded-lg bg-green-500 px-4 py-2 font-bold text-white"
                          to={"warehouse-import-page"}
                        >
                          <p className="hidden sm:hidden md:hidden lg:inline-block">
                            Nhập hàng
                          </p>
                          <img src={EditIcon} alt="Icon nhập hàng" />
                        </NavLink>
                        <NavLink
                          className="flex items-center gap-2 rounded-lg bg-amber-400 px-4 py-2 font-bold text-white"
                          to={"warehouse-export-page"}
                        >
                          <p className="hidden sm:hidden md:hidden lg:inline-block">
                            Xuất hàng
                          </p>
                          <img src={EditIcon} alt="Icon xuất hàng" />
                        </NavLink>
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
          pageCount={productPageCount}
          currentPage={currentProductPage}
          setCurrentPage={setCurrentProductPage}
        />
      </div>
    </div>
  );
}

export default Warehouse;
