import * as React from "react";
import { FaStar } from "react-icons/fa";
import service1 from "../../assets/images/service1.jpg";
import service2 from "../../assets/images/service2.png";
import service3 from "../../assets/images/service3.jpg";
import service4 from "../../assets/images/service4.jpg";
import service5 from "../../assets/images/service5.jpg";
import service6 from "../../assets/images/service6.jpg";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Link, NavLink } from "react-router-dom";
import routerConfig from "../../config";
import { serviceApi } from "../../service/UserService";

const  Services = () => {
  const [defaultImage, setDefaultImage] = React.useState({});
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  const [services, setServices] = React.useState([]);

  const getService = async () => {
    try {
      const { data } = await serviceApi();
      setServices(data.data);
    } catch {
      console.error();
    }
  };
  React.useEffect(() => {
    getService();
  }, []);

  return (
    <>
      <div className="px-24 bg-[#F2F2F2] rounded-md pb-32">
        <h1 className="w-full text-center pt-8 mb-12 text-[28px] font-medium">
          DỊCH VỤ NỔI BẬT{" "}
        </h1>
        <div className="list px-10 pt-3">
          <Slider {...settings}>
            {services.map((service, index) => (
              <NavLink to={`${routerConfig.services}/${service.id}`}className="bg-white item rounded-md" key={index} >
                <img
                  src={service.thubmnail}
                  alt=""
                  className="w-full h-[275px] rounded-t-md"
                />
                <div className="body px-5 pt-5">
                  <h1 className="title text-[20px] font-medium">
                    {service.name}
                  </h1>
                  <p className="pt-2 text-[17px] custom-text-desc overflow-hidden">
                    {service.description}
                  </p>
                  <div className="flex justify-between items-center pt-4 px-2">
                    <span className="text-[#FF0000] text-[18px] font-medium">
                      {service.price} VND
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
                    <button className="btn btn-primary mr-3 w-full" style={{fontSize: '18px'}}>
                      Đặt lịch hẹn
                    </button>
                  </NavLink>
                </div>
              </NavLink>
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
}

export default Services;
