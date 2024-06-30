import axios from "axios";

axios.defaults.baseURL = "http://192.168.1.27:3000/api"; // Đặt baseURL của axios tại đây hoặc trong file gốc của axios

export const loginUser = async (username, password, rememberMe, userID) => {
  try {
    const data = {
      username,
      password,
      rememberMe: rememberMe.toString(),
    };

    const response = await axios.post("/users/login", data, {
      withCredentials: true, 
      userID: userID,
    });

    return response.data;
  } catch (error) {
    throw new Error(`Login failed: ${error.message}`);
  }
};
