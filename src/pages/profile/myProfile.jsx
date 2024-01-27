import * as React from "react";
import { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { format, parseISO } from "date-fns";
import EditProfile from "./editProfile";
import { userApi, updateUserApi } from "../../service/UserService";
import { toast } from "react-toastify";

const MyProfile = () => {
  const [modalEdit, setModalEdit] = useState(false);
  const [user, setUser] = useState([]);

  const handleCancel = () => {
    setModalEdit(false);
  };
  const handleReload = async () => {
    setModalEdit(false);
  };

  const getUser = async () => {
    try {
      const { data } = await userApi();
      setUser(data);
    } catch {
      console.error();
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleUpdateUser = async (userEdit) => {
    try {
      await updateUserApi(userEdit);
      toast.success("Lưu thành công !");
      handleCancel()
      getUser();
    } catch (error) {
      toast.error("Error updating user information");
      console.error(error);
    }
  };
  return (
    <div className="w-full flex min-h-[350px]">
      <div className="flex flex-col justify-center pr-16">
        <div className="w-full flex justify-center mb-6">
          <h3 className="text-[20px] font-semibold mr-2">Thông tin cá nhân</h3>
          <button className="" onClick={() => setModalEdit((prev) => !prev)}>
            <FaEdit className="text-[26px] p-1" />
          </button>
        </div>
        <div className="w-full flex flex-col justify-center items-center relative">
          <img
            src="https://www.shareicon.net/data/512x512/2016/05/24/770117_people_512x512.png"
            alt=""
            className="w-[200px] h-[200px] object-cover"
          />

          <h3 className="text-[20px] p-2">
            <strong>{user && user.name}</strong>
          </h3>
        </div>
      </div>
      <div className="mt-20 w-[300px] flex flex-col justify-center">
        <div className="flex justify-between my-3">
          <span className="w-[150px]">Ngày sinh</span>
          <span>
            <strong>
              {user.dateOfBirth ? (
                format(parseISO(user.dateOfBirth), "dd/MM/yyyy")
              ) : (
                <span>-</span>
              )}
            </strong>
          </span>
        </div>
        <div className="flex justify-between my-3">
          <span className="w-[150px]">Số điện thoại</span>
          <span>
            <strong>{user.phoneNumber}</strong>
          </span>
        </div>
        <div className="flex justify-between my-3">
          <span className="w-[150px]">Email</span>
          <span>
            <strong>{user.email}</strong>
          </span>
        </div>
        <div className="flex justify-between my-3">
          <span className="w-[150px]">Địa chỉ </span>
          <span>
            <strong>{user.address}</strong>
          </span>
        </div>
      </div>
      {modalEdit && (
        <div className="detail-modal flex-col">
          <EditProfile
            open={modalEdit}
            data={user}
            handleCancel={handleCancel}
            handleReload={handleReload}
            modal={modalEdit}
            handleUpdateUser={handleUpdateUser}
          />
        </div>
      )}
    </div>
  );
};

export default MyProfile;
