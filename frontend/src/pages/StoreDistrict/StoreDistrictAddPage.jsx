import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Import Context Here
import { useTheme } from "../../contexts/ThemeContext";

// Import Assets Here
import {
  getAllCityName,
  addDistrict,
} from "../../assets/Districts/DistrictData";

// Import Components Here
import Header from "../../components/Header";

// Import Icons Here
import GoBackIcon from "../../images/icons/button/GoBack.svg";
import GoBackDarkIcon from "../../images/icons/button/GoBack_Dark.svg";

const StoreDistrictAddPage = () => {
  // Variable here
  // // For Theme Mode
  const { theme } = useTheme();
  // // For Multi-Language
  const { t } = useTranslation();
  const { AP_Districts } = t("AddPage");
  const { SF_Districts } = t("SearchFilter");
  const { Add } = t("Buttons");
  // // For adding dsitrict
  const [newDistrictName, setNewDistrictName] = useState("");
  const [newCityName, setNewCityName] = useState("");
  const [existedCityName, setExistedCityNamed] = useState([]);
  // // For navigating
  const navigate = useNavigate();

  // Use Effect here
  // // For getting all distinct existed city name
  useEffect(() => {
    const fetchAllCityName = async () => {
      const data = await getAllCityName();
      setExistedCityNamed(data);
      // Set initial value for the dropdown-selected box
      setNewCityName(data[0]);
    };
    fetchAllCityName();
  }, []);

  // Function here
  // // For adding new district
  const addData = async (tenquan, tenthanhpho) => {
    if (tenquan.length < 1) {
      alert("Tên quận không được để trống");
    } else {
      const data = await addDistrict(tenquan, tenthanhpho);
      if (data === "(Quận, Thành phố) đã tồn tại") {
        alert("(Quận, Thành phố) đã tồn tại");
      } else {
        alert("Thêm quận thành công");
        navigate("/districts");
      }
    }
  };

  // Return render here
  return (
    <div className="h-screen">
      <div>
        <Header></Header>
      </div>
      <div className="m-5 bg-white p-5 shadow-lg transition-colors duration-300 dark:bg-[#363636]">
        <div className="flex items-center gap-40">
          <NavLink to={"/districts"}>
            <button>
              <img
                src={theme === "light" ? GoBackIcon : GoBackDarkIcon}
                alt="Icon trở lại"
                className="h-12 w-12"
              />
            </button>
          </NavLink>
        </div>
        <div className="my-5 flex flex-wrap items-center justify-between">
          <p className="w-1/2 text-2xl font-bold italic text-black transition-colors duration-300 dark:text-white">
            {AP_Districts.Title}
          </p>
          <button
            className="rounded-xl bg-red-500 px-2 py-3 text-lg font-bold text-white"
            onClick={() => addData(newDistrictName, newCityName)}
          >
            {Add}
          </button>
        </div>
        <div className="space-y-10">
          <div className="space-y-4">
            <label
              className="text-lg font-bold text-black transition-colors duration-300 dark:text-white"
              htmlFor="district-name-add"
            >
              {SF_Districts.Columns.Col1}
            </label>
            <input
              className="w-full rounded-lg border border-black bg-white px-5 py-2 text-lg text-black transition-colors duration-300 dark:border-white dark:bg-[#363636] dark:text-white"
              id="district-name-add"
              name="district-name-add"
              type="text"
              placeholder={`${SF_Districts.Columns.Col1} ...`}
              value={newDistrictName}
              onChange={(e) => setNewDistrictName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-4">
            <label
              className="block text-lg font-bold text-black transition-colors duration-300 dark:text-white"
              htmlFor="city-name-add"
            >
              {SF_Districts.Columns.Col2}
            </label>
            {/* It must be a combobox -> selecting which city you need - fetch all city name from server for showing options */}
            <select
              className="rounded-md border border-black bg-white px-3 py-3 text-lg font-semibold text-black transition-colors duration-300 dark:border-white dark:bg-[#363636] dark:text-white"
              id="city-name-add"
              name="city-name-add"
              value={newCityName}
              onChange={(e) => setNewCityName(e.target.value)}
            >
              {existedCityName.map((item) => (
                <>
                  <option key={item} value={item}>
                    {item}
                  </option>
                </>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreDistrictAddPage;
