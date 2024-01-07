import Modal from "antd/lib/modal/Modal";
import { tokens } from "../../../../theme";
import { useTheme } from "@mui/material";
import { format, parseISO } from "date-fns";
import { Form, Input } from "antd/lib";
import { useState, useEffect } from "react";
import {
  getcarTypeApi,
  FinishAssign,
  getAutomotivePartSupplier,
  getAutomotivePartCategory,
  getAutomotivePart,
} from "../../../../service/UserService";
import { toast } from "react-toastify";
import AddIcon from "@mui/icons-material/Add";

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
  console.log({ dataWork });
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [form] = Form.useForm();
  const [carType, setCarType] = useState([]);
  const [assignId, setAssignId] = useState(dataWork.id);
  const [listPart, setListPart] = useState([]);
  const [listPartSupplier, setListPartSupplier] = useState([]);
  const [listPartCategory, setListPartCategory] = useState([]);
  const [partCategoryId, setPartCategoryId] = useState("");
  const [partSupplierId, setPartSupplierId] = useState("");
  const [repairServiceId, setRepairServiceId] = useState();
  const [automotivePartId, setAutomotivePartId] = useState(null);
  const [finishAssign, setFinishAssign] = useState({
    id: assignId,
    repairServiceUpdateRequests: [
      {
        automotivePartId: "",
        quantity: 0,
        repairServiceId: repairServiceId,
      },
    ],
    status: 2,
  });

  console.log({ repairServiceId });
  const getCarType = async () => {
    try {
      const { data } = await getcarTypeApi();
      setCarType(data.data);
    } catch {
      console.error();
    }
  };

  console.log({ dataWork });
  const getlistPartSupplier = async () => {
    try {
      const { data } = await getAutomotivePartSupplier();
      setListPartSupplier(data.data);
    } catch (error) {
      console.error();
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
    const getlistPart = async () => {
      try {
        const { data } = await getAutomotivePart(
          partCategoryId,
          partSupplierId
        );
        setListPart(data.data);
      } catch (error) {
        console.error();
      }
    };
    getlistPart();
  }, [partCategoryId, partSupplierId]);

  useEffect(() => {
    getCarType();
    getlistPartSupplier();
    getlistPartCategory();
  }, []);

  const handleAddNew = () => {};

  const handleSubmit = async () => {
    console.log(finishAssign);
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

  const getCarTypeName = (carTypeId) => {
    const foundCarType = carType.find((item) => item.id === carTypeId);
    return foundCarType ? foundCarType.name : "";
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;

    // Nếu input là một chi tiết của goodsDeliveryNoteDetails
    if (index !== undefined) {
      const updatedDetails = [...finishAssign.repairServiceUpdateRequests];
      updatedDetails[index][name] = value;

      // Cập nhật giá trị automotivePartId khi có thay đổi
      if (name === "automotivePartId") {
        setAutomotivePartId(value);
      }

      setFinishAssign({
        ...finishAssign,
        repairServiceUpdateRequests: updatedDetails,
      });
    } else {
      // Nếu input là ở mức cao hơn (không phải trong goodsDeliveryNoteDetails)
      setFinishAssign({
        ...finishAssign,
        [name]: value,
      });
    }
  };

  return (
    <Modal
      title="Chi tiết giao việc"
      open={open}
      onCancel={handleCancel}
      width={1100}
      footer={
        dataWork.status === 1 ? (
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
              <span className="ml-1">Lưu</span>
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
              <span className="ml-1">Hoàn thành</span>
            </button>
          </>
        ) : dataWork.status === 2 ? (
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
              <span className="ml-1">Lưu</span>
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
        ) : (
          <></>
        )
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
          <span>
            Chi tiết công việc
            {/* <span style={{ color: "red" }}>*</span> */}
          </span>
          <Input.TextArea
            disabled
            style={{ width: "100%" }}
            placeholder="Chi tiết công việc"
            className="p-2 mr-6"
            value={dataWork.adminWorkDetail}
          />
        </Form.Item>
      </Form>

      {dataWork.status === 1 ? (
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
                // value={dataWork.adminWorkDetail}
              />
            </Form.Item>
          </div>
          <div className="flex justify-between items-center mt-6">
            <span className="text-black">Phụ tùng thay</span>
            <button
              onClick={handleAddNew}
              className="text-black bg-[#ccc] w-[34px] h-[34px] rounded-full cursor-pointer">
              <AddIcon />
            </button>
          </div>
          {finishAssign.repairServiceUpdateRequests.map((detail, index) => (
            <div
              className="border-t-[1px] mt-1 pt-6 flex justify-between"
              key={index}>
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
                  Dịch vụ
                  {/* <span style={{ color: "red" }}>*</span> */}
                </span>
                <select
                  className="input-appoint text-14"
                  defaultValue="default"
                  name="automotivePartId"
                  onChange={(event) => {
                    const index = event.target.selectedIndex;
                    const optionElement = event.target.childNodes[index];
                    const optionElementId = optionElement.getAttribute("id");
                    console.log({ optionElementId });
                    setRepairServiceId(optionElementId);

                    // Cập nhật giá trị automotivePartId
                    setFinishAssign({
                      ...finishAssign,
                      repairServiceUpdateRequests: [
                        {
                          ...finishAssign.repairServiceUpdateRequests[0],
                          repairServiceId: optionElementId,
                        },
                      ],
                    });
                  }}>
                  <option value="default">--Dịch vụ--</option>
                  {dataWork && dataWork.appointmentScheduleDetails && 
                    dataWork.appointmentScheduleDetails.map((item) => (
                      <option key={item.repairServiceId} id={item.repairServiceId}>
                        {item.repairService.name}
                      </option>
                    ))}
                </select>
              </Form.Item>
              <Form.Item name="" style={{ width: 250, marginLeft: "16px" }}>
                <span>Nhà cung cấp</span>
                <select
                  className="input-appoint text-14"
                  defaultValue="default"
                  onChange={(event) => {
                    const index = event.target.selectedIndex;
                    const optionElement = event.target.childNodes[index];
                    const optionElementId = optionElement.getAttribute("id");
                    console.log(optionElementId);
                    setPartSupplierId(optionElementId);
                  }}>
                  <option value="default">--Chọn nhà cung cấp</option>
                  {listPartSupplier.map((item) => (
                    <option key={item.id} id={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </Form.Item>
              <Form.Item name="" style={{ width: 250, marginLeft: "16px" }}>
                <span>Loại phụ tùng</span>
                <select
                  className="input-appoint text-14"
                  defaultValue="default"
                  onChange={(event) => {
                    const index = event.target.selectedIndex;
                    const optionElement = event.target.childNodes[index];
                    const optionElementId = optionElement.getAttribute("id");
                    console.log(optionElementId);
                    setPartCategoryId(optionElementId);
                  }}>
                  <option value="default">--Chọn loại phụ tùng</option>
                  {listPartCategory.map((item) => (
                    <option key={item.id} id={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </Form.Item>
              <Form.Item name="" style={{ width: 250, marginLeft: "16px" }}>
                <span>Tên phụ tùng</span>
                <select
                  className="input-appoint text-14"
                  defaultValue="default"
                  name="automotivePartId"
                  onChange={(event) => {
                    const index = event.target.selectedIndex;
                    const optionElement = event.target.childNodes[index];
                    const optionElementId = optionElement.getAttribute("id");
                    console.log({ optionElementId });
                    setAutomotivePartId(optionElementId);

                    // Cập nhật giá trị automotivePartId
                    setFinishAssign({
                      ...finishAssign,
                      repairServiceUpdateRequests: [
                        {
                          ...finishAssign.repairServiceUpdateRequests[0],
                          automotivePartId: optionElementId,
                        },
                      ],
                    });
                  }}>
                  <option value="default">--Chọn tên phụ tùng</option>
                  {listPart &&
                    listPart.map((item) => (
                      <option key={item.id} id={item.id}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </Form.Item>
              <Form.Item style={{ width: 150, marginLeft: "16px" }} name="id">
                <span>Số lượng</span>
                <Input
                  type="number"
                  placeholder="16"
                  className="text-black p-2  "
                  name="quantity"
                  onChange={(e) => handleInputChange(e, index)}
                />
              </Form.Item>
              {/* <Form.Item style={{ width: 120, marginLeft: "16px" }} name="id">
              <span>Đơn giá </span>
              <Input
                type="number"
                placeholder="16"
                className="text-black p-2  "
                name="price"
                onChange={(e) => handleInputChange(e, index)}
              />
            </Form.Item> */}
            </div>
          ))}
        </div>
      ) : (
        <></>
      )}
    </Modal>
  );
}

export default ModalDetailSchedule;
