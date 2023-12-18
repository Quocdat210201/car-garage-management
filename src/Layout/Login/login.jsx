import * as React from "react";
import { useState } from "react";
import { Link, useActionData } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
function Login() {
  const [actions, setActions] = useState("login");
  return (
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 z-50 bg-[rgba(0,0,0,0.65)] items-center justify-center transition-opacity ${showModal ? 'flex' : 'hidden'}`">
        <div className="text-white h-[100vh] flex justify-center items-center bg-no-repeat bg-cover object-cover relative">
          <div className="absolute right-3 top-3 w-9 h-9 flex items-center justify-center z-20 bg-[#181818] cursor-pointer rounded-full text-[2.4rem] text-[var(--white-color)]">
            <IoIosClose />
          </div>
          <div className="bg-[#072F48] min-w-[500px] min-h-[620px] flex flex-col items-center rounded-md p-8">
            <h1 className="text-[32px] uppercase font-semibold pt-5 pb-6">
              Đăng Nhập
            </h1>
            <div className="mt-5 w-full ">
              <input
                type="text"
                placeholder="Số điện thoại"
                className="block p-4 rounded w-full border-none outline-none text-black font-normal text-[20px]"
              />
              {/* <label htmlFor="">Số điện thoại</label> */}
            </div>
            <div className="mt-5 w-full relative">
              <input
                type="password"
                placeholder="Mật khẩu"
                className="block p-4 rounded w-full border-none outline-none text-black font-normal text-[20px]"
              />
              <FaRegEye className="absolute right-4 top-6 text-black cursor-pointer" />
              {/* <label htmlFor="">Số điện thoại</label> */}
            </div>

            {/* <div className="mt-4 wi">
          <input type="number" placeholder="Mật khẩu" className="p-4 rounded "/>
          <label htmlFor="">Mật khẩu</label>
        </div> */}
            <button
              type="submit"
              className="w-full flex items-center justify-center bg-[#D90429] text-white text-[22px] p-3 font-medium rounded mt-10 hover:opacity-80">
              Đăng nhập
            </button>
            <div className="mt-3 w-full flex flex-row justify-center">
              <span>Nếu bạn chưa có tài khoản</span>
              <button
                className="block text-[#FFA800] ml-1.5"
                onClick={() => setActions("register")}>
                Đăng ký
              </button>
            </div>
            <div className="flex items-center justify-center mt-8">
              <div className="w-10 h-10 mx-2 cursor-pointer">
                <img src="../../src/assets/images/gg-logo.png" alt="" />
              </div>
              <div className="w-10 h-10 mx-2 cursor-pointer">
                <img src="../../src/assets/images/fb-logo.webp" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
