import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";

console.log({ url: import.meta.env.VITE_BASE_URL });
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

axiosInstance.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
axiosInstance.defaults.headers.post["Content-Type"] = "application/json";

export const axiosInstance2 = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-type": "multipart/form-data",
  },
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  function (config: InternalAxiosRequestConfig) {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  function (error: unknown) {
    // Do something with request error
    return Promise.reject(error);
  }
);

axiosInstance2.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = localStorage.getItem("accessToken") as string;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response;
  },
  function (error) {
    // Do something with response error
    return Promise.reject(error);
  }
);
axiosInstance2.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response;
  },
  function (error: AxiosError) {
    // Do something with response error
    return Promise.reject(error);
  }
);

export const axiosInstanceFormData = axiosInstance2;
export default axiosInstance;

// import axios, { InternalAxiosRequestConfig } from "axios";

// const api = axios.create({
//   baseURL: process.env.REACT_APP_BACKEND_URL,
//   // baseURL: `https://waste-api-staging.shaktihub.org/api/v1`,
//   //   headers: {
//   //     "Content-Type": "application/json",
//   //     "Access-Control-Allow-Origin": "*",
//   //   },
// });

// console.log({ baseUrl: process.env.REACT_APP_BACKEND_URL });

// api.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
// api.defaults.headers.post["Content-Type"] = "application/json";
// // api.defaults.withCredentials = true;

// const httpClient = axios.create();
// // sending request
// httpClient.interceptors.request.use(
//   async (config: any) => {
//     const token = window.localStorage.getItem("token");
//     config.headers = {
//       Authorization: `Bearer ${token}`,
//       Accept: "application/json",
//       ContentType: "multipart/form-data",
//     };
//     return config;
//   },
//   (error) => {
//     Promise.reject(error);
//   }
// );

// // response
// httpClient.interceptors.response.use(
//   function (response) {
//     {
//       /**console.log(response); */
//     }
//     return response;
//   },
//   async function (error) {
//     if (error?.response?.status === 401) {
//       console.log("401 error");
//       window.localStorage.removeItem("token");
//       window.localStorage.removeItem("user");
//       window.location.href = "/auth/login";
//     }
//     return Promise.reject(error);
//   }
// );
// export { api, httpClient };
