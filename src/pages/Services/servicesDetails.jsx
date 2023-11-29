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
import { FaRegCalendarAlt } from "react-icons/fa";
import { CiUser } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";

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
              <h1 className="b-title-page">
                Đồng sơn xe ô tô ( gò, hàn, cắt vá)
              </h1>
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
      <div className="w-full px-96 my-10">
        <main className="">
          <section className="">
            <div className="">
              <div className="">
                <h2 className="text-[24px] text-[#253241] font-bold text-justify">
                  Đồng sơn xe ô tô ( gò, hàn, cắt vá)
                </h2>
              </div>
              <div className="relative pb-3 mb-5 text-left flex border-b-[1px]">
                <span className="mr-4 flex justify-start items-center">
                  <FaRegCalendarAlt className="mr-2" /> Ngày đăng : 14/6/2019
                </span>
                <span className="mr-4 flex justify-start items-center">
                  <CiUser className="mr-2" /> Garage Miền Trung
                </span>
                <span className="mr-4 flex justify-start items-center">
                  <IoEyeOutline className="mr-2" /> 4,014 lượt xem
                </span>
              </div>

              <div className="entry-content">
                <p>
                  Trong qu&aacute; tr&igrave;nh tham gia giao th&ocirc;ng
                  kh&ocirc;ng thể tr&aacute;nh khỏi những l&uacute;c xe &ocirc;
                  t&ocirc; bị va chạm v&agrave; xước s&aacute;t. Những vết xước
                  n&agrave;y sẽ l&agrave;m xe của bạn tr&ocirc;ng rất mất thẩm
                  mỹ. Với dịch vụ l&agrave;m đồng sơn&nbsp;xe &ocirc; t&ocirc;
                  của Garage Miền Trung &nbsp;mọi việc sẽ được giải quyết nhanh
                  ch&oacute;ng.
                </p>
                <br></br>

                <p className="text-justify">
                  <strong>L&agrave;m đồng sơn xe &ocirc; t&ocirc;&nbsp;</strong>
                  l&agrave; một trong những kỹ thuật quan trọng gi&uacute;p bạn
                  t&acirc;n trang lại vẻ đẹp b&ecirc;n ngo&agrave;i cho chiếc xế
                  y&ecirc;u của m&igrave;nh. Nếu chiếc xe của bạn đang dần xuống
                  cấp hoặc xuất hiện những vết trầy xước do va quệt th&igrave;
                  đừng qu&aacute; lo lắng, h&atilde;y mang xe đến ngay với Gara
                  Miền Trung để đội ngũ kỹ thuật vi&ecirc;n chuy&ecirc;n nghiệp,
                  gi&agrave;u kinh nghiệm của ch&uacute;ng t&ocirc;i gi&uacute;p
                  bạn giải quyết mọi vấn đề.&nbsp;
                </p>
                <br></br>

                <h2 className="text-justify">
                  <strong>KHI N&Agrave;O CẦN L&Agrave;M ĐỒNG SƠN XE?</strong>
                </h2>

                <p className="text-justify">
                  Đi sử dụng xe &ocirc; t&ocirc;, d&ugrave; bạn cẩn thận đến
                  đ&acirc;u th&igrave; việc va quẹt g&acirc;y trầy xước
                  l&agrave; điều kh&ocirc;ng thể&nbsp;tr&aacute;nh khỏi. Hoặc xe
                  sau một thời gian d&agrave;i sử dụng sẽ khiến lớp sơn bị ngả
                  m&agrave;u, xỉn m&agrave;u, gỉ s&eacute;t...g&acirc;y mất thẩm
                  mỹ. Đ&oacute; ch&iacute;nh l&agrave; l&uacute;c bạn n&ecirc;n
                  quan t&acirc;m đến việc sơn mới, t&acirc;n trang lại cho chiếc
                  &quot;xế&quot; y&ecirc;u qu&yacute; của m&igrave;nh.&nbsp;
                </p>
                <br></br>

                <p className="flex justify-center">
                  <img
                    alt="dịch vụ làm đồng sơn xe chuyên nghiệp"
                    src={service4}
                    className="w-[650px] h-[448px]"
                  />
                </p>
                <br></br>

                <p className="text-center">
                  <em>
                    Xe bị xước, m&oacute;p m&eacute;o l&agrave; l&uacute;c bạn
                    cần mang xe đi sơn sửa lại
                  </em>
                </p>
                <br></br>

                <p className="text-justify">
                  C&aacute;c vết trầy xước tr&ecirc;n xe kh&ocirc;ng chỉ
                  l&agrave;m xe mất thẩm mỹ, m&agrave; c&ograve;n tạo điều kiện
                  cho c&aacute;c bụi bặm b&aacute;m v&agrave;o, nước mưa ngấm
                  rồi oxy h&oacute;a. Nếu t&igrave;nh trạng trầm trọng
                  c&ograve;n c&oacute; thể l&agrave;m cho vỏ xe chỗ trầy xước bị
                  ăn m&ograve;n, rỉ rồi loang rộng ra,...l&agrave;m cho chiếc xế
                  y&ecirc;u của qu&yacute; kh&aacute;ch&nbsp;ng&agrave;y
                  c&agrave;ng t&agrave;n đi.&nbsp;V&igrave; vậy, qu&yacute;
                  kh&aacute;ch n&ecirc;n&nbsp;tiến h&agrave;nh đồng sơn lại
                  chiếc xe của m&igrave;nh để lu&ocirc;n đẹp, lu&ocirc;n
                  b&oacute;ng bẩy v&agrave; sang trọng trong con mắt người
                  kh&aacute;c.
                </p>
                <br></br>

                <p className="text-justify">
                  Ngo&agrave;i ra v&agrave;o cuối năm thường c&oacute; nhiều
                  người muốn đi t&acirc;n trang lại vẻ đẹp cho chiếc xe
                  y&ecirc;u qu&yacute; của m&igrave;nh để đ&oacute;n tết
                  v&agrave; c&ugrave;ng gia đ&igrave;nh tận hưởng những
                  ph&uacute;t gi&acirc;y thư gi&atilde;n trọn vẹn nhất. Do
                  đ&oacute;, thời điểm n&agrave;y ch&uacute;ng ta thường thấy
                  c&aacute;c dịch vụ chăm s&oacute;c xe hơi như&nbsp;
                  <strong>l&agrave;m đồng sơn xe &ocirc; t&ocirc;</strong>, bảo
                  dưỡng xe &ocirc; t&ocirc;&hellip; trở n&ecirc;n rất nhộn nhịp.
                  Tuy nhi&ecirc;n, vấn đề đặt ra ở đ&acirc;y l&agrave;
                  l&agrave;m thế n&agrave;o để chọn được địa chỉ chăm s&oacute;c
                  v&agrave; bảo dưỡng xe hơi uy t&iacute;n, chất lượng.
                </p>
                <br></br>

                <h2 className="text-justify">
                  <strong>
                    N&Ecirc;N CHỌN L&Agrave;M ĐỒNG SƠN XE Ở Đ&Acirc;U UY
                    T&Iacute;N, CHUY&Ecirc;N NGHIỆP, HIỆU QUẢ?
                  </strong>
                </h2>

                <p className="text-justify">
                  Trước khi quyết định mang xe đi sửa, sơn lại, bạn cần
                  đ&aacute;nh gi&aacute; chỗ xe bị biến dạng, trầy xước. Nếu vết
                  xước nhỏ kh&ocirc;ng đ&aacute;ng kể, bạn bỏ qua, một số vết
                  trầy xước c&oacute; thể xử l&yacute; bằng
                  c&aacute;c&nbsp;h&oacute;a chất chuy&ecirc;n dụng. Nếu biến
                  dạng ảnh hưởng nhiều đến xe, bạn h&atilde;y đem đến garage uy
                  t&iacute;n để xử l&yacute;. Lưu &yacute; cho 1 số xe c&oacute;
                  sử dụng bảo hiểm th&acirc;n vỏ l&agrave; một số g&oacute;i
                  dịch vụ hạn chế số lần sửa chửa n&ecirc;n bạn sử dụng
                  đ&uacute;ng mục đ&iacute;ch vẫn tốt hơn. Điều quan trọng nhất
                  khi sửa chữa, sơn lại xe l&agrave; việc bạn lựa chọn được
                  garage sơn sửa xe uy t&iacute;n để hạn chế ph&aacute;t sinh
                  chi ph&iacute; kh&ocirc;ng mong muốn.&nbsp;
                </p>
                <br></br>

                <h3 className="text-justify">
                  <strong>
                    Quy tr&igrave;nh l&agrave;m đồng sơn xe chuy&ecirc;n nghiệp
                    tại Garage Miền Trung
                  </strong>
                </h3>

                <p className="text-justify">
                  Trong qu&aacute; tr&igrave;nh sơn xe &ocirc; t&ocirc;, việc
                  l&agrave;m đồng xe l&agrave; kh&acirc;u xử l&yacute; ban đầu.
                  Thường c&aacute;c t&agrave;i xế mang xe đến sơn lại khi xe bị
                  trầy xước, m&oacute;p m&eacute;o, rỉ s&eacute;t. Kỹ thuật
                  l&agrave;m đồng xe gi&uacute;p cho chỗ th&acirc;n vỏ bị hư
                  được trơn l&aacute;ng. Thứ nhất chống ăn m&ograve;n lại, thứ 2
                  trả lại cho th&acirc;n vỏ h&igrave;nh d&aacute;ng chuẩn như
                  thuở c&ograve;n son, v&agrave; cuối c&ugrave;ng l&agrave; tạo
                  nền cho lớp sơn ch&iacute;nh được bền đẹp.
                </p>
                <br></br>

                <p className="flex justify-center">
                  <img
                    alt="dịch vụ làm đồng sơn xe chuyên nghiệp"
                    src={service1}
                    className="w-[650px] h-[448px]"
                  />
                </p>
                <br></br>

                <p className="text-center">
                  <em>
                    Quy tr&igrave;nh l&agrave;m đồng sơn xe gi&uacute;p xe
                    &ocirc; t&ocirc; c&oacute; lại được nước sơn đẹp như ban đầu
                  </em>
                </p>
                <br></br>
                <p className="text-justify">
                  <strong>Đối với vết xước</strong>: thợ sẽ ch&agrave;
                  nh&aacute;m chỗ sơn trầy xước, sau đ&oacute; sơn phủ lớp chống
                  rỉ. Sau đ&oacute; bả lớp matit l&ecirc;n lấp chỗ xước. Đối với
                  Garage l&agrave;m đồng xe &ocirc; t&ocirc; uy t&iacute;n
                  th&igrave; kh&acirc;u n&agrave;y sẽ được xử l&yacute; kỹ.
                  Kh&ocirc;ng chỉ để bảo đảm lớp sơn mới lu&ocirc;n được bền,
                  m&agrave; tr&aacute;nh vỏ xe bị ăn m&ograve;n.
                </p>
                <br></br>

                <p className="text-justify">
                  <strong>Đối với vết l&otilde;m, biến dạng</strong>: thợ sử
                  dụng m&aacute;y h&agrave;n r&uacute;t t&ocirc;n, hệ thống nắn
                  khung sườn cho những xe bị tai nạn, bộ đe, bộ đục, đột
                  dấu,&hellip; T&ugrave;y vết lồi l&otilde;m nhỏ hay lớn
                  m&agrave; thợ sẽ sử dụng c&ocirc;ng cụ dụng cụ chuy&ecirc;n
                  biệt. Một số chỗ bị mục cho rỉ s&eacute;t l&acirc;u
                  ng&agrave;y c&oacute; thể được cắt ra v&agrave; h&agrave;n
                  v&aacute; lại.
                </p>
                <br></br>

                <p className="text-justify">
                  Việc lựa chọn đơn vị để l&agrave;m đẹp cho chiếc &ldquo;xế
                  y&ecirc;u&rdquo; của m&igrave;nh l&agrave; một vấn đề v&ocirc;
                  c&ugrave;ng quan trọng. Thế nhưng, tr&ecirc;n thực tế
                  th&igrave; để chọn ra được một gara chuy&ecirc;n&nbsp;
                  <strong>l&agrave;m đồng sơn xe &ocirc; t&ocirc;</strong>
                  &nbsp;chất lượng, uy t&iacute;n th&igrave; lại kh&ocirc;ng hề
                  dễ d&agrave;ng ch&uacute;t n&agrave;o. Bởi kỹ thuật l&agrave;m
                  đồng sơn xe &ocirc; t&ocirc; y&ecirc;u cầu đội ngũ thợ phải
                  c&oacute; tay nghề cao, am hiểu kiến thức về xe hơi kết hợp
                  c&ugrave;ng kinh nghiệm l&acirc;u năm th&igrave; mới c&oacute;
                  thể đ&aacute;p ứng được.&nbsp;
                </p>
                <br></br>

                <p className="flex justify-center">
                  <img
                    alt="dịch vụ làm đồng sơn xe chuyên nghiệp"
                    src={service2}
                    className="w-[650px] h-[448px]"
                  />
                </p>
                <br></br>

                <p className="text-center">
                  <em>
                    Gara Miền Trung c&oacute; đội ngũ nh&acirc;n vi&ecirc;n
                    chuy&ecirc;n nghiệp c&ugrave;ng c&aacute;c m&aacute;y
                    m&oacute;c chuy&ecirc;n dụng
                  </em>
                </p>
                <br></br>
                <br></br>

                <p className="flex justify-center">
                  <em>
                    <img
                      alt="dịch vụ làm đồng sơn xe chuyên nghiệp"
                      src={service3}
                      className="w-[650px] h-[448px]"
                    />
                  </em>
                </p><br></br>

                <p className="text-center">
                  <em>
                    Sẽ trả lại chiếc xe mới, đẹp kh&ocirc;ng t&igrave; vết cho
                    bạn
                  </em>
                </p><br></br>

                <p className="text-justify">
                  Sau nhiều năm l&agrave;m việc trong lĩnh vực sơn sửa, bảo
                  dưỡng v&agrave; chăm s&oacute;c xe hơi,&nbsp;
                  <strong>Gara Miền Trung &nbsp;</strong>đ&atilde; tự h&agrave;o
                  trở th&agrave;nh địa chỉ&nbsp;
                  <strong>l&agrave;m đồng sơn xe &ocirc; t</strong>&ocirc; uy
                  t&iacute;n, chất lượng d&agrave;nh cho mọi kh&aacute;ch
                  h&agrave;ng. Tất cả c&aacute;c nh&acirc;n vi&ecirc;n kỹ thuật
                  tại đều được đ&agrave;o tạo b&agrave;i bản, chuy&ecirc;n
                  s&acirc;u tại c&aacute;c trường lớp ch&iacute;nh
                  thống.&nbsp;V&igrave; vậy, nếu chiếc xe hơi của bạn đang xuất
                  hiện những vết trầy xước, bong tr&oacute;c th&igrave;
                  h&atilde;y đ&aacute;nh xe ngay đến với&nbsp;
                  <strong>Gara Miền Trung &nbsp;</strong>để được&nbsp;
                  <strong>l&agrave;m đồng sơn xe &ocirc; t&ocirc;&nbsp;</strong>
                  ngay th&ocirc;i!&nbsp;Với bề d&agrave;y hoạt động, c&ugrave;ng
                  đội ngũ nh&acirc;n vi&ecirc;n chuy&ecirc;n nghiệp, nhiệt
                  t&igrave;nh, trang thiết bị sửa chữa hiện đại, linh phụ kiện
                  ch&iacute;nh h&atilde;ng&hellip; Đến với Gara Giải
                  Ph&oacute;ng, mọi nhu cầu của qu&yacute; kh&aacute;ch đều sẽ
                  được đ&aacute;p ứng ho&agrave;n hảo!
                </p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default ServiceDetails;
