import { Link, NavLink } from "react-router-dom";
import routerConfig from "../../config";
import { FaCheck } from "react-icons/fa";
import SendAppoint from "./sendAppoint";
import { useEffect, useState } from "react";
import {
  apiProvince,
  apiProvinceDistrict,
  apiProvinceWard,
} from "../../service/UserService";
import Select from "./SelectProvince";

function Appointment() {
  const [districts, setDistricts] = useState([]);
  const [district, setDistrict] = useState("");
  const [wards, setWards] = useState([]);
  const [ward, setWard] = useState("");
  const [reset, setReset] = useState(false);

  // const provincesId = provinces[1].province_id

  // console.log({provincesId});

  useEffect(() => {
    setDistrict(null);
    const fetchPublicDistrict = async () => {
      const response = await apiProvinceDistrict();
      if (response.status === 200) {
        setDistricts(response.data?.results);
      }
    };
    fetchPublicDistrict();
    setDistricts([]);
  }, []);

  useEffect(() => {
    const fetchPublicWard = async () => {
      const response = await apiProvinceWard(district);
      if (response.status === 200) {
        setWards(response.data?.results);
      }
    };
    district && fetchPublicWard();
    !district ? setReset(true) : setReset(false);
    !district && setDistricts([]);
  }, [district]);

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
          <form action="">
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
                  />
                </div>
                <div className="flex flex-col w-1/3 mt-4 pl-8">
                  <label className="text-[18px] mb-2">Hãng xe </label>
                  <select className="input-appoint" name="">
                    <option value="">--Chọn hãng xe--</option>
                    <option value="dog">Audi</option>
                    <option value="cat">Porches</option>
                  </select>
                </div>
                <div className="flex flex-col w-1/3 mt-4 pl-8">
                  <label className="text-[18px] mb-2">Loại xe</label>
                  <select className="input-appoint">
                    <option value="">--Chọn loại xe--</option>
                    <option value="dog">Xe mới</option>
                    <option value="cat">Porches</option>
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
                      placeholder="Nhập họ và tên"
                      className="input-appoint"
                    />
                  </div>
                  <div className="flex flex-col w-1/3 mt-4 pl-8">
                    <label className="text-[18px] mb-2">Số điện thoại</label>
                    <input
                      type="number"
                      placeholder="Nhập số điện thoại"
                      className="input-appoint"
                    />
                  </div>
                  <div className="flex flex-col w-1/3 mt-4 pl-8">
                    <label className="text-[18px] mb-2">Email</label>
                    <input
                      type="text"
                      placeholder="Nhập email"
                      className="input-appoint"
                    />
                  </div>
                </div>
                <div className="flex">
                  <div className="flex flex-col w-1/3 mt-4 pl-8">
                    <Select
                      reset={reset}
                      type="district"
                      value={district}
                      setValue={setDistrict}
                      options={districts}
                      label="Quận/Huyện"
                    />
                  </div>
                  <div className="flex flex-col w-1/3 mt-4 pl-8">
                    <Select
                      reset={reset}
                      type="ward"
                      value={ward}
                      setValue={setWard}
                      options={wards}
                      label="Phường/xã"
                    />
                  </div>
                  <div className="flex flex-col w-1/3 mt-4 pl-8">
                    <label className="text-[18px] mb-2">Đường/ Số nhà</label>
                    <input
                      type="text"
                      placeholder="Nhập địa chỉ cụ thể"
                      className="input-appoint"
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
                <div>
                  <div>
                    <div className="flex flex-col w-1/4 mt-4 pl-8">
                      <label className="text-[18px] mb-2">Thời gian hẹn</label>
                      <input type="datetime-local" className="input-appoint" />
                    </div>
                    <div className="flex flex-col w-1/4 mt-4 pl-8">
                      <label className="text-[18px] mb-2">Dịch vụ</label>
                      <select className="input-appoint" name="">
                        <option value="">--Chọn dịch vụ--</option>
                        <option value="dog">Rửa xe</option>
                        <option value="cat">Sơn</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    
                  </div>
                </div>
                <div className="flex flex-col w-1/2 mt-4 pl-8">
                  <label className="text-[18px] mb-2">
                    Yêu cầu của khách hàng
                  </label>
                  <textarea
                    name=""
                    id=""
                    cols="3"
                    rows="3"
                    placeholder="Nhập yêu cầu"
                    className="input-appoint"></textarea>
                </div>
              </div>
            </div>
            <div className="action flex justify-end">
              <button className="btn btn-primary ml-8 mt-10" type="submit">
                Gửi lịch hẹn
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* <SendAppoint /> */}
    </div>
  );
}

export default Appointment;
