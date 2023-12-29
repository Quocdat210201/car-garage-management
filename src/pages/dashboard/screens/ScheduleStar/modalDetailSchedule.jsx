import Modal from "antd/lib/modal/Modal";
import { tokens } from "../../../../theme";
import { useTheme } from "@mui/material";
import { format, parseISO } from "date-fns";
import { Form, Input } from "antd/lib";
import { useState, useEffect } from "react";
import { getcarTypeApi, FinishAssign } from "../../../../service/UserService";
import { toast } from "react-toastify";

function ModalDetailSchedule(props) {
  const {
    isEditModal,
    handleCancel,
    toggleEditMode,
    dataWork,
    open,
    getListSchedule,
    staffId,
  } = props;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [form] = Form.useForm();
  const [carType, setCarType] = useState([]);
  const [assignId, setAssignId] = useState(dataWork.id);
  const [finishAssign, setFinishAssign] = useState({
    id: assignId,
    status: "",
  });
  const getCarType = async () => {
    try {
      const { data } = await getcarTypeApi();
      setCarType(data.data);
    } catch {
      console.error();
    }
  };

  useEffect(() => {
    getCarType();
  }, []);

  const getCarTypeName = (carTypeId) => {
    const foundCarType = carType.find((item) => item.id === carTypeId);
    return foundCarType ? foundCarType.name : "";
  };

  const handleSubmit = async () => {
    // console.log(finishAssign);
    try {
      const res = await FinishAssign(assignId, finishAssign);
      toast.success("Đã hoàn thành nhiệm vụ!", {
        position: "top-right",
        autoClose: 1000, // Đặt thời gian hiển thị trong 2 giây
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      });
      handleCancel();
      getListSchedule(staffId);

      return res;
    } catch (error) {
      console.error();
    }
  };

  return (
    <Modal
      title="Chi tiết giao việc"
      open={open}
      onCancel={handleCancel}
      width={900}
      footer={
        isEditModal ? (
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
                backgroundColor: colors.blueAccent[500],
                padding: "10px 16px",
                borderRadius: "4px",
                marginRight: "10px",
                marginTop: "0px",
                display: "inline-flex",
                justifyContent: "center",
                fontSize: "14px",
                alignItems: "center",
                color: "#fff",
              }}
              onClick={handleSubmit}>
              <span className="ml-1">Xác nhận</span>
            </button>
          </>
        ) : (
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
                backgroundColor: colors.blueAccent[500],
                padding: "10px 16px",
                borderRadius: "4px",
                marginRight: "10px",
                marginTop: "0px",
                display: "inline-flex",
                justifyContent: "center",
                fontSize: "14px",
                alignItems: "center",
                color: "#fff",
              }}
              onClick={toggleEditMode}>
              <span className="ml-1">Hoàn thành</span>
            </button>
          </>
        )
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
              value={dataWork && dataWork.car.owner.name}
              className="p-2 mr-6 border-none"
              disabled
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
              value={dataWork && dataWork.car.owner.phoneNumber}
              disabled
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
              Biển số xe
              {/* <span style={{ color: "red" }}>*</span> */}
            </span>
            <Input
              placeholder="Tên khách hàng"
              value={dataWork && dataWork.car.name}
              className="p-2 mr-6 border-none"
              disabled
              on
            />
          </Form.Item>
        </div>
        <div className="flex justify-between">
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
              style={{ width: 180, cursor: "not-allowed" }}
              className="input-appoint text-14 padding-10 opacity-8"
              defaultValue={dataWork.car.carTypeId}
              name="carBrandId"
              id="carBrand"
              disabled>
              <option value="default">
                {getCarTypeName(dataWork.car.carTypeId)}
              </option>
              {/* <option value="">{dataWork.car.carTypeId}</option> */}
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
                placeholder="01 Hàm Nghi"
                className=" p-2 border-none"
                value={dataWork.receiveCarAddress}
                disabled
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
              <span>Thời gian làm việc </span>
              <Input
                placeholder="09:00 - 11:00"
                className=" p-2 border-none"
                value={dataWork.receiveCarAddress}
                disabled
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
              <span>Ngày làm việc</span>
              <Input
                placeholder="21/02/2001"
                className=" p-2 border-none"
                value={dataWork.receiveCarAddress}
                disabled
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
              disabled
              style={{ width: 300 }}
              placeholder="Chi tiết công việc"
              className="p-2 mr-6"
              value={dataWork.adminWorkDetail}
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
            <Input
              disabled
              style={{ width: 200 }}
              placeholder="Phan Quoc Dat"
              value={dataWork.staff.name}
              className="p-2 mr-6"
              //   disabled
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
              Trạng thái
              {/* <span style={{ color: "red" }}>*</span> */}
            </span>
            <select
              style={{ width: 200 }}
              className={`input-appoint text-14 ${
                !isEditModal ? "cursor-not-allowed opacity-8" : ""
              }`}
              disabled={!isEditModal}
              onClick={(e) => {
                const value = e.target.value;
                if (value === "Chưa hoàn thành") {
                  setFinishAssign((prev) => ({
                    ...prev,
                    status: 1,
                  }));
                } else if (value === "Hoàn thành") {
                  setFinishAssign((prev) => ({
                    ...prev,
                    status: 2,
                  }));
                }
              }}>
              <option value="Chưa hoàn thành">Chưa hoàn thành</option>
              <option value="Hoàn thành">Hoàn thành</option>
            </select>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
}

export default ModalDetailSchedule;
