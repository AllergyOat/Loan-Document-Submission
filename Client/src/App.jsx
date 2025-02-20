import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Nav from "./components/Nav";
import RegisterNav from "./components/NavRegister";

const AppContent = () => {
    const location = useLocation();
    const showRegisterNav = location.pathname === "/login" || location.pathname === "/register";

    return (
        <>
            {showRegisterNav ? <RegisterNav /> : <Nav />}
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
            </Routes>
        </>
    );
};


function App() {
    return (
        <Router>
            <AppContent />
        </Router>

    );
}

export default App;
