import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Import Context Here
import { useTheme } from "../../contexts/ThemeContext";

// Import Components Here
import Header from "../../components/Header";

// Import Icons Here
import GoBackIcon from "../../images/icons/button/GoBack.svg";
import GoBackDarkIcon from "../../images/icons/button/GoBack_Dark.svg";
import SaveIcon from "../../images/icons/button/Save.svg";

const MyAccountEditPage = () => {
  // Variable here
  // // For Theme Mode
  const { theme } = useTheme();
  // // For Multi-Language
  const { t } = useTranslation();
  const { EP_Products } = t("EditPage");
  const { Update } = t("Buttons");
  // // For editing my account
  const pass = "No string";

  return (
    <div>
      <Header></Header>
      <div className="flex items-center gap-40 mx-8 my-4">
        <NavLink to={"/my-account"}>
          <button>
            <img
              src={theme === "light" ? GoBackIcon : GoBackDarkIcon}
              alt="Icon trở lại"
              className="h-12 w-12"
            />
          </button>
        </NavLink>
      </div>
      <div className="mx-8 my-4 p-4 bg-white dark:bg-[#363636] transition-colors duration-300 rounded-lg shadow-lg">
        <h1 className="p-2 text-3xl font-bold text-black dark:text-white transition-colors duration-300">
          Thay đổi thông tin cá nhân
        </h1>
        <div className="flex p-4 items-center">
          <h3 className="w-1/6 text-xl font-semibold text-black dark:text-white transition-colors duration-300">
            Ảnh đại diện:
          </h3>
          <div className="relative w-5/6 flex justify-center">
            <div className="w-36 h-36 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center transition-colors duration-300">
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
        <div className="flex flex-col p-4 gap-2 text-black dark:text-white transition-colors duration-300">
          <h3 className="h-1/4 text-xl font-semibold justify-center">
            Họ tên:
          </h3>
          <input
            className="h-3/4 p-2 border border-black bg-white rounded-md dark:border-white dark:bg-[#363636]"
            type="text"
            defaultValue={pass}
            disabled="true"
          />
        </div>
        <div className="flex flex-col p-4 gap-2 text-black dark:text-white transition-colors duration-300">
          <h3 className="h-1/4 text-xl font-semibold justify-center">
            Ngày sinh:
          </h3>
          <input
            className="h-3/4 p-2 border border-black bg-white rounded-md dark:border-white dark:bg-[#363636]"
            type="text"
            defaultValue={pass}
            disabled="true"
          />
        </div>
        <div className="flex flex-col p-4 gap-2 text-black dark:text-white transition-colors duration-300">
          <h3 className="h-1/4 text-xl font-semibold justify-center">
            Số điện thoại:
          </h3>
          <input
            className="h-3/4 p-2 border border-black bg-white rounded-md dark:border-white dark:bg-[#363636]"
            type="text"
            defaultValue={pass}
            disabled="true"
          />
        </div>
        <div className="flex flex-col p-4 gap-2 text-black dark:text-white transition-colors duration-300">
          <h3 className="h-1/4 text-xl font-semibold justify-center">Email:</h3>
          <input
            className="h-3/4 p-2 border border-black bg-white rounded-md dark:border-white dark:bg-[#363636]"
            type="text"
            defaultValue={pass}
            disabled="true"
          />
        </div>
        <div className="flex flex-col p-4 gap-2 text-black dark:text-white transition-colors duration-300">
          <h3 className="h-1/4 text-xl font-semibold justify-center">
            Địa chỉ:
          </h3>
          <input
            className="h-3/4 p-2 border border-black bg-white rounded-md dark:border-white dark:bg-[#363636]"
            type="text"
            defaultValue={pass}
            disabled="true"
          />
        </div>
      </div>
      <div className="w-full mx-8 my-4 flex items-center justify-center">
        <button>
          <div className="flex gap-2 bg-red-500 p-2 rounded-lg items-center m-2">
            <img src={SaveIcon} alt="Icon lưu" />
            <p className="font-bold text-white hidden sm:hidden md:hidden lg:inline-block">
              Lưu thay đổi
            </p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default MyAccountEditPage;
