import React, { useState, useEffect } from "react";

const API_URL = "/api/bank-accounts";

export const useDepositPost = ({ options: myOptions }) => {
  const [data, setData] = useState(null);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState(myOptions);
  const [id, setId] = useState(null);
  useEffect(() => {
    if (!id || !loading) return;
    const user = localStorage.getItem("user");
    const token = JSON.parse(user).token;
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      ...options,
      body: JSON.stringify(data),
    };
    fetch(`${API_URL}/${id}/deposit`, requestOptions)
      .then(async (res) => {
        const response = await res.json();
        // data should have updated balance
        if (res.ok) {
          setResponse(response);
          setError(null);
        } else {
          setError(response);
          setData(null);
        }
        setId(null);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setId(null);
        setLoading(false);
      });
  }, [loading, options, id]);

  const request = (id, diffAmount, moreOptions = {}) => {
    setOptions({ ...options, ...moreOptions });
    setLoading(true);
    setData({ diffAmount });
    setId(id);
  };
  const result = [
    {
      response,
      data,
      error,
      loading,
    },
    request,
  ];
  return result;
};
