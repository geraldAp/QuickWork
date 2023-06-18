import React, {  useContext } from "react";
import { Details } from "../components/minidb/signUpDetails";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import { UtilContext } from "../context/utilContext";
const Register = () => {

  const {signUp, setSignUp} = useContext(UtilContext)

  return (
    <div className=" my-24 md:mt-14 md:h-screen w-[80%] m-auto flex justify-center items-center">
      <div className="w-[80%] m-auto p-5 md:p-10 border rounded-lg  md:h-[80%] ">
        <h1 className=" text-center   font-bold text-xl md:text-2xl ">
          Join as a Client or a Developer{" "}
        </h1>
        <div className="grid md:grid-cols-2 gap-7 mt-4 w-[90%] m-auto">
          {Details.map((detail) => (
            <button onClick={()=> setSignUp(detail.state)} key={detail.id} to={detail.src}>
              <div className="border rounded-lg md:h-40 p-4">
                <span className="flex justify-center md:justify-start">
                <img src={detail.img} className= " w-8  md:w-10" alt="" />

                </span>
                <p className=" mt-4 text-base md:text-lg font-medium">{detail.info}</p>
              </div>
            </button>
          ))}
        </div>
        <Button signUp={signUp} />
        <div className=" text-sm md:text-base text-center mt-8"><p> Already have an account? <Link className='text-blue-950' to='/Login'> Login</Link></p></div>
      </div>
    </div>
  );
};

export default Register;
