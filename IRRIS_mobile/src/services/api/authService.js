import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    console.log("response", response);
    return response.data;
  } catch (error) {
    console.error("Login error", error.response);
    throw error;
  }
};

export const getStudent = async () => {
  try {
    const response = await axios.get(`${API_URL}/getstudent`);
    console.log("response", response);
    return response.data;
  } catch (error) {
    console.error("Login error", error.response);
    throw error;
  }
};
