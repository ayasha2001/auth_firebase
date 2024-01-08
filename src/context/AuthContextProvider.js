// import React, { useEffect, useState } from "react";
// import AuthContext from "./AuthContext";

// const AuthContextProvider = (props) => {
//   const [isLoggedIn, setIsLogin] = useState(false);
//   const [token, setToken] = useState("");

//   useEffect(() => {
//     setToken(localStorage.getItem("user_token"));
//     setIsLogin(true)
//   }, []);

//   const loginUser = (token) => {
//     localStorage.setItem("user_token", JSON.stringify(token));
//     setIsLogin(true);
//     setToken(token);
//   };
//   const logoutUser = () => {
//     localStorage.removeItem("user_token");
//     setIsLogin(false);
//     setToken("");
//   };

//   const cntxt = {
//     token: token,
//     isLoggedIn: isLoggedIn,
//     loginUser: loginUser,
//     logoutUser: logoutUser,
//   };

//   return (
//     <AuthContext.Provider value={cntxt}>{props.children}</AuthContext.Provider>
//   );
// };

// export default AuthContextProvider;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";

const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  let logoutTimeout;

  useEffect(() => {
    const storedToken = localStorage.getItem("user_token");
    const tokenExpiration = localStorage.getItem("token_expiration");

    const handleLogout = () => {
      localStorage.removeItem("user_token");
      localStorage.removeItem("token_expiration");
      setIsLoggedIn(false);
      setToken("");
      navigate("/login");
    };

    if (storedToken && tokenExpiration) {
      const expirationTime = parseInt(tokenExpiration, 10);
      const currentTime = Date.now();

      if (currentTime < expirationTime) {
        setToken(storedToken);
        setIsLoggedIn(true);

        // Set a timeout to automatically logout after 5 minutes
        const timeout = expirationTime - currentTime;
        logoutTimeout = setTimeout(() => {
          handleLogout();
        }, timeout);
      } else {
        handleLogout();
      }
    }

    return () => {
      clearTimeout(logoutTimeout);
    };
  }, [navigate]);

  const loginUser = (token) => {
    const expirationTime = Date.now() + 5 * 60 * 1000; // 5 minutes
    localStorage.setItem("user_token", token);
    localStorage.setItem("token_expiration", expirationTime.toString());
    setToken(token);
    setIsLoggedIn(true);

    // Clear the existing timeout and set a new one
    clearTimeout(logoutTimeout);
    logoutTimeout = setTimeout(() => {
      handleLogout();
    }, 5 * 60 * 1000);
  };

  const handleLogout = () => {
    localStorage.removeItem("user_token");
    localStorage.removeItem("token_expiration");
    setIsLoggedIn(false);
    setToken("");
    navigate("/login");
  };

  const cntxt = {
    token: token,
    isLoggedIn: isLoggedIn,
    loginUser: loginUser,
    logoutUser: handleLogout,
  };

  return (
    <AuthContext.Provider value={cntxt}>{props.children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
