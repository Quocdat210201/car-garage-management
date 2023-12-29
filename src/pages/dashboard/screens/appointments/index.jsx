import * as React from "react";
import { useState, useEffect } from "react";
import { useTheme } from "@mui/material";
import { tokens } from "../../../../theme";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import AddIcon from "@mui/icons-material/Add";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import Header from "../../components/Header";
import { getAppointmentSchedule } from "../../../../service/UserService";
import { format, parseISO } from "date-fns";
import ScheduleSendIcon from "@mui/icons-material/ScheduleSend";
import ModalAssign from "./modalAssign";

function Appointments() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [appoint, setAppoint] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const [modalAssign, setModalAssign] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [dataAssign, setDataAssign] = useState([]);

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const handleShowAssign = (data) => {
    setModalAssign(true);
    setDataAssign(data);
  };

  const handleCancel = () => {
    // setModalDelete(false);
    setModalAssign(false);
    setIsEditMode(false);
  };

  const addNumbering = (data) => {
    return data.map((item, index) => ({ ...item, stt: index + 1 }));
  };

  const getDataAppoint = async () => {
    setIsLoading(true);
    try {
      const response = await getAppointmentSchedule();
      const newData = addNumbering(response.data?.data);

      if (response.status === 200) {
        setAppoint(newData);
        setIsLoading(false);
      }
    } catch {
      console.error();
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getDataAppoint();
  }, []);
  console.log({ appoint });

  return (
    <div className="m-5">
      <div className="flex justify-between ">
        <Header title=" LỊCH HẸN" subtitle="Quản lý lịch hẹn" />
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
                Tên khách hàng
              </th>
              <th scope="col" className="px-6 py-3">
                Ngày hẹn
              </th>
              <th scope="col" className="px-6 py-3">
                Thời gian
              </th>
              <th scope="col" className="px-6 py-3">
                Nội dung
              </th>
              <th scope="col" className="px-6 py-3">
                Trạng thái
              </th>
              <th scope="col" className="px-6 py-3"></th>
              <th scope="col" className="px-6 py-3"></th>
            </tr>
          </thead>
          {appoint.length === 0 ? (
            <div className="">
              <lable></lable>
            </div>
          ) : (
            <tbody>
              {appoint.map((data, index) => (
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
                    {data.car.owner.name}
                  </td>
                  <td
                    style={{ color: colors.greenAccent[300] }}
                    className="px-6 py-4">
                    {data.appointmentDate ? (
                      format(parseISO(data.appointmentDate), "dd/MM/yyyy")
                    ) : (
                      <span>-</span>
                    )}
                  </td>
                  <td
                    style={{ color: colors.greenAccent[300] }}
                    className="px-6 py-4">
                    {data.appointmentDate ? (
                      format(parseISO(data.appointmentDate), "HH:mm")
                    ) : (
                      <span>-</span>
                    )}
                  </td>
                  <td
                    style={{ color: colors.greenAccent[300] }}
                    className="px-6 py-4">
                    {data.content}
                  </td>
                  {/* color={
                  status === "Đang chờ"
                    ? colors.redAccent[400]
                    : status === "Đã xác nhận"
                    ? colors.greenAccent[500]
                    : colors.redAccent[700]
                } */}
                  <td className="px-6 py-4">
                    {data.status === 0 ? (
                      <span
                        style={{
                          color: colors.redAccent[100],
                          background: colors.redAccent[700],
                          padding: "6px 10px",
                          borderRadius: "4px",
                        }}>
                        Đang chờ
                      </span>
                    ) : data.status === 1 ? (
                      <span
                        style={{
                          color: colors.redAccent[100],
                          background: colors.blueAccent[600],
                          padding: "6px 10px",
                          borderRadius: "4px",
                        }}>
                        Đã xác nhận
                      </span>
                    ) : data.status === 2 ? (
                      <span
                        style={{
                          color: colors.redAccent[100],
                          background: colors.greenAccent[500],
                          padding: "6px 10px",
                          borderRadius: "4px",
                        }}>
                        Đã hoàn thành
                      </span>
                    ) : (
                      <span>-</span>
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
                  <td className="px-6 py-4">
                    {data.status === 0 ? (
                      <button
                        style={{
                          backgroundColor: colors.greenAccent[500],
                          padding: "10px 16px",
                          borderRadius: "4px",
                          marginRight: "10px",
                          display: "inline-flex",
                          justifyContent: "center",
                          alignItems: "center",
                          width: "120px",
                        }}
                        onClick={() => {
                          handleShowAssign(data);
                        }}>
                        <ScheduleSendIcon />
                        <span className="ml-1">Giao việc</span>
                      </button>
                    ) : (
                      <button
                        style={{
                          backgroundColor: colors.greenAccent[500],
                          padding: "10px 16px",
                          borderRadius: "4px",
                          marginRight: "10px",
                          display: "inline-flex",
                          justifyContent: "center",
                          alignItems: "center",
                          width: "120px",
                          opacity: 0.7,
                          cursor: "not-allowed"
                        }}
                        onClick={() => {
                          handleShowAssign(data);
                        }}>
                        <CheckCircleOutlineIcon />
                        <span className="ml-1">Đã giao</span>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
      {modalAssign && (
        <div className=" detail-modal flex-col">
          <ModalAssign
            isEditModal={isEditMode}
            handleCancel={handleCancel}
            toggleEditMode={toggleEditMode}
            data={dataAssign}
            open={modalAssign}
            getDataAppoint={getDataAppoint}
          />
        </div>
      )}
    </div>
  );
}

export default Appointments;
