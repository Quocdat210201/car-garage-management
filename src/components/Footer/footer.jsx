import * as React from "react";
import {
  FaCheck,
  FaPhone,
  FaFacebookF,
  FaYoutube,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import routerConfig from "../../config";

function Footer() {
  return (
    <>
      <div className="footer px-24 pt-10 text-white flex justify-between pb-10">
        <div className="contact w-1/4">
          <h1 className="text-[26px] font-medium tracking-wider">Kết nối</h1>
          <div className="contact-info flex flex-col pr-24 pl-2 pt-7">
            <p>
              Nếu bạn đang dở việc gì đó và không muốn bỏ lỡ cuộc gọi quan trọng
              đó thì đó có thể là sự khởi đầu cho một công việc kinh doanh mới
              thú vị.
            </p>
            <span>
              Email
              <a href=""> garagemt@gmail.com</a>
            </span>
            <span>
              Điện thoại
              <a href=""> 0964 514 433</a>
            </span>
            <span>
              Website
              <a href=""> https://garagemt.vn</a>
            </span>
            <span>
              Địa chỉ
              <a href=""> 252 Lê Đại Hành, Hòa Thọ Đông, Cẩm Lệ, Đà Nẵng</a>
            </span>
          </div>
          <div className="social flex justify-between w-2/3 px-8 pt-4 text-[24px] text-[#a8a8a8]">
            <FaYoutube className="social-icon" />
            <FaTwitter className="social-icon" />
            <FaFacebookF className="social-icon" />
            <FaInstagram className="social-icon" />
          </div>
        </div>
        <div className=" w-1/4">
          <h1 className="text-[26px] font-medium tracking-wider">Dịch vụ</h1>
          <ul className="service-detail pr-24 pt-6">
            <li>
              <FaCheck className="custom-icon" />
              Bảo dưỡng động cơ ô tô cho xe mới
            </li>
            <li>
              <FaCheck className="custom-icon" />
              Thay dầu và hệ thống lọc dầu
            </li>
            <li>
              <FaCheck className="custom-icon" />
              Vệ sinh hệ thống làm mát
            </li>
            <li>
              <FaCheck className="custom-icon" />
              Thay dầu phanh khi tbảo dưỡng động
            </li>
            <li>
              <FaCheck className="custom-icon" />
              Kiểm tra hệ thống trợ lực lái điện
            </li>
            <li>
              <FaCheck className="custom-icon" />
              Thay dầu của hộp số tự động
            </li>
          </ul>
        </div>
        <div className="help w-1/4">
          <h1 className="text-[26px] font-medium tracking-wider">Hỗ trợ</h1>
          <ul className="service-detail pr-24 pt-6">
            <li>
              <FaCheck className="custom-icon" />
              Làm thế nào để bắt đầu ?
            </li>
            <li>
              <FaCheck className="custom-icon" />
              Các câu hỏi thường gặp
            </li>
            <li>
              <FaCheck className="custom-icon" />
              Đánh giá từ khách hàng
            </li>
            <li>
              <FaCheck className="custom-icon" />
              Nhận báo giá miễn phí
            </li>
            <li>
              <FaCheck className="custom-icon" />
              Trung tâm trợ giúp và hỗ trợ
            </li>
          </ul>
        </div>
        <div className="order w-1/4">
          <h1 className="text-[26px] font-medium tracking-wider">Liên hệ</h1>
          <div className="w-full pt-6">
            <input
              type="text"
              name="name"
              placeholder="Họ và tên "
              className="custom-input mb-2"
              required
            />
            <input
              type="text"
              name="email"
              placeholder="Email "
              className="custom-input mb-2"
              required
            />
            <textarea
              name="desc"
              id="desc"
              rows="2"
              placeholder="Nội dung "
              className="custom-input mb-2"
              required
            />

            <button
              className="btn btn-primary w-90 mt-3 hover:opacity-75"
              style={{ fontSize: "18px" }}
              type="submit">
              Gửi thông tin
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
