import axios from "axios";

const API_URL = "/api/bank-accounts";

// Create new bank account
const createBankAccount = async (bankAccountData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, bankAccountData, config);

  return response.data;
};

// Get user bank accounts
const getBankAccounts = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

// Delete user bank account
const deleteBankAccount = async (bankAccountId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + "/" + bankAccountId, config);

  return response.data;
};

const bankAccountService = {
  createBankAccount,
  getBankAccounts,
  deleteBankAccount,
};

export default bankAccountService;
