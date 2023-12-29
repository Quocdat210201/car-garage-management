import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { registerApi } from "../../service/UserService";
import { IoMdHome } from "react-icons/io";
import * as Types from "../../common/constants"
import { toast } from "react-toastify";


function Register() {
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const navigate = useNavigate();


//   const [user, setUser] = useState({
//     name: "",
//     phoneNumber: "",
//     dateOfBirth: "",
//     email: "",
//     address: "",
//   });

  const signUp = async () => {
    const role = Types.CUSTOMER_ROLE;
    const data = { name, email, password, confirmPassword, phoneNumber, role};
    try {
      await registerApi(data);
      toast.success("Đăng kí thành công!")
      navigate("/login")
    } catch (error) {error}
  };
  return (
    <>
      <div className="text-white h-[100vh] flex justify-center items-center bg-no-repeat bg-cover object-cover  relative">
        <div className="bg-[#072F48] min-w-[500px] min-h-[620px] flex flex-col items-center rounded-md p-8 relative">
        <div className="absolute left-3 top-3 w-9 h-9 flex items-center justify-center z-20 cursor-pointer rounded-full text-[1.8rem] text-[var(--white-color)]">
          <Link to="/">
            <IoMdHome className="hover:opacity-80"/>
          </Link>
        </div>
          <h1 className="text-[32px] uppercase font-semibold pt-5 pb-6">
            Đăng Ký
          </h1>
          <div className="mt-[1.25rem] w-full ">
            <input
              type="text"
              name="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Số điện thoại"
              className="block p-[1rem] rounded w-full border-none outline-none text-black font-normal text-[20px]"
            />
          </div>
          <div className="mt-[1.25rem] w-full ">
            <input
              type="text"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block p-[1rem] rounded w-full border-none outline-none text-black font-normal text-[20px]"
            />
          </div>
          <div className="mt-[1.25rem] w-full ">
            <input
              type="text"
              placeholder="Tên đăng nhập"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="block p-[1rem] rounded w-full border-none outline-none text-black font-normal text-[20px]"
            />
          </div>
          <div className="mt-[1.25rem] w-full relative">
            <input
              type="password"
              placeholder="Mật khẩu"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block p-[1rem] rounded w-full border-none outline-none text-black font-normal text-[20px]"
            />
            <FaRegEye className="absolute right-4 top-6 text-black cursor-pointer" />
          </div>
          <div className="mt-[1.25rem] w-full relative">
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Nhập lại mật khẩu"
              className="block p-[1rem] rounded w-full border-none outline-none text-black font-normal text-[20px]"
            />
            <FaRegEye className="absolute right-4 top-6 text-black cursor-pointer" />
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center bg-[#D90429] text-white text-[22px] p-3 font-medium rounded mt-10 hover:opacity-80"
            onClick={signUp}>
            Đăng ký
          </button>
          <div className="mt-3 w-full flex flex-row justify-center mb-16">
            <Link to="/login" className="block text-[#FFA800] ml-1.5">
              Đăng nhập
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
