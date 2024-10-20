// import { Link } from "react-router-dom";
// import BellIcon from "../../images/icons/bell.png";

// import { useAuth } from "../contexts/AuthContext";
// import { useEffect, useState } from "react";
// import { getStaffById } from "../assets/StaffData";

import { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Import Context Here
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LanguageContext";

// Import Assets Here
import { getStaffById } from "../assets/Staffs/StaffData";

// Import Icon Here
import BellIcon from "../images/icons/header/Bell.svg";
import BellDarkIcon from "../images/icons/header/Bell_Dark.svg";
import LanguageIcon from "../images/icons/header/Language.svg";
import LanguageDarkIcon from "../images/icons/header/Language_Dark.svg";
import LightIcon from "../images/icons/header/LightTheme.svg";
import DarkIcon from "../images/icons/header/DarkTheme.svg";
// Import Flag Icon Here
import VietNamIcon from "../images/icons/language_flag/VietNamFlag.svg";
import EnglishIcon from "../images/icons/language_flag/EnglishFlag.svg";
import FranceIcon from "../images/icons/language_flag/FranceFlag.svg";
import GermanIcon from "../images/icons/language_flag/GermanFlag.svg";
import JapanIcon from "../images/icons/language_flag/JapanFlag.svg";
import ChinaIcon from "../images/icons/language_flag/ChinaFlag.svg";

const Header = (props) => {
  // Variables here
  const { userInfo } = useAuth(); // UserId is manhanvien
  // const [image, setImage] = useState();
  const { theme, toggleTheme } = useTheme();
  const { isDropdown, setIsDropdown, changeLanguage } = useLanguage();

  const { t } = useTranslation();
  const { LanguageOptions } = t("Header");

  const [avatar, setAvatar] = useState();
  const languageOptions = [
    { name: LanguageOptions.Chinese, flag: "cn", icon: ChinaIcon },
    { name: LanguageOptions.English, flag: "en", icon: EnglishIcon },
    { name: LanguageOptions.French, flag: "fr", icon: FranceIcon },
    { name: LanguageOptions.German, flag: "de", icon: GermanIcon },
    { name: LanguageOptions.Japanese, flag: "jp", icon: JapanIcon },
    { name: LanguageOptions.Vietnamese, flag: "vn", icon: VietNamIcon },
  ];

  const dropdownRef = useRef(null);

  // Use Effect here
  // Functions here
  useEffect(() => {
    const fetchData = async (id) => {
      const userData = await getStaffById(id);
      setImage(userData.Nhanvien.hinhanh);
    };
    fetchData(userInfo.userID);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  // Return here
  return (
    // <div className="flex justify-between bg-white p-2">
    //   <p className="w-3/4 lg:w-5/6 text-3xl font-bold m-2">
    //     {props.headerTitle}
    //   </p>
    //   <div className="w-1/4 lg:w-1/6 flex flex-wrap">
    //     <div className="w-1/2 flex items-center justify-center">
    //       <Link to="/my-account">
    //         <img
    //           width={"75px"}
    //           src={`data:images/jpeg;base64, ${image}`}
    //           alt="Icon avatar"
    //           className="rounded-full"
    //         />
    //       </Link>
    //     </div>
    //     <div className="w-1/2 flex items-center justify-center">
    //       <Link to="">
    //         <img
    //           src={BellIcon}
    //           alt="Icon chuông thông báo"
    //           className="w-7 h-7"
    //         />
    //       </Link>
    //     </div>
    //   </div>
    // </div>
    <div className="flex items-center justify-between bg-white p-5 transition-colors duration-300 dark:bg-[#363636]">
      <h1 className="m-2 w-3/4 text-3xl font-bold text-black transition-colors duration-300 dark:text-white">
        {props.headerTitle}
      </h1>
      <div className="flex w-1/4 items-center justify-end gap-10">
        <NavLink to="/my-account">
          <img
            className="w-16 rounded-full"
            src={`data:images/jpeg;base64, ${avatar}`}
            alt="Avatar"
          />
        </NavLink>
        <button
          onClick={toggleTheme}
          className="flex items-center rounded-lg bg-white p-2 text-black transition-colors duration-300 hover:bg-[#FA8686] dark:bg-[#363636] dark:text-white dark:hover:bg-[#FA8686]"
        >
          <img
            className="h-8 w-8"
            src={theme === "light" ? DarkIcon : LightIcon}
          />
        </button>
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdown(!isDropdown)}
            className="flex items-center rounded-lg bg-white p-2 text-black transition-colors duration-300 hover:bg-[#FA8686] dark:bg-[#363636] dark:text-white dark:hover:bg-[#FA8686]"
          >
            <img
              src={theme === "light" ? LanguageIcon : LanguageDarkIcon}
              alt="Language Icon"
              className="h-8 w-8"
            />
          </button>
          {isDropdown && (
            <div className="absolute right-0 mt-2 w-48 rounded-xl border border-black bg-white text-black shadow-lg dark:border-white dark:bg-[#212121] dark:text-white">
              <ul className="py-2">
                {languageOptions
                  .sort((a, b) => a.flag.localeCompare(b.flag))
                  .map((option) => {
                    return (
                      <li
                        className="flex cursor-pointer items-center px-4 py-2 transition-colors duration-300 hover:bg-[#FA8686]"
                        key={option.name}
                        onClick={() => changeLanguage(option.flag)}
                      >
                        <img
                          className="mr-3 h-5 w-5"
                          src={option.icon}
                          alt="Flag Icon"
                        />
                        <span className="hover:underline">
                          {t(option.name)}
                        </span>
                      </li>
                    );
                  })}
              </ul>
            </div>
          )}
        </div>
        <NavLink
          to="#"
          className="flex items-center rounded-lg bg-white p-2 text-black transition-colors duration-300 hover:bg-[#FA8686] dark:bg-[#363636] dark:text-white dark:hover:bg-[#FA8686]"
        >
          <img
            className="h-8 w-8"
            src={theme === "light" ? BellIcon : BellDarkIcon}
            alt="Notification Icon"
          />
        </NavLink>
      </div>
    </div>
  );
};

export default Header;
