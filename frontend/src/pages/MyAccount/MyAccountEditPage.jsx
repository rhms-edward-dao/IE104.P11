import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Import Context Here
import { useTheme } from "../../contexts/ThemeContext";
import { useAuth } from "../../contexts/AuthContext";

// Import Assets Here
import { getStaffDetail } from "../../assets/Staffs/StaffData";
import { updateAccount } from "../../assets/MyAccount/MyACcountData";

// Import Components Here
import Header from "../../components/Header";

// Import Icons Here
import GoBackIcon from "../../images/icons/button/GoBack.svg";
import GoBackDarkIcon from "../../images/icons/button/GoBack_Dark.svg";
import SaveIcon from "../../images/icons/button/Save.svg";

const MyAccountEditPage = () => {
  // Variable here
  const navigate = useNavigate();
  // // For Theme Mode
  const { theme } = useTheme();
  // // For Multi-Language
  const { t } = useTranslation();
  const { EP_Account } = t("EditPage");
  const { Section1 } = t("AccountPage");
  const { UploadImage, Save } = t("Buttons");
  // // For editing my account
  const { userInfo } = useAuth();
  const [currentAccount, setCurrentAccount] = useState({});
  const [loading, setLoading] = useState(true);
  // Variables for image here
  const [imageForShow, setImageForShow] = useState();
  const [imageForUpload, setImageForUpload] = useState();
  const [userName, setUserName] = useState("");
  const [date, setDate] = useState();
  const [address, setAddress] = useState("");
  // Use Effect here
  // // For getting current loged account infomation
  useEffect(() => {
    const fetchData = async () => {
      try {
        const accountInfo = await getStaffDetail(userInfo.userID);
        if (accountInfo.length === 0) {
          setCurrentAccount([]);
        } else {
          setLoading(false);
          setCurrentAccount(accountInfo[0]);
          setUserName(accountInfo[0].hoten);
          setDate(accountInfo[0].ngaysinh);
          setAddress(accountInfo[0].diachi);
          setImageForShow(accountInfo[0].avatar);
        }
      } catch (error) {
        console.error("Error while fetching: ", error);
      }
    };
    fetchData();
  }, []);
  // Function for uploading new image
  const handleUploadImage = (e) => {
    setImageForUpload(e.target.files[0]);
    setImageForShow(URL.createObjectURL(e.target.files[0]));
  };
  // Function for upadting
  const handleUpdate = async (
    hoten,
    ngaysinh,
    sodienthoai,
    email,
    diachi,
    hinhanh,
  ) => {
    let check_hoten = true;
    let check_ngaysinh = true;
    let check_sodienthoai = true;
    let check_email = true;
    let check_diachi = true;
    let check_hinhanh = true;

    if (
      check_hoten &&
      check_ngaysinh &&
      check_sodienthoai &&
      check_email &&
      check_diachi &&
      check_hinhanh
    ) {
      let item = {
        hinhanh: hinhanh,
        hoten: hoten,
        ngaysinh: ngaysinh,
        sodienthoai: sodienthoai,
        email: email,
        diachi: diachi,
      };
      const response = await updateAccount(userInfo.userID, item);
      if (response.success === true) {
        alert(response.message);
        navigate("/my-account");
      } else {
        alert(response.message);
      }
    }
  };
  return (
    <>
      {loading ? (
        <p>Loading ...</p>
      ) : (
        <div>
          <Header></Header>
          <div className="mx-8 my-4 flex items-center gap-40">
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
          <div className="mx-8 my-4 rounded-lg bg-white p-4 shadow-lg transition-colors duration-300 dark:bg-[#363636]">
            <h1 className="p-2 text-3xl font-bold text-black transition-colors duration-300 dark:text-white">
              {EP_Account.Title}
            </h1>
            <div className="flex items-center p-4">
              <h3 className="w-1/6 text-xl font-semibold text-black transition-colors duration-300 dark:text-white">
                {Section1.Label1}:
              </h3>
              <div className="flex w-5/6 flex-col justify-center">
                <div className="flex justify-center">
                  {imageForUpload === undefined ? (
                    <img
                      alt="Ảnh đại diện"
                      src={`data:image/jpeg;base64, ${imageForShow}`}
                    ></img>
                  ) : (
                    <img alt="Hình đại diện" src={imageForShow}></img>
                  )}
                </div>
                <div className="my-10 flex items-center justify-center rounded-full transition-colors duration-300">
                  <input
                    type="file"
                    accept=".jpeg,.jpg,.png,.gif,.raw"
                    className="hidden"
                    id="file-upload"
                    onChange={handleUploadImage}
                  />
                  <label
                    htmlFor="file-upload"
                    className="flex cursor-pointer flex-col items-center justify-center"
                  >
                    <span className="max-w-24 text-center text-base font-bold text-blue-400 hover:text-blue-600">
                      {UploadImage}
                    </span>
                  </label>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 p-4 text-black transition-colors duration-300 dark:text-white">
              <h3 className="h-1/4 justify-center text-xl font-semibold">
                {Section1.Label2}:
              </h3>
              <input
                className="h-3/4 rounded-md border border-black bg-white p-2 dark:border-white dark:bg-[#363636]"
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2 p-4 text-black transition-colors duration-300 dark:text-white">
              <h3 className="h-1/4 justify-center text-xl font-semibold">
                {Section1.Label3}:
              </h3>
              <input
                className="h-3/4 rounded-md border border-black bg-white p-2 dark:border-white dark:bg-[#363636]"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2 p-4 text-black transition-colors duration-300 dark:text-white">
              <h3 className="h-1/4 justify-center text-xl font-semibold">
                {Section1.Label4}:
              </h3>
              <input
                className="h-3/4 rounded-md border border-black bg-white p-2 dark:border-white dark:bg-[#363636]"
                type="text"
                value={currentAccount.sodienthoai}
                disabled="true"
              />
            </div>
            <div className="flex flex-col gap-2 p-4 text-black transition-colors duration-300 dark:text-white">
              <h3 className="h-1/4 justify-center text-xl font-semibold">
                {Section1.Label5}:
              </h3>
              <input
                className="h-3/4 rounded-md border border-black bg-white p-2 dark:border-white dark:bg-[#363636]"
                type="text"
                value={currentAccount.email}
                disabled="true"
              />
            </div>
            <div className="flex flex-col gap-2 p-4 text-black transition-colors duration-300 dark:text-white">
              <h3 className="h-1/4 justify-center text-xl font-semibold">
                {Section1.Label6}:
              </h3>
              <input
                className="h-3/4 rounded-md border border-black bg-white p-2 dark:border-white dark:bg-[#363636]"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </div>
          <div className="mx-8 my-4 flex w-full items-center justify-center">
            <button
              onClick={() => {
                handleUpdate(
                  userName,
                  date,
                  currentAccount.sodienthoai,
                  currentAccount.email,
                  address,
                  imageForUpload,
                );
              }}
            >
              <div className="m-2 flex items-center gap-2 rounded-lg bg-red-500 p-2">
                <img src={SaveIcon} alt="Icon lưu" />
                <p className="hidden font-bold text-white sm:hidden md:hidden lg:inline-block">
                  {Save}
                </p>
              </div>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default MyAccountEditPage;
