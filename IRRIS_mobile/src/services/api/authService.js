import axios from "axios";
import api from "./api";

export const login = async (email, password) => {
  try {
    const response = await api.post(`/login`, { email, password });
    console.log("response", response);
    return response.data;
  } catch (error) {
    console.error("Login error", error.response);
    throw error;
  }
};

export const getStudent = async () => {
  try {
    const response = await api.get(`/getstudent`);
    console.log("response", response);
    return response.data;
  } catch (error) {
    console.error("Login error", error.response);
    throw error;
  }
};
