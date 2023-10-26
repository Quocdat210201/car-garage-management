import * as React from "react";
import { Link } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
function Login() {
  return (
    <>
      <div
        className="text-white h-[100vh] flex justify-center items-center bg-no-repeat bg-cover object-cover"
        style={{
          backgroundImage: "url('../src/assets/images/bg-login.png')",
        }}>
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
            <Link to="/register" className="block text-[#FFA800] ml-1.5">
              Đăng ký
            </Link>
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
    </>
  );
}

export default Login;
