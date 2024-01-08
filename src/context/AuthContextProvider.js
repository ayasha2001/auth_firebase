import React, { useState } from "react";
import AuthContext from "./AuthContext";

const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLogin] = useState(false);
  const [token, setToken] = useState("");

  const loginUser = (token) => {
    setIsLogin(true);
    setToken(token);
  };
  const logoutUser = () => {
    setIsLogin(false);
    setToken("");
  };

  const cntxt = {
    token: token,
    isLoggedIn: isLoggedIn,
    loginUser: loginUser,
    logoutUser: logoutUser,
  };

  return <AuthContext.Provider value={cntxt}>{props.children}</AuthContext.Provider>;
};

export default AuthContextProvider;
