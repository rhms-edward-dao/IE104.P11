import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  // Declare variables for Sign Up here
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  // // For modal
  const [otp, setOtp] = useState('');
  const [isOpenModal, setIsOpenModal] = useState(false);
  // // For manual modal
  const [emailManual, setEmailManual] = useState('');
  const [otpManual, setOtpManual] = useState('');
  const [isOpenVerificationModal, setIsOpenVerificationModal] = useState(false);
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
            "ptentaikhoan": username,
            "pmatkhau": password,
            "pemail": email 
          })
        });
        const data = await response.json();        
        if (data.message === `Tài khoản đã tạo nhưng chưa xác nhận. OTP xác nhận đã được gửi đến email ${email}`) {
          alert(`${data.message}.\n Trong 2 phút nếu không nhập OTP thì phải tạo lại tài khoản`);
          setIsOpenModal(true);
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error("POST method failed");
      }      
    }    
  };
  // Handle otp verification
  const handleVerifyOtp = async() => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/xacnhanotp-signup/`, {
          method: 'POST',
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({
              pemail: email,
              OTP: otp
          }),
      });

      if (!response.ok) {
          throw new Error("OTP validation failed");
      } else {
          const data = await response.json();
          if (data.message === "Tài khoản đã được kích hoạt") {
              alert("OTP đúng. Tài khoản đã được kích hoạt.\n Chuyển đến trang đăng nhập.");
              setIsOpenModal(false);
              navigate('/login');
          } else if (data.message === "OTP đã hết hạn (quá 2 phút).\n Tài khoản đã bị xóa.\n Hãy tạo lại") {
            alert(data.message);
            setIsOpenModal(false);
          } else {
              alert(data.message);
          }
      }
    } catch (error) {
      console.error("Error verifying OTP: ", error);
    }
  };

  // Handle otp verification Again
  const handleVerifyOtpManual = async() => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/xacnhanotp-signup/`, {
          method: 'POST',
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({
              pemail: emailManual,
              OTP: otpManual
          }),
      });

      if (!response.ok) {
          throw new Error("OTP validation failed");
      } else {
          const data = await response.json();
          if (data.message === "Tài khoản đã được kích hoạt") {
              alert("OTP đúng. Tài khoản đã được kích hoạt.\n Chuyển đến trang đăng nhập.");
              setIsOpenVerificationModal(false);
              navigate('/login');
          } else if (data.message === "OTP đã hết hạn (quá 2 phút).\n Tài khoản đã bị xóa.\n Hãy tạo lại") {
            alert(data.message);
            setIsOpenVerificationModal(false);
          } else {
              alert(data.message);
          }
      }
    } catch (error) {
      console.error("Error verifying OTP: ", error);
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
          <button
            onClick={() => {setIsOpenVerificationModal(true);}}
          >
            <p className="text-white hover:text-blue-500">Xác nhận OTP tài khoản đã đăng ký?</p>
          </button>          
        </div>
        <div className="flex items-center justify-center mb-4">
            <Link to="/login">
              <p className="text-lg text-white text-center hover:text-blue-500">
                Đã có tài khoản?
              </p>
            </Link>
          </div>
      </div>
      {/* Modal OTP here */}
      {isOpenModal && (
                <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-5 rounded-lg">
                        <h2 className="text-2xl font-semibold">Nhập OTP</h2>
                        <input
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="Nhập OTP..."
                            className="mt-2 w-full rounded-lg p-2"
                        />
                        <button
                            onClick={handleVerifyOtp}
                            className="bg-green-500 mr-4 mt-4 px-5 py-2 text-white text-lg rounded-lg"
                        >
                            Xác nhận OTP
                        </button>
                        <button
                            onClick={() => setIsOpenModal(false)}
                            className="bg-gray-500 mt-4 px-5 py-2 text-white text-lg rounded-lg"
                        >
                            Đóng
                        </button>
                    </div>
                </div>
            )}
      {/* Modal for verification OTP here */}
      {isOpenVerificationModal && (
                <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-5 rounded-lg">
                        <h2 className="text-2xl font-semibold">Nhập Email</h2>
                        <input
                            type="text"
                            value={emailManual}
                            onChange={(e) => setEmailManual(e.target.value)}
                            placeholder="Nhập email..."
                            className="mt-2 w-full rounded-lg p-2"
                        />
                        <h2 className="mt-3 text-2xl font-semibold">Nhập OTP</h2>
                        <input
                            type="text"
                            value={otpManual}
                            onChange={(e) => setOtpManual(e.target.value)}
                            placeholder="Nhập OTP..."
                            className="mt-2 w-full rounded-lg p-2"
                        />
                        <button
                            onClick={handleVerifyOtpManual}
                            className="bg-green-500 mr-4 mt-4 px-5 py-2 text-white text-lg rounded-lg"
                        >
                            Xác nhận OTP
                        </button>
                        <button
                            onClick={() => setIsOpenVerificationModal(false)}
                            className="bg-gray-500 mt-4 px-5 py-2 text-white text-lg rounded-lg"
                        >
                            Đóng
                        </button>
                    </div>
                </div>
            )}
    </div>
  );
}
export default SignUp;
