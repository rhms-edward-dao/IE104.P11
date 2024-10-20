import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import Card from "../../components/content/Card";
import Header from "../../components/Header";
import Button from "../../components/UI/Button";
import PaginationButtons from "../../components/UI/PaginationButtons";

import DWCardData from "../../assets/WarehouseCardData";

import TrashIcon from "../../images/icons/trash.png";
import EditIcon from "../../images/icons/edit.png";

import {
  getAllTypeOfProduct,
  deleteOneCategory,
} from "../../assets/TypeOfProduct";
import { getAllProducts, deleteProduct } from "../../assets/AdminProduct";
import { useStoreTab } from "../../contexts/StoreTabState";

function ProductCategorys() {
  // Variabls for product category here
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // Variables for products here
  const [productData, setProductData] = useState([]);
  const [productSearchTerm, setProductSearchTerm] = useState("");
  const [productSearchResults, setProductSearchResults] = useState([]);

  // Variables for tab state here
  const { isProductTab, activateProductTab, deactivateProductTab } =
    useStoreTab();

  // Pagination states - for kind of product
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  // Pagination states - for products
  const [currentPageProduct, setCurrentPageProduct] = useState(0);

  // State to track the selected option and placeholder text
  const [selectedOption, setSelectedOption] = useState("Tên mặt hàng");
  const [selectedOptionCat, setSelectedOptionCat] =
    useState("Tên loại mặt hàng");

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
      case "Tên đại lý":
        return "Tìm kiếm theo tên mặt hàng ...";
      case "Tên loại mặt hàng":
        return "Tìm kiếm theo tên loại mặt hàng ...";
      default:
        return "Tìm kiếm ...";
    }
  };
  // Get data from server here - data must be fetched before this page has been loaded
  useEffect(() => {
    const fetchData = async () => {
      // Getting data for type of product
      const data = await getAllTypeOfProduct();
      setData(data);

      // Getting data for product
      const proData = await getAllProducts();
      setProductData(proData);
    };
    fetchData();
  }, []);

  //  Function for deleteing category
  const deleteData = async (id) => {
    const response = await deleteOneCategory(id);
    if (response.message === "Xóa loại mặt hàng thành công") {
      alert("Xóa loại mặt hàng thành công");
      setData(data.filter((item) => item.maloaimathang != id));
    }
  };

  // Function for deleting product
  const deleteProductData = async (id) => {
    const response = await deleteProduct(id);
    if (response.message == "Xóa mặt hàng thành công") {
      alert("Xóa mặt hành thành công");
      setProductData(
        productData.filter((item) => item.Mathang.mamathang != id)
      );
    }
  };

  // Search feature here
  useEffect(() => {
    if (searchTerm.trim() !== "") {
      const result = data.filter((item) =>
        item.tenloaimathang.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(result);
    } else {
      setSearchResults(data);
    }

    if (productSearchTerm.trim() !== "") {
      const presult = productData.filter((item) => {
        if (selectedOption === "Tên mặt hàng") {
          return item.Mathang.tenmathang
            .toLowerCase()
            .includes(productSearchTerm.toLowerCase());
        } else {
          return item.tenloaimathang
            .toLowerCase()
            .includes(productSearchTerm.toLowerCase());
        }
      });
      setProductSearchResults(presult);
    } else {
      setProductSearchResults(productData);
    }
  }, [
    searchTerm,
    productSearchTerm,
    data,
    productData,
    selectedOption,
    selectedOptionCat,
  ]);

  const items = searchTerm ? searchResults : data;
  const product_items = productSearchTerm ? productSearchResults : productData;

  // Calculate amount of items that will be shown - for items
  const offset = currentPage * itemsPerPage;
  const currentItems = items.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(parseFloat(items.length / itemsPerPage));

  // Calculate amount of items that will be shown - for products
  const offsetProduct = currentPageProduct * itemsPerPage;
  // const currentItemsProduct = product_items.slice(
  //   offsetProduct,
  //   offsetProduct + itemsPerPage
  // );
  const pageCountProduct = Math.ceil(
    parseFloat(product_items.length / itemsPerPage)
  );

  // Return here
  return (
    <div>
      <div>
        <Header
          headerTitle={
            isProductTab ? "Danh sách mặt hàng" : "Danh sách loại mặt hàng"
          }
        ></Header>
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
        {/* Tab for changing what to show */}
        {isProductTab ? (
          <div className="mt-6 text-md font-bold text-center text-gray-500">
            <ul className="flex flex-wrap -mb-px">
              <li className="me-2">
                <button className="inline-block p-4 border-b-2 rounded-t-lg text-blue-600 border-blue-600">
                  Mặt hàng
                </button>
              </li>
              <li className="me-2">
                <button
                  className="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-800"
                  onClick={() => deactivateProductTab()}
                >
                  Loại mặt hàng
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
                  onClick={() => activateProductTab()}
                >
                  Mặt hàng
                </button>
              </li>
              <li className="me-2">
                <button className="inline-block p-4 border-b-2 rounded-t-lg text-blue-600 border-blue-600">
                  Loại mặt hàng
                </button>
              </li>
            </ul>
          </div>
        )}

        {isProductTab ? (
          <div className="mt-5">
            <div className="flex flex-wrap gap-3 justify-between">
              <div className="flex flex-wrap gap-5 items-center justify-start">
                <p className="font-bold whitespace-nowrap">Tìm kiếm theo:</p>
                <select
                  value={selectedOption}
                  onChange={handleOptionChange}
                  className="font-semibold text-lg py-3 px-3 rounded-md"
                >
                  <option value="Tên mặt hàng">Tên mặt hàng</option>
                  <option value="Tên loại mặt hàng">Tên loại mặt hàng</option>
                </select>
                <input
                  type="text"
                  placeholder={getPlaceholderText()}
                  className="border border-black rounded-md py-0.5 px-2 text-lg w-24 lg:w-72 xl:w-96"
                  value={productSearchTerm}
                  onChange={(e) => setProductSearchTerm(e.target.value)}
                />
              </div>
              <NavLink to="/product-categorys/product-add-page">
                <Button />
              </NavLink>
            </div>

            <table className="w-full mt-5 text-center">
              <thead className="border-b-4 border-red-500">
                <tr className="text-md text-gray-500">
                  <th scope="col"></th>
                  <th scop="col" className="py-5 border-r-2">
                    Hình ảnh
                  </th>
                  <th scope="col" className="py-5 border-r-2">
                    Tên mặt hàng
                  </th>
                  <th scope="col" className="py-5 border-r-2">
                    Đơn giá
                  </th>
                  <th scope="col" className="py-5 border-r-2">
                    Số lượng tồn
                  </th>
                  <th scope="col" className="py-5 border-r-2">
                    Tên DVT
                  </th>
                  <th scope="col" className="py-5 border-r-2">
                    Tên loại mặt hàng
                  </th>
                  <th scope="col" className="py-5 border-r-2">
                    Tên đại lý
                  </th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {product_items.length > 0 ? (
                  <>
                    {product_items.map((list, index) => (
                      <tr
                        key={index}
                        className="border-b border-slate-300 hover:bg-slate-200 text-md"
                      >
                        <td className="py-5 pl-3">
                          <input type="checkbox" />
                        </td>
                        <td scope="row" className="py-5 border-r-2">
                          <img
                            width="250px"
                            src={`data:image/jpeg;base64, ${list.Mathang.hinhanh}`}
                            alt="Hình mặt hàng"
                            className="rounded 2xl:h-20 2xl:w-40"
                          ></img>
                        </td>
                        <td scope="row" className="py-5 border-r-2">
                          {list.Mathang.tenmathang}
                        </td>
                        <td scope="row" className="py-5 border-r-2">
                          {list.Mathang.dongia}
                        </td>
                        <td scope="row" className="py-5 border-r-2">
                          {list.Mathang.soluongton}
                        </td>
                        <td scope="row" className="py-5 border-r-2">
                          {list.Mathang.tendvt}
                        </td>
                        <td scope="row" className="py-5 border-r-2">
                          {list.tenloaimathang}
                        </td>
                        <td scope="row" className="py-5 border-r-2">
                          {list.tendaily}
                        </td>
                        <td scope="row">
                          <div className="flex flex-wrap justify-center gap-3">
                            <NavLink
                              to={`product-edit-page/${list.Mathang.mamathang}`}
                            >
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
                              onClick={() =>
                                deleteProductData(list.Mathang.mamathang)
                              }
                            >
                              <div className="flex gap-2 bg-amber-400 p-2 rounded-md">
                                <img src={TrashIcon} alt="Icon thùng rác" />
                                <p className="font-bold text-white hidden lg:block">
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
              pageCount={pageCountProduct}
              currentPage={currentPageProduct}
              setCurrentPage={setCurrentPageProduct}
            ></PaginationButtons>
          </div>
        ) : (
          <div className="mt-5">
            <div className="flex flex-wrap gap-3 justify-between">
              <div className="flex flex-wrap gap-5 items-center justify-start">
                <p className="font-bold whitespace-nowrap">Tìm kiếm theo:</p>
                <select
                  value={selectedOptionCat}
                  onChange={handleOptionChangeCat}
                  className="font-semibold text-lg py-3 px-3 rounded-md"
                >
                  <option value="Tên loại mặt hàng">Tên loại mặt hàng</option>
                </select>
                <input
                  type="text"
                  placeholder={getPlaceholderText()}
                  className="border border-black rounded-md py-0.5 px-2 text-lg w-24 lg:w-72 xl:w-96"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <NavLink to="/product-categorys/product-categorys-add-page">
                <Button />
              </NavLink>
            </div>

            <table className="w-full mt-5 text-left">
              <thead className="border-b-4 border-red-500">
                <tr className="text-md text-gray-500">
                  <th scope="col"></th>
                  <th scope="col" className="py-5 border-r-2">
                    Tên loại mặt hàng{" "}
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
                        <td className="py-5">
                          <input type="checkbox" />
                        </td>
                        <td scope="row" className="py-5 border-r-2">
                          {list.tenloaimathang}
                        </td>
                        <td scope="row">
                          <div className="flex flex-wrap justify-center gap-3">
                            <NavLink
                              to={`product-categorys-edit-page/${list.maloaimathang}`}
                            >
                              <button>
                                <div className="flex gap-2 bg-green-500 p-2 rounded-md">
                                  <img src={EditIcon} alt="Icon chỉnh sửa" />
                                  <p className="font-bold text-white hidden sm:hidden md:hidden lg:inline-block">
                                    Chỉnh sửa
                                  </p>
                                </div>
                              </button>
                            </NavLink>
                            <button
                              onClick={() => deleteData(list.maloaimathang)}
                            >
                              <div className="flex gap-2 bg-amber-400 p-2 rounded-md">
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
        )}
      </div>
    </div>
  );
}

export default ProductCategorys;
