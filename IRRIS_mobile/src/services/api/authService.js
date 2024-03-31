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


export const registerStudent = async (form) => {
  try {
    const response  = await api.post('/register-student',form)
    console.log("Register student response",response)
    return response.data
  } catch (error) {
    console.error("Login error", error.response);
    throw error;
  }
}

export const registerStaff = async (form) => {
  try {
   
    const response = await api.post('/register-staff', form);

    console.log('Fetch register staff  response:', response);
    return response.data;
  } catch (error) {
    console.error('Fetch register staff  error:', error.response || error.message);
    throw error;
  }
};
