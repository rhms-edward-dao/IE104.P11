import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";

const MyAccountEditPage = () => {
  const pass = "No string";
  const navigate = useNavigate();

  const backHandle = () => {
    navigate("/my-account");
  };
  return (
    <div>
      <Header />
      <div className="mx-8 my-4">
        <button onClick={backHandle}>
          <div className="flex gap-2 bg-white p-2 rounded-lg items-center m-2">
            <img alt="Icon trở về" />
            <p className="font-bold text-black hidden sm:hidden md:hidden lg:inline-block">
              Trở về
            </p>
          </div>
        </button>
      </div>
      <div className="mx-8 my-4 p-4 bg-slate-200 rounded-lg">
        <h1 className="p-2 text-3xl font-bold">Thay đổi thông tin cá nhân</h1>
        <div className="flex p-4 items-center">
          <h3 className="w-1/6 text-xl font-semibold">Ảnh đại diện:</h3>
          <div className="relative w-5/6 flex justify-center">
            <div className="w-36 h-36 rounded-full bg-gray-300 flex items-center justify-center">
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
        <div className="flex flex-col p-4 gap-2">
          <h3 className="h-1/4 text-xl font-semibold justify-center">
            Họ tên:
          </h3>
          <input
            className="h-3/4 p-2 border border-black bg-white rounded-md"
            type="text"
            defaultValue={pass}
            disabled="true"
          />
        </div>
        <div className="flex flex-col p-4 gap-2">
          <h3 className="h-1/4 text-xl font-semibold justify-center">
            Ngày sinh:
          </h3>
          <input
            className="h-3/4 p-2 border border-black bg-white rounded-md"
            type="text"
            defaultValue={pass}
            disabled="true"
          />
        </div>
        <div className="flex flex-col p-4 gap-2">
          <h3 className="h-1/4 text-xl font-semibold justify-center">
            Số điện thoại:
          </h3>
          <input
            className="h-3/4 p-2 border border-black bg-white rounded-md"
            type="text"
            defaultValue={pass}
            disabled="true"
          />
        </div>
        <div className="flex flex-col p-4 gap-2">
          <h3 className="h-1/4 text-xl font-semibold justify-center">Email:</h3>
          <input
            className="h-3/4 p-2 border border-black bg-white rounded-md"
            type="text"
            defaultValue={pass}
            disabled="true"
          />
        </div>
        <div className="flex flex-col p-4 gap-2">
          <h3 className="h-1/4 text-xl font-semibold justify-center">
            Địa chỉ:
          </h3>
          <input
            className="h-3/4 p-2 border border-black bg-white rounded-md"
            type="text"
            defaultValue={pass}
            disabled="true"
          />
        </div>
      </div>
      <div className="w-full mx-8 my-4 flex items-center justify-center">
        <button>
          <div className="flex gap-2 bg-red-500 p-2 rounded-lg items-center m-2">
            <img alt="Icon lưu" />
            <p className="font-bold text-white hidden sm:hidden md:hidden lg:inline-block">
              Lưu thay đổi
            </p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default MyAccountEditPage;
