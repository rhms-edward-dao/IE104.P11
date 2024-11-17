import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Import Context Here
import { useTheme } from "../../contexts/ThemeContext";
import { useAuth } from "../../contexts/AuthContext";

// Import Assets Here
import { getStaffDetail } from "../../assets/Staffs/StaffData";

// Import Components Here
import Header from "../../components/Header";

// Import Icons Here
import EditIcon from "../../images/icons/button/Edit.svg";

function MyAccount() {
  // Variables here
  // // For Theme Mode
  const { theme } = useTheme();
  // // For Multi-Language
  const { t } = useTranslation();
  const { Title } = t("Header");
  const { Section1, Section2 } = t("AccountPage");
  const { Edit, UploadImage } = t("Buttons");
  // // For fetching Data
  const pass = "No String";
  const { userInfo } = useAuth();
  const [accountData, setAccountData] = useState({});
  const [loading, setLoading] = useState(true);

  // Use Effect here
  // // For getting current loged account infomation
  useEffect(() => {
    const fetchData = async () => {
      try {
        const accoutInfo = await getStaffDetail(userInfo.userID);
        if (accoutInfo.length === 0) {
          setAccountData([]);
        } else {
          setLoading(false);
          setAccountData(accoutInfo);
        }
      } catch (error) {
        console.error("Error while fetching: ", error);
      }
    };
    fetchData();
  }, []);
  // Return render here
  return (
    <>
    {
      loading ? (
        <p>Loading ...</p>
      ) : (
        <div>
          <Header headerTitle={Title.Account}></Header>
          <div className="my-8 mx-4 grid grid-cols-2 bg-white dark:bg-[#363636] transition-colors duration-300 rounded-lg shadow-lg">
            <div className="border-r-2 border-gray-200 p-4 pr-6">
              <div className="flex justify-between items-center">
                <h1 className="m-2 text-2xl font-bold text-black dark:text-white transition-colors duration-300">
                  {Section1.Title}
                </h1>
                <NavLink
                  className="flex items-center gap-2 rounded-lg bg-green-500 px-4 py-2 font-bold text-white"
                  to="my-account-edit-page"
                >
                  <p className="hidden sm:hidden md:hidden lg:inline-block">
                    {Edit}
                  </p>
                  <img src={EditIcon} alt="Icon chỉnh sửa" />
                </NavLink>
              </div>
              <div className="mx-2 my-8 flex items-center">
                <h3 className="w-1/4 text-xl font-semibold text-black dark:text-white transition-colors duration-300">
                  {Section1.Label1}:
                </h3>
                <div className="relative w-3/4 flex justify-center">
                  <div className="w-32 h-32 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center transition-colors duration-300">                                        
                    <img 
                      alt="Ảnh đại diện" 
                      src={`data:images/jpeg;base64, ${accountData.avatar}`} 
                      className="w-full h-full rounded-lg" 
                    />
                  </div>
                </div>
              </div>
              <div className="mx-2 my-8 flex text-black dark:text-white transition-colors duration-300 items-center">
                <h3 className="w-1/3 text-xl font-semibold justify-center">
                  {Section1.Label2}:
                </h3>
                <p className="w-2/3 italic justify-start">
                  {accountData.info.hoten}
                </p>
              </div>
              <div className="mx-2 my-8 flex text-black dark:text-white transition-colors duration-300 items-center">
                <h3 className="w-1/3 text-xl font-semibold justify-center">
                  {Section1.Label3}:
                </h3>
                <p className="w-2/3 italic justify-start">
                  {accountData.info.ngaysinh}
                </p>
              </div>
              <div className="mx-2 my-8 flex text-black dark:text-white transition-colors duration-300 items-center">
                <h3 className="w-1/3 text-xl font-semibold justify-center">
                  {Section1.Label4}:
                </h3>
                <p className="w-2/3 italic justify-start">
                  {accountData.info.sodienthoai}
                </p>
              </div>
              <div className="mx-2 my-8 flex text-black dark:text-white transition-colors duration-300 items-center">
                <h3 className="w-1/3 text-xl font-semibold justify-center">
                  {Section1.Label5}:
                </h3>
                <p className="w-2/3 italic justify-start">
                  {accountData.info.email}
                </p>
              </div>
              <div className="mx-2 my-8 flex text-black dark:text-white transition-colors duration-300 items-center">
                <h3 className="w-1/3 text-xl font-semibold justify-center">
                  {Section1.Label6}:
                </h3>
                <p className="w-2/3 italic justify-start">
                  {accountData.info.diachi}
                </p>
              </div>
            </div>
            <div className="p-4 pl-6">
              <div className="flex justify-between">
                <h1 className="m-2 text-2xl font-bold text-black dark:text-white transition-colors duration-300">
                  {Section2.Title}
                </h1>
                <NavLink
                  className="flex items-center gap-2 rounded-lg bg-green-500 px-4 py-2 font-bold text-white hidden"
                  to="#"
                >
                  <p className="hidden sm:hidden md:hidden lg:inline-block">
                    {Edit}
                  </p>
                  <img src={EditIcon} alt="Icon chỉnh sửa" />
                </NavLink>
              </div>
              <div className="mx-2 my-8 flex text-black dark:text-white transition-colors duration-300 items-center">
                <h3 className="w-1/3 text-xl font-semibold justify-center">
                  {Section2.Label1}:
                </h3>
                <p className="w-2/3 italic justify-start">
                  {accountData.info.tenchucvu}
                </p>
              </div>
              <div className="mx-2 my-8 flex text-black dark:text-white transition-colors duration-300 items-center">
                <h3 className="w-1/3 text-xl font-semibold justify-center">
                  {Section2.Label2}:
                </h3>
                <p className="w-2/3 italic justify-start">
                  {accountData.info.capdo}
                </p>
              </div>
              <div className="mx-2 my-8 flex text-black dark:text-white transition-colors duration-300 items-center">
                <h3 className="w-1/3 text-xl font-semibold justify-center">
                  {Section2.Label3}:
                </h3>
                <p className="w-2/3 italic justify-start">
                  {accountData.info.luong}
                </p>
              </div>
              <div className="mx-2 my-8 flex text-black dark:text-white transition-colors duration-300 items-center">
                <h3 className="w-1/3 text-xl font-semibold justify-center">
                  {Section2.Label4}:
                </h3>
                <p className="w-2/3 italic justify-start">
                  {accountData.info.ngaybatdau}
                </p>
              </div>
              <div className="mx-2 my-8 flex text-black dark:text-white transition-colors duration-300 items-center">
                <h3 className="w-1/3 text-xl font-semibold justify-center">
                  {Section2.Label5}:
                </h3>
                <p className="w-2/3 italic justify-start">
                  {accountData.info.thoihan}
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    }
    </>
  );
}
export default MyAccount;
