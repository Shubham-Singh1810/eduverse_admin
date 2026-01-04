import axios from "axios";
import { BASE_URL } from "../../src/utils/api_base_url_configration";

/* ===================== AUTH HEADER ===================== */
const getAuthConfig = () => {
  const token = JSON.parse(localStorage.getItem("token"));

  return {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
};

/* ===================== LOGIN ===================== */
export const loginServ = async (payload) => {
  try {
    return await axios.post(
      `${BASE_URL}admin/login`,
      payload
    );
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    throw error;
  }
};

/* ===================== FORGOT PASSWORD ===================== */
export const forgotPasswordServ = async (payload) => {
  try {
    return await axios.post(
      `${BASE_URL}admin/forgot-password`,
      payload
    );
  } catch (error) {
    console.error("FORGOT PASSWORD ERROR:", error);
    throw error;
  }
};

/* ===================== RESEND OTP ✅ ===================== */
export const resendOtpServ = async (payload) => {
  try {
    return await axios.post(
      `${BASE_URL}admin/resend-otp`,
      payload
    );
  } catch (error) {
    console.error("RESEND OTP ERROR:", error);
    throw error;
  }
};

/* ===================== VERIFY OTP ===================== */
export const verifyOtpServ = async (payload) => {
  try {
    return await axios.post(
      `${BASE_URL}admin/verify-otp`,
      payload
    );
  } catch (error) {
    console.error("VERIFY OTP ERROR:", error);
    throw error;
  }
};

/* ===================== RESET PASSWORD ===================== */
export const resetPasswordServ = async (payload) => {
  try {
    return await axios.post(
      `${BASE_URL}admin/reset-password`,
      payload
    );
  } catch (error) {
    console.error("RESET PASSWORD ERROR:", error);
    throw error;
  }
};




// import axios from "axios";

// import { BASE_URL } from "../../src/utils/api_base_url_configration";

// const token = localStorage.getItem("token");

// const getConfig = () => {
//   return {
//     headers: {
//       "Content-Type": "multipart/form-data",
//       Accept: "application/json",
//       Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
//     },
//   };
// };
// export const loginServ = async (formData) => {
//   try {
//     const response = await axios.post(BASE_URL + "admin/login", formData);
//     return response;
//   } catch (error) {
//     // Handle error (e.g., log or throw an error)
//     console.error("Error fetching data:", error);
//     throw error;
//   }
// };



