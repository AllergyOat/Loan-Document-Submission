import { Link } from "react-router-dom";

const Nav = () => {

    return (
        <nav className="bg-white text-black h-[70px] p-0 m-0 flex flex-row items-center justify-between">
            <div className="flex justify-start items-center pl-5 w-full max-w-1/4">
                <img src="/assets/images/DSL logo.png"  className="pr-4" alt="Header" />
                <h1 className="font-extrabold text-4xl">กยศ.</h1>
            </div>
            <ul className="flex justify-end w-full max-w-auto">
                <div className="flex justify-end">
                    <li className="p-5 text-xl  font-bold"><Link to="/admin">หน้าหลัก</Link></li>
                    <li className="p-5 text-xl "><Link to="/">ส่งเอกสารกู้ยืม</Link></li>
                    <li className="p-5 text-xl "><Link to="/">ติดตามสถานะ</Link></li>
                    <li className="p-5 text-xl "><Link to="/">ต่อต่อเจ้าหน้าที่</Link></li>
                    <li className="p-5 text-xl "><Link to="/login">Acc</Link></li>
                </div>
            </ul>
        </nav>

    );
};

export default Nav;
