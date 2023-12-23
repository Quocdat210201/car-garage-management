import Modal from "antd/lib/modal/Modal";
import { tokens } from "../../../../theme";
import { useTheme } from "@mui/material";

function Delete(modalDelete, handleDelete, handleCancel) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  <Modal
    title="Xóa xe"
    open={modalDelete}
    onOk={handleDelete}
    onCancel={handleCancel}
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
          onClick={handleCancel}>
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
          onClick={handleDelete}>
          <span className="ml-1">Xóa</span>
        </button>
      </>
    }>
    <p>Bạn có chắc chắc muốn xóa?</p>
  </Modal>;
}

export default Delete;
