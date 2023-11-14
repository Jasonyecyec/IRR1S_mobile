import api from "./api";

export const activateStudent = async (email) => {
  try {
    const response = await api.post(`/activate-account`, { email });
    console.log("response", response);
    return response.data;
  } catch (error) {
    console.error("Activate error", error.response);
    throw error;
  }
};
