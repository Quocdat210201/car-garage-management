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
  FinishAssignStaff,
} from "../../../../service/UserService";
import { toast } from "react-toastify";
import AddIcon from "@mui/icons-material/Add";
import { list } from "postcss";

function ModalFinishSchedule(props) {
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
  // const [listPart, setListPart] = useState({});
  const [listPartSupplier, setListPartSupplier] = useState([]);
  const [listPartCategory, setListPartCategory] = useState([]);
  const [automotivePartId, setAutomotivePartId] = useState(null);
  const [errors, setErrors] = useState([]);
  const [repairServiceUpdateRequests, setRepairServiceUpdateRequests] = useState([{
    partSupplierId: "",
    listPart: [],
    automotivePartId: "",
    quantity: 0,
    repairServiceId: "",
  }]);

  const [finishAssign, setFinishAssign] = useState({
    id: assignId,
    staffWorkDetail: "",
    repairServiceUpdateRequests: [],
    status: 1,
  });

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

  const getlistPart = async (index, partCategoryId) => {
    try {
      var partSupplierId = repairServiceUpdateRequests[index].partSupplierId;
      const { data } = await getAutomotivePart(
        partCategoryId,
        partSupplierId
      );
      setRepairServiceUpdateRequests((prevData) => (
        prevData.map(
          (item, i) =>
            i === index
              ? {
                  ...item,
                  listPart: data.data,
                }
              : item
        )
      ))
    } catch (error) {
      console.error();
    }
  };

  useEffect(() => {
    getCarType();
    getlistPartSupplier();
    getlistPartCategory();
  }, []);

  const handleSubmit = async () => {
    console.log({ finishAssign });
    // try {
    //   const res = await FinishAssign(assignId, finishAssign);
    //   toast.success("Lưu thành công!", {
    //     position: "top-right",
    //     autoClose: 1000, // Đặt thời gian hiển thị trong 2 giây
    //     hideProgressBar: true,
    //     closeOnClick: true,
    //     pauseOnHover: false,
    //     draggable: true,
    //   });
    //   // handleCancel();
    //   getListSchedule(staffId);

    //   return res;
    // } catch (error) {
    //   console.error();
    // }
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

  const handleAddNew = () => {
    // Tạo một đối tượng mới với các giá trị khởi tạo
    const newRequest = {
      automotivePartId: null,
      quantity: 0,
      repairServiceId: null,
      partSupplierId: null, // Thêm biến riêng cho nhà cung cấp
      listPart: [],
    };
    
    setRepairServiceUpdateRequests((prevData) => ([
      ...prevData,
      newRequest
   ]))
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;

    // Nếu input là một chi tiết của goodsDeliveryNoteDetails
    if (value) {
      const updatedDetails = [...finishAssign.repairServiceUpdateRequests];
      updatedDetails[index][name] = value;

      setRepairServiceUpdateRequests((prevData) => (
        prevData.map(
          (item, i) =>
            i === index
              ? {
                  ...item,
                  quantity: value
                }
              : item
        )
      ));
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
              onClick={handleFinishStaff}>
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
              value={dataWork.quantity}
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
        {repairServiceUpdateRequests.map((detail, index) => (
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
                name="repairServiceId"
                onChange={(event) => {
                  const index = event.target.selectedIndex - 1;
                  const repairServiceId =
                    // event.target.childNodes[index].getAttribute("id");
                    event.target.value;
                    setRepairServiceUpdateRequests((prevData) => (
                      prevData.map(
                        (item, i) =>
                          i === index
                            ? {
                                ...item,
                                repairServiceId
                              }
                            : item
                      )
                    ));
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
            <Form.Item name="" style={{ width: 250, marginLeft: "16px" }}>
              <span>Nhà cung cấp</span>
              <select
                className="input-appoint text-14"
                defaultValue="default"
                onChange={(event) => {
                  const partSupplierId = event.target.value;
                  setRepairServiceUpdateRequests((prevData) => (
                    prevData.map(
                      (item, i) =>
                        i === index
                          ? {
                              ...item,
                              partSupplierId
                            }
                          : item
                    )
                  ))
                }}>
                <option value="default">--Chọn nhà cung cấp</option>
                {listPartSupplier.map((item) => (
                  <option key={item.id} id={item.id} value={item.id}>
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
                  const partCategoryId =
                    event.target.value;
                    getlistPart(index, partCategoryId)

                }}>
                <option value="default">--Chọn loại phụ tùng</option>
                {listPartCategory.map((item) => (
                  <option key={item.id} id={item.id} value={item.id}>
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
                  const index = event.target.selectedIndex - 1;
                  const automotivePartId =
                    // event.target.childNodes[index].getAttribute("id");
                    event.target.value;
                  console.log({ automotivePartId });
                  setRepairServiceUpdateRequests((prevData) => (
                    prevData.map(
                      (item, i) =>
                        i === index
                          ? {
                              ...item,
                              automotivePartId
                            }
                          : item
                    )
                  ));
                }}>
                <option value="default">--Chọn tên phụ tùng--</option>
                {detail.listPart.length > 0 &&
                  detail.listPart.map(
                    (item) => (
                      <option key={item.id} id={item.id} value={item.id}>
                        {item.name}
                      </option>
                    )
                  )}
              </select>
            </Form.Item>
            <Form.Item style={{ width: 150, marginLeft: "16px" }} name="id">
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
    </Modal>
  );
}

export default ModalFinishSchedule;
