import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [birthday, setBirthday] = useState("");
    const [tel, setTel] = useState("");
    const [faculty, setFaculty] = useState("");
    const [major, setMajor] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [studentID, setStudentID] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        const fullName = `${firstName} ${lastName}`.trim();
        try {
            const response = await axios.post("http://localhost:5000/api/auth/register", {
                name: fullName,
                birthday,
                tel,
                faculty,
                major,
                email,
                password,
                studentID
            });

            alert("Registration successful! Please log in.");
            navigate("/login");
        } catch (error) {
            alert(error.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="flex flex-col items-start p-[50px]">
            <div className="pb-10 pl-[140px]">
                <h1 className="font-bold text-2xl">กรอกข้อมูลส่วนตัว</h1>
                <p className="text-gray-500">กรุณากรอกข้อมูลให้ถูกต้องครบถ้วน</p>
            </div>

            <div className="bg-gray-200 w-4/5 p-10 rounded-xl mx-auto">
                <form onSubmit={handleRegister} className="flex flex-col">
                    <h2 className="font-bold text-xl pb-5">ข้อมูลส่วนตัว</h2>
                    <div className="grid grid-cols-2">
                        <div className="pb-2">
                            <h3>ชื่อ</h3>
                            <input
                                className="border-1 rounded-md bg-white w-[400px] px-2 h-[50px]"
                                type="text"
                                placeholder="First Name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="pb-2">
                            <h3>นามสกุล</h3>
                            <input
                                className="border-1 rounded-md bg-white w-[400px] px-2 h-[50px]"
                                type="text"
                                placeholder="Last Name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <div className="pb-2">
                                <h3>วันเกิด</h3>
                                <input
                                    className="border-1 rounded-md bg-white px-2 w-[400px] h-[50px]"
                                    type="date"
                                    placeholder="Birthday"
                                    value={birthday} onChange={(e) => setBirthday(e.target.value)}
                                    required />
                            </div>
                        </div>
                        <div className="pb-2">
                            <h3>เบอร์โทรศัพท์</h3>
                            <input
                                className="border-1 rounded-md bg-white px-2 w-[400px] h-[50px]"
                                type="text"
                                placeholder="Telephone"
                                value={tel} onChange={(e) => setTel(e.target.value)}
                                required />
                        </div>
                    </div>


                    <h2 className="font-bold text-xl pt-10 pb-5">ข้อมูลสถานศึกษา</h2>
                    <div className="pb-2">
                        <h3>คณะ</h3>
                        <input
                            className="border-1 rounded-md bg-white px-2 w-[400px] h-[50px]"
                            type="text"
                            placeholder="Faculty"
                            value={faculty} onChange={(e) => setFaculty(e.target.value)}
                            required />
                    </div>
                    <div className="pb-2">
                        <h3>สาขา</h3>
                        <input
                            className="border-1 rounded-md bg-white px-2 w-[400px] h-[50px]"
                            type="text"
                            placeholder="Major"
                            value={major} onChange={(e) => setMajor(e.target.value)}
                            required />
                    </div>
                    <div className="pb-2">
                        <h3>รหัสนักศึกษา</h3>
                        <input
                            className="border-1 rounded-md bg-white px-2 w-[400px] h-[50px]"
                            type="text"
                            placeholder="Student ID"
                            value={studentID} onChange={(e) => setStudentID(e.target.value)}
                            required />
                    </div>

                    <h2 className="font-bold text-xl pt-10 pb-5">สร้างแอคเคาท์</h2>
                    <div className="pb-2">
                        <h3>อีเมลแอดเดรส</h3>
                        <input
                            className="border-1 rounded-md bg-white px-2 w-[400px] h-[50px]"
                            type="email"
                            placeholder="Email"
                            value={email} onChange={(e) => setEmail(e.target.value)}
                            required />
                    </div>

                    {/* Password section */}
                    <div className="pb-10">
                        <h3>รหัสผ่าน</h3>
                        <input
                            className="border-1 rounded-md bg-white px-2 w-[400px] h-[50px]"
                            type="password"
                            placeholder="Password"
                            value={password} onChange={(e) => setPassword(e.target.value)}
                            required />
                    </div>
                    <button
                        type="submit"
                        className="w-full max-w-[300px] h-[50px] text-white font-bold bg-gradient-to-r from-blue-900 to-gray-800 rounded-lg shadow-md"
                    >
                        บันทึก
                    </button>

                </form>
            </div>
        </div>
    );
};

export default Register;
