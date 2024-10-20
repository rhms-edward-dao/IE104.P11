import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import EditIcon from "../images/icons/edit.png";

function MyAccount() {
  // Variables here
  const pass = "No String";
  const navigate = useNavigate();
  // Functions here
  const editHandle = () => {
    navigate("/my-account/my-account-edit-page");
  };
  return (
    <div>
      <Header headerTitle="Tài khoản"></Header>
      <div className="my-8 mx-4 grid grid-cols-2 bg-white rounded-lg shadow-lg">
        <div className="border-r-2 border-gray-200 p-4 pr-6">
          <div className="flex justify-between">
            <h1 className="m-2 text-2xl font-bold">Thông tin cá nhân</h1>
            <button onClick={editHandle}>
              <div className="flex gap-2 bg-green-500 p-2 rounded-lg items-center m-2">
                <p className="font-bold text-white hidden sm:hidden md:hidden lg:inline-block">
                  Chỉnh sửa
                </p>
                <img src={EditIcon} alt="Icon chỉnh sửa" />
              </div>
            </button>
          </div>
          <div className="mx-2 my-8 flex items-center">
            <h3 className="w-1/4 text-xl font-semibold">Ảnh đại diện:</h3>
            <div className="relative w-3/4 flex justify-center">
              <div className="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center">
                <input
                  type="file"
                  accept=".jpeg,.jpg,.png,.gif,.raw"
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer"
                >
                  <img alt="Camera Icon" className="w-9 h-9 mb-4" />

                  <span className="text-blue-500 hover:text-blue-700 whitespace-nowrap text-base">
                    Tải ảnh lên
                  </span>
                </label>
              </div>
            </div>
          </div>
          <div className="mx-2 my-8 flex">
            <h3 className="w-1/4 text-xl font-semibold justify-center">
              Họ tên:
            </h3>
            <p className="w-3/4 italic justify-start">{pass}</p>
          </div>
          <div className="mx-2 my-8 flex">
            <h3 className="w-1/4 text-xl font-semibold justify-center">
              Ngày sinh:
            </h3>
            <p className="w-3/4 italic justify-start">{pass}</p>
          </div>
          <div className="mx-2 my-8 flex">
            <h3 className="w-1/4 text-xl font-semibold justify-center">
              Số điện thoại:
            </h3>
            <p className="w-3/4 italic justify-start">{pass}</p>
          </div>
          <div className="mx-2 my-8 flex">
            <h3 className="w-1/4 text-xl font-semibold justify-center">
              Email:
            </h3>
            <p className="w-3/4 italic justify-start">{pass}</p>
          </div>
          <div className="mx-2 my-8 flex">
            <h3 className="w-1/4 text-xl font-semibold justify-center">
              Địa chỉ:
            </h3>
            <p className="w-3/4 italic justify-start">{pass}</p>
          </div>
        </div>
        <div className="p-4 pl-6">
          <div className="flex justify-between">
            <h1 className="m-2 text-2xl font-bold">Thông tin công việc</h1>
            <button>
              <div className="flex gap-2 bg-green-500 p-2 rounded-lg items-center m-2">
                <p className="font-bold text-white hidden sm:hidden md:hidden lg:inline-block">
                  Chỉnh sửa
                </p>
                <img src={EditIcon} alt="Icon chỉnh sửa" />
              </div>
            </button>
          </div>
          <div className="mx-2 my-8 flex">
            <h3 className="w-1/4 text-xl font-semibold justify-center">
              Chức vụ:
            </h3>
            <p className="w-3/4 italic justify-start">{pass}</p>
          </div>
          <div className="mx-2 my-8 flex">
            <h3 className="w-1/4 text-xl font-semibold justify-center">
              Cấp độ:
            </h3>
            <p className="w-3/4 italic justify-start">{pass}</p>
          </div>
          <div className="mx-2 my-8 flex">
            <h3 className="w-1/4 text-xl font-semibold justify-center">
              Lương:
            </h3>
            <p className="w-3/4 italic justify-start">{pass}</p>
          </div>
          <div className="mx-2 my-8 flex">
            <h3 className="w-1/4 text-xl font-semibold justify-center">
              Ngày bắt đầu:
            </h3>
            <p className="w-3/4 italic justify-start">{pass}</p>
          </div>
          <div className="mx-2 my-8 flex">
            <h3 className="w-1/4 text-xl font-semibold justify-center">
              Thời hạn:
            </h3>
            <p className="w-3/4 italic justify-start">{pass}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default MyAccount;
