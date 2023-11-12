import { Link, NavLink } from "react-router-dom";
import routerConfig from "../../config";

import imageAbout from "../../assets/images/image-about.png";
import steeringWheel from "../../assets/images/steering-wheel.png";
import gearbox from "../../assets/images/gearbox.png";
import wrench from "../../assets/images/wrench.png";

function Introduce() {
  return (
    <div className="">
      <div className="area-bg__inner">
        <div
          className="w-full h-[170px] bg-[#0000004d]"
          style={{
            backgroundImage: "url('../../src/assets/images/bg-menu.jpg')",
          }}>
          <div className=" flex justify-center h-full w-full">
            <div className="b-title-page__wrap text-white">
              <h1 className="b-title-page">VỀ CHÚNG TÔI</h1>
              <div className="breadcrumb">
                <li className="breadcrumb-item text-[#d01818]">
                  <Link href="" to={routerConfig.home}>
                    Trang chủ{" "}
                  </Link>
                </li>
                <li className="breadcrumb-item flex items-center">
                  <Link href="">Giới thiệu</Link>
                </li>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="introduce px-24 flex justify-between w-full py-12 bg-[#f3f3f3]">
        <div className="w-1/2">
          <div className="text-[#3d3d3d] text-[18px] font-normal">
            <span className="">Giới thiệu chung về </span>
            <h1 className="text-[40px] font-bold">
              GARA Ô TÔ <span className="text-[#FF0000]">MIỀN TRUNG </span>
            </h1>
            <p className="block pr-40">
              GARAGE Ô TÔ MIỀN TRUNG được biết đến là một trong những garage uy
              tín, chuyên cung cấp dịch vụ: máy gầm đồng sơn; sơn xe, điện -
              điện lạnh xe ô tô, sửa chữa, thay thế phụ tùng, lắp đặt nội thất,
              đồ chơi xe ô tô; tư vấn bảo hiểm, tư vấn mua bán xe ô tô...
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

      <div className="section-default">
        <div className="w-full mx-auto px-28 py-24">
          <p className="text-justify mb-6">
            Ngày nay, nền kinh tế Việt Nam đang trên đà phát triển, cùng với nhu
            cầu cơ bản của con người là ăn ở sinh hoạt thì nhu cầu sở hữu xe ô
            tô ngày càng nhiều. Tuy nhiên kiến thức kỹ thuật về sử dụng và bảo
            quản xe của nhiều người còn hạn chế. Vì vậy ai cũng muốn tìm cho
            chiếc xe của mình một gara bảo dưỡng sửa chữa uy tín chất lượng và
            minh bạch. Đứng trước nhu cầu lớn của khách hàng, tìm được một địa
            chỉ uy tín, đáng tin cậy giữa hàng trăm đại lý sửa chữa có mặt trong
            thành phố là nỗi băn khoăn hàng đầu của các chủ phương tiện ô tô.
          </p>

          <p className="text-justify mb-6">
            Được thành lập từ năm 2009 ,với đội ngũ kỹ sư và kỹ thuật viên ô tô
            yêu nghề, tận tâm với công việc cùng quy trình làm việc rõ ràng và
            chuyên nghiệp, garage ô tô MIỀN TRUNG đã tạo nên uy tín cùng niềm
            tin cho mọi khách hàng sử dụng dịch vụ của Garage tại Hải Phòng.
            Garage MIỀN TRUNG mang tới cho người dân Hải Phòng có thêm một lựa
            chọn sáng suốt vào các dịch vụ cung ứng chuyên nghiệp cho các dòng
            xe từ thông dụng đến cao cấp trên thị trường.
          </p>

          <p className="text-justify mb-6">
            <strong>GARA Ô TÔ - MIỀN TRUNG</strong> chuyên cung cấp dịch vụ sửa
            chữa ô tô các loại, với hơn 350 m² diện tích nhà xưởng, các trang
            thiết bị được đầu tư khang trang, hiện đại và với đội ngũ cán bộ
            quản lý, kỹ thuật viên lành nghề giàu kinh nghiệm và rất chuyên
            nghiệp. MIỀN TRUNG đang ngày càng phát triển và đến gần với khách
            hàng hơn. Nơi đây được khách hàng đánh giá là một trong những trung
            tâm bảo dưỡng và sửa chữa ô tô uy tín hàng đầu tại Hải Phòng.
          </p>

          <p className="text-justify mb-6">
            Garage ô tô MIỀN TRUNG luôn luôn cố gắng để trở thành nơi cung cấp
            hàng đầu các dịch vụ <strong>“Chăm sóc xe toàn diện”</strong> cho quý khách hàng, là
            gara có thương hiệu về tất cả các dịch vụ liên quan đến bảo trì, bảo
            dưỡng, sửa chữa ô tô. Nơi đây cũng sẽ như một spa hiện đại trong
            lĩnh vực làm đẹp, làm mới với những phụ tùng, thiết bị chính hãng uy
            tín nhất trên thị trường. Để làm được điều đó, chúng tôi lắng nghe
            để hiểu nhu cầu của bạn, đưa ra các giải pháp hiệu quả và đi cùng
            bạn cho một kết quả tốt hơn hàng ngày.
          </p>

          <p className="text-justify mb-6"><strong>DỊCH VỤ CỦA CHÚNG TÔI:</strong></p>

          <p className="text-justify mb-6"><strong>I. SỬA CHỮA – BẢO DƯỠNG Ô TÔ.</strong></p>

          <ul className="mb-6 list-disc pl-10">
            <li>Chẩn đoán, đọc, xóa lỗi ô tô thế hệ mới.</li>
            <li>Hệ thống phun xăng điện tử EFI, GDI</li>
            <li>Sửa chữa, bảo dưỡng, đại tu Máy – Gầm – Điện</li>
            <li>Điện - Điện lạnh</li>
            <li>Hỗ trợ sửa chữa lưu động, sửa chữa tại nhà, cơ quan.</li>
          </ul>

          <p className="text-justify mb-6"><strong>II. ĐỒNG, SƠN Ô TÔ</strong></p>

          <ul className="mb-6 list-disc pl-10">
            <li>Gò, Hàn, Sơn ,phục hồi xe tai nạn.</li>
            <li>Sơn La zăng.</li>
            <li>Sơn chóe đèn ô tô.</li>
          </ul>

          <p className="text-justify mb-6"><strong>III. CHĂM SÓC XE.</strong></p>

          <ul className="mb-6 list-disc pl-10">
            <li>Rửa xe, rửa gầm, hút bụi.</li>
            <li>Rửa và bảo dưỡng khoang máy.</li>
            <li>Xúc rửa két nước, thay dầu nhớt động cơ.</li>
            <li>Chăm sóc nội thất ô tô, da, nỉ.</li>
            <li>Vệ sinh dàn lạnh, khử mùi điều hòa.</li>
            <li>
              Đánh bóng toàn bộ thân xe theo 3 bước Sonax bằng máy chuyên dụng.
            </li>
            <li>Dán phim cách nhệt 3M, Vkool,… chính hãng.</li>
            <li>Cách âm, cách nhệt toàn xe.</li>
            <li>Phủ Nano sơn, Nano kính.</li>
            <li>Phủ gầm chống rỉ, chống đá văng, giảm ồn.</li>
          </ul>

          <p className="text-justify mb-6">
            <strong>IV. LẮP ĐẶT PHỤ KIỆN ĐỒ CHƠI TRÊN XE TÔ TÔ</strong>
          </p>

          <p className="text-justify mb-6"><strong>V. TƯ VẤN BẢO HIỂM Ô TÔ</strong></p>

          <p className="text-justify mb-6">
            Bằng niềm tin vững chắc, cùng với lòng nhiệt huyết của ban giám đốc
            và đội ngũ nhân viên, kỹ thuật viên chuyên nghiệp,lành nghề và năng
            động, tận tâm với công việc. Hệ thống kĩ thuật ổn định, hỗ trợ kĩ
            thuật 24/24 Garage ô tô MIỀN TRUNG đã có những bước đi vững chắc,
            đầy ấn tượng và đáng tự hào trên thị trường xe ô tô hiện nay.
          </p>

          <p className="text-justify mb-6">
            Với sự chuyên nghiệp và sự tận tâm, kinh nghiệm nhiều năm trong lĩnh
            vực kinh doanh, sửa chữa ô tô tại Hải Phòng, chúng tôi khẳng định
            chất lượng đảm bảo sẽ mang đến cho quý khách sự hài lòng, ô tô của
            quý khách được chăm sóc hoàn hảo toàn diện nhất. Sử dụng dịch vụ sửa
            chữa, thay thế phụ tùng tại ô tô MIỀN TRUNG, quý khách hàng sẽ yên
            tâm về chất lượng, xuất xứ, nguồn gốc cũng như hàng hóa sẽ được bảo
            hành đúng theo tiêu chuẩn như bất kì một gara chính hãng nào có mặt
            trên thị trường Việt Nam. Đặc biệt là trong các dịch vụ dầu máy,
            thay thế nội thất, sử dụng dòng sơn chính hãng dupont của Mỹ, Aisa,
            RM…Chất lượng được đảm bảo tuyệt đối.
          </p>

          <p className="text-justify mb-6">
            Khách hàng sử dụng bất cứ 1 dịch vụ nào của chúng tôi đều nhận được
            sự quan tâm chu đáo, phục vụ tận tình, nhanh chóng và hiệu quả. Đồng
            hành cùng gara ô tô MIỀN TRUNG luôn có những chính sách ưu đãi hợp
            lí về giá cả, chăm sóc xe miễn phí hàng quý và hàng năm để tri ân
            tới khách hàng yêu quý. Khách hàng có thể hoàn toàn yên tâm về xế
            yêu mình khi đến với Garage MIỀN TRUNG. Chúng tôi cam kết những sản
            phẩm và dịch vụ luôn đạt chất lượng tốt nhất. Với mục tiêu
            <span>CHÚNG TÔI CAM KẾT HƯỚNG TỚI SỰ HÀI LÒNG CỦA QUÝ KHÁCH</span>
          </p>

          <p>
            Đến với Garage MIỀN TRUNG quý khách hàng hoàn toàn yên tâm về chất
            lượng sản phẩm cũng như dịch vụ sửa chữa. Garage ô tô Đức Anh cam
            kết bằng uy tín và chất lượng với trình độ tay nghề ngày một nâng
            cao, phát triển hơn trong thời gian tới. Gara MIỀN TRUNG hân hạnh
            được phục vụ Quý khách.
          </p>

          <h3 className="text-center mt-10">
            <span className="text-[#FF0000] text-[30px]">
              <strong>Chúc Quý khách Thượng lộ Bình An!</strong>
            </span>
          </h3>
        </div>
      </div>
    </div>
  );
}

export default Introduce;
