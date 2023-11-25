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

function ServiceDetails() {
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
      <div>chi tieets</div>
    </div>
  );
}

export default ServiceDetails;
