import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Policy from "./pages/Policy";
import Dashboard from "./pages/Dashboard";
import Document from "./pages/Document";
import AdminDashboard from "./pages/AdminDashboard";
import CreateDocument from "./pages/CreateDocument";
import Status from "./pages/Status";
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
                <Route path="/" element={<Navigate to="/dashboard" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/policy" element={<Policy />} />
                <Route path="/register" element={<Register />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/document" element={<Document />} />
                <Route path="/document/loan/:id" element={<CreateDocument />} />
                <Route path="/document/refund/:id" element={<CreateDocument />} />
                <Route path="/status" element={<Status />} />
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
