import { FaPhone, FaFacebookF, FaYoutube, FaTwitter } from "react-icons/fa";
import { IoMdMail, IoMdNotifications } from "react-icons/io";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import routerConfig from "../../config";
import { GoSearch } from "react-icons/go";
import { useState, useEffect, useRef } from "react";
import * as React from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";

import { loginApi, userApi, registerApi } from "../../service/UserService";
import { toast } from "react-toastify";
import { setDependence } from "../../store/reducers/depReducer";

function Login() {
  const [user, setUser] = useState([]);
  const [notify, setNoify] = useState(false);
  const [modalUser, setmodalUser] = useState(false);
  const [modalLogin, setModalLogin] = useState(false);
  const [actions, setActions] = useState("login");

  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();

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
  const handleLogin = async () => {
    if (!phoneNumber || !password) {
      return;
    }

    let res = await loginApi(phoneNumber, password);
    if (res.statusCode === 400) {
      showToastMessageError();
    } else if (res.data && res.data.access_token) {
      localStorage.setItem("token", res.data.access_token);
      localStorage.setItem("roles", res.data.roles);
      const roles = localStorage.getItem("roles");
      setModalLogin(false);
      showToastMessageSuccess();
      dispatch(setDependence({}));
      navigate("/")

      if (roles === "Gara Administrator") {
        navigate("/admin");
        window.location.reload();
      }
    }
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

  return (
    <div className="text-white h-[100vh] flex justify-center items-center bg-no-repeat bg-cover object-cover relative">
      <div className="bg-[#072F48] min-w-[500px] min-h-[620px] flex flex-col items-center rounded-md p-8 relative">
        <div className="absolute left-3 top-3 w-9 h-9 flex items-center justify-center z-20 cursor-pointer rounded-full text-[1.8rem] text-[var(--white-color)]">
          <Link to="/">
            <IoMdHome className="hover:opacity-80" />
          </Link>
        </div>
        <h1 className="text-[32px] uppercase font-semibold pt-5 pb-6">
          Đăng Nhập
        </h1>
        <div className="mt-[1.25rem] w-full ">
          <input
            type="text"
            placeholder="Số điện thoại"
            value={phoneNumber}
            onChange={(event) => setPhoneNumber(event.target.value)}
            className="block p-[1rem] rounded w-full border-none outline-none text-black font-normal text-[20px]"
          />
        </div>
        <div className="mt-[1.25rem] w-full relative">
          <input
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="block p-[1rem] rounded w-full border-none outline-none text-black font-normal text-[20px]"
          />
          <FaRegEye className="absolute right-4 top-6 text-black cursor-pointer" />
        </div>

        <button
          className="w-full flex items-center justify-center bg-[#D90429] text-white text-[22px] p-3 font-medium rounded mt-10 hover:opacity-80 cursor-pointer"
          type="submit"
          onClick={handleLogin}>
          Đăng nhập
        </button>
        <div className="mt-3 w-full flex flex-row justify-center">
          <span>Nếu bạn chưa có tài khoản</span>
          <Link to={routerConfig.register}>
            <button className="block text-[#FFA800] ml-1.5">Đăng ký</button>
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
  );
}

export default Login;
