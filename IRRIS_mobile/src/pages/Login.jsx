import React from "react";
import IRISLogo from "../assets/images/iris_logo.png";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-mainColor h-screen flex flex-col items-center space-y-28">
      <div className="flex flex-col items-center bg-red-400  pt-16">
        <img src={IRISLogo} />
      </div>

      <div className="flex flex-col w-4/5 space-y-10 ">
        <div className="text-center text-secondaryColor bg-red-400 mt-10 space-y-5 mb-16 w-11/12 ">
          <h1 className="text-3xl"> Welcome</h1>
          <p className="">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,asdasdasd
          </p>
        </div>

        <button>
          <Link
            to="/student"
            className="py-4 bg-secondaryColor rounded-lg text-mainColor font-semibold text-xl w-full inline-block"
          >
            Student
          </Link>
        </button>
        <button>
          <Link
            to="/personel"
            className="py-4 bg-secondaryColor rounded-lg text-mainColor font-semibold text-xl w-full inline-block"
          >
            Personel
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Login;
