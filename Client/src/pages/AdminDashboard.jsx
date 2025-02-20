import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminDashboard = () => {
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                navigate("/login");
                return;
            }

            try {
                const response = await axios.get("http://localhost:5000/api/auth/admin", {
                    headers: { Authorization: `Bearer ${token}` }
                });

                setMessage(response.data.message);
            } catch (error) {
                alert("Access Denied. Redirecting to login.");
                localStorage.removeItem("token");
                navigate("/login");
            }
        };

        fetchData();
    }, [navigate]);

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h2>Admin Dashboard</h2>
            <p>{message}</p>
            <button  className="border-1" onClick={() => {
                localStorage.removeItem("token");
                navigate("/login");
            }}>Logout</button>
        </div>
    );
};

export default AdminDashboard;
