import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Import Contexts Here
import { useTheme } from "../../contexts/ThemeContext";
import { useAuth } from "../../contexts/AuthContext";
import { useStoreTab } from "../../contexts/StoreTabState";

// Import Assets Here
import {
  getAllExportBill,
  getAllImportBill,
  getExportBillByStoreId,
  getImportBillByStoreId,
} from "../../assets/Warehouses/WarehouseData";
import { WarehouseDataCard } from "../../assets/Warehouses/WarehouseDataCard";

// Import Components Here
import Header from "../../components/Header";
import Card from "../../components/content/Card";
import Button from "../../components/UI/Button";
import PaginationButtons from "../../components/UI/PaginationButtons";

// Import Icons Here
import DetailIcon from "../../images/icons/button/SeeDetail.svg";

function Warehouse() {
  // Variables here
  // // For Theme Mode
  const { theme } = useTheme();
  // // For Multi-Language
  const { t } = useTranslation();
  const { Title } = t("Header");
  const { DC_Warehouses } = t("DataCard");
  const { Import, Export } = t("TabView");
  const { SearchBy, SF_WarehouseImport, SF_WarehouseExport } =
    t("SearchFilter");
  const { Detail } = t("Buttons");
  // // For Checking If Staff Account Or Not
  const { userInfo } = useAuth();
  // // For warehouse-tab here
  const { isWarehouseTab, activateWarehouseTab, deactivateWarehouseTab } =
    useStoreTab();
  // // For fetching import & export bills data
  const [importData, setImportData] = useState([]);
  const [exportData, setExportData] = useState([]);
  // // For searching import & export bills
  const [importSearchTerm, setImportSearchTerm] = useState("");
  const [exportSearchTerm, setExportSearchTerm] = useState("");
  const [importSearchResults, setImportSearchResults] = useState([]);
  const [exportSearchResults, setExportSearchResults] = useState([]);
  // // For pagination import & export
  const [currentImportPage, setCurrentImportPage] = useState(0);
  const [currentExportPage, setCurrentExportPage] = useState(0);
  const itemsPerPage = 5;
  // For tracking the search-filter option and placeholder text on import & export bills
  const [importFilterOption, setImportFilterOption] = useState(
    SF_WarehouseImport.Columns.Col1
  );
  const [exportFilterOption, setExportFilterOption] = useState(
    SF_WarehouseExport.Columns.Col1
  );

  // Use Effect here
  // // For getting all existing import or export bills
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get Existed Import Bills
        // const existedImport = await getImportBillByStoreId(userInfo.storeID);
        const existedImport = await getAllImportBill();
        if (existedImport.length === 0) {
          setImportData([]);
        } else {
          setImportData(existedImport);
        }
        // Get Existed Export Bills
        // const existedExport = await getExportBillByStoreId(userInfo.storeID);
        const existedExport = await getAllExportBill();
        if (existedExport.length === 0) {
          setExportData([]);
        } else {
          setExportData(existedExport);
        }
      } catch (error) {
        console.error("Error while fetching: ", error);
      }
    };
    fetchData();
  }, []);
  // // For searching
  useEffect(() => {
    // Filtering import bills base on filter option and input text
    if (importSearchTerm.trim() !== "") {
      const results = importData.filter((item) => {
        if (importFilterOption === SF_WarehouseImport.Columns.Col1) {
          return item.Phieunhaphang.ngaylapphieu
            .toLowerCase()
            .includes(importSearchTerm.toLowerCase());
        } else if (importFilterOption === SF_WarehouseImport.Columns.Col3) {
          return item.Phieunhaphang.tongtien
            .toLowerCase()
            .includes(importSearchTerm.toLowerCase());
        } else if (importFilterOption === SF_WarehouseImport.Columns.Col4) {
          return item.Phieunhaphang.tiendathanhtoan
            .toLowerCase()
            .includes(importSearchTerm.toLowerCase());
        } else if (importFilterOption === SF_WarehouseImport.Columns.Col4) {
          return item.Phieunhaphang.tinhtrang
            .toLowerCase()
            .includes(importSearchTerm.toLowerCase());
        }
      });
      setImportSearchResults(results);
    } else {
      setImportSearchResults(importData);
    }
    // Filtering export bills base on filter option and input text
    if (exportSearchTerm.trim() !== "") {
      const results = exportData.filter((item) => {
        if (exportFilterOption === SF_WarehouseExport.Columns.Col1) {
          return item.Phieuxuathang.ngaylapphieu
            .toLowerCase()
            .includes(exportSearchTerm.toLowerCase());
        } else if (exportFilterOption === SF_WarehouseExport.Columns.Col2) {
          return item.Phieuxuathang.tongtien
            .toString()
            .includes(exportSearchTerm.toLowerCase());
        } else {
          return item.tenkhachhang
            .toString()
            .includes(exportSearchTerm.toLowerCase());
        }
      });
      setExportSearchResults(results);
    } else {
      setExportSearchResults(exportData);
    }
  }, [
    importSearchTerm,
    exportSearchTerm,
    importData,
    exportData,
    importFilterOption,
    exportFilterOption,
  ]);

  // Functions here
  // // For changing placeholder text base on the selected search-filter option
  const getPlaceholderText = () => {
    switch (isWarehouseTab ? importFilterOption : exportFilterOption) {
      case `${
        isWarehouseTab
          ? SF_WarehouseImport.Columns.Col1
          : SF_WarehouseExport.Columns.Col1
      }`:
        return `${
          isWarehouseTab
            ? SF_WarehouseImport.Placeholders.Text1
            : SF_WarehouseExport.Placeholders.Text1
        }`;
      case `${
        isWarehouseTab
          ? SF_WarehouseImport.Columns.Col2
          : SF_WarehouseExport.Columns.Col2
      }`:
        return `${
          isWarehouseTab
            ? SF_WarehouseImport.Placeholders.Text2
            : SF_WarehouseExport.Placeholders.Text2
        }`;
      case `${
        isWarehouseTab
          ? SF_WarehouseImport.Columns.Col3
          : SF_WarehouseExport.Columns.Col3
      }`:
        return `${
          isWarehouseTab
            ? SF_WarehouseImport.Placeholders.Text3
            : SF_WarehouseExport.Placeholders.Text3
        }`;
      case SF_WarehouseImport.Columns.Col4:
        return SF_WarehouseImport.Placeholders.Text4;
      default:
        return `${
          isWarehouseTab
            ? SF_WarehouseImport.Placeholders.Text1
            : SF_WarehouseExport.Placeholders.Text1
        }`;
    }
  };

  // Items for render
  const importItems = importSearchTerm ? importSearchResults : importData;
  const exportItems = exportSearchTerm ? exportSearchResults : exportData;

  // Calculate offset for import bills
  const importOffset = currentImportPage * itemsPerPage;
  const currentImportItems =
    importItems.length > 0
      ? importItems.slice(importOffset, importOffset + itemsPerPage)
      : [];
  const importPageCount =
    importItems.length > 0
      ? Math.ceil(parseFloat(importItems.length / itemsPerPage))
      : 0;
  // Calculate offset for export bills
  const exportOffset = currentExportPage * itemsPerPage;
  const currentExportItems =
    exportItems.length > 0
      ? exportItems.slice(exportOffset, exportOffset + itemsPerPage)
      : [];
  const exportPageCount =
    exportItems.length > 0
      ? Math.ceil(parseFloat(exportItems.length / itemsPerPage))
      : 0;
  // Items for rendering
  const IItems = importSearchTerm ? importSearchResults : currentImportItems;
  const EItems = exportSearchTerm ? exportSearchResults : currentExportItems;
  // Return render here
  return (
    <div>
      <div>
        <Header
          headerTitle={
            isWarehouseTab ? Title.WarehouseImport : Title.WarehouseExport
          }
        ></Header>
      </div>
      <div className="m-5 flex flex-wrap justify-center gap-5">
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
        {/* Tab for changing what to show */}
        <div className="text-md mb-6 text-center font-bold text-gray-500 dark:text-gray-200">
          <ul className="-mb-px flex flex-wrap">
            <li className="me-2">
              <button
                className={`inline-block rounded-t-lg border-b-2 p-2 transition-colors duration-300 ${
                  isWarehouseTab
                    ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400"
                    : "border-gray-300 hover:text-gray-800 dark:border-gray-800 dark:hover:text-white"
                }`}
                onClick={() =>
                  isWarehouseTab ? <></> : activateWarehouseTab()
                }
              >
                {Import}
              </button>
            </li>
            <li className="me-2">
              <button
                className={`inline-block rounded-t-lg border-b-2 p-2 transition-colors duration-300 ${
                  isWarehouseTab
                    ? "border-gray-300 hover:text-gray-800 dark:border-gray-800 dark:hover:text-white"
                    : "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400"
                }`}
                onClick={() =>
                  isWarehouseTab ? deactivateWarehouseTab() : <></>
                }
              >
                {Export}
              </button>
            </li>
          </ul>
        </div>
        <div className="flex flex-wrap justify-between">
          <div className="flex flex-wrap items-center justify-start gap-5 my-5">
            <p className="whitespace-nowrap font-bold text-black transition-colors duration-300 dark:text-white">
              {SearchBy}
            </p>
            <select
              className="rounded-md border border-black bg-white px-3 py-0.5 text-lg font-semibold text-black transition-colors duration-300 dark:border-white dark:bg-[#363636] dark:text-white"
              value={isWarehouseTab ? importFilterOption : exportFilterOption}
              onChange={(e) =>
                isWarehouseTab
                  ? setImportFilterOption(e.target.value)
                  : setExportFilterOption(e.target.value)
              }
            >
              {isWarehouseTab ? (
                <>
                  <option value={SF_WarehouseImport.Columns.Col1}>
                    {SF_WarehouseImport.Columns.Col1}
                  </option>
                  <option value={SF_WarehouseImport.Columns.Col2}>
                    {SF_WarehouseImport.Columns.Col2}
                  </option>
                  <option value={SF_WarehouseImport.Columns.Col3}>
                    {SF_WarehouseImport.Columns.Col3}
                  </option>
                  <option value={SF_WarehouseImport.Columns.Col4}>
                    {SF_WarehouseImport.Columns.Col4}
                  </option>
                </>
              ) : (
                <>
                  <option value={SF_WarehouseExport.Columns.Col1}>
                    {SF_WarehouseExport.Columns.Col1}
                  </option>
                  <option value={SF_WarehouseExport.Columns.Col2}>
                    {SF_WarehouseExport.Columns.Col2}
                  </option>
                  <option value={SF_WarehouseExport.Columns.Col3}>
                    {SF_WarehouseExport.Columns.Col3}
                  </option>
                </>
              )}
            </select>
            <input
              className="w-96 rounded-md border border-black bg-white px-2 py-0.5 text-lg text-black transition-colors duration-300 dark:border-white dark:bg-[#363636] dark:text-white"
              type="text"
              placeholder={getPlaceholderText()}
              value={isWarehouseTab ? importSearchTerm : exportSearchTerm}
              onChange={(e) =>
                isWarehouseTab
                  ? setImportSearchTerm(e.target.value)
                  : setExportSearchTerm(e.target.value)
              }
            />
          </div>
          <NavLink
            className="my-5"
            to={
              isWarehouseTab
                ? "warehouse-import-add-page"
                : "warehouse-export-add-page"
            }
          >
            <Button />
          </NavLink>
        </div>
        <table className="mt-5 w-full text-center text-black transition-colors duration-300 dark:text-white">
          <thead className="border-b-4 border-red-500">
            <tr className="text-lg">
              <th scope="col"></th>
              {isWarehouseTab ? (
                <>
                  <th className="border-r-2 py-5" scope="col">
                    {SF_WarehouseImport.Columns.Col1}
                  </th>
                  <th className="border-r-2 py-5" scope="col">
                    {SF_WarehouseImport.Columns.Col2}
                  </th>
                  <th className="border-r-2 py-5" scope="col">
                    {SF_WarehouseImport.Columns.Col3}
                  </th>
                  <th className="border-r-2 py-5" scope="col">
                    {SF_WarehouseImport.Columns.Col4}
                  </th>
                </>
              ) : (
                <>
                  <th className="border-r-2 py-5" scope="col">
                    {SF_WarehouseExport.Columns.Col1}
                  </th>
                  <th className="border-r-2 py-5" scope="col">
                    {SF_WarehouseExport.Columns.Col2}
                  </th>
                  <th className="border-r-2 py-5" scope="col">
                    {SF_WarehouseExport.Columns.Col3}
                  </th>
                </>
              )}
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {(isWarehouseTab ? IItems : EItems)
              .length >= 1 ? (
              <>
                {(isWarehouseTab ? IItems : EItems).map(
                  (list, index) => (
                    <tr
                      className="text-md border-b border-slate-300 text-black transition-colors duration-300 hover:bg-slate-200 dark:border-white dark:text-white dark:hover:bg-slate-500"
                      key={index}
                    >
                      <td className="py-5 pl-3">
                        <input type="checkbox" />
                      </td>
                      {isWarehouseTab ? (
                        <>
                          <td scope="row" className="border-r-2 py-5">
                            {list.Phieunhaphang.ngaylapphieu}
                          </td>
                          <td scope="row" className="border-r-2 py-5">
                            {list.Phieunhaphang.tongtien}
                          </td>
                          <td scope="row" className="border-r-2 py-5">
                            {list.Phieunhaphang.tiendathanhtoan}
                          </td>
                          <td scope="row" className="border-r-2 py-5">
                            {list.Phieunhaphang.tinhtrang}
                          </td>
                        </>
                      ) : (
                        <>
                          <td scope="row" className="border-r-2 py-5">
                            {list.Phieuxuathang.ngaylapphieu}
                          </td>
                          <td scope="row" className="border-r-2 py-5">
                            {list.Phieuxuathang.tongtien}
                          </td>
                          <td scope="row" className="border-r-2 py-5">
                            {list.tenkhachhang}
                          </td>
                        </>
                      )}
                      <td scope="row">
                        <div className="flex flex-wrap justify-center gap-5 my-5">
                          <NavLink
                            className="flex flex-wrap items-center gap-2 rounded-lg bg-cyan-500 px-4 py-2 font-bold text-white"
                            to={
                              isWarehouseTab
                                ? `warehouse-import-detail-page/${list.Phieunhaphang.maphieunhap}`
                                : `warehouse-export-detail-page/${list.Phieuxuathang.maphieuxuat}`
                            }
                          >
                            <p className="hidden lg:inline-block">{Detail}</p>
                            <img src={DetailIcon} alt="Icon chi tiết" />
                          </NavLink>
                        </div>
                      </td>
                    </tr>
                  )
                )}
              </>
            ) : (
              <></>
            )}
          </tbody>
        </table>
        <PaginationButtons
          pageCount={isWarehouseTab ? importPageCount : exportPageCount}
          currentPage={isWarehouseTab ? currentImportPage : currentExportPage}
          setCurrentPage={
            isWarehouseTab ? setCurrentImportPage : setCurrentExportPage
          }
        />
      </div>
    </div>
  );
}

export default Warehouse;
