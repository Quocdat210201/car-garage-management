import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { useEffect, useState } from "react";
import { userApi, updateUserApi } from "../../service/UserService";
import { toast } from "react-toastify";

import { Routes, Route } from "react-router-dom";

import MyProfile from "./myProfile";
import HistoryAppointment from "./historyAppointent";
import ChangePassword from "./changePassword";
import { selectDep, setDependence } from "../../store/reducers/depReducer";
import { useSelector, useDispatch } from "react-redux";

function Profile() {
  const [activeTab, setActiveTab] = useState("myprofile");
  const dep = useSelector(selectDep);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const [user, setUser] = useState([]);

  const [isEditMode, setIsEditMode] = useState(false);
  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const handleInputChange = (event, field) => {
    setUser({
      ...user,
      [field]: event.target.value,
    });
    console.log(user);
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

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(setDependence({}));
    navigate("/");
    toast.success("Đã đăng xuất!");
  };

  const handleUpdateUser = async () => {
    try {
      await updateUserApi(user);
      toast.success("Lưu thành công !");
      setIsEditMode(false); 
      getUser();
    } catch (error) {
      toast.error("Error updating user information");
      console.error(error);
    }
  };

  
  return (
    <div className="flex pr-24 pl-80 py-10 mx-auto mb-40">
      {/* Sidebar */}
      <div className="w-1/4 p-6 text-black">
        <h2 className="text-xl font-bold pb-2 border-b-[1px]">
          Xin chào {user.name}!
        </h2>
        <ul>
          <li className={`border-b-[1px] py-2`}>
            <Link
              className={` py-1 pl-2 ${
                activeTab === "myprofile" ? "active-tab" : ""
              }`}
              onClick={() => handleTabClick("myprofile")}>
              Tài khoản của tôi
            </Link>
          </li>
          <li className={`border-b-[1px] py-2`}>
            <Link
              className={` py-1 pl-2 ${
                activeTab === "appointments" ? "active-tab" : ""
              }`}
              onClick={() => handleTabClick("appointments")}>
              Lịch hẹn
            </Link>
          </li>
          <li className={`border-b-[1px] py-2`}>
            <Link
              className={` py-1 pl-2 ${
                activeTab === "changepassword" ? "active-tab" : ""
              }`}
              to=""
              onClick={() => handleTabClick("changepassword")}>
              Đổi mật khẩu
            </Link>
          </li>
          <li className=" pt-6 pl-3">
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white py-2 px-4 rounded">
              <LogoutIcon className="mr-2" />
              Đăng xuất
            </button>
          </li>
        </ul>
      </div>
      {/* Profile Content */}
      <div className="w-3/4">
        {activeTab === "myprofile" ? (
          <MyProfile
            data={user}
            onChange={handleInputChange}
            handleUpdateUser={handleUpdateUser}
          />
        ) : activeTab === "appointments" ? (
          <HistoryAppointment />
        ) : activeTab === "changepassword" ? (
          <ChangePassword />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default Profile;
