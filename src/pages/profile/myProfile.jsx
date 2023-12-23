import * as React from "react";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { format, parseISO } from "date-fns";
import EditProfile from "./editProfile";
import { selectDep, setDependence } from "../../store/reducers/depReducer";
import { useSelector, useDispatch } from "react-redux";

const MyProfile = ({ data }) => {
  const [modalEdit, setModalEdit] = useState(false);
  const dep = useSelector(selectDep);
  const dispatch = useDispatch();

  const handleCancel = () => {
    setModalEdit(false);
  };
  const handleReload = async () => {
    setModalEdit(false);
    dispatch(setDependence({}));
  };
  // React.useEffect(() => {
  //   handleReload();
  // }, [dep]);
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
            <strong>{data && data.name}</strong>
          </h3>
        </div>
      </div>
      <div className="mt-20 w-[300px] flex flex-col justify-center">
        <div className="flex justify-between my-3">
          <span className="w-[150px]">Ngày sinh</span>
          <span>
            <strong>
              {data.dateOfBirth ? (
                format(parseISO(data.dateOfBirth), "dd/MM/yyyy")
              ) : (
                <span>-</span>
              )}
            </strong>
          </span>
        </div>
        <div className="flex justify-between my-3">
          <span className="w-[150px]">Số điện thoại</span>
          <span>
            <strong>{data.phoneNumber}</strong>
          </span>
        </div>
        <div className="flex justify-between my-3">
          <span className="w-[150px]">Email</span>
          <span>
            <strong>{data.email}</strong>
          </span>
        </div>
        <div className="flex justify-between my-3">
          <span className="w-[150px]">Địa chỉ </span>
          <span>
            <strong>{data.address}</strong>
          </span>
        </div>
      </div>
      {modalEdit && (
        <div className="detail-modal flex-col">
          <EditProfile
            open={modalEdit}
            data={data}
            handleCancel={handleCancel}
            handleReload={handleReload}
            modal={modalEdit}
          />
        </div>
      )}
    </div>
  );
};

export default MyProfile;
