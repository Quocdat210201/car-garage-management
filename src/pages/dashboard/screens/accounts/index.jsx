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
import Header from "../../components/header";

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
  const columns = [
    { field: "id", headerName: "STT" },
    {
      field: "name",
      headerName: "Họ và tên",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "dateOfBirth",
      headerName: "Ngày sinh",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "phone",
      headerName: "Số điện thoại",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "accessLevel",
      headerName: "Quyền",
      flex: 1,
      renderCell: ({ row: { access } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              access === "admin"
                ? colors.greenAccent[600]
                : access === "manager"
                ? colors.greenAccent[700]
                : colors.greenAccent[700]
            }
            borderRadius="4px">
            {access === "admin" && <AdminPanelSettingsOutlinedIcon />}
            {access === "manager" && <SecurityOutlinedIcon />}
            {access === "user" && <LockOpenOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {access}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "action",
      headerName: "",
      flex: 1,
      renderCell: () => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            borderRadius="4px">
            <Typography
              sx={{ ml: "5px" }}
              className="flex justify-center items-center">
              <button>
                <InfoIcon fontSize="large" className="mx-2" />
              </button>
              <button>
                <EditIcon fontSize="large" className="mx-2" />
              </button>
              <button>
                <DeleteIcon fontSize="large" className="mx-2" />
              </button>
            </Typography>
          </Box>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Box display='flex' justifyContent='space-between'>
        <Header title="TEAM" subtitle="Managing the Team Members" />
        <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
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
            <span className="ml-1">Thêm tài khoản</span>
          </button>
        </Typography>
      </Box>
      <Box
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}>
        <DataGrid checkboxSelection rows={mockDataTeam} columns={columns}  />
      </Box>
    </Box>
  );
}

export default Accounts;
