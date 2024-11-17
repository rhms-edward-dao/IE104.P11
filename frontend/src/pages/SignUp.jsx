import { useState } from "react";

import { Link } from "react-router-dom";
function SignUp() {
  // Declare variables for Sign Up here
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");

  // Declare functions for Sign Up here
  const handleSubmit = async() => {
    let check_username = true;
    let check_password = true;
    let check_confirmPassword = true;
    let check_email = true;

    // Check username's length
    if (username.length < 3) {
      alert("Tên tài khoản quá ngắn");
    } else if (username.length > 50) {
      alert("Tên tài khoản tối đa 50 kí tự");
    } else {
      check_username = false;
    }

    // Check password's length
    if (password.length < 5) {
      alert("Mật khẩu tối thiểu 5 kí tự");
    } else if (password.length > 50) {
      alert("Mật khẩu tối đa 50 kí tự");
    } else {
      check_password = false;
    }

    // Check password again
    if (confirmPassword !== password) {
      alert("Mật khẩu xác nhận không đúng");
    } else {
      check_confirmPassword = false;
    }

    // Check email
    const isEmailFormat = (input) =>
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(input);
    if (!isEmailFormat(email)) {
      alert("Sai định dạng của email");      
    } else {
      check_email = false;
    }

    // Check all condition here - send formData
    if (!check_username && !check_password && !check_confirmPassword && !check_email) {
      try {
        const response = await fetch(`http://127.0.0.1:8000/signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "tentaikhoan": username,
            "matkhau": password,
            "email": email 
          })
        });
        const data = await response.json();
      } catch (error) {
        console.error("POST method failed");
      }
    }    
  };
  // Return render here
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
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Nhập lại mật khẩu..."
              className="mt-2 w-full rounded-lg p-2"              
            />
          </div>
          <div className="mt-3">
            <label
              htmlFor="password-login"
              className="text-white font-semibold text-xl"
            >
              Email
            </label>

            <input
              id="password-login"
              name="password-login"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email..."
              className="mt-2 w-full rounded-lg p-2"
            />
          </div>
        </div>
        <div className="flex justify-around my-6 mx-3">
          <button 
            onClick={() => {handleSubmit();}}
            className="bg-red-500 px-5 py-2 text-white text-lg rounded-lg"
          >
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
