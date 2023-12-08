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
import CarModal from "./carModal";
import { Form, Input, Select, Button } from "antd/lib";
import Modal from "antd/lib/modal/Modal";
import CloseIcon from "@mui/icons-material/Close";
const { Option } = Select;

import { get } from "lodash";
// import ClassModal from "./classModal";

import { useState } from "react";

function Star() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [form] = Form.useForm();
  const classId = false
  const [isModalVisible, setIsModalVisible] = useState({
    open: false,
    id: null,
  });

  console.log([form]);

  const showModal = (id) => {
    setIsModalVisible({
      open: true,
      id,
    });
    console.log({ id });
    console.log(isModalVisible);
  };
  const handleCancel = () => {
    setIsModalVisible({ open: false, id: null });
  };
  const handleReload = () => {
    setIsModalVisible({ open: false, id: null });
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  return (
    <div className="m-5">
      <div className="flex justify-between ">
        <Header title="XE" subtitle="Quản lý xe" />
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
            onClick={() => showModal(null)}>
            <AddIcon className="ml-1" />
            Thêm mới xe
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
                Biển số xe
              </th>
              <th scope="col" className="px-6 py-3">
                Tên khách hàng
              </th>
              <th scope="col" className="px-6 py-3">
                Hãng xe
              </th>
              <th scope="col" className="px-6 py-3">
                Nơi sản xuất
              </th>
              <th scope="col" className="px-6 py-3">
                Năm sản xuất
              </th>
              <th scope="col" className="px-6 py-3">
                Trạng thái
              </th>
              <th scope="col" className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {mockDataCar.map((data, index) => (
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
                  {data.license}
                </td>
                <td
                  style={{ color: colors.greenAccent[300] }}
                  className="px-6 py-4">
                  {data.name}
                </td>
                <td
                  style={{ color: colors.greenAccent[300] }}
                  className="px-6 py-4">
                  {data.carCompany}
                </td>
                <td
                  style={{ color: colors.greenAccent[300] }}
                  className="px-6 py-4">
                  {data.origin}
                </td>
                <td
                  style={{ color: colors.greenAccent[300] }}
                  className="px-6 py-4">
                  {data.year}
                </td>
                <td
                  style={{ color: colors.greenAccent[300] }}
                  className="px-6 py-4">
                  {data.status}
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

      {
        get(isModalVisible, "open", true) && (
          <div className=" detail-modal flex-col">
            <Modal
              title={
                // classId ?
                // "Cập nhật thông tin lớp học"
                "Thêm mới xe"
              }
              open={get(isModalVisible, "open", true)}
              onCancel={handleCancel}
              onOk={handleReload}
              width={580}
              // style={{ backgroundColor: colors.blueAccent[800] }}
              footer={
                <>
                  <Button type="default" onClick={handleCancel} className="m-1">
                    Huỷ
                  </Button>
                  <Button onClick={form.submit}>
                    {classId ? "Lưu thay đổi" : "Thêm ngay"}
                  </Button>
                </>
              }
              >
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
                        message: "Vui lòng nhập tên lớp!",
                      },
                    ]}>
                    <span>Biển số xe</span>
                    <Input placeholder="Nhập biển số xe..." className=" p-2" />
                  </Form.Item>
                  <Form.Item name="" style={{ marginLeft: 16 }}>
                    <span>Hãng xe</span>
                    <Select
                      defaultValue="default"
                      style={{
                        zIndex: 9999,
                        width: 220,
                        height: 42,
                      }}
                      onChange={handleChange}>
                      <Option value="default">---Chọn hãng xe---</Option>
                      <Option value="lucy">Lucy</Option>
                      <Option value="disabled">Disabled</Option>
                      <Option value="Yiminghe">yiminghe</Option>
                    </Select>
                  </Form.Item>
                </div>
                <Form.Item name="">
                  <span>Nơi sản xuất</span>
                  <Input
                    value="Đức"
                    placeholder="Nhập nơi sản xuất"
                    className="text-black p-2"
                  />
                </Form.Item>
                <Form.Item name="">
                  <span>Năm sản xuất</span>
                  <Input
                    placeholder="Nhập nơi sản xuất"
                    type="date"
                    className="text-black p-2"
                  />
                </Form.Item>

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
    </div>
  );
}

export default Star;
