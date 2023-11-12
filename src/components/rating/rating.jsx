import * as React from "react";
import { FaStar } from "react-icons/fa";
import avatar from "../../assets/images/avatar.jpg";
import avatar1 from "../../assets/images/avatar1.jpg";
import avatar2 from "../../assets/images/avatar2.jpeg";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const rates = [
  {
    avatarImage: avatar,
    name: "Quốc Đạt",
    desc: '"Nhờ có Garage Miền Trung, thủ tục bảo hiểm của tôi trở nên đơn giản hơn bao giờ hết, tôi chỉ việc đem xe đến và nhận lại xe được tân trang lại như mới. Cám ơn các bạn"',
    rating: 5,
  },
  {
    avatarImage: avatar1,
    name: "Đạt Phan",
    desc: '"Nhờ có Garage Miền Trung, thủ tục bảo hiểm của tôi trở nên đơn giản hơn bao giờ hết, tôi chỉ việc đem xe đến và nhận lại xe được tân trang lại như mới. Cám ơn các bạn"',
    rating: 5,
  },
  {
    avatarImage: avatar2,
    name: "Thanh Lâm",
    desc: '"Nhờ có Garage Miền Trung, thủ tục bảo hiểm của tôi trở nên đơn giản hơn bao giờ hết, tôi chỉ việc đem xe đến và nhận lại xe được tân trang lại như mới. Cám ơn các bạn"',
    rating: 5,
  },
  {
    avatarImage: avatar,
    name: "Thanh Lâm",
    desc: '"Nhờ có Garage Miền Trung, thủ tục bảo hiểm của tôi trở nên đơn giản hơn bao giờ hết, tôi chỉ việc đem xe đến và nhận lại xe được tân trang lại như mới. Cám ơn các bạn"',
    rating: 5,
  },
  {
    avatarImage: avatar1,
    name: "Đạt Phan",
    desc: '"Nhờ có Garage Miền Trung, thủ tục bảo hiểm của tôi trở nên đơn giản hơn bao giờ hết, tôi chỉ việc đem xe đến và nhận lại xe được tân trang lại như mới. Cám ơn các bạn"',
    rating: 5,
  },
  {
    avatarImage: avatar2,
    name: "Thanh Lâm",
    desc: '"Nhờ có Garage Miền Trung, thủ tục bảo hiểm của tôi trở nên đơn giản hơn bao giờ hết, tôi chỉ việc đem xe đến và nhận lại xe được tân trang lại như mới. Cám ơn các bạn"',
    rating: 5,
  },
];

function Rating() {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };
  return (
    <>
      <div className="rating bg-[#000000d9]">
        <div className="flex justify-center">
          <h1 className="text-white text-[28px] font-medium pt-16 uppercase">
            Đánh giá của khách hàng
          </h1>
        </div>
        <div className="list-rating px-16">
          <Slider {...settings}>
            {rates.map((rate, i) => (
              <div
                className="list-rate w-1/3 h-[250px] bg-white mx-5 mt-16"
                key={i}>
                <div className="flex justify-center image-avatar w-full">
                  <img
                    src={rate.avatarImage}
                    alt=""
                    className="w-16 h-16 rounded-full"
                  />
                </div>
                <div className="absolute mt-16 px-9">
                  <p className="block italic text-[18px]">{rate.desc}</p>
                  <div className="flex justify-center items-center mt-6">
                    <span className="font-bold italic px-10">{rate.name}</span>
                    <div className="flex text-yellow-400 justify-around w-24">
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
}

export default Rating;
