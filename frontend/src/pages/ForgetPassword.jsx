// Import Alert
import Swal from "sweetalert2";

// Import Icons
import { SlEnvolope, SlLockOpen } from "react-icons/sl";
import { TbPassword } from "react-icons/tb";

// Import ReactJS Hook
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

// Function for showing alert
const showAlert = (status, message) => {
    Swal.fire({
        title: status ? "Thành công" : "Thất bại",
        icon: status ? "success" : "error",
        text: message
    })
}
export default function ForgetPassword() {
    // Declare variables use for setting new password here
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    // // For OTP
    const [otp, setOtp] = useState('');
    const [otpPopupOpen, setOtpPopupOpen] = useState(false);

    const navigate = useNavigate();
    // Declare function here
    const handleSubmit = async() => {
        let check_email = true;
        let check_password = true;
        let check_confirm = true;

        const isEmailFormat = (input) =>
            /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(input);
        if (!isEmailFormat(email)) {
            showAlert(false, "Sai định dạng của email");
            check_email = false;
            return;
        }
        if (password.length == 0) {
            showAlert(false, "Mật khẩu mới không được rỗng");
            return;
        }
        else if (password.length < 5) {
            showAlert(false, "Mật khẩu quá ngắn");
            check_password = false;
            return;
        }
        if (confirmPassword !== password) {
            showAlert(false, "Mật khẩu xác nhận sai");
            check_confirm = false;
            return;
        }
        // If all condition is checked then go to this block to work with server
        if (check_email && check_password && check_confirm) {
            try {
                const response = await fetch(`http://127.0.0.1:8000/quenmatkhau/`, {
                    method: 'PUT',
                    headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        pemail: email                        
                      }),
                });
                if (!response.ok) {
                    throw new Error("Network failed");
                } else {
                    const data = await response.json();
                    if (data.message == `Đã gửi OTP đến email ${email}`) {         
                        setOtpPopupOpen(true); // Open Modal for enter OTP
                        showAlert(true, data.message);
                    } else {
                        showAlert(false, data.message);
                    };
                };
            } catch (error) {
                console.error("Error sending data: ", error);
            };
        };   
    };
    // // Handle OTP
    const handleVerifyOtp = async() => {
        // Gửi OTP tới server để xác nhận
        try {
            const response = await fetch(`http://127.0.0.1:8000/xacnhanotp/`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    pemail: email,
                    pmatkhau: password,
                    OTP: otp,
                }),
            });

            if (!response.ok) {
                throw new Error("OTP validation failed");
            } else {
                const data = await response.json();
                if (data.message === "Đổi mật khẩu thành công") {
                    showAlert(true, "OTP đúng. Đã đổi mật khẩu.\n Chuyển đến trang đăng nhập.");
                    setOtpPopupOpen(false);
                    navigate('/login');
                } else {
                    showAlert(false, data.message);
                };
            };
        } catch (error) {
            console.error("Error verifying OTP: ", error);
        };
    };
    // Return here
    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-r from-red-950 to-slate-800">
        <div className="flex flex-col bg-black w-1/2 sm:w-5/6 md:w-1/2 xl:w-2/5 gap-2">
            <p className="mt-2 p-2 text-4xl text-center text-white font-bold">
            ĐỔI MẬT KHẨU
            </p>
            <div className="mt-2 px-8 flex flex-col gap-5">
            <div>
                <label
                htmlFor="email"
                className="text-white font-semibold text-xl"
                >
                Email
                </label>
                <div className="relative">
                    <SlEnvolope className="absolute top-1/4 left-2 text-[30px]"/>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email ..."
                        className="mt-2 w-full rounded py-2 pl-12"
                    />
                </div>                
            </div>
            </div>
            <div className="mt-2 px-8 flex flex-col gap-5">
            <div>
                <label
                htmlFor="password"
                className="text-white font-semibold text-xl"
                >
                Mật khẩu mới
                </label>
                <div className="relative">
                    <SlLockOpen className="absolute top-1/4 left-2 text-[30px]"/>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Mật khẩu mới..."
                        className="mt-2 w-full rounded py-2 pl-12"
                    />
                </div>                
            </div>
            <div className="mt-3">
                <label
                htmlFor="confirm-password"
                className="text-white font-semibold text-xl"
                >
                Nhập lại mật khẩu mới
                </label>
                <div className="relative">
                    <SlLockOpen className="absolute top-1/4 left-2 text-[30px]"/>
                    <input
                        id="confirm-password"
                        name="confirm-password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Nhập lại mật khẩu..."
                        className="mt-2 w-full rounded py-2 pl-12"
                    />
                </div>                
            </div>
            </div>
            <div className="flex justify-around my-6 mx-3">
                <button
                    onClick={() => {handleSubmit();}}
                    className="bg-green-600 px-5 py-2 text-white text-lg font-semibold transform transition-all duration-200 hover:scale-110"
                >
                    Cập nhật
                </button>

                <NavLink
                    to="/login"
                    className="bg-red-600 px-5 py-2 text-white text-lg font-semibold transform transition-all duration-200 hover:scale-110"
                >
                    Hủy
                </NavLink>
            </div>
        </div>

        {/* Modal OTP here */}
        {otpPopupOpen && (
                <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-5 rounded-lg">
                        <h2 className="text-2xl font-semibold">Nhập OTP</h2>
                        <div>
                            <TbPassword className="absolute top-1/4 left-2 text-[30px]"/>
                            <input
                                type="text"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                placeholder="Nhập OTP..."
                                className="mt-2 w-full rounded-lg p-2"
                            />
                        </div>
                        <div>
                            <button
                                onClick={handleVerifyOtp}
                                className="bg-green-500 mr-4 mt-4 px-5 py-2 text-white text-lg rounded-lg"
                            >
                                Xác nhận OTP
                            </button>
                            <button
                                onClick={() => setOtpPopupOpen(false)}
                                className="bg-gray-500 mt-4 px-5 py-2 text-white text-lg rounded-lg"
                            >
                                Đóng
                            </button>
                        </div>
                    </div>
                </div>
            )}
    </div>
    );
};