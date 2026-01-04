import axios from "axios";

import { BASE_URL } from "../../src/utils/api_base_url_configration";

const token = localStorage.getItem("token");

const getConfig = () => {
  return {
    headers: {
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
    },
  };
};
export const loanTypeListServ = async (payload) => {
  try {
    const response = await axios.post(BASE_URL + "loan/list", payload);
    return response;
  } catch (error) {
    // Handle error (e.g., log or throw an error)
    console.error("Error fetching data:", error);
    throw error;
  }
};
export const createLoanTypeServ = async (payload) => {
  try {
    const response = await axios.post(BASE_URL + "loan/create", payload, getConfig());
    return response;
  } catch (error) {
    // Handle error (e.g., log or throw an error)
    console.error("Error fetching data:", error);
    throw error;
  }
};
export const updateLoanTypeServ = async (payload) => {
  try {
    const response = await axios.put(BASE_URL + "loan/update", payload, getConfig());
    return response;
  } catch (error) {
    // Handle error (e.g., log or throw an error)
    console.error("Error fetching data:", error);
    throw error;
  }
};
export const deleteLoanTypeServ = async (id) => {
  try {
    const response = await axios.delete(BASE_URL + "loan/delete/"+id);
    return response;
  } catch (error) {
    // Handle error (e.g., log or throw an error)
    console.error("Error fetching data:", error);
    throw error;
  }
};
export const loanTypeDetailsServ = async (id) => {
  try {
    const response = await axios.get(BASE_URL + "loan/details/"+id);
    return response;
  } catch (error) {
    // Handle error (e.g., log or throw an error)
    console.error("Error fetching data:", error);
    throw error;
  }
};
export const createLoanApplicationServ = async (payload) => {
  try {
    const response = await axios.post(BASE_URL + "loan-application/create", payload, getConfig());
    return response;
  } catch (error) {
    // Handle error (e.g., log or throw an error)
    console.error("Error fetching data:", error);
    throw error;
  }
};
