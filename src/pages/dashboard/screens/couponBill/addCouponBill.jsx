import Modal from "antd/lib/modal/Modal";
import { tokens } from "../../../../theme";
import { useTheme } from "@mui/material";
import { Form, Input } from "antd/lib";
import AddIcon from "@mui/icons-material/Add";
import { useState, useEffect } from "react";
import {
  getAccount,
  AdminGoodsDeliveryNote,
  getAutomotivePartSupplier,
  getAutomotivePartCategory,
  getAutomotivePart,
} from "../../../../service/UserService";
import { toast } from "react-toastify";
import * as TYPES from "../../common/constant";

const AddNewCouponBill = (props) => {
  const {
    handleCancel,
    handleReload,
    open,
    goodsDeliveryCode,
    getListCuoponBill,
  } = props;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [form] = Form.useForm();
  const handleAddNew = () => {};
  const listGoodsDeliveryNoteDetails = [];
  const [listStaff, setListStaff] = useState([]);
  const [listPart, setListPart] = useState([]);
  const [listPartSupplier, setListPartSupplier] = useState([]);
  const [listPartCategory, setListPartCategory] = useState([]);
  const [partCategoryId, setPartCategoryId] = useState("");
  const [partSupplierId, setPartSupplierId] = useState("");
  const [automotivePartId, setAutomotivePartId] = useState(null);

  const [deliveryData, setDeliveryData] = useState({
    goodsDeliveryCode: goodsDeliveryCode,
    receiveDate: "",
    staffId: "",
    goodsDeliveryNoteDetails: [
      {
        quantity: 0,
        price: 0,
        discount: 0,
        automotivePartId: automotivePartId,
      },
    ],
  });

  const getListStaff = async () => {
    try {
      const { data } = await getAccount(TYPES.STAFF_ROLE);
      setListStaff(data.data);
    } catch (error) {
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
    getListStaff();
    getlistPartSupplier();
    getlistPartCategory();
  }, []);

  useEffect(() => {
    // Khi component được render lần đầu tiên, có thể bạn muốn gán giá trị mặc định cho automotivePartId
    // Ví dụ, nếu muốn giá trị mặc định là giá trị của phần tử đầu tiên trong listPart
    if (listPart && listPart.length > 0 && automotivePartId === null) {
      setAutomotivePartId(listPart[0].id);
      // Cập nhật giá trị mặc định cho automotivePartId trong deliveryData
      setDeliveryData({
        ...deliveryData,
        goodsDeliveryNoteDetails: [
          {
            ...deliveryData.goodsDeliveryNoteDetails[0],
            automotivePartId: listPart[0].id,
          },
        ],
      });
    }
  }, [listPart, automotivePartId, deliveryData]);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;

    // Nếu input là một chi tiết của goodsDeliveryNoteDetails
    if (index !== undefined) {
      const updatedDetails = [...deliveryData.goodsDeliveryNoteDetails];
      updatedDetails[index][name] = value;

      // Cập nhật giá trị automotivePartId khi có thay đổi
      if (name === "automotivePartId") {
        setAutomotivePartId(value);
      }

      setDeliveryData({
        ...deliveryData,
        goodsDeliveryNoteDetails: updatedDetails,
      });
    } else {
      // Nếu input là ở mức cao hơn (không phải trong goodsDeliveryNoteDetails)
      setDeliveryData({
        ...deliveryData,
        [name]: value,
      });
    }
  };

  const handleSubmitDelivery = async () => {
    const res = await AdminGoodsDeliveryNote(deliveryData);
    toast.success("Thêm thành công!");
    getListCuoponBill();
    handleCancel();
    return res;
    // console.log({ deliveryData });
  };

  return (
    <div className=" detail-modal flex-col">
      <Modal
        title={"Thêm mới phiếu nhập"}
        open={open}
        onCancel={handleCancel}
        onOk={handleReload}
        width={1000}
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
              onClick={handleSubmitDelivery}>
              <span className="ml-1">Thêm</span>
            </button>
          </>
        }>
        <Form
          name="basic"
          className="max-w-full max-h-full align-center padding-x-10 text-white p-5 rounded-[4px]">
          <div className="flex items-center justify-center">
            <Form.Item style={{ width: 300 }} name="id">
              <span>Mã phiếu nhập</span>
              <Input
                placeholder=""
                className="p-2 "
                value={goodsDeliveryCode}
                disabled
              />
            </Form.Item>
            <Form.Item
              style={{ width: 300, marginLeft: 16, paddingTop: 20 }}
              name="id">
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
                  setDeliveryData({
                    ...deliveryData,
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
            <Form.Item style={{ width: 300, marginLeft: "16px" }} name="id">
              <span>Ngày nhập</span>
              <Input
                type="date"
                className=" p-2 "
                name="receiveDate"
                onChange={(e) => handleInputChange(e)}
              />
            </Form.Item>
          </div>
          <div className="flex justify-between items-center mt-6">
            <span className="text-black">Phụ tùng</span>
            <button
              onClick={handleAddNew}
              className="text-black bg-[#ccc] w-[34px] h-[34px] rounded-full cursor-pointer">
              <AddIcon />
            </button>
          </div>
          {deliveryData.goodsDeliveryNoteDetails.map((detail, index) => (
            <div
              className="border-t-[1px] mt-1 pt-6 flex justify-between"
              key={index}>
              <Form.Item name="">
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
              <Form.Item name="">
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
              <Form.Item name="">
                <span>Tên phụ tùng</span>
                <select
                  className="input-appoint text-14"
                  defaultValue="default"
                  name="automotivePartId"
                  onChange={(event) => {
                    const index = event.target.selectedIndex;
                    const optionElement = event.target.childNodes[index];
                    const optionElementId = optionElement.getAttribute("id");
                    setAutomotivePartId(optionElementId);

                    // Cập nhật giá trị automotivePartId trong deliveryData
                    setDeliveryData({
                      ...deliveryData,
                      goodsDeliveryNoteDetails: [
                        {
                          ...deliveryData.goodsDeliveryNoteDetails[0],
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
              <Form.Item style={{ width: 100, marginLeft: "16px" }} name="id">
                <span>Số lượng</span>
                <Input
                  type="number"
                  placeholder="16"
                  className="text-black p-2  "
                  name="quantity"
                  onChange={(e) => handleInputChange(e, index)}
                />
              </Form.Item>
              <Form.Item style={{ width: 120, marginLeft: "16px" }} name="id">
                <span>Đơn giá </span>
                <Input
                  type="number"
                  placeholder="16"
                  className="text-black p-2  "
                  name="price"
                  onChange={(e) => handleInputChange(e, index)}
                />
              </Form.Item>
            </div>
          ))}
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
    </div>
  );
};

export default AddNewCouponBill;
