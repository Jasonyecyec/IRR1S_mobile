// import { type } from "os";
import api from "./api";

export const fetchFacilityToReserve = async () => {
  try {
    const response = await api.get("/facilities-available-reserve");

    console.log("Fetch facilities response:", response);
    return response.data;
  } catch (error) {
    console.error("Fetch facilities error:", error.response || error.message);
    throw error;
  }
};

export const searchFacilityToReserve = async (query) => {
  try {
    // Correctly construct the URL with the query parameter
    const response = await api.get(
      `/facilities-available-search?search=${query}`
    );

    console.log("Search facilities response:", response);
    return response.data;
  } catch (error) {
    console.error("Search facilities error:", error.response || error.message);
    throw error;
  }
};

export const reserveFacilities = async (form) => {
  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const response = await api.post(`/reserve-facilities`, form, config);
    console.log("Reserve facilities successfully", response);
    return response.data;
  } catch (error) {
    console.error("Reserve facilities  error", error.response);
    throw error;
  }
};

export const requestService = async (form) => {
  try {
    const response = await api.post(`/request`, form);
    console.log("Request successfully", response);
    return response.data;
  } catch (error) {
    console.error("Request error", error.response);
    throw error;
  }
};

export const getStaffRequest = async (userId, filter) => {
  try {
    const response = await api.get(`/request-history/${userId}`, {
      params: { filter },
    });
    console.log("Request history response", response);
    return response.data;
  } catch (error) {
    console.error("Get Request history  error", error.response);
    throw error;
  }
};

export const getRequestDetails = async (id, type) => {
  try {
    const response = await api.get(`/request-details/${id}`, {
      params: { type },
    });
    console.log("Request request-details response", response);
    return response.data;
  } catch (error) {
    console.error("Get request-details  error", error.response);
    throw error;
  }
};

export const getPencilBookHistory = async (id, status = null) => {
  try {
    const params = status !== null ? { status } : {};

    // Correctly construct the URL with the query parameter
    const response = await api.get(`/pencil-book-history/${id}`, { params });

    console.log("Get pencil-book-history response:", response);
    return response.data;
  } catch (error) {
    console.error(
      "Get pencil-book-history  error:",
      error.response || error.message
    );
    throw error;
  }
};

export const getPencilBookDetails = async (id) => {
  try {
    // Correctly construct the URL with the query parameter
    const response = await api.get(`/pencil-book-details/${id}`);

    console.log("Get pencil-book-details response:", response);
    return response.data;
  } catch (error) {
    console.error(
      "Get pencil-book-details  error:",
      error.response || error.message
    );
    throw error;
  }
};

export const cancelPencilBook = async (id) => {
  try {
    const response = await api.patch(`/pencil-book-cancelled/${id}`);

    console.log("Get pencil-book-cancelled response:", response);
    return response.data;
  } catch (error) {
    console.error(
      "Get pencil-book-cancelled  error:",
      error.response || error.message
    );
    throw error;
  }
};

export const getLogistics = async () => {
  try {
    // Correctly construct the URL with the query parameter
    const response = await api.get(`/logistic-table`);

    console.log("Get pencil-book-details response:", response);
    return response.data;
  } catch (error) {
    console.error(
      "Get pencil-book-details  error:",
      error.response || error.message
    );
    throw error;
  }
};

export const requestLogistic = async (form) => {
  try {
    const response = await api.post(`/staff-logistic-request`, form);
    console.log("Request staff-logistic-request", response);
    return response.data;
  } catch (error) {
    console.error("Request staff-logistic-request", error.response);
    throw error;
  }
};
