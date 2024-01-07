import Modal from "antd/lib/modal/Modal";
import { tokens } from "../../../../theme";
import { useTheme } from "@mui/material";
import { Form, Input } from "antd/lib";
import AddIcon from "@mui/icons-material/Add";
import { format, parseISO } from "date-fns";
import formatCurrency from "../../components/formatMoney";

const DetailCouponBill = (props) => {
  const {
    handleCancel,
    handleReload,
    isEditMode,
    toggleEditMode,
    open,
    data,
    listPartCategory,
  } = props;
  console.log(data);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [form] = Form.useForm();
  console.log({ listPartCategory });

  const getName = (id) => {
    const categoryName = listPartCategory.find((item) => item.id === id);
    return categoryName ? categoryName.name : "";
  };
  return (
    <div className=" detail-modal flex-col">
      <Modal
        title={
          // classId ?
          // "Cập nhật thông tin lớp học"
          "Chi tiết phiếu nhập"
        }
        open={open}
        onCancel={handleCancel}
        onOk={handleReload}
        width={1000}
        // style={{ backgroundColor: colors.blueAccent[800] }}
        footer={
          isEditMode ? (
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
                onClick={form.submit}>
                <span className="ml-1">Lưu</span>
              </button>
            </>
          ) : (
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
              onClick={toggleEditMode}>
              <span className="ml-1">Chỉnh sửa</span>
            </button>
          )
          // <>
          //   <Button type="default" onClick={handleCancel} className="m-1">
          //   <span className="ml-1">Hủy</span>
          //   </Button>
          //   <Button onClick={form.submit}>
          //    <span>Lưu thay đổi</span>
          //   </Button>
          // </>
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
                value={data.goodsDeliveryCode}
                disabled
              />
            </Form.Item>
            <Form.Item
              style={{ width: 300, marginLeft: 16, paddingTop: 20 }}
              name="id">
              <span>Nhân viên thực hiện</span>
              <select
                disabled={!isEditMode}
                className="input-appoint text-14"
                defaultValue="default"
                name="staffId"
                id="staffId"
                // onChange={(event) => {
                //   const index = event.target.selectedIndex;
                //   const optionElement = event.target.childNodes[index];
                //   const optionElementId = optionElement.getAttribute("id");
                //   console.log(optionElementId);
                //   setDeliveryData({
                //     ...deliveryData,
                //     staffId: optionElementId,
                //   });
                // }}
              >
                <option value="default"> {data.staff.name}</option>
                {/* {listStaff.map((item) => (
                  <option key={item.id} id={item.id}>
                    {data.staff.name}
                  </option>
                ))} */}
              </select>
            </Form.Item>
            <Form.Item style={{ width: 300, marginLeft: "16px" }} name="id">
              <span>Ngày nhập</span>
              <Input
                type="text"
                className=" p-2 "
                name="receiveDate"
                value={format(parseISO(data.receiveDate), "dd/MM/yyyy")}
                disabled={!isEditMode}
                // onChange={(e) => handleInputChange(e)}
              />
            </Form.Item>
          </div>
          <div className="flex justify-between items-center mt-6">
            <span className="text-black">Phụ tùng</span>
            <button
              // onClick={handleAddNew}
              className="text-black bg-[#ccc] w-[34px] h-[34px] rounded-full cursor-pointer">
              <AddIcon />
            </button>
          </div>
          {/* {deliveryData.goodsDeliveryNoteDetails.map((detail, index) => ( */}
          {data.goodsDeliveryNoteDetails.map((item, index) => (
            <div
              className="border-t-[1px] mt-1 pt-6 flex justify-between"
              key={index}>
              <Form.Item name="" style={{ width: 160 }}>
                <span>Nhà cung cấp</span>
                <select
                  disabled={!isEditMode}
                  className="input-appoint text-14"
                  defaultValue="default">
                  <option value="default">
                    {
                      item.automotivePartInWarehouse.automotivePart
                        .automotivePartSupplier.name
                    }
                  </option>
                </select>
              </Form.Item>
              <Form.Item name="" style={{ width: 200, marginLeft: "16px" }}>
                <span>Loại phụ tùng</span>
                <select
                  disabled={!isEditMode}
                  className="input-appoint text-14"
                  defaultValue="default">
                  <option value="default">
                    {getName(
                      item.automotivePartInWarehouse.automotivePart.categoryId
                    )}
                  </option>
                </select>
              </Form.Item>
              <Form.Item name="" style={{ width: 200, marginLeft: "16px" }}>
                <span>Tên phụ tùng</span>
                <select
                  disabled={!isEditMode}
                  className="input-appoint text-14"
                  defaultValue="default"
                  name="automotivePartId">
                  <option value="default">
                    {item.automotivePartInWarehouse.automotivePart.name}
                  </option>
                </select>
              </Form.Item>
              <Form.Item style={{ width: 100, marginLeft: "16px" }} name="id">
                <span>Số lượng</span>
                <Input
                  disabled={!isEditMode}
                  type="number"
                  placeholder="16"
                  className="text-black p-2  "
                  name="quantity"
                  value={item.receiveNumber}
                />
              </Form.Item>
              <Form.Item style={{ width: 120, marginLeft: "16px" }} name="id">
                <span>Đơn giá </span>
                <Input
                  disabled={!isEditMode}
                  type="text"
                  placeholder="16"
                  className="text-black p-2  "
                  name="price"
                  value={formatCurrency(item.price)}
                />
              </Form.Item>
            </div>
          ))}
          {/* ))} */}
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

export default DetailCouponBill;
