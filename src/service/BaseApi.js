import axios from "axios";
// import { baseURL } from "common/config";
// import { USER_LOGOUT } from "store/ActionTypes";
const baseURL = "https://localhost:44369/";
const baseURL_PROVINCE = "https://vapi.vnappmob.com/"

const instance = axios.create({
  timeout: 100000,
  maxContentLength: 10000,
});

const defaultOptions = {
  headers: {
    accept: "application/json",
    contentType: "application/json",
    Authorization: "",
  },
};

const _get = (url, params = {}, options = {}) => {
  return instance.get(baseURL + url, {
    ...defaultOptions,
    options,
    ...{ params },
  });
};

const _getProvince = (url, params = {}, options = {}) => {
  return instance.get(baseURL_PROVINCE + url, {
    ...defaultOptions,
    options,
    ...{ params },
  });
};

const post = (url, body = {}, options = {}) =>
  instance.post(baseURL + url, body,  { ...defaultOptions, options });
const put = (url, body = {}, options = {}) =>
  instance.put(baseURL + url, body, { ...defaultOptions, options });
const patch = (url, body = {}, options = {}) =>
  instance.patch(baseURL + url, body, { ...defaultOptions, options });
const _delete = (url, options = {}) =>
  instance.delete(baseURL + url, { ...defaultOptions, options });

const interceptorHandleRequest = (config) => {
  const token = localStorage.getItem('token');
  config.headers.Authorization = `Bearer ${token}`;
  return config;
};

// const interceptorHandleReponse = (response) => response;
// const handleError = (error) => {
//   const errorJson = JSON.parse(JSON.stringify(error));
//   if (errorJson?.status === 401) {
//     store.dispatch({
//       type: USER_LOGOUT,
//     });
//   }
//   return Promise.reject(
//     get(error, "response.data.message") || errorJson?.message
//   );
// };


instance.interceptors.request.use(interceptorHandleRequest);
// instance.interceptors.response.use(interceptorHandleReponse, handleError);

export { _get as get, _getProvince as getProvince , post, put, patch, _delete as delete };
