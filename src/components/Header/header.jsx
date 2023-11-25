import { FaPhone, FaFacebookF, FaYoutube, FaTwitter } from "react-icons/fa";
import { IoMdMail, IoMdNotifications } from "react-icons/io";
import { Link, NavLink } from "react-router-dom";
import routerConfig from "../../config";
import { GoSearch } from "react-icons/go";
import { useState, useEffect, useRef } from "react";
import Login from "../../Layout/Login/login";
import * as React from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";

function Header() {
  const [user, setUser] = useState(false);
  const [modalUser, setmodalUser] = useState(false);
  const [modalLogin, setModalLogin] = useState(false);
  const [actions, setActions] = useState("login");

  let menuRef = useRef();
  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setmodalUser(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <div className="relative">
      <div className="header">
        <div className="header-top w-full h-14 bg-[#3E3E3E] flex justify-end items-center text-[#a8a8a8] px-24">
          <div className="flex mr-16">
            <FaPhone className="pt-[3px] text-[22px]" />
            <span className="block ml-2 text-[16px]">+84 123 456 789</span>
          </div>
          <div className="flex mr-16">
            <IoMdMail className="pt-[3px] text-[22px]" />
            <span className="block ml-2 text-[16px]">
              garamientrung@gmail.com
            </span>
          </div>
          <div className="flex mr-16 text-[24px] w-24 justify-between">
            <FaYoutube className="hover:text-[#767676] cursor-pointer" />
            <FaTwitter className="hover:text-[#767676] cursor-pointer" />
            <FaFacebookF className="hover:text-[#767676] cursor-pointer" />
          </div>
          <div className="mr-4 pr-1 text-[30px] relative">
            <IoMdNotifications className="hover:text-[#767676] cursor-pointer" />
            <span className="absolute w-4 h-4 bg-red-600 text-[10px] text-white font-medium top-0 right-0.5 rounded-full flex justify-center items-center">
              1
            </span>
          </div>
          <div className="relative">
            {user ? (
              <img
                src="https://www.shareicon.net/data/512x512/2016/05/24/770117_people_512x512.png"
                alt=""
                className="w-10 h-10 rounded-full object-cover cursor-pointer"
                onClick={() => setmodalUser((prev) => !prev)}
              />
            ) : (
              <Link>
                <button
                  className="relative w-24 bg-red-600 text-white px-1 py-1.5 text-[16px] rounded-lg font-medium text-center hover:opacity-80"
                  onClick={() => setModalLogin((prev) => !prev)}>
                  Đăng nhập
                </button>
              </Link>
            )}
          </div>
          <div
            className={`menu-user absolute bg-[#7c7c7c] w-60 h-60 top-16 right-20 z-50 text-white rounded ${
              modalUser ? "menu-active" : "menu-inactive"
            }`}
            ref={menuRef}>
            <div className="flex justify-start items-center mx-3 py-4 border-bottom">
              <a href="">
                <img
                  src="https://www.shareicon.net/data/512x512/2016/05/24/770117_people_512x512.png"
                  alt=""
                  className="w-14 h-14 rounded-full object-cover cursor-pointer"
                />
              </a>
              <div className="pl-4">
                <span className="font-medium">Dat Phan</span>
                <br></br>
                <span>@datphan212</span>
              </div>
            </div>
            <ul className="list pt-3">
              <li className="py-2.5 px-3 hover:bg-[#989898] hover:cursor-pointer">
                <Link to={routerConfig.profile}>Thông tin cá nhân</Link>
              </li>
              <li className="py-2.5 px-3 hover:bg-[#989898] hover:cursor-pointer">
                Lịch sử
              </li>
              <li className="py-2.5 px-3 hover:bg-[#989898] hover:cursor-pointer">
                Đăng xuất
              </li>
            </ul>
          </div>
        </div>
        <div
          className="navbar w-full h-28 bg-[#000000d9] opacity-80 justify-between flex items-center text-[#a8a8a8] px-20 bg-no-repeat bg-cover"
          style={{
            backgroundImage: "url('../../src/assets/images/image 1.png')",
          }}>
          <div className="navbar flex items-center">
            <div className="logo">
              <Link to={routerConfig.home}>
                <img src="../../../src/assets/images/image 2.png" alt="" />
              </Link>
            </div>
            <div className="navbar_list ml-10">
              <ul className="flex text-[#e5e5e5]">
                <li className="text-[24px] font-normal cursor-pointer menu-items transition">
                  <NavLink
                    to={routerConfig.home}
                    className={`${({ isActive }) =>
                      isActive
                        ? "active"
                        : null} ml-16 flex items-center h-full relative text-[#b3b3b3] transition-colors`}>
                    Trang chủ
                  </NavLink>
                </li>
                <li className="text-[24px] font-normal cursor-pointer menu-items transition">
                  <NavLink
                    to={routerConfig.aboutUs}
                    className={`${({ isActive }) =>
                      isActive
                        ? "active"
                        : null} ml-16 flex items-center h-full relative text-[#b3b3b3] transition-colors`}>
                    Giới thiệu
                  </NavLink>
                </li>
                <li className="text-[24px] font-normal cursor-pointer menu-items transition">
                  <NavLink
                    to={routerConfig.services}
                    className={`${({ isActive }) =>
                      isActive
                        ? "active"
                        : null} ml-16 flex items-center h-full relative text-[#b3b3b3] transition-colors`}>
                    Dịch vụ
                  </NavLink>
                </li>
                <li className="text-[24px] font-normal cursor-pointer menu-items transition">
                  <NavLink
                    to={routerConfig.appointment}
                    className={`${({ isActive }) =>
                      isActive
                        ? "active"
                        : null} ml-16 flex items-center h-full relative text-[#b3b3b3] transition-colors`}>
                    Đặt lịch hẹn
                  </NavLink>
                </li>
                {/* <li className="text-[24px] font-normal cursor-pointer menu-items transition">
                  <NavLink
                    to={routerConfig.contact}
                    className={`${({ isActive }) =>
                      isActive
                        ? "active"
                        : null} ml-16 flex items-center h-full relative text-[#b3b3b3] transition-colors`}>
                    Liên hệ
                  </NavLink>
                </li> */}
              </ul>
            </div>
          </div>
          <div className="search ">
            <div className="text-[var(--white-color)] flex justify-end items-center">
              <input
                type="text"
                placeholder="Tìm kiếm dịch vụ..."
                className="input-search"
                // onChange={onchange}
              />
              <GoSearch className="w-5 h-5 cursor-pointer text-[var(--white-color)] search-icon" />
            </div>
          </div>
        </div>
      </div>
      <div className="">
        {modalLogin ? (
          <div className="fixed top-0 left-0 right-0 bottom-0 z-50 bg-[rgba(0,0,0,0.65)] items-center justify-center transition-opacity ${showModal ? 'flex' : 'hidden'}`">
            {actions === "login" ? (
              <div className="text-white h-[100vh] flex justify-center items-center bg-no-repeat bg-cover object-cover relative">
                <div className="bg-[#072F48] min-w-[500px] min-h-[620px] flex flex-col items-center rounded-md p-8 relative">
                  <div
                    className="absolute right-3 top-3 w-9 h-9 flex items-center justify-center z-20 bg-[#181818] cursor-pointer rounded-full text-[2.4rem] text-[var(--white-color)]"
                    onClick={() => setModalLogin((prev) => !prev)}>
                    <IoIosClose className="hover:opacity-80" />
                  </div>
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
            ) : (
              <div className="text-white h-[100vh] flex justify-center items-center bg-no-repeat bg-cover object-cover">
                <div className="bg-[#072F48] min-w-[500px] min-h-[620px] flex flex-col items-center rounded-md p-8 relative">
                  <div
                    className="absolute right-3 top-3 w-9 h-9 flex items-center justify-center z-20 bg-[#181818] cursor-pointer rounded-full text-[2.4rem] text-[var(--white-color)]"
                    onClick={() => setModalLogin((prev) => !prev)}>
                    <IoIosClose className="hover:opacity-80" />
                  </div>
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
                    <FaRegEye className="absolute right-4 top-6 text-black cursor-pointer" />
                  </div>
                  <div className="mt-5 w-full relative">
                    <input
                      type="password"
                      placeholder="Nhập lại mật khẩu"
                      className="block p-4 rounded w-full border-none outline-none text-black font-normal text-[20px]"
                    />
                    <FaRegEye className="absolute right-4 top-6 text-black cursor-pointer" />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center bg-[#D90429] text-white text-[22px] p-3 font-medium rounded mt-10 hover:opacity-80">
                    Đăng ký
                  </button>
                  <div className="mt-3 w-full flex flex-row justify-center mb-16">
                    <button
                      className="block text-[#FFA800] ml-1.5"
                      onClick={() => setActions("login")}>
                      Đăng nhập
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default Header;
