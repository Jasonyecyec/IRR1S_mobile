import api from "./api";

export const getJobOrder = async (userId) => {
    try {
      const response = await api.get(`/job-order/${userId}`);
      return response.data;
    } catch (error) {
      console.error("Get Job Order error", error.response);
      throw error;
    }
  };