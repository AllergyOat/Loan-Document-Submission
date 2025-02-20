import { Link } from "react-router-dom";

const Nav = () => {

    return (
        <nav className="bg-blue-950 text-white h-[80px] p-0 m-0 flex items-center">
            <ul className="w-full flex justify-end">
                <div className="flex justify-end w-full max-w-4xl">
                    <li className="p-5"><Link to="/admin">หน้าหลัก</Link></li>
                    <li className="p-5"><Link to="/">ส่งเอกสารกู้ยืม</Link></li>
                    <li className="p-5"><Link to="/">ติดตามสถานะ</Link></li>
                    <li className="p-5"><Link to="/">ต่อต่อเจ้าหน้าที่</Link></li>
                    <li className="p-5"><Link to="/">Acc</Link></li>
                </div>
            </ul>
        </nav>

    );
};

export default Nav;
