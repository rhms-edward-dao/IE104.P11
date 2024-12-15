import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDetailPopup } from "../../contexts/DetailPopup";
import { getStaffDetail } from "../../assets/Staffs/StaffData";
import { useTranslation } from "react-i18next";

const StaffDetail = () => {
  // Variables here
  // // For Multi-Language
  const { t } = useTranslation();
  const { Section1, Section2 } = t("AccountPage");
  const { DP_Staff } = t("DetailPage");
  const { Edit } = t("Buttons");
  const { popupData, showPopup, closePopup } = useDetailPopup();
  const [staffDataDetail, setStaffDataDetail] = useState([]);
  const [loading, setLoading] = useState(true);
  // Function here
  useEffect(() => {
    const fetchData = async () => {
      // Getting data for staff
      const existedStaffData = await getStaffDetail(popupData);
      setStaffDataDetail(existedStaffData[0]);
      setLoading(false);
    };
    if (showPopup) {
      fetchData();
    }
  }, [popupData, showPopup]);
  // Return here
  return (
    <>
      {showPopup && (
        <div
          id="popup-modal"
          tabIndex="-1"
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-75"
        >
          <div className="max-h-4xl relative w-full max-w-4xl rounded-lg bg-white p-4 shadow-lg dark:bg-[#363636]">
            <h1 className="mb-4 text-2xl font-bold text-black dark:text-white">
              {DP_Staff.Title}
            </h1>
            <button
              type="button"
              onClick={closePopup}
              className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-lg text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900"
            >
              <svg
                className="h-3 w-3"
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
                <div className="mx-5 w-1/2">
                  <div className="flex items-center justify-between">
                    <h2 className="mb-8 mt-5 text-center text-xl font-bold text-black dark:text-white">
                      {Section1.Title}
                    </h2>
                    <div className="flex justify-end">
                      <NavLink
                        className="flex h-10 w-28 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#03DF04] via-[#2AED2D] to-[#62F163] px-4 py-2 font-bold text-white transition-all duration-300 hover:scale-105 hover:bg-gradient-to-l hover:from-[#03DF04] hover:via-[#2AED2D] hover:to-[#62F163]"
                        onClick={closePopup}
                        to={`staff-management/staff-management-edit-page/${popupData}`}
                      >
                        <p>{Edit}</p>
                      </NavLink>
                    </div>
                  </div>
                  <div className="my-10 flex items-center justify-between lg:mx-14">
                    <p className="font-bold text-black dark:text-white">
                      {Section1.Label1}:
                    </p>
                    <img
                      width="60px"
                      src={`data:images/jpeg;base64, ${staffDataDetail.avatar}`}
                      alt="Ảnh đại diện"
                    />
                  </div>
                  <div className="my-8 flex justify-between text-black dark:text-white lg:mx-14">
                    <p className="font-bold">{Section1.Label2}: </p>
                    <p>{staffDataDetail.hoten}</p>
                  </div>
                  <div className="my-8 flex justify-between text-black dark:text-white lg:mx-14">
                    <p className="font-bold">{Section1.Label3}: </p>
                    <p>{staffDataDetail.ngaysinh}</p>
                  </div>
                  <div className="my-8 flex justify-between text-black dark:text-white lg:mx-14">
                    <p className="font-bold">{Section1.Label4}: </p>
                    <p>{staffDataDetail.sodienthoai}</p>
                  </div>
                  <div className="my-8 flex justify-between text-black dark:text-white lg:mx-14">
                    <p className="font-bold">{Section1.Label5}: </p>
                    <p>{staffDataDetail.email}</p>
                  </div>
                  <div className="my-8 flex justify-between text-black dark:text-white lg:mx-14">
                    <p className="whitespace-nowrap font-bold">
                      {Section1.Label6}:{" "}
                    </p>
                    <p className="text-right">{staffDataDetail.diachi}</p>
                  </div>
                </div>
                <div className="mx-5 w-1/2">
                  <h2 className="mb-8 mt-5 text-center text-xl font-bold text-black dark:text-white">
                    {Section2.Title}
                  </h2>
                  <div className="my-8 flex justify-between text-black dark:text-white lg:mx-14">
                    <p className="font-bold">{DP_Staff.Store}:</p>
                    <p>{staffDataDetail.tendaily}</p>
                  </div>
                  <div className="my-8 flex justify-between text-black dark:text-white lg:mx-14">
                    <p className="font-bold">{Section2.Label1}:</p>
                    <p>{staffDataDetail.tenchucvu}</p>
                  </div>
                  <div className="my-8 flex justify-between text-black dark:text-white lg:mx-14">
                    <p className="font-bold">{Section2.Label2}:</p>
                    <p>{staffDataDetail.capdo}</p>
                  </div>
                  <div className="my-8 flex justify-between text-black dark:text-white lg:mx-14">
                    <p className="font-bold">{Section2.Label3}:</p>
                    <p>{staffDataDetail.luong}</p>
                  </div>
                  <div className="my-8 flex justify-between text-black dark:text-white lg:mx-14">
                    <p className="font-bold">{Section2.Label4}:</p>
                    <p>{staffDataDetail.ngaybatdau}</p>
                  </div>
                  <div className="my-8 flex justify-between text-black dark:text-white lg:mx-14">
                    <p className="font-bold">{Section2.Label5}:</p>
                    <p>{staffDataDetail.thoihan}</p>
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
