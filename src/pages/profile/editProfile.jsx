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

const EditProfile = ({ open, handleCancel, handleReload }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isEditMode, setIsEditMode] = useState(false);
  const [user, setUser] = useState({
    name: "",
    phoneNumber: "",
    dateOfBirth: new Date(),
    email: "",
    address: "",
  });

  const handleInputChange = (event, field) => {
    setUser({
      ...user,
      [field]: event.target.value,
    });
  };

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const { data } = await userApi();
      setUser(data);
    } catch {
      console.error();
    }
  };

  const handleUpdateUser = async () => {
    try {
      await updateUserApi(user);
      toast.success("Lưu thành công !");
      handleCancel();
      window.location.reload()
      getUser(); // Fetch updated user data
    } catch (error) {
      toast.error("Error updating user information");
      console.error(error);
    }
    // console.log({ user });
  };
  return (
    <>
      <Modal
        title={
          // classId ?
          // "Cập nhật thông tin lớp học"
          "Chi tiết xe"
        }
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
              onClick={handleUpdateUser}>
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
              value={user && user.name}
              className="p-2"
              on
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
            {/* <input
              // selected={formattedDateString}
              type="date"
              value={user.dateOfBirth}
              onChange={(date) => {
                console.log(date);
                setUser({
                  ...user,
                  dateOfBirth: date,
                });
                // setSelectedDate(date)
              }}
              // showTimeSelect
              // timeFormat="HH:mm"
              // timeIntervals={15}
              // timeCaption="time"
              // dateFormat="dd/MM/yyyy"
              className="w-full border-[1px] border-[#d9d9d9] rounded-[6px] p-2"
            /> */}
          </Form.Item>

          <Form.Item name="">
            <span>Số điện thoại</span>
            <Input
              placeholder="Nhập số điện thoại..."
              onChange={(event) => handleInputChange(event, "phoneNumber")}
              className=" p-2"
              value={user && user.phoneNumber}
            />
          </Form.Item>
          <Form.Item name="">
            <span>Email</span>
            <Input
              placeholder="Nhập email..."
              className=" p-2"
              onChange={(event) => handleInputChange(event, "email")}
              value={user && user.email}
            />
          </Form.Item>
          <Form.Item name="">
            <span>Địa chỉ</span>
            <Input
              onChange={(event) => handleInputChange(event, "address")}
              value={user && user.address}
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
