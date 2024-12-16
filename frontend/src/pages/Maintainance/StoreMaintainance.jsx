// Import basic elements fromt React.JS
import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
// Import elements for translation
import { useTranslation } from "react-i18next";
import { useLanguage } from "../../contexts/LanguageContext";
// Import elements for Calendar
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
import { DateRange } from "react-date-range";
import addDays from "date-fns/addDays";
import { vi, enUS, de, zhCN, fr, ja } from "date-fns/locale";
// Import css for styling the calendar
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
// Import Contexts Here
import { useAuth } from "../../contexts/AuthContext";
// Import Components Here
import Header from "../../components/Header";
import { getStoreById } from "../../assets/Stores/StoreData";
import {
  addMaintainanceApi,
  getMaintainanceApi,
} from "../../assets/Stores/StoreData";

function StoreMaintainance() {
  // Variables here
  const { isAdmin } = useAuth();
  const { storeId } = useParams();
  const [storeData, setStoreData] = useState({});
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [mtData, setMtData] = useState([]);
  const [loading, setLoading] = useState(true);
  // // For Multi-Language
  const { t } = useTranslation();
  const { selectedLanguage } = useLanguage();
  const { Information, Buttons } = t("StoreMaintainance");
  // // For table sorting
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" }); // Table Columns Header Sorting A-Z and Z-A
  // Functions here
  // // For fetching Data
  useEffect(() => {
    const fetchData = async (id) => {
      // Getting information of daily
      const data = await getStoreById(id);
      setStoreData(data[0]);
      setLoading(false);
      // Getting information of maintainance
      const maintainanceData = await getMaintainanceApi(id);
      if (maintainanceData.message !== "Danh sách bảo trì rỗng") {
        setMtData(maintainanceData);
      }
    };
    fetchData(storeId);
  }, []);
  // // Handle sorting
  const handleSort = (key) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";

    const sortedData = [...mtData].sort((a, b) => {
      const aValue = a[key];
      const bValue = b[key];

      if (aValue < bValue) return direction === "asc" ? -1 : 1;
      if (aValue > bValue) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setMtData(sortedData);
  };
  //   For updating date
  const addMaintainance = async (price, description, startDate, endDate) => {
    if (price < 100000) {
      alert("Chi phí dự kiến tối thiểu là 100.000");
    } else if (description === "") {
      alert("Mô tả không thể trống");
    } else {
      let item = {
        madaily: storeId,
        chiphi: price,
        mota: description,
        ngaybatdau: startDate,
        ngayketthuc: endDate,
        chiphibaotri: price,
      };
      const response = await addMaintainanceApi(item);
      if (response.message === "Thêm bảo trì đại lý thành công") {
        setMtData([
          ...mtData,
          {
            mota: item.mota,
            thoidiembatdau: format(startDate, "dd/MM/yyyy HH:mm"),
            thoidiemketthuc: format(endDate, "dd/MM/yyyy HH:mm"),
            chiphibaotri: item.chiphibaotri,
          },
        ]);
        handleReset();
        alert("Thêm bảo trì đại lý thành công");
      } else {
        alert("Thêm bảo trì đại lý thất bại");
      }
    }
  };
  //   For reseting input field
  const handleReset = () => {
    setPrice(0);
    setDescription("");
  };
  // // For date picker
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);
  const handleSelect = (ranges) => {
    setState([ranges.selection]);
  };

  // Return render here
  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <Header
            headerTitle={Information.Title}
            path={isAdmin ? "/stores" : "/store-management"}
          ></Header>
          <div className="my-3 flex flex-wrap justify-between">
            <div className="m-5 w-full bg-white shadow-lg transition-colors duration-300 dark:bg-[#363636] dark:text-white lg:w-7/12">
              <div className="mx-5 my-8 space-y-8">
                <div className="flex items-center space-x-10">
                  <img
                    src={`data:image/jpeg;base64, ${storeData.hinhanh}`}
                    alt="Hình ảnh đại lý"
                  ></img>
                </div>
                <div className="flex flex-wrap gap-10">
                  <h2 className="text-xl font-bold">{Information.Name}</h2>
                  <h3 className="text-lg font-[400]">{storeData.tendaily}</h3>
                </div>
                <div className="flex flex-wrap items-center gap-10">
                  <label htmlFor="predictedPrice" className="text-lg font-bold">
                    {Information.Cost} {Information.Note}
                  </label>
                  <input
                    id="predictedPrice"
                    name="predictedPrice"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="rounded border border-black bg-white p-2 text-black transition-all duration-300 dark:border-white dark:bg-[#363636] dark:text-white"
                  ></input>
                </div>
                <div className>
                  <label htmlFor="description" className="text-lg font-bold">
                    {Information.Description}
                  </label>
                  <br></br>
                  <div className="mt-5">
                    <textarea
                      id="description"
                      name="description"
                      type="text"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="h-[200px] w-full resize-none rounded border border-black bg-white p-2 text-black transition-all duration-300 dark:border-white dark:bg-[#363636] dark:text-white"
                      placeholder={Information.Placeholder}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="m-5 w-full lg:w-4/12">
              <div className="bg-white p-5 shadow-lg transition-colors duration-300 dark:bg-[#363636] dark:text-white">
                <div className="flex justify-center">
                  <DateRange
                    editableDateInputs={true}
                    onChange={handleSelect}
                    moveRangeOnFirstSelection={false}
                    ranges={state}
                    locale={
                      selectedLanguage === "vi"
                        ? vi
                        : selectedLanguage === "en"
                          ? enUS
                          : selectedLanguage === "de"
                            ? de
                            : selectedLanguage === "fr"
                              ? fr
                              : selectedLanguage === "jp"
                                ? ja
                                : selectedLanguage === "cn"
                                  ? zhCN
                                  : vi
                    }
                    rangeColors={["#f33e5b"]}
                    color="black"
                  />
                </div>
              </div>
              <div className="mt-2 flex h-[5rem] flex-wrap items-center justify-center gap-5 bg-white shadow-lg transition-colors duration-300 dark:bg-[#363636] dark:text-white">
                <button
                  onClick={() => handleReset()}
                  className="rounded bg-gradient-to-tl from-red-600 via-[#ea4444] to-[#ee7272] p-3 transition-all duration-300 hover:scale-105 hover:bg-gradient-to-br hover:from-red-600 hover:via-[#ea4444] hover:to-[#ee7272]"
                >
                  <p className="font-bold text-white">{Buttons.Reset}</p>
                </button>
                <button
                  onClick={() =>
                    addMaintainance(
                      price,
                      description,
                      state[0].startDate,
                      state[0].endDate,
                    )
                  }
                  className="rounded bg-gradient-to-r from-[#03DF04] via-[#2AED2D] to-[#62F163] p-3 transition-all duration-300 hover:scale-105 hover:bg-gradient-to-l hover:from-[#03DF04] hover:via-[#2AED2D] hover:to-[#62F163]"
                >
                  <p className="font-bold text-white">{Buttons.Set}</p>
                </button>
              </div>
            </div>
          </div>
          <div className="mx-4 bg-white shadow-lg transition-colors duration-300 dark:bg-[#363636]">
            <table className="mb-10 mt-5 w-full text-center text-black transition-colors duration-300 dark:text-white">
              <thead className="border-b-4 border-red-500">
                <tr className="text-lg">
                  <th
                    className="border-r-2 p-2 hover:cursor-default"
                    scope="col"
                  >
                    {Information.Description}
                  </th>
                  <th
                    className="border-r-2 p-2 hover:cursor-pointer"
                    scope="col"
                    onClick={() => handleSort("thoidiembatdau")}
                  >
                    {Information.Start}
                    {sortConfig.key === "thoidiembatdau" &&
                      (sortConfig.direction === "asc" ? " ▲" : " ▼")}
                  </th>
                  <th
                    className="border-r-2 p-2 hover:cursor-pointer"
                    scope="col"
                    onClick={() => handleSort("thoidiemketthuc")}
                  >
                    {Information.End}
                    {sortConfig.key === "thoidiemketthuc" &&
                      (sortConfig.direction === "asc" ? " ▲" : " ▼")}
                  </th>
                  <th
                    className="p-2 hover:cursor-pointer"
                    scope="col"
                    onClick={() => handleSort("chiphibaotri")}
                  >
                    {Information.Cost}
                    {sortConfig.key === "chiphibaotri" &&
                      (sortConfig.direction === "asc" ? " ▲" : " ▼")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {mtData.length > 0 ? (
                  mtData.map((list, index) => (
                    <tr
                      key={index}
                      className="text-md border-b border-slate-300 text-black transition-colors duration-300 hover:bg-slate-200 dark:border-white dark:text-white dark:hover:bg-slate-500"
                    >
                      <td
                        scope="row"
                        className="border-r-2 py-5 hover:cursor-default"
                      >
                        {list.mota}
                      </td>
                      <td
                        scope="row"
                        className="border-r-2 py-5 hover:cursor-default"
                      >
                        {list.thoidiembatdau}
                      </td>
                      <td
                        scope="row"
                        className="border-r-2 py-5 hover:cursor-default"
                      >
                        {list.thoidiemketthuc}
                      </td>
                      <td scope="row" className="py-5 hover:cursor-default">
                        {list.chiphibaotri}
                      </td>
                    </tr>
                  ))
                ) : (
                  <></>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}
export default StoreMaintainance;
