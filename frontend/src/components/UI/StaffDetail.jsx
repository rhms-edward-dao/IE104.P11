import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDetailPopup } from "../../contexts/StaffDetailState";
import { getStaffDetail } from "../../assets/Staffs/StaffData";

const StaffDetail = () => {
  // Variables here
  const { staffData, showPopup, closePopup } = useDetailPopup();
  const [staffDataDetail, setStaffDataDetail] = useState([]);
  const [loading, setLoading] = useState(true);
  // Function here
  useEffect(() => {
    const fetchData = async () => {
      // Getting data for staff
      const existedStaffData = await getStaffDetail(staffData);
      setStaffDataDetail(existedStaffData);
      setLoading(false);
    };
    if (showPopup) {
      fetchData();
    }
  }, [staffData, showPopup]);
  // Return here
  return (
    <>
      {showPopup && (
        <div
          id="popup-modal"
          tabIndex="-1"
          className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50"
        >
          <div className="relative p-4 w-full max-w-4xl max-h-4xl bg-white rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-4">Thông tin nhân viên</h1>
            <button
              type="button"
              onClick={closePopup}
              className="absolute top-3 right-3 text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            {loading ? (
              <p>Loading ...</p>
            ) : (
              <div className="flex justify-between">
                <div className="w-1/2 mx-5">
                  <p className="text-center font-bold text-xl mt-5 mb-8">
                    Thông tin cá nhân
                  </p>
                  <div className="flex justify-between items-center lg:mx-14 my-5">
                    <p className="font-bold">Ảnh đại diện:</p>
                    <img
                      width="60px"
                      src={`data:images/jpeg;base64, ${staffDataDetail.avatar}`}
                      alt="Ảnh đại diện"
                    />
                  </div>
                  <div className="flex justify-between lg:mx-14 my-5">
                    <p className="font-bold">Họ tên: </p>
                    <p>{staffDataDetail.info.hoten}</p>
                  </div>
                  <div className="flex justify-between lg:mx-14 my-5">
                    <p className="font-bold">Ngày sinh: </p>
                    <p>{staffDataDetail.info.ngaysinh}</p>
                  </div>
                  <div className="flex justify-between lg:mx-14 my-5">
                    <p className="font-bold">Số điện thoại: </p>
                    <p>{staffDataDetail.info.sodienthoai}</p>
                  </div>
                  <div className="flex justify-between lg:mx-14 my-5">
                    <p className="font-bold">Email: </p>
                    <p>{staffDataDetail.info.email}</p>
                  </div>
                  <div className="flex justify-between lg:mx-14 my-5">
                    <p className="font-bold">Địa chỉ: </p>
                    <p>{staffDataDetail.info.diachi}</p>
                  </div>
                </div>
                <div className="w-1/2 mx-5">
                  <p className="text-center text-xl font-bold mt-5 mb-8">
                    Thông tin công việc
                  </p>
                  <div className="flex justify-between lg:mx-14 my-12">
                    <p className="font-bold">Đại lý:</p>
                    <p>{staffDataDetail.info.tendaily}</p>
                  </div>
                  <div className="flex justify-between lg:mx-14 my-5">
                    <p className="font-bold">Chức vụ:</p>
                    <p>{staffDataDetail.info.tenchucvu}</p>
                  </div>
                  <div className="flex justify-between lg:mx-14 my-5">
                    <p className="font-bold">Cấp độ:</p>
                    <p>{staffDataDetail.info.capdo}</p>
                  </div>
                  <div className="flex justify-between lg:mx-14 my-5">
                    <p className="font-bold">Lương:</p>
                    <p>{staffDataDetail.info.luong}</p>
                  </div>
                  <div className="flex justify-between lg:mx-14 my-5">
                    <p className="font-bold">Ngày bắt đầu:</p>
                    <p>{staffDataDetail.info.ngaybatdau}</p>
                  </div>
                  <div className="flex justify-between lg:mx-14 my-5">
                    <p className="font-bold">Thời hạn:</p>
                    <p>{staffDataDetail.info.thoihan}</p>
                  </div>
                  <div className="flex justify-end">
                    <NavLink
                      className="w-[100px] h-[40px] flex justify-center items-center bg-red-500"
                      onClick={closePopup}
                      to={`staff-management/staff-management-edit-page/${staffData}`}
                    >
                      <p className="font-bold text-white">Cập nhật</p>
                    </NavLink>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default StaffDetail;
