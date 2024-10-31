import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Import Context Here
import { useTheme } from "../../contexts/ThemeContext";

// Import Components Here
import Header from "../../components/Header";

// Import Icons Here
import EditIcon from "../../images/icons/button/Edit.svg";
import MaintainIcon from "../../images/icons/button/Maintain.svg";

function StoreManagement() {
  // Variables here
  // // For Theme Mode
  const { theme } = useTheme();
  // // For Multi-Language
  const { t } = useTranslation();
  const { StoreManagement } = t("Sidebar");
  const { Edit, Maintain } = t("Buttons");
  // // For fetching Data
  const pass = "No String";
  const navigate = useNavigate();
  // Functions here

  // Return render here
  return (
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
              className="flex items-center gap-2 rounded-lg bg-green-500 px-4 py-2 font-bold text-white"
              to="store-management-edit-page"
            >
              <p className="hidden sm:hidden md:hidden lg:inline-block">
                {Edit}
              </p>
              <img src={EditIcon} alt="Icon chỉnh sửa" />
            </NavLink>
          </div>
          <div className="mx-2 my-8 flex items-center">
            <h3 className="w-1/4 text-xl font-semibold text-black dark:text-white transition-colors duration-300">
              Ảnh đại lý:
            </h3>
            <div className="w-3/4 flex justify-start">
              <div className="w-32 h-32 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center transition-colors duration-300">
                <input
                  type="file"
                  accept=".jpeg,.jpg,.png,.gif,.raw"
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="inset-0 flex flex-col items-center justify-start cursor-pointer"
                >
                  <img alt="Camera Icon" className="w-9 h-9 mb-4" />

                  <span className="text-blue-500 hover:text-blue-700 whitespace-nowrap text-base">
                    Tải ảnh lên
                  </span>
                </label>
              </div>
            </div>
          </div>
          <div className="mx-2 my-8 flex text-black dark:text-white transition-colors duration-300">
            <h3 className="w-1/4 text-xl font-semibold justify-center">
              Tên đại lý:
            </h3>
            <p className="w-3/4 italic justify-start">{pass}</p>
          </div>
          <div className="mx-2 my-8 flex text-black dark:text-white transition-colors duration-300">
            <h3 className="w-1/4 text-xl font-semibold justify-center">
              Loại đại lý:
            </h3>
            <p className="w-3/4 italic justify-start">{pass}</p>
          </div>
          <div className="mx-2 my-8 flex text-black dark:text-white transition-colors duration-300">
            <h3 className="w-1/4 text-xl font-semibold justify-center">
              Ngày tiếp nhận:
            </h3>
            <p className="w-3/4 italic justify-start">{pass}</p>
          </div>
          <div className="mx-2 my-8 flex text-black dark:text-white transition-colors duration-300">
            <h3 className="w-1/4 text-xl font-semibold justify-center">
              Số điện thoại:
            </h3>
            <p className="w-3/4 italic justify-start">{pass}</p>
          </div>
          <div className="mx-2 my-8 flex text-black dark:text-white transition-colors duration-300">
            <h3 className="w-1/4 text-xl font-semibold justify-center">
              Địa chỉ:
            </h3>
            <p className="w-3/4 italic justify-start">{pass}</p>
          </div>
          <div className="my-8 flex">
            <NavLink
              className="flex items-center gap-2 rounded-lg bg-green-500 px-4 py-2 font-bold text-white"
              to="store-management-maintain-page"
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
  );
}
export default StoreManagement;
