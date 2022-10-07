import React from "react";

const LocalError = ({ error }) => {
  if (error) {
    return <div className="text-danger">{error}</div>;
  }
  return <div />;
};

export default LocalError;
