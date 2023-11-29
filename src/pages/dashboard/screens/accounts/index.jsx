import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import Header from "../../components/Header";
import { red } from "@mui/material/colors";

export const mockDataTeam = [
  {
    id: 1,
    name: "Jon Snow",
    email: "jonsnow@gmail.com",
    dateOfBirth: 35,
    phone: "(665)121-5454",
    access: "admin",
    action: "",
  },
  {
    id: 2,
    name: "Cersei Lannister",
    email: "cerseilannister@gmail.com",
    dateOfBirth: 42,
    phone: "(421)314-2288",
    access: "manager",
    action: "",
  },
  {
    id: 3,
    name: "Jaime Lannister",
    email: "jaimelannister@gmail.com",
    dateOfBirth: 45,
    phone: "(422)982-6739",
    access: "user",
    action: "",
  },
  {
    id: 4,
    name: "Anya Stark",
    email: "anyastark@gmail.com",
    dateOfBirth: 16,
    phone: "(921)425-6742",
    access: "admin",
    action: "",
  },
  {
    id: 5,
    name: "Daenerys Targaryen",
    email: "daenerystargaryen@gmail.com",
    dateOfBirth: 31,
    phone: "(421)445-1189",
    access: "user",
    action: "",
  },
  {
    id: 6,
    name: "Ever Melisandre",
    email: "evermelisandre@gmail.com",
    dateOfBirth: 150,
    phone: "(232)545-6483",
    access: "manager",
    action: "",
  },
];

function Accounts() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <div className="m-5">
      <div className="flex justify-between ">
        <Header title="Tài khoản" subtitle="Quản lý tài khoản" />
        <div color={colors.grey[100]}>
          <button
            style={{
              backgroundColor: colors.blueAccent[700],
              padding: "10px 16px",
              borderRadius: "4px",
              marginRight: "10px",
              display: "inline-flex",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <AddIcon />
            <span className="ml-1">Thêm mới tài khoản</span>
          </button>
          {/* <button
            style={{
              backgroundColor: colors.blueAccent[700],
              padding: "10px 16px",
              borderRadius: "4px",
              display: "inline-flex",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <FileUploadIcon />
            <span className="ml-1">Xuất file excel</span>
          </button> */}
        </div>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-left rtl:text-right">
          <thead
            className=""
            style={{ backgroundColor: colors.blueAccent[700] }}>
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-all-search"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor="checkbox-all-search" className="sr-only">
                    checkbox
                  </label>
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                STT
              </th>
              <th scope="col" className="px-6 py-3">
                Họ và tên
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Ngày sinh
              </th>
              <th scope="col" className="px-6 py-3">
                Số điện thoại
              </th>
              <th scope="col" className="px-6 py-3">
                Quyền
              </th>
              <th scope="col" className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {mockDataTeam.map((data, index) => (
              <tr
                className=""
                style={{ backgroundColor: colors.primary[400] }}
                key={index}>
                <td className="w-4 p-4">
                  <div className="flex items-center">
                    <input
                      id="checkbox-table-search-1"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="checkbox-table-search-1"
                      className="sr-only">
                      checkbox
                    </label>
                  </div>
                </td>
                <td
                  style={{ color: colors.greenAccent[300] }}
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {data.id}
                </td>
                <td
                  style={{ color: colors.greenAccent[300] }}
                  className="px-6 py-4">
                  {data.name}
                </td>
                <td
                  style={{ color: colors.greenAccent[300] }}
                  className="px-6 py-4">
                  {data.email}
                </td>
                <td
                  style={{ color: colors.greenAccent[300] }}
                  className="px-6 py-4">
                  {data.dateOfBirth}
                </td>
                <td
                  style={{ color: colors.greenAccent[300] }}
                  className="px-6 py-4">
                  {data.phone}
                </td>
                <td className="px-6 py-4 m-5">
                  <span
                    style={{
                      backgroundColor: colors.greenAccent[700],
                      display: "flex",
                      justifyContent: "center",
                      padding: "5px",
                      borderRadius: "4px"
                    }}>
                    {data.access === "admin" && (
                      <AdminPanelSettingsOutlinedIcon className="mr-2" />
                    )}
                  {data.access === "manager" && <SecurityOutlinedIcon className="mr-2" />}
                  {data.access === "user" && <LockOpenOutlinedIcon className="mr-2" />}
                  {data.access}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button>
                    <InfoIcon fontSize="large" className="mx-2" />
                  </button>
                  <button>
                    <EditIcon fontSize="large" className="mx-2" />
                  </button>
                  <button>
                    <DeleteIcon fontSize="large" className="mx-2" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Accounts;
