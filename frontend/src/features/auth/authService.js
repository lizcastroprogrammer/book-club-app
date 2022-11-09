import axios from "axios";

const API_URL = "/api/users/";

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Register book club
const bookClubregister = async (bookClubData) => {
  const response = await axios.post(API_URL, bookClubData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// TODO create fetch userinfo from /api/users/me route
const getUserInfo = async (token) => {
  const response = await axios.get(API_URL + "me", {
    headers: { authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  bookClubregister,
  logout,
  login,
  getUserInfo,
};

export default authService;
