import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import Card from "../../components/content/Card";
import Header from "../../components/Header";
import Button from "../../components/UI/Button";
import PaginationButtons from "../../components/UI/PaginationButtons";
import DWCardData from "../../assets/WarehouseCardData";

import TrashIcon from "../../images/icons/trash.png";
import EditIcon from "../../images/icons/edit.png";
import DetailIcon from "../../images/icons/see-detail.png";

import {
  getAllStaff,
  deleteStaff,
  getAllPosition,
} from "../../assets//Staffs/StaffData";
import { deletePosition } from "../../assets/Staffs/StaffData";
import { useStoreTab } from "../../contexts/StoreTabState";
import { useModal } from "../../contexts/ModalState";
import { useDetailPopup } from "../../contexts/StaffDetailState";

function Staff() {
  // Variabls for staff category here
  const [staffData, setStaffData] = useState([]);
  const [staffSearchTerm, setStaffSearchTerm] = useState("");
  const [staffSearchResults, setStaffSearchResults] = useState([]);

  // Variables for staff-position here
  const [positionData, setPositionData] = useState([]);
  const [positionSearchTerm, setPositionSearchTerm] = useState("");
  const [positionSearchResults, setPositionSearchResults] = useState([]);

  // Variables for tab state here
  const { isStaffTab, activateStaffTab, deactivateStaffTab } = useStoreTab();

  const { openModal, setLng, setLat } = useModal();

  const { openPopup } = useDetailPopup();

  // Pagination states
  const [currentPageStaff, setCurrentPageStaff] = useState(0);
  const [currentPagePos, setCurrentPagePos] = useState(0);
  const itemsPerPage = 5;

  // State to track the selected option and placeholder text
  const [selectedOption, setSelectedOption] = useState("Tên nhân viên");
  const [selectedOptionPos, setSelectedOptionPos] = useState("Tên chức vụ");

  // Function to handle the change of the dropdown and update placeholder
  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };
  const handleOptionChangePos = (e) => {
    setSelectedOptionPos(e.target.value);
  };

  // Placeholder text based on the selected option
  const getPlaceholderTextStaff = () => {
    switch (selectedOption) {
      case "Tên nhân viên":
        return "Tìm kiếm theo tên nhân viên ...";
      case "Đại lý":
        return "Tìm kiếm theo đại lý ...";
      case "Chức vụ":
        return "Tìm kiếm theo chức vụ ...";
      default:
        return "Tìm kiếm ...";
    }
  };

  const getPlaceholderTextPos = () => {
    switch (selectedOptionPos) {
      case "Tên chức vụ":
        return "Tìm kiếm theo tên chức vụ ...";
      case "Cấp độ":
        return "Tìm kiếm theo cấp độ ...";
      default:
        return "Tìm kiếm ...";
    }
  };
  // Get data from server here - data must be fetched before this page has been loaded
  useEffect(() => {
    const fetchData = async () => {
      // Getting data for staff
      const existedStaffData = await getAllStaff();
      setStaffData(existedStaffData);
      // Getting data for position
      const existedPositionData = await getAllPosition();
      setPositionData(existedPositionData);
    };
    fetchData();
  }, []);
  // Function for open modal
  const handleOpenMapModal = (kinhdo, vido) => {
    setLng(kinhdo);
    setLat(vido);
    openModal();
  };

  const handleOpenDetailModal = (id) => {
    openPopup(id);
  };

  //  Function for deleteing item
  const deleteData = async (id) => {
    const response = await deleteStaff(id);
    if (response.message === "Xóa nhân viên thành công") {
      alert("Xóa nhân viên thành công");
      setStaffData(staffData.filter((item) => item.Nhanvien.manhanvien != id));
    }
  };

  const deletePositionData = async (id) => {
    const response = await deletePosition(id);
    if (response.message === "Xóa chức vụ thành công") {
      alert("Xóa chức vụ thành công");
      setPositionData(positionData.filter((item) => item.machucvu != id));
    }
  };
  // Search feature here
  useEffect(() => {
    if (staffSearchTerm.trim() !== "") {
      const results = staffData.filter((item) => {
        if (selectedOption === "Tên nhân viên") {
          return item.Nhanvien.hoten
            .toLowerCase()
            .includes(staffSearchTerm.toLowerCase());
        } else if (selectedOption === "Đại lý") {
          return item.tendaily
            .toLowerCase()
            .includes(staffSearchTerm.toLowerCase());
        } else {
          return item.tenchucvu
            .toLowerCase()
            .includes(staffSearchTerm.toLowerCase());
        }
      });
      setStaffSearchResults(results);
    } else {
      setStaffSearchResults(staffData);
    }

    if (positionSearchTerm.trim() !== "") {
      const presult = positionData.filter((item) => {
        if (selectedOptionPos === "Tên chức vụ") {
          return item.tenchucvu
            .toLowerCase()
            .includes(positionSearchTerm.toLowerCase());
        } else if (selectedOptionPos === "Cấp độ") {
          return item.capdo
            .toString()
            .includes(positionSearchTerm.toLowerCase());
        } else {
          return item.thoihan
            .toString()
            .includes(positionSearchTerm.toLowerCase());
        }
      });
      setPositionSearchResults(presult);
    } else {
      setPositionSearchResults(positionData);
    }
  }, [staffSearchTerm, positionSearchTerm, staffData, positionData]);

  // Items for rendering
  const staff_items = staffSearchTerm ? staffSearchResults : staffData;
  const position_items = positionSearchTerm
    ? positionSearchResults
    : positionData;
  // Offset pagination
  const offsetStaff = currentPageStaff * itemsPerPage;
  const currentStaffItems =
    staff_items.length > 0
      ? staff_items.slice(offsetStaff, offsetStaff + itemsPerPage)
      : [];
  const pageCountStaff =
    staff_items.length > 0
      ? Math.ceil(parseFloat(staff_items.length / itemsPerPage))
      : 0;

  const offsetPos = currentPagePos * itemsPerPage;
  const currentPosItems =
    position_items.length > 0
      ? position_items.slice(offsetPos, offsetPos + itemsPerPage)
      : [];
  const pageCountPos =
    position_items.length > 0
      ? Math.ceil(parseFloat(position_items.length / itemsPerPage))
      : 0;

  // Return here
  return (
    <div>
      <div>
        <Header headerTitle="Danh sách Nhân viên"></Header>
      </div>

      <hr className="mr-5" />

      <div className="flex flex-wrap gap-5 md:gap-10 lg:gap-40 justify-center my-3">
        {DWCardData.map((card, index) => (
          <Card
            key={index}
            image={card.img}
            description={card.description}
            value={card.value}
          ></Card>
        ))}
      </div>

      <div className="m-5 p-5 bg-white shadow-lg">
        {/* Tab for changing what to show */}
        {isStaffTab ? (
          <div className="mt-6 text-md font-bold text-center text-gray-500">
            <ul className="flex flex-wrap -mb-px">
              <li className="me-2">
                <button className="inline-block p-4 border-b-2 rounded-t-lg text-blue-600 border-blue-600">
                  Nhân viên
                </button>
              </li>
              <li className="me-2">
                <button
                  className="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-800"
                  onClick={() => deactivateStaffTab()}
                >
                  Chức vụ
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="mt-6 text-md font-bold text-center text-gray-500">
            <ul className="flex flex-wrap -mb-px">
              <li className="me-2">
                <button
                  className="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-800"
                  onClick={() => activateStaffTab()}
                >
                  Nhân viên
                </button>
              </li>
              <li className="me-2">
                <button className="inline-block p-4 border-b-2 rounded-t-lg text-blue-600 border-blue-600">
                  Chức vụ
                </button>
              </li>
            </ul>
          </div>
        )}

        {isStaffTab ? (
          <div className="mt-5">
            <div className="flex flex-wrap gap-3 justify-between">
              <div className="flex flex-wrap gap-5 items-center justify-start">
                <p className="font-bold whitespace-nowrap">Tìm kiếm theo:</p>
                <select
                  value={selectedOption}
                  onChange={handleOptionChange}
                  className="font-semibold text-lg py-3 px-3 rounded-md"
                >
                  <option value="Tên nhân viên">Tên nhân viên</option>
                  <option value="Đại lý">Tên đại lý</option>
                  <option value="Chức vụ">Tên chức vụ</option>
                </select>
                <input
                  type="text"
                  placeholder={getPlaceholderTextStaff()}
                  className="border border-black rounded-md py-0.5 px-2 text-lg w-24 lg:w-72 xl:w-96"
                  value={staffSearchTerm}
                  onChange={(e) => setStaffSearchTerm(e.target.value)}
                />
              </div>
              <NavLink
                className="my-5"
                to="/staff-management/staff-management-add-page"
              >
                <Button />
              </NavLink>
            </div>

            <table className="w-full mt-5 text-center">
              <thead className="border-b-4 border-red-500">
                <tr className="text-md">
                  <th scope="col"></th>
                  <th scope="col" className="py-5 border-r-2"></th>
                  <th scope="col" className="py-5 border-r-2">
                    Tên nhân viên
                  </th>
                  <th scope="col" className="py-5 border-r-2">
                    Ngày sinh
                  </th>
                  <th scope="col" className="py-5 border-r-2">
                    Tên đại lý
                  </th>
                  <th scope="col" className="py-5 border-r-2">
                    Chức vụ
                  </th>
                  <th scope="col" className="py-5 border-r-2">
                    Địa chỉ
                  </th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {staff_items.length > 0 ? (
                  <>
                    {staff_items.map((list, index) => (
                      <tr
                        key={index}
                        className="border-b border-slate-300 hover:bg-slate-200"
                      >
                        <td className="py-5">
                          <input type="checkbox" />
                        </td>
                        <td scope="row" className="py-5 border-r-2">
                          <img
                            width="75px"
                            src={`data:images/jpeg;base64, ${list.Nhanvien.hinhanh}`}
                            alt="Hình đại diện"
                            className="rounded-full"
                          />
                        </td>
                        <td scope="row" className="py-5 border-r-2">
                          {list.Nhanvien.hoten}
                        </td>
                        <td scope="row" className="py-5 border-r-2">
                          {list.Nhanvien.ngaysinh}
                        </td>
                        <td scope="row" className="py-5 border-r-2">
                          {list.tendaily}
                        </td>
                        <td scope="row" className="py-5 border-r-2">
                          {list.tenchucvu}
                        </td>
                        <td scope="row" className="py-5 border-r-2">
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
                        <td scope="row">
                          <div className="flex flex-wrap m-2 gap-3">
                            <NavLink
                              onClick={() =>
                                handleOpenDetailModal(list.Nhanvien.manhanvien)
                              }
                            >
                              <button>
                                <div className="flex gap-2 bg-cyan-500 p-2 rounded-md">
                                  <img
                                    src={DetailIcon}
                                    alt="Icon xem chi tiết"
                                  />
                                  <p className="font-bold text-white hidden lg:inline-block">
                                    Chi tiết
                                  </p>
                                </div>
                              </button>
                            </NavLink>
                            <button
                              onClick={() =>
                                deleteData(list.Nhanvien.manhanvien)
                              }
                            >
                              <div className="flex gap-2 bg-amber-400 p-2 rounded-md">
                                <img src={TrashIcon} alt="Icon thùng rác" />
                                <p className="font-bold text-white hidden lg:inline-block">
                                  Xóa
                                </p>
                              </div>
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
              pageCount={pageCountStaff}
              currentPage={currentPageStaff}
              setCurrentPage={setCurrentPageStaff}
            ></PaginationButtons>
          </div>
        ) : (
          <div className="mt-5">
            <div className="flex flex-wrap gap-3 justify-between">
              <div className="flex flex-wrap gap-5 items-center justify-start">
                <p className="font-bold whitespace-nowrap">Tìm kiếm theo:</p>
                <select
                  value={selectedOptionPos}
                  onChange={handleOptionChangePos}
                  className="font-semibold text-lg py-3 px-3 rounded-md"
                >
                  <option value="Tên chức vụ">Tên chức vụ</option>
                  <option value="Cấp độ">Cấp độ</option>
                </select>
                <input
                  type="text"
                  placeholder={getPlaceholderTextPos()}
                  className="border border-black rounded-md py-0.5 px-2 text-lg w-24 lg:w-72 xl:w-96"
                  value={positionSearchTerm}
                  onChange={(e) => setPositionSearchTerm(e.target.value)}
                />
              </div>
              <NavLink
                className="my-5"
                to="/staff-management/position-add-page"
              >
                <Button />
              </NavLink>
            </div>

            <table className="w-full mt-5 text-center">
              <thead className="border-b-4 border-red-500">
                <tr className="text-md text-gray-500">
                  <th scope="col"></th>
                  <th scope="col" className="py-5 border-r-2">
                    Tên chức vụ
                  </th>
                  <th scope="col" className="py-5 border-r-2">
                    Cấp độ
                  </th>
                  <th scope="col" className="py-5 border-r-2">
                    Lương
                  </th>
                  <th scope="col" className="py-5 border-r-2">
                    Ngày tạo
                  </th>
                  <th scope="col" className="py-5 border-r-2">
                    Ngày cập nhật
                  </th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {position_items.length > 0 ? (
                  <>
                    {position_items.map((list, index) => (
                      <tr
                        key={index}
                        className="border-b border-slate-300 hover:bg-slate-200"
                      >
                        <td className="py-5 pl-3">
                          <input type="checkbox" />
                        </td>
                        <td scope="row" className="py-5 border-r-2">
                          {list.tenchucvu}
                        </td>
                        <td scope="row" className="py-5 border-r-2">
                          {list.capdo}
                        </td>
                        <td scope="row" className="py-5 border-r-2">
                          {list.luong}
                        </td>
                        <td scope="row" className="py-5 border-r-2">
                          {list.ngaytao}
                        </td>
                        <td scope="row" className="py-5 border-r-2">
                          {list.ngaycapnhat}
                        </td>
                        <td scope="row">
                          <div className="flex flex-wrap justify-center m-2 gap-3">
                            <NavLink to={`position-edit-page/${list.machucvu}`}>
                              <button>
                                <div className="flex gap-2 bg-green-500 p-2 rounded-md">
                                  <img src={EditIcon} alt="Icon chỉnh sửa" />
                                  <p className="font-bold text-white hidden lg:block">
                                    Chỉnh sửa
                                  </p>
                                </div>
                              </button>
                            </NavLink>
                            <button
                              onClick={() => deletePositionData(list.machucvu)}
                            >
                              <div className="flex gap-2 bg-amber-400 p-2 rounded-md">
                                <img src={TrashIcon} alt="Icon thùng rác" />
                                <p className="font-bold text-white hidden lg:inline-block">
                                  Xóa
                                </p>
                              </div>
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
              pageCount={pageCountPos}
              currentPage={currentPagePos}
              setCurrentPage={setCurrentPagePos}
            ></PaginationButtons>
          </div>
        )}
      </div>
    </div>
  );
}

export default Staff;
