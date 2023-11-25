import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../../theme";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";
import AddIcon from "@mui/icons-material/Add";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import Header from "../../components/header";

export const mockDataCar = [
  {
    id: 1,
    license: "92L1-11271",
    name: "Phan Quoc Dat",
    carCompany: "Audi",
    origin: "Đức",
    year: 2010,
    status: "Bảo dưỡng",
    action: "",
  },
  {
    id: 1,
    license: "92L1-11271",
    name: "Phan Quoc Dat",
    carCompany: "Audi",
    origin: "Đức",
    year: 2010,
    status: "Bảo dưỡng",
    action: "",
  },
];

function Star() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "STT" },
    {
      field: "license",
      headerName: "Biển số xe",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "name",
      headerName: "Tên khách hàng",
      flex: 1,
    },
    {
      field: "carCompany",
      headerName: "Hãng Xe",
      flex: 1,
    },
    {
      field: "origin",
      headerName: "Nơi sản xuất",
      flex: 1,
    },

    {
      field: "year",
      headerName: "Năm sản xuất",
      flex: 1,
    },

    {
      field: "status",
      headerName: "Trạng thái",
      flex: 1,
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
      <Box className="flex justify-between ">
        <Header title="XE" subtitle="Quản lý xe" />
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
            <span className="ml-1">Thêm mới xe</span>
          </button>
          <button
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
        <DataGrid checkboxSelection rows={mockDataCar} columns={columns} />
      </Box>
    </Box>
  );
}

export default Star;
