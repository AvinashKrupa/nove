import axios from "axios";
import LocalStorageService from "../../storage/LocalStorageService";
// import router from "./router/router";
import qs from "qs";
// LocalstorageService
const localStorageService = LocalStorageService.getService();

// Set config defaults when creating the instance
const instance = axios.create({
  baseURL: "http://3.109.205.233:1862",
});

// Add a request interceptor

instance.interceptors.request.use(
  (config) => {
    const token = localStorageService.getAccessToken();
    const userToken = localStorageService.getUserToken();
    if (token && config.url !=='getCustomerDetails' && token && config.url !=='getOrdersByCustomer') {
      config.headers["accessToken"] = token;
    }else {
        config.headers["accessToken"] = userToken;
    }
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

//Add a response interceptor

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    const originalRequest = error.config;

    try {
      if (
        error.response.status === 401 &&
        originalRequest.url === "http://3.109.205.233:1862/createOAuthToken"
      ) {
        //  router.push('/login');
        return Promise.reject(error);
      }
    } catch {
      return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const headers = {
        "Content-Type": "application/json",
      };
      return axios.post("http://3.109.205.233:1862/createOAuthToken").then((res) => {
        if (res.status === 200) {
          localStorageService.setToken(res.data.access_token);
            originalRequest.headers.accessToken = localStorageService.getAccessToken();
          return axios(originalRequest);
        }
      });
    }
    return Promise.reject(error);
  }
);
export default instance;
