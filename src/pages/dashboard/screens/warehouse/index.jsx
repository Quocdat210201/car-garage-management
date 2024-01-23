import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../../theme";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";
import AddIcon from "@mui/icons-material/Add";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import Header from "../../components/Header";
import {
  getAutomotivePartInWarehouse,
  getAutomotivePart,
} from "../../../../service/UserService";
import { useEffect, useState } from "react";
import formatCurrency from "../../components/formatMoney";

function WareHouse() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [listPartWarehouse, setListPartWarehouse] = useState([]);
  const [listPart, setListPart] = useState([]);

  const addNumbering = (data) => {
    return data.map((item, index) => ({ ...item, stt: index + 1 }));
  };

  const getPatrWarehouse = async () => {
    try {
      const { data } = await getAutomotivePartInWarehouse();
      const newData = addNumbering(data.data);
      setListPartWarehouse(newData);
    } catch (error) {
      console.error();
    }
  };

  // const getListPart = async () => {
  //   try {
  //     const { data } = await getAutomotivePartInWarehouse();
  //     const newData = addNumbering(data.data);
  //     setListPart(newData);
  //   } catch (error) {
  //     console.error();
  //   }
  // };

  // const getAutomotivePartName = (AutomotiveId) => {
  //   const foundCarType = listPart.find((item) => item.id === AutomotiveId);
  //   return foundCarType ? foundCarType.name : "";
  // };

  useEffect(() => {
    getPatrWarehouse();
  }, []);

  console.log({ listPartWarehouse });

  return (
    <div className="m-5">
      <div className="flex justify-between ">
        <Header title=" KHO" subtitle="Quản lý phụ tùng" />
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
            <span className="ml-1">Thêm mới lịch hẹn</span>
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
                Tên phụ tùng
              </th>
              <th scope="col" className="px-6 py-3">
                Số lượng còn
              </th>
              <th scope="col" className="px-6 py-3">
                Đơn giá
              </th>
              <th scope="col" className="px-6 py-3">
                Mô tả
              </th>
              <th scope="col" className="px-6 py-3">
                Trạng thái
              </th>
              <th scope="col" className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {listPartWarehouse.map((data, index) => (
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
                  {data.stt}
                </td>
                <td
                  style={{ color: colors.greenAccent[300] }}
                  className="px-6 py-4">
                  {data.automotivePart.name}
                </td>
                <td
                  style={{ color: colors.greenAccent[300] }}
                  className="px-6 py-4">
                  {data.quantity}
                </td>
                <td
                  style={{ color: colors.greenAccent[300] }}
                  className="px-6 py-4">
                  {formatCurrency(data.receivePrice)}
                </td>
                <td
                  style={{ color: colors.greenAccent[300] }}
                  className="px-6 py-4">
                  {data.content}
                </td>
                <td
                  style={{ color: colors.greenAccent[300] }}
                  className="px-6 py-4">
                  {data.quantity && data.quantity > 0 ? (
                    <span
                      style={{
                        color: colors.redAccent[100],
                        background: colors.greenAccent[600],
                        padding: "6px 10px",
                        borderRadius: "4px",
                      }}>
                      Còn hàng
                    </span>
                  ) : (
                    <span
                      style={{
                        color: colors.redAccent[100],
                        background: colors.redAccent[500],
                        padding: "6px 10px",
                        borderRadius: "4px",
                      }}>
                      Hết hàng
                    </span>
                  )}
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

export default WareHouse;
