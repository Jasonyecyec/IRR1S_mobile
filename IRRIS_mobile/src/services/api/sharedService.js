import api from "./api";

export const findFacility = async (qrCode) => {
  try {
    const response = await api.get(`/find-facility/${qrCode}`);
    return response.data;
  } catch (error) {
    // console.error("findFacility error", error.response);
    throw error;
  }
};
