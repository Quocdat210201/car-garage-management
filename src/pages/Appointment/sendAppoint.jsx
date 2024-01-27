import { Link, NavLink } from "react-router-dom";
import routerConfig from "../../config";
import { FaCheck } from "react-icons/fa";

function SendAppoint() {
  return (
    <div className="flex justify-center flex-col items-center my-20">
      <FaCheck className="w-16 h-16 p-3 bg-[#349034] text-white rounded-full" />
      <p className="text-[20px] font-semibold mt-2 text-center">
        Lịch hẹn của bạn đã được gửi đi. Chúng tôi sẽ xác nhận và phản hồi lại
        cho bạn sớm nhất. <br></br>Cảm ơn bạn đã quan tâm đến gara chúng tôi.{" "}
      </p>
      <Link href="" to={routerConfig.home}>
        <button className="bg-red-500 text-white py-2 mt-6 px-4 rounded ">
          Trang chủ
        </button>
      </Link>
    </div>
  );
}
export default SendAppoint;
