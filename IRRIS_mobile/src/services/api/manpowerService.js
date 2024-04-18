import api from "./api";

export const getJobOrder = async (userId, status = null) => {
  try {
    const params = status !== null ? { status } : {};
    const response = await api.get(`/job-order/${userId}`, { params });
    return response.data;
  } catch (error) {
    console.error("Get Job Order error", error.response);
    throw error;
  }
};

export const getManpowerNotification = async (userId) => {
  try {
    const response = await api.get(`/manpower-notification/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Get Manpower notification error", error.response);
    throw error;
  }
};

export const getJobOrderDertails = async (id) => {
  try {
    const response = await api.get(`/job-order-details/${id}`);
    return response.data;
  } catch (error) {
    console.error("Get Manpower notification error", error.response);
    throw error;
  }
};

export const getJobOrderRequestDetails = async (id) => {
  try {
    const response = await api.get(`/job-order-request-details/${id}`);
    return response.data;
  } catch (error) {
    console.error("Get Manpower notification error", error.response);
    throw error;
  }
};

export const updateJobOrderImage = async (formData, id) => {
  try {
    // Make an API call with the formData object and config
    const response = await api.post(`/job-order-update-image/${id}`, formData);

    console.log("Update Job Order image response:", response);
    return response.data;
  } catch (error) {
    console.error(
      "Update Job Order image error:",
      error.response || error.message
    );
    throw error;
  }
};

export const notValidJobOrder = async (id) => {
  try {
    // Make an API call with the formData object and id
    const response = await api.patch(`/job-order-not-valid/${id}`);

    console.log("Update Job Order Not Valid response:", response);
    return response.data;
  } catch (error) {
    console.error(
      "Update Job Order Not Valid  error:",
      error.response || error.message
    );
    throw error;
  }
};

export const markedAsPendingJobOrder = async (id, form) => {
  try {
    // Make an API call with the formData object and id
    const response = await api.patch(`/job-order-pending/${id}`, form);

    console.log("Update Job Order Mark as pending response:", response);
    return response.data;
  } catch (error) {
    console.error(
      "Update Job Order Mark as pending  error:",
      error.response || error.message
    );
    throw error;
  }
};

export const acceptJobOrder = async (formData, id) => {
  try {
    // Make an API call with the formData object and id
    const response = await api.patch(`/job-order-accept/${id}`, formData);

    console.log("Update Job Order response:", response);
    return response.data;
  } catch (error) {
    console.error("Update Job Order error:", error.response || error.message);
    throw error;
  }
};

export const acceptJobOrderRequest = async (formData, id) => {
  try {
    // Make an API call with the formData object and id
    const response = await api.patch(
      `/job-order-request-accept/${id}`,
      formData
    );

    console.log("Update Job Order response:", response);
    return response.data;
  } catch (error) {
    console.error("Update Job Order error:", error.response || error.message);
    throw error;
  }
};

export const finishJobOrder = async (finishFormData, id) => {
  try {
    // Make an API call with the formData object and id
    const response = await api.patch(`/job-order-finish/${id}`, finishFormData);

    console.log("Finish Job Order response:", response);
    return response.data;
  } catch (error) {
    console.error("Finish Job Order error:", error.response || error.message);
    throw error;
  }
};

export const finishJobOrderRequest = async (finishFormData, id) => {
  try {
    // Make an API call with the formData object and id
    const response = await api.patch(
      `/job-order-request-finish/${id}`,
      finishFormData
    );

    console.log("Finish Job Order Request response:", response);
    return response.data;
  } catch (error) {
    console.error(
      "Finish Job Order Request error:",
      error.response || error.message
    );
    throw error;
  }
};

export const rateJobOrder = async (formData) => {
  try {
    // Make an API call with the formData object and config
    const response = await api.post(`/job-order-rate`, formData);

    console.log("Rate Job Order image response:", response);
    return response.data;
  } catch (error) {
    console.error("Rate Job Order  error:", error.response || error.message);
    throw error;
  }
};

export const createReportForm = async (form) => {
  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const response = await api.post(`/create-report-form`, form, config);
    console.log("/create-report-form successfully", response);
    return response.data;
  } catch (error) {
    console.error("/create-report-form  error", error.response);
    throw error;
  }
};

export const finishReportForm = async (formData, id) => {
  try {
    // Make an API call with the formData object and config
    const response = await api.post(`/finish-report-form/${id}`, formData);

    console.log("Update finish-report-form response:", response);
    return response.data;
  } catch (error) {
    console.error(
      "Update finish-report-form error:",
      error.response || error.message
    );
    throw error;
  }
};

export const getManpowerStatus = async () => {
  try {
    const response = await api.get(`/manpower-status`);
    return response.data;
  } catch (error) {
    console.error("Get /manpower-status", error.response);
    throw error;
  }
};

export const setManpowerOffline = async () => {
  try {
    const response = await api.put(`/manpower-offline`);
    return response.data;
  } catch (error) {
    console.error("Get /manpower-online", error.response);
    throw error;
  }
};

export const setManpowerOnline = async () => {
  try {
    const response = await api.put(`/manpower-online`);
    return response.data;
  } catch (error) {
    console.error("Get /manpower-online", error.response);
    throw error;
  }
};
