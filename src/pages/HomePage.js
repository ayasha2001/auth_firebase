import { useContext } from "react";
import StartingPageContent from "../components/StartingPage/StartingPageContent";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import AuthPage from "./AuthPage";

const HomePage = () => {
  const cntxt = useContext(AuthContext);
  const nav = useNavigate();
  return <>{!cntxt.isLoggedIn ? <AuthPage/> : <StartingPageContent />}</>;
};

export default HomePage;
