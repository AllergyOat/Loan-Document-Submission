import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/auth/login", {
                email,
                password,
            });

            // Store token & user role in localStorage
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("UserID", response.data.user.UserID);
            localStorage.setItem("name", response.data.user.name);
            localStorage.setItem("role", response.data.user.role); 

            console.log("UserID : ", response.data.user.UserID);
            console.log("User's name : ", response.data.user.name);
            console.log("Role : ", response.data.user.role);


            if (response.data.role === "admin") {
                navigate("/admin");
            } else {
                navigate("/dashboard");
            }

        } catch (error) {
            alert(error.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="flex flex-col pt-[100px] items-center h-max bg-amb">
            <section className="w-2/4 h-[200px]">
                <div>
                    <h1 className="text-4xl font-bold pb-5">ลงชื่อเข้าใช้งาน</h1>
                </div>
                <form onSubmit={handleLogin}>
                    <div className="py-5">
                        <h2 className="text-xl font-bold pb-[10px]">อีเมลแอดเดรส</h2>
                        <input type="email" className="border rounded-xl w-full h-[60px] px-4 bg-white" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="py-5">
                        <h2 className="text-xl font-bold pb-[10px]">รหัสผ่าน</h2>
                        <input type="password" className="border rounded-xl w-full h-[60px] px-4 bg-white" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <div className="py-6">
                        <button type="submit" className="border rounded-xl w-full h-[60px] text-white font-bold bg-gradient-to-r from-blue-900 to-gray-800 cursor-pointer">
                            เข้าสู่ระบบ
                        </button>
                    </div>
                    <div></div>
                </form>
            </section>
        </div>
    );
};

export default Login;
