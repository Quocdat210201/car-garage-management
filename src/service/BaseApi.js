import axios from "axios";
import { BASE_API_URL } from "common/config";
import { store } from "store";
import get from "lodash/get";
import { USER_LOGOUT } from "store/ActionTypes";

const instance = axios.create({
    timeout: 100000,
    maxContentLength: 10000,
  });

  const defaultOptions = {
  
    headers: {
      accept: 'application/json',
      contentType: 'application/json',
      Authorization: '',
    },
  };