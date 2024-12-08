import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";

// Import Contexts Here
import { useTheme } from "../../contexts/ThemeContext";

// Import Assets Here
import { getAllRule, updateRule } from "../../assets/RuleData";

// Import Components Here
import Header from "../../components/Header";

// Import Icons Here
import DevicesIcon from "../../images/icons/rule/max_devices.svg";
import DevicesDarkIcon from "../../images/icons/rule/max_devices_dark.svg";
import StoresIcon from "../../images/icons/rule/max_stores_district.svg";
import StoresDarkIcon from "../../images/icons/rule/max_stores_district_dark.svg";
import RatioIcon from "../../images/icons/rule/sale_price_ratio.svg";
import RatioDarkIcon from "../../images/icons/rule/sale_price_ratio_dark.svg";
import EditIcon from "../../images/icons/button/Edit.svg";

function Rule() {
  // Variables here
  // // For Theme Mode
  const { theme } = useTheme();
  // // For Multi-Language
  const { t } = useTranslation();
  const { Edit, Update } = t("Buttons");
  const { Title, CurrentValue, Rule1, Rule2, Rule3 } = t("RulePage");
  // // For getting rules value
  const [editableInputId, setEditableInputId] = useState(null); // Track which input is editable
  const [values, setValues] = useState({
    1: null,
    2: null,
    3: null,
  });
  const inputRefs = useRef([]); // Reference to each input field

  // Save new values and disable input when clicking outside
  useEffect(() => {
    const handleClickOutside = async (event) => {
      inputRefs.current.forEach((input, index) => {
        if (input && !input.contains(event.target)) {
          setEditableInputId(null); // Disable all input fields when clicking outside
        }
      });
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  // Get existed rules
  useEffect(() => {
    const fetchData = async () => {
      const existedRule = await getAllRule();
      setValues({
        1: existedRule[0].sothietbitoidataikhoan,
        2: existedRule[0].sodailytoidamoiquan,
        3: existedRule[0].tiledongiaban,
      });
    };
    fetchData();
  }, []);
  const handleUpdateClick = (id) => {
    setEditableInputId(id); // Enable the clicked input field
    setTimeout(() => {
      inputRefs.current[id]?.focus(); // Focus the input field for easier editing
    }, 0);
  };

  const handleInputChange = (id, value) => {
    setValues((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleUpdateSubmit = async () => {
    if (values[1] === "" || values[2] === "" || values[3] === "") {
      alert("Không được có giá trị rỗng ở các trường");
    } else {
      const response = await updateRule(values[1], values[2], values[3]);
      if (response.message === "Cập nhật thành công") {
        alert("Cập nhật thành công");
      } else {
        alert("Cập nhật thất bại");
      }
    }
  };

  const rulesData = [
    {
      id: 1,
      icon: theme === "light" ? DevicesIcon : DevicesDarkIcon,
      title: Rule1.Title,
      description: Rule1.Description,
    },
    {
      id: 2,
      icon: theme === "light" ? StoresIcon : StoresDarkIcon,
      title: Rule2.Title,
      description: Rule2.Description,
    },
    {
      id: 3,
      icon: theme === "light" ? RatioIcon : RatioDarkIcon,
      title: Rule3.Title,
      description: Rule3.Description,
    },
  ];

  return (
    <div>
      <div>
        <Header></Header>
      </div>
      <div className="flex h-screen items-center justify-center">
        <div className="relative max-h-screen w-full max-w-xl overflow-auto bg-white p-6 dark:bg-[#363636]">
          <h1 className="mb-6 text-center text-3xl font-bold text-black hover:cursor-default dark:text-white">
            {Title}
          </h1>
          <div className="space-y-4">
            {rulesData.map((rule) => (
              <div
                key={rule.id}
                className="flex items-center rounded-lg bg-gray-200 p-4 dark:bg-[#0d1117]"
              >
                <img
                  className="mr-4 flex h-28 w-1/5 items-center justify-center rounded-full"
                  src={rule.icon}
                  alt="Icon quy định"
                />
                <div className="w-4/5 flex-grow space-y-2">
                  <h2 className="text-xl font-bold text-black dark:text-white">
                    {rule.title}
                  </h2>
                  <p className="text-base text-gray-600 dark:text-gray-300">
                    {rule.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-semibold text-black dark:text-white">
                      {CurrentValue}: {rule.value}
                    </p>
                    <input
                      ref={(el) => (inputRefs.current[rule.id] = el)} // Assign each input a ref
                      type="text"
                      value={values[rule.id]}
                      onChange={(e) =>
                        handleInputChange(rule.id, e.target.value)
                      }
                      disabled={editableInputId !== rule.id} // Enable only the clicked input field
                      className={`w-1/5 rounded border bg-gray-200 px-2 py-1 text-lg font-semibold text-black dark:bg-[#0d1117] dark:text-white ${
                        editableInputId === rule.id
                          ? "border-green-500"
                          : "border-gray-300"
                      }`}
                    />
                    <button
                      onClick={() => handleUpdateClick(rule.id)}
                      className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#03DF04] via-[#2AED2D] to-[#62F163] px-4 py-2 font-bold text-white transition-all duration-300 hover:scale-105 hover:bg-gradient-to-l hover:from-[#03DF04] hover:via-[#2AED2D] hover:to-[#62F163]"
                    >
                      <img
                        className="h-5 w-5"
                        src={EditIcon}
                        alt="Icon quy tắc"
                      />
                      <p className="hidden text-lg sm:hidden md:hidden lg:inline-block">
                        {Edit}
                      </p>
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <div className="flex items-center justify-end">
              <button
                onClick={() => handleUpdateSubmit()}
                className="rounded-md bg-gradient-to-tl from-red-600 via-[#ea4444] to-[#ee7272] px-8 py-1 text-lg font-bold text-white transition-all duration-300 hover:scale-105 hover:bg-gradient-to-br hover:from-red-600 hover:via-[#ea4444] hover:to-[#ee7272]"
              >
                {Update}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Rule;
