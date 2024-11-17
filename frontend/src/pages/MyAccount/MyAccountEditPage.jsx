import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Import Context Here
import { useTheme } from "../../contexts/ThemeContext";
import { useAuth } from "../../contexts/AuthContext";

// Import Assets Here
import { getStaffDetail } from "../../assets/Staffs/StaffData";

// Import Components Here
import Header from "../../components/Header";

// Import Icons Here
import GoBackIcon from "../../images/icons/button/GoBack.svg";
import GoBackDarkIcon from "../../images/icons/button/GoBack_Dark.svg";
import SaveIcon from "../../images/icons/button/Save.svg";
import { updateAccount } from "../../assets/MyAccount/MyACcountData";

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
          setCurrentAccount(accountInfo);
          setUserName(accountInfo.info.hoten);
          setDate(accountInfo.info.ngaysinh)
          setAddress(accountInfo.info.diachi);
          setImageForShow(accountInfo.avatar);
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
  const handleUpdate = async(hoten, ngaysinh, sodienthoai, email, diachi, hinhanh) => {
    let check_hoten = true;
    let check_ngaysinh = true;
    let check_sodienthoai = true;
    let check_email = true;
    let check_diachi = true;
    let check_hinhanh = true;

    if (check_hoten && check_ngaysinh && check_sodienthoai && check_email && check_diachi && check_hinhanh) {
      let item = {
        "hinhanh": hinhanh,
        "hoten": hoten,
        "ngaysinh": ngaysinh,
        "sodienthoai": sodienthoai,
        "email": email,
        "diachi": diachi
      }
      const response = await updateAccount(userInfo.userID, item);
      console.log(response);
      if (response.success == true) {
        alert(response.message);
        navigate("/my-account")
      } else {
        alert(response.message);
      }
    };
  };
  return (
    <>
    {
      loading ? (
        <p>Loading ...</p>
      ) : (
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
              {EP_Account.Title}
            </h1>
            <div className="flex p-4 items-center">
              <h3 className="w-1/6 text-xl font-semibold text-black dark:text-white transition-colors duration-300">
                {Section1.Label1}:
              </h3>
              <div className="w-5/6 flex flex-col justify-center">
                <div className="flex justify-center">
                  {
                    imageForUpload === undefined ? (
                      <img
                        alt="Ảnh đại diện"
                        src={`data:image/jpeg;base64, ${imageForShow}`}
                      ></img>
                    ) : (
                      <img
                        alt="Hình đại diện"
                        src={imageForShow}
                      ></img>
                    )
                  }
                </div>
                <div className="rounded-full flex items-center justify-center transition-colors duration-300 my-10">
                  <input
                    type="file"
                    accept=".jpeg,.jpg,.png,.gif,.raw"
                    className="hidden"
                    id="file-upload"
                    onChange={handleUploadImage}
                  />
                  <label
                    htmlFor="file-upload"
                    className="flex flex-col items-center justify-center cursor-pointer"
                  >
                    <span className="text-blue-400 font-bold hover:text-blue-600 text-base max-w-24 text-center">
                      {UploadImage}
                    </span>
                  </label>
                </div>
              </div>
            </div>
            <div className="flex flex-col p-4 gap-2 text-black dark:text-white transition-colors duration-300">
              <h3 className="h-1/4 text-xl font-semibold justify-center">
                {Section1.Label2}:
              </h3>
              <input
                className="h-3/4 p-2 border border-black bg-white rounded-md dark:border-white dark:bg-[#363636]"
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="flex flex-col p-4 gap-2 text-black dark:text-white transition-colors duration-300">
              <h3 className="h-1/4 text-xl font-semibold justify-center">
                {Section1.Label3}:
              </h3>
              <input
                className="h-3/4 p-2 border border-black bg-white rounded-md dark:border-white dark:bg-[#363636]"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="flex flex-col p-4 gap-2 text-black dark:text-white transition-colors duration-300">
              <h3 className="h-1/4 text-xl font-semibold justify-center">
                {Section1.Label4}:
              </h3>
              <input
                className="h-3/4 p-2 border border-black bg-white rounded-md dark:border-white dark:bg-[#363636]"
                type="text"
                value={currentAccount.info.sodienthoai}
                disabled="true"
              />
            </div>
            <div className="flex flex-col p-4 gap-2 text-black dark:text-white transition-colors duration-300">
              <h3 className="h-1/4 text-xl font-semibold justify-center">
                {Section1.Label5}:
              </h3>
              <input
                className="h-3/4 p-2 border border-black bg-white rounded-md dark:border-white dark:bg-[#363636]"
                type="text"
                value={currentAccount.info.email}
                disabled="true"
              />
            </div>
            <div className="flex flex-col p-4 gap-2 text-black dark:text-white transition-colors duration-300">
              <h3 className="h-1/4 text-xl font-semibold justify-center">
                {Section1.Label6}:
              </h3>
              <input
                className="h-3/4 p-2 border border-black bg-white rounded-md dark:border-white dark:bg-[#363636]"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </div>
          <div className="w-full mx-8 my-4 flex items-center justify-center">
            <button
              onClick={() => {handleUpdate(
                userName,
                date,
                currentAccount.info.sodienthoai,
                currentAccount.info.email,
                address,
                imageForUpload
              );}}
            >
              <div className="flex gap-2 bg-red-500 p-2 rounded-lg items-center m-2">
                <img src={SaveIcon} alt="Icon lưu" />
                <p className="font-bold text-white hidden sm:hidden md:hidden lg:inline-block">
                  {Save}
                </p>
              </div>
            </button>
          </div>
        </div>
      )
    }
    </>
  );
};

export default MyAccountEditPage;
