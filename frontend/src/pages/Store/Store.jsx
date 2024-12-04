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

  // // For fetching daily & loaidaily data
  const [storeData, setStoreData] = useState([]);
  const [storeCategoryData, setStoreCategoryData] = useState([]);

  // // For searching daily & loaidaily
  const [storeSearchTerm, setStoreSearchTerm] = useState("");
  const [storeCategorySearchTerm, setStoreCategorySearchTerm] = useState("");
  const [storeSearchResults, setStoreSearchResults] = useState([]);
  const [storeCategorySearchResults, setStoreCategorySearchResults] = useState(
    []
  );

  // // For pagination daily & loaidaily
  const [currentStorePage, setCurrentStorePage] = useState(0);
  const [currentStoreCategoryPage, setCurrentStoreCategoryPage] = useState(0);
  const itemsPerPage = 5;

  // For tracking the search-filter option and placeholder text on daily & loaidaily
  const [storeFilterOption, setStoreFilterOption] = useState(
    SF_Stores.Columns.Col1
  );
  const [storeCategoryFilterOption, setStoreCategoryFilterOption] = useState(
    SF_StoreCategories.Columns.Col1
  );

  // Use Effect here
  // // For getting all existing stores or store categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get Exsisted Stores
        const existedStore = await getAllStore();
        if (existedStore.length === 0) {
          setStoreData([]);
        } else {
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
  // // For deleting one daily
  const deleteAStore = async (id) => {
    const storeResponse = await deleteStore(id);

    if (storeResponse.message === "Xóa đại lý thất bại") {
      alert(storeResponse.message);
    } else {
      alert(storeResponse.message);
      setStoreData(storeData.filter((item) => item.Daily.madaily !== id));
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
        storeCategoryData.filter((item) => item.maloaidaily !== id)
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
          storeCategoryOffset + itemsPerPage
        )
      : [];
  const storeCategoryPageCount =
    storeCategoryItems.length > 0
      ? Math.ceil(parseFloat(storeCategoryItems.length / itemsPerPage))
      : 0;

  // Items for rendering
  const SItems = storeSearchTerm ? storeSearchResults : currentStoreItems;
  const CItems = storeCategorySearchTerm ? storeCategorySearchResults : currentStoreCategoryItems;
  // Return here
  return (
    <div>
      <div>
        <Header
          headerTitle={isStoreTab ? Title.Stores : Title.StoreCategories}
        ></Header>
      </div>
      <div className="m-5 flex flex-wrap justify-center gap-5">
        {StoreDataCard(theme, DC_Stores).map((card, index) => (
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
                className={`inline-block rounded-t-lg border-b-2 p-2 transition-colors duration-300 ${
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
          <div className="flex flex-wrap items-center justify-start gap-5 my-5">
            <p className="whitespace-nowrap font-bold text-black transition-colors duration-300 dark:text-white">
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
          >
            <Button />
          </NavLink>
        </div>
        <table className="mt-5 w-full text-center text-black transition-colors duration-300 dark:text-white">
          <thead className="border-b-4 border-red-500">
            <tr className="text-lg">
              <th scope="col"></th>
              {isStoreTab ? (
                <>
                  <th className="border-r-2 py-5" scope="col"></th>
                  <th className="border-r-2 py-5" scope="col">
                    {SF_Stores.Columns.Col1}
                  </th>
                  <th className="border-r-2 py-5" scope="col">
                    {SF_Stores.Columns.Col2}
                  </th>
                  <th className="border-r-2 py-5" scope="col">
                    {SF_Stores.Columns.Col3}
                  </th>
                  <th className="border-r-2 py-5" scope="col">
                    {SF_Stores.Columns.Col4}
                  </th>
                  <th className="border-r-2 py-5" scope="col">
                    {SF_Stores.Columns.Col5}
                  </th>
                </>
              ) : (
                <>
                  <th className="border-r-2 py-5" scope="col">
                    {SF_StoreCategories.Columns.Col1}
                  </th>
                  <th className="border-r-2 py-5" scope="col">
                    {SF_StoreCategories.Columns.Col2}
                  </th>
                </>
              )}
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {(isStoreTab ? SItems : CItems)
              .length >= 1 ? (
              <>
                {(isStoreTab
                  ? SItems
                  : CItems
                ).map((list, index) => (
                  <tr
                    className="text-md border-b border-slate-300 text-black transition-colors duration-300 hover:bg-slate-200 dark:border-white dark:text-white dark:hover:bg-slate-500"
                    key={index}
                  >
                    <td className="py-5 pl-3">
                      <input type="checkbox" />
                    </td>
                    {isStoreTab ? (
                      <>
                        <td scope="row" className="border-r-2 py-5">
                          <img
                            width="250px"
                            src={`data:image/jpeg;base64, ${list.Daily.hinhanh}`}
                            alt="Hình đại lý"
                            className="rounded 2xl:h-20 2xl:w-20"
                          />
                        </td>
                        <td scope="row" className="border-r-2 py-5">
                          {list.Daily.tendaily}
                        </td>
                        <td scope="row" className="border-r-2 py-5">
                          {list.tenloaidaily}
                        </td>
                        <td scope="row" className="border-r-2 py-5">
                          {list.Daily.ngaytiepnhan}
                        </td>
                        <td scope="row" className="border-r-2 py-5">
                          {list.Daily.sodienthoai}
                        </td>
                        <td scope="row" className="border-r-2 py-5">
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
                        <td scope="row" className="border-r-2 py-5">
                          {list.tenloaidaily}
                        </td>
                        <td scope="row" className="border-r-2 py-5">
                          {list.sotiennotoida}
                        </td>
                      </>
                    )}
                    <td scope="row">
                      <div className="flex flex-wrap gap-5 m-3">
                        { isStoreTab && (
                          <NavLink
                            className="flex items-center gap-2 rounded-lg bg-cyan-400 px-4 py-2 font-bold text-white"
                            to={`/store-maintainance/${list.Daily.madaily}`}
                          >
                            <p className="hidden lg:inline-block">Bảo trì</p>
                            <img src={MaintainanceIcon} alt="Icon bảo trì" />
                          </NavLink>
                        )                          
                        }
                        <NavLink
                          className="flex items-center gap-2 rounded-lg bg-green-500 px-4 py-2 font-bold text-white"
                          to={
                            isStoreTab
                              ? `store-edit-page/${list.Daily.madaily}`
                              : `store-category-edit-page/${list.maloaidaily}`
                          }
                        >
                          <p className="hidden lg:inline-block">{Edit}</p>
                          <img src={EditIcon} alt="Icon chỉnh sửa" />
                        </NavLink>
                        <button
                          className="flex items-center gap-2 rounded-lg bg-amber-400 px-4 py-2 font-bold text-white"
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
