import {post, get, put, getProvince} from "./BaseApi"

const loginApi = async (phoneNumber, password) => {
    const res = await post("api/account/login", {phoneNumber, password});
    return res.data;
}

const userApi = async () => {
    const res = await get("api/user");
    return res.data;
}

const updateUserApi = async (user) => {
    const res = await put("api/user/update-user", user);
    return res.data;
}

const apiProvince = async () => {
    const res = await getProvince("api/province/1")
    return res;
}

const apiProvinceDistrict = async () => {
    const res = await getProvince(`api/province/district/${48}`)
    return res;
}

const apiProvinceWard = async (districtId) => {
    const res = await getProvince(`api/province/ward/${districtId}`)
    return res;
}


// const listUser = async () => {
//     const res = await get("api/account/login");
//     return res.data;
// }

export {loginApi, userApi, updateUserApi, apiProvince, apiProvinceDistrict, apiProvinceWard}