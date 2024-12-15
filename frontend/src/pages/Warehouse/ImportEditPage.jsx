import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Import Context Here
import { useTheme } from "../../contexts/ThemeContext";
import { useAuth } from "../../contexts/AuthContext";

// Import Assets Here
import {
  getImportBillByBillId,
  updateImportBill,
} from "../../assets/Warehouses/WarehouseData";

// Import Components Here
import Header from "../../components/Header";

// Import Icons Here
import GoBackIcon from "../../images/icons/button/GoBack.svg";
import GoBackDarkIcon from "../../images/icons/button/GoBack_Dark.svg";

const ImportEditPage = () => {
  // Variable here
  const { userInfo } = useAuth();
  // // For Theme Mode
  const { theme } = useTheme();
  // // For Multi-Language
  const { t } = useTranslation();
  const { EP_Import } = t("EditPage");
  const { Update } = t("Buttons");
  // // For Editing Import Bill
  const [currentDebt, setCurrentDebt] = useState(0);
  const [currentPaid, setCurrentPaid] = useState(0);
  const [currentStatus, setCurrentStatus] = useState("Còn nợ");
  // // For navigating
  const navigate = useNavigate();
  const { importId } = useParams();

  // Use Effect here
  // // For getting data to edit
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get current import bill's infomation by its id
        const currentImport = await getImportBillByBillId(importId);
        setCurrentDebt(currentImport[0].tongtien);
        setCurrentPaid(currentImport[0].tiendathanhtoan);
        setCurrentStatus(currentImport[0].tinhtrang);
        if (currentImport.message === "Phiếu nhập hàng không tồn tại") {
          alert(currentImport.message);
        }
      } catch (error) {
        console.error("Error while fetching: ", error);
      }
    };
    fetchData();
  }, []);

  // Functions here
  // // For editing current import bill
  const updateData = async (tiendathanhtoan, tinhtrang) => {
    let check_tiendathanhtoan = true;

    const isOnlyDigit = (input) => /^\d+$/.test(input);

    // Checking before calling add api
    // // Check tiendathanhtoan
    if (tiendathanhtoan < 0) {
      alert("Tiền đã thanh toán không được âm");
      check_tiendathanhtoan = false;
    } else if (!isOnlyDigit(tiendathanhtoan)) {
      alert("Tiền đã thanh toán chỉ được có ký tự chữ số");
      check_tiendathanhtoan = false;
    }
    if (check_tiendathanhtoan) {
      let item = [
        {
          tiendathanhtoan: tiendathanhtoan,
          tinhtrang: tinhtrang,
        },
      ];
      const data = await updateImportBill(importId, userInfo.storeID, item);
      if (data.message === "Cập nhật phiếu nhập hàng thất bại") {
        alert(data.message);
      } else if (data.message === "Cập nhật phiếu nhập hàng thành công.") {
        alert(data.message);
        navigate("/warehouse");
      } else {
        alert(data.message);
      }
    }
  };

  return (
    <div>
      <div>
        <Header path="/warehouse"></Header>
      </div>
      <div className="m-5 bg-white p-5 shadow-lg transition-colors duration-300 dark:bg-[#363636]">
        <div className="my-5 flex flex-wrap items-center justify-between">
          <p className="w-1/2 text-2xl font-bold italic text-black transition-colors duration-300 dark:text-white">
            {EP_Import.Title}
          </p>
          <button
            className="rounded-md bg-gradient-to-tr from-red-600 via-[#ea4444] to-[#ee7272] px-4 py-3 text-lg font-bold text-white transition-all duration-300 hover:scale-105 hover:bg-gradient-to-br hover:from-red-600 hover:via-[#ea4444] hover:to-[#ee7272]"
            onClick={() => updateData(currentPaid, currentStatus)}
          >
            {Update}
          </button>
        </div>
        <div className="space-y-10">
          <div className="space-y-4">
            <label
              className="text-lg font-bold text-black transition-colors duration-300 dark:text-white"
              htmlFor="tong-tien-no"
            >
              {EP_Import.Labels.Lb1}:
            </label>
            <input
              className="w-full rounded-lg border border-black bg-white px-5 py-2 text-lg text-black transition-colors duration-300 dark:border-white dark:bg-[#363636] dark:text-white"
              id="tong-tien-no"
              type="number"
              value={currentDebt}
              readOnly
            />
          </div>
          {/* Type money paid */}
          <div className="space-y-4">
            <label
              className="text-lg font-bold text-black transition-colors duration-300 dark:text-white"
              htmlFor="money-paid-edit"
            >
              {EP_Import.Labels.Lb2}:
            </label>
            <input
              className="w-full rounded-lg border border-black bg-white px-5 py-2 text-lg text-black transition-colors duration-300 dark:border-white dark:bg-[#363636] dark:text-white"
              id="money-paid-edit"
              name="money-paid-edit"
              type="number"
              value={currentPaid}
              onChange={(e) => setCurrentPaid(e.target.value)}
              required
            />
          </div>
          {/* Select status */}
          <div className="space-y-4">
            <label
              className="block text-lg font-bold text-black transition-colors duration-300 dark:text-white"
              htmlFor="money-paid-edit"
            >
              {EP_Import.Status}:
            </label>
            <select
              className="rounded-md border border-black bg-white px-3 py-3 text-lg font-semibold text-black transition-colors duration-300 dark:border-white dark:bg-[#363636] dark:text-white"
              id="money-paid-edit"
              name="money-paid-edit"
              value={currentStatus}
              onChange={(e) => setCurrentStatus(e.target.value)}
            >
              <option value={"Đã thanh toán"}>Đã thanh toán</option>
              <option value={"Còn nợ"}>Còn nợ</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportEditPage;
