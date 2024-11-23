import { useState, useEffect } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Import Contexts Here
import { useTheme } from "../../contexts/ThemeContext";

// Import Assets Here
import { getExportBillDetail } from "../../assets/Warehouses/WarehouseData";

// Import Components Here
import Header from "../../components/Header";

// Import Icons Here
import GoBackIcon from "../../images/icons/button/GoBack.svg";
import GoBackDarkIcon from "../../images/icons/button/GoBack_Dark.svg";

function WarehouseExportPage() {
  // Variable for adding here
  // // For Dark Mode
  const { theme } = useTheme();
  // // For Multi-Language
  const { t } = useTranslation();
  const { DP_WarehouseExport } = t("DetailPage");

  const [exportDataDetail, setExportDataDetail] = useState([]);
  // // For Navigating
  const { exportId } = useParams();
  const navigate = useNavigate();

  // Use Effect here
  useEffect(() => {
    const fetchData = async () => {
      // Getting data for export detail bill
      const existedExportData = await getExportBillDetail(exportId);
      setExportDataDetail(existedExportData);
    };
    fetchData();
  }, []);

  // Return render here
  return (
    <div>
      <div>
        <Header></Header>
      </div>
      <div className="m-5 bg-white p-5 shadow-lg transition-colors duration-300 dark:bg-[#363636] dark:text-white">
        <div className="flex items-center gap-40">
          <NavLink to={"/warehouse"}>
            <button>
              <img
                src={theme === "light" ? GoBackIcon : GoBackDarkIcon}
                alt="Icon trở lại"
                className="w-12 h-12"
              />
            </button>
          </NavLink>
        </div>
        <div className="my-5 flex flex-wrap items-center justify-between">
          <p className="w-1/2 text-2xl font-bold italic text-black transition-colors duration-300 dark:text-white">
            {DP_WarehouseExport.Title}
          </p>
        </div>
        <div className="m-5">
          <div className="block space-y-8">
            <table className="mt-5 w-full text-center text-black transition-colors duration-300 dark:text-white">
              <thead className="border-b-4 border-red-500">
                <tr className="text-lg">
                  <th className="border-r-2 py-5" scope="col">
                    {DP_WarehouseExport.Column1}
                  </th>
                  <th className="py-5" scope="col">
                    {DP_WarehouseExport.Column2}
                  </th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {exportDataDetail.map((list, index) => (
                  <tr
                    className="text-md border-b border-slate-300 text-black transition-colors duration-300 hover:bg-slate-200 dark:border-white dark:text-white dark:hover:bg-slate-500"
                    key={index}
                  >
                    <td scope="row" className="border-r-2 py-5">
                      {list.tenmathang}
                    </td>
                    <td scope="row" className="py-5">
                      {list.Chitiet_pxh.soluongxuat}
                    </td>
                    <td scope="row"></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WarehouseExportPage;
