import  { createContext } from "react";

const AuthContext = createContext({
  token: "",
  isLoggedIn: false,
  loginUser: () => {},
  logoutUser: () => {},
});

export default AuthContext;
