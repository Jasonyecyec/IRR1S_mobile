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