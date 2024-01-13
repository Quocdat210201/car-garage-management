import { post, get, put, getProvince, delete as _delete } from "./BaseApi";
import axios from "axios";

const loginApi = async (phoneNumber, password) => {
  const res = await post("api/account/login", { phoneNumber, password });
  return res.data;
};

const registerApi = async (user) => {
  const res = await post("api/account/sign-up", user);
  return res.data;
};

const userApi = async () => {
  const res = await get("api/user");
  return res.data;
};

const updateUserApi = async (user) => {
  const res = await put("api/user/update-user", user);
  return res.data;
};

const apiProvinceDistrict = async () => {
  const res = await get("api/district");
  return res;
};

const apiProvinceWard = async (districtId) => {
  const res = await get(`api/ward/district?districtId=${districtId}`);
  return res;
};

const apiAppointmentSchedule = async (data) => {
  const res = await post("api/appointment-schedule", data);
  return res;
};

const getAppointmentSchedule = async () => {
  const res = await get(`api/appointment-schedule`);
  return res;
};

const getAppointmentScheduleStaff = async (staffId) => {
  const res = await get(`api/admin-appointment-schedule/by-staff/${staffId}`);
  return res;
};

const AssignSchedule = async (staffId, assign) => {
  const res = await put(
    `api/admin-appointment-schedule/assign/${staffId}`,
    assign
  );
  return res;
};

const FinishAssign = async (id, assign) => {
  const res = await put(`api/admin-appointment-schedule/staff-update/${id}`, assign);
  return res;
};


const FinishAssignStaff = async (id) => {
  const res = await put(`api/admin-appointment-schedule/staff-finish/${id}`);
  return res;
};


const serviceApi = async () => {
  const res = await get("api/repair-service");
  return res;
};

const serviceDetailApi = async (id) => {
  const res = await get(`api/repair-service/${id}`);
  return res;
};

const carBrandApi = async () => {
  const res = await get(`api/car-brand`);
  return res;
};

const getcarTypeApi = async () => {
  const res = await get(`api/car-type`);
  return res;
};

const carTypeApi = async (carBrandId) => {
  const res = await get(`api/car-type/car-brand?carBrandId=${carBrandId}`);
  return res;
};

const getCarApi = async () => {
  const res = await get(`api/car`);
  return res;
};

const deleteCar = async (carId) => {
  const res = await _delete(`api/car/${carId}`);
  return res;
};

const getCarRegistrationNumber = async (registrationNumber) => {
  const res = await get(`api/car/registration-number?registrationNumber=${registrationNumber}`);
  return res;
};

const getAccount = async (Role) => {
  const res = await get(`api/admin-user/get-user-by-role?Role=${Role}`);
  return res;
};

const deleteAccount = async (accountId) => {
  const res = await _delete(`api/admin-user/delete-user/${accountId}`);
  return res;
};

const AdminGoodsDeliveryNote = async (data) => {
  const res = await post(`api/admin-goods-delivery`, data);
  return res;
};

const getAdminGoodsDeliveryNote = async () => {
  const res = await get(`api/admin-goods-delivery`);
  return res;
};

const getAutomotivePart = async (CategoryId, PartSupplierId) => {
  const res = await get(
    `api/automotive-part/category-supplier?CategoryId=${CategoryId}&AutomotivePartSupplierId=${PartSupplierId}`
  );
  return res;
};

const getAutomotivePartCategory = async () => {
  const res = await get(`api/automotive-part-category`);
  return res;
};

const getListAutomotivePart = async () => {
  const res = await get(`api/automotive-part`);
  return res;
};


const getAutomotivePartSupplier = async () => {
  const res = await get(`api/automotive-part-supplier`);
  return res;
};
const getBill = async () => {
  const res = await get(`api/admin-bill`);
  return res;
};


const getBillDetail = async (id) => {
  const res = await get(`api/admin-bill/${id}`);
  return res;
};

export {
  loginApi,
  registerApi,
  userApi,
  updateUserApi,
  apiProvinceDistrict,
  apiProvinceWard,
  apiAppointmentSchedule,
  getAppointmentSchedule,
  AssignSchedule,
  FinishAssign,
  FinishAssignStaff,
  getAppointmentScheduleStaff,
  serviceApi,
  serviceDetailApi,
  carBrandApi,
  carTypeApi,
  getcarTypeApi,
  getCarApi,
  deleteCar,
  getAccount,
  deleteAccount,
  AdminGoodsDeliveryNote,
  getAdminGoodsDeliveryNote,
  getAutomotivePartSupplier,
  getAutomotivePartCategory,
  getAutomotivePart,
  getListAutomotivePart,
  getCarRegistrationNumber,
  getBill,
  getBillDetail
};
