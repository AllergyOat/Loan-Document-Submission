import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";

const Nav = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    return (
        <nav className="bg-white text-black h-[70px] m-0 flex items-center justify-between sticky top-0 z-50 border-b shadow-md pl-5">

            <div className="flex items-center">
                <img src="/assets/images/DSL logo.png" className="h-[50px] pr-4" alt="Header" />
                <h1 className="font-extrabold text-3xl">กยศ.</h1>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-3xl focus:outline-none pr-5"
                >
                    {isOpen ? "✖" : "☰"}
                </button>
            </div>

            <ul className={`md:flex md:flex-row md:items-center md:space-x-6 absolute md:static bg-white w-4/5 md:w-auto left-0 top-[70px] md:top-0 transition-all duration-300 shadow-md md:shadow-none ${isOpen ? "block" : "hidden"}`}>
                <li className={`p-3 m-0 md:p-5 text-xl border-b md:border-none relative ${location.pathname === "/dashboard" ? "font-bold text-black" : ""}`}>
                    <Link to="/dashboard">หน้าหลัก</Link>
                    {location.pathname === "/dashboard" && <div className="absolute bottom-0 left-3 w-4/5 h-[8px] bg-[#9CCEDB]"></div>}
                </li>
                <li className={`p-3 m-0 md:p-5 text-xl border-b md:border-none relative ${location.pathname === "/document" ? "font-bold text-black" : ""}`}>
                    <Link to="/document">ส่งเอกสารกู้ยืม</Link>
                    {location.pathname === "/document" && <div className="absolute bottom-0 left-4 w-4/5 h-[8px] bg-[#9CCEDB]"></div>}
                </li>
                <li className={`p-3 m-0 md:p-5 text-xl border-b md:border-none relative ${location.pathname === "/edit" ? "font-bold text-black" : ""}`}>
                    <Link to="/edit">จัดการเอกสาร</Link>
                    {location.pathname === "/edit" && <div className="absolute bottom-0 left-4 w-4/5 h-[8px] bg-[#9CCEDB]"></div>}
                </li>
                <li className={`p-3 m-0 md:p-5 text-xl border-b md:border-none relative ${location.pathname === "/status" ? "font-bold text-black" : ""}`}>
                    <Link to="/status">ติดตามสถานะ</Link>
                    {location.pathname === "/status" && <div className="absolute bottom-0 left-4 w-4/5 h-[8px] bg-[#9CCEDB]"></div>}
                </li>
                <li className={`p-3 m-0 border-l-1 md:p-5 text-xl relative ${location.pathname === "/login" ? "font-bold text-[#9CCEDB]" : ""}`}>
                    <Link to="/login"><FaRegUser className="text-2xl" /></Link>
                </li>
            </ul>

        </nav>
    );
};

export default Nav;
