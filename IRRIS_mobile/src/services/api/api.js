// axios instance in api.js
import axios from "axios";
import Cookies from "js-cookie";


const api = axios.create({
  // baseURL: "http://127.0.0.1:8000/api",
  baseURL: "https://irris-sbit4a-api.com/api",
});

// api.interceptors.request.use(
//   (config) => {
//     // Get the token from wherever you stored it
//     const token = Cookies.get("authToken");; // Replace with your actual token

//     // Set the Authorization header for every request
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export default api;
