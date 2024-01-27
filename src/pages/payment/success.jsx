import { Link, NavLink } from "react-router-dom";
import routerConfig from "../../config";
import { FaCheck } from "react-icons/fa";

function SendAppoint() {
  return (
    <div className="flex justify-center flex-col items-center my-20">
      <FaCheck className="w-16 h-16 p-3 bg-[#349034] text-white rounded-full" />
      <p className="text-[20px] font-semibold mt-2 text-center">
        Thanh toán thành công
      </p>
      <Link href="" to={routerConfig.profile}>
        <button className="bg-red-500 text-white py-8 mt-10 px-4 rounded ">
          Quay về trang chủ
        </button>
      </Link>
    </div>
  );
}
export default SendAppoint;
