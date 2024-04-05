  import api from "./api";
  import Cookies from "js-cookie";
  import useUserStore from "../state/userStore";

  export const findFacility = async (qrCode) => {
    try {
      const response = await api.get(`/find-facility/${qrCode}`);
      return response.data;
    } catch (error) {
      // console.error("findFacility error", error.response);
      throw error;
    }
  };

  export const viewFacility = async (id) => {
    try {
      // Correctly construct the URL with the query parameter
      const response = await api.get(`/facilities/${id}`);
  
      console.log('View facilities response:', response);
      return response.data;
    } catch (error) {
      console.error('View facilities error:', error.response || error.message);
      throw error;
    }
  };

  export const viewFacilityAndRatings = async (id) => {
    try {
      // Correctly construct the URL with the query parameter
      const response = await api.get(`/view-facility-ratings/${id}`);
  
      console.log('View facilities response:', response);
      return response.data;
    } catch (error) {
      console.error('View facilities error:', error.response || error.message);
      throw error;
    }
  };

  export const rateFacility= async (id,form) => {
    try {
      // Correctly construct the URL with the query parameter
      const response = await api.post(`/rate-facility/${id}`,form);
  
      console.log('Rate facilities response:', response);
      return response.data;
    } catch (error) {
      console.error('Rate facilities error:', error.response || error.message);
      throw error;
    }
  };

  export const getAllUsersFacilityReview = async (id) => {
    try {
      // Correctly construct the URL with the query parameter
      const response = await api.get(`/facility-users-rating/${id}`);
  
      console.log('Users facilities review response:', response);
      return response.data;
    } catch (error) {
      console.error('Users facilities review  error:', error.response || error.message);
      throw error;
    }
  };


  export const searchFacility = async (query) => {
    try {
      // Correctly construct the URL with the query parameter
      const response = await api.get(`/facilities-search?search=${query}`);
  
      console.log('Search facilities response:', response);
      return response.data;
    } catch (error) {
      console.error('Search facilities error:', error.response || error.message);
      throw error;
    }
  };
  
  export const fetchFacility = async () => {
    try {
      const response = await api.get('/facilities');
  
      console.log('Fetch facilities response:', response);
      return response.data;
    } catch (error) {
      console.error('Fetch facilities error:', error.response || error.message);
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

  export const reportSuggestion = async (formDataReport) => {
    try {
      // Set the appropriate headers for multipart/form-data
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const response = await api.post("/reports-suggestion", formDataReport, config);
      console.log("Suggestion Report  response:", response);

      return response.data;
    } catch (error) {
      console.error("Suggestion Report  error", error.response);
      throw error;
    }
  };

  export const feedbackEvaluation = async (formDataFeedback) => {
    try {
      // Set the appropriate headers for multipart/form-data
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const response = await api.post("/feedback-evaluation", formDataFeedback, config);
      console.log("Feedback Report  response:", response);

      return response.data;
    } catch (error) {
      console.error("Feedback Report  error", error.response);
      throw error;
    }
  };



  export const fetchUserData  = async ()=>{
    try {
      const userIdCookie = Cookies.get("user_id");
      const first_nameCookie = Cookies.get("first_name");
      const last_nameCookie = Cookies.get("last_name");
      const user_roleCookie = Cookies.get("user_role");
      const emailCookie = Cookies.get("email");

      const userData = {
        id: userIdCookie,
        first_name: first_nameCookie,
        last_name: last_nameCookie,
        email: emailCookie,
        user_role: user_roleCookie,
      };
      console.log("Successfull fetching user data",userData);

      return userData

    } catch (error) {
      // Handle errors, e.g., cookie not found or parsing error
      console.error("Error fetching user data:", error);
    }
  }

  export const getRewards = async () => {
    try {
      const response = await api.get('/rewards');
  
      console.log('Fetch rewards response:', response);
      return response.data;
    } catch (error) {
      console.error('Fetch rewards error:', error.response || error.message);
      throw error;
    }
  };

  
  export const getReportById = async (id) => {
    try {
      const response = await api.get(`/get-report/${id}`);
  
      console.log('Fetch report response:', response);
      return response.data;
    } catch (error) {
      console.error('Fetch report error:', error.response || error.message);
      throw error;
    }
  };

  export const getNotification = async (id) => {
    try {
      const response = await api.get(`/notification/${id}`);
  
      console.log('Fetch notification response:', response);
      return response.data;
    } catch (error) {
      console.error('Fetch notification error:', error.response || error.message);
      throw error;
    }
  };

  export const getAllEvents = async () => {
    try {
      // Correctly construct the URL with the query parameter
      const response = await api.get(`/events`);
  
      console.log('Get events response:', response);
      return response.data;
    } catch (error) {
      console.error('Get events error:', error.response || error.message);
      throw error;
    }
  };

  export const getPencilBook = async (status = null) => {
    try {
      const params = status !== null ? { status } : {};
  
      // Correctly construct the URL with the query parameter
      const response = await api.get(`/pencil-book`,{params});
  
      console.log('Get pending pencil book response:', response);
      return response.data;
    } catch (error) {
      console.error('Get pending pencil book  error:', error.response || error.message);
      throw error;
    }
  };

  export const getTopLeaders = async (filter = null) => {
    try {
      const params = filter !== null ? { filter } : {};

      const response = await api.get('/top-leaders', {params});
  
      console.log('Fetch Top leaders response:', response);
      return response.data;
    } catch (error) {
      console.error('Fetch Top leaders error:', error.response || error.message);
      throw error;
    }
  };

  export const uploadProfileImage = async (form) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const response = await api.post('/upload-profile-image', form,config);
  
      console.log('Fetch upload-profile-image response:', response);
      return response.data;
    } catch (error) {
      console.error('Fetch upload-profile-image error:', error.response || error.message);
      throw error;
    }
  };

  export const getUserDetails = async (id) => {
    try {
  
      const response = await api.get(`/user-details/${id}`);
  
      console.log('Get user-details response:', response);
      return response.data;
    } catch (error) {
      console.error('Get user-details  error:', error.response || error.message);
      throw error;
    }
  };

  export const changePasswordUser = async ({ userId, currentPassword, newPassword, confirmPassword }) => {
    try {
      // Make the API request to change the password
      const response = await api.post('/change-password-user', {
        user_id: userId,
        current_password: currentPassword,
        new_password: newPassword,
        confirm_password: confirmPassword
      });
  
      // Return the response data
      console.log('change-password-user response:', response);
      return response.data;
    } catch (error) {
      // Handle any errors
      throw error;
    }
  };


