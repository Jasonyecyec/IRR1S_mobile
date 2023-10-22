import React from 'react'
import PersonelIcon from "../assets/images/personel_login_icon.png";
import LoginLogo from "../components/LoginLogo";
import { Link } from "react-router-dom";


const PersonelLogin = () => {
  return (
    <div className="flex flex-col items-center">
       <LoginLogo icon={PersonelIcon} text="Login as a Personel"/>

      <div className="flex flex-col w-8/12 mt-16 space-y-8">
        <input
          placeholder="Email"
          className="border border-mainColor rounded-md p-3"
        />
        <input
          placeholder="Password"
          type="password"
          className="border border-mainColor rounded-md p-3"
        />
         <button >
          <Link to='/home' className="bg-mainColor text py-4 rounded-md font-semibold text-secondaryColor w-full inline-block">LOGIN</Link>

        </button>
      </div>
    </div>
  )
}

export default PersonelLogin