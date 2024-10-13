import { Link } from "react-router-dom";
import BellIcon from "../../images/icons/bell.png";

import { useAuth } from "../../AuthContext";
import { useEffect, useState } from "react";
import { getStaffById } from "../../assets/StaffData";
const Header = (props) => {
  // Variables here
  const { userInfo } = useAuth(); // UserId is manhanvien
  const [image, setImage] = useState();
  // Functions here
  useEffect(() => {
    const fetchData = async (id) => {
      const userData = await getStaffById(id);
      setImage(userData.Nhanvien.hinhanh);
    };
    fetchData(userInfo.userID);
  }, []);
  // Return
  return (
    <div className="flex justify-between bg-white p-2">
      <p className="w-3/4 lg:w-5/6 text-3xl font-bold m-2">
        {props.headerTitle}
      </p>
      <div className="w-1/4 lg:w-1/6 flex flex-wrap">
        <div className="w-1/2 flex items-center justify-center">
          <Link to="/my-account">
            <img
              width={"75px"}
              src={`data:images/jpeg;base64, ${image}`}
              alt="Icon avatar"
              className="rounded-full"
            />
          </Link>
        </div>
        <div className="w-1/2 flex items-center justify-center">
          <Link to="">
            <img
              src={BellIcon}
              alt="Icon chuông thông báo"
              className="w-7 h-7"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
