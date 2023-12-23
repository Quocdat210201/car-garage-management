import * as React from "react";

function ChangePassword() {
  return (
    <div className="min-h-[350px]">
      <h3 className="text-[20px] font-semibold mr-2">Đổi mật khẩu</h3>
      <div>
        <div className="flex justify-start items-center mt-6 ml-6">
          <label className="mr-5 text-[16px] w-[160px]">Mật khẩu cũ: </label>
          <input
            type="password"
            placeholder="Nhập mật khẩu cũ..."
            // value={user.phoneNumber}
            // onChange={(event) => handleInputChange(event, "phoneNumber")}
            className="custom-input-profile w-60 p-2.5"
          />
        </div>
        <div className="flex justify-start items-center mt-6 ml-6">
          <label className="mr-5 text-[16px] w-[160px]">Mật khẩu mới: </label>
          <input
            type="password"
            placeholder="Nhập mật khẩu mới..."
            // value={user.phoneNumber}
            // onChange={(event) => handleInputChange(event, "phoneNumber")}
            className="custom-input-profile w-60 p-2.5"
          />
        </div>
        <div className="flex justify-start items-center mt-6 ml-6">
          <label className="mr-5 text-[16px] w-[160px]">
            Nhập lại mật khẩu mới:{" "}
          </label>
          <input
            type="password"
            placeholder="Nhập lại mật khẩu mới..."
            // value={user.phoneNumber}
            // onChange={(event) => handleInputChange(event, "phoneNumber")}
            className="custom-input-profile w-60 p-2.5"
          />
        </div>
        <div className="mt-10 ml-[386px]">
          <button
            // onClick={handleLogout}
            className="bg-red-500 text-white py-2 px-4 rounded">
            Lưu{" "}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
