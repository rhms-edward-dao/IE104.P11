import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";

// Import Assets Here
import { getAllRule, updateRule } from "../../assets/RuleData";

// Import Icons Here
import DevicesIcon from "../../images/icons/rule/max_devices.svg";
import StoresIcon from "../../images/icons/rule/max_stores_district.svg";
import RatioIcon from "../../images/icons/rule/sale_price_ratio.svg";
import EditIcon from "../../images/icons/button/Edit.svg";

function Rule() {
  // Variables here
  // // For Multi-Language
  const { t } = useTranslation();
  const { Edit, Update } = t("Buttons");
  const { Header, CurrentValue, Rule1, Rule2, Rule3 } = t("RulePage");
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
        1: existedRule.sothietbitoidataikhoan,
        2: existedRule.sodailytoidamoiquan,
        3: existedRule.tiledongiaban,
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
      icon: DevicesIcon,
      title: Rule1.Title,
      description: Rule1.Description,
    },
    {
      id: 2,
      icon: StoresIcon,
      title: Rule2.Title,
      description: Rule2.Description,
    },
    {
      id: 3,
      icon: RatioIcon,
      title: Rule3.Title,
      description: Rule3.Description,
    },
  ];

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="relative max-h-screen w-full max-w-xl overflow-auto bg-white p-6">
        <h1 className="mb-6 text-center text-3xl font-bold">{Header}</h1>
        <div className="space-y-4">
          {rulesData.map((rule) => (
            <div
              key={rule.id}
              className="flex items-center rounded-lg bg-gray-100 p-4"
            >
              <img
                className="mr-4 flex h-28 w-1/5 items-center justify-center rounded-full"
                src={rule.icon}
                alt="Icon quy định"
              />
              <div className="w-4/5 flex-grow space-y-2">
                <h2 className="text-xl font-bold">{rule.title}</h2>
                <p className="text-base text-gray-600">{rule.description}</p>
                <div className="flex items-center justify-between">
                  <p className="text-lg font-semibold">
                    {CurrentValue}: {rule.value}
                  </p>
                  <input
                    ref={(el) => (inputRefs.current[rule.id] = el)} // Assign each input a ref
                    type="text"
                    value={values[rule.id]}
                    onChange={(e) => handleInputChange(rule.id, e.target.value)}
                    disabled={editableInputId !== rule.id} // Enable only the clicked input field
                    className={`w-1/5 rounded border px-2 py-1 text-lg font-semibold ${
                      editableInputId === rule.id
                        ? "border-green-500"
                        : "border-gray-300"
                    }`}
                  />
                  <button
                    onClick={() => handleUpdateClick(rule.id)}
                    className="flex items-center gap-2 rounded-lg bg-green-500 px-4 py-2 font-bold text-white"
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
          <div className="flex justify-end items-center">
            <button
              onClick={() => handleUpdateSubmit()}
              className="w-[100px] h-[40px] bg-red-500 mr-5 mt-2"
            >
              <p className="text-white font-semibold">{Update}</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Rule;
