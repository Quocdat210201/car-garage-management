import * as React from "react";
import { Link, NavLink } from "react-router-dom";
import routerConfig from "../../config";
import fbLogo from "../../assets/images/fb-logo.webp";

import { FaEdit } from "react-icons/fa";
import { MdOutlineCalendarMonth } from "react-icons/md";

import { useEffect, useState } from "react";
import { loginApi, userApi, updateUserApi } from "../../service/UserService";
import { toast } from "react-toastify";
import SidebarProfile from './sidebar'

function Profile() {
  const [user, setUser] = useState({
    name: "",
    phoneNumber: "",
    dateOfBirth: "",
    email: "",
    address: "",
  });

  const [isEditMode, setIsEditMode] = useState(false);
  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const handleInputChange = (event, field) => {
    setUser({
      ...user,
      [field]: event.target.value,
    });
  };
  const [disable, setDisable] = useState(false);
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

  const handleUpdateUser = async () => {
    try {
      await updateUserApi(user);
      toast.success("Lưu thành công !");
      setTimeout(() => {
        setIsEditMode(false); // Set edit mode to false after saving
      }, 0);
    } catch (error) {
      toast.error("Error updating user information");
      console.error(error);
    }
  };
  return (
    <div>
      <div className="area-bg__inner">
        <div
          className="w-full h-[170px] bg-[#0000004d]"
          style={{
            backgroundImage: "url('../../src/assets/images/bg-menu.jpg')",
          }}>
          <div className=" flex justify-center h-full w-full">
            <div className="b-title-page__wrap text-white">
              <h1 className="b-title-page">THÔNG TIN CÁ NHÂN</h1>
              <div className="breadcrumb">
                <li className="breadcrumb-item text-[#d01818]">
                  <Link href="" to={routerConfig.home}>
                    Trang chủ{" "}
                  </Link>
                </li>
                <li className="breadcrumb-item flex items-center">
                  <Link href="">Cá nhân</Link>
                </li>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <SidebarProfile/> */}
      <div className="flex justify-between mt-6 mb-10 px-40">
        <div className="w-1/3 py-10">
          <div className="w-full flex flex-col justify-center items-center relative">
            <img
              src="https://www.shareicon.net/data/512x512/2016/05/24/770117_people_512x512.png"
              alt=""
              className="w-[200px] h-[200px] object-cover"
            />
            <button className="absolute right-[184px] top-[160px] bg-[#686767] w-10 h-10 flex justify-center items-center rounded-full">
              <FaEdit className="text-[26px] text-[#fff] p-1" />
            </button>
            <h1 className="text-[20px] p-2">
              <span>{user.name}</span>
            </h1>
          </div>
          <div className="flex w-full justify-center items-center mt-6">
            <img
              className="w-10 h-10 object-cover mr-4"
              src={fbLogo}
              alt="fb"
            />
            <img className="w-10 h-10 object-cover" src={fbLogo} alt="ins" />
          </div>
        </div>
        <div className="w-2/3 bg-[#F3F3F3] ml-6 rounded px-10 py-10 h-[660px]">
          <form action="">
            <div className="flex items-center mb-6 text-black">
              <label className="custom-text">Họ và tên</label>
              <input
                type="text"
                placeholder="Họ và tên"
                value={user.name}
                onChange={(event) => handleInputChange(event, "name")}
                className={`custom-input-profile ${
                  isEditMode ? "" : "opacity-70"
                }`}
                disabled={!isEditMode}
              />
            </div>
            <div className="flex items-center mb-6 text-black">
              <label className="custom-text">Số điện thoại</label>
              <input
                type="text"
                placeholder="Số điện thoại"
                value={user.phoneNumber}
                onChange={(event) => handleInputChange(event, "phoneNumber")}
                className={`custom-input-profile ${
                  isEditMode ? "" : "opacity-70"
                }`}
                disabled={!isEditMode}
              />
            </div>
            <div className="flex items-center mb-6 text-black relative">
              <label className="custom-text">Ngày sinh</label>
              <input
                type="date"
                placeholder="Ngày sinh"
                value={user.dateOfBirth}
                onChange={(event) => handleInputChange(event, "dateOfBirth")}
                className={`custom-input-profile ${
                  isEditMode ? "" : "opacity-70"
                }`}
                disabled={!isEditMode}
              />
            </div>
            <div className="flex items-center mb-6 text-black">
              <label className="custom-text">Email</label>
              <input
                type="text"
                placeholder="Email"
                value={user.email}
                onChange={(event) => handleInputChange(event, "email")}
                className={`custom-input-profile ${
                  isEditMode ? "" : "opacity-70"
                }`}
                disabled={!isEditMode}
              />
            </div>
            <div className="flex items-center mb-6 text-black">
              <label className="custom-text">Địa chỉ</label>
              <input
                type="text"
                placeholder="Địa chỉ"
                value={user.address}
                onChange={(event) => handleInputChange(event, "address")}
                className={`custom-input-profile ${
                  isEditMode ? "" : "opacity-70"
                }`}
                disabled={!isEditMode}
              />
            </div>
          </form>
          <div className="action flex justify-end mt-20">
            {isEditMode && (
              <>
                <button
                  className="btn btn-primary mr-4"
                  onClick={handleUpdateUser}>
                  Save Changes
                </button>
                <button className="btn btn-primary" onClick={toggleEditMode}>
                  Cancel
                </button>
              </>
            )}
            {!isEditMode && (
              <button className="btn btn-primary" onClick={toggleEditMode}>
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
