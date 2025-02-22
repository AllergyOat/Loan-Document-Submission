import { Link } from "react-router-dom";
import { useState } from "react";

const Nav = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-white text-black h-[70px] p-0 m-0 flex items-center justify-between sticky top-0 z-50 border-b shadow-md px-6">
            

            <div className="flex items-center">
                <img src="/assets/images/DSL logo.png" className="h-[50px] pr-4" alt="Header" />
                <h1 className="font-extrabold text-3xl">กยศ.</h1>
            </div>

            {/* Mobile Menu Button (Visible on Small Screens) */}
            <div className="md:hidden">
                <button 
                    onClick={() => setIsOpen(!isOpen)} 
                    className="text-3xl focus:outline-none"
                >
                    {isOpen ? "✖" : "☰"}
                </button>
            </div>
            
            {/* Navigation Links */}
            <ul className={`md:flex md:flex-row md:items-center md:space-x-6 absolute md:static bg-white w-full md:w-auto left-0 top-[70px] md:top-0 transition-all duration-300 shadow-md md:shadow-none ${isOpen ? "block" : "hidden"}`}>
                <li className="p-4 m-0 md:p-5 text-xl font-bold border-b md:border-none"><Link to="/admin">หน้าหลัก</Link></li>
                <li className="p-4 m-0 md:p-5 text-xl border-b md:border-none"><Link to="/">ส่งเอกสารกู้ยืม</Link></li>
                <li className="p-4 m-0 md:p-5 text-xl border-b md:border-none"><Link to="/">ติดตามสถานะ</Link></li>
                <li className="p-4 m-0 md:p-5 text-xl border-b md:border-none"><Link to="/">ติดต่อเจ้าหน้าที่</Link></li>
                <li className="p-4 m-0 md:p-5 text-xl"><Link to="/login">Acc</Link></li>
            </ul>
        </nav>
    );
};

export default Nav;
