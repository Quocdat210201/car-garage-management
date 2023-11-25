import { Link, NavLink } from "react-router-dom";
import routerConfig from "../../config";

function Appointment() {
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
              <h1 className="b-title-page">ĐẶT LỊCH HẸN</h1>
              <div className="breadcrumb">
                <li className="breadcrumb-item text-[#d01818]">
                  <Link href="" to={routerConfig.home}>
                    Trang chủ{" "}
                  </Link>
                </li>
                <li className="breadcrumb-item flex items-center">
                  <Link href="">Đặt lịch hẹn</Link>
                </li>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="my-6 px-28">
        <div className="flex justify-start items-center">
          <span className="block w-1.5 h-10 bg-[red]"></span>
          <h1 className="text-[20px] font-medium ml-2">
            Đặt lịch hẹn với chúng tôi
          </h1>
        </div>
        <div className="">
          <form action="">
            <div className="">
              <div className="flex items-center pt-8">
                <div className=" flex h-[28px] w-16">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/5/55/Yemen_Coast_Guard_racing_stripe.svg"
                    alt=""
                  />
                </div>
                <h1 className="text-[20px] font-medium ml-2">Thông tin xe</h1>
              </div>
              <div className="flex">
                <div className="flex flex-col w-1/4 mt-4 pl-8">
                  <label className="text-[18px] mb-2">Biển số xe</label>
                  <input
                    type="text"
                    placeholder="Nhập biển số xe"
                    className="input-appoint"
                  />
                </div>
                <div className="flex flex-col w-1/4 mt-4 pl-8">
                  <label className="text-[18px] mb-2">Hãng xe </label>
                  <select className="input-appoint" name="">
                    <option value="">--Chọn hãng xe--</option>
                    <option value="dog">Audi</option>
                    <option value="cat">Porches</option>
                  </select>
                </div>
                <div className="flex flex-col w-1/4 mt-4 pl-8">
                  <label className="text-[18px] mb-2">Nơi sản xuất</label>
                  <input
                    type="text"
                    placeholder="Nhập nơi sản xuất"
                    className="input-appoint"
                  />
                </div>
                <div className="flex flex-col w-1/4 mt-4 pl-8">
                  <label className="text-[18px] mb-2">Năm sản xuất</label>
                  <input type="date" className="input-appoint" />
                </div>
              </div>
            </div>
            <div className="">
              <div className="flex items-center pt-8">
                <div className=" flex h-[28px] w-16">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/5/55/Yemen_Coast_Guard_racing_stripe.svg"
                    alt=""
                  />
                </div>
                <h1 className="text-[20px] font-medium ml-2">
                  Thông tin liên hệ
                </h1>
              </div>
              <div className="flex">
                <div className="flex flex-col w-1/4 mt-4 pl-8">
                  <label className="text-[18px] mb-2">Họ và tên</label>
                  <input
                    type="text"
                    placeholder="Nhập họ và tên"
                    className="input-appoint"
                  />
                </div>
                <div className="flex flex-col w-1/4 mt-4 pl-8">
                  <label className="text-[18px] mb-2">Số điện thoại</label>
                  <input
                    type="number"
                    placeholder="Nhập số điện thoại"
                    className="input-appoint"
                  />
                </div>
                <div className="flex flex-col w-1/4 mt-4 pl-8">
                  <label className="text-[18px] mb-2">Email</label>
                  <input
                    type="text"
                    placeholder="Nhập email"
                    className="input-appoint"
                  />
                </div>
                <div className="flex flex-col w-1/4 mt-4 pl-8">
                  <label className="text-[18px] mb-2">Địa chỉ</label>
                  <input
                    type="text"
                    placeholder="Nhập địa chỉ"
                    className="input-appoint"
                  />
                </div>
              </div>
            </div>
            <div className="">
              <div className="flex items-center pt-8">
                <div className=" flex h-[28px] w-16">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/5/55/Yemen_Coast_Guard_racing_stripe.svg"
                    alt=""
                  />
                </div>
                <h1 className="text-[20px] font-medium ml-2">Chi tiết</h1>
              </div>
              <div className="flex">
                <div className="flex flex-col w-1/4 mt-4 pl-8">
                  <label className="text-[18px] mb-2">Ngày hẹn</label>
                  <input type="date" className="input-appoint" />
                </div>
                <div className="flex flex-col w-1/4 mt-4 pl-8">
                  <label className="text-[18px] mb-2">Thời gian</label>
                  <input type="time" className="input-appoint" />
                </div>
              </div>
              <div className="flex flex-col w-1/2 mt-4 pl-8">
                <label className="text-[18px] mb-2">Nội dung</label>
                <textarea
                  name=""
                  id=""
                  cols="3"
                  rows="3"
                  placeholder="Nội dung"
                  className="input-appoint"></textarea>
              </div>
            </div>
            <div className="action">
              <button className="btn btn-primary ml-8 mt-10">Gửi lịch hẹn</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Appointment;
