// axios instance in api.js
import axios from "axios";

const api = axios.create({
  // baseURL: "http://127.0.0.1:8000/api",
  baseURL: "https://irris-sbit4a-api.com/api",
});

export default api;
