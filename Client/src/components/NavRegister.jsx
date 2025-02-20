import { Link } from "react-router-dom";

const RegisterNav = () => {

  return (
    <nav className="bg-gray-800 text-white p-4">
      <ul>        
          <>
          <div className="flex justify-end">
            <li className="pr-5"><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </div>
          </>
      </ul>
    </nav>
  );
};

export default RegisterNav;
