import Modal from "antd/lib/modal/Modal";
import { tokens } from "../../../../theme";
import { useTheme } from "@mui/material";
import { format, parseISO } from "date-fns";
import { Form, Input } from "antd/lib";
import { useState, useEffect } from "react";
import {
  getcarTypeApi,
  getAccount,
  AssignSchedule,
} from "../../../../service/UserService";
import { toast } from "react-toastify";
import AddIcon from "@mui/icons-material/Add";

function AddNewBill(props) {
  const {
    isEditModal,
    handleCancel,
    toggleEditMode,
    data,
    open,
    getDataAppoint,
  } = props;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Modal
      title="Chi tiết hóa đơn"
      open={open}
      onCancel={handleCancel}
      width={1100}
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
            // GOij owr dday
            // onClick={handleSubmitAssign}
          >
            <span className="ml-1">Lưu</span>
          </button>
        </>
      }>
      <Form
        name="basic"
        className="max-w-full max-h-full align-center text-white rounded-[4px] padding-x-10">
        <div className="flex justify-between">
          <Form.Item
            //   style={{ width: 450 }}
            name="id"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên khách hàng",
              },
            ]}>
            <span>
              Biển số xe
              {/* <span style={{ color: "red" }}>*</span> */}
            </span>
            <Input
              placeholder="Biển số xe"
              value={data && data.car.name}
              className="p-2 mr-6"
              disabled={!isEditModal}
              on
            />
          </Form.Item>
          <Form.Item
            style={{ width: 210, marginLeft: 40, paddingTop: 5 }}
            name="id"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên lớp!",
              },
            ]}>
            <span>Loại xe</span>
            <select
              className="input-appoint text-14 padding-10 opacity-8"
              // defaultValue={data.car.carTypeId}
              name="carBrandId"
              id="carBrand"
              disabled={!isEditModal}>
              <option value="default">
                {/* {getCarTypeName(data.car.carTypeId)} */}
              </option>
              {/* <option value="">{data.car.carTypeId}</option> */}
            </select>
          </Form.Item>
          <Form.Item
            style={{ width: 210, marginLeft: 40, paddingTop: 5 }}
            name="id"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên lớp!",
              },
            ]}>
            <span>Dịch vụ thực hiện</span>
            <select
              className="input-appoint text-14 padding-10 opacity-8"
              // defaultValue={data.car.carTypeId}
              name="carBrandId"
              id="carBrand"
              disabled={!isEditModal}>
              <option value="default">
                {/* {getCarTypeName(data.car.carTypeId)} */}
              </option>
              {/* <option value="">{data.car.carTypeId}</option> */}
            </select>
          </Form.Item>
          <Form.Item
            style={{ width: 210, marginLeft: 40 }}
            name="id"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên lớp!",
              },
            ]}>
            <span>Nhân viên thực hiện</span>
            <select
              className="input-appoint text-14"
              defaultValue="default"
              name="staffId"
              id="staffId"
              onChange={(event) => {
                const index = event.target.selectedIndex;
                const optionElement = event.target.childNodes[index];
                const optionElementId = optionElement.getAttribute("id");
                console.log(optionElementId);
                // setAssign({
                //   ...assign,
                //   staffId: optionElementId,
                // });
              }}>
              {/* <option value="default">--Chọn nhân viên--</option> */}
              {/* {listStaff && listStaff.map((item) => (
                <option key={item.id} id={item.id}>
                  {item.name}
                </option>
              ))} */}
            </select>
          </Form.Item>
        </div>
        <div className="flex">
          <Form.Item
            style={{ width: 210 }}
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
              value={data && data.car.owner.name}
              className="p-2 mr-6"
              disabled={!isEditModal}
              on
            />
          </Form.Item>
          <Form.Item
            style={{ width: 210, marginLeft: 40 }}
            name="id"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên lớp!",
              },
            ]}>
            <span>Số điện thoại</span>
            <Input
              placeholder="Số điện thoại"
              className=" p-2"
              value={data && data.car.owner.phoneNumber}
              disabled={!isEditModal}
            />
          </Form.Item>
          <Form.Item name="">
            <Form.Item
              style={{ width: 180, marginLeft: 40 }}
              name="id"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên lớp!",
                },
              ]}>
              <span>Địa chỉ </span>
              <Input
                placeholder="Địa chỉ"
                className=" p-2"
                // value={data.receiveCarAddress}
                disabled={!isEditModal}
              />
            </Form.Item>
          </Form.Item>
          <Form.Item name="">
            <Form.Item
              style={{ width: 170, marginLeft: 40 }}
              name="id"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên lớp!",
                },
              ]}>
              <span>Ngày nhận xe</span>
              <Input
                type="date"
                className=" p-2"
                // value={data.receiveCarAddress}
                disabled={!isEditModal}
              />
            </Form.Item>
          </Form.Item>
          <Form.Item name="">
            <Form.Item
              style={{ width: 170, marginLeft: 40 }}
              name="id"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên lớp!",
                },
              ]}>
              <span>Ngày trả xe </span>
              <Input
                type="date"
                className=" p-2"
                // value={data.receiveCarAddress}
                disabled={!isEditModal}
              />
            </Form.Item>
          </Form.Item>
        </div>

        <div className="flex justify-between">
          <Form.Item
            //   style={{ width: 450 }}
            name="id"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên khách hàng",
              },
            ]}>
            <span>
              Chi tiết sửa chửa
              {/* <span style={{ color: "red" }}>*</span> */}
            </span>
            <Input.TextArea
              style={{ width: 620 }}
              placeholder="Chi tiết công việc"
              // value=""
              className="p-2 mr-6"
              name="adminWorkDetail"
              //   onChange={handleChangeInput}
            />
          </Form.Item>
          <Form.Item name="">
            <Form.Item
              style={{ marginTop: 60, marginLeft: 40 }}
              name="id"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên lớp!",
                },
              ]}>
              <div className="flex ">
                <span
                  className="text-[16px] font-bold"
                  style={{ color: colors.greenAccent[300] }}>
                  Chi phí dịch vụ:
                </span>
                <span
                  className="text-[16px] font-bold ml-3"
                  style={{ color: colors.greenAccent[300] }}>
                  {" "}
                  1.499.000 VND
                </span>
              </div>
              {/* <Input
              type="number"
                placeholder=""
                className=" p-2"
                // value={data.receiveCarAddress}
                disabled={!isEditModal}
              /> */}
            </Form.Item>
          </Form.Item>
        </div>
        <div className="flex justify-between items-center text-black border-b-[1px] pb-2 mb-4">
          <span className="text-[16px] ml-[-10px]">
            <strong>Phụ tùng thay thế</strong>
          </span>
          <div className="bg-[#ccc] rounded-full p-2 w-10 h-10 flex justify-center items-center">
            <AddIcon />
          </div>
        </div>
        <div className="flex justify-between">
          <Form.Item
            style={{ width: 210 }}
            name="id"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên lớp!",
              },
            ]}>
            <span>Loại phụ tùng</span>
            <select
              className="input-appoint text-14 padding-10 opacity-8"
              // defaultValue={data.car.carTypeId}
              name="carBrandId"
              id="carBrand"
              disabled={!isEditModal}>
              <option value="default">
                {/* {getCarTypeName(data.car.carTypeId)} */}
              </option>
              {/* <option value="">{data.car.carTypeId}</option> */}
            </select>
          </Form.Item>
          <Form.Item
            style={{ width: 210 }}
            name="id"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên lớp!",
              },
            ]}>
            <span>Tên phụ tùng</span>
            <select
              className="input-appoint text-14 padding-10 opacity-8"
              // defaultValue={data.car.carTypeId}
              name="carBrandId"
              id="carBrand"
              disabled={!isEditModal}>
              <option value="default">
                {/* {getCarTypeName(data.car.carTypeId)} */}
              </option>
              {/* <option value="">{data.car.carTypeId}</option> */}
            </select>
          </Form.Item>
          <Form.Item
            //   style={{ width: 450 }}
            name="id"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên khách hàng",
              },
            ]}>
            <span>
              Số lượng
              {/* <span style={{ color: "red" }}>*</span> */}
            </span>
            <Input
              type="number"
              style={{ width: 100 }}
              placeholder="Số lượng"
              // value=""
              className="p-2"
              name="adminWorkDetail"
              //   onChange={handleChangeInput}
            />
          </Form.Item>
          <Form.Item
            //   style={{ width: 450 }}
            name="id"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên khách hàng",
              },
            ]}>
            <span>
              Đơn giá
              {/* <span style={{ color: "red" }}>*</span> */}
            </span>
            <Input
              type="number"
              style={{ width: 180 }}
              placeholder="Đơn giá"
              // value=""
              className="p-2"
              name="adminWorkDetail"
              //   onChange={handleChangeInput}
            />
          </Form.Item>
          <Form.Item
            //   style={{ width: 450 }}
            name="id"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên khách hàng",
              },
            ]}>
            <span>
              Thành tiền
              {/* <span style={{ color: "red" }}>*</span> */}
            </span>
            <Input
              type="number"
              style={{ width: 180 }}
              placeholder="Thành tiền"
              // value=""
              className="p-2"
              name="adminWorkDetail"
              //   onChange={handleChangeInput}
            />
          </Form.Item>
        </div>
        <div>
          <Form.Item className="flex justify-end">
            <Form.Item
              style={{ marginTop: 16 }}
              name="id"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên lớp!",
                },
              ]}>
              <div className="flex ">
                <span
                  className="text-[16px] font-bold"
                  style={{ color: colors.greenAccent[300] }}>
                  Tổng chi phí:
                </span>
                <span
                  className="text-[16px] font-bold ml-3"
                  style={{ color: colors.greenAccent[300] }}>
                  {" "}
                  1.499.000 VND
                </span>
              </div>
            </Form.Item>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
}

export default AddNewBill;
