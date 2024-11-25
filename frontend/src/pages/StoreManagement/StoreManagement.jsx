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
  const { StoreManagementP } = t("StoreManagementP");
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
        <div>
          <div>
            <Header headerTitle={StoreManagement}></Header>
          </div>
          <div className="my-8 mx-4 bg-white dark:bg-[#363636] transition-colors duration-300 rounded-lg shadow-lg">
            <div className="p-4 pr-6">
              <div className="flex justify-between">
                <h1 className="m-2 text-2xl font-bold text-black dark:text-white transition-colors duration-300">
                  Thông tin đại lý
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
                <h3 className="w-1/4 text-xl font-semibold text-black dark:text-white transition-colors duration-300">
                  Ảnh đại lý:
                </h3>
                <div className="w-1/4 flex justify-start">
                  <div className="w-32 h-32 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center transition-colors duration-300">
                    <img
                      alt="Ảnh đại diện"
                      src={`data:image/jpeg;base64, ${storeData[0].hinhanh}`}
                      className="w-full h-full rounded-full"
                    />
                  </div>
                </div>
              </div>
              <div className="mx-2 my-8 flex justify-center text-black dark:text-white transition-colors duration-300">
                <h3 className="w-1/4 text-xl font-semibold justify-center">
                  Tên đại lý:
                </h3>
                <p className="w-1/4 italic justify-start">
                  {storeData[0].tendaily}
                </p>
              </div>
              <div className="mx-2 my-8 flex justify-center text-black dark:text-white transition-colors duration-300">
                <h3 className="w-1/4 text-xl font-semibold justify-center">
                  Loại đại lý:
                </h3>
                <p className="w-1/4 italic justify-start">
                  {storeData[0].tenloaidaily}
                </p>
              </div>
              <div className="mx-2 my-8 flex justify-center text-black dark:text-white transition-colors duration-300">
                <h3 className="w-1/4 text-xl font-semibold justify-center">
                  Ngày tiếp nhận:
                </h3>
                <p className="w-1/4 italic justify-start">
                  {storeData[0].ngaytiepnhan}
                </p>
              </div>
              <div className="mx-2 my-8 flex justify-center text-black dark:text-white transition-colors duration-300">
                <h3 className="w-1/4 text-xl font-semibold justify-center">
                  Số điện thoại:
                </h3>
                <p className="w-1/4 italic justify-start">
                  {storeData[0].sodienthoai}
                </p>
              </div>
              <div className="mx-2 my-8 flex justify-center text-black dark:text-white transition-colors duration-300">
                <h3 className="w-1/4 text-xl font-semibold justify-center">
                  Địa chỉ
                </h3>
                <p className="w-1/4 italic justify-start">
                  {storeData[0].diachi}
                </p>
              </div>
              <div className="my-8 flex justify-center">
                <div className="w-1/2 flex">
                  <NavLink
                    className="flex items-center gap-2 rounded-lg bg-green-500 px-4 py-2 font-bold text-white"
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
