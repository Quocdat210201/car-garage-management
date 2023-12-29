import Modal from "antd/lib/modal/Modal";
import { tokens } from "../../../../theme";
import { useTheme } from "@mui/material";
import { Form, Input } from "antd/lib";
import AddIcon from "@mui/icons-material/Add";

const DetailCouponBill = (props) => {
  const { handleCancel, handleReload, isEditMode, toggleEditMode, open } =
    props;
  console.log(props);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [form] = Form.useForm();
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
          className="max-w-full max-h-full align-center text-white p-5 rounded-[4px]">
          <div className="flex items-center justify-center">
            <Form.Item
              style={{ width: 300 }}
              name="id"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên khách hàng",
                },
              ]}>
              <span>
                Mã phiếu nhập
                {/* <span style={{ color: "red" }}>*</span> */}
              </span>
              <Input
                placeholder="PNPT01"
                //   value={carEdit.owner.name}
                className="p-2 "
                disabled={!isEditMode}
                on
              />
            </Form.Item>
            <Form.Item
              style={{ width: 300, marginLeft: "16px" }}
              name="id"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên lớp!",
                },
              ]}>
              <span>Nhà cung cấp</span>
              <Input
                placeholder="Cty Phụ Tùng"
                className=" p-2 "
                //   value={carEdit.registrationNumber}
                disabled={!isEditMode}
              />
            </Form.Item>
            <Form.Item
              style={{ width: 300, marginLeft: "16px" }}
              name="id"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên lớp!",
                },
              ]}>
              <span>Ngày nhập</span>
              <Input
                placeholder="21/02/2024"
                className=" p-2 "
                //   value={carEdit.registrationNumber}
                disabled={!isEditMode}
              />
            </Form.Item>
          </div>
          <div className="flex items-center justify-center">
            <Form.Item
              style={{ width: 300 }}
              name="id"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên lớp!",
                },
              ]}>
              <span>Nhân viên thực hiện</span>
              <Input
                placeholder="Phan Quoc Dat"
                className=" p-2 "
                //   value={carEdit.registrationNumber}
                disabled={!isEditMode}
              />
            </Form.Item>
            <Form.Item
              style={{ width: 300, marginLeft: "16px" }}
              name="id"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên lớp!",
                },
              ]}>
              <span>Ngày tạo</span>
              <Input
                placeholder="21/02/2023"
                className=" p-2 "
                //   value={carEdit.registrationNumber}
                disabled={!isEditMode}
              />
            </Form.Item>
            <Form.Item
              style={{ width: 300, marginLeft: "16px" }}
              name="id"
              >
              {/* <span>Ngày tạo</span>
                    <Input
                      placeholder="21/02/2023"
                      className=" p-2 "
                      //   value={carEdit.registrationNumber}
                      disabled={!isEditMode}
                    /> */}
            </Form.Item>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-black">Phụ tùng</span>
            <button className="text-black bg-[#ccc] w-[34px] h-[34px] rounded-full cursor-pointer">
              <AddIcon />
            </button>
          </div>
          <div className="border-t-[1px] mt-1 pt-6 flex justify-between">
            <Form.Item name="">
              <span>Tên phụ tùng</span>
              <Input
                disabled={!isEditMode}
                rows={4}
                placeholder="Bánh xe"
                className="text-black p-2  "
                // value={carEdit.description}
              />
            </Form.Item>
            <Form.Item name="">
              <span>Mô tả</span>
              <Input
                disabled={!isEditMode}
                rows={4}
                placeholder="Bánh xe BMW i3"
                className="text-black p-2  "
                // value={carEdit.description}
              />
            </Form.Item>
            <Form.Item
              style={{ width: 100, marginLeft: "16px" }}
              name="id"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên lớp!",
                },
              ]}>
              <span>Số lượng</span>
              <Input
                disabled={!isEditMode}
                rows={4}
                placeholder="16"
                className="text-black p-2  "
                // value={carEdit.description}
              />
            </Form.Item>
            <Form.Item
              style={{ width: 120, marginLeft: "16px" }}
              name="id"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên lớp!",
                },
              ]}>
              <span>Đơn giá </span>
              <Input
                disabled={!isEditMode}
                rows={4}
                placeholder="16"
                className="text-black p-2  "
                // value={carEdit.description}
              />
            </Form.Item>
            <Form.Item name="">
              <span>Ghi chú</span>
              <Input
                disabled={!isEditMode}
                rows={4}
                placeholder="Ghi chu neu co"
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

export default DetailCouponBill;
