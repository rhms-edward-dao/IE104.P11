import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Import Context Here
import { useTheme } from "../../contexts/ThemeContext";

// Import Assets Here
import {
  getAllDistrict,
  deleteDistrict,
} from "../../assets/Districts/DistrictData";
import { DistrictDataCard } from "../../assets/Districts/DistrictDataCard";

// Import Components Here
import Header from "../../components/Header";
import Card from "../../components/content/Card";
import Button from "../../components/UI/Button";
import PaginationButtons from "../../components/UI/PaginationButtons";

// Import Icons Here
import EditIcon from "../../images/icons/button/Edit.svg";
import DeleteIcon from "../../images/icons/button/Delete.svg";

function Districts() {
  // Variables here
  // // For Theme Mode
  const { theme } = useTheme();
  // // For Multi-Language
  const { t } = useTranslation();
  const { Title } = t("Header");
  const { DC_Districts } = t("DataCard");
  const { SearchBy, SF_Districts } = t("SearchFilter");
  const { Edit, Delete } = t("Buttons");
  // // For fetching data
  const [districtData, setDistrictData] = useState([]);
  const [statistics, setStatistics] = useState({});
  // // For searching
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  // // For pagination
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;
  // // For tracking the search-filter option and placeholder text
  const [selectedOption, setSelectedOption] = useState(
    SF_Districts.Columns.Col1
  );

  // Use Effect here
  // Get data from server here - data must be fetched before this page has been loaded
  // // For getting all existing districts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const existedDistrict = await getAllDistrict();        
        if (existedDistrict.length === 0) {
          setDistrictData([]);
          setStatistics({});
        } else {
          setDistrictData(existedDistrict);
          // Set data for statistics
          let totalDistrict = new Set();
          let totalCity = new Set();
          existedDistrict.forEach(item => {
            if (item.maquan) {
              totalDistrict.add(item.maquan);
            };
            if (item.tenthanhpho) {
              totalCity.add(item.tenthanhpho);
            };
          })
          setStatistics({
            "totalDistrict": totalDistrict.size,
            "totalCity": totalCity.size
          });
        }
      } catch (error) {
        console.error("Error while fetching: ", error);
      }
    };
    fetchData();
  }, []);
  // // For searching
  useEffect(() => {
    if (searchTerm.trim() !== "") {
      const results = districtData.filter((item) => {
        if (selectedOption === SF_Districts.Columns.Col1) {
          return item.tenquan.toLowerCase().includes(searchTerm.toLowerCase());
        } else if (selectedOption === SF_Districts.Columns.Col2) {
          return item.tenthanhpho
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        } else if (selectedOption === SF_Districts.Columns.Col3) {
          return item.tong_so_daily
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        }
        return false;
      });
      setSearchResults(results);
    } else {
      setSearchResults(districtData);
    }
  }, [searchTerm, districtData, selectedOption]);

  // Functions here
  // // For deleting one district
  // Delete feature
  const deleteItem = async (id) => {
    const response = await deleteDistrict(id);
    if (response.success) {
      alert(response.message);
      setDistrictData(districtData.filter((item) => item.maquan !== id));
    } else {
      alert(response.message);
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
      case SF_Districts.Columns.Col1:
        return SF_Districts.Placeholders.Text1;
      case SF_Districts.Columns.Col2:
        return SF_Districts.Placeholders.Text2;
      case SF_Districts.Columns.Col3:
        return SF_Districts.Placeholders.Text3;
      default:
        return SF_Districts.Placeholders.Text1;
    }
  };
  // Items for render
  const items = searchTerm ? searchResults : districtData;

  // Calculate offset
  const offset = currentPage * itemsPerPage;
  const currentItems =
    items.length > 0 ? items.slice(offset, offset + itemsPerPage) : [];
  const pageCount =
    items.length > 0 ? Math.ceil(parseFloat(items.length / itemsPerPage)) : 0;

  // Items for render
  const districtItems = searchTerm ? searchResults : currentItems;
  // Return here
  return (
    <div>
      <div>
        <Header headerTitle={Title.Districts}></Header>
      </div>
      <div className="m-5 flex flex-wrap justify-center gap-5 xl:gap-16 2xl:gap-44">
        {DistrictDataCard(theme, DC_Districts, statistics).map((card, index) => (          
          <Card
            key={index}
            image={card.img}
            description={card.description}
            value={card.value}
          />
        ))}
      </div>
      <div className="m-5 bg-white p-5 shadow-lg transition-colors duration-300 dark:bg-[#363636]">
        <div className="flex flex-wrap justify-between">
          <div className="flex flex-wrap items-center justify-start gap-5 my-5">
            <p className="text-lg whitespace-nowrap font-bold text-black transition-colors duration-300 dark:text-white">
              {SearchBy}
            </p>
            <select
              className="rounded-md border border-black bg-white px-3 py-0.5 text-lg font-semibold text-black transition-colors duration-300 dark:border-white dark:bg-[#363636] dark:text-white"
              value={selectedOption}
              onChange={handleOptionChange}
            >
              <option value={SF_Districts.Columns.Col1}>
                {SF_Districts.Columns.Col1}
              </option>
              <option value={SF_Districts.Columns.Col2}>
                {SF_Districts.Columns.Col2}
              </option>
              {/* <option value={SF_Districts.Columns.Col3}>
                {SF_Districts.Columns.Col3}
              </option> */}
            </select>
            <input
              className="w-24 rounded-md border border-black bg-white px-2 py-0.5 text-lg text-gray-500 transition-colors duration-300 dark:border-white dark:bg-[#363636] dark:text-gray-100 lg:w-72 xl:w-96"
              type="text"
              placeholder={getPlaceholderText()}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <NavLink to="district-add-page" className="my-5">
            <Button />
          </NavLink>
        </div>
        <table className="mt-5 w-full text-center text-black transition-colors duration-300 dark:text-white">
          <thead className="border-b-4 border-red-500">
            <tr className="text-lg">
              <th scope="col"></th>
              <th className="border-r-2 py-5" scope="col">
                {SF_Districts.Columns.Col1}
              </th>
              <th className="border-r-2 py-5" scope="col">
                {SF_Districts.Columns.Col2}
              </th>
              <th className="border-r-2 py-5" scope="col">
                {SF_Districts.Columns.Col3}
              </th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {districtItems.length > 0 ? (
              districtItems.map((list, index) => (
                <tr
                  className="border-b border-slate-300 text-black text-md transition-colors duration-300 hover:bg-slate-200 dark:border-white dark:text-white dark:hover:bg-slate-500"
                  key={index}
                >
                  <td className="py-5 pl-3">
                    <input type="checkbox" />
                  </td>
                  <td className="border-r-2 py-5" scope="row">
                    {list.tenquan}
                  </td>
                  <td className="border-r-2 py-5" scope="row">
                    {list.tenthanhpho}
                  </td>
                  <td className="border-r-2 py-5" scope="row">
                    {list.tong_so_daily}
                  </td>
                  <td scope="row">
                    <div className="flex flex-wrap justify-center gap-5 my-5">
                      <NavLink
                        className="flex items-center gap-2 rounded-lg bg-green-500 px-4 py-2 font-bold text-white"
                        to={`district-edit-page/${list.maquan}`}
                        state={{
                          existedData: districtData
                        }}
                      >
                        <p className="hidden sm:hidden md:hidden lg:inline-block">
                          {Edit}
                        </p>
                        <img src={EditIcon} alt="Icon chỉnh sửa" />
                      </NavLink>
                      <button
                        className="flex items-center gap-2 rounded-lg bg-amber-400 px-4 py-2 font-bold text-white"
                        onClick={() => deleteItem(list.maquan)}
                      >
                        <p className="hidden sm:hidden md:hidden lg:inline-block">
                          {Delete}
                        </p>
                        <img src={DeleteIcon} alt="Icon thùng rác" />
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

export default Districts;
