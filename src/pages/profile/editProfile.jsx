import * as React from "react";
import { useState, useEffect } from "react";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { Form, Input, Select, Button, TextArea } from "antd/lib";
import Modal from "antd/lib/modal/Modal";
import { format, parseISO, isValid } from "date-fns";
import DatePicker from "react-datepicker";
import { userApi, updateUserApi } from "../../service/UserService";
import { toast } from "react-toastify";

const EditProfile = ({
  data,
  open,
  handleCancel,
  handleReload,
  handleUpdateUser,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isEditMode, setIsEditMode] = useState(false);
  const [user, setUser] = useState(data);

  const handleInputChange = (event, field) => {
    setUser({
      ...user,
      [field]: event.target.value,
    });
  };


  return (
    <>
      <Modal
        title={"Chi tiết xe"}
        open={open}
        onCancel={handleCancel}
        onOk={handleReload}
        width={500}
        // style={{ backgroundColor: colors.blueAccent[800] }}
        footer={
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
              onClick={() => handleUpdateUser(user)}
              >
              <span className="ml-1">Lưu</span>
            </button>
          </>
        }>
        <Form
          name="basic"
          className="max-w-full max-h-full align-center text-white p-5 rounded-[4px]">
          <Form.Item
            name="id"
            onChange={(event) => handleInputChange(event, "name")}
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên khách hàng",
              },
            ]}>
            <span>
              Họ vè tên
              {/* <span style={{ color: "red" }}>*</span> */}
            </span>
            <Input
              placeholder="Họ và tên"
              value={user.name}
              className="p-2"
              onChange={(event) => handleInputChange(event, "dateOfBirth")}
            />
          </Form.Item>
          <Form.Item
            name="id"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên lớp!",
              },
            ]}>
            <span>Ngày sinh</span>
            <input
              type="date"
              placeholder="Ngày sinh"
              value={user.dateOfBirth}
              onChange={(event) => handleInputChange(event, "dateOfBirth")}
              className="w-full border-[1px] border-[#d9d9d9] rounded-[6px] p-2"
            />
          </Form.Item>

          <Form.Item name="">
            <span>Số điện thoại</span>
            <Input
              placeholder="Nhập số điện thoại..."
              onChange={(event) => handleInputChange(event, "phoneNumber")}
              className=" p-2"
              value={user.phoneNumber}
            />
          </Form.Item>
          <Form.Item name="">
            <span>Email</span>
            <Input
              placeholder="Nhập email..."
              className=" p-2"
              onChange={(event) => handleInputChange(event, "email")}
              value={user.email}
            />
          </Form.Item>
          <Form.Item name="">
            <span>Địa chỉ</span>
            <Input
              onChange={(event) => handleInputChange(event, "address")}
              value={user.address}
              placeholder="Địa chỉ"
              className="text-black p-2"
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EditProfile;
