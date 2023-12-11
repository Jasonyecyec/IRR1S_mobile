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

export const reportFacility = async (formData) => {
  try {
    // Set the appropriate headers for multipart/form-data
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const response = await api.post("/reports", formData, config);
    console.log("Report Facility  response:", response);

    return response.data;
  } catch (error) {
    console.error("Report Facility  error", error.response);
    throw error;
  }
};
