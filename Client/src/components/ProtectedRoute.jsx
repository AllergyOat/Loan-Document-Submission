import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const location = useLocation();

    if (!token) {
        return <Navigate to="/login" />;
    }

    if (location.pathname === "/admin" && role !== "admin") {
        return <Navigate to="/dashboard" />;
    }

    return children;
};

export default ProtectedRoute;
