import * as React from "react";
import avatar from "../../assets/images/avatar.jpg";
import { FaEllipsisH } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { getNotification } from "../../service/UserService";
import routerConfig from "../../config";

function Notify(props) {
  const { data } = props;
  console.log({ data });
  return (
    <div className="notify py-2 text-white">
      <div className="flex justify-between items-center text-[22px] px-4">
        <h1 className="">Thông báo</h1>
        <FaEllipsisH />
      </div>
      <div>
        {data.map((item, index) => (
          <Link
            style={{ color: "white", marginTop: 10}}
            to={`${routerConfig.profile}/${item.id}`}
            key={index}
            className="flex justify-center items-center text-[18px] px-4 py-4 hover:bg-[#696969] cursor-pointer">
            <img src={avatar} alt="" className="w-16 h-16 rounded-full mr-2" />
            <div className="flex flex-col mr-6">
              <div className="flex justify-between items-center">
                <h1 className="font-semibold">{item.title}</h1>
                <h1 className="text-[14px] italic">{data.time}</h1>
              </div>
              <p className="custom-text-desc-2 text-[14px] mt-1">
                {item.content}
              </p>
            </div>
            <div className="w-6 h-3 rounded-full bg-[blue]"></div>
          </Link>
        ))}
      </div>
      <a
        className="flex justify-center items-center italic text-[20px] cursor-pointer text-[blue]"
        to="/">
        <span style={{ color: "white" }}>Xem tất cả</span>
      </a>
    </div>
  );
}

export default Notify;
