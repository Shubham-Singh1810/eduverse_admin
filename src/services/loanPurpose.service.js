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
export const getLoanPurposeServ = async (formData) => {
  try {
    const response = await axios.post(BASE_URL + "loan-purpose/list", formData);
    return response;
  } catch (error) {
    // Handle error (e.g., log or throw an error)
    console.error("Error fetching data:", error);
    throw error;
  }
};
export const addLoanPurposeServ = async (formData) => {
  try {
    const response = await axios.post(BASE_URL + "loan-purpose/create", formData, getConfig());
    return response;
  } catch (error) {
    // Handle error (e.g., log or throw an error)
    console.error("Error fetching data:", error);
    throw error;
  }
};
export const updateLoanPurposeServ = async (formData) => {
  try {
    const response = await axios.put(BASE_URL + "loan-purpose/update", formData, getConfig());
    return response;
  } catch (error) {
    // Handle error (e.g., log or throw an error)
    console.error("Error fetching data:", error);
    throw error;
  }
};
export const deleteLoanPurposeServ = async (id) => {
  try {
    const response = await axios.delete(BASE_URL + "loan-purpose/delete/"+id);
    return response;
  } catch (error) {
    // Handle error (e.g., log or throw an error)
    console.error("Error fetching data:", error);
    throw error;
  }
};
