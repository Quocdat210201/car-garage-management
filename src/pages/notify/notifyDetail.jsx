import { Link } from "react-router-dom";
import routerConfig from "../../config";
import { useEffect, useState } from "react";
import CurrencyPoundIcon from "@mui/icons-material/CurrencyPound";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  getNotificationDetail,
  getcarTypeApi,
  serviceApi,
  getListAutomotivePart,
} from "../../service/UserService";
import { Form, Input, Select } from "antd";
import { loadStripe } from "@stripe/stripe-js";
import formatCurrency from "../../components/formatMoney";

function NotifyDetail() {
  const cars = useSelector((state) => state);

  const { notifyId } = useParams();
  const [services, setServices] = useState([]);
  const [carType, setCarType] = useState([]);
  const [notifyDetail, setNotifyDetail] = useState([]);
  const [automoviPart, setAutomoviPart] = useState([]);

  const getNotifyDetail = async () => {
    try {
      const { data } = await getNotificationDetail(notifyId);
      setNotifyDetail(data.data);
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
  const getService = async () => {
    try {
      const { data } = await serviceApi();
      setServices(data.data);
    } catch {
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

  const getServicePrice = (serviceId) => {
    const foundserviceName = services.find((item) => item.id === serviceId);
    return foundserviceName ? foundserviceName.price : "";
  };

  useEffect(() => {
    getCarType();
    getService();
    getNotifyDetail();
  }, []);

  const handlePayment = async () => {
    const stripe = await loadStripe(
      "pk_test_51ObKGxJRGClQXLNL3aB9RhltKs0W0bPsg4suojeWDcpd7nryPl8Z0QtvuuvmqG7MUsZbiJ9qJRfshx0StW1OFH0l009WSsgsqW"
    );
  };

  return (
    <div className="">
      <div className="area-bg__inner">
        <div
          className="w-full h-[170px] bg-[#0000004d]"
          style={{
            backgroundImage: "url('../../src/assets/images/bg-menu.jpg')",
          }}>
          <div className=" flex justify-center h-full w-full">
            <div className="b-title-page__wrap text-white">
              <h1 className="b-title-page">THÔNG BÁO</h1>
              <div className="breadcrumb">
                <li className="breadcrumb-item text-[#d01818]">
                  <Link href="" to={routerConfig.home}>
                    Trang chủ{" "}
                  </Link>
                </li>
                <li className="breadcrumb-item flex items-center">
                  <Link href="">Thông báo</Link>
                </li>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 mb-16 px-[400px] ">
        <div className="flex justify-start items-center">
          <span className="block w-1.5 h-10 bg-[red]"></span>
          <h1 className="text-[20px] font-medium ml-2">Thông báo nhận xe</h1>
        </div>
        <Form className="mt-6">
          <div className="flex justify-between flex-col">
            <Form.Item>
              <div className="flex w-[600px] justify-between items-center">
                <span className="text-[18px]">
                  <strong>Biển số xe: </strong>
                </span>
                <span className="text-[18px]">
                  {notifyDetail.bill && notifyDetail.bill.car
                    ? notifyDetail.bill.car.registrationNumber
                    : ""}
                </span>
              </div>
            </Form.Item>
            <Form.Item>
              <div className="flex w-[600px] justify-between">
                <span className="text-[18px]">
                  <strong>Loại xe:</strong>{" "}
                </span>
                <span className="text-[18px]">
                  {notifyDetail.bill && notifyDetail.bill.car
                    ? getCarTypeName(notifyDetail.bill.car.carTypeId)
                    : ""}
                </span>
              </div>
            </Form.Item>
            <Form.Item>
              <div className="flex w-[600px] justify-between">
                <span className="text-[18px]">
                  <strong>Ngày tạo hóa đơn:</strong>
                </span>
                <span className="text-[18px]">
                  {notifyDetail.bill
                    ? notifyDetail.bill.returnCarDate.substring(0, 10)
                    : ""}
                </span>
              </div>
            </Form.Item>
            <Form.Item>
              <div className="flex w-[600px] flex-col">
                <div className="flex justify-between">
                  <span className="text-[18px]">
                    <strong>Dịch vụ thực hiện:</strong>
                  </span>
                  <span className="text-[18px]">
                    <strong>Chi phí:</strong>
                  </span>
                </div>
                <ul className="flex flex-col list-disc">
                  {notifyDetail &&
                    notifyDetail.bill &&
                    notifyDetail.bill.details &&
                    notifyDetail.bill.details.map((item, index) => (
                      <li
                        key={index}
                        className="flex justify-between ml-5 mt-2">
                        <span className="text-[18px]">
                          {getServiceName(item.repairServiceId)}
                        </span>
                        <span className="text-[18px]">
                          {formatCurrency(
                            getServicePrice(item.repairServiceId)
                          )}
                        </span>
                      </li>
                    ))}
                </ul>
              </div>
            </Form.Item>
          </div>

          <div className="w-full">
            <Form.Item>
              <span className="text-[18px]">
                <strong>Chi tiết sửa chữa</strong>
              </span>
              <Input.TextArea
                placeholder="Chi tiết công việc"
                // value=""
                className="p-2 mr-6 mt-2"
                name="adminWorkDetail"
                disabled
              />
            </Form.Item>
          </div>
          <div className="flex justify-between items-center text-black border-b-[1px] pb-2 mb-4 mt-10">
            <span className="text-[16px] ml-[-10px]">
              <strong>Phụ tùng thay thế</strong>
            </span>
          </div>
          {notifyDetail &&
            notifyDetail.bill &&
            notifyDetail.bill.details &&
            notifyDetail.bill.details.map((item, index) => (
              <div className="flex justify-between" key={index}>
                <Form.Item
                  style={{ width: 210 }}
                  name="id"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập tên lớp!",
                    },
                  ]}>
                  <span>Dịch vụ thực hiện</span>
                  <select
                    className="input-appoint text-14 padding-10 opacity-8 cursor-not-allowed"
                    name="carBrandId"
                    id="carBrand"
                    disabled>
                    {
                      <option value="default" key={index}>
                        {getServiceName(item.repairServiceId)}
                      </option>
                    }
                  </select>
                </Form.Item>
                <Form.Item
                  style={{ width: 250 }}
                  name="id"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập tên lớp!",
                    },
                  ]}>
                  <span>Tên phụ tùng</span>
                  <select
                    className="input-appoint text-14 padding-10 opacity-8 cursor-not-allowed"
                    name="carBrandId"
                    id="carBrand"
                    disabled>
                    <option value="">
                      {item.automotivePartInWarehouse.automotivePart.name}
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
                  <span>Số lượng</span>
                  <Input
                    disabled
                    type="number"
                    style={{ width: 100 }}
                    placeholder="Số lượng"
                    value={item.quantity}
                    className="p-2"
                    name="adminWorkDetail"
                  />
                </Form.Item>
                <Form.Item
                  name="id"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập tên khách hàng",
                    },
                  ]}>
                  <span>Đơn giá</span>
                  <Input
                    disabled
                    type="text"
                    style={{ width: 160 }}
                    placeholder="Đơn giá"
                    value={formatCurrency(
                      item.automotivePartInWarehouse.automotivePart.price
                    )}
                    className="p-2"
                    name="adminWorkDetail"
                  />
                </Form.Item>
                <Form.Item
                  name="id"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập tên khách hàng",
                    },
                  ]}>
                  <span>Thành tiền</span>
                  <Input
                    type="text"
                    style={{ width: 160 }}
                    placeholder="Thành tiền"
                    value={formatCurrency(
                      item.quantity *
                        item.automotivePartInWarehouse.automotivePart.price
                    )}
                    className="p-2"
                    name="adminWorkDetail"
                    disabled
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
                  <span className="text-[16px] font-bold">Tổng chi phí:</span>
                  <span className="text-[16px] font-bold ml-3">
                    {notifyDetail.bill
                      ? formatCurrency(notifyDetail.bill.total)
                      : ""}
                  </span>
                </div>
              </Form.Item>
            </Form.Item>
          </div>
        </Form>
        <div className="flex justify-end">
          <Link
            to={routerConfig.payment}
            className="bg-red-500 text-white py-2 px-4 rounded ">
            <CurrencyPoundIcon></CurrencyPoundIcon>
            <span className="text-[16px] ml-1">Thanh toán</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotifyDetail;
