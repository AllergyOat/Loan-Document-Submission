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
        <div>
            <h2>Student Dashboard</h2>
            <p>{message}</p>
            <button onClick={handleLogout} className="border-1">Logout</button>
        </div>
    );
};

export default Dashboard;
