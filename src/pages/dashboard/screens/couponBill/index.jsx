import { DeleteOutlined, EditOutlined, GroupOutlined } from "@ant-design/icons";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../../../theme";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";
import AddIcon from "@mui/icons-material/Add";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import Header from "../../components/Header";
import { Form, Input, Select, Button, TextArea } from "antd/lib";
import Modal from "antd/lib/modal/Modal";
import DetailCouponBill from "./detailCouponBill";
import AddNewCouponBill from "./addCouponBill";
import { v4 as uuidv4 } from "uuid";
import { format, parseISO } from "date-fns";
const { Option } = Select;

import {
  getAdminGoodsDeliveryNote,
  getAutomotivePartCategory,
  getAutomotivePart,
} from "../../../../service/UserService";

import { get } from "lodash";
import { toast } from "react-toastify";

import { useEffect, useState, useRef } from "react";

function CouponBill() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [form] = Form.useForm();
  const classId = false;
  const [detailCouponBill, setDetailCouponBill] = useState([]);
  const [modalDelete, setModalDelete] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [modalDetail, setModalDetail] = useState(false);
  const [modalAdd, setModalAdd] = useState(false);
  const [listCouponBill, setListCouponBill] = useState([]);
  const [listPartCategory, setListPartCategory] = useState([]);
  const [listPart, setListPart] = useState([]);
  const [listgoodsDeliveryNoteDetails, setListgoodsDeliveryNoteDetails] =
    useState([]);

  const [modalId, setModalId] = useState(generateRandomId());

  function generateRandomId() {
    const prefix = "PN_";
    const randomSuffix = generateRandomSuffix();
    return `${prefix}${randomSuffix}`;
  }

  function generateRandomSuffix() {
    const min = 1000000;
    const max = 9999999;
    const randomSuffix = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomSuffix.toString();
  }

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };
  const showModal = (data) => {
    setModalDetail(true);
    setDetailCouponBill(data);
  };

  const showModalDelete = (data) => {
    setModalDelete(true);
    setDetailCouponBill(data);
  };

  const handleCancel = () => {
    setModalDetail(false);
    setModalDelete(false);
    setIsEditMode(false);
    setModalAdd(false);
  };
  const handleReload = () => {
    setModalDetail(false);
    setIsEditMode(false);
    setModalAdd(false);
  };

  const addNumbering = (data) => {
    return data.map((item, index) => ({ ...item, stt: index + 1 }));
  };

  const getListCuoponBill = async () => {
    try {
      const res = await getAdminGoodsDeliveryNote();
      const data = res.data?.data;
      const newData = addNumbering(data);
      setListCouponBill(newData);

      setListgoodsDeliveryNoteDetails(data.goodsDeliveryNoteDetails);
    } catch (error) {
      console.error(error);
    }
  };

  const getlistPartCategory = async () => {
    try {
      const { data } = await getAutomotivePartCategory();
      setListPartCategory(data.data);
    } catch (error) {
      console.error();
    }
  };

  useEffect(() => {
    getListCuoponBill();
    getlistPartCategory();
  }, []);
  // console.log({ listCouponBill });
  // console.log({ listgoodsDeliveryNoteDetails });

  return (
    <div className="m-5">
      <div className="flex justify-between ">
        <Header title="PHIẾU NHẬP" subtitle="Quản lý phiếu nhập phụ tùng" />
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
            }}
            onClick={() => {
              setModalAdd(true);
              setModalId(generateRandomId());
            }}>
            <AddIcon className="ml-1" />
            Thêm mới phiếu nhập
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
                Mã phiếu nhập
              </th>
              <th scope="col" className="px-6 py-3">
                Nhân viên thực hiện
              </th>
              <th scope="col" className="px-6 py-3">
                Ngày nhập
              </th>
              <th scope="col" className="px-6 py-3">
                Mô tả
              </th>
              <th scope="col" className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {listCouponBill ? (
              listCouponBill.map((data, index) => (
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
                    {data.goodsDeliveryCode}
                  </td>
                  <td
                    style={{ color: colors.greenAccent[300] }}
                    className="px-6 py-4">
                    {data.staff.name}
                  </td>
                  <td
                    style={{ color: colors.greenAccent[300] }}
                    className="px-6 py-4">
                    {data.receiveDate ? (
                      format(parseISO(data.receiveDate), "dd/MM/yyyy")
                    ) : (
                      <span>-</span>
                    )}
                  </td>
                  <td
                    style={{ color: colors.greenAccent[300] }}
                    className="px-6 py-4">
                    {data.status ? data.status : <strong>-</strong>}
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
              ))
            ) : (
              <div>
                <span>Dữ liệu trống</span>
              </div>
            )}
          </tbody>
        </table>
      </div>
      {modalAdd && (
        <AddNewCouponBill
          open={modalAdd}
          handleCancel={handleCancel}
          handleReload={handleReload}
          goodsDeliveryCode={modalId}
          getListCuoponBill={getListCuoponBill}
        />
      )}
      {
        modalDetail && (
          <DetailCouponBill
            open={modalDetail}
            handleCancel={handleCancel}
            handleReload={handleReload}
            toggleEditMode={toggleEditMode}
            isEditMode={isEditMode}
            data={detailCouponBill}
            listPartCategory={listPartCategory}
          />
        )
        // alert("Hello")
      }
      {modalDelete && (
        <Modal
          title="Xóa xe"
          open={modalDelete}
          // onOk={handleDelete}
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
                // onClick={handleDelete}
              >
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

export default CouponBill;
