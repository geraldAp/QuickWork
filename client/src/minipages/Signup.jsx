import { useState, useContext, useEffect } from "react";
import { useSignUp } from "../hooks/UseSignup";
import { UtilContext } from "../context/utilContext";

const SignUp = () => {
  const { signUp: type, setSignUp: setType } = useContext(UtilContext);
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useSignUp();

// to prevent the component from fooling when reloaded 
useEffect(()=>{
setType("admin")
},[])



  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(username, email, password, type);
  };

  return (
    <section className="mt-24">
         {/* form type getter/Setter basically the type of form that would appear to you */}
     
     <div className=" text-right mr-7 mb-4 ">
     <p className={` text-sm ${type === "admin" ? "block" : "hidden"}`}>
        Looking for Gigs?{" "}
        <span onClick={()=> setType('developer')} className="text-blue-800 underline cursor-pointer ">
          Register as Developer
        </span>{" "}
      </p>
      <p className={`text-sm ${type === "developer" ? "block" : "hidden"}`}>
        Looking to get developers on your project?{" "}
        <span onClick={()=> setType('admin')}  className="text-blue-800 underline cursor-pointer  ">
          Register as Client
        </span>
      </p>

     </div>
   
      <div className=" flex justify-center">
        <form
          className="w-2/5 p-4 shadow-sm border rounded-md"
          onSubmit={handleSubmit}
        >
       {/* manipulated form heading depending on type  */}
          {type === "admin" ? (
            <h3 className="text-center text-gray-500 mb-4">Client Sign Up</h3>
          ) : (
            <h3 className="text-center text-gray-500 mb-4">
              Developer Sign Up
            </h3>
          )}
          <div>
            {/* UserName */}
            <label className="text-gray-500 mb-1">UserName</label>
            <input
              type="text"
              onChange={(e) => setUserName(e.target.value)}
              value={username}
              className="w-full outline-none border h-9 rounded-md p-2"
            />
            {/* Email */}
            <label className="text-gray-500 mt-4 mb-1">Email address:</label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="w-full outline-none border h-9 rounded-md p-2"
            />
            {/* Password */}
            <label className="text-gray-500 mt-4 mb-1">Password</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="w-full outline-none border h-9 rounded-md p-2"
            />
            {/* submit button */}
            <button
              disabled={isLoading}
              className="bg-green-600 hover:bg-transparent hover:border-green-600 hover:text-green-600 transition duration-300 ease-in-out outline-none focus:outline-none border-2 border-green-600 text-white font-bold py-2 px-4 rounded mt-4"
            >
              <span
                className={` text-sm ${type === "admin" ? "block" : "hidden"}`}
              >
                Sign up as Client
              </span>
              <span
                className={` text-sm ${
                  type === "developer" ? "block" : "hidden"
                }`}
              >
                Sign up as Developer
              </span>
            </button>
            {error && <div className="text-red-600 mt-4">{error}</div>}
          </div>
        </form>
      </div>
    </section>
  );
};

export default SignUp;
