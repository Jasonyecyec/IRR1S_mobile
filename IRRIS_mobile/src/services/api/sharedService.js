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