import React, { useState, useEffect } from "react";

const API_URL = "/api/bank-accounts";

export const useDepositPost = ({ options: myOptions }) => {
  console.log("TEST 19");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState(myOptions);
  const [id, setId] = useState(null);
  useEffect(() => {
    console.log("TEST 20 id=", id, "options=", options, "loading=", loading);
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
    };
    console.log("TEST 21");
    fetch(`${API_URL}/${id}/deposit`, requestOptions)
      .then(async (res) => {
        console.log("TEST 22");
        const data = await res.json();
        // data should have updated balance
        if (res.ok) {
          setData(data);
          setError(null);
        } else {
          setError(data);
          setData(null);
        }
        setId(null);
        setLoading(false);
      })
      .catch((err) => {
        console.log("TEST 23");
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
      data,
      error,
      loading,
    },
    request,
  ];
  console.log("TEST 24 result=", result);
  return result;
};
