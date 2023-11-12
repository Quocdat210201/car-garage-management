import SliderComponent from "../../components/Slider/slider";
import imageAbout from "../../assets/images/image-about.png";
import steeringWheel from "../../assets/images/steering-wheel.png";
import gearbox from "../../assets/images/gearbox.png";
import wrench from "../../assets/images/wrench.png";
import Services from "../../components/services/services";
import Rating from "../../components/rating/rating";
import { Link, NavLink } from "react-router-dom";
import routerConfig from "../../config";

import carLogo1 from "../../assets/images/logo-car-1.png";
import carLogo2 from "../../assets/images/logo-car2.webp";
import carLogo3 from "../../assets/images/logo-car-3.png";
import carLogo4 from "../../assets/images/logo-car-4.png";
import carLogo5 from "../../assets/images/logo-car-5.png";
import carLogo6 from "../../assets/images/logo-car-6.png";
import carLogo7 from "../../assets/images/logo-car-7.png";
import carLogo8 from "../../assets/images/logo-car-8.png";

const logoCars = [
  carLogo1,
  carLogo2,
  carLogo3,
  carLogo4,
  carLogo5,
  carLogo6,
  carLogo7,
  carLogo8,
];

function Home() {
  return (
    <>
      <div>
        <div className="home relative">
          <div className="content absolute bg-[#0000004d] z-10 w-full h-full text-white flex flex-col justify-center px-24">
            <h1 className="text-[60px] font-black leading-10">
              GARRA Ô TÔ MIỀN TRUNG
            </h1>
            <p className="py-3 text-[30px]">Dịch vụ sửa chữa ô tô tốt nhất </p>
            <div className="mt-4">
              <NavLink
                to={routerConfig.appointment}
                className={`${({ isActive }) =>
                  isActive ? "active" : null} `}>
                <button className="btn btn-primary mr-3">Đặt lịch hẹn</button>
              </NavLink>
              <button className="btn btn-disabled">Liên hệ</button>
            </div>
          </div>
          <SliderComponent></SliderComponent>
        </div>
        <div className="introduce px-24 flex justify-between w-full mt-12 mb-12">
          <div className="w-1/2">
            <div className="text-[#3d3d3d] text-[18px] font-normal">
              <span className="">Giới thiệu chung về </span>
              <h1 className="text-[40px] font-bold">
                GARA Ô TÔ <span className="text-[#FF0000]">MIỀN TRUNG </span>
              </h1>
              <p className="block pr-40">
                GARAGE Ô TÔ MIỀN TRUNG được biết đến là một trong những garage
                uy tín, chuyên cung cấp dịch vụ: máy gầm đồng sơn; sơn xe, điện
                - điện lạnh xe ô tô, sửa chữa, thay thế phụ tùng, lắp đặt nội
                thất, đồ chơi xe ô tô; tư vấn bảo hiểm, tư vấn mua bán xe ô
                tô...
              </p>
            </div>
            <div className="mt-20 flex justify-between items-center pr-48 pl-4">
              <div className="flex justify-center items-center flex-col">
                <img src={steeringWheel} alt="" className="w-12 h-12" />
                <div className="flex flex-col items-center mt-4 font-medium">
                  <span className="text-[20px]">10+</span>
                  <span className="text-[20px] uppercase">năm kinh nghiệm</span>
                </div>
              </div>
              <div className="flex justify-center items-center flex-col">
                <img src={gearbox} alt="" className="w-12 h-12" />
                <div className="flex flex-col items-center mt-4 font-medium">
                  <span className="text-[20px]">50</span>
                  <span className="text-[20px] uppercase">nhân viên</span>
                </div>
              </div>
              <div className="flex justify-center items-center flex-col">
                <img src={wrench} alt="" className="w-12 h-12" />
                <div className="flex flex-col items-center mt-4 font-medium">
                  <span className="text-[20px]">2000+</span>
                  <span className="text-[20px] uppercase">khách hànhg</span>
                </div>
              </div>
            </div>
          </div>
          <div className="w-1/2">
            <img
              src={imageAbout}
              alt=""
              className="w-full h-[400px] rounded-lg"
            />
          </div>
        </div>
        <Services></Services>
        <Rating></Rating>
        <div className="car-logo w-full my-6">
          <div className="w-3/4 mx-auto flex justify-between items-center">
            {logoCars.map((car, i) => (
              <div key={i} className="logo-image w-36 h-[140px] flex items-center">
                <img src={car} alt="" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
