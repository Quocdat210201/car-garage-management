import Modal from "antd/lib/modal/Modal";
import { tokens } from "../../../../theme";
import { useTheme } from "@mui/material";
import { Form, Input } from "antd/lib";
import formatPhoneNumber from "../../components/FormatPhoneNumber";

function DetailModalAccount(props) {
  const { isEditModal, handleCancel, toggleEditMode, data, open } =
    props;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [form] = Form.useForm();
  return (
    <Modal
      title={"Chi tiết tài khoản"}
      open={open}
      width={580}
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
      }>
      <Form
        name="basic"
        className="max-w-full max-h-full align-center text-white p-5 rounded-[4px]">
        <Form.Item
          style={{ width: 450 }}
          name="id"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên khách hàng",
            },
          ]}>
          <span>
            Tên đăng nhập
            {/* <span style={{ color: "red" }}>*</span> */}
          </span>
          <Input
            placeholder="Tên khách hàng"
            value={data && data.name}
            className="p-2"
            disabled={!isEditModal}
            on
          />
        </Form.Item>
        <Form.Item
          style={{ width: 450 }}
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
            className=" p-2"
            // value={formatPhoneNumber(data && data.phoneNumber)}
            disabled={!isEditModal}
          />
        </Form.Item>
        <Form.Item name="">
          <span>Quyền</span>
          <select
            className="input-appoint text-14"
            // defaultValue={carEdit.carType.carBrandId}
            name="carBrandId"
            id="carBrand"
            disabled={!isEditModal}
            style={{
              zIndex: 9999,
              width: 450,
            }}
            // onChange={(event) => {
            //   const index = event.target.selectedIndex;
            //   const optionElement = event.target.childNodes[index];
            //   const optionElementId =
            //     optionElement.getAttribute("id");
            //   console.log(optionElementId);
            //   setCarBrandId(optionElementId);
            //   // console.log(`selected ${event.target.value}`);
            // }}
          >
            {/* <option value="default">{data && data.roles.toString()}</option> */}
            <option value="">Admin</option>
            <option value="">Customer</option>
            <option value="">Staff</option>
          </select>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default DetailModalAccount;
