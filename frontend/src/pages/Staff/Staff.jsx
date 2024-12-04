import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Import Contexts Here
import { useTheme } from "../../contexts/ThemeContext";
import { useStoreTab } from "../../contexts/StoreTabState";
import { useModal } from "../../contexts/ModalState";
import { useDetailPopup } from "../../contexts/DetailPopup";

// Import Assets Here
import {
  getAllStaff,
  deleteStaff,
  getAllPosition,
  deletePosition,
} from "../../assets/Staffs/StaffData";
import { StaffDataCard } from "../../assets/Staffs/StaffDataCard";

// Import Components Here
import Header from "../../components/Header";
import Card from "../../components/content/Card";
import Button from "../../components/UI/Button";
import PaginationButtons from "../../components/UI/PaginationButtons";

// Import Icons Here
import DetailIcon from "../../images/icons/button/SeeDetail.svg";
import EditIcon from "../../images/icons/button/Edit.svg";
import DeleteIcon from "../../images/icons/button/Delete.svg";

function Staff() {
  // Variables here
  // // For Theme Mode
  const { theme } = useTheme();
  // // For Multi-Language
  const { t } = useTranslation();
  const { Title } = t("Header");
  const { DC_Staffs } = t("DataCard");
  const { Staff, Position } = t("TabView");
  const { SearchBy, SF_Staffs, SF_Positions } = t("SearchFilter");
  const { Detail, Edit, Delete } = t("Buttons");

  // // For staff-tab here
  const { isStaffTab, activateStaffTab, deactivateStaffTab } = useStoreTab();
  const { openModal, setLng, setLat } = useModal();
  const { openPopup } = useDetailPopup();

  // // For fetching staff & position data
  const [staffData, setStaffData] = useState([]);
  const [positionData, setPositionData] = useState([]);

  // // For searching staff & position
  const [staffSearchTerm, setStaffSearchTerm] = useState("");
  const [positionSearchTerm, setPositionSearchTerm] = useState("");
  const [staffSearchResults, setStaffSearchResults] = useState([]);
  const [positionSearchResults, setPositionSearchResults] = useState([]);

  // // For pagination staff & position
  const [currentStaffPage, setCurrentStaffPage] = useState(0);
  const [currentPositionPage, setCurrentPositionPage] = useState(0);
  const itemsPerPage = 5;

  // For tracking the search-filter option and placeholder text on staff & position
  const [staffFilterOption, setStaffFilterOption] = useState(
    SF_Staffs.Columns.Col1
  );
  const [positionFilterOption, setPositionFilterOption] = useState(
    SF_Positions.Columns.Col1
  );

  // Use Effect here
  // // For getting all existing staffs or positions
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get Existed Staffs
        const existedStaff = await getAllStaff();
        if (existedStaff.length === 0) {
          setStaffData([]);
        } else {
          setStaffData(existedStaff);
        }
        // Get Existed Positions
        const existedPosition = await getAllPosition();
        if (existedPosition.length === 0) {
          setPositionData([]);
        } else {
          setPositionData(existedPosition);
        }
      } catch (error) {
        console.error("Error while fetching: ", error);
      }
    };
    fetchData();
  }, []);
  // // For searching
  useEffect(() => {
    // Filtering staffs base on filter option and input text
    if (staffSearchTerm.trim() !== "") {
      const results = staffData.filter((item) => {
        if (staffFilterOption === SF_Staffs.Columns.Col1) {
          return item.Nhanvien.hoten
            .toLowerCase()
            .includes(staffSearchTerm.toLowerCase());
        } else if (staffFilterOption === SF_Staffs.Columns.Col3) {
          return item.tendaily
            .toLowerCase()
            .includes(staffSearchTerm.toLowerCase());
        } else if (staffFilterOption === SF_Staffs.Columns.Col4) {
          return item.tenchucvu
            .toLowerCase()
            .includes(staffSearchTerm.toLowerCase());
        }
      });
      setStaffSearchResults(results);
    } else {
      setStaffSearchResults(staffData);
    }
    // Filtering positions base on filter option and input text
    if (positionSearchTerm.trim() !== "") {
      const results = positionData.filter((item) => {
        if (positionFilterOption === SF_Positions.Columns.Col1) {
          return item.tenchucvu
            .toLowerCase()
            .includes(positionSearchTerm.toLowerCase());
        } else if (positionFilterOption === SF_Positions.Columns.Col2) {
          return item.capdo
            .toString()
            .includes(positionSearchTerm.toLowerCase());
        } else {
          return item.thoihan
            .toString()
            .includes(positionSearchTerm.toLowerCase());
        }
      });
      setPositionSearchResults(results);
    } else {
      setPositionSearchResults(positionData);
    }
  }, [
    staffSearchTerm,
    positionSearchTerm,
    staffData,
    positionData,
    staffFilterOption,
    positionFilterOption,
  ]);

  // Functions here
  // // For deleting one staff
  const deleteAStaff = async (id) => {
    const staffResponse = await deleteStaff(id);

    if (staffResponse.message === "Xóa nhân viên thất bại") {
      alert(staffResponse.message);
    } else {
      alert(staffResponse.message);
      setStaffData(staffData.filter((item) => item.Nhanvien.manhanvien !== id));
    }
  };
  // // For deleting one position
  const deleteAPosition = async (id) => {
    const positionResponse = await deletePosition(id);

    if (positionResponse.message === "Xóa chức vụ thất bại") {
      alert(positionResponse.message);
    } else {
      alert(positionResponse.message);
      setPositionData(positionData.filter((item) => item.machucvu !== id));
    }
  };

  // // For handling modal
  const handleOpenMapModal = (kinhdo, vido) => {
    setLng(kinhdo);
    setLat(vido);
    openModal();
  };

  const handleOpenDetailModal = (id) => {
    openPopup(id);
  };

  // // For changing placeholder text base on the selected search-filter option
  const getPlaceholderText = () => {
    switch (isStaffTab ? staffFilterOption : positionFilterOption) {
      case `${isStaffTab ? SF_Staffs.Columns.Col1 : SF_Positions.Columns.Col1}`:
        return `${
          isStaffTab
            ? SF_Staffs.Placeholders.Text1
            : SF_Positions.Placeholders.Text1
        }`;
      case `${isStaffTab ? SF_Staffs.Columns.Col3 : SF_Positions.Columns.Col2}`:
        return `${
          isStaffTab
            ? SF_Staffs.Placeholders.Text3
            : SF_Positions.Placeholders.Text2
        }`;
      case SF_Staffs.Columns.Col4:
        return SF_Staffs.Placeholders.Text4;
      default:
        return `${
          isStaffTab
            ? SF_Staffs.Placeholders.Text1
            : SF_Positions.Placeholders.Text1
        }`;
    }
  };

  // Items for render
  const staffItems = staffSearchTerm ? staffSearchResults : staffData;
  const positionItems = positionSearchTerm
    ? positionSearchResults
    : positionData;

  // Calculate offset for staffs
  const staffOffset = currentStaffPage * itemsPerPage;
  const currentStaffItems =
    staffItems.length > 0
      ? staffItems.slice(staffOffset, staffOffset + itemsPerPage)
      : [];
  const staffPageCount =
    staffItems.length > 0
      ? Math.ceil(parseFloat(staffItems.length / itemsPerPage))
      : 0;
  // Calculate offset for positions
  const positionOffset = currentPositionPage * itemsPerPage;
  const currentPositionItems =
    positionItems.length > 0
      ? positionItems.slice(positionOffset, positionOffset + itemsPerPage)
      : [];
  const positionPageCount =
    positionItems.length > 0
      ? Math.ceil(parseFloat(positionItems.length / itemsPerPage))
      : 0;
  // Items for rendering
  const PItems = positionSearchTerm ? positionSearchResults : currentPositionItems;    
  const SItems = staffSearchTerm ? staffSearchResults : currentStaffItems;
  // Return here
  return (
    <div>
      <div>
        <Header
          headerTitle={isStaffTab ? Title.Staffs : Title.Positions}
        ></Header>
      </div>
      <div className="m-5 flex flex-wrap justify-center gap-5">
        {StaffDataCard(theme, DC_Staffs).map((card, index) => (
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
                  isStaffTab
                    ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400"
                    : "border-gray-300 hover:text-gray-800 dark:border-gray-800 dark:hover:text-white"
                }`}
                onClick={() => (isStaffTab ? <></> : activateStaffTab())}
              >
                {Staff}
              </button>
            </li>
            <li className="me-2">
              <button
                className={`inline-block rounded-t-lg border-b-2 p-2 transition-colors duration-300 ${
                  isStaffTab
                    ? "border-gray-300 hover:text-gray-800 dark:border-gray-800 dark:hover:text-white"
                    : "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400"
                }`}
                onClick={() => (isStaffTab ? deactivateStaffTab() : <></>)}
              >
                {Position}
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
              value={isStaffTab ? staffFilterOption : positionFilterOption}
              onChange={(e) =>
                isStaffTab
                  ? setStaffFilterOption(e.target.value)
                  : setPositionFilterOption(e.target.value)
              }
            >
              {isStaffTab ? (
                <>
                  <option value={SF_Staffs.Columns.Col1}>
                    {SF_Staffs.Columns.Col1}
                  </option>
                  <option value={SF_Staffs.Columns.Col3}>
                    {SF_Staffs.Columns.Col3}
                  </option>
                  <option value={SF_Staffs.Columns.Col4}>
                    {SF_Staffs.Columns.Col4}
                  </option>
                </>
              ) : (
                <>
                  <option value={SF_Positions.Columns.Col1}>
                    {SF_Positions.Columns.Col1}
                  </option>
                  <option value={SF_Positions.Columns.Col2}>
                    {SF_Positions.Columns.Col2}
                  </option>
                </>
              )}
            </select>
            <input
              className="w-96 rounded-md border border-black bg-white px-2 py-0.5 text-lg text-black transition-colors duration-300 dark:border-white dark:bg-[#363636] dark:text-white"
              type="text"
              placeholder={getPlaceholderText()}
              value={isStaffTab ? staffSearchTerm : positionSearchTerm}
              onChange={(e) =>
                isStaffTab
                  ? setStaffSearchTerm(e.target.value)
                  : setPositionSearchTerm(e.target.value)
              }
            />
          </div>
          <NavLink
            className="my-5"
            to={isStaffTab ? "staff-management-add-page" : "position-add-page"}
            state={{
              existedData: isStaffTab ? staffData : positionData
            }}
          >
            <Button />
          </NavLink>
        </div>
        <table className="mt-5 w-full text-center text-black transition-colors duration-300 dark:text-white">
          <thead className="border-b-4 border-red-500">
            <tr className="text-lg">
              <th scope="col"></th>
              {isStaffTab ? (
                <>
                  <th className="border-r-2 py-5" scope="col"></th>
                  <th className="border-r-2 py-5" scope="col">
                    {SF_Staffs.Columns.Col1}
                  </th>
                  <th className="border-r-2 py-5" scope="col">
                    {SF_Staffs.Columns.Col2}
                  </th>
                  <th className="border-r-2 py-5" scope="col">
                    {SF_Staffs.Columns.Col3}
                  </th>
                  <th className="border-r-2 py-5" scope="col">
                    {SF_Staffs.Columns.Col4}
                  </th>
                  <th className="border-r-2 py-5" scope="col">
                    {SF_Staffs.Columns.Col5}
                  </th>
                </>
              ) : (
                <>
                  <th className="border-r-2 py-5" scope="col">
                    {SF_Positions.Columns.Col1}
                  </th>
                  <th className="border-r-2 py-5" scope="col">
                    {SF_Positions.Columns.Col2}
                  </th>
                  <th className="border-r-2 py-5" scope="col">
                    {SF_Positions.Columns.Col3}
                  </th>
                  <th className="border-r-2 py-5" scope="col">
                    {SF_Positions.Columns.Col4}
                  </th>
                  <th className="border-r-2 py-5" scope="col">
                    {SF_Positions.Columns.Col5}
                  </th>
                </>
              )}
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {(isStaffTab ? SItems : PItems).length >=
            1 ? (
              <>
                {(isStaffTab ? SItems : PItems).map(
                  (list, index) => (
                    <tr
                      className="text-md border-b border-slate-300 text-black transition-colors duration-300 hover:bg-slate-200 dark:border-white dark:text-white dark:hover:bg-slate-500"
                      key={index}
                    >
                      <td className="py-5 pl-3">
                        <input type="checkbox" />
                      </td>
                      {isStaffTab ? (
                        <>
                          <td scope="row" className="border-r-2 py-5">
                            <img
                              width="250px"
                              src={`data:image/jpeg;base64, ${list.Nhanvien.hinhanh}`}
                              alt="Hình nhân viên"
                              className="rounded 2xl:h-20 2xl:w-20"
                            />
                          </td>
                          <td scope="row" className="border-r-2 py-5">
                            {list.Nhanvien.hoten}
                          </td>
                          <td scope="row" className="border-r-2 py-5">
                            {list.Nhanvien.ngaysinh}
                          </td>
                          <td scope="row" className="border-r-2 py-5">
                            {list.tendaily}
                          </td>
                          <td scope="row" className="border-r-2 py-5">
                            {list.tenchucvu}
                          </td>
                          <td scope="row" className="border-r-2 py-5">
                            <button
                              onClick={() =>
                                handleOpenMapModal(list.kinhdo, list.vido)
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
                            {list.tenchucvu}
                          </td>
                          <td scope="row" className="border-r-2 py-5">
                            {list.capdo}
                          </td>
                          <td scope="row" className="border-r-2 py-5">
                            {list.luong}
                          </td>
                          <td scope="row" className="border-r-2 py-5">
                            {list.ngaytao}
                          </td>
                          <td scope="row" className="border-r-2 py-5">
                            {list.ngaycapnhat}
                          </td>
                        </>
                      )}
                      <td scope="row">
                        <div className="flex flex-wrap justify-center gap-5 my-5">
                          <NavLink
                            className={`flex flex-wrap items-center gap-2 rounded-lg ${
                              isStaffTab ? "bg-cyan-500" : "bg-green-500"
                            } px-4 py-2 font-bold text-white`}
                            to={
                              isStaffTab
                                ? ""
                                : `position-edit-page/${list.machucvu}`
                            }
                            onClick={() =>
                              isStaffTab ? (
                                handleOpenDetailModal(list.Nhanvien.manhanvien)
                              ) : (
                                <></>
                              )
                            }
                          >
                            <p className="hidden lg:inline-block">
                              {isStaffTab ? Detail : Edit}
                            </p>
                            <img
                              src={isStaffTab ? DetailIcon : EditIcon}
                              alt="Icon chi tiết / chỉnh sửa"
                            />
                          </NavLink>
                          <button
                            className="flex items-center gap-2 rounded-lg bg-amber-400 px-4 py-2 font-bold text-white"
                            onClick={() =>
                              isStaffTab
                                ? deleteAStaff(list.Nhanvien.manhanvien)
                                : deleteAPosition(list.machucvu)
                            }
                          >
                            <p className="hidden lg:inline-block">{Delete}</p>
                            <img src={DeleteIcon} alt="Icon thùng rác" />
                          </button>
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
          pageCount={isStaffTab ? staffPageCount : positionPageCount}
          currentPage={isStaffTab ? currentStaffPage : currentPositionPage}
          setCurrentPage={
            isStaffTab ? setCurrentStaffPage : setCurrentPositionPage
          }
        />
      </div>
    </div>
  );
}

export default Staff;
