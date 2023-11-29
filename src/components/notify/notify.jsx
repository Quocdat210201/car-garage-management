import * as React from "react";
import avatar from "../../assets/images/avatar.jpg";
import { FaEllipsisH } from "react-icons/fa";
import { Link } from "react-router-dom";
const mockDataNotify = [
  {
    avatar: avatar,
    title: "Thông báo xác nhận",
    description:
      "Chúng tôi đã gửi cho bạn bản chi tiết về tình hình xe của bạn. Vui lòng phản hồi lại cho chúng tôi trong thời gian sớm nhất. Xin cảm ơn!",
    time: "5 phút trước",
    status: true,
  },
  {
    avatar: avatar,
    title: "Thông báo xác nhận",
    description:
      "Chúng tôi đã gửi cho bạn bản chi tiết về tình hình xe của bạn. Vui lòng phản hồi lại cho chúng tôi trong thời gian sớm nhất. Xin cảm ơn!",
    time: "5 phút trước",
    status: true,
  },
  {
    avatar: avatar,
    title: "Thông báo xác nhận",
    description:
      "Chúng tôi đã gửi cho bạn bản chi tiết về tình hình xe của bạn. Vui lòng phản hồi lại cho chúng tôi trong thời gian sớm nhất. Xin cảm ơn!",
    time: "5 phút trước",
    status: true,
  },
];

function Notify() {
  return (
    <div className="notify py-2 text-white">
      <div className="flex justify-between items-center text-[22px] px-4">
        <h1 className="">Thông báo</h1>
        <FaEllipsisH />
      </div>
      <div>
        {mockDataNotify.map((data, index) => (
          <div
            key={index}
            className="flex justify-center items-center text-[18px] px-4 py-4 hover:bg-[#696969] cursor-pointer">
            <img
              src={data.avatar}
              alt=""
              className="w-16 h-16 rounded-full mr-2"
            />
            <div className="flex flex-col mr-6">
              <div className="flex justify-between items-center">
                <h1 className="font-semibold">{data.title}</h1>
                <h1 className="text-[14px] italic">{data.time}</h1>
              </div>
              <p className="custom-text-desc-2 text-[14px] mt-1">
                {data.description}
              </p>
            </div>
            <div className="w-8 h-3 rounded-full bg-[blue]"></div>
          </div>
        ))}
      </div>
      <a className="flex justify-center items-center italic text-[20px] cursor-pointer text-[blue]" to="/">
        <span>Xem tất cả</span>
      </a>
    </div>
  );
}

export default Notify;
