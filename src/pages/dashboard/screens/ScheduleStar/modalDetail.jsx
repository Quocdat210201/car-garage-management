import Modal from "antd/lib/modal/Modal";
import { tokens } from "../../../../theme";
import { useTheme } from "@mui/material";
import { format, parseISO } from "date-fns";
import { Form, Input } from "antd/lib";
import { useState, useEffect } from "react";
import {
  getcarTypeApi,
  getListAutomotivePart,
} from "../../../../service/UserService";
import { toast } from "react-toastify";
import AddIcon from "@mui/icons-material/Add";

function ModalDetail(props) {
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
  const [carType, setCarType] = useState([]);
  const [part, setPart] = useState([]);

  const getCarType = async () => {
    try {
      const { data } = await getcarTypeApi();
      setCarType(data.data);
    } catch {
      console.error();
    }
  };

  const getListPart = async () => {
    try {
      const { data } = await getListAutomotivePart();
      setPart(data.data);
    } catch {
      console.error();
    }
  };
  useEffect(() => {
    getCarType();
    getListPart();
    // getlistPartSupplier();
    // getlistPartCategory();
  }, []);

  const getCarTypeName = (carTypeId) => {
    const foundCarType = carType.find((item) => item.id === carTypeId);
    return foundCarType ? foundCarType.name : "";
  };
  const getPartName = (automotivePartId) => {
    const foundCarType = part.find((item) => item.id === automotivePartId);
    return foundCarType ? foundCarType.name : "";
  };
  return (
    <Modal
      title="Chi tiết công việc"
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
        </>
      }>
      <Form
        name="basic"
        className="max-w-full max-h-full align-center text-white p-5 rounded-[4px] padding-x-10 mb-6">
        <span className="text-black text-[14px] ml-[-10px]">
          <strong>Thông tin khách hàng</strong>
        </span>
        <div className="flex justify-between">
          <Form.Item
            style={{ width: 150 }}
            name="id"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên khách hàng",
              },
            ]}>
            <span>Biển số xe</span>
            <Input
              placeholder="Tên khách hàng"
              value={dataWork && dataWork.car.name}
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
        </div>
        <Form.Item
          // style={{ width: 800 }}
          name="id"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên khách hàng",
            },
          ]}>
          <span>Chi tiết công việc</span>
          <Input.TextArea
            disabled
            style={{ width: "100%" }}
            placeholder="Chi tiết công việc"
            className="p-2 mr-6"
            value={dataWork.adminWorkDetail}
          />
        </Form.Item>
      </Form>

      <div className="align-center padding-x-10 p-5 border-t-[2px]">
        <div>
          <span className="text-black text-[14px] ml-[-10px]">
            <strong>Chi tiết công việc hoàn thành</strong>
          </span>
          <Form.Item
            style={{ marginTop: 20 }}
            name="id"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên khách hàng",
              },
            ]}>
            <span>Chi tiết công việc đã thực hiện</span>
            <Input.TextArea
              style={{ width: "100%" }}
              placeholder="Chi tiết công việc"
              className="p-2 mr-6"
              value={dataWork.staffWorkDetail}
            />
          </Form.Item>
        </div>
        <div className="flex justify-between items-center mt-6">
          <span className="text-black">Phụ tùng thay</span>
        </div>
        {dataWork.appointmentScheduleDetails.map(
          (item, index) =>
            item.quantity > 0 && (
              <div className=" pt-6 flex justify-start" key={index}>
                <Form.Item name="id" style={{ width: 350 }}>
                  <span>Dịch vụ</span>
                  <Input
                    className="input-appoint text-14"
                    value={item.repairService.name}
                    disabled={!isEditModal}
                  />
                </Form.Item>
                <Form.Item name="" style={{ width: 200, marginLeft: "16px" }}>
                  <span>Tên phụ tùng</span>
                  <select
                    disabled
                    className="input-appoint text-14 cursor-not-allowed"
                    defaultValue="default"
                    name="automotivePartId">
                    <option>
                      {getPartName(
                        item.automotivePartInWarehouse.automotivePartId
                      )}
                    </option>
                  </select>
                </Form.Item>
                <Form.Item style={{ width: 80, marginLeft: "16px" }} name="id">
                  <span>Số lượng</span>
                  <Input
                    disabled
                    type="number"
                    className="text-black p-2 cursor-not-allowed"
                    name="quantity"
                    value={item.quantity}
                  />
                </Form.Item>
              </div>
            )
        )}
      </div>
    </Modal>
  );
}

export default ModalDetail;
