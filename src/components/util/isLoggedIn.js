import React from "react";
import { Navigate } from "react-router-dom";

const withNoAuth = (Component) => {
  return (props) => {
    const token = localStorage.getItem("token");
    if (token) {
      return <Navigate to="/home" />;
    }
    return <Component {...props} />;
  };
};

export default withNoAuth;
