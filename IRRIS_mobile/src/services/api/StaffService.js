import api from "./api";




  export const fetchFacilityToReserve = async () => {
    try {
      const response = await api.get('/facilities-available-reserve');
  
      console.log('Fetch facilities response:', response);
      return response.data;
    } catch (error) {
      console.error('Fetch facilities error:', error.response || error.message);
      throw error;
    }
  };


  export const searchFacilityToReserve = async (query) => {
    try {
      // Correctly construct the URL with the query parameter
      const response = await api.get(`/facilities-available-search?search=${query}`);
  
      console.log('Search facilities response:', response);
      return response.data;
    } catch (error) {
      console.error('Search facilities error:', error.response || error.message);
      throw error;
    }
  };


  export const reserveFacilities = async (form) => {
    try {
      const response = await api.post(`/reserve-facilities`,form);
      console.log("Reserve facilities successfully",response)
      return response.data;
    } catch (error) {
      console.error("Reserve facilities  error", error.response);
      throw error;
    }
  };

  export const requestService = async (form) => {
    try {
      const response = await api.post(`/request`,form);
      console.log("Request successfully",response)
      return response.data;
    } catch (error) {
      console.error("Request error", error.response);
      throw error;
    }
  };

  export const getStaffRequest = async (userId,status = null) => {
    try {
      const params = status !== null ? { status } : {};
      const response = await api.get(`/request-history/${userId}`,{params});
      console.log("Request history response",response)
      return response.data;
    } catch (error) {
      console.error("Get Request history  error", error.response);
      throw error;
    }
  };

  export const getPencilBookHistory = async (id,status = null) => {
    try {
      const params = status !== null ? { status } : {};
  
      // Correctly construct the URL with the query parameter
      const response = await api.get(`/pencil-book-history/${id}`,{params});
  
      console.log('Get pencil-book-history response:', response);
      return response.data;
    } catch (error) {
      console.error('Get pencil-book-history  error:', error.response || error.message);
      throw error;
    }
  };