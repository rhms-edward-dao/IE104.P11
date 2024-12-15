import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Import Context Here
import { useTheme } from "../../contexts/ThemeContext";

// Import Components Here
import Header from "../../components/Header";

// Import Icons Here
import EditIcon from "../../images/icons/button/Edit.svg";
import MaintainIcon from "../../images/icons/button/Maintain.svg";

// Import context here
import { useAuth } from "../../contexts/AuthContext";

// Import function for communicate with backend here
import { getStoreById } from "../../assets/Stores/StoreData";

function StoreManagement() {
  // Variables here
  const { userInfo } = useAuth();
  // // For Theme Mode
  const { theme } = useTheme();
  // // For Multi-Language
  const { t } = useTranslation();
  const { StoreManagement } = t("Sidebar");
  const { SF_Stores } = t("SearchFilter");
  const { Title, Avatar } = t("StorePage");
  const { Edit, Maintain } = t("Buttons");
  // // For fetching Data
  const [storeData, setStoreData] = useState({});
  const [loading, setLoading] = useState(true);
  // Functions here
  // useEffect for getting data for the first time you access this page
  useEffect(() => {
    const fetchData = async (id) => {
      const existedData = await getStoreById(id);
      setStoreData(existedData);
      setLoading(false);
    };
    fetchData(userInfo.storeID);
  }, []);
  // Return render here
  return (
    <>
      {loading ? (
        <p>Loading ...</p>
      ) : (
        <div className="h-screen">
          <div>
            <Header headerTitle={StoreManagement}></Header>
          </div>
          <div className="mx-4 my-8 rounded-lg bg-white shadow-lg transition-colors duration-300 dark:bg-[#363636]">
            <div className="p-4 pr-6">
              <div className="flex justify-between">
                <h1 className="m-2 text-2xl font-bold text-black transition-colors duration-300 dark:text-white">
                  {Title}
                </h1>
                <NavLink
                  className="hidden items-center gap-2 rounded-lg bg-green-500 px-4 py-2 font-bold text-white"
                  to="store-management-edit-page"
                >
                  <p className="hidden sm:hidden md:hidden lg:inline-block">
                    {Edit}
                  </p>
                  <img src={EditIcon} alt="Icon chỉnh sửa" />
                </NavLink>
              </div>
              <div className="mx-2 my-8 flex items-center justify-center">
                <h3 className="w-1/4 text-xl font-semibold text-black transition-colors duration-300 dark:text-white">
                  {Avatar}:
                </h3>
                <div className="flex w-1/4 justify-start">
                  <div className="flex h-32 w-32 items-center justify-center rounded-full bg-gray-300 transition-colors duration-300 dark:bg-gray-600">
                    <img
                      alt="Ảnh đại diện"
                      src={`data:image/jpeg;base64, ${storeData[0].hinhanh}`}
                      className="h-full w-full rounded-full"
                    />
                  </div>
                </div>
              </div>
              <div className="mx-2 my-8 flex justify-center text-black transition-colors duration-300 dark:text-white">
                <h3 className="w-1/4 justify-center text-xl font-semibold">
                  {SF_Stores.Columns.Col1}:
                </h3>
                <p className="w-1/4 justify-start italic">
                  {storeData[0].tendaily}
                </p>
              </div>
              <div className="mx-2 my-8 flex justify-center text-black transition-colors duration-300 dark:text-white">
                <h3 className="w-1/4 justify-center text-xl font-semibold">
                  {SF_Stores.Columns.Col2}:
                </h3>
                <p className="w-1/4 justify-start italic">
                  {storeData[0].tenloaidaily}
                </p>
              </div>
              <div className="mx-2 my-8 flex justify-center text-black transition-colors duration-300 dark:text-white">
                <h3 className="w-1/4 justify-center text-xl font-semibold">
                  {SF_Stores.Columns.Col3}:
                </h3>
                <p className="w-1/4 justify-start italic">
                  {storeData[0].ngaytiepnhan}
                </p>
              </div>
              <div className="mx-2 my-8 flex justify-center text-black transition-colors duration-300 dark:text-white">
                <h3 className="w-1/4 justify-center text-xl font-semibold">
                  {SF_Stores.Columns.Col4}:
                </h3>
                <p className="w-1/4 justify-start italic">
                  {storeData[0].sodienthoai}
                </p>
              </div>
              <div className="mx-2 my-8 flex justify-center text-black transition-colors duration-300 dark:text-white">
                <h3 className="w-1/4 justify-center text-xl font-semibold">
                  {SF_Stores.Columns.Col5}:
                </h3>
                <p className="w-1/4 justify-start italic">
                  {storeData[0].diachi}
                </p>
              </div>
              <div className="my-8 flex justify-center">
                <div className="flex w-1/2">
                  <NavLink
                    className="flex flex-wrap items-center gap-2 rounded-lg bg-gradient-to-r from-[#03DF04] via-[#2AED2D] to-[#62F163] px-4 py-2 font-bold text-white transition-all duration-300 hover:scale-105 hover:bg-gradient-to-l hover:from-[#03DF04] hover:via-[#2AED2D] hover:to-[#62F163]"
                    to={`/store-maintainance/${userInfo.storeID}`}
                  >
                    <p className="hidden sm:hidden md:hidden lg:inline-block">
                      {Maintain}
                    </p>
                    <img src={MaintainIcon} alt="Icon bảo trì" />
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default StoreManagement;
