import React from "react";
import IRISLogo from "../assets/images/iris_logo.png";
import { useNavigate, Link } from "react-router-dom";
import "../assets/css/login.css"

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className=" h-screen w-screen flex flex-col items-center">
      <div className="flex justify-center items-center w-full h-[35%]">
        <img src={IRISLogo} />
      </div>

      <div className="flex  flex-col bg-secondaryColor space-y-10 w-full h-[65%] pt-16 px-12 curve">
        {/* <div className="text-center text-secondaryColor mt-10 space-y-5 mb-16 w-11/12 ">
          <h1 className="text-3xl text-mainColor"> Welcome</h1>
          <p className="text-mainColor">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,asdasdasd
          </p>
        </div> */}
        <input
          placeholder="Email"
          className="border border-mainColor rounded-md p-3"
        />
        <input
          placeholder="Password"
          type="password"
          className="border border-mainColor rounded-md p-3"
        />

        <button>
          <Link
            to="/home"
            className="py-4 bg-mainColor rounded-lg text-white font-semibold text-xl w-full inline-block"
          >
            Student
          </Link>
        </button>
        {/* <button>
          <Link
            to="/personel"
            className="py-4 bg-mainColor rounded-lg text-white font-semibold text-xl w-full inline-block"
          >
            Personel
          </Link>
        </button> */}
      </div>
    </div>
  );
};

export default Login;
