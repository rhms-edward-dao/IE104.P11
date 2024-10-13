import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import Card from "../../components/content/Card";
import Header from "../../components/content/Header";
import PaginationButtons from "../../components/UI/PaginationButtons";
import DWCardData from "../../assets/WarehouseCardData";

import ListHeader from "../../components/content/ListHeader";
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
      <hr className="mr-5" />
      <div className="mt-8">
        <div className="flex flex-wrap">
          <div className="w-1/2">
            {/* <ListHeader headerTitle="Danh sách quận"></ListHeader> */}
          </div>
          <div className="w-1/2 flex gap-5">
            <input
              type="text"
              placeholder="  Tìm kiếm theo tên quận ..."
              className="w-5/6 border border-black rounded-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <NavLink to="district-add-page">
              <Button></Button>
            </NavLink>
          </div>
        </div>

        <table className="w-full mt-5 text-left">
          <thead className="border-b-4 border-red-500">
            <tr className="text-md text-gray-500">
              <th scope="col"></th>
              <th scope="col" className="py-5">
                Tên quận
              </th>
              <th scope="col" className="py-5">
                Thành phố
              </th>
              <th scope="col" className="py-5">
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
                    <td scope="row" className="py-5">
                      {list.tenquan}
                    </td>
                    <td scope="row" className="py-5">
                      {list.tenthanhpho}
                    </td>
                    <td scope="row" className="py-5">
                      {list.tong_so_daily}
                    </td>
                    <td scope="row">
                      <div className="flex flex-wrap my-2 gap-3">
                        <NavLink
                          to={`/districts/district-edit-page/${list.maquan}`}
                        >
                          <button>
                            <div className="flex gap-2 bg-green-500 p-2 rounded-md">
                              <img src={EditIcon} alt="Icon chỉnh sửa" />
                              <p className="font-bold text-white hidden sm:block">
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
                            <p className="font-bold text-white hidden sm:block">
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
