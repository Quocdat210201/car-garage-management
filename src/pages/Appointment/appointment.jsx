import { Link, NavLink, useNavigate } from "react-router-dom";
import routerConfig from "../../config";
import { FaCheck } from "react-icons/fa";
import SendAppoint from "./sendAppoint";
import { useEffect, useState } from "react";
import { Radio } from "antd";
import { Form, Input, Select, Button } from "antd/lib";
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

  const [dataAppointment, setDataAppointment] = useState({
    phoneNumber: "",
    email: "",
    userName: "",
    address: "",
    appointmentScheduleDate: new Date(),
    note: "",
    registrationNumber:"",
    carTypeId: "",
    carBrandId: "",
    manufacturingYear: "",
    repairServiceIds: [],
    receiveCarAt: 1,
  });

  const handleChangeInput = (e) => {
    console.log({ e });
    console.log({ dataAppointment });
    setDataAppointment((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    console.log({ dataAppointment });
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
    const res = await apiAppointmentSchedule(dataAppointment);
    navigate("/send-success");
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
        <div className="">
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
                <label className="text-[18px] mb-2">Biển số xe</label>
                <input
                  type="text"
                  placeholder="Nhập biển số xe"
                  className="input-appoint"
                  name="registrationNumber"
                  onChange={
                    handleChangeInput
                    //(e) => {
                    // setRegistration(e.target.value);
                    //  }
                }
                />
              </div>
              <div className="flex flex-col w-1/3 mt-4 pl-8">
                <label className="text-[18px] mb-2">Hãng xe </label>
                <select
                  className="input-appoint"
                  name="carBrandId"
                  id="carBrand"
                  defaultValue="default"
                  onChange={(event) => {
                    const index = event.target.selectedIndex;
                    const optionElement = event.target.childNodes[index];
                    const optionElementId = optionElement.getAttribute("id");
                    setCarBrandId(optionElementId);
                    setDataAppointment({
                      ...dataAppointment,
                      carBrandId: optionElementId,
                    });
                  }}>
                  <option>
                    {carInfo && carInfo.carType
                      ? getCarBrandName(carInfo.carType.carBrandId)
                      : ""}
                  </option>
                  {/* <option value={carInfo.length === 0 ? "default" : ""}>--Chọn hãng xe--</option> */}
                  {carBrand.map((item) => (
                    <option key={item.id} id={item.id}>
                      {item.name}
                    </option>
                  ))}
                  {/* {
                      carBrands.map((item, i) => {
                        <option value="" key={i}>{item.carBrandName}</option>
                      })
                    } */}
                </select>
              </div>
              <div className="flex flex-col w-1/3 mt-4 pl-8">
                <label className="text-[18px] mb-2">Loại xe</label>
                <select
                  className="input-appoint"
                  name="carTypeId"
                  id="carType"
                  defaultValue="default"
                  onChange={(event) => {
                    const index = event.target.selectedIndex;
                    const optionElement = event.target.childNodes[index];
                    const optionElementId = optionElement.getAttribute("id");
                    setDataAppointment({
                      ...dataAppointment,
                      carTypeId: optionElementId,
                    });
                  }}>
                  <option value="default">
                    {carInfo && carInfo.carType ? carInfo.carType.name : ""}
                  </option>
                  {/* <option value={carInfo.length === 0 ? "default" : ""}>--Chọn loại xe--</option> */}
                  {carType.map((item) => (
                    <option key={item.id} id={item.id}>
                      {item.name}
                    </option>
                  ))}
                  {/* <option value="dog">Xe mới</option>
                  <option value="cat">Xe cũ</option> */}
                </select>
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
                  <label className="text-[18px] mb-2">Họ và tên</label>
                  <input
                    type="text"
                    value={carInfo && carInfo.owner ? carInfo.owner.name : null}
                    placeholder="Nhập họ và tên"
                    className="input-appoint"
                    id="name"
                    name="userName"
                    onChange={handleChangeInput}
                  />
                </div>
                <div className="flex flex-col w-1/3 mt-4 pl-8">
                  <label className="text-[18px] mb-2">Số điện thoại</label>
                  <input
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
                </div>
                <div className="flex flex-col w-1/3 mt-4 pl-8">
                  <label className="text-[18px] mb-2">Email</label>
                  <input
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
                </div>
              </div>
              <div className="flex">
                <div className="flex flex-col w-1/3 mt-4 pl-8">
                  <label className="text-[18px] mb-2">Quận/Huyện</label>
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
                  <label className="text-[18px] mb-2">Phường/xã</label>
                  <select
                    className="input-appoint"
                    defaultValue="default"
                    onChange={(event) => {
                      const index = event.target.selectedIndex;
                      const optionElement = event.target.childNodes[index];
                      const optionElementId = optionElement.getAttribute("id");
                      console.log(optionElementId);
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
                  <label className="text-[18px] mb-2">Đường/ Số nhà</label>
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
                    <label className="text-[18px] mb-2">Thời gian hẹn</label>
                    <DatePicker
                      selected={dataAppointment.appointmentScheduleDate}
                      onChange={(date) => {
                        setDataAppointment({
                          ...dataAppointment,
                          appointmentScheduleDate: date,
                        });
                        console.log(date);
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
                    <label className="text-[18px] mb-2">Dịch vụ</label>
                    <select
                      className="input-appoint"
                      defaultValue="default"
                      name="repairServiceIds"
                      onChange={(event) => {
                        const index = event.target.selectedIndex;
                        const optionElement = event.target.childNodes[index];
                        const optionElementId =
                          optionElement.getAttribute("id");
                        setDataAppointment({
                          ...dataAppointment,
                          repairServiceIds: [optionElementId],
                        });
                      }}>
                      <option value="default">--Chọn dịch vụ--</option>
                      {services?.map((item) => {
                        return (
                          <option key={item.id} value={item.name} id={item.id}>
                            {item.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div className="mt-4 pl-8">
                  <label className="text-[18px] mb-2 ">Gửi xe</label>
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
                <label className="text-[18px] mb-2">
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
        </div>
      </div>
      {/* <SendAppoint /> */}
    </div>
  );
}

export default Appointment;
