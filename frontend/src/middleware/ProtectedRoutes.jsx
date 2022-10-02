import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userme } from "../features/auth/authSlice";

function ProtectedRoute({ role, element: Component, ...restOfProps }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { userInfo } = user;
  const [hasRole, setHasRole] = useState(userInfo?.roles === "admin");

  // if userInfo does not exist in the state we need to refetch user info
  useEffect(() => {
    if (!userInfo && user.token && dispatch) {
      dispatch(userme(user.token));
    }
    if (userInfo) {
      setHasRole(userInfo?.roles === role);
    }
  }, [userInfo, dispatch, user.token]);

  if (hasRole) {
    return <Component {...restOfProps} />;
  }

  return (
    <>
      <div className="container">
        <h1>Unauthorized</h1>
        <Link to="/login">Login</Link>
      </div>
    </>
  );
}

export default ProtectedRoute;
