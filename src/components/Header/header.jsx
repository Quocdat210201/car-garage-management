import { FaPhone, FaFacebookF, FaYoutube, FaTwitter } from "react-icons/fa";
import { IoMdMail, IoMdNotifications } from "react-icons/io";
import { Link, NavLink, useNavigate } from "react-router-dom";
import routerConfig from "../../config";
import { GoSearch } from "react-icons/go";
import { useState, useEffect, useRef } from "react";
import Login from "../../Layout/Login/login";
import * as React from "react";
import Notify from "../notify/notify";

import { loginApi, userApi } from "../../service/UserService";
import { toast } from "react-toastify";

import { selectDep, setDependence } from "../../store/reducers/depReducer";
import { useSelector, useDispatch } from "react-redux";

function Header() {
  const [user, setUser] = useState([]);
  const [notify, setNoify] = useState(false);
  const [modalUser, setmodalUser] = useState(false);
  const [modalLogin, setModalLogin] = useState(false);
  const [actions, setActions] = useState("login");

  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [isLogged, setIsLogged] = useState(false);
  const navigate = useNavigate();

  const dep = useSelector(selectDep);
  const dispatch = useDispatch();

  
  let menuRef = useRef();

  const showToastMessageError = () => {
    toast.error("Không tìm thấy tài khoản!", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const showToastMessageSuccess = () => {
    toast.success("Đăng nhập thành công!", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(setDependence({}))
    navigate("/");
    toast.success("Đã đăng xuất!");
  };

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const { data } = await userApi();
      setUser(data);
    } catch {
      console.error();
    }
  };

  
  
  useEffect(() => {
    const isLogged = localStorage.getItem('token');

    if (isLogged) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  }, [dep]);

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
  }, []);

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
          <div
            className="mr-4 pr-1 text-[30px] relative"
            onClick={() => setNoify((prev) => !prev)}>
            <IoMdNotifications className="hover:text-[#767676] cursor-pointer" />
            <span className="absolute w-4 h-4 bg-red-600 text-[10px] text-white font-medium top-0 right-0.5 rounded-full flex justify-center items-center">
              1
            </span>
            {/* <Notify/> */}
            {notify ? <Notify /> : <div></div>}
          </div>
          <div className="relative">
            {isLogged ? (
              <img
                src="https://www.shareicon.net/data/512x512/2016/05/24/770117_people_512x512.png"
                alt=""
                className="w-10 h-10 rounded-full object-cover cursor-pointer"
                onClick={() => setmodalUser((prev) => !prev)}
              />
            ) : (
              <Link to={routerConfig.login}>
                <button className="relative w-24 bg-red-600 text-white px-1 py-1.5 text-[16px] rounded-lg font-medium text-center hover:opacity-80">
                  Đăng nhập
                </button>
              </Link>
            )}
          </div>
          <div
            className={`menu-user absolute bg-[#7c7c7c] max-w-md h-60 top-16 right-20 z-50 text-white rounded ${
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
                <span className="font-medium">{user.name}</span>
                <br></br>
                <span>{user.email}</span>
              </div>
            </div>
            <ul className="list pt-3">
              <li className="py-2.5 px-3 hover:bg-[#989898] hover:cursor-pointer">
                <Link to={routerConfig.profile}>Thông tin cá nhân</Link>
              </li>
              <li className="py-2.5 px-3 hover:bg-[#989898] hover:cursor-pointer">
                Lịch sử
              </li>
              <li
                className="py-2.5 px-3 hover:bg-[#989898] hover:cursor-pointer"
                onClick={handleLogout}>
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
    </div>
  );
}

export default Header;
