import SliderComponent from "../../components/Slider/slider";

function Home() {
  return (
    <>
      <div className="home relative">
        <div className="content absolute bg-[#0000004d] z-10 w-full h-full text-white flex flex-col justify-center px-16">
          <h1 className="text-[60px] font-black leading-10">GARRA Ô TÔ MIỀN TRUNG</h1>
          <p className="py-3 text-[30px]">Dịch vụ sửa chữa ô tô tốt nhất </p>
          <div className="mt-4">
            <button className="btn btn-primary mr-3">Đặt lịch hẹn</button>
            <button className="btn btn-disabled">Liên hệ</button>
          </div>
        </div>
        <SliderComponent></SliderComponent>
      </div>
    </>
  );
}

export default Home;
