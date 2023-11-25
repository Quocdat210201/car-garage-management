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
const services = [
  {
    image: service1,
    name: "Sửa chữa khung gầm ô tô",
    desc: "Sửa chữa hệ thống khung gầm ô tô là một công việc bảo dưỡng và chăm sóc xe hơi vô cùng quan trọng vừa để bảo vệ tuổi thọ cho chiếc xe của bạn, vừa đảm bảo an toàn cho bạn cùng hành khách trên mỗi chặng đường.",
    price: 499.999,
    rating: 5,
  },
  {
    image: service2,
    name: "Đồng sơn xe ô tô ",
    desc: "Làm đồng sơn xe ô tô là một trong những kỹ thuật quan trọng giúp bạn tân trang lại vẻ đẹp bên ngoài cho chiếc xế yêu của mình. Nếu chiếc xe của bạn đang dần xuống cấp hoặc xuất hiện những vết trầy xước do va quệt thì đừng quá lo lắng, hãy mang xe đến ngay với Gara Miền Trung để đội ngũ kỹ thuật viên chuyên nghiệp, giàu kinh nghiệm của chúng tôi giúp bạn giải quyết mọi vấn đề. ",
    price: 499.999,
    rating: 5,
  },
  {
    image: service3,
    name: "Sửa chữa điện - điện lạnh ô tô ",
    desc: "Với cơ sở vật chất, trang thiết bị sửa chữa ô tô hiện đại và đội ngũ kỹ thuật viên lành nghề với hơn 10 năm kinh nghiệm làm việc, được đào tạo chính hãng, Garage ô tô Miền Trung luôn đảm bảo sửa chữa, bảo dưỡng, bảo trì xe đạt kết quả tốt nhất. ",
    price: 499.999,
    rating: 5,
  },
  {
    image: service4,
    name: "Đọc chuẩn đoán lỗi trên xe ô tô",
    desc: "Gara Miền Trung áp dụng những công nghệ - thiết bị tối tân nhất hiện nay; đó là sử dụng Máy chuẩn đoán lỗi thế hệ mới, luôn được cập nhật cho tất cả các dòng xe đời mới có mặt tại Việt Nam",
    price: 499.999,
    rating: 5,
  },
  {
    image: service5,
    name: "Lắp phụ kiện, đồ chơi trên xe ô tô",
    desc: "Hiện nay, việc trang bị đồ chơi độ xe hơi, độ ô tô đang dần trở nên phổ biến và được nhiều người biết đến. Với hơn 10 năm kinh nghiệm trong nghề, chúng tôi đã trở thành điểm đến tin cậy của nhiều người yêu xe.",
    price: 499.999,
    rating: 5,
  },
  {
    image: service6,
    name: "Thay thế phụ tùng chính hãng",
    desc: "Với phương châm hoạt động luôn đặt sự uy tín về chất lượng lên hàng đầu thì Garage Miền Trung là đơn vị cung cấp các mặt hàng phụ tùng ô tô chính hãng uy tín và đáng tin cậy nhất tại thị trường hiện nay, với giá cả cạnh tranh cùng với tiêu chí RẺ NHẤT - TỐT NHẤT - NHANH NHẤT.",
    price: 499.999,
    rating: 5,
  },
];
function Services() {
  const [defaultImage, setDefaultImage] = React.useState({});
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };
  return (
    <>
      <div className="px-24 bg-[#F2F2F2] rounded-md pb-32">
        <h1 className="w-full text-center pt-8 mb-12 text-[28px] font-medium">
          DỊCH VỤ NỔI BẬT{" "}
        </h1>
        <div className="list px-10 pt-3">
          <Slider {...settings}>
            {services.map((service, index) => (
              <div className="bg-white item rounded-md" key={index} >
                <img
                  src={service.image}
                  alt=""
                  className="w-full h-[275px] rounded-t-md"
                />
                <div className="body px-5 pt-5">
                  <h1 className="title text-[20px] font-medium">
                    {service.name}
                  </h1>
                  <p className="pt-2 text-[17px] custom-text-desc overflow-hidden">
                    {service.desc}
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
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
}

export default Services;
