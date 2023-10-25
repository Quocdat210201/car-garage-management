import * as React from "react";
import { Link } from "react-router-dom";
import {FaRegEye, FaRegEyeSlash} from 'react-icons/fa'
function Register() {
  return (
    <>
      <div className="bg-[#072F48] min-w-[500px] min-h-[620px] flex flex-col items-center rounded-md p-8">
        <h1 className="text-[32px] uppercase font-semibold pt-5 pb-6">
          Đăng Ký
        </h1>
        <div className="mt-5 w-full ">
          <input
            type="text"
            placeholder="Số điện thoại"
            className="block p-4 rounded w-full border-none outline-none text-black font-normal text-[20px]"
          />
        </div>
        <div className="mt-5 w-full ">
          <input
            type="text"
            placeholder="Email"
            className="block p-4 rounded w-full border-none outline-none text-black font-normal text-[20px]"
          />
        </div>
        <div className="mt-5 w-full relative">
          <input
            type="password"
            placeholder="Mật khẩu"
            className="block p-4 rounded w-full border-none outline-none text-black font-normal text-[20px]"
          />
          <FaRegEye className="absolute right-4 top-6 text-black cursor-pointer"/>
        </div>
        <div className="mt-5 w-full relative">
          <input
            type="password"
            placeholder="Nhập lại mật khẩu"
            className="block p-4 rounded w-full border-none outline-none text-black font-normal text-[20px]"
          />
          <FaRegEye className="absolute right-4 top-6 text-black cursor-pointer"/>
        </div>
        
        <button
          type="submit"
          className="w-full flex items-center justify-center bg-[#D90429] text-white text-[22px] p-3 font-medium rounded mt-10 hover:opacity-80">
          Đăng ký
        </button>
        <div className="mt-3 w-full flex flex-row justify-center mb-16">
          <Link to="/login" className="block text-[#FFA800] ml-1.5">
            Đăng nhập
          </Link>
        </div>
      </div>
    </>
  );
}

export default Register;
