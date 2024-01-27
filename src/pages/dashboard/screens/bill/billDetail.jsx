import Modal from "antd/lib/modal/Modal";
import { tokens } from "../../../../theme";
import { useTheme } from "@mui/material";
import { format, parseISO } from "date-fns";
import { Form, Input } from "antd/lib";
import { useState, useEffect } from "react";
import {
  getcarTypeApi,
  getAccount,
  serviceApi,
  getListAutomotivePart,
} from "../../../../service/UserService";
import { toast } from "react-toastify";
import AddIcon from "@mui/icons-material/Add";
import * as TYPES from "../../common/constant";
import formatCurrency from "../../components/formatMoney";

function BillDetail(props) {
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
  const [carType, setCarType] = useState([]);
  const [listStaff, setListStaff] = useState([]);
  const [services, setServices] = useState([]);
  const [automoviPart, setAutomoviPart] = useState([]);
  console.log({ data });

  const getCarType = async () => {
    try {
      const { data } = await getcarTypeApi();
      setCarType(data.data);
    } catch {
      console.error();
    }
  };

  const getAutomotivePart = async () => {
    try {
      const { data } = await getListAutomotivePart();
      setAutomoviPart(data.data);
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

  const getService = async () => {
    try {
      const { data } = await serviceApi();
      setServices(data.data);
    } catch {
      console.error();
    }
  };

  useEffect(() => {
    getCarType();
    getListStaff();
    getService();
    getAutomotivePart();
  }, []);

  const getCarTypeName = (carTypeId) => {
    const foundCarType = carType.find((item) => item.id === carTypeId);
    return foundCarType ? foundCarType.name : "";
  };

  const getStaffName = (staffId) => {
    const foundStaffName = listStaff.find((item) => item.id === staffId);
    return foundStaffName ? foundStaffName.name : "";
  };

  const getServiceName = (serviceId) => {
    const foundserviceName = services.find((item) => item.id === serviceId);
    return foundserviceName ? foundserviceName.name : "";
  };

  const getServicePrice = (serviceId) => {
    const foundserviceName = services.find((item) => item.id === serviceId);
    return foundserviceName ? foundserviceName.price : "";
  };

  const getAutomotivePartName = (automoviPartId) => {
    const foundserviceName = automoviPart.find(
      (item) => item.id === automoviPartId
    );
    return foundserviceName ? foundserviceName.name : "";
  };

  return (
    <Modal
      title="Hóa đơn"
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
            <span className="ml-1">Chỉnh sửa</span>
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
              value={data && data.car.registrationNumber}
              className="p-2 mr-6"
              disabled={!isEditModal}
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
              name="carBrandId"
              id="carBrand"
              disabled={!isEditModal}>
              <option value="default">
                {getCarTypeName(data.car.carTypeId)}
              </option>
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
            <Input
              placeholder="Biển số xe"
              value={getStaffName(data.staffId)}
              className="p-2 mr-6"
              disabled={!isEditModal}
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
            <span>Ngày tạo hóa đơn</span>
            <Input
              type="date"
              className=" p-2"
              value={data.returnCarDate.substring(0, 10)}
              disabled={!isEditModal}
            />
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
              value={data && data.customer.name}
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
              value={data && data.customer.phoneNumber}
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
                value={data.customer.address}
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
                value={data.receiveCarDate.substring(0, 10)}
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
                value={data.returnCarDate.substring(0, 10)}
                disabled={!isEditModal}
              />
            </Form.Item>
          </Form.Item>
        </div>

        <div className="w-full">
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
              // style={{ width: 620 }}
              placeholder="Chi tiết công việc"
              // value=""
              className="p-2 mr-6"
              name="adminWorkDetail"
              //   onChange={handleChangeInput}
            />
          </Form.Item>
        </div>
        <div className="flex justify-between items-center text-black border-b-[1px] pb-2 mb-4 mt-10">
          <span className="text-[16px] ml-[-10px]">
            <strong>Chi tiết hóa đơn</strong>
          </span>
          {/* <div className="bg-[#ccc] rounded-full p-2 w-10 h-10 flex justify-center items-center">
            <AddIcon />
          </div> */}
        </div>
        {data &&
          data.details &&
          data.details.map(
            (item, index) =>
              item.quantity > 0 && (
                <div className="flex justify-between" key={index}>
                  <Form.Item
                    style={{ width: 210 }}
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
                      {
                        <option value="default" key={index}>
                          {getServiceName(item.repairServiceId)}
                        </option>
                      }
                    </select>
                  </Form.Item>
                  <Form.Item
                    style={{ width: 250 }}
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
                      name="carBrandId"
                      id="carBrand"
                      disabled={!isEditModal}>
                      <option value="">
                        {item.automotivePartInWarehouse
                          ? getAutomotivePartName(
                              item.automotivePartInWarehouse.automotivePartId
                            )
                          : ""}
                      </option>
                    </select>
                  </Form.Item>
                  <Form.Item
                    name="id"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập tên khách hàng",
                      },
                    ]}>
                    <span>Số lượng</span>
                    <Input
                      type="number"
                      style={{ width: 100 }}
                      placeholder="Số lượng"
                      value={item.quantity}
                      className="p-2"
                      name="adminWorkDetail"
                    />
                  </Form.Item>
                  <Form.Item
                    name="id"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập tên khách hàng",
                      },
                    ]}>
                    <span>Đơn giá</span>
                    <Input
                      type="text"
                      style={{ width: 160 }}
                      placeholder="Đơn giá"
                      value={
                        item.automotivePartInWarehouse
                          ? formatCurrency(
                              item.automotivePartInWarehouse.receivePrice
                            )
                          : ""
                      }
                      className="p-2"
                      name="adminWorkDetail"
                    />
                  </Form.Item>
                  <Form.Item
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
                      type="text"
                      style={{ width: 160 }}
                      placeholder="Thành tiền"
                      value={
                        item.automotivePartInWarehouse
                          ? formatCurrency(
                              item.quantity *
                                item.automotivePartInWarehouse.receivePrice
                            )
                          : ""
                      }
                      className="p-2"
                      name="adminWorkDetail"
                      //   onChange={handleChangeInput}
                    />
                  </Form.Item>
                </div>
              )
          )}
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
                  {formatCurrency(data.total)}
                </span>
              </div>
            </Form.Item>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
}

export default BillDetail;
