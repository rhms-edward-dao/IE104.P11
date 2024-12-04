import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Import Context Here
import { useTheme } from "../../contexts/ThemeContext";

// Import Assets Here
import {
  getAllCityName,
  getDistrictById,
  updateDistrict,
} from "../../assets/Districts/DistrictData";

// Import Components Here
import Header from "../../components/Header";

// Import Icons Here
import GoBackIcon from "../../images/icons/button/GoBack.svg";
import GoBackDarkIcon from "../../images/icons/button/GoBack_Dark.svg";

const StoreDistrictEditPage = () => {
  // Variable here
  // // For Theme Mode
  const { theme } = useTheme();
  // // For Multi-Language
  const { t } = useTranslation();
  const { EP_Districts } = t("EditPage");
  const { SF_Districts } = t("SearchFilter");
  const { Update } = t("Buttons");
  // // For editing dsitrict
  const [currentDistrictName, setCurrentDistrictName] = useState("");
  const [currentCityName, setCurrentCityName] = useState("");
  const [existedCityName, setExistedCityName] = useState([]);
  // // For navigating
  const navigate = useNavigate();
  const { districtId } = useParams();
  // // Get existedData
  const location = useLocation();
  const { existedData } = location.state;
  // Use Effect here
  // // For getting data to edit
  useEffect(() => {
    const fetchData = async () => {
      // Get current district name and city name by its id
      const currentDistrict = await getDistrictById(districtId);
      setCurrentDistrictName(currentDistrict.tenquan);
      setCurrentCityName(currentDistrict.tenthanhpho);
      // Get all existed city name
      const data = await getAllCityName();
      setExistedCityName(data);
    };
    fetchData();
  }, []);  
  // Function here
  // // For editing current district
  const updateData = async (id, tenquan, tenthanhpho) => {
    const checkExistedData = existedData.some(item => item.tenquan === tenquan && item.tenthanhpho === tenthanhpho);
    console.log(checkExistedData)
    if (checkExistedData) {
      alert("(Quận, Thành phố) đã tồn tại");
    } else {
      if (tenquan.length < 1) {
        alert("Tên quận không thể rỗng");
      } else {
        const data = await updateDistrict(id, tenquan, tenthanhpho);
        if (data.message === "Đã cập nhật") {
          alert("Cập nhật quận thành công");
          navigate("/districts");
        } else {
          alert("Cập nhật quận thất bại");
        }
      }
    };    
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
            {EP_Districts.Title}
          </p>
          <button
            className="rounded-xl bg-red-500 px-2 py-3 text-lg font-bold text-white"
            onClick={() =>
              updateData(districtId, currentDistrictName, currentCityName)
            }
          >
            {Update}
          </button>
        </div>
        <div className="space-y-10">
          <div className="space-y-4">
            <label
              className="text-lg font-bold text-black transition-colors duration-300 dark:text-white"
              htmlFor="district-name-edit"
            >
              {SF_Districts.Columns.Col1}
            </label>
            <input
              className="w-full rounded-lg border border-black bg-white px-5 py-2 text-lg text-black transition-colors duration-300 dark:border-white dark:bg-[#363636] dark:text-white"
              id="district-name-edit"
              name="district-name-edit"
              type="text"
              value={currentDistrictName}
              onChange={(e) => setCurrentDistrictName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-4">
            <label
              className="block text-lg font-bold text-black transition-colors duration-300 dark:text-white"
              htmlFor="city-name-edit"
            >
              {SF_Districts.Columns.Col2}
            </label>
            {/* It must be a combobox -> selecting which city you need - fetch all city name from server for showing options */}
            <select
              className="rounded-md border border-black bg-white px-3 py-3 text-lg font-semibold text-black transition-colors duration-300 dark:border-white dark:bg-[#363636] dark:text-white"
              id="city-name-eidt"
              name="city-name-edit"
              value={currentCityName}
              onChange={(e) => setCurrentCityName(e.target.value)}
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

export default StoreDistrictEditPage;
