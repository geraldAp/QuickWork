import React, { useContext, useState } from "react";
import { useLogin } from "../hooks/UseLogin";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Navigate } from "react-router-dom";

const Login = () => {
  const Navigate = useNavigate()
  const { user } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);

    const renderRedirect = () => {
      if (user) {
        if (user.role === "admin") {
        Navigate("/DevPage")
        } else if (user.role === "developer") {
          Navigate("/ClientPage")
        }
      }
    };

    renderRedirect()

  };
 

  return (
    <div className="mt-40 flex justify-center">
     
      <form
        className=" w-4/5 md:w-2/5 p-4 shadow-sm border rounded-md"
        onSubmit={handleSubmit}
      >
        <h3 className="text-center text-gray-500 mb-4">Log In</h3>
        <div>
          <label className="text-gray-500">Email address:</label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="w-full outline-none border h-9 rounded-md p-2"
          />
          <label className="text-gray-500 mt-4">Password:</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="w-full outline-none border h-9 rounded-md p-2"
          />
        </div>
        {/* Login Button */}
        <div className=" w-full flex justify-center">
          <button
            disabled={isLoading}
            className=" w-[80%]  bg-green-600 hover:bg-transparent hover:border-green-600 hover:text-green-600 transition duration-300 ease-in-out outline-none focus:outline-none border-2 border-green-600 text-white font-bold py-2 px-4 rounded mt-4"
          >
            Log in
          </button>
        </div>
        {error && <div className="text-red-600 mt-4">{error}</div>}
      </form>
    </div>
  );
};

export default Login;
