import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Import Context Here
import { useTheme } from "../../contexts/ThemeContext";

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
  const { Edit } = t("Buttons");
  // // For fetching Data
  const pass = "No String";

  // Return render here
  return (
    <div>
      <Header headerTitle="Tài khoản"></Header>
      <div className="my-8 mx-4 grid grid-cols-2 bg-white dark:bg-[#363636] transition-colors duration-300 rounded-lg shadow-lg">
        <div className="border-r-2 border-gray-200 p-4 pr-6">
          <div className="flex justify-between">
            <h1 className="m-2 text-2xl font-bold text-black dark:text-white transition-colors duration-300">
              Thông tin cá nhân
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
              Ảnh đại diện:
            </h3>
            <div className="relative w-3/4 flex justify-center">
              <div className="w-32 h-32 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center transition-colors duration-300">
                <input
                  type="file"
                  accept=".jpeg,.jpg,.png,.gif,.raw"
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer"
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
              Họ tên:
            </h3>
            <p className="w-3/4 italic justify-start">{pass}</p>
          </div>
          <div className="mx-2 my-8 flex text-black dark:text-white transition-colors duration-300">
            <h3 className="w-1/4 text-xl font-semibold justify-center">
              Ngày sinh:
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
              Email:
            </h3>
            <p className="w-3/4 italic justify-start">{pass}</p>
          </div>
          <div className="mx-2 my-8 flex text-black dark:text-white transition-colors duration-300">
            <h3 className="w-1/4 text-xl font-semibold justify-center">
              Địa chỉ:
            </h3>
            <p className="w-3/4 italic justify-start">{pass}</p>
          </div>
        </div>
        <div className="p-4 pl-6">
          <div className="flex justify-between">
            <h1 className="m-2 text-2xl font-bold text-black dark:text-white transition-colors duration-300">
              Thông tin công việc
            </h1>
            <NavLink
              className="flex items-center gap-2 rounded-lg bg-green-500 px-4 py-2 font-bold text-white"
              to="#"
            >
              <p className="hidden sm:hidden md:hidden lg:inline-block">
                {Edit}
              </p>
              <img src={EditIcon} alt="Icon chỉnh sửa" />
            </NavLink>
          </div>
          <div className="mx-2 my-8 flex text-black dark:text-white transition-colors duration-300">
            <h3 className="w-1/4 text-xl font-semibold justify-center">
              Chức vụ:
            </h3>
            <p className="w-3/4 italic justify-start">{pass}</p>
          </div>
          <div className="mx-2 my-8 flex text-black dark:text-white transition-colors duration-300">
            <h3 className="w-1/4 text-xl font-semibold justify-center">
              Cấp độ:
            </h3>
            <p className="w-3/4 italic justify-start">{pass}</p>
          </div>
          <div className="mx-2 my-8 flex text-black dark:text-white transition-colors duration-300">
            <h3 className="w-1/4 text-xl font-semibold justify-center">
              Lương:
            </h3>
            <p className="w-3/4 italic justify-start">{pass}</p>
          </div>
          <div className="mx-2 my-8 flex text-black dark:text-white transition-colors duration-300">
            <h3 className="w-1/4 text-xl font-semibold justify-center">
              Ngày bắt đầu:
            </h3>
            <p className="w-3/4 italic justify-start">{pass}</p>
          </div>
          <div className="mx-2 my-8 flex text-black dark:text-white transition-colors duration-300">
            <h3 className="w-1/4 text-xl font-semibold justify-center">
              Thời hạn:
            </h3>
            <p className="w-3/4 italic justify-start">{pass}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default MyAccount;
