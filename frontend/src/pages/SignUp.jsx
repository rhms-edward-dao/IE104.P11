import { Link } from "react-router-dom";
function SignUp() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col bg-black w-1/2 sm:w-5/6 md:w-1/2 xl:w-2/5 gap-2">
        <p className="mt-2 p-2 text-4xl text-center text-white font-bold italic">
          ĐĂNG KÝ
        </p>
        <div className="mt-2 px-8 flex flex-col gap-5">
          <div>
            <label
              htmlFor="store-name-login"
              className="text-white font-semibold text-xl"
            >
              Tên tài khoản
            </label>

            <input
              id="store-name-login"
              name="store-name-login"
              type="text"
              placeholder="Tên tài khoản..."
              className="mt-2 w-full rounded-lg p-2"
            />
          </div>
          <div className="mt-3">
            <label
              htmlFor="password-login"
              className="text-white font-semibold text-xl"
            >
              Mật khẩu
            </label>

            <input
              id="password-login"
              name="password-login"
              type="text"
              placeholder="Mật khẩu..."
              className="mt-2 w-full rounded-lg p-2"
            />
          </div>
          <div className="mt-3">
            <label
              htmlFor="password-login"
              className="text-white font-semibold text-xl"
            >
              Nhập lại mật khẩu
            </label>

            <input
              id="password-login"
              name="password-login"
              type="text"
              placeholder="Nhập lại mật khẩu..."
              className="mt-2 w-full rounded-lg p-2"
            />
          </div>
          <div className="mt-3">
            <label
              htmlFor="password-login"
              className="text-white font-semibold text-xl"
            >
              Email (cơ quan)
            </label>

            <input
              id="password-login"
              name="password-login"
              type="text"
              placeholder="Email (cơ quan)..."
              className="mt-2 w-full rounded-lg p-2"
            />
          </div>
        </div>
        <div className="flex justify-around my-6 mx-3">
          <button className="bg-red-500 px-5 py-2 text-white text-lg rounded-lg">
            Đăng ký
          </button>
          <div className="flex items-center">
            <Link to="/login">
              <p className="text-white text-center hover:text-blue-500">
                Đã có tài khoản?
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SignUp;
