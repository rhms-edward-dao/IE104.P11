import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Import Contexts Here
import { useTheme } from "../../contexts/ThemeContext";
import { useStoreTab } from "../../contexts/StoreTabState";
import { useModal } from "../../contexts/ModalState";

// Import Assets Here
import { getAllStore, deleteStore } from "../../assets/Stores/StoreData";
import {
  getAllStoreCategory,
  deleteStoreCategory,
} from "../../assets/Stores/StoreCategoryData";
import { getAllImportBill } from "../../assets/Warehouses/WarehouseData";
import { StoreDataCard } from "../../assets/Stores/StoreDataCard";

// Import Components Here
import Header from "../../components/Header";
import Card from "../../components/content/Card";
import Button from "../../components/UI/Button";
import PaginationButtons from "../../components/UI/PaginationButtons";

// Import Icons Here
import MaintainanceIcon from "../../images/icons/button/Maintain.svg";
import EditIcon from "../../images/icons/button/Edit.svg";
import DeleteIcon from "../../images/icons/button/Delete.svg";

function Stores() {
  // Variables here
  // // For Theme Mode and Multi-Language
  const { theme } = useTheme();
  const { t } = useTranslation();
  const { Title } = t("Header");
  const { DC_Stores } = t("DataCard");
  const { Store, StoreCategory } = t("TabView");
  const { SearchBy, SF_Stores, SF_StoreCategories } = t("SearchFilter");
  const { Add, Edit, Delete } = t("Buttons");

  // // For store-tab here
  const { isStoreTab, activateStoreTab, deactivateStoreTab } = useStoreTab();
  const { openModal, setLng, setLat } = useModal();

  // // For calculating statistic datacard
  const [statisticData, setStatisticData] = useState([]);

  // // For fetching daily & loaidaily data
  const [storeData, setStoreData] = useState([]);
  const [storeCategoryData, setStoreCategoryData] = useState([]);

  // // For searching daily & loaidaily
  const [storeSearchTerm, setStoreSearchTerm] = useState("");
  const [storeCategorySearchTerm, setStoreCategorySearchTerm] = useState("");
  const [storeSearchResults, setStoreSearchResults] = useState([]);
  const [storeCategorySearchResults, setStoreCategorySearchResults] = useState(
    [],
  );

  // // For pagination daily & loaidaily
  const [currentStorePage, setCurrentStorePage] = useState(0);
  const [currentStoreCategoryPage, setCurrentStoreCategoryPage] = useState(0);
  const itemsPerPage = 5;

  // // For tracking the search-filter option and placeholder text on daily & loaidaily
  const [storeFilterOption, setStoreFilterOption] = useState(
    SF_Stores.Columns.Col1,
  );
  const [storeCategoryFilterOption, setStoreCategoryFilterOption] = useState(
    SF_StoreCategories.Columns.Col1,
  );

  // // For table sorting
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" }); // Table Columns Header Sorting A-Z and Z-A

  // Use Effect here
  // // For getting all existing stores or store categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get Existed Stores
        const existedStore = await getAllStore();
        if (existedStore.message === "Danh sách đại lý rỗng") {
          setStatisticData({ card1: 0, card2: 0, card3: 0 });
          setStoreData([]);
        } else {
          // Get Existed Import Bills
          const existedImport = await getAllImportBill();
          const [card1, card2, card3] = [
            existedStore.length,
            existedStore.reduce((sum, item) => sum + item.Daily.sotienno, 0),
            existedImport.message === "Danh sách phiếu nhập hàng rỗng"
              ? 0
              : existedImport.reduce(
                  (sum, item) => sum + item.Phieunhaphang.tongtien,
                  0,
                ),
          ];
          setStatisticData({ card1: card1, card2: card2, card3: card3 });
          setStoreData(existedStore);
        }
        // Get Exsisted Stores Category
        const existedStoreCategory = await getAllStoreCategory();
        if (existedStoreCategory.length === 0) {
          setStoreCategoryData([]);
        } else {
          setStoreCategoryData(existedStoreCategory);
        }
      } catch (error) {
        console.error("Error while fetching: ", error);
      }
    };
    fetchData();
  }, []);
  // // For searching
  useEffect(() => {
    // Filtering stores base on filter option and input text
    if (storeSearchTerm.trim() !== "") {
      const results = storeData.filter((item) => {
        if (storeFilterOption === SF_Stores.Columns.Col1) {
          return item.Daily.tendaily
            .toLowerCase()
            .includes(storeSearchTerm.toLowerCase());
        } else if (storeFilterOption === SF_Stores.Columns.Col2) {
          return item.tenloaidaily
            .toString()
            .toLowerCase()
            .includes(storeSearchTerm.toLowerCase());
        } else if (storeFilterOption === SF_Stores.Columns.Col3) {
          return item.Daily.ngaytiepnhan
            .toLowerCase()
            .includes(storeSearchTerm.toLowerCase());
        } else if (storeFilterOption === SF_Stores.Columns.Col4) {
          return item.Daily.sodienthoai
            .toLowerCase()
            .includes(storeSearchTerm.toLowerCase());
        } else if (storeFilterOption === SF_Stores.Columns.Col5) {
          return item.diachi
            .toLowerCase()
            .includes(storeSearchTerm.toLowerCase());
        }
        return false;
      });
      setStoreSearchResults(results);
    } else {
      setStoreSearchResults(storeData);
    }
    // Filtering stores category base on filter option and input text
    if (storeCategorySearchTerm.trim() !== "") {
      const results = storeCategoryData.filter((item) => {
        if (storeCategoryFilterOption === SF_StoreCategories.Columns.Col1) {
          return item.tenloaidaily
            .toLowerCase()
            .includes(storeCategorySearchTerm.toLowerCase());
        } else if (
          storeCategoryFilterOption === SF_StoreCategories.Columns.Col2
        ) {
          return item.sotiennotoida
            .toString()
            .toLowerCase()
            .includes(storeCategorySearchTerm.toLowerCase());
        }
        return false;
      });
      setStoreCategorySearchResults(results);
    } else {
      setStoreCategorySearchResults(storeCategoryData);
    }
  }, [
    storeSearchTerm,
    storeCategorySearchTerm,
    storeData,
    storeCategoryData,
    storeFilterOption,
    storeCategoryFilterOption,
  ]);

  // Functions here
  // // Handle store data sorting
  const handleStoreSort = (key) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";

    const sortedData = [...storeData].sort((a, b) => {
      const aValue = key.includes("Daily")
        ? a.Daily[key.split(".")[1]]
        : a[key];
      const bValue = key.includes("Daily")
        ? b.Daily[key.split(".")[1]]
        : b[key];

      if (aValue < bValue) return direction === "asc" ? -1 : 1;
      if (aValue > bValue) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setStoreData(sortedData);
  };
  // // Handle export data sorting
  const handleStoreCategorySort = (key) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";

    const sortedData = [...storeCategoryData].sort((a, b) => {
      const aValue = a[key];
      const bValue = b[key];

      if (aValue < bValue) return direction === "asc" ? -1 : 1;
      if (aValue > bValue) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setStoreCategoryData(sortedData);
  };
  // // For deleting one daily
  const deleteAStore = async (id) => {
    const storeResponse = await deleteStore(id);

    if (storeResponse.message === "Xóa đại lý thất bại") {
      alert(storeResponse.message);
    } else {
      alert(storeResponse.message);
      setStoreData(storeData.filter((item) => item.Daily.madaily !== id));
      const [card1, card2] = [
        storeData.filter((item) => item.Daily.madaily !== id).length,
        storeData
          .filter((item) => item.Daily.madaily !== id)
          .reduce((sum, item) => sum + item.Daily.sotienno, 0),
      ];
      setStatisticData({
        card1: card1,
        card2: card2,
        card3: statisticData.card3,
      });
    }
  };
  // // For deleting one loaidaily
  const deleteAStoreCategory = async (id) => {
    const storeCategoryResponse = await deleteStoreCategory(id);

    if (storeCategoryResponse.message === "Xóa loại đại lý thất bại") {
      alert(storeCategoryResponse.message);
    } else {
      alert(storeCategoryResponse.message);
      setStoreCategoryData(
        storeCategoryData.filter((item) => item.maloaidaily !== id),
      );
    }
  };

  // // For handling modal
  const handleOpenModal = (kinhdo, vido) => {
    setLng(kinhdo);
    setLat(vido);
    openModal();
  };

  // // For changing placeholder text base on the selected search-filter option
  const getPlaceholderText = () => {
    switch (isStoreTab ? storeFilterOption : storeCategoryFilterOption) {
      case `${
        isStoreTab ? SF_Stores.Columns.Col1 : SF_StoreCategories.Columns.Col1
      }`:
        return `${
          isStoreTab
            ? SF_Stores.Placeholders.Text1
            : SF_StoreCategories.Placeholders.Text1
        }`;
      case `${isStoreTab ? SF_Stores.Columns.Col2 : ""}`:
        return `${isStoreTab ? SF_Stores.Placeholders.Text2 : ""}`;
      case SF_Stores.Columns.Col4:
        return SF_Stores.Placeholders.Text4;
      case SF_Stores.Columns.Col5:
        return SF_Stores.Placeholders.Text5;
      default:
        return `${
          isStoreTab
            ? SF_Stores.Placeholders.Text1
            : SF_StoreCategories.Placeholders.Text1
        }`;
    }
  };

  // Items for render
  const storeItems = storeSearchTerm ? storeSearchResults : storeData;
  const storeCategoryItems = storeCategorySearchTerm
    ? storeCategorySearchResults
    : storeCategoryData;

  // Calculate offset for stores
  const storeOffset = currentStorePage * itemsPerPage;
  const currentStoreItems =
    storeItems.length > 0
      ? storeItems.slice(storeOffset, storeOffset + itemsPerPage)
      : [];
  const storePageCount =
    storeItems.length > 0
      ? Math.ceil(parseFloat(storeItems.length / itemsPerPage))
      : 0;
  // Calculate offset for store categories
  const storeCategoryOffset = currentStoreCategoryPage * itemsPerPage;
  const currentStoreCategoryItems =
    storeCategoryItems.length > 0
      ? storeCategoryItems.slice(
          storeCategoryOffset,
          storeCategoryOffset + itemsPerPage,
        )
      : [];
  const storeCategoryPageCount =
    storeCategoryItems.length > 0
      ? Math.ceil(parseFloat(storeCategoryItems.length / itemsPerPage))
      : 0;

  // Items for rendering
  const SItems = storeSearchTerm ? storeSearchResults : currentStoreItems;
  const CItems = storeCategorySearchTerm
    ? storeCategorySearchResults
    : currentStoreCategoryItems;
  // Return here
  return (
    <div>
      <div>
        <Header
          headerTitle={isStoreTab ? Title.Stores : Title.StoreCategories}
        ></Header>
      </div>
      <div className="m-5 flex flex-wrap justify-center gap-5">
        {StoreDataCard(theme, DC_Stores, statisticData).map((card, index) => (
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
                className={`inline-block rounded-t-lg border-b-2 p-2 transition-all duration-300 hover:scale-110 ${
                  isStoreTab
                    ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400"
                    : "border-gray-300 hover:text-gray-800 dark:border-gray-800 dark:hover:text-white"
                }`}
                onClick={() => (isStoreTab ? <></> : activateStoreTab())}
              >
                {Store}
              </button>
            </li>
            <li className="me-2">
              <button
                className={`inline-block rounded-t-lg border-b-2 p-2 transition-all duration-300 hover:scale-110 ${
                  isStoreTab
                    ? "border-gray-300 hover:text-gray-800 dark:border-gray-800 dark:hover:text-white"
                    : "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400"
                }`}
                onClick={() => (isStoreTab ? deactivateStoreTab() : <></>)}
              >
                {StoreCategory}
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
              value={isStoreTab ? storeFilterOption : storeCategoryFilterOption}
              onChange={(e) =>
                isStoreTab
                  ? setStoreFilterOption(e.target.value)
                  : setStoreCategoryFilterOption(e.target.value)
              }
            >
              {isStoreTab ? (
                <>
                  <option value={SF_Stores.Columns.Col1}>
                    {SF_Stores.Columns.Col1}
                  </option>
                  <option value={SF_Stores.Columns.Col2}>
                    {SF_Stores.Columns.Col2}
                  </option>
                  <option value={SF_Stores.Columns.Col4}>
                    {SF_Stores.Columns.Col4}
                  </option>
                  <option value={SF_Stores.Columns.Col5}>
                    {SF_Stores.Columns.Col5}
                  </option>
                </>
              ) : (
                <>
                  <option value={SF_StoreCategories.Columns.Col1}>
                    {SF_StoreCategories.Columns.Col1}
                  </option>
                </>
              )}
            </select>
            <input
              className="w-96 rounded-md border border-black bg-white px-2 py-0.5 text-lg text-black transition-colors duration-300 dark:border-white dark:bg-[#363636] dark:text-white"
              type="text"
              placeholder={getPlaceholderText()}
              value={isStoreTab ? storeSearchTerm : storeCategorySearchTerm}
              onChange={(e) =>
                isStoreTab
                  ? setStoreSearchTerm(e.target.value)
                  : setStoreCategorySearchTerm(e.target.value)
              }
            />
          </div>
          <NavLink
            className="my-5"
            to={isStoreTab ? "store-add-page" : "store-category-add-page"}
            state={{
              existedData: isStoreTab ? storeData : storeCategoryData,
            }}
          >
            <Button addBtn={Add} />
          </NavLink>
        </div>
        <table className="mt-5 w-full text-center text-black transition-colors duration-300 dark:text-white">
          <thead className="border-b-4 border-red-500">
            <tr className="text-lg">
              {isStoreTab ? (
                <>
                  <th className="border-r-2 py-5" scope="col"></th>
                  <th
                    className="border-r-2 py-5 hover:cursor-default"
                    scope="col"
                  >
                    {SF_Stores.Columns.Col1}
                  </th>
                  <th
                    className="border-r-2 py-5 hover:cursor-default"
                    scope="col"
                  >
                    {SF_Stores.Columns.Col2}
                  </th>
                  <th
                    className="border-r-2 py-5 hover:cursor-pointer"
                    scope="col"
                    onClick={() => handleStoreSort("Daily.ngaytiepnhan")}
                  >
                    {SF_Stores.Columns.Col3}
                    {sortConfig.key === "Daily.ngaytiepnhan" &&
                      (sortConfig.direction === "asc" ? " ▲" : " ▼")}
                  </th>
                  <th
                    className="border-r-2 py-5 hover:cursor-pointer"
                    scope="col"
                    onClick={() => handleStoreSort("Daily.sodienthoai")}
                  >
                    {SF_Stores.Columns.Col4}
                    {sortConfig.key === "Daily.sodienthoai" &&
                      (sortConfig.direction === "asc" ? " ▲" : " ▼")}
                  </th>
                  <th
                    className="border-r-2 py-5 hover:cursor-default"
                    scope="col"
                  >
                    {SF_Stores.Columns.Col5}
                  </th>
                </>
              ) : (
                <>
                  <th
                    className="border-r-2 py-5 hover:cursor-default"
                    scope="col"
                  >
                    {SF_StoreCategories.Columns.Col1}
                  </th>
                  <th
                    className="border-r-2 py-5 hover:cursor-pointer"
                    scope="col"
                    onClick={() => handleStoreCategorySort("sotiennotoida")}
                  >
                    {SF_StoreCategories.Columns.Col2}
                    {sortConfig.key === "sotiennotoida" &&
                      (sortConfig.direction === "asc" ? " ▲" : " ▼")}
                  </th>
                </>
              )}
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {(isStoreTab ? SItems : CItems).length >= 1 ? (
              <>
                {(isStoreTab ? SItems : CItems).map((list, index) => (
                  <tr
                    className="text-md border-b border-slate-300 text-black transition-colors duration-300 hover:bg-slate-200 dark:border-white dark:text-white dark:hover:bg-slate-500"
                    key={index}
                  >
                    {isStoreTab ? (
                      <>
                        <td
                          scope="row"
                          className="border-r-2 py-5 hover:cursor-default"
                        >
                          <img
                            width="250px"
                            src={`data:image/jpeg;base64, ${list.Daily.hinhanh}`}
                            alt="Hình đại lý"
                            className="rounded 2xl:h-20 2xl:w-20"
                          />
                        </td>
                        <td
                          scope="row"
                          className="border-r-2 py-5 hover:cursor-default"
                        >
                          {list.Daily.tendaily}
                        </td>
                        <td
                          scope="row"
                          className="border-r-2 py-5 hover:cursor-default"
                        >
                          {list.tenloaidaily}
                        </td>
                        <td
                          scope="row"
                          className="border-r-2 py-5 hover:cursor-default"
                        >
                          {list.Daily.ngaytiepnhan}
                        </td>
                        <td
                          scope="row"
                          className="border-r-2 py-5 hover:cursor-default"
                        >
                          {list.Daily.sodienthoai}
                        </td>
                        <td
                          scope="row"
                          className="border-r-2 py-5 hover:cursor-default"
                        >
                          <button
                            onClick={() =>
                              handleOpenModal(list.kinhdo, list.vido)
                            }
                          >
                            <p className="line-clamp-1 hover:underline">
                              {list.diachi}
                            </p>
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td
                          scope="row"
                          className="border-r-2 py-5 hover:cursor-default"
                        >
                          {list.tenloaidaily}
                        </td>
                        <td
                          scope="row"
                          className="border-r-2 py-5 hover:cursor-default"
                        >
                          {list.sotiennotoida}
                        </td>
                      </>
                    )}
                    <td scope="row">
                      <div className="m-3 flex flex-wrap gap-5">
                        {isStoreTab && (
                          <NavLink
                            className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#00b8e3] via-[#00cef1] to-[#00ecfa] px-4 py-2 font-bold text-white transition-all duration-300 hover:scale-105 hover:bg-gradient-to-l hover:from-[#00b8e3] hover:via-[#00cef1] hover:to-[#00ecfa]"
                            to={`/store-maintainance/${list.Daily.madaily}`}
                          >
                            <p className="hidden lg:inline-block">Bảo trì</p>
                            <img src={MaintainanceIcon} alt="Icon bảo trì" />
                          </NavLink>
                        )}
                        <NavLink
                          className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#03DF04] via-[#2AED2D] to-[#62F163] px-4 py-2 font-bold text-white transition-all duration-300 hover:scale-105 hover:bg-gradient-to-l hover:from-[#03DF04] hover:via-[#2AED2D] hover:to-[#62F163]"
                          to={
                            isStoreTab
                              ? `store-edit-page/${list.Daily.madaily}`
                              : `store-category-edit-page/${list.maloaidaily}`
                          }
                          state={{
                            existedData: isStoreTab
                              ? storeData
                              : storeCategoryData,
                          }}
                        >
                          <p className="hidden lg:inline-block">{Edit}</p>
                          <img src={EditIcon} alt="Icon chỉnh sửa" />
                        </NavLink>
                        <button
                          className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#ff9f01] via-[#feb130] to-[#fdc360] px-4 py-2 font-bold text-white transition-all duration-300 hover:scale-105 hover:bg-gradient-to-l hover:from-[#ff9f01] hover:via-[#feb130] hover:to-[#fdc360]"
                          onClick={() =>
                            isStoreTab
                              ? deleteAStore(list.Daily.madaily)
                              : deleteAStoreCategory(list.maloaidaily)
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
          pageCount={isStoreTab ? storePageCount : storeCategoryPageCount}
          currentPage={isStoreTab ? currentStorePage : currentStoreCategoryPage}
          setCurrentPage={
            isStoreTab ? setCurrentStorePage : setCurrentStoreCategoryPage
          }
        />
      </div>
    </div>
  );
}

export default Stores;
