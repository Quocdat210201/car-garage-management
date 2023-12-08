import { Form, Input } from 'antd/lib';
// import { DATE_FORMAT } from 'common/constant';
// import { formatDateTime } from 'common/utils';
// import { Date, MultipleSelection } from 'components';
import Date from "../../components/FFDate"
import moment from 'moment';

const CarForm = ({
    form = null,
    _class = {},
    addOrUpdateClass = () => {},
    studentSelection = [],
    teacherSelection = []
}) => {
    return (
        <Form
            name="basic"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            onFinish={addOrUpdateClass}
            autoComplete="off"
            form={form}
        >
            <Form.Item label="id" name="id" hidden={true} required={false}>
                <Input placeholder="id..." />
            </Form.Item>

            <Form.Item
                name="name"
                label="Tên lớp"
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập tên lớp!'
                    }
                ]}
            >
                <Input placeholder="Tên lớp..." />
            </Form.Item>

            <Form.Item label="Giáo viên" name="teacherIds">
                {/* <MultipleSelection placeholder="Giáo viên..." listSelectItem={teacherSelection} /> */}
            </Form.Item>

            <Form.Item label="Học sinh" name="studentIds">
                {/* <MultipleSelection placeholder="Học sinh..." listSelectItem={studentSelection} /> */}
            </Form.Item>

            <Form.Item label="Ngày bắt đầu" name="startDate">
                <Date
                    placeholder="Ngày bắt đầu..."
                    defaultValue={
                        _class.startDate 
                        // moment(formatDateTime(_class.startDate, DATE_FORMAT), DATE_FORMAT)
                    }
                />
            </Form.Item>

            <Form.Item label="Ngày kết thúc" name="endDate">
                <Date
                    placeholder="Ngày kết thúc..."
                    defaultValue={
                        _class.endDate 
                        // moment(formatDateTime(_class.endDate, DATE_FORMAT), DATE_FORMAT)
                    }
                />
            </Form.Item>
        </Form>
    );
};

export default CarForm;
