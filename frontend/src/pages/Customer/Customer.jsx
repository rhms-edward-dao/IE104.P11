import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Import Context Here
import { useTheme } from "../../contexts/ThemeContext";

// Import Assets Here
import {
  getAllCustomer,
  deleteCustomer,
} from "../../assets/Customers/CustomerData";
import { CustomerDataCard } from "../../assets/Customers/CustomerDataCard";

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
// import PaginationButtons from "../../components/UI/PaginationButtons";
// import DWCardData from "../../assets/WarehouseCardData";

// import TrashIcon from "../../images/icons/trash.png";
// import EditIcon from "../../images/icons/edit.png";
// import Button from "../../components/UI/Button";

// import { getAllCustomer, deleteCustomer } from "../../assets/CustomerData";

function Customer() {
  // Variables here
  // // For Theme Mode and Multi-Language
  const { theme } = useTheme();
  const { t } = useTranslation();
  const { Title } = t("Header");
  const { DC_Customers } = t("DataCard");
  const { SearchBy, SF_Customers } = t("SearchFilter");
  const { Add, Edit, Delete } = t("Buttons");
  // // For fetching data
  const [data, setData] = useState([]);
  // // For searching
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  // Variables for pagination
  // // For pagination
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;
  // State to track the selected option and placeholder text
  // // For tracking the search-filter option and placeholder text
  const [selectedOption, setSelectedOption] = useState(
    SF_Customers.Columns.Col1
  );

  // Use Effect here
  // // For getting all existing customers
  // Function for getting all existing customers
  useEffect(() => {
    const fetchData = async () => {
      const existedData = await getAllCustomer();
      setData(existedData);
    };
    fetchData();
  }, []);

  // Function for searching
  // // For searching
  useEffect(() => {
    if (searchTerm.trim() !== "") {
      const results = data.filter((item) => {
        if (selectedOption === SF_Customers.Columns.Col1) {
          return item.tenkhachhang
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        } else if (selectedOption === SF_Customers.Columns.Col2) {
          return item.sodienthoai.includes(searchTerm);
        }
        return false;
      });
      setSearchResults(results);
    } else {
      setSearchResults(data);
    }
  }, [searchTerm, data, selectedOption]);

  // Functions here
  // // For deleting one customer
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

  // // For handling the chage of search-filter and update placeholder
  // Function to handle the change of the dropdown and update placeholder
  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  // // For changing placeholder text base on the selected search-filter option
  // Placeholder text based on the selected option
  const getPlaceholderText = () => {
    switch (selectedOption) {
      case SF_Customers.Columns.Col1:
        return SF_Customers.Placeholders.Text1;
      case SF_Customers.Columns.Col2:
        return SF_Customers.Placeholders.Text2;
      default:
        return SF_Customers.Placeholders.Text1;
    }
  };

  const items = searchTerm ? searchResults : data;

  // Calculate offset
  const offset = currentPage * itemsPerPage;
  const currentItems =
    items.length > 0 ? items.slice(offset, offset + itemsPerPage) : [];
  const pageCount =
    items.length > 0 ? Math.ceil(items.length / itemsPerPage) : 0;

  // Return here
  return (
    <div>
      <div>
        <Header headerTitle={Title.Customers} />
      </div>
      <div className="flex flex-wrap gap-5 xl:gap-16 2xl:gap-44 justify-center m-5">
        {CustomerDataCard(theme, DC_Customers).map((card, index) => (
          <Card
            key={index}
            image={card.img}
            description={card.description}
            value={card.value}
          />
        ))}
      </div>
      <div className="m-5 bg-white p-5 shadow-lg transition-colors duration-300 dark:bg-[#363636]">
        <div className="flex flex-wrap gap-3 justify-between">
          <div className="flex flex-wrap gap-5 items-center justify-start text-black dark:text-white">
            <p className="font-bold whitespace-nowrap">{SearchBy}</p>
            <select
              value={selectedOption}
              onChange={handleOptionChange}
              className="rounded-md border border-black bg-white px-3 py-0.5 text-lg font-semibold transition-colors duration-300 dark:border-white dark:bg-[#363636]"
            >
              <option value={SF_Customers.Columns.Col1}>
                {SF_Customers.Columns.Col1}
              </option>
              <option value={SF_Customers.Columns.Col2}>
                {SF_Customers.Columns.Col2}
              </option>
            </select>
            <input
              type="text"
              placeholder={getPlaceholderText()}
              className="rounded-md border border-black bg-white px-2 py-0.5 text-lg text-gray-500 transition-colors duration-300 dark:border-white dark:bg-[#363636] dark:text-gray-100 w-24 lg:w-72 xl:w-96"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <NavLink to="customer-add-page">
            <Button />
          </NavLink>
        </div>
        <table className="mt-5 w-full text-center text-black transition-colors duration-300 dark:text-white">
          <thead className="border-b-4 border-red-500">
            <tr className="text-md text-gray-500">
              <th scope="col"></th>
              <th scope="col" className="border-r-2 py-5 text-lg">
                {SF_Customers.Columns.Col1}
              </th>
              <th scope="col" className="py-5 text-lg">
                {SF_Customers.Columns.Col2}
              </th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((list, index) => (
                <tr
                  key={index}
                  className="border-b border-slate-300 text-black transition-colors duration-300 hover:bg-slate-200 dark:border-white dark:text-white dark:hover:bg-slate-500"
                >
                  <td className="py-5 pl-3">
                    <input type="checkbox" />
                  </td>
                  <td scope="row" className="border-r-2 py-5 text-lg">
                    {list.tenkhachhang}
                  </td>
                  <td scope="row" className="py-5 text-lg">
                    {list.sodienthoai}
                  </td>
                  <td scope="row">
                    <div className="flex flex-wrap justify-center gap-20 sm:gap-5 md:gap-5 lg:gap-10 xl:gap-16 2xl:gap-20">
                      <NavLink
                        className="flex items-center gap-2 rounded-lg bg-green-500 px-4 py-2 font-bold text-white"
                        to="customer-edit-page"
                      >
                        <img src={EditIcon} alt="Icon chỉnh sửa" />
                        <p className="hidden sm:hidden md:hidden lg:inline-block">
                          {Edit}
                        </p>
                      </NavLink>
                      <button
                        className="flex items-center gap-2 rounded-lg bg-amber-400 px-4 py-2 font-bold text-white"
                        onClick={() => deleteItem(list.makhachhang)}
                      >
                        <img src={DeleteIcon} alt="Icon thùng rác" />
                        <p className="hidden sm:hidden md:hidden lg:inline-block">
                          {Delete}
                        </p>
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
