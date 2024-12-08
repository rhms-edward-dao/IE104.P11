import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Import Contexts Here
import { useTheme } from "../../contexts/ThemeContext";
import { useAuth } from "../../contexts/AuthContext";
import { useStoreTab } from "../../contexts/StoreTabState";

// Import Assets Here
import {
  deleteExportBill,
  deleteImportBill,
  getAllExportBill,
  getAllImportBill,
  getExportBillByStoreId,
  getExportBillDetail,
  getImportBillByStoreId,
  getImportBillDetail,
} from "../../assets/Warehouses/WarehouseData";
import { WarehouseDataCard } from "../../assets/Warehouses/WarehouseDataCard";

// Import Components Here
import Header from "../../components/Header";
import Card from "../../components/content/Card";
import Button from "../../components/UI/Button";
import PaginationButtons from "../../components/UI/PaginationButtons";

// Import Icons Here
import EditIcon from "../../images/icons/button/Edit.svg";
import DetailIcon from "../../images/icons/button/SeeDetail.svg";
import DeleteIcon from "../../images/icons/button/Delete.svg";

const Warehouse = () => {
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
  const { Add, Detail, Delete, Edit } = t("Buttons");
  // // For Checking If Staff Account Or Not
  const { userInfo } = useAuth();
  // // For warehouse-tab here
  const { isWarehouseTab, activateWarehouseTab, deactivateWarehouseTab } =
    useStoreTab();
  // // For calculating statistic datacard
  const [statisticData, setStatisticData] = useState([]);
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
    SF_WarehouseImport.Columns.Col1,
  );
  const [exportFilterOption, setExportFilterOption] = useState(
    SF_WarehouseExport.Columns.Col1,
  );
  // // For table sorting
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" }); // Table Columns Header Sorting A-Z and Z-A

  // Use Effect here
  // // For getting all existing import or export bills
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get Existed Import Bills
        const existedImport = await getImportBillByStoreId(userInfo.storeID);
        // const existedImport = await getAllImportBill();
        if (existedImport.message === "Danh sách phiếu nhập hàng rỗng") {
          setImportData([]);
        } else {
          setImportData(existedImport);
        }
        // Get Existed Export Bills
        const existedExport = await getExportBillByStoreId(userInfo.storeID);
        // const existedExport = await getAllExportBill();
        if (existedExport.message === "Danh sách phiếu xuất hàng rỗng") {
          setExportData([]);
        } else {
          setExportData(existedExport);
        }
        const [card1, card2] = [
          existedImport.message === "Danh sách phiếu nhập hàng rỗng"
            ? 0
            : existedImport.reduce(
                (sum, item) => sum + item.Phieunhaphang.tongtien,
                0,
              ),
          existedExport.message === "Danh sách phiếu xuất hàng rỗng"
            ? 0
            : existedExport.reduce(
                (sum, item) => sum + item.Phieuxuathang.tongtien,
                0,
              ),
        ];
        setStatisticData({ card1: card1, card2: card2 });
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
  // // Handle import data sorting
  const handleImportSort = (key) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";

    const sortedData = [...importData].sort((a, b) => {
      const aValue = key.includes("Phieunhaphang")
        ? a.Phieunhaphang[key.split(".")[1]]
        : a[key];
      const bValue = key.includes("Phieunhaphang")
        ? b.Phieunhaphang[key.split(".")[1]]
        : b[key];

      if (aValue < bValue) return direction === "asc" ? -1 : 1;
      if (aValue > bValue) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setImportData(sortedData);
  };
  // // Handle export data sorting
  const handleExportSort = (key) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";

    const sortedData = [...exportData].sort((a, b) => {
      const aValue = key.includes("Phieuxuathang")
        ? a.Phieuxuathang[key.split(".")[1]]
        : a[key];
      const bValue = key.includes("Phieuxuathang")
        ? b.Phieuxuathang[key.split(".")[1]]
        : b[key];

      if (aValue < bValue) return direction === "asc" ? -1 : 1;
      if (aValue > bValue) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setExportData(sortedData);
  };
  // // For deleting one import bill
  const deleteAImportBill = async (id) => {
    const detailImportBill = await getImportBillDetail(id);
    const detailInfo = [];
    Object.keys(detailImportBill).forEach((index) => {
      const dongianhap = detailImportBill[index].Chitiet_pnh.dongianhap;
      const mact_pnh = detailImportBill[index].Chitiet_pnh.mact_pnh;
      const mamathang = detailImportBill[index].Chitiet_pnh.mamathang;
      const maphieunhap = detailImportBill[index].Chitiet_pnh.maphieunhap;
      const soluongnhap = detailImportBill[index].Chitiet_pnh.soluongnhap;

      detailInfo.push({
        dongianhap,
        mact_pnh,
        mamathang,
        maphieunhap,
        soluongnhap,
      });
    });

    const importResponse = await deleteImportBill(id, detailInfo);

    if (importResponse.message === "Xóa phiếu nhập hàng thất bại") {
      alert(importResponse.message);
    } else {
      alert(importResponse.message);
      setImportData(
        importData.filter((item) => item.Phieunhaphang.maphieunhap !== id),
      );
    }
  };
  // // For deleting one export bill
  const deleteAExportBill = async (id) => {
    const detailExportBill = await getExportBillDetail(id);
    const detailInfo = [];
    Object.keys(detailExportBill).forEach((index) => {
      const mact_pxh = detailExportBill[index].Chitiet_pxh.mact_pxh;
      const mamathang = detailExportBill[index].Chitiet_pxh.mamathang;
      const maphieuxuat = detailExportBill[index].Chitiet_pxh.maphieuxuat;
      const soluongxuat = detailExportBill[index].Chitiet_pxh.soluongxuat;

      detailInfo.push({
        mact_pxh,
        mamathang,
        maphieuxuat,
        soluongxuat,
      });
    });

    const exportResponse = await deleteExportBill(id, detailInfo);

    if (exportResponse.message === "Xóa phiếu xuất hàng thất bại") {
      alert(exportResponse.message);
    } else {
      alert(exportResponse.message);
      setExportData(
        exportData.filter((item) => item.Phieuxuathang.maphieuxuat !== id),
      );
    }
  };
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
        {WarehouseDataCard(theme, DC_Warehouses, statisticData).map(
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
                className={`inline-block rounded-t-lg border-b-2 p-2 transition-all duration-300 hover:scale-110 ${
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
          <div className="my-5 flex flex-wrap items-center justify-start gap-5">
            <p className="whitespace-nowrap font-bold text-black transition-colors duration-300 hover:cursor-default dark:text-white">
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
            <Button addBtn={Add} />
          </NavLink>
        </div>
        <table className="mt-5 w-full text-center text-black transition-colors duration-300 dark:text-white">
          <thead className="border-b-4 border-red-500">
            <tr className="text-lg">
              {isWarehouseTab ? (
                <>
                  <th
                    className="border-r-2 py-5 hover:cursor-default"
                    scope="col"
                  >
                    {SF_WarehouseImport.Columns.Col1}
                  </th>
                  <th
                    className="border-r-2 py-5 hover:cursor-pointer"
                    scope="col"
                    onClick={() => handleImportSort("Phieunhaphang.tongtien")}
                  >
                    {SF_WarehouseImport.Columns.Col2}
                    {sortConfig.key === "Phieunhaphang.tongtien" &&
                      (sortConfig.direction === "asc" ? " ▲" : " ▼")}
                  </th>
                  <th
                    className="border-r-2 py-5 hover:cursor-pointer"
                    scope="col"
                    onClick={() =>
                      handleImportSort("Phieunhaphang.tiendathanhtoan")
                    }
                  >
                    {SF_WarehouseImport.Columns.Col3}
                    {sortConfig.key === "Phieunhaphang.tiendathanhtoan" &&
                      (sortConfig.direction === "asc" ? " ▲" : " ▼")}
                  </th>
                  <th
                    className="border-r-2 py-5 hover:cursor-default"
                    scope="col"
                  >
                    {SF_WarehouseImport.Columns.Col4}
                  </th>
                </>
              ) : (
                <>
                  <th
                    className="border-r-2 py-5 hover:cursor-default"
                    scope="col"
                  >
                    {SF_WarehouseExport.Columns.Col1}
                  </th>
                  <th
                    className="border-r-2 py-5 hover:cursor-pointer"
                    scope="col"
                    onClick={() => handleExportSort("Phieuxuathang.tongtien")}
                  >
                    {SF_WarehouseExport.Columns.Col2}
                    {sortConfig.key === "Phieuxuathang.tongtien" &&
                      (sortConfig.direction === "asc" ? " ▲" : " ▼")}
                  </th>
                  <th
                    className="border-r-2 py-5 hover:cursor-default"
                    scope="col"
                  >
                    {SF_WarehouseExport.Columns.Col3}
                  </th>
                </>
              )}
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {(isWarehouseTab ? IItems : EItems).length >= 1 ? (
              <>
                {(isWarehouseTab ? IItems : EItems).map((list, index) => (
                  <tr
                    className="text-md border-b border-slate-300 text-black transition-colors duration-300 hover:bg-slate-200 dark:border-white dark:text-white dark:hover:bg-slate-500"
                    key={index}
                  >
                    {isWarehouseTab ? (
                      <>
                        <td
                          scope="row"
                          className="border-r-2 py-5 hover:cursor-default"
                        >
                          {list.Phieunhaphang.ngaylapphieu}
                        </td>
                        <td
                          scope="row"
                          className="border-r-2 py-5 hover:cursor-default"
                        >
                          {list.Phieunhaphang.tongtien}
                        </td>
                        <td
                          scope="row"
                          className="border-r-2 py-5 hover:cursor-default"
                        >
                          {list.Phieunhaphang.tiendathanhtoan}
                        </td>
                        <td
                          scope="row"
                          className="border-r-2 py-5 hover:cursor-default"
                        >
                          {list.Phieunhaphang.tinhtrang}
                        </td>
                      </>
                    ) : (
                      <>
                        <td
                          scope="row"
                          className="border-r-2 py-5 hover:cursor-default"
                        >
                          {list.Phieuxuathang.ngaylapphieu}
                        </td>
                        <td
                          scope="row"
                          className="border-r-2 py-5 hover:cursor-default"
                        >
                          {list.Phieuxuathang.tongtien}
                        </td>
                        <td
                          scope="row"
                          className="border-r-2 py-5 hover:cursor-default"
                        >
                          {list.tenkhachhang}
                        </td>
                      </>
                    )}
                    <td scope="row">
                      <div className="my-5 flex flex-wrap justify-center gap-5">
                        <NavLink
                          className="flex flex-wrap items-center gap-2 rounded-lg bg-gradient-to-r from-[#00b8e3] via-[#00cef1] to-[#00ecfa] px-4 py-2 font-bold text-white transition-all duration-300 hover:scale-105 hover:bg-gradient-to-l hover:from-[#00b8e3] hover:via-[#00cef1] hover:to-[#00ecfa]"
                          to={
                            isWarehouseTab
                              ? `warehouse-import-detail-page/${list.Phieunhaphang.maphieunhap}`
                              : `warehouse-export-detail-page/${list.Phieuxuathang.maphieuxuat}`
                          }
                        >
                          <p className="hidden lg:inline-block">{Detail}</p>
                          <img src={DetailIcon} alt="Icon chi tiết" />
                        </NavLink>
                        <NavLink
                          className="flex flex-wrap items-center gap-2 rounded-lg bg-gradient-to-r from-[#03DF04] via-[#2AED2D] to-[#62F163] px-4 py-2 font-bold text-white transition-all duration-300 hover:scale-105 hover:bg-gradient-to-l hover:from-[#03DF04] hover:via-[#2AED2D] hover:to-[#62F163]"
                          to={
                            isWarehouseTab
                              ? `warehouse-import-edit-page/${list.Phieunhaphang.maphieunhap}`
                              : `warehouse-export-edit-page/${list.Phieuxuathang.maphieuxuat}`
                          }
                        >
                          <p className="hidden lg:inline-block">{Edit}</p>
                          <img src={EditIcon} alt="Icon chỉnh sửa" />
                        </NavLink>
                        <button
                          className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#ff9f01] via-[#feb130] to-[#fdc360] px-4 py-2 font-bold text-white transition-all duration-300 hover:scale-105 hover:bg-gradient-to-l hover:from-[#ff9f01] hover:via-[#feb130] hover:to-[#fdc360]"
                          onClick={() =>
                            isWarehouseTab
                              ? deleteAImportBill(
                                  list.Phieunhaphang.maphieunhap,
                                )
                              : deleteAExportBill(
                                  list.Phieuxuathang.maphieuxuat,
                                )
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
          pageCount={isWarehouseTab ? importPageCount : exportPageCount}
          currentPage={isWarehouseTab ? currentImportPage : currentExportPage}
          setCurrentPage={
            isWarehouseTab ? setCurrentImportPage : setCurrentExportPage
          }
        />
      </div>
    </div>
  );
};

export default Warehouse;
