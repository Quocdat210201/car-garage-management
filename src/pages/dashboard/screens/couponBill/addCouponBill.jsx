import Modal from "antd/lib/modal/Modal";
import { tokens } from "../../../../theme";
import { useTheme } from "@mui/material";
import { Form, Input } from "antd/lib";
import AddIcon from "@mui/icons-material/Add";

const AddNewCouponBill = (props) => {
  const { handleCancel, handleReload, isEditMode, open } = props;
  console.log(props);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [form] = Form.useForm();
  const handleAddNew = () => {};
  return (
    <div className=" detail-modal flex-col">
      <Modal
        title={
          // classId ?
          // "Cập nhật thông tin lớp học"
          "Thêm mới phiếu nhập"
        }
        open={open}
        onCancel={handleCancel}
        onOk={handleReload}
        width={1000}
        // style={{ backgroundColor: colors.blueAccent[800] }}
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
              onClick={form.submit}>
              <span className="ml-1">Thêm</span>
            </button>
          </>
        }>
        <Form
          name="basic"
          className="max-w-full max-h-full align-center text-white p-5 rounded-[4px]">
          <div className="flex items-center justify-center">
            <Form.Item
              style={{ width: 300 }}
              name="id"
              // rules={[
              //   {
              //     required: true,
              //     message: "Vui lòng nhập tên khách hàng",
              //   },
              // ]}
            >
              <span>
                Mã phiếu nhập
                {/* <span style={{ color: "red" }}>*</span> */}
              </span>
              <Input
                placeholder=""
                //   value={carEdit.owner.name}
                className="p-2 "
                on
              />
            </Form.Item>
            <Form.Item
              style={{ width: 300, marginLeft: "16px" }}
              name="id"
              // rules={[
              //   {
              //     required: true,
              //     message: "Vui lòng nhập tên lớp!",
              //   },
              // ]}
            >
              <span>Nhà cung cấp</span>
              <Input
                placeholder="Chọn nhà cung cấp"
                className=" p-2 "
                //   value={carEdit.registrationNumber}
              />
            </Form.Item>
            <Form.Item
              style={{ width: 300, marginLeft: "16px" }}
              name="id"
              // rules={[
              //   {
              //     required: true,
              //     message: "Vui lòng nhập tên lớp!",
              //   },
              // ]}
            >
              <span>Ngày nhập</span>
              <Input
                placeholder="21/02/2024"
                className=" p-2 "
                //   value={carEdit.registrationNumber}
              />
            </Form.Item>
          </div>
          <div className="flex items-center justify-center">
            <Form.Item
              style={{ width: 300 }}
              name="id"
              // rules={[
              //   {
              //     required: true,
              //     message: "Vui lòng nhập tên lớp!",
              //   },
              // ]}
            >
              <span>Nhân viên thực hiện</span>
              <Input
                placeholder="Phan Quoc Dat"
                className=" p-2 "
                //   value={carEdit.registrationNumber}
              />
            </Form.Item>
            <Form.Item
              style={{ width: 300, marginLeft: "16px" }}
              name="id"
              // rules={[
              //   {
              //     required: true,
              //     message: "Vui lòng nhập tên lớp!",
              //   },
              // ]}
            >
              <span>Ngày tạo</span>
              <Input
                placeholder="21/02/2023"
                className=" p-2 "
                //   value={carEdit.registrationNumber}
              />
            </Form.Item>
            <Form.Item
              style={{ width: 300, marginLeft: "16px" }}
              name="id"></Form.Item>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-black">Phụ tùng</span>
            <button
              onClick={handleAddNew}
              className="text-black bg-[#ccc] w-[34px] h-[34px] rounded-full cursor-pointer">
              <AddIcon />
            </button>
          </div>
          <div className="border-t-[1px] mt-1 pt-6 flex justify-between">
            <Form.Item name="">
              <span>Tên phụ tùng</span>
              <Input
                rows={4}
                placeholder="Bánh xe"
                className="text-black p-2  "
                // value={carEdit.description}
              />
            </Form.Item>
            <Form.Item name="">
              <span>Mô tả</span>
              <Input
                rows={4}
                placeholder="Bánh xe BMW i3"
                className="text-black p-2  "
                // value={carEdit.description}
              />
            </Form.Item>
            <Form.Item
              style={{ width: 100, marginLeft: "16px" }}
              name="id"
              // rules={[
              //   {
              //     required: true,
              //     message: "Vui lòng nhập tên lớp!",
              //   },
              // ]}
            >
              <span>Số lượng</span>
              <Input
                type="number"
                placeholder="16"
                className="text-black p-2  "
                // value={carEdit.description}
              />
            </Form.Item>
            <Form.Item
              style={{ width: 120, marginLeft: "16px" }}
              name="id"
              // rules={[
              //   {
              //     required: true,
              //     message: "Vui lòng nhập tên lớp!",
              //   },
              // ]}
            >
              <span>Đơn giá </span>
              <Input
                type="number"
                placeholder="16"
                className="text-black p-2  "
                // value={carEdit.description}
              />
            </Form.Item>
            <Form.Item name="">
              <span>Ghi chú</span>
              <Input
                rows={4}
                placeholder="Ghi chu neu co"
                className="text-black p-2  "
                // value={carEdit.description}
              />
            </Form.Item>
          </div>
          <div className="flex justify-end">
          <Form.Item name="">
              <span>Tổng thanh toán</span>
              <Input
                rows={4}
                placeholder="1,000,000 VND"
                className="text-black p-2  "
                // value={carEdit.description}
              />
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default AddNewCouponBill;
