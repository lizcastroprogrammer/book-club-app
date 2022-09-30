import React, { useState, useEffect } from "react";

export const useDepositPost = ({ options: myOptions }) => {
  // TODO this is hanging up Deposit component
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState(myOptions);
  const [id, setId] = useState(null);
  const API_URL = "/api/bank-accounts";
  const request = (id, moreOptions = {}) => {
    setOptions({ ...options, ...moreOptions });
    setLoading(true);
    setId(id);
  };
  useEffect(() => {
    if (!id || !loading) return;
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    };
    fetch(`${API_URL}/${id}/deposit`, requestOptions)
      .then(async (res) => {
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
        setError(err);
        setId(null);
        setLoading(false);
      });
  }, [loading, options, id]);
  return [
    {
      data,
      error,
      loading,
    },
    request,
  ];
};
