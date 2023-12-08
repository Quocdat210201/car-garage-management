import { Button, Form, Spin } from "antd/lib";
import Modal from "antd/lib/modal/Modal";
// import { BUTTON_GREEN_CLASS } from "common/class-name";
// import { DATE_API_FORMAT, SUCCESS_STATUS_CODE } from "common/constant";
// import { alertSuccessMessage, formatDateTime } from "common/utils";
import { find } from "lodash";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ClassForm from "./carForm";

const CarModal = ({
  classId,
  visible,
  onUpdated = () => {},
  onClose = () => {},
  getClassList = () => {},
  classList = [],
  studentSelection = [],
  teacherSelection = [],
}) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const _class = find(classList, { id: classId });
  const [loading, setLoading] = useState(false);
  return (
    <Modal
      title={classId ? "Cập nhật thông tin lớp học" : "Thêm mới lớp học"}
      open={visible}
      onCancel={onClose}
      onOk={onUpdated}
      width={580}
      footer={
        <>
          <Button type="default" onClick={onClose} className="m-1">
            Huỷ
          </Button>
          <Button onClick={form.submit}>
            {classId ? "Lưu thay đổi" : "Thêm ngay"}
          </Button>
        </>
      }>
      <Spin spinning={loading}>
        <ClassForm
          form={form}
          _class={_class}
          //   addOrUpdateClass={addOrUpdateClass}
          studentSelection={studentSelection}
          teacherSelection={teacherSelection}
        />
      </Spin>
    </Modal>
  );
};

export default CarModal;
