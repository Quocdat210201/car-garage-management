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
  getListAutomotivePart,
  FinishAssignStaff,
  serviceApi,
} from "../../../../service/UserService";
import { toast } from "react-toastify";
import AddIcon from "@mui/icons-material/Add";
import { list } from "postcss";

function ModalFinishSchedule(props) {
  const { handleCancel, dataWork, open, getListSchedule, staffId } = props;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [form] = Form.useForm();
  const [carType, setCarType] = useState([]);
  const [assignId, setAssignId] = useState(dataWork.id);
  const [listPartSupplier, setListPartSupplier] = useState([]);
  const [listPartCategory, setListPartCategory] = useState([]);
  const [services, setServices] = useState([]);
  const [modalFinish, setModalFinish] = useState(false);
  const [part, setPart] = useState([]);
  const [repairServiceUpdateRequests, setRepairServiceUpdateRequests] =
    useState([
      {
        partSupplierId: "",
        listPart: [],
        automotivePartId: "",
        quantity: 0,
        repairServiceId: "",
      },
    ]);

  useEffect(() => {
    console.log({ repairServiceUpdateRequests });
  }, [repairServiceUpdateRequests]);
  const [finishAssign, setFinishAssign] = useState({
    id: assignId,
    staffWorkDetail: "",
    repairServiceUpdateRequests: [],
    status: 1,
  });

  const getService = async () => {
    try {
      const { data } = await serviceApi();
      setServices(data.data);
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

  const getCarType = async () => {
    try {
      const { data } = await getcarTypeApi();
      setCarType(data.data);
    } catch {
      console.error();
    }
  };

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

  const handleCancelModalFinish = () => {
    setModalFinish(false);
  };

  const showModalFinish = () => {
    setModalFinish(true);
  };

  const getlistPart = async (index, partCategoryId) => {
    try {
      var partSupplierId = repairServiceUpdateRequests[index].partSupplierId;
      const { data } = await getAutomotivePart(partCategoryId, partSupplierId);
      setRepairServiceUpdateRequests((prevData) =>
        prevData.map((item, i) =>
          i === index
            ? {
                ...item,
                listPart: data.data,
              }
            : item
        )
      );
    } catch (error) {
      console.error();
    }
  };

  useEffect(() => {
    getCarType();
    getlistPartSupplier();
    getlistPartCategory();
    getService();
    getListPart();
  }, []);

  const handleSubmit = async () => {
    try {
      var requestData = finishAssign;
      requestData.repairServiceUpdateRequests = repairServiceUpdateRequests;
      console.log({ requestData });
      const res = await FinishAssign(assignId, requestData);
      toast.success("Lưu thành công!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      });
      handleCancel();
      getListSchedule(staffId);
    } catch (error) {
      toast.error("Số lượng phụ tùng trong kho đã hết!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      });
    }
  };

  const handleFinishStaff = async () => {
    try {
      const res = await FinishAssignStaff(assignId);
      toast.success("Đã hoàn thành công việc!", {
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

  const getServiceName = (serviceId) => {
    const foundserviceName = services.find((item) => item.id === serviceId);
    return foundserviceName ? foundserviceName.name : "";
  };

  const getPartName = (automotivePartId) => {
    const foundCarType = part.find((item) => item.id === automotivePartId);
    return foundCarType ? foundCarType.name : "";
  };
  const handleAddNew = () => {
    const newRequest = {
      automotivePartId: null,
      quantity: 0,
      repairServiceId: null,
      partSupplierId: null,
      listPart: [],
    };
    setRepairServiceUpdateRequests((prevData) => [...prevData, newRequest]);
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    if (value) {
      setRepairServiceUpdateRequests((prevData) =>
        prevData.map((item, i) =>
          i === index
            ? {
                ...item,
                quantity: value,
              }
            : item
        )
      );
    }
  };

  return (
    <Modal
      title="Chi tiết công việc"
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
              onClick={handleSubmit}>
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
              onClick={showModalFinish}>
              <span className="ml-1">Hoàn thành</span>
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
          </>
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
            <span>Tên khách hàng</span>
            <Input
              placeholder="Tên khách hàng"
              value={dataWork && dataWork.car.owner.name}
              className="p-2 mr-6 border-none"
              disabled
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
              name=""
              value={dataWork ? dataWork.staffWorkDetail : null}
              // value={dataWork.quantity}
              onChange={(e) =>
                setFinishAssign({
                  ...finishAssign,
                  staffWorkDetail: e.target.value,
                })
              }
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
        {dataWork.appointmentScheduleDetails.map(
          (item, index) =>
            item.quantity > 0 && (
              <div className=" flex justify-start" key={index}>
                <Form.Item
                  style={{ width: 350 }}
                  name="id"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập tên khách hàng",
                    },
                  ]}>
                  <span>Dịch vụ</span>
                  <select
                    disabled
                    className="input-appoint text-14 cursor-not-allowed"
                    defaultValue="default"
                    name="repairServiceId">
                    <option>{getServiceName(item.repairServiceId)}</option>
                  </select>
                </Form.Item>
                <Form.Item name="" style={{ width: 250, marginLeft: "16px" }}>
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
                <Form.Item style={{ width: 100, marginLeft: "16px" }} name="id">
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
        {repairServiceUpdateRequests.map((detail, index) => (
          <div
            className="border-t-[1px] mt-1 pt-6 flex justify-between"
            key={index}>
            <Form.Item
              name="id"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên khách hàng",
                },
              ]}>
              <span>Dịch vụ</span>
              <select
                className="input-appoint text-14"
                defaultValue="default"
                name="repairServiceId"
                onChange={(event) => {
                  const repairServiceId = event.target.value;
                  setRepairServiceUpdateRequests((prevData) =>
                    prevData.map((item, i) =>
                      i === index
                        ? {
                            ...item,
                            repairServiceId,
                          }
                        : item
                    )
                  );
                }}>
                <option value="default">--Dịch vụ--</option>
                {dataWork &&
                  dataWork.appointmentScheduleDetails &&
                  dataWork.appointmentScheduleDetails.map((item) => (
                    <option
                      value={item.repairServiceId}
                      key={item.repairServiceId}
                      id={item.repairServiceId}>
                      {item.repairService.name}
                    </option>
                  ))}
              </select>
            </Form.Item>
            <Form.Item name="" style={{ width: 200, marginLeft: "16px" }}>
              <span>Nhà cung cấp</span>
              <select
                className="input-appoint text-14"
                defaultValue="default"
                onChange={(event) => {
                  const partSupplierId = event.target.value;
                  setRepairServiceUpdateRequests((prevData) =>
                    prevData.map((item, i) =>
                      i === index
                        ? {
                            ...item,
                            partSupplierId,
                          }
                        : item
                    )
                  );
                }}>
                <option value="default">--Chọn nhà cung cấp</option>
                {listPartSupplier.map((item) => (
                  <option key={item.id} id={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </Form.Item>
            <Form.Item name="" style={{ width: 200, marginLeft: "16px" }}>
              <span>Loại phụ tùng</span>
              <select
                className="input-appoint text-14"
                defaultValue="default"
                onChange={(event) => {
                  const partCategoryId = event.target.value;
                  getlistPart(index, partCategoryId);
                }}>
                <option value="default">--Chọn loại phụ tùng</option>
                {listPartCategory.map((item) => (
                  <option key={item.id} id={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </Form.Item>
            <Form.Item name="" style={{ width: 200, marginLeft: "16px" }}>
              <span>Tên phụ tùng</span>
              <select
                className="input-appoint text-14"
                defaultValue="default"
                name="automotivePartId"
                onChange={(event) => {
                  const automotivePartId = event.target.value;
                  console.log({ automotivePartId });
                  setRepairServiceUpdateRequests((prevData) =>
                    prevData.map((item, i) =>
                      i === index
                        ? {
                            ...item,
                            automotivePartId,
                          }
                        : item
                    )
                  );
                }}>
                <option value="default">--Chọn tên phụ tùng--</option>
                {detail.listPart.length > 0 &&
                  detail.listPart.map((item) => (
                    <option key={item.id} id={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </Form.Item>
            <Form.Item style={{ width: 80, marginLeft: "16px" }} name="id">
              <span>Số lượng</span>
              <Input
                type="number"
                className="text-black p-2  "
                name="quantity"
                rules={[{ required: true, message: "Please enter quantity" }]}
                onChange={(e) => handleInputChange(e, index)}
              />
            </Form.Item>
          </div>
        ))}
      </div>
      {modalFinish && (
        <Modal
          title="Xóa xe"
          open={modalFinish}
          onOk={handleFinishStaff}
          onCancel={handleCancelModalFinish}
          footer={
            <>
              <button
                type="submit"
                style={{
                  backgroundColor: colors.blueAccent[700],
                  padding: "6px 16px",
                  borderRadius: "4px",
                  marginRight: "10px",
                  marginTop: "0px",
                  display: "inline-flex",
                  justifyContent: "center",
                  fontSize: "14px",
                  alignItems: "center",
                }}
                onClick={handleCancelModalFinish}>
                <span className="ml-1">Hủy</span>
              </button>
              <button
                type="submit"
                style={{
                  backgroundColor: colors.blueAccent[700],
                  padding: "6px 16px",
                  borderRadius: "4px",
                  marginRight: "10px",
                  marginTop: "0px",
                  display: "inline-flex",
                  justifyContent: "center",
                  fontSize: "14px",
                  alignItems: "center",
                }}
                onClick={handleFinishStaff}>
                <span className="ml-1">Hoàn thành</span>
              </button>
            </>
          }>
          <p>Bạn có chắc chắc muốn hoàn thành ?</p>
        </Modal>
      )}
    </Modal>
  );
}

export default ModalFinishSchedule;
