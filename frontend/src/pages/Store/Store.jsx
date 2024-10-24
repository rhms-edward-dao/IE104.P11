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
import EditIcon from "../../images/icons/button/Edit.svg";
import DeleteIcon from "../../images/icons/button/Delete.svg";

// import Card from "../../components/content/Card";
// import Header from "../../components/Header";
// import Button from "../../components/UI/Button";
// import DWCardData from "../../assets/WarehouseCardData";
// import PaginationButtons from "../../components/UI/PaginationButtons";
// import TrashIcon from "../../images/icons/trash.png";
// import EditIcon from "../../images/icons/edit.png";

// import {
//   getAllStoreCategory,
//   deleteStoreCategory,
// } from "../../assets/StoreCategoryData";
// import { getAllStore, deleteStore } from "../../assets/StoreData";

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

  const [categoryData, setCategoryData] = useState([]);
  const [storeData, setStoreData] = useState([]);

  // Variables for searching loaidaily
  const [catSearchTerm, setCatSearchTerm] = useState("");
  const [catResults, setCatResults] = useState([]);

  // Variables for searching daily
  const [stoSearchTerm, setStoSearchTerm] = useState("");
  const [stoResults, setStoResults] = useState([]);

  // Variables for store-tab here
  const { isStoreTab, activateStoreTab, deactivateStoreTab } = useStoreTab();
  const { openModal, setLng, setLat } = useModal();

  // Variables for pagination - both store and store category
  const [currentPageStore, setCurrentPageStore] = useState(0);
  const [currentPageKind, setCurrentPageKind] = useState(0);
  const itemsPerPage = 5;

  // State to track the selected option and placeholder text
  const [selectedOption, setSelectedOption] = useState(SF_Stores.Columns.Col1);
  const [selectedOptionCat, setSelectedOptionCat] = useState(
    SF_StoreCategories.Columns.Col1
  );

  // Function to handle the change of the dropdown and update placeholder
  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };
  const handleOptionChangeCat = (e) => {
    setSelectedOptionCat(e.target.value);
  };

  // Placeholder text based on the selected option
  const getPlaceholderText = () => {
    switch (selectedOption) {
      case SF_Stores.Columns.Col1:
        return SF_Stores.Placeholders.Text1;
      case SF_Stores.Columns.Col4:
        return SF_Stores.Placeholders.Text4;
      case SF_StoreCategories.Columns.Col1:
        return SF_StoreCategories.Placeholders.Text1;
      default:
        return "Tìm kiếm ...";
    }
  };

  // Functions here
  useEffect(() => {
    const fetAllData = async () => {
      const catData = await getAllStoreCategory();
      setCategoryData(catData);

      const stoData = await getAllStore();
      if (stoData.length === 0) {
        setStoreData([]);
      } else {
        setStoreData(stoData);
      }
    };
    fetAllData();
  }, []);
  // Function for loaidaily searching
  useEffect(() => {
    if (catSearchTerm.trim() !== "") {
      const results = categoryData.filter((item) => {
        if (selectedOptionCat === SF_StoreCategories.Columns.Col1) {
          return item.tenloaidaily
            .toLowerCase()
            .includes(catSearchTerm.toLowerCase());
        }
        return false;
      });
      setCatResults(results);
    } else {
      setCatResults(categoryData);
    }
  }, [catSearchTerm, categoryData, selectedOptionCat]);

  // Function for daily searching
  useEffect(() => {
    if (stoSearchTerm.trim() !== "") {
      const results = storeData.filter((item) => {
        if (selectedOption === SF_Stores.Columns.Col1) {
          return item.Daily.tendaily
            .toLowerCase()
            .includes(stoSearchTerm.toLowerCase());
        } else if (selectedOption === SF_Stores.Columns.Col4) {
          return item.Daily.sodienthoai
            .toLowerCase()
            .includes(stoSearchTerm.toLowerCase());
        }
        return false;
      });
      setStoResults(results);
    } else {
      setStoResults(storeData);
    }
  }, [stoSearchTerm, storeData, selectedOption]);

  // Function for deleting loaidaily
  const deleteCatData = async (id) => {
    const data = await deleteStoreCategory(id);
    if (data.message === "Xóa loại đại lý thất bại") {
      alert("Xóa loại đại lý thất bại");
    } else {
      alert("Xóa loại đại lý thành công");
      setCategoryData(categoryData.filter((item) => item.maloaidaily !== id));
    }
  };
  // Function for handling modal
  const handleOpenModal = (kinhdo, vido) => {
    setLng(kinhdo);
    setLat(vido);
    openModal();
  };

  // Function for deleteing daily
  const deleteStoreData = async (id) => {
    const data = await deleteStore(id);
    if (data.message === "Xóa đại lý thất bại") {
      alert("Xóa đại lý thất bại");
    } else {
      alert("Xóa đại lý thành công");
      setStoreData(storeData.filter((item) => item.Daily.madaily !== id));
    }
  };

  // Items for render
  const catItems = catSearchTerm ? catResults : categoryData;
  const stoItems = stoSearchTerm ? stoResults : storeData;

  // Calculate offset - store
  const offsetStore = currentPageStore * itemsPerPage;
  const currentItemsStore =
    stoItems.length > 0
      ? stoItems.slice(offsetStore, offsetStore + itemsPerPage)
      : [];
  const pageCountStore =
    stoItems.length > 0
      ? Math.ceil(parseFloat(stoItems.length / itemsPerPage))
      : 0;

  // Calculate offset - store category
  const offsetKind = currentPageKind * itemsPerPage;
  const currentItemsKind =
    catItems.length > 0
      ? catItems.slice(offsetKind, offsetKind + itemsPerPage)
      : [];
  const pageCountKind =
    catItems.length > 0
      ? Math.ceil(parseFloat(catItems.length / itemsPerPage))
      : 0;

  // Return here
  return (
    <div>
      <div>
        <Header
          headerTitle={isStoreTab ? Title.Stores : Title.StoreCategories}
        ></Header>
      </div>

      <div className="flex flex-wrap gap-5 xl:gap-16 2xl:gap-44 justify-center m-5">
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
        {isStoreTab ? (
          <div className="mt-6 mb-8 text-md font-bold text-center text-gray-500">
            <ul className="flex flex-wrap -mb-px">
              <li className="me-2">
                <button className="inline-block p-4 border-b-2 rounded-t-lg text-blue-600 border-blue-600">
                  {Store}
                </button>
              </li>
              <li className="me-2">
                <button
                  className="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-800"
                  onClick={() => deactivateStoreTab()}
                >
                  {StoreCategory}
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="mt-6 mb-8 text-md font-bold text-center text-gray-500">
            <ul className="flex flex-wrap -mb-px">
              <li className="me-2">
                <button
                  className="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-800"
                  onClick={() => activateStoreTab()}
                >
                  {Store}
                </button>
              </li>
              <li className="me-2">
                <button className="inline-block p-4 border-b-2 rounded-t-lg text-blue-600 border-blue-600">
                  {StoreCategory}
                </button>
              </li>
            </ul>
          </div>
        )}

        {/* Block for LOAIDAILY */}
        {isStoreTab ? (
          <>
            {/* Block for DAILY */}
            <div className="flex flex-wrap gap-3 justify-between">
              <div className="flex flex-wrap gap-5 items-center justify-start">
                <p className="whitespace-nowrap font-bold text-black transition-colors duration-300 dark:text-white">
                  {SearchBy}
                </p>
                <select
                  value={selectedOption}
                  onChange={handleOptionChange}
                  className="rounded-md border border-black bg-white px-3 py-0.5 text-lg font-semibold text-black transition-colors duration-300 dark:border-white dark:bg-[#363636] dark:text-white"
                >
                  <option value={SF_Stores.Columns.Col1}>
                    {SF_Stores.Columns.Col1}
                  </option>
                  <option value={SF_Stores.Columns.Col4}>
                    {SF_Stores.Columns.Col4}
                  </option>
                </select>
                <input
                  type="text"
                  placeholder={getPlaceholderText()}
                  className="rounded-md border border-black bg-white px-2 py-0.5 text-lg text-gray-500 transition-colors duration-300 dark:border-white dark:bg-[#363636] dark:text-gray-100 w-24 lg:w-72 xl:w-96"
                  value={stoSearchTerm}
                  onChange={(e) => setStoSearchTerm(e.target.value)}
                />
              </div>
              <NavLink to="store-add-page">
                <Button />
              </NavLink>
            </div>
            <table className="mt-5 w-full text-center text-black transition-colors duration-300 dark:text-white">
              <thead className="border-b-4 border-red-500">
                <tr className="text-md text-gray-500">
                  <th></th>
                  <th scope="col" className="border-r-2 py-5">
                    Hình ảnh
                  </th>
                  <th scope="col" className="border-r-2 py-5 text-lg">
                    {SF_Stores.Columns.Col1}
                  </th>
                  <th scope="col" className="border-r-2 py-5 text-lg">
                    {SF_Stores.Columns.Col2}
                  </th>
                  <th scope="col" className="border-r-2 py-5 text-lg">
                    {SF_Stores.Columns.Col3}
                  </th>
                  <th scope="col" className="border-r-2 py-5 text-lg">
                    {SF_Stores.Columns.Col4}
                  </th>
                  <th scope="col" className="py-5 text-lg">
                    {SF_Stores.Columns.Col5}
                  </th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {currentItemsStore.length >= 1 ? (
                  <>
                    {currentItemsStore.map((list, index) => (
                      <tr
                        key={index}
                        className="border-b border-slate-300 text-black transition-colors duration-300 hover:bg-slate-200 dark:border-white dark:text-white dark:hover:bg-slate-500"
                      >
                        <td className="py-5 pl-3">
                          <input type="checkbox" />
                        </td>
                        <td scope="row" className="py-5 border-r-2">
                          <img
                            width="250px"
                            src={`data:image/jpeg;base64, ${list.Daily.hinhanh}`}
                            alt="Hình đại lý"
                            className="rounded 2xl:w-20 2xl:h-20"
                          />
                        </td>

                        <td scope="row" className="border-r-2 py-5 text-lg">
                          {list.Daily.tendaily}
                        </td>
                        <td scope="row" className="border-r-2 py-5 text-lg">
                          {list.tenloaidaily}
                        </td>
                        <td scope="row" className="border-r-2 py-5 text-lg">
                          {list.Daily.ngaytiepnhan}
                        </td>
                        <td scope="row" className="py-5 text-lg">
                          {list.Daily.sodienthoai}
                        </td>
                        <td scope="row" className="py-5 border-r-2">
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
                        <td scope="row">
                          <div className="flex flex-wrap justify-center gap-3">
                            <NavLink
                              className="flex items-center gap-2 rounded-lg bg-green-500 px-4 py-2 font-bold text-white"
                              to={`/stores/store-edit-page/${list.Daily.madaily}`}
                            >
                              <img src={EditIcon} alt="Icon chỉnh sửa" />
                              <p className="hidden sm:hidden md:hidden lg:inline-block">
                                {Edit}
                              </p>
                            </NavLink>
                            <button
                              className="flex items-center gap-2 rounded-lg bg-amber-400 px-4 py-2 font-bold text-white"
                              onClick={() =>
                                deleteStoreData(list.Daily.madaily)
                              }
                            >
                              <img src={DeleteIcon} alt="Icon thùng rác" />
                              <p className="hidden sm:hidden md:hidden lg:inline-block">
                                {Delete}
                              </p>
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
              pageCount={pageCountStore}
              currentPage={currentPageStore}
              setCurrentPage={setCurrentPageStore}
            ></PaginationButtons>
          </>
        ) : (
          <>
            {/* Bolck for LOAIDAILY */}
            <div className="flex flex-wrap gap-3 justify-between">
              <div className="flex flex-wrap gap-5 items-center justify-start">
                <p className="whitespace-nowrap font-bold text-black transition-colors duration-300 dark:text-white">
                  {SearchBy}
                </p>
                <select
                  value={selectedOptionCat}
                  onChange={handleOptionChangeCat}
                  className="rounded-md border border-black bg-white px-3 py-0.5 text-lg font-semibold text-black transition-colors duration-300 dark:border-white dark:bg-[#363636] dark:text-white"
                >
                  <option value={SF_StoreCategories.Columns.Col1}>
                    {SF_StoreCategories.Columns.Col1}
                  </option>
                </select>
                <input
                  type="text"
                  placeholder={getPlaceholderText()}
                  className="rounded-md border border-black bg-white px-2 py-0.5 text-lg text-gray-500 transition-colors duration-300 dark:border-white dark:bg-[#363636] dark:text-gray-100 w-24 lg:w-72 xl:w-96"
                  value={catSearchTerm}
                  onChange={(e) => setCatSearchTerm(e.target.value)}
                />
              </div>
              <NavLink to="/stores/store-category-add-page">
                <Button />
              </NavLink>
            </div>

            <table className="mt-5 w-full text-center text-black transition-colors duration-300 dark:text-white">
              <thead className="border-b-4 border-red-500">
                <tr className="text-md text-gray-500">
                  <th></th>
                  <th scope="col" className="border-r-2 py-5 text-lg">
                    {SF_StoreCategories.Columns.Col1}
                  </th>
                  <th scope="col" className="py-5 border-r-2">
                    {SF_StoreCategories.Columns.Col2}
                  </th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {currentItemsKind.length >= 1 ? (
                  <>
                    {currentItemsKind.map((list, index) => (
                      <tr
                        key={index}
                        className="border-b border-slate-300 text-black transition-colors duration-300 hover:bg-slate-200 dark:border-white dark:text-white dark:hover:bg-slate-500"
                      >
                        <td className="py-5 pl-3">
                          <input type="checkbox" />
                        </td>
                        <td scope="row" className="border-r-2 py-5 text-lg">
                          {list.tenloaidaily}
                        </td>
                        <td scope="row" className="py-5 border-r-2">
                          {list.sotiennotoida}
                        </td>
                        <td scope="row">
                          <div className="flex flex-wrap justify-center gap-3">
                            <NavLink
                              className="flex items-center gap-2 rounded-lg bg-green-500 px-4 py-2 font-bold text-white"
                              to={`/stores/store-category-edit-page/${list.maloaidaily}`}
                            >
                              <img src={EditIcon} alt="Icon chỉnh sửa" />
                              <p className="hidden sm:hidden md:hidden lg:inline-block">
                                {Edit}
                              </p>
                            </NavLink>
                            <button className="flex items-center gap-2 rounded-lg bg-amber-400 px-4 py-2 font-bold text-white">
                              onClick={() => deleteCatData(list.maloaidaily)}
                              <img src={DeleteIcon} alt="Icon thùng rác" />
                              <p className="hidden sm:hidden md:hidden lg:inline-block">
                                {Delete}
                              </p>
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
              pageCount={pageCountKind}
              currentPage={currentPageKind}
              setCurrentPage={setCurrentPageKind}
            ></PaginationButtons>
            {/* End block */}

            <hr className="mr-5 my-10" />
          </>
        )}
      </div>
    </div>
  );
}

export default Stores;
