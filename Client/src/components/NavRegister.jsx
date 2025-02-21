import { Link, useLocation } from "react-router-dom";

const RegisterNav = () => {
  const location = useLocation();

  return (
    <nav className="flex flew-row justify-between items-center w-full h-[80px] bg-gray-800 text-white p-4">
      <div className="flex justify-start items-center pl-5 w-full max-w-3/5">
          <img src="/assets/images/DSL logo.png" className="pr-5 h-15" alt="Header" />
          <h1 className="font-extrabold text-3xl">กยศ. <span className="font-semibold">Account</span></h1>
      </div>
      <div className="w-full max-w-2/5">
        <ul className="flex flex-row justify-end">
          <li className={`pr-8 ${location.pathname === "/login" ? "font-bold" : ""}`}>
            <Link to="/login">Login</Link>
          </li>
          <li className={`${location.pathname === "/register" ? "font-bold" : ""}`}>
            <Link to="/register">Create Account</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default RegisterNav;
