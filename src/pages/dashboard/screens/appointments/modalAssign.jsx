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

function ModalAssign(props) {
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
  const [form] = Form.useForm();
  const [carType, setCarType] = useState([]);
  const [listStaff, setListStaff] = useState([]);

  const [assignId, setAssignId] = useState(data.id);

  const [assign, setAssign] = useState({
    id: assignId,
    staffId: "",
    adminWorkDetail: "",
  });

  const handleChangeInput = (e) => {
    setAssign((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  // ham giao viec
  const handleSubmitAssign = async () => {
    try {
      const res = await AssignSchedule(assignId, assign);
      toast.success("Giao việc thành công", {
        position: "top-right",
        autoClose: 1000, // Đặt thời gian hiển thị trong 2 giây
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      });
      handleCancel();
      getDataAppoint();
      return res;
    } catch (error) {
      console.error();
    }
    console.log({ assign });
  };

  const getCarBrand = async () => {
    try {
      const { data } = await getcarTypeApi();
      setCarType(data.data);
    } catch {
      console.error();
    }
  };

  const getListStaff = async () => {
    try {
      const { data } = await getAccount(TYPES.STAFF_ROLE);
      setListStaff(data.data);
    } catch (error) {
      console.error();
    }
  };

  useEffect(() => {
    getCarBrand();
    getListStaff();
  }, []);
  const getCarTypeName = (carTypeId) => {
    const foundCarType = carType.find((item) => item.id === carTypeId);
    return foundCarType ? foundCarType.name : "";
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
            }}
            // GOij owr dday
            onClick={handleSubmitAssign}>
            <span className="ml-1">Giao việc</span>
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
          <Form.Item
            //   style={{ width: 450 }}
            name="id"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên lớp!",
              },
            ]}>
            <span>Loại xe</span>
            <select
              style={{ width: 180 }}
              className="input-appoint text-14 padding-10 opacity-8"
              defaultValue={data.car.carTypeId}
              name="carBrandId"
              id="carBrand"
              disabled={!isEditModal}>
              <option value="default">
                {getCarTypeName(data.car.carTypeId)}
              </option>
              {/* <option value="">{data.car.carTypeId}</option> */}
            </select>
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
              style={{ width: 420 }}
              placeholder="Chi tiết công việc"
              // value=""
              className="p-2 mr-6"
              name="adminWorkDetail"
              onChange={handleChangeInput}
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
              className="input-appoint text-14"
              defaultValue="default"
              name="staffId"
              id="staffId"
              onChange={(event) => {
                const index = event.target.selectedIndex;
                const optionElement = event.target.childNodes[index];
                const optionElementId = optionElement.getAttribute("id");
                console.log(optionElementId);
                setAssign({
                  ...assign,
                  staffId: optionElementId,
                });
              }}>
              <option value="default">--Chọn nhân viên--</option>
              {listStaff.map((item) => (
                <option key={item.id} id={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
}

export default ModalAssign;
