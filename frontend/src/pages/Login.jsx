import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";
import { ActiveButton } from "../contexts/ActiveButton";

function Login() {
  // Variables here
  // Variables for login
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // Variables for button state
  const { activateDaily, activateSanpham } = ActiveButton();

  const navigate = useNavigate();

  // Variables for sidebar
  const { login, isAdminYes } = useAuth();
  // Function here
  // Function for showing all button in sidebar after logining

  const loginHandle = async () => {
    // Send login information to backend via Fetch
    try {
      const response = await fetch("http://127.0.0.1:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ptentaikhoan: username,
          pmatkhau: password,
        }),
      });
      if (response.ok) {
        const data = await response.json();

        if (data.success) {
          console.log(data);
          alert("Đăng nhập thành công");
          login({
            userName: data.staffName,
            userID: data.staffID,
            storeID: data.storeID,
            isAdmin: data.isAdmin,
          });
          // Save data to SessionStorage
          sessionStorage.setItem("isLoggedIn", "true");
          sessionStorage.setItem(
            "userInfo",
            JSON.stringify({
              userName: data.staffName,
              userID: data.staffID,
              isAdmin: data.isAdmin,
            })
          );
          // Set data for authentication here
          if (data.isAdmin) {
            isAdminYes();
            activateDaily();
            navigate("/stores");
          } else {
            activateSanpham();
            navigate("/products");
          }
        } else {
          if (data.message === "Tài khoản này là tài khoản khách hàng") {
            alert(data.message);
          } else if (data.message === "Sai tên đăng nhập/ mật khẩu") {
            alert(data.message);
          } else {
            alert(data.message);
          }
        }
      }
    } catch (error) {
      console.log("Đăng nhập thất bại", error);
    }
  };

  // Render return here
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col bg-black w-1/2 sm:w-5/6 md:w-1/2 xl:w-2/5 gap-2">
        <p className="mt-2 p-2 text-4xl text-center text-white font-bold italic">
          ĐĂNG NHẬP
        </p>
        <div className="mt-2 px-8 flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <label
              htmlFor="store-name-login"
              className="text-white font-semibold text-xl"
            >
              Tên đăng nhập
            </label>
            <input
              id="store-name-login"
              name="store-name-login"
              type="text"
              placeholder="Tên đăng nhập..."
              className="mt-2 w-full rounded-lg p-2"
              values={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="password-login"
              className="text-white font-semibold text-xl"
            >
              Mật khẩu
            </label>
            <input
              id="password-login"
              name="password-login"
              type="password"
              placeholder="Mật khẩu..."
              className="mt-2 w-full rounded-lg p-2"
              values={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-around my-6 mx-3">
          <button
            className="bg-red-500 px-5 py-2 text-white text-lg rounded-lg"
            onClick={loginHandle}
          >
            Đăng nhập
          </button>
          <div className="flex items-center">
            <Link to="/sign-up">
              <p className="text-white text-center hover:text-blue-500">
                Chưa có tài khoản?
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
