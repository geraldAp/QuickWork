import React from "react";

const Home = () => {
  return (
    <div className="w-[80%] mt-16 m-auto flex items-center gap-5 justify-center h-screen">
      <div className=" w-full grid grid-cols-2 items-center place-items-center  justify-around">
        <div className="">
          <p className=" Capitalize tracking-wider font-semibold text-green-600 text-[2rem]  ">
            The Best Devloper. <br />
            And client experience. <br />
            All in one place
          </p>
          <p className="text-gray-600 mt-2 text-lg font-medium">
            stop looking you can get the best from here
          </p>
          <button className=" text-left mt-3  hover:text-green-800 py-2 px-4 hover:outline-2 hover:outline-green-800 hover:outline hover:bg-transparent transition-all duration-300 rounded-full bg-green-600 ">Get started </button>
        </div>
       <img className="w-[75%] m-auto rounded-[100%]" src="/img/upwork.jpeg" alt="" />
      </div>
    </div>
  );
};

export default Home;
