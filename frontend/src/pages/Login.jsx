// Import Alert
import Swal from "sweetalert2";

// Import Icons
import { SlUser, SlLockOpen  } from "react-icons/sl";

// Import ReactJS Hook
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Import context
import { useAuth } from "../contexts/AuthContext";
import { ActiveButton } from "../contexts/ActiveButton";
// Function for showing alert
const showAlert = (status, message) => {
  Swal.fire({
    title: status ? "Thành công!" : "Thất bại",
    icon: status ? "success" : "error",
    text: message
  });
};
// Login function
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

  const loginHandle = async (username, password) => {
    // If username or password is empty send Alert and stop this function immediately
    if (username === "") {
      showAlert(false, "Tên tài khoản nhập vào rỗng!");
      return;
    } else if (password === "") {
      showAlert(false, "Mật khẩu nhập vào rỗng!");
      return;
    };
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
          showAlert(true, "Login Successfully!");
          // Set data for context
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
              storeID: data.storeID
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
            showAlert(false, data.message);
          } else if (data.message === "Sai tên đăng nhập/ mật khẩu") {
            showAlert(false, data.message);
          } else {
            showAlert(false, data.message);
          }
        }
      }
    } catch (error) {
      console.error("Đăng nhập thất bại", error);
    }
  };

  // Render return here
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-red-950 to-slate-800">
      <div className="flex flex-col bg-black w-1/2 sm:w-5/6 md:w-1/2 xl:w-2/5 gap-2 py-3 shadow-2xl">
        <p className="mt-2 p-2 text-4xl text-center text-white font-bold">
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
            <div className="relative">
              <SlUser className="absolute top-1/4 left-2 text-[30px]"/> 
              <input
                id="store-name-login"
                name="store-name-login"
                type="text"
                placeholder="Tên đăng nhập..."
                className="mt-2 w-full rounded py-2 pl-12"
                values={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>            
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="password-login"
              className="text-white font-semibold text-xl"
            >
              Mật khẩu
            </label>
            <div className="relative">
              <SlLockOpen className="absolute top-1/4 left-2 text-[30px]"/>
              <input
                id="password-login"
                name="password-login"
                type="password"
                placeholder="Mật khẩu..."
                className="mt-2 w-full rounded py-2 pl-12"
                values={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>            
          </div>
        </div>
        <div className="flex flex-wrap gap-4 justify-around my-6 mx-3">
          <button
            className="bg-green-600 px-5 py-2 text-white text-lg font-semibold transform transition-all duration-200 hover:scale-110"
            onClick={() => {loginHandle(username, password);}}
          >
            Đăng nhập
          </button>                  
          <div className="flex items-center">
            <Link to="/forget-password">
              <p className="text-white text-center font-semibold hover:text-blue-500 transform duration-200">
                Quên mật khẩu ?
              </p>
            </Link>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <Link to="/sign-up">
            <p className="text-lg font-semibold text-white text-center hover:text-blue-500 transform duration-200">
              Chưa có tài khoản ?
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
