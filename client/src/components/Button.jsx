import React from "react";
import { Link } from "react-router-dom";

const Button = ({ signUp }) => {
  return (
    <div className="text-center mt-6">
      <Link to='/Register/SignUp'>
        {signUp === null ? (
          <button
            className="rounded-full text-sm md:text-base  bg-gray-200 cursor-not-allowed text-gray-600 px-8 md:px-20 py-2"
            disabled={true}
          >
            Register
          </button>
        ) : signUp === "admin" ? (
          <button className="rounded-full text-xs md:text-base bg-green-600 text-white px-3 md:px-16  hover:opacity-70  py-2">
            Register as client
          </button>
        ) : (
          <button className="rounded-full text-xs md:text-base bg-green-600 text-white px-3 md:px-16 hover:opacity-70 py-2">
            Register as Developer{" "}
          </button>
        )}
      </Link>
    </div>
  );
};

export default Button;
