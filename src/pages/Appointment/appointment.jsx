import { Link, NavLink, useNavigate } from "react-router-dom";
import routerConfig from "../../config";
import { FaCheck } from "react-icons/fa";
import SendAppoint from "./sendAppoint";
import { useEffect, useState } from "react";
import Modal from "antd/lib/modal/Modal";
const { Option } = Select;
import { toast } from "react-toastify";

import {
  apiProvinceDistrict,
  apiProvinceWard,
  apiAppointmentSchedule,
  serviceApi,
  carBrandApi,
  carTypeApi,
  userApi,
  getCarRegistrationNumber,
} from "../../service/UserService";
import DatePicker from "react-datepicker";
import { set } from "date-fns";
import { Form, Input, Select, Button, Radio } from "antd";

function Appointment() {
  const [districts, setDistricts] = useState([]);
  const [district, setDistrict] = useState("");
  const [wards, setWards] = useState([]);
  const [ward, setWard] = useState("");
  const [reset, setReset] = useState(false);
  const [service, setService] = useState("");
  const [services, setServices] = useState([]);
  const [carBrand, setCarBrand] = useState([]);
  const [carBrandId, setCarBrandId] = useState("");
  const [carType, setCarType] = useState([]);
  const [user, setUser] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const [registration, setRegistration] = useState("");
  const [carInfo, setCarInfo] = useState([]);
  const navigate = useNavigate();

  const { Option } = Select;
  const FormItem = Form.Item;
  const { TextArea } = Input;
  const [form] = Form.useForm();

  const validationRules = {
    registrationNumber: [
      {
        required: true,
        message: "Vui lòng nhập biển số xe!",
      },
    ],
    phoneNumber: [
      {
        required: true,
        message: "Vui lòng nhập số điện thoại!",
      },
    ],
    name: [
      {
        required: true,
        message: "Vui lòng nhập họ tên đầy đủ!",
      },
    ],
    email: [
      {
        required: true,
        message: "Vui lòng nhập email!",
      },
    ],
    address: [
      {
        required: true,
        message: "Vui lòng nhập số nhà!",
      },
    ],
    service: [
      {
        required: true,
        message: "Vui lòng chọn ít nhất 1 dịch vụ!",
      },
    ],
  };

  const [dataAppointment, setDataAppointment] = useState({
    phoneNumber: "",
    email: "",
    userName: "",
    address: "",
    appointmentScheduleDate: new Date(),
    note: "",
    registrationNumber: "",
    carTypeId: "",
    carBrandId: "",
    manufacturingYear: "",
    repairServiceIds: [],
    receiveCarAt: 1,
  });

  const handleChangeInput = (e) => {
    setDataAppointment((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const getService = async () => {
    try {
      const { data } = await serviceApi();
      setServices(data.data);
    } catch {
      console.error();
    }
  };

  const getCarBrand = async () => {
    try {
      const { data } = await carBrandApi();
      setCarBrand(data.data);
    } catch {
      console.error();
    }
  };

  useEffect(() => {
    const getCarType = async () => {
      setIsLoading(true);
      try {
        const { data } = await carTypeApi(carBrandId);
        setCarType(data.data);
        setIsLoading(false);
      } catch {
        console.error();
        setIsLoading(false);
      }
    };
    getCarType();
  }, [carBrandId]);

  useEffect(() => {
    const getInfoCar = async () => {
      setIsLoading(true);
      try {
        const { data } = await getCarRegistrationNumber(registration);
        setCarInfo(data.data);
        setIsLoading(false);
      } catch {
        console.error();
        setIsLoading(false);
      }
    };
    getInfoCar();
  }, [registration]);

  const getUser = async () => {
    try {
      const { data } = await userApi();
      setUser(data);
    } catch {
      console.error();
    }
  };

  useEffect(() => {
    getService();
    getCarBrand();
    getUser();
  }, []);

  useEffect(() => {
    setDistrict(null);
    const fetchPublicDistrict = async () => {
      const response = await apiProvinceDistrict();
      if (response.status === 200) {
        setDistricts(response.data?.data);
      }
    };
    fetchPublicDistrict();
    setDistricts([]);
  }, []);

  useEffect(() => {
    const fetchPublicWard = async () => {
      const response = await apiProvinceWard(district);
      if (response.status === 200) {
        setWards(response.data?.data);
      }
    };
    district && fetchPublicWard();
    !district ? setReset(true) : setReset(false);
    !district && setDistricts([]);
  }, [district]);

  const handleSubmitAppointment = async () => {
    try {
      await form.validateFields();
      const res = await apiAppointmentSchedule(dataAppointment);
      navigate("/send-success");
    } catch (errorInfo) {
      console.log("Validation Failed:", errorInfo);
    }
  };

  const showDialog = () => {};

  const handleChange = (event) => {
    const index = event.target.selectedIndex;
    const optionElement = event.target.childNodes[index];
    const optionElementId = optionElement.getAttribute("id");

    setDistrict(optionElementId);
    setDataAppointment({
      ...dataAppointment,
      repairServiceIds: [optionElementId],
      wardId: optionElementId,
    });
  };

  const getCarBrandName = (carBrandId) => {
    const foundCarBrand = carBrand.find((item) => item.id === carBrandId);
    return foundCarBrand ? foundCarBrand.name : "";
  };

  const carBrandOptions = carBrand.map((item) => (
    <Select.Option key={item.id} value={item.id}>
      {item.name}
    </Select.Option>
  ));

  const carTypeOptions = carType.map((item) => (
    <Select.Option key={item.id} value={item.id}>
      {item.name}
    </Select.Option>
  ));

  const validatePhoneNumber = (_, value) => {
    const phoneRegex = /^[0-9]{10,11}$/;
    if (!value || phoneRegex.test(value)) {
      return Promise.resolve();
    }
    return Promise.reject("Số điện thoại không hợp lệ");
  };

  const validateEmail = (_, value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value || emailRegex.test(value)) {
      return Promise.resolve();
    }
    return Promise.reject("Email không hợp lệ");
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
              <h1 className="b-title-page">ĐẶT LỊCH HẸN</h1>
              <div className="breadcrumb">
                <li className="breadcrumb-item text-[#d01818]">
                  <Link href="" to={routerConfig.home}>
                    Trang chủ{" "}
                  </Link>
                </li>
                <li className="breadcrumb-item flex items-center">
                  <Link href="">Đặt lịch hẹn</Link>
                </li>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 mb-16 px-[400px] ">
        <div className="flex justify-start items-center">
          <span className="block w-1.5 h-10 bg-[red]"></span>
          <h1 className="text-[20px] font-medium ml-2">
            Đặt lịch hẹn với chúng tôi
          </h1>
        </div>
        <Form>
          <div className="">
            <div className="flex items-center pt-8">
              <div className=" flex h-[28px] w-16">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/5/55/Yemen_Coast_Guard_racing_stripe.svg"
                  alt=""
                />
              </div>
              <h1 className="text-[20px] font-medium ml-2">Thông tin xe</h1>
            </div>
            <div className="flex">
              <div className="flex flex-col w-1/3 mt-4 pl-8">
                <label
                  className="text-[18px] mb-2"
                  style={{ fontSize: "18px" }}>
                  Biển số xe <span style={{ color: "red" }}>*</span>
                </label>
                <FormItem
                  name="registrationNumber"
                  rules={validationRules.registrationNumber}>
                  <Input
                    type="text"
                    placeholder="Nhập biển số xe"
                    className="input-appoint"
                    name="registrationNumber"
                    onChange={handleChangeInput}
                  />
                </FormItem>
              </div>
              <div className="flex flex-col w-1/3 mt-4 pl-8">
                <label
                  className="text-[18px] mb-2"
                  style={{ fontSize: "18px" }}>
                  Hãng xe{" "}
                </label>
                <Select
                  className="input-appoint"
                  placeholder="--Chọn hãng xe--"
                  onChange={(selectedCarBrandId) => {
                    setCarBrandId(selectedCarBrandId);
                    setDataAppointment({
                      ...dataAppointment,
                      carBrandId: selectedCarBrandId,
                    });
                  }}>
                  {carBrandOptions}
                </Select>
              </div>
              <div className="flex flex-col w-1/3 mt-4 pl-8">
                <label
                  className="text-[18px] mb-2"
                  style={{ fontSize: "18px" }}>
                  Loại xe
                </label>
                <Select
                  className="input-appoint"
                  placeholder="--Chọn loại xe--"
                  onChange={(selectedCarTypeId) => {
                    setDataAppointment({
                      ...dataAppointment,
                      carTypeId: selectedCarTypeId,
                    });
                  }}>
                  {carTypeOptions}
                </Select>
              </div>
            </div>
          </div>
          <div className="">
            <div className="flex items-center pt-8">
              <div className=" flex h-[28px] w-16">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/5/55/Yemen_Coast_Guard_racing_stripe.svg"
                  alt=""
                />
              </div>
              <h1 className="text-[20px] font-medium ml-2">
                Thông tin liên hệ
              </h1>
            </div>
            <div>
              <div className="flex">
                <div className="flex flex-col w-1/3 mt-4 pl-8">
                  <label
                    className="text-[18px] mb-2"
                    style={{ fontSize: "18px" }}>
                    Họ và tên<span style={{ color: "red" }}>*</span>
                  </label>
                  <FormItem name="name" rules={validationRules.name}>
                    <Input
                      ype="text"
                      value={
                        carInfo && carInfo.owner ? carInfo.owner.name : null
                      }
                      placeholder="Nhập họ và tên"
                      className="input-appoint"
                      id="name"
                      name="userName"
                      onChange={handleChangeInput}
                    />
                  </FormItem>
                </div>
                <div className="flex flex-col w-1/3 mt-4 pl-8">
                  <label
                    className="text-[18px] mb-2"
                    style={{ fontSize: "18px" }}>
                    Số điện thoại<span style={{ color: "red" }}>*</span>
                  </label>
                  <Form.Item
                    name="phoneNumber"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập số điện thoại",
                      },
                      { validator: validatePhoneNumber },
                    ]}>
                    <Input
                      type="text"
                      value={
                        carInfo && carInfo.owner
                          ? carInfo.owner.phoneNumber
                          : null
                      }
                      placeholder="Nhập số điện thoại"
                      className="input-appoint"
                      id="phoneNumber"
                      name="phoneNumber"
                      onChange={handleChangeInput}
                    />
                  </Form.Item>
                </div>
                <div className="flex flex-col w-1/3 mt-4 pl-8">
                  <label
                    className="text-[18px] mb-2"
                    style={{ fontSize: "18px" }}>
                    Email <span style={{ color: "red" }}>*</span>
                  </label>
                  <Form.Item
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập email",
                      },
                      { validator: validateEmail },
                    ]}>
                    <Input
                      type="text"
                      value={
                        carInfo && carInfo.owner ? carInfo.owner.email : null
                      }
                      placeholder="Nhập email"
                      className="input-appoint"
                      id="email"
                      name="email"
                      onChange={handleChangeInput}
                    />
                  </Form.Item>
                </div>
              </div>
              <div className="flex">
                <div className="flex flex-col w-1/3 mt-4 pl-8">
                  <label
                    className="text-[18px] mb-2"
                    style={{ fontSize: "18px" }}>
                    Quận/Huyện
                  </label>
                  <select
                    className="input-appoint"
                    defaultValue="default"
                    onChange={handleChange}>
                    <option value="default">--Chọn Quận/Huyện--</option>
                    {districts?.map((item) => {
                      return (
                        <option key={item.id} value={item.name} id={item.id}>
                          {item.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="flex flex-col w-1/3 mt-4 pl-8">
                  <label
                    className="text-[18px] mb-2"
                    style={{ fontSize: "18px" }}>
                    Phường/xã
                  </label>
                  <select
                    className="input-appoint"
                    defaultValue="default"
                    onChange={(event) => {
                      const index = event.target.selectedIndex;
                      const optionElement = event.target.childNodes[index];
                      const optionElementId = optionElement.getAttribute("id");
                      setDataAppointment({
                        ...dataAppointment,
                        wardId: optionElementId,
                      });
                    }}>
                    <option value="default">--Chọn Phường/xã--</option>
                    {wards?.map((item) => {
                      return (
                        <option key={item.id} value={item.ward} id={item.id}>
                          {item.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="flex flex-col w-1/3 mt-4 pl-8">
                  <label
                    className="text-[18px] mb-2"
                    style={{ fontSize: "18px" }}>
                    Đường/ Số nhà
                  </label>
                  <input
                    type="text"
                    placeholder="Nhập địa chỉ cụ thể"
                    className="input-appoint"
                    id="address"
                    name="address"
                    onChange={handleChangeInput}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <div className="flex items-center pt-8">
              <div className=" flex h-[28px] w-16">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/5/55/Yemen_Coast_Guard_racing_stripe.svg"
                  alt=""
                />
              </div>
              <h1 className="text-[20px] font-medium ml-2">Chi tiết</h1>
            </div>
            <div className="flex">
              <div className="flex flex-col w-full">
                <div className="flex">
                  <div className="flex flex-col w-1/2 mt-4 pl-8">
                    <label
                      className="text-[18px] mb-2"
                      style={{ fontSize: "18px" }}>
                      Thời gian hẹn
                    </label>
                    <DatePicker
                      selected={dataAppointment.appointmentScheduleDate}
                      onChange={(date) => {
                        setDataAppointment({
                          ...dataAppointment,
                          appointmentScheduleDate: date,
                        });
                      }}
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeIntervals={15}
                      timeCaption="time"
                      dateFormat="MMMM d, yyyy h:mm aa"
                      className="input-appoint"
                    />
                  </div>
                  <div className="flex flex-col w-1/2 mt-4 pl-8">
                    <label
                      className="text-[18px] mb-2"
                      style={{ fontSize: "18px" }}>
                      Dịch vụ <span style={{ color: "red" }}>*</span>
                    </label>
                    <FormItem
                      name="repairServiceIds"
                      rules={validationRules.service}>
                      <Select
                        placeholder="--Chọn dịch vụ--"
                        mode="multiple"
                        maxTagCount={1}
                        maxTagPlaceholder={(values) =>
                          `+${values.length - 0} `
                        }
                        onChange={(selectedServices) => {
                          setDataAppointment({
                            ...dataAppointment,
                            repairServiceIds: selectedServices,
                          });
                        }}>
                        {services?.map((item) => (
                          <Option key={item.id} value={item.id}>
                            {item.name}
                          </Option>
                        ))}
                      </Select>
                    </FormItem>
                  </div>
                </div>
                <div className="mt-4 pl-8">
                  <label
                    className="text-[18px] mb-2 "
                    style={{ fontSize: "18px" }}>
                    Gửi xe
                  </label>
                  <Radio.Group
                    onChange={handleChangeInput}
                    name="receiveCarAt"
                    // value={dataAppointment.receiveCarAt}
                    className="ml-10">
                    <Radio value={1}>Tại Gara</Radio>
                    <Radio value={2}>Tại nhà</Radio>
                  </Radio.Group>
                </div>
              </div>
              <div className="flex flex-col w-1/2 mt-4 pl-8">
                <label
                  className="text-[18px] mb-2"
                  style={{ fontSize: "18px" }}>
                  Yêu cầu của khách hàng
                </label>
                <textarea
                  name="note"
                  onChange={handleChangeInput}
                  id=""
                  cols="3"
                  rows="3"
                  placeholder="Nhập yêu cầu"
                  className="input-appoint"></textarea>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-primary ml-8 mt-10 action flex justify-end"
            onClick={handleSubmitAppointment}>
            Gửi lịch hẹn
          </button>
        </Form>
      </div>
    </div>
  );
}

export default Appointment;
