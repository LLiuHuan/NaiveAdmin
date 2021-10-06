import { getAppEnvConfig } from "@/utils/env";
import HttpClient, { HttpClientConfig } from "axios-mapper";
import { useLoadingBar } from "naive-ui";
import { useStore } from "vuex";
import { storage } from "@/utils/Storage";
import { ACCESS_TOKEN } from "@/store/modules/user/state";

let requestCount = 0;

const { VITE_GLOB_API_URL } = getAppEnvConfig();
const store = useStore();
const loadingBar = useLoadingBar();

const https = (hasToken = true) => {
  const config: HttpClientConfig = {
    baseURL: VITE_GLOB_API_URL,
    headers: {
      Authorization: hasToken ? `Bearer ${storage.get(ACCESS_TOKEN)}` : "",
    },
    timeout: 10 * 1000,
    withCredentials: true,
  };

  const http = new HttpClient(config);

  // 请求前拦截
  http.httpClient.interceptors.request.use(
    function (config) {
      // Do something before request is sent
      if (http.httpClient.defaults.headers.isLoading !== false) {
        showLoading();
      }
      if (store.getters.getToken) {
        config.headers.Authorization = `Bearer ${store.getters.getToken}`;
      }
      return config;
    },
    function (error) {
      // Do something with request error
      if (http.httpClient.defaults.headers.isLoading !== false) {
        errorLoading();
      }
      return Promise.reject(error);
    }
  );

  http.httpClient.interceptors.response.use(
    function (response) {
      // Do something with response data
      if (http.httpClient.defaults.headers.isLoading !== false) {
        hideLoading();
      }
      return response;
    },
    function (error) {
      // Do something with response error
      if (http.httpClient.defaults.headers.isLoading !== false) {
        errorLoading();
      }
      return Promise.reject(error);
    }
  );

  return http;
};

const showLoading = () => {
  if (requestCount === 0) {
    setTimeout(() => {
      if (requestCount !== 0) {
        loadingBar.start();
      }
    }, 100);
  }
  requestCount++;
};

const hideLoading = () => {
  requestCount--;
  if (requestCount === 0) {
    if (loadingBar) {
      loadingBar.finish();
    }
  }
};

const errorLoading = () => {
  loadingBar.error();
};

// // Add a request interceptor
// https.httpClient.interceptors.request.use(function (config) {
//     // Do something before request is sent
//     return config;
// }, function (error) {
//     // Do something with request error
//     return Promise.reject(error);
// });
//
// // Add a response interceptor
// https.httpClient.interceptors.response.use(function (response) {
//     // Do something with response data
//     return response;
// }, function (error) {
//     // Do something with response error
//     return Promise.reject(error);
// });

export default https;
