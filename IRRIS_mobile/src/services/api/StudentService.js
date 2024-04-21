import api from "./api";

export const activateStudent = async (email) => {
  try {
    const response = await api.post(`/activate-account`, { email });
    return response.data;
  } catch (error) {
    console.error("Activate error", error.response);
    throw error;
  }
};

export const verifyOTP = async (email, otp) => {
  try {
    const response = await api.post(`/verify-otp`, { email, otp });
    return response.data;
  } catch (error) {
    console.error("Verify OTP error", error.response);
    throw error;
  }
};

export const getReportStudent = async (userId, status = null) => {
  try {
    const params = status !== null ? { status } : {};
    const response = await api.get(`/report-student/${userId}`, { params });
    console.log("Report response", response);
    return response.data;
  } catch (error) {
    console.error("Get Report  error", error.response);
    throw error;
  }
};

export const getCouponDetails = async (id) => {
  try {
    const response = await api.get(`/coupon-details/${id}`);

    console.log("Fetch coupon-details response:", response);
    return response.data;
  } catch (error) {
    console.error(
      "Fetch coupon-details error:",
      error.response || error.message
    );
    throw error;
  }
};

// export const getUser = async (email, otp) => {
//   try {
//     const response = await api.post(`/verify-otp`, { email, otp });
//     return response.data;
//   } catch (error) {
//     console.error("Verify OTP error", error.response);
//     throw error;
//   }
// };

export const resendOTP = async (email) => {
  try {
    const response = await api.post(`/resend-otp`, { email });
    return response.data;
  } catch (error) {
    console.error("Resend OTP error", error.response);
    throw error;
  }
};

export const createPassword = async (email, password, confirmPassword) => {
  try {
    const response = await api.post(`/create-password`, {
      email,
      password,
      confirmPassword,
    });
    return response.data;
  } catch (error) {
    console.error("Create password error", error.response);
    throw error;
  }
};

export const rateReport = async (id, form) => {
  try {
    const response = await api.post(`/rate-report-student/${id}`, form);
    console.log("Rate report successfully", response);
    return response.data;
  } catch (error) {
    console.error("Rate report  error", error.response);
    throw error;
  }
};

export const getStudentPoints = async (id) => {
  try {
    const response = await api.get(`/student-points/${id}`);
    console.log("Student  points", response);
    return response.data;
  } catch (error) {
    console.error("Get Student  error", error.response);
    throw error;
  }
};

export const getStudentPointsReceived = async (id) => {
  try {
    const response = await api.get(`/student-points-received/${id}`);

    console.log("Fetch student points receivedresponse:", response);
    return response.data;
  } catch (error) {
    console.error(
      "Fetch student points receivedresponse error:",
      error.response || error.message
    );
    throw error;
  }
};

export const getStudentAchievements = async (id) => {
  try {
    const response = await api.get(`/student-achievements/${id}`);

    console.log("Fetch student-achievements response:", response);
    return response.data;
  } catch (error) {
    console.error(
      "Fetch student-achievements response error:",
      error.response || error.message
    );
    throw error;
  }
};

export const getStudentCertificate = async (id) => {
  try {
    const response = await api.get(`/student-certificate/${id}`);

    console.log("Fetch student-certificate response:", response);
    return response.data;
  } catch (error) {
    console.error(
      "Fetch student-certificate response error:",
      error.response || error.message
    );
    throw error;
  }
};

export const getQualifiedStudents = async (id) => {
  try {
    const response = await api.get(`/qualified-students/${id}`);

    console.log("Fetch qualified-students dresponse:", response);
    return response.data;
  } catch (error) {
    console.error(
      "Fetch qualified-students response error:",
      error.response || error.message
    );
    throw error;
  }
};

export const getAlreadyClaimed = async (id, rewardId) => {
  try {
    const response = await api.get(
      `/student-already-claimed/${id}/${rewardId}`
    );

    console.log("Fetch student-already-claimed response:", response);
    return response.data;
  } catch (error) {
    console.error(
      "Fetch student-already-claimedresponse error:",
      error.response || error.message
    );
    throw error;
  }
};

export const getRewardDetails = async (id) => {
  try {
    const response = await api.get(`/reward-details/${id}`);

    console.log("Fetch reward-details dresponse:", response);
    return response.data;
  } catch (error) {
    console.error(
      "Fetch reward-details response error:",
      error.response || error.message
    );
    throw error;
  }
};

export const getClaimCoupon = async (id) => {
  try {
    const response = await api.get(`/claim-coupon/${id}`, {
      responseType: "blob", // Set the response type to blob
    });

    // Get the current date
    const currentDate = new Date();

    // Format the date as "mm/dd/yyyy"
    const formattedDate = `${(currentDate.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${currentDate
      .getDate()
      .toString()
      .padStart(2, "0")}/${currentDate.getFullYear()}`;

    // Create the filename with "REPORT_" prefix and ".pdf" extension
    const filename = `Voucher_${formattedDate}.pdf`;

    if (response.status === 200) {
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      a.click();
      console.log("Fetch generate-certificate response:", response);
    } else {
      console.error("Failed to fetch PDF:", response.statusText);
    }

    console.log("Fetch claim-coupon response:", response);
    return response.data;
  } catch (error) {
    console.error("Fetch claim-coupon error:", error.response || error.message);
    throw error;
  }
};

export const generateCertificate = async (id, studentId) => {
  try {
    const response = await api.get(`/generate-certificate/${id}/${studentId}`, {
      responseType: "blob", // Set the response type to blob
    });

    // Get the current date
    const currentDate = new Date();

    // Format the date as "mm/dd/yyyy"
    const formattedDate = `${(currentDate.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${currentDate
      .getDate()
      .toString()
      .padStart(2, "0")}/${currentDate.getFullYear()}`;

    // Create the filename with "REPORT_" prefix and ".pdf" extension
    const filename = `Certificate_${formattedDate}.pdf`;

    if (response.status === 200) {
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      a.click();
      console.log("Fetch generate-certificate response:", response);
    } else {
      console.error("Failed to fetch PDF:", response.statusText);
    }

    return response.data;
  } catch (error) {
    console.error(
      "Fetch generate-certificate response error:",
      error.response || error.message
    );
    throw error;
  }
};

export const getDownloadCertificate = async (id, studentId) => {
  try {
    const response = await api.get(`/download-certificate/${id}/${studentId}`, {
      responseType: "blob", // Set the response type to blob
    });

    // Get the current date
    const currentDate = new Date();

    // Format the date as "mm/dd/yyyy"
    const formattedDate = `${(currentDate.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${currentDate
      .getDate()
      .toString()
      .padStart(2, "0")}/${currentDate.getFullYear()}`;

    // Create the filename with "REPORT_" prefix and ".pdf" extension
    const filename = `Certificate_${formattedDate}.pdf`;

    if (response.status === 200) {
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      a.click();
      console.log("Fetch download-certificate response:", response);
    } else {
      console.error("Failed to fetch PDF:", response.statusText);
    }

    return response.data;
  } catch (error) {
    console.error(
      "Fetch download-certificate response error:",
      error.response || error.message
    );
    throw error;
  }
};
