import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import Card from "../../components/content/Card";
import Header from "../../components/content/Header";
import PaginationButtons from "../../components/UI/PaginationButtons";
import DWCardData from "../../assets/WarehouseCardData";

import TrashIcon from "../../images/icons/trash.png";
import EditIcon from "../../images/icons/edit.png";
import Button from "../../components/UI/Button";

import { getAllDistrict, deleteDistrict } from "../../assets/StoreDistrict";

function Districts() {
  // Variabls here
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // Varibles for pagination
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  // State to track the selected option and placeholder text
  const [selectedOption, setSelectedOption] = useState("Tên quận");

  // Function to handle the change of the dropdown and update placeholder
  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  // Placeholder text based on the selected option
  const getPlaceholderText = () => {
    switch (selectedOption) {
      case "Tên quận":
        return "Tìm kiếm theo tên quận ...";
      case "Thành phố":
        return "Tìm kiếm theo thành phố ...";
      default:
        return "Tìm kiếm ...";
    }
  };

  // Get data from server here - data must be fetched before this page has been loaded
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllDistrict();
        setData(data);
      } catch (error) {
        console.error("Error while fetching: ", error);
      }
    };
    fetchData();
  }, []);

  // Delete feature
  const deleteItem = async (id) => {
    const response = await deleteDistrict(id);
    if (response.message === "Xóa quận thành công") {
      alert("Xóa quận thành công");
      setData(data.filter((item) => item.maquan !== id));
    } else {
      alert("Xóa quận thất bại");
    }
  };

  // Search feature here
  useEffect(() => {
    if (searchTerm.trim() !== "") {
      const result = data.filter((item) =>
        item.tenquan.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(result);
    } else {
      setSearchResults(data);
    }
  }, [searchTerm, data]);

  useEffect(() => {
    if (searchTerm.trim() !== "") {
      const results = data.filter((item) => {        
        if (selectedOption === "Tên quận") {
          return item.tenquan.toLowerCase().includes(searchTerm.toLowerCase());
        } else if (selectedOption === "Thành phố") {
          return item.tenthanhpho.toLowerCase().includes(searchTerm.toLowerCase());
        }
        return false;
      });
      setSearchResults(results);
    } else {
      setSearchResults(data);
    }
  }, [searchTerm, data, selectedOption]);
  // Items for render
  const items = searchTerm ? searchResults : data;

  // Calculate offset
  const offset = currentPage * itemsPerPage;
  const currentItems =
    items.length > 0 ? items.slice(offset, offset + itemsPerPage) : [];
  const pageCount =
    items.length > 0 ? Math.ceil(parseFloat(items.length / itemsPerPage)) : 0;

  // Return here
  return (
    <div>
      <div>
        <Header headerTitle="Danh sách quận"></Header>
      </div>

      <div className="flex flex-wrap gap-5 xl:gap-16 2xl:gap-44 justify-center m-5">
        {DWCardData.map((card, index) => (
          <Card
            key={index}
            image={card.img}
            description={card.description}
            value={card.value}
          />
        ))}
      </div>

      <div className="m-5 p-5 bg-white shadow-lg">
        <div className="flex flex-wrap gap-3 justify-between">
          <div className="flex flex-wrap gap-5 items-center justify-start">
            <p className="font-bold whitespace-nowrap">Tìm kiếm theo:</p>
            <select
              value={selectedOption}
              onChange={handleOptionChange}
              className="font-semibold text-lg py-3 px-3 rounded-md"
            >
              <option value="Tên quận">Tên quận</option>
              <option value="Thành phố">Thành phố</option>
            </select>
            <input
              type="text"
              placeholder={getPlaceholderText()}
              className="border border-black rounded-md py-0.5 px-2 text-lg w-24 lg:w-72 xl:w-96"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <NavLink to="district-add-page">
            <Button />
          </NavLink>
        </div>

        <table className="w-full mt-5 text-center">
          <thead className="border-b-4 border-red-500">
            <tr className="text-md text-gray-500">
              <th scope="col"></th>
              <th scope="col" className="py-5 border-r-2">
                Tên quận
              </th>
              <th scope="col" className="py-5 border-r-2">
                Thành phố
              </th>
              <th scope="col" className="py-5 border-r-2">
                Tổng số đại lý trong quận
              </th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              <>
                {currentItems.map((list, index) => (
                  <tr
                    key={index}
                    className="border-b border-slate-300 hover:bg-slate-200 text-md"
                  >
                    <td className="py-5 pl-3">
                      <input type="checkbox" />
                    </td>
                    <td scope="row" className="py-5 border-r-2">
                      {list.tenquan}
                    </td>
                    <td scope="row" className="py-5 border-r-2">
                      {list.tenthanhpho}
                    </td>
                    <td scope="row" className="py-5 border-r-2">
                      {list.tong_so_daily}
                    </td>
                    <td scope="row">
                      <div className="flex flex-wrap justify-center gap-3">
                        <NavLink
                          to={`/districts/district-edit-page/${list.maquan}`}
                        >
                          <button>
                            <div className="flex gap-2 bg-green-500 py-2 px-4 rounded-lg items-center">
                              <img src={EditIcon} alt="Icon chỉnh sửa" />
                              <p className="font-bold text-white hidden sm:hidden md:hidden lg:inline-block">
                                Chỉnh sửa
                              </p>
                            </div>
                          </button>
                        </NavLink>
                        <button>
                          <div
                            className="flex gap-2 bg-amber-400 p-2 rounded-md"
                            onClick={() => deleteItem(list.maquan)}
                          >
                            <img src={TrashIcon} alt="Icon thùng rác" />
                            <p className="font-bold text-white hidden sm:hidden md:hidden lg:inline-block">
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
          pageCount={pageCount}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        ></PaginationButtons>
      </div>
    </div>
  );
}

export default Districts;
