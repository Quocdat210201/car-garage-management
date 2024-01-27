import { DeleteOutlined, EditOutlined, GroupOutlined } from "@ant-design/icons";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../../../theme";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";
import AddIcon from "@mui/icons-material/Add";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import Header from "../../components/Header";
import { mockDataCar } from "./mockData";
import { Form, Input, Select, Button, TextArea } from "antd/lib";
import Modal from "antd/lib/modal/Modal";
const { Option } = Select;

import {
  getCarApi,
  carBrandApi,
  carTypeApi,
  deleteCar,
} from "../../../../service/UserService";

import { get } from "lodash";
import { toast } from "react-toastify";
// import ClassModal from "./classModal";

import { useEffect, useState } from "react";

import ReactPaginate from "react-paginate";

function Star() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [form] = Form.useForm();
  const classId = false;
  const [loading, setIsLoading] = useState(false);
  const [listCar, setlistCar] = useState([]);
  const [carEdit, setcarEdit] = useState([]);
  const [carDelete, setCarDelete] = useState([]);
  const [carBrand, setCarBrand] = useState([]);
  const [carBrandId, setCarBrandId] = useState("");
  const [carType, setCarType] = useState([]);
  const [modalDelete, setModalDelete] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [itemOffset, setItemOffset] = useState(0);
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };
  const [isModalVisible, setIsModalVisible] = useState({
    open: false,
    id: null,
  });
  const showModal = (car, id) => {
    console.log();
    setIsModalVisible({
      open: true,
      id,
    });
    setcarEdit(car);
    console.log(carEdit);
  };

  const showModalDelete = (car) => {
    setModalDelete(true);
    setCarDelete(car);
  };

  const handleDelete = async () => {
    try {
      await deleteCar(carDelete.id);
      toast.success("Xóa thành công", {
        position: "top-right",
        autoClose: 1000, // Đặt thời gian hiển thị trong 2 giây
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      });
      setModalDelete(false);
      getListCar();
    } catch {
      console.error();
    }
  };

  const addNumbering = (data) => {
    return data.map((item, index) => ({ ...item, stt: index + 1 }));
  };

  const getListCar = async () => {
    try {
      const { data } = await getCarApi();
      const newData = addNumbering(data.data);
      setlistCar(newData);
    } catch {
      console.error();
    }
  };
  useEffect(() => {
    getListCar();
  }, []);

  console.log({ listCar });

  const handleCancel = () => {
    setIsModalVisible({ open: false, id: null });
    setModalDelete(false);
    setIsEditMode(false);
  };
  const handleReload = () => {
    setIsModalVisible({ open: false, id: null });
    setIsEditMode(false);
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const getCarBrand = async () => {
    try {
      const { data } = await carBrandApi();
      setCarBrand(data.data);
    } catch {
      console.error();
    }
  };

  useEffect(() => {
    getCarBrand();
  }, []);
  useEffect(() => {
    const getCarType = async () => {
      setIsLoading(true);
      try {
        const { data } = await carTypeApi(carBrandId);
        setCarType(data.data);
        setIsLoading(false);
      } catch {
        console.error();
        setIsLoading(false);
      }
    };
    getCarType();
  }, [carBrandId]);

  console.log(carBrand);

  const getCarBrandName = (carBrandId) => {
    const foundCarBrand = carBrand.find((item) => item.id === carBrandId);
    return foundCarBrand ? foundCarBrand.name : "";
  };

  // Pagination
  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(listCar.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(listCar.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, listCar]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % listCar.length;
    // console.log(
    //   `User requested page number ${event.selected}, which is offset ${newOffset}`
    // );
    setItemOffset(newOffset);
  };

  return (
    <div className="m-5">
      <div className="flex justify-between ">
        <Header title="XE" subtitle="Quản lý xe" />
        <div color={colors.grey[100]}>
          {/* <button
            style={{
              backgroundColor: colors.blueAccent[700],
              padding: "10px 16px",
              borderRadius: "4px",
              marginRight: "10px",
              display: "inline-flex",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <AddIcon className="ml-1" />
            Thêm mới xe
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
                Tên khách hàng
              </th>
              <th scope="col" className="px-6 py-3">
                Biển số xe
              </th>
              <th scope="col" className="px-6 py-3">
                Tên loại xe
              </th>
              <th scope="col" className="px-6 py-3">
                Mô tả
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
                  {data.owner.name}
                </td>
                <td
                  style={{ color: colors.greenAccent[300] }}
                  className="px-6 py-4">
                  {data.registrationNumber}
                </td>
                <td
                  style={{ color: colors.greenAccent[300] }}
                  className="px-6 py-4">
                  {data.carType.name}
                </td>
                <td
                  style={{ color: colors.greenAccent[300] }}
                  className="px-6 py-4">
                  {data.description ? (
                    <p className="custom-text-desc-2 w-[400px]">
                      {data.description}
                    </p>
                  ) : (
                    <p>
                      <strong>-</strong>
                    </p>
                  )}
                </td>
                <td className="px-6 py-4">
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
        get(isModalVisible, "open", true) && (
          <div className=" detail-modal flex-col">
            <Modal
              title={
                // classId ?
                // "Cập nhật thông tin lớp học"
                "Chi tiết xe"
              }
              open={get(isModalVisible, "open", true)}
              onCancel={handleCancel}
              onOk={handleReload}
              width={580}
              // style={{ backgroundColor: colors.blueAccent[800] }}
              footer={
                isEditMode ? (
                  <>
                    <button
                      type="submit"
                      style={{
                        backgroundColor: colors.blueAccent[700],
                        padding: "10px 16px",
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
                        padding: "10px 16px",
                        borderRadius: "4px",
                        marginRight: "10px",
                        marginTop: "0px",
                        display: "inline-flex",
                        justifyContent: "center",
                        fontSize: "14px",
                        alignItems: "center",
                      }}
                      onClick={form.submit}>
                      <span className="ml-1">Lưu</span>
                    </button>
                  </>
                ) : (
                  <button
                    type="submit"
                    style={{
                      backgroundColor: colors.blueAccent[700],
                      padding: "10px 16px",
                      borderRadius: "4px",
                      marginRight: "10px",
                      marginTop: "0px",
                      display: "inline-flex",
                      justifyContent: "center",
                      fontSize: "14px",
                      alignItems: "center",
                    }}
                    onClick={toggleEditMode}>
                    <span className="ml-1">Chỉnh sửa</span>
                  </button>
                )
                // <>
                //   <Button type="default" onClick={handleCancel} className="m-1">
                //   <span className="ml-1">Hủy</span>
                //   </Button>
                //   <Button onClick={form.submit}>
                //    <span>Lưu thay đổi</span>
                //   </Button>
                // </>
              }>
              <Form
                name="basic"
                className="max-w-full max-h-full align-center text-white p-5 rounded-[4px]">
                <div className="flex items-center justify-center">
                  <Form.Item
                    style={{ width: 450 }}
                    name="id"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập tên khách hàng",
                      },
                    ]}>
                    <span>
                      Tên khách hàng
                      {/* <span style={{ color: "red" }}>*</span> */}
                    </span>
                    <Input
                      placeholder="Tên khách hàng"
                      value={carEdit.owner.name}
                      className="p-2"
                      disabled={!isEditMode}
                      on
                    />
                  </Form.Item>
                  <Form.Item
                    style={{ width: 450, marginLeft: "16px" }}
                    name="id"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập tên lớp!",
                      },
                    ]}>
                    <span>Biển số xe</span>
                    <Input
                      placeholder="Nhập biển số xe..."
                      className=" p-2"
                      value={carEdit.registrationNumber}
                      disabled={!isEditMode}
                    />
                  </Form.Item>
                </div>
                <div className="flex items-center justify-center">
                  <Form.Item name="">
                    <span>Hãng xe</span>
                    <select
                      className="input-appoint text-14"
                      defaultValue={carEdit.carType.carBrandId}
                      name="carBrandId"
                      id="carBrand"
                      disabled={!isEditMode}
                      style={{
                        zIndex: 9999,
                        width: 210,
                      }}
                      onChange={(event) => {
                        const index = event.target.selectedIndex;
                        const optionElement = event.target.childNodes[index];
                        const optionElementId =
                          optionElement.getAttribute("id");
                        console.log(optionElementId);
                        setCarBrandId(optionElementId);
                        // console.log(`selected ${event.target.value}`);
                      }}>
                      <option value="default">---Chọn hãng xe---</option>
                      <option value={carEdit.carType.carBrandId}>
                        {" "}
                        {getCarBrandName(carEdit.carType.carBrandId)}
                      </option>
                      {carBrand.map((item) => (
                        <option key={item.id} id={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </Form.Item>
                  <Form.Item name="" style={{ marginLeft: 16 }}>
                    <span>Loại xe</span>
                    <select
                      className="input-appoint text-14"
                      defaultValue="default"
                      style={{
                        zIndex: 9999,
                        width: 210,
                      }}
                      disabled={!isEditMode}
                      onChange={handleChange}>
                      <option value="">{carEdit.carType.name}</option>
                      {carType.map((item) => (
                        <option key={item.id} id={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </Form.Item>
                </div>
                <Form.Item name="">
                  <span>Mô tả</span>
                  <Input.TextArea
                    disabled={!isEditMode}
                    rows={4}
                    placeholder="Nhập mô tả"
                    className="text-black p-2"
                    value={carEdit.description}
                  />
                </Form.Item>
                {/* <Form.Item name="">
                  <span>Năm sản xuất</span>
                  <Input
                    placeholder="Nhập nơi sản xuất"
                    type="date"
                    className="text-black p-2"
                  />
                </Form.Item> */}

                {/* <div className="flex justify-end items-center">
                  <Button className="mr-2 bg" onClick={handleCancel}>
                    Hủy
                  </Button>
                  <Button onClick={handleReload}>Lưu</Button>
                </div> */}
              </Form>
            </Modal>
          </div>
        )
        // alert("Hello")
      }
      {modalDelete && (
        <Modal
          title="Xóa xe"
          open={modalDelete}
          onOk={handleDelete}
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
                onClick={handleDelete}>
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

export default Star;
