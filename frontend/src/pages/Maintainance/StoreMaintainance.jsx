// Import basic elements fromt React.JS
import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
// Import elements for translation
import { useTranslation } from "react-i18next";
// Import elements for Calendar
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
import { DateRange } from "react-date-range";
import addDays from "date-fns/addDays";
import { vi } from "date-fns/locale";
// Import css for styling the calendar
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
// Import Components Here
import Header from "../../components/Header";
import { getStoreById } from "../../assets/Stores/StoreData";
import {
  addMaintainanceApi,
  getMaintainanceApi,
} from "../../assets/Stores/StoreData";
function StoreMaintainance() {
  // Variables here
  const { storeId } = useParams();
  const [storeData, setStoreData] = useState({});
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [mtData, setMtData] = useState([]);
  const [loading, setLoading] = useState(true);
  // // For Multi-Language
  const { t } = useTranslation();
  const { Edit } = t("Buttons");
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
  console.log(mtData);
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
          <Header headerTitle="Bảo trì đại lý"></Header>
          <div className="flex flex-wrap justify-between my-3">
            <div className="m-5 w-full lg:w-7/12 bg-white dark:bg-[#363636] transition-colors duration-300 shadow-lg dark:text-white">
              <div className="my-8 mx-5 space-y-8">
                <div className="flex items-center space-x-10">
                  <img
                    src={`data:image/jpeg;base64, ${storeData.hinhanh}`}
                    alt="Hình ảnh đại lý"
                  ></img>
                </div>
                <div className="flex flex-wrap gap-10">
                  <h2 className="text-xl font-bold">Tên đại lý</h2>
                  <h3 className="text-lg font-[400]">{storeData.tendaily}</h3>
                </div>
                <div className="flex flex-wrap gap-10 items-center">
                  <label htmlFor="predictedPrice" className="text-lg font-bold">
                    Chi phí bảo trì (dự kiến)
                  </label>
                  <input
                    id="predictedPrice"
                    name="predictedPrice"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="border border-black rounded text-black p-2"
                  ></input>
                </div>
                <div className>
                  <label htmlFor="description" className="text-lg font-bold">
                    Mô tả
                  </label>
                  <br></br>
                  <div className="mt-5">
                    <textarea
                      id="description"
                      name="description"
                      type="text"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full h-[200px] border border-black rounded text-black p-2 resize-none"
                      placeholder="Nhập mô tả..."
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="m-5 w-full lg:w-4/12">
              <div className="p-5 bg-white dark:bg-[#363636] transition-colors duration-300 shadow-lg dark:text-white">
                <div className="flex justify-center">
                  <DateRange
                    editableDateInputs={true}
                    onChange={handleSelect}
                    moveRangeOnFirstSelection={false}
                    ranges={state}
                    locale={vi}
                    rangeColors={["#f33e5b"]}
                  />
                </div>
              </div>
              <div className="mt-2 h-[5rem] bg-white dark:bg-[#363636] transition-colors duration-300 shadow-lg dark:text-white flex flex-wrap items-center justify-center gap-5">
                <button
                  onClick={() => handleReset()}
                  className="p-3 rounded bg-red-500"
                >
                  <p className="text-white font-bold">Đặt lại</p>
                </button>
                <button
                  onClick={() =>
                    addMaintainance(
                      price,
                      description,
                      state[0].startDate,
                      state[0].endDate
                    )
                  }
                  className="p-3 rounded bg-green-500"
                >
                  <p className="text-white font-bold">Đặt bảo trì</p>
                </button>
              </div>
            </div>
          </div>
          <div className="mx-4 bg-white dark:bg-[#363636] transition-colors duration-300 shadow-lg">
            <table className="mt-5 w-full text-center text-black transition-colors duration-300 dark:text-white">
              <thead className="border-b-4 border-red-500">
                <tr className="text-lg">
                  <th className="border-r-2 p-2" scope="col">
                    <input type="checkbox"></input>
                  </th>
                  <th className="border-r-2 p-2" scope="col">
                    Mô tả
                  </th>
                  <th className="border-r-2 p-2" scope="col">
                    Thời gian bắt đầu
                  </th>
                  <th className="border-r-2 p-2" scope="col">
                    Thời gian kết thúc
                  </th>
                  <th className="p-2" scope="col">
                    Chi phí bảo trì
                  </th>
                </tr>
              </thead>
              <tbody>
                {mtData.length > 0 ? (
                  mtData.map((list, index) => (
                    <tr
                      key={index}
                      className="border-b border-slate-300 text-black text-md transition-colors duration-300 hover:bg-slate-200 dark:border-white dark:text-white dark:hover:bg-slate-500"
                    >
                      <td className="border-r-2 py-5 pl-3">
                        <input type="checkbox" />
                      </td>
                      <td scope="row" className="border-r-2 py-5">
                        {list.mota}
                      </td>
                      <td scope="row" className="border-r-2 py-5">
                        {list.thoidiembatdau}
                      </td>
                      <td scope="row" className="border-r-2 py-5">
                        {list.thoidiemketthuc}
                      </td>
                      <td scope="row" className="py-5">
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
