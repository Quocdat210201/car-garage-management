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
} from "../../service/UserService";
import SelectProvince from "./SelectProvince";
import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// const carBrands = [
//   {
//     carBrandName: "Toyota",
//     carType: {
//       name: "",
//     },
//   },
//   {
//     carBrandName: "Kia",
//     carType: {
//       name: "",
//     },
//   },
//   {
//     carBrandName: "Hyundai",
//     carType: {
//       name: "",
//     },
//   },
//   {
//     carBrandName: "Mazda",
//     carType: {
//       name: "",
//     },
//   },
//   {
//     carBrandName: "Ford",
//     carType: {
//       name: "",
//     },
//   },
//   {
//     carBrandName: "Honda",
//     carType: {
//       name: "",
//     },
//   },
//   {
//     carBrandName: "Chevrolet",
//     carType: {
//       name: "",
//     },
//   },
//   {
//     carBrandName: "Mitsubishi",
//     carType: {
//       name: "",
//     },
//   },
//   {
//     carBrandName: "Nissan",
//     carType: {
//       name: "",
//     },
//   },
//   {
//     carBrandName: "Suzuki",
//     carType: {
//       name: "",
//     },
//   },
//   {
//     carBrandName: "Vinfast",
//     carType: {
//       name: "",
//     },
//   },
// ];

function Appointment() {
  const [districts, setDistricts] = useState([]);
  const [district, setDistrict] = useState("");
  const [wards, setWards] = useState([]);
  const [ward, setWard] = useState("");
  const [reset, setReset] = useState(false);
  const [service, setService] = useState("");
  const [services, setServices] = useState([]);
  const [carBrand, setCarBrand] = useState([]);
  const [carType, setCarType] = useState([]);
  const [user, setUser] = useState([]);
  const [loading, setIsLoading] = useState(false);
  // const [value, setValue] = useState(1);
  const navigate = useNavigate();
  // const [startDate, setStartDate] = useState(new Date());

  const [dataAppointment, setDataAppointment] = useState({
    phoneNumber: "",
    email: "",
    userName: "",
    address: "",
    // wardId: "",
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

  // const signUp = async () => {
  //   const data = { dataAppointment };
  //   try {
  //     await apiAppointmentSchedule(data);
  //     toast.success("Đăng kí thành công!");
  //     navigate("/send-success");
  //   } catch (error) {
  //     error;
  //   }
  // };

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

  const getCarType = async () => {
    setIsLoading(true);
    try {
      const { data } = await carTypeApi();
      setCarType(data.data);
      setIsLoading(false);
    } catch {
      console.error();
      setIsLoading(false);
    }
  };

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
    getCarType();
    getUser();
  }, []);

  useEffect(() => {
    setDistrict(null);
    const fetchPublicDistrict = async () => {
      const response = await apiProvinceDistrict();
      // console.log(response.data);
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
      // console.log(response);
      if (response.status === 200) {
        setWards(response.data?.data);
      }
    };
    district && fetchPublicWard();
    !district ? setReset(true) : setReset(false);
    !district && setDistricts([]);
  }, [district]);

  // const onChange = (e) => {
  //   console.log("radio checked", e.target.value);
  //   setValue(e.target.value);
  // };

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
                  id="licenseId"
                  name="registrationNumber"
                  onChange={handleChangeInput}
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
                    console.log(optionElementId);
                    setDataAppointment({
                      ...dataAppointment,
                      carBrandId: optionElementId,
                    });
                  }}>
                  <option value="default">--Chọn hãng xe--</option>
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
                  <option value="default">--Chọn loại xe--</option>
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
                    // value={user ? user.name : null}
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
                    type="number"
                    // value={user ? user.phoneNumber : null}
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
                    // value={user ? user.email : null}
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
                  {/* <SelectProvince
                    reset={reset}
                    type="district"
                    value={district}
                    setValue={setDistrict}
                    options={districts}
                    label="Quận/Huyện"
                  /> */}

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
                    {/* <input
                      type="datetime-local"
                      className="input-appoint"
                      name="appointmentScheduleDate"
                      onChange={handleChangeInput}
                    /> */}
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
