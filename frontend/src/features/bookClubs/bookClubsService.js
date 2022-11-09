import axios from "axios";

const API_URL = "/api/book-clubs";

// Create new book club
const createBookClub = async (bookClubData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, bookClubData, config);

  return response.data;
};

// Update a book club
const updateBookClub = async (bookClubData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, bookClubData, config);

  return response.data;
};

// Get user book clubs
const getBookClubs = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

// Delete user book club
const deleteBookClub = async (bookClubId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + "/" + bookClubId, config);

  return response.data;
};

const bookClubService = {
  createBookClub,
  getBookClubs,
  deleteBookClub,
  updateBookClub,
};

export default bookClubService;
