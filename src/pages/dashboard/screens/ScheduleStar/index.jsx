import { useTheme } from "@mui/material";
import { tokens } from "../../../../theme";
import InfoIcon from "@mui/icons-material/Info";
import Header from "../../components/Header";
import ModalDetailSchedule from "./modalDetailSchedule";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

import { useState, useEffect } from "react";
import {
  getAppointmentScheduleStaff,
  userApi,
  FinishAssign,
} from "../../../../service/UserService";
import { format, parseISO } from "date-fns";
function ScheduleStaff() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [modalDetail, setModalDetail] = useState(false);
  const [dataWork, setDataWork] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [listSchedule, setListSchedule] = useState([]);
  const [staffId, setStaffId] = useState();
  const [user, setUser] = useState([]);

  const addNumbering = (data) => {
    return data.map((item, index) => ({ ...item, stt: index + 1 }));
  };
  const getUser = async () => {
    try {
      const { data } = await userApi();
      setUser(data);
    } catch {
      console.error();
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    const getStaffId = (user) => {
      const StaffId = user.id;
      const roles = localStorage.getItem("roles");
      const StaffRole = user.roles;
      if (StaffRole && StaffRole.toString() === roles) {
        setStaffId(StaffId);
      } else {
        console.error();
      }
    };
    getStaffId(user);
  }, [user]);
  const getListSchedule = async (staffId) => {
    try {
      const res = await getAppointmentScheduleStaff(staffId);
      const newData = addNumbering(res.data?.data);
      setListSchedule(newData);
    } catch (error) {
      console.error();
    }
  };
  useEffect(() => {
    getListSchedule(staffId);
  }, [staffId]);

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };
  const handleShowModal = (data) => {
    setModalDetail(true);
    setDataWork(data);
  };

  const handleCancel = () => {
    setModalDetail(false);
    setIsEditMode(false);
  };

  console.log({listSchedule});

  return (
    <div className="m-5">
      <div className="flex justify-between ">
        <Header title="LỊCH LÀM VIỆC" subtitle="Quản lý lịch làm việc" />
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
                Tên nhân viên
              </th>
              <th scope="col" className="px-6 py-3">
                Ngày làm việc
              </th>
              <th scope="col" className="px-6 py-3">
                Thời gian
              </th>
              <th scope="col" className="px-6 py-3">
                Nhiệm vụ
              </th>
              <th scope="col" className="px-6 py-3">
                Trạng thái
              </th>
              <th scope="col" className="px-6 py-3">
                Ghi chú
              </th>
              <th scope="col" className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {listSchedule &&
              listSchedule.map((data, index) => (
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
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white w-[100px]">
                    {data.stt}
                  </td>
                  <td
                    style={{ color: colors.greenAccent[300] }}
                    className="px-6 py-4 w-[200px]">
                    {data.staff.name}
                  </td>
                  <td
                    style={{ color: colors.greenAccent[300] }}
                    className="px-6 py-4 w-[150px]">
                    {data.appointmentDate ? (
                      format(parseISO(data.appointmentDate), "dd/MM/yyyy")
                    ) : (
                      <span>-</span>
                    )}
                  </td>
                  <td
                    style={{ color: colors.greenAccent[300] }}
                    className="px-6 py-4 w-[150px]">
                    {data.appointmentDate ? (
                      format(parseISO(data.appointmentDate), "HH:mm")
                    ) : (
                      <span>-</span>
                    )}
                  </td>
                  <td
                    style={{ color: colors.greenAccent[300] }}
                    className="px-6 py-4 w-[350px]">
                    <span className="custom-text-desc-1">
                      {data.adminWorkDetail}
                    </span>
                  </td>
                  <td
                    style={{ color: colors.greenAccent[300] }}
                    className="px-6 py-4 w-[200px]">
                    {data.status === 1 ? (
                      <>
                        <span
                          style={{
                            color: colors.redAccent[100],
                            background: colors.redAccent[600],
                            padding: "6px 10px",
                            borderRadius: "4px",
                            cursor: "pointer",
                          }}
                          onClick={() => handleShowModal(data)}>
                          Nhận việc
                        </span>
                      </>
                    ) : data.status === 2 ? (
                      <span
                        style={{
                          color: colors.redAccent[100],
                          background: colors.blueAccent[600],
                          padding: "6px 10px",
                          borderRadius: "4px",
                          cursor: "pointer",
                        }}
                        onClick={() => handleShowModal(data)}>
                        Hoàn thành
                      </span>
                    ) : data.status === 3 ? (
                      <span
                        style={{
                          color: colors.redAccent[100],
                          background: colors.greenAccent[600],
                          padding: "6px 10px",
                          borderRadius: "4px",
                          cursor: "pointer",
                        }}>
                        Đã hoàn thành
                      </span>
                    ) : (
                      <></>
                    )}
                  </td>
                  <td
                    style={{ color: colors.greenAccent[300] }}
                    className="px-6 py-4 w-[280px]">
                    {data.note ? (
                      data.note
                    ) : (
                      <span>
                        <strong>-</strong>
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => {
                        handleShowModal(data);
                      }}>
                      <InfoIcon fontSize="large" className="mx-2" />
                    </button>
                    {/* <button>
                    <EditIcon fontSize="large" className="mx-2" />
                  </button>
                  <button>
                    <DeleteIcon fontSize="large" className="mx-2" />
                  </button> */}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {modalDetail && (
        <div className=" detail-modal flex-col">
          <ModalDetailSchedule
            isEditModal={isEditMode}
            handleCancel={handleCancel}
            toggleEditMode={toggleEditMode}
            dataWork={dataWork}
            open={modalDetail}
            getListSchedule={getListSchedule}
            staffId={staffId}
          />
        </div>
      )}
    </div>
  );
}

export default ScheduleStaff;
