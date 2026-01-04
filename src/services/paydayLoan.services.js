import axios from "axios";

import { BASE_URL } from "../utils/api_base_url_configration";

const token = localStorage.getItem("token");

const getConfig = () => {
  return {
    headers: {
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
};
export const getPaydayLoanDetailsServ = async () => {
  try {
    const response = await axios.get(BASE_URL + "payday-loan/details");
    return response;
  } catch (error) {
    // Handle error (e.g., log or throw an error)
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const updatePaydayLoanServ = async (formData) => {
  try {
    const response = await axios.put(BASE_URL + "payday-loan/update", formData);
    return response;
  } catch (error) {
    // Handle error (e.g., log or throw an error)
    console.error("Error fetching data:", error);
    throw error;
  }
};

