import { useState } from "react";
import { NavLink } from "react-router-dom";

import Button from "../components/UI/Button";
import Card from "../components/content/Card";
import Header from "../components/content/Header";
import PCardData from "../assets/ProductCardData";
import PListData from "../assets/ProductListData";
import EditIcon from "../images/icons/edit.png";
import TrashIcon from "../images/icons/trash.png";

function Products() {
  const [selectedOption, setSelectedOption] = useState("Tên mặt hàng");
  const [searchTerm, setSearchTerm] = useState("");

  // Handle dropdown option change
  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  // Handle input text change
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Placeholder text based on the selected option
  const getPlaceholderText = () => {
    switch (selectedOption) {
      case "Tên mặt hàng":
        return "Tìm kiếm loại mặt hàng ...";
      case "Số lượng tồn":
        return "Tìm kiếm số lượng tồn của mặt hàng ...";
      case "Đơn vị tính":
        return "Tìm kiếm đơn vị tính của mặt hàng ...";
      default:
        return "Tìm kiếm ...";
    }
  };

  // Filter the table data based on the selected filter type and search term
  const filteredData = PListData.filter((list) => {
    if (selectedOption === "Tên mặt hàng") {
      return list.productName.toLowerCase().includes(searchTerm.toLowerCase());
    } else if (selectedOption === "Số lượng tồn") {
      return list.amountLeft.toString().includes(searchTerm);
    } else if (selectedOption === "Đơn vị tính") {
      return list.unit.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return list;
  });

  return (
    <div>
      <div>
        <Header headerTitle="Danh sách mặt hàng"></Header>
      </div>
      <div className="flex flex-wrap gap-5 md:gap-8 lg:gap-10 xl:gap-12 2xl:gap-24 justify-center m-10">
        {PCardData.map((card, index) => (
          <Card
            key={index}
            image={card.img}
            description={card.description}
            value={card.value}
          ></Card>
        ))}
      </div>
      <div className="m-5 p-5 bg-white shadow-lg">
        <div className="flex justify-between">
          <div className="flex gap-5 items-center justify-start">
            <p className="font-bold whitespace-nowrap">Tìm kiếm theo:</p>
            <select
              value={selectedOption}
              onChange={handleOptionChange}
              className="font-semibold text-lg py-0.5 px-3 rounded-md border border-black"
            >
              <option value="Tên mặt hàng">Tên mặt hàng</option>
              <option value="Số lượng tồn">Số lượng tồn</option>
              <option value="Đơn vị tính">Đơn vị tính</option>
            </select>
            <input
              type="text"
              value={searchTerm}
              onChange={handleInputChange}
              placeholder={getPlaceholderText()}
              className="border border-black rounded-md py-0.5 px-2 text-lg w-[350px] xl:w-96"
            />
          </div>
          <NavLink to="products-add-page">
            <Button />
          </NavLink>
        </div>

        {/* Render table */}
        <table className="w-full mt-5 text-center">
          <thead className="border-b-4 border-red-500">
            <tr className="text-md">
              <th></th>
              <th></th>
              <th scope="col" className="py-5">
                Tên mặt hàng
              </th>
              <th scope="col" className="py-5">
                Số lượng tồn
              </th>
              <th scope="col" className="py-5">
                Đơn vị tính
              </th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((list, index) => (
              <tr
                key={index}
                className="border-b border-slate-300 hover:bg-slate-200"
              >
                <td className="py-3 pl-3">
                  <input type="checkbox" />
                </td>
                <td scope="row" className="py-3 border-x-2">
                  <img src={list.img} alt="Hình đại lý" />
                </td>
                <td scope="row" className="py-3">
                  {list.productName}
                </td>
                <td scope="row" className="py-3 border-x-2">
                  {list.amountLeft}
                </td>
                <td scope="row" className="py-3">
                  {list.unit}
                </td>
                <td scope="row">
                  <div className="flex justify-center gap-20 sm:gap-5 md:gap-5 lg:gap-10 xl:gap-16 2xl:gap-20">
                    <NavLink to="products-edit-page">
                      <button>
                        <div className="flex gap-2 bg-green-500 py-2 px-4 rounded-lg items-center">
                          <p className="font-bold text-white hidden sm:hidden md:hidden lg:inline-block">
                            Chỉnh sửa
                          </p>
                          <img src={EditIcon} alt="Icon chỉnh sửa" />
                        </div>
                      </button>
                    </NavLink>
                    <button>
                      <div className="flex gap-2 bg-amber-400 py-2 px-4 rounded-lg items-center">
                        <p className="font-bold text-white hidden sm:hidden md:hidden lg:inline-block">
                          Xóa
                        </p>
                        <img src={TrashIcon} alt="Icon thùng rác" />
                      </div>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Products;
