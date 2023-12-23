import { useTheme } from "@mui/material";
import { tokens } from "../../../../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";
import { Form, Input, Select, Button, TextArea } from "antd/lib";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import { getAccount, deleteAccount } from "../../../../service/UserService";
import formatPhoneNumber from "../../components/FormatPhoneNumber";
import * as ROLE from "../../common/constant";
import { Modal } from "antd";
import ReactPaginate from "react-paginate";
import Delete from "./modalDelete";
import { toast } from "react-toastify";
import { get } from "lodash";
import DetailModalAccount from "./detailAccount";

// export const mockDataTeam = [
//   {
//     id: 1,
//     name: "Jon Snow",
//     email: "jonsnow@gmail.com",
//     dateOfBirth: 35,
//     phone: "(665)121-5454",
//     access: "admin",
//     action: "",
//   },
//   {
//     id: 2,
//     name: "Cersei Lannister",
//     email: "cerseilannister@gmail.com",
//     dateOfBirth: 42,
//     phone: "(421)314-2288",
//     access: "manager",
//     action: "",
//   },
//   {
//     id: 3,
//     name: "Jaime Lannister",
//     email: "jaimelannister@gmail.com",
//     dateOfBirth: 45,
//     phone: "(422)982-6739",
//     access: "user",
//     action: "",
//   },
//   {
//     id: 4,
//     name: "Anya Stark",
//     email: "anyastark@gmail.com",
//     dateOfBirth: 16,
//     phone: "(921)425-6742",
//     access: "admin",
//     action: "",
//   },
//   {
//     id: 5,
//     name: "Daenerys Targaryen",
//     email: "daenerystargaryen@gmail.com",
//     dateOfBirth: 31,
//     phone: "(421)445-1189",
//     access: "user",
//     action: "",
//   },
//   {
//     id: 6,
//     name: "Ever Melisandre",
//     email: "evermelisandre@gmail.com",
//     dateOfBirth: 150,
//     phone: "(232)545-6483",
//     access: "manager",
//     action: "",
//   },
// ];

function Accounts() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [form] = Form.useForm();
  const [account, setAccount] = useState([]);
  const [accountDelete, setAccountDelete] = useState([]);
  const [accountEdit, setAccountEdit] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [pageCount, setPageCount] = useState(0);
  const [currentItems, setCurrentItems] = useState([]);
  const [itemOffset, setItemOffset] = useState(0);
  const [modalDelete, setModalDelete] = useState(false);
  const [modalDetail, setModalDetail] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };
  const [isModalVisible, setIsModalVisible] = useState({
    open: false,
    id: null,
  });
  const addNumbering = (data) => {
    return data.map((item, index) => ({ ...item, stt: index + 1 }));
  };

  const showModal = (acc) => {
    setAccountEdit(acc);
    setModalDetail(true);
    console.log(acc);
  };

  const showModalDelete = (acc) => {
    setModalDelete(true);
    setAccountDelete(acc);
  };

  const handleCancel = () => {
    setIsModalVisible({ open: false, id: null });
    setModalDelete(false);
    setIsEditMode(false);
  };
  const handleReload = () => {
    setIsModalVisible({ open: false, id: null });
    setIsEditMode(false);
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteAccount(accountDelete.id);
      toast.success("Xóa thành công", {
        position: "top-right",
        autoClose: 1000, // Đặt thời gian hiển thị trong 2 giây
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      });
      setModalDelete(false);
      getListAccount();
    } catch {
      console.error();
    }
  };

  const getListAccount = async () => {
    try {
      const { data } = await getAccount("");
      const newData = addNumbering(data.data);
      setAccount(newData);
    } catch {
      console.error();
    }
  };
  useEffect(() => {
    getListAccount();
  }, []);

  // Pagination
  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(account.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(account.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, account]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % account.length;
    // console.log(
    //   `User requested page number ${event.selected}, which is offset ${newOffset}`
    // );
    setItemOffset(newOffset);
  };

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
                Tên đăng nhập
              </th>
              <th scope="col" className="px-6 py-3">
                Số điện thoại
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Quyền
              </th>
              <th scope="col" className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((data, index) => (
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
                  {data.name}
                </td>
                <td
                  style={{ color: colors.greenAccent[300] }}
                  className="px-6 py-4">
                  {formatPhoneNumber(data.phoneNumber)}
                </td>
                <td className="px-6 py-4 m-5">
                  <span
                    style={{
                      backgroundColor: colors.greenAccent[700],
                      display: "flex",
                      justifyContent: "center",
                      padding: "5px",
                      borderRadius: "4px",
                    }}>
                    {data.roles.toString() === "System Administrator" && (
                      <>
                        <AdminPanelSettingsOutlinedIcon className="mr-2" />
                        <span>Admin</span>
                      </>
                    )}
                    {data.roles.toString() === "Gara Administrator" && (
                      <>
                        <AdminPanelSettingsOutlinedIcon className="mr-2" />
                        <span>Admin</span>
                      </>
                    )}
                    {data.roles.toString() === "Staff" && (
                      <>
                        <AdminPanelSettingsOutlinedIcon className="mr-2" />
                        <span>Nhân viên</span>
                      </>
                    )}
                    {data.roles.toString() === "Customer" && (
                      <>
                        <PersonIcon className="mr-2" />
                        <span>Khách hàng</span>
                      </>
                    )}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <button onClick={() => showModal(data)}>
                    <InfoIcon fontSize="large" className="mx-2" />
                  </button>
                  <button>
                    <EditIcon fontSize="large" className="mx-2" />
                  </button>
                  <button onClick={() => showModalDelete(data)}>
                    <DeleteIcon fontSize="large" className="mx-2" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ReactPaginate
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel="< previous"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
        />
      </div>
      {
        modalDetail && (
          <div className=" detail-modal flex-col">
            <DetailModalAccount
              isEditModal={isEditMode}
              handleCancel={handleCancel}
              toggleEditMode={toggleEditMode}
              data={accountEdit}
              open={modalDetail}
            />
          </div>
        )

        // alert("Hello")
      }
      {modalDelete && (
        <Modal
          title="Xóa xe"
          open={modalDelete}
          onOk={handleDeleteAccount}
          onCancel={handleCancel}
          footer={
            <>
              <button
                type="submit"
                style={{
                  backgroundColor: colors.blueAccent[700],
                  padding: "6px 16px",
                  borderRadius: "4px",
                  marginRight: "10px",
                  marginTop: "0px",
                  display: "inline-flex",
                  justifyContent: "center",
                  fontSize: "14px",
                  alignItems: "center",
                }}
                onClick={handleCancel}>
                <span className="ml-1">Hủy</span>
              </button>
              <button
                type="submit"
                style={{
                  backgroundColor: colors.blueAccent[700],
                  padding: "6px 16px",
                  borderRadius: "4px",
                  marginRight: "10px",
                  marginTop: "0px",
                  display: "inline-flex",
                  justifyContent: "center",
                  fontSize: "14px",
                  alignItems: "center",
                }}
                onClick={handleDeleteAccount}>
                <span className="ml-1">Xóa</span>
              </button>
            </>
          }>
          <p>Bạn có chắc chắc muốn xóa?</p>
        </Modal>
      )}
    </div>
  );
}

export default Accounts;
