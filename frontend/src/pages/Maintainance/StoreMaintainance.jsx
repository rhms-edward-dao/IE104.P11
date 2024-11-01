import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Import Components Here
import Header from "../../components/Header";
// import { Calendar } from "react-date-range";

function StoreMaintainance() {
  // Variables here
  // // For Theme Mode
  // // For Multi-Language
  const { t } = useTranslation();
  const { Edit } = t("Buttons");
  // // For fetching Data
  // // For date picker
  const handleSelect = (date) => {
    console.log(date);
  }
  // Return render here
  return (
    <div>
      <Header headerTitle="Bảo trì đại lý"></Header>
      <div className="flex flex-wrap justify-between my-3">
        <div className="m-5 w-full md:w-7/12 bg-white dark:bg-[#363636] transition-colors duration-300 shadow-lg dark:text-white">
            <div className="my-8 mx-5 space-y-8">
                <div className="flex items-center space-x-10">
                    <img alt="Hình ảnh đại lý"></img>
                    <h2 className="text-lg font-bold">Tên đại lý</h2>
                </div>
                <div>
                    <h2 className="text-lg font-bold">Chi phí bảo trì (dự kiến)</h2>
                </div>
                <div>
                    <h2 className="text-lg font-bold">Mô tả</h2>
                    <p>Mục đích vủa việc bảo trì? Bảo trì nhằm khắc phục điều gì?</p>
                </div>
                <div>
                    <h2 className="text-lg font-bold">Các công việc bảo trì</h2>
                </div>         
            </div>          
        </div>
        <div className="m-5 w-full md:w-4/12">
            <div className="p-5 bg-white dark:bg-[#363636] transition-colors duration-300 shadow-lg dark:text-white">
                {/* <Calendar
                    date={new Date()}
                    onChange={handleSelect}
                /> */}
            </div>
            <div className="mt-2 h-[5rem] bg-white dark:bg-[#363636] transition-colors duration-300 shadow-lg dark:text-white flex flex-wrap items-center justify-center gap-5">
                <button className="p-3 rounded bg-red-500">
                    <p className="text-white font-bold">Xóa hết</p>
                </button>
                <button className="p-3 rounded bg-green-500">
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
                        <input
                            type="checkbox"
                        ></input>        
                    </th>
                    <th className="border-r-2 p-2" scope="col">Mã bảo trì</th>
                    <th className="border-r-2 p-2" scope="col">Thời gian bắt đầu</th>
                    <th className="border-r-2 p-2" scope="col">Thời gian kết thúc</th>
                    <th className="p-2" scope="col">Chi phí bảo trì</th>
                </tr>
            </thead>
            <tbody>
                <tr
                    className="text-md border-b border-slate-300 text-black transition-colors duration-300 hover:bg-slate-200 dark:border-white dark:text-white dark:hover:bg-slate-500"
                >
                    <td className="border-r-2 p-2">
                        <input type="checkbox" />
                    </td>
                    <td className="border-r-2 p-2">Mã bảo trì</td>
                    <td className="border-r-2 p-2">Thời gian bắt đầu</td>
                    <td className="border-r-2 p-2">Thời gian kết thúc</td>
                    <td className="border-r-2 p-2">Chi phí bảo trì</td>
                </tr>
            </tbody>
        </table>
      </div>
    </div>
  );
}
export default StoreMaintainance;
