import axios from "axios";
import { BASE_URL } from "../../src/utils/api_base_url_configration";

export const getNotificationConfigrationDetailsServ = async () => {
  try {
    const response = await axios.get(BASE_URL + "notification-configration/details");
    return response;
  } catch (error) {
    // Handle error (e.g., log or throw an error)
    console.error("Error fetching data:", error);
    throw error;
  }
};
export const updateNotificationConfigrationDetailsServ = async (formData) => {
  try {
    const response = await axios.put(BASE_URL + "notification-configration/update-details", formData);
    return response;
  } catch (error) {
    // Handle error (e.g., log or throw an error)
    console.error("Error fetching data:", error);
    throw error;
  }
};
export const notificationEventListServ = async (formData) => {
  try {
    const response = await axios.post(BASE_URL + "notification-event/list", formData);
    return response;
  } catch (error) {
    // Handle error (e.g., log or throw an error)
    console.error("Error fetching data:", error);
    throw error;
  }
};


