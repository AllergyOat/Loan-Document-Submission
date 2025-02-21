import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("token"); // Get token

            if (!token) {
                navigate("/login");
                return;
            }

            try {
                const response = await axios.get("http://localhost:5000/api/auth/student", {
                    headers: { Authorization: `Bearer ${token}` }
                });

                setMessage(response.data.message);
            } catch (error) {
                alert("Session expired. Please log in again.");
                localStorage.removeItem("token");
                navigate("/login");
            }
        };

        fetchData();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className="">
            <img src="/assets/images/Header.png" className="" alt="Header" />
            <div className="block w-full">
                <h1 className="text-4xl font-bold p-10">สื่อประชาสัมพันธ์ / ข่าวสาร</h1>
            </div>
            <section className="flex flex-col justify-center items-center">
                <p className="">GetDate()</p>
                <div className="block w-4/5 h-[250px] rounded-2xl bg-gray-300"></div>
                <p className="px-10">{message}</p>
                <button onClick={handleLogout} className="border-1">Logout</button>
            </section>
        </div>
    );
};

export default Dashboard;
