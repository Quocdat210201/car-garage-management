import { FaPhone, FaFacebookF, FaYoutube, FaTwitter } from "react-icons/fa";
import { IoMdMail, IoMdNotifications } from "react-icons/io";
import { Link, NavLink } from "react-router-dom";
import routerConfig from "../../config";
import { GoSearch } from "react-icons/go";
import { useState } from "react";

function Header() {
  const [user, setUser] = useState(false);
  return (
    <>
      <div className="header">
        <div className="header-top w-full h-14 bg-[#3E3E3E] flex justify-end items-center text-[#a8a8a8] px-16">
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
            <FaYoutube className="hover:opacity-70 cursor-pointer" />
            <FaTwitter className="hover:opacity-70 cursor-pointer" />
            <FaFacebookF className="hover:opacity-70 cursor-pointer" />
          </div>
          <div className="mr-4 pr-1 text-[30px] relative">
            <IoMdNotifications />
            <span className="absolute w-4 h-4 bg-red-600 text-[10px] text-white font-medium top-0 right-0.5 rounded-full flex justify-center items-center">
              1
            </span>
          </div>
          <div className="">
            {user ? (
              <img
                src="https://scontent.fhan14-1.fna.fbcdn.net/v/t39.30808-6/300580997_379131041059355_962345080393080109_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=5f2048&_nc_ohc=eG0jtaIzu0kAX9ryslN&_nc_ht=scontent.fhan14-1.fna&oh=00_AfBs4fft8d9UJYZS0fBwk37ZqAq35pFVH5oYvNhDo0vSuA&oe=653E2E3A"
                alt=""
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <Link to={routerConfig.login}>
                <button className="relative w-24 bg-red-600 text-white px-1 py-1.5 text-[16px] rounded-lg font-medium text-center hover:opacity-80">
                  Đăng nhập
                </button>
              </Link>
            )}
          </div>
        </div>
        <div
          className="navbar w-full h-28 bg-[#000000d9] opacity-80 justify-between flex items-center text-[#a8a8a8] px-12 bg-no-repeat bg-cover"
          style={{
            backgroundImage: "url('../../src/assets/images/image 1.png')",
          }}>
          <div className="navbar flex items-center">
            <div className="logo">
              <Link to={routerConfig.home}>
                <img src="../../../src/assets/images/image 2.png" alt="" />
              </Link>
            </div>
            <div className="navbar_list ">
              <ul className="flex text-[#e5e5e5]">
                <li className="text-[21px] font-normal cursor-pointer menu-items transition">
                  <NavLink
                    to={routerConfig.home}
                    className={`${({ isActive }) =>
                      isActive
                        ? "active"
                        : null} ml-16 flex items-center h-full relative text-[#b3b3b3] transition-colors`}>
                    Trang chủ
                  </NavLink>
                </li>
                <li className="text-[21px] font-normal cursor-pointer menu-items transition">
                  <NavLink
                    to={routerConfig.aboutUs}
                    className={`${({ isActive }) =>
                      isActive
                        ? "active"
                        : null} ml-16 flex items-center h-full relative text-[#b3b3b3] transition-colors`}>
                    Giới thiệu
                  </NavLink>
                </li>
                <li className="text-[21px] font-normal cursor-pointer menu-items transition">
                  <NavLink
                    to={routerConfig.services}
                    className={`${({ isActive }) =>
                      isActive
                        ? "active"
                        : null} ml-16 flex items-center h-full relative text-[#b3b3b3] transition-colors`}>
                    Dịch vụ
                  </NavLink>
                </li>
                <li className="text-[21px] font-normal cursor-pointer menu-items transition">
                  <NavLink
                    to={routerConfig.appointment}
                    className={`${({ isActive }) =>
                      isActive
                        ? "active"
                        : null} ml-16 flex items-center h-full relative text-[#b3b3b3] transition-colors`}>
                    Đặt lịch hẹn
                  </NavLink>
                </li>
                <li className="text-[21px] font-normal cursor-pointer menu-items transition">
                  <NavLink
                    to={routerConfig.contact}
                    className={`${({ isActive }) =>
                      isActive
                        ? "active"
                        : null} ml-16 flex items-center h-full relative text-[#b3b3b3] transition-colors`}>
                    Liên hệ
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
          <div className="search">
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
    </>
  );
}

export default Header;
