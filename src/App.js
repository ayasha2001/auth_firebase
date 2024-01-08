import { Route, Routes, Navigate } from "react-router-dom";
import AuthContext from "./context/AuthContext";
import Layout from "./components/Layout/Layout";
import UserProfile from "./components/Profile/UserProfile";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import { useContext } from "react";

function App() {
  const cntxt = useContext(AuthContext);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route
          path="/profile"
          element={cntxt.isLoggedIn ? <UserProfile /> : <Navigate to="/auth" />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Layout>
  );
}

export default App;
