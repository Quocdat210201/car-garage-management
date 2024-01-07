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
import * as TYPES from "../../common/constant";

function ModalDetail(props) {
  const {
    isEditModal,
    handleCancel,
    toggleEditMode,
    data,
    open,
    getDataAppoint,
  } = props;

  console.log({ data });
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [form] = Form.useForm();
  const [listStaff, setListStaff] = useState([]);

  const getListStaff = async () => {
    try {
      const { data } = await getAccount(TYPES.STAFF_ROLE);
      setListStaff(data.data);
    } catch (error) {
      console.error();
    }
  };

  useEffect(() => {
    getListStaff();
  }, []);

  const getStaffName = (staffid) => {
    const foundStaff = listStaff.find((item) => item.id === staffid);
    return foundStaff ? foundStaff.name : "";
  };

  return (
    <Modal
      title="Chi tiết giao việc"
      open={open}
      onCancel={handleCancel}
      width={780}
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
            }}>
            <span className="ml-1">Xóa</span>
          </button>
        </>
      }>
      <Form
        name="basic"
        className="max-w-full max-h-full align-center text-white p-5 rounded-[4px]">
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
              Tên khách hàng
              {/* <span style={{ color: "red" }}>*</span> */}
            </span>
            <Input
              placeholder="Tên khách hàng"
              value={data && data.car.owner.name}
              className="p-2 mr-6 border-none"
              disabled={!isEditModal}
              on
            />
          </Form.Item>
          <Form.Item
            //   style={{ width: 450 }}
            name="id"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên lớp!",
              },
            ]}>
            <span>Số điện thoại</span>
            <Input
              placeholder="Nhập số điện thoại"
              className=" p-2 border-none"
              value={data && data.car.owner.phoneNumber}
              disabled={!isEditModal}
            />
          </Form.Item>
          <Form.Item name="">
            <Form.Item
              //   style={{ width: 450 }}
              name="id"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên lớp!",
                },
              ]}>
              <span>Ngày hẹn</span>
              <Input
                placeholder="Nhập số điện thoại"
                className=" p-2 border-none"
                value={format(parseISO(data.appointmentDate), "dd/MM/yyyy")}
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
              Biển số xe
              {/* <span style={{ color: "red" }}>*</span> */}
            </span>
            <Input
              placeholder="Tên khách hàng"
              value={data && data.car.name}
              className="p-2 mr-6 border-none"
              disabled={!isEditModal}
              on
            />
          </Form.Item>

          <Form.Item name="">
            <Form.Item
              //   style={{ width: 450 }}
              name="id"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên lớp!",
                },
              ]}>
              <span>Địa chỉ </span>
              <Input
                placeholder="Nhập số điện thoại"
                className=" p-2 border-none"
                value={data.receiveCarAddress}
                disabled={!isEditModal}
              />
            </Form.Item>
          </Form.Item>

          <Form.Item name="">
            <Form.Item
              //   style={{ width: 450 }}
              name="id"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên lớp!",
                },
              ]}>
              <span>Yêu cầu của khách hàng</span>
              <Input.TextArea
                placeholder="Nhập số điện thoại"
                className=" p-2 border-none"
                value={data.content}
                disabled={!isEditModal}
              />
            </Form.Item>
          </Form.Item>
        </div>
        <div className="flex ">
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
              Chi tiết công việc
              {/* <span style={{ color: "red" }}>*</span> */}
            </span>
            <Input.TextArea
              disabled={!isEditModal}
              style={{ width: 420 }}
              placeholder="Chi tiết công việc"
              value={data.adminWorkDetail}
              className="p-2 mr-6"
              name="adminWorkDetail"
              //   onChange={handleChangeInput}
            />
          </Form.Item>
          <Form.Item
            style={{ width: 450, marginLeft: 14 }}
            name="id"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên lớp!",
              },
            ]}>
            <span>Nhân viên thực hiện</span>
            <select
              disabled={!isEditModal}
              className="input-appoint text-14"
              defaultValue="default"
              name="staffId"
              id="staffId"
              //   onChange={(event) => {
              //     const index = event.target.selectedIndex;
              //     const optionElement = event.target.childNodes[index];
              //     const optionElementId = optionElement.getAttribute("id");
              //     console.log(optionElementId);
              //     setAssign({
              //       ...assign,
              //       staffId: optionElementId,
              //     });
              //   }}
            >
              <option value="default">{getStaffName(data.staffId)}</option>
              {/* {listStaff.map((item) => (
                <option key={item.id} id={item.id}>
                  {item.name}
                </option>
              ))} */}
            </select>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
}

export default ModalDetail;
