import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
    const [name, setName] = useState("");
    const [birthday, setBirthday] = useState("");
    const [tel, setTel] = useState("");
    const [faculty, setFaculty] = useState("");
    const [major, setMajor] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:5000/api/auth/register", {
                name,
                birthday,
                tel,
                faculty,
                major,
                email,
                password,
            });

            alert("Registration successful! Please log in.");
            navigate("/login");
        } catch (error) {
            alert(error.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleRegister} className="flex flex-col">
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                <input type="date" placeholder="Birthday" value={birthday} onChange={(e) => setBirthday(e.target.value)} required />
                <input type="text" placeholder="Telephone" value={tel} onChange={(e) => setTel(e.target.value)} required />
                <input type="text" placeholder="Faculty" value={faculty} onChange={(e) => setFaculty(e.target.value)} required />
                <input type="text" placeholder="Major" value={major} onChange={(e) => setMajor(e.target.value)} required />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit" className="border-1 max-w-[100px]">Register</button>
            </form>
        </div>
    );
};

export default Register;
