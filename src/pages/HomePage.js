import { useContext } from "react";
import StartingPageContent from "../components/StartingPage/StartingPageContent";
import AuthContext from "../context/AuthContext";
import {useNavigate} from "react-router-dom"

const HomePage = () => {
  const cntxt = useContext(AuthContext)
  const nav = useNavigate()
  return (
    <>
      <StartingPageContent />
    </>
  );
};

export default HomePage;
