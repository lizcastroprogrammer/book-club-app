import axios from "axios";

const API_URL = "/api/users/";

// Create new user
const createUser = async (userData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, userData, config);

  return response.data;
};

// Get users
const getUsers = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + "all", config);

  return response.data;
};

// possibly allow deletion of users

const userService = {
  createUser,
  getUsers,
};

export default userService;
