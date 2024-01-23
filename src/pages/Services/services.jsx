import { Link, NavLink } from "react-router-dom";
import routerConfig from "../../config";

import * as React from "react";
import { FaStar } from "react-icons/fa";
import service1 from "../../assets/images/service1.jpg";
import service2 from "../../assets/images/service2.png";
import service3 from "../../assets/images/service3.jpg";
import service4 from "../../assets/images/service4.jpg";
import service5 from "../../assets/images/service5.jpg";
import service6 from "../../assets/images/service6.jpg";
import { serviceApi } from "../../service/UserService";


function Service() {
  const [service, setService] = React.useState([]);

  const getService = async () => {
    try {
      const { data } = await serviceApi();
      setService(data.data);
    } catch {
      console.error();
    }
  };

  React.useEffect(() => {
    getService();
  }, []);

  return (
    <div>
      <div className="area-bg__inner">
        <div
          className="w-full h-[170px] bg-[#0000004d]"
          style={{
            backgroundImage: "url('../../src/assets/images/bg-menu.jpg')",
          }}>
          <div className=" flex justify-center h-full w-full">
            <div className="b-title-page__wrap text-white">
              <h1 className="b-title-page">DỊCH VỤ</h1>
              <div className="breadcrumb">
                <li className="breadcrumb-item text-[#d01818]">
                  <Link href="" to={routerConfig.home}>
                    Trang chủ{" "}
                  </Link>
                </li>
                <li className="breadcrumb-item flex items-center">
                  <Link href="">Dịch vụ</Link>
                </li>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="list px-60 py-12 grid grid-cols-3 gap-14 bg-[#f2f2f2]">
        {service.map((item, index) => (
          <NavLink
            to={`${routerConfig.services}/${item.id}`}
            className="bg-white item rounded-md service"
            key={index}>
            <img
              src={item.thubmnail}
              alt=""
              className="w-full h-[275px] rounded-t-md"
            />
            <div className="body px-5 pt-5">
              <h1 className="title text-[20px] font-medium">{item.name}</h1>
              <p className="pt-2 text-[17px] custom-text-desc overflow-hidden">
                {item.description}
              </p>
              <div className="flex justify-between items-center pt-4 px-2">
                <span className="text-[#FF0000] text-[18px] font-medium">
                  {item.price} VND
                </span>
                <div className="flex text-yellow-400 justify-around w-24">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </div>
              </div>
            </div>
            <div className="flex w-full justify-center items-center py-6">
              <NavLink
                to={routerConfig.appointment}
                className={`${({ isActive }) =>
                  isActive ? "active" : null} w-full px-5 pt-10`}>
                <button
                  className="btn btn-primary mr-3 w-full"
                  style={{ fontSize: "18px" }}>
                  Đặt lịch hẹn
                </button>
              </NavLink>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default Service;
