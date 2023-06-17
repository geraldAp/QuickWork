import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { AuthContext } from "../context/AuthContext";
import { UtilContext } from "../context/utilContext";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useContext(AuthContext);
  const { setSignUp } = useContext(UtilContext);
  const Navigate = useNavigate();

  const handleLogout = () => {
    logout();
    Navigate("/");
  };

  return (
    <>
      <nav className="flex top-0 bg-white z-50 left-0 justify-between fixed w-full border-b items-center px-6 py-4">
        <button onClick={() => Navigate("/")}>
          <h1 className="font-ubuntu text-2xl md:text-3xl text-green-600 font-bold">
            Quickwork
          </h1>
        </button>
        <div>
          <div className="flex gap-4 items-center  font-medium">
            {user ? (
              <>
                <span className="mr-4 text-green-600">{user.userName}</span>
                <button
                  onClick={handleLogout}
                  className="bg-green-600 hover:bg-transparent hover:border-green-600 hover:text-green-600 transition duration-300 ease-in-out outline-none focus:outline-none border-2 border-green-600 text-sm md:text-base text-white font-semibold md:font-bold py-2 px-4 rounded"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button onClick={() => Navigate("/Login")}>
                  <span className=" text-sm md:text-base hover:text-green-800">Login</span>
                </button>
                <button
                  onClick={() => {
                    Navigate("/Register");
                    setSignUp(null);
                  }}
                  className="bg-green-600 hover:bg-transparent text-sm md:text-base hover:border-green-600 hover:text-green-600 transition duration-300 ease-in-out outline-none focus:outline-none border-2 border-green-600 text-white font-bold py-2 px-4 rounded"
                >
                  Register
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
