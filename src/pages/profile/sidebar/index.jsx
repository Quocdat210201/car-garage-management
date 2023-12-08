import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, Typography, useTheme, Button } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../../theme";
import PersonIcon from "@mui/icons-material/Person";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LockIcon from "@mui/icons-material/Lock";

import { loginApi, userApi, updateUserApi } from "../../../service/UserService";
import { toast } from "react-toastify";

const ProfileMenu = [
  {
    icon: <PersonIcon size={24} />,
    href: "/my-profile",
    label: "Tài khoản của tôi",
  },
  {
    icon: <CalendarMonthIcon size={24} />,
    href: "my-appoint",
    label: "lịch hẹn",
  },
  {
    icon: <LockIcon size={24} />,
    href: "change-password",
    label: "Đổi mật khẩu",
  },
];
function SideBar() {

    const [user, setUser] = useState()
  
    const getUser = async () => {
        try {
          const { data } = await userApi();
          setUser(data);
        } catch {
          console.error();
        }
      };
  return (
    <div className="sticky top-0 z-30 w-1/3 p-2">
      <h2 className="text-2xl font-bold ">Xin chào!</h2>

      <div className="mt-6">
{/*       
        <Button
          variant="ghost"
          className="flex w-full items-center justify-start gap-3 px-3 py-4 text-base font-normal hover:bg-gray-100"
          onClick={handleLogout}
          isLoading={isLogged}>
          <LogOut size={24} className="rotate-180" />
          Đăng xuất
        </Button> */}
      </div>
    </div>
  );
}

export default SideBar;
