import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userme } from "../features/auth/authSlice";

function ProtectedRoute({ element: Component, ...restOfProps }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { userInfo } = user;
  const [isAdmin, setIsAdmin] = useState(userInfo?.roles === "admin");

  // if userInfo does not exist in the state we need to refetch user info
  useEffect(() => {
    console.log("USEEFFECT");
    if (!userInfo && user.token && dispatch) {
      console.log("TEST 8 user.token=", user.token);
      dispatch(userme(user.token));
    }
    if (userInfo) {
      console.log("TEST 9 userInfo?.roles=", userInfo?.roles);
      setIsAdmin(userInfo?.roles === "admin");
    }
  }, [userInfo, dispatch, user.token]);
  console.log(
    "isAdmin=",
    isAdmin,
    "userInfo=",
    userInfo,
    "Component=",
    Component
  );

  if (isAdmin) {
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
