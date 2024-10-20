import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import Card from "../../components/content/Card";
import Header from "../../components/content/Header";
import PaginationButtons from "../../components/UI/PaginationButtons";
import DWCardData from "../../assets/WarehouseCardData";

import TrashIcon from "../../images/icons/trash.png";
import EditIcon from "../../images/icons/edit.png";
import Button from "../../components/UI/Button";

import { getAllCustomer, deleteCustomer } from "../../assets/CustomerData";

function Customer() {
  // Variables here
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  // Variables for pagination
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;
  // State to track the selected option and placeholder text
  const [selectedOption, setSelectedOption] = useState("Tên khách hàng");

  // Function to handle the change of the dropdown and update placeholder
  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  // Placeholder text based on the selected option
  const getPlaceholderText = () => {
    switch (selectedOption) {
      case "Tên khách hàng":
        return "Tìm kiếm theo tên khách hàng ...";
      case "Số điện thoại":
        return "Tìm kiếm theo số điện thoại ...";
      default:
        return "Tìm kiếm ...";
    }
  };

  // Function for getting all existing customers
  useEffect(() => {
    const fetchData = async () => {
      const existedData = await getAllCustomer();
      setData(existedData);
    };
    fetchData();
  }, []);

  // Function for searching
  useEffect(() => {
    if (searchTerm.trim() !== "") {
      const results = data.filter((item) => {
        if (selectedOption === "Tên khách hàng") {
          return item.tenkhachhang.toLowerCase().includes(searchTerm.toLowerCase());
        } else if (selectedOption === "Số điện thoại") {
          return item.sodienthoai.toLowerCase().includes(searchTerm.toLowerCase());
        }
        return false;
      });
      setSearchResults(results);
    } else {
      setSearchResults(data);
    }
  }, [searchTerm, data, selectedOption]);

  // Function for deleting one customer
  const deleteItem = async (id) => {
    const response = await deleteCustomer(id);
    if (response.message === "Xóa khách hàng thất bại") {
      alert("Xóa khách hàng thất bại");
    } else {
      alert("Xóa khách hàng thành công");
      setData(data.filter((item) => item.makhachhang !== id));
    }
  };

  // Return here
  const items = searchTerm ? searchResults : data;

  // Calculate offset
  const offset = currentPage * itemsPerPage;
  const currentItems =
    items.length > 0 ? items.slice(offset, offset + itemsPerPage) : [];
  const pageCount =
    items.length > 0 ? Math.ceil(items.length / itemsPerPage) : 0;

  return (
    <div>
      <div>
        <Header headerTitle="Danh sách khách hàng" />
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
              className="font-semibold text-lg py-3 px-3 rounded-md "
            >
              <option value="Tên khách hàng">Tên khách hàng</option>
              <option value="Số điện thoại">Số điện thoại</option>
            </select>
            <input
              type="text"
              placeholder={getPlaceholderText()}
              className="border border-black rounded-md py-0.5 px-2 text-lg w-24 lg:w-72 xl:w-96"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <NavLink to="customer-add-page">
            <Button />
          </NavLink>
        </div>
        <table className="w-full mt-5 text-center">
          <thead className="border-b-4 border-red-500">
            <tr className="text-md text-gray-500">
              <th scope="col"></th>
              <th scope="col" className="py-5 border-r-2">
                Tên khách hàng
              </th>
              <th scope="col" className="py-5 border-r-2">
                Số điện thoại
              </th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((list, index) => (
                <tr
                  key={index}
                  className="border-b border-slate-300 hover:bg-slate-200"
                >
                  <td className="py-5 pl-3">
                    <input type="checkbox" />
                  </td>
                  <td scope="row" className="py-5 border-r-2">
                    {list.tenkhachhang}
                  </td>
                  <td scope="row" className="py-5 border-r-2">
                    {list.sodienthoai}
                  </td>
                  <td scope="row">
                    <div className="flex flex-wrap justify-center gap-20 sm:gap-5 md:gap-5 lg:gap-10 xl:gap-16 2xl:gap-20">
                      <NavLink to="customer-edit-page">
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
                          className="flex gap-2 bg-amber-400 py-2 px-4 rounded-lg items-center"
                          onClick={() => deleteItem(list.makhachhang)}
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
              ))
            ) : (
              <></>
            )}
          </tbody>
        </table>
        <PaginationButtons
          pageCount={pageCount}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
}

export default Customer;
