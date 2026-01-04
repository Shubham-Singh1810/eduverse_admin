import axios from "axios";

import { BASE_URL } from "../utils/api_base_url_configration";

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
export const getBranchListServ = async (formData) => {
  try {
    const response = await axios.post(BASE_URL + "branch/list", formData);
    return response;
  } catch (error) {
    // Handle error (e.g., log or throw an error)
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const handleDeleteBranchServ = async (id) => {
  try {
    const response = await axios.delete(BASE_URL + "branch/delete/"+id);
    return response;
  } catch (error) {
    // Handle error (e.g., log or throw an error)
    console.error("Error fetching data:", error);
    throw error;
  }
};
export const handleCreateBranchServ = async (formData) => {
  try {
    const response = await axios.post(BASE_URL + "branch/create", formData);
    return response;
  } catch (error) {
    // Handle error (e.g., log or throw an error)
    console.error("Error fetching data:", error);
    throw error;
  }
};
export const handleUpdateBranchServ = async (formData) => {
  try {
    const response = await axios.put(BASE_URL + "branch/update", formData);
    return response;
  } catch (error) {
    // Handle error (e.g., log or throw an error)
    console.error("Error fetching data:", error);
    throw error;
  }
};