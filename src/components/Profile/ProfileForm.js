import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./ProfileForm.module.css";
import AuthContext from "../../context/AuthContext";

const ProfileForm = () => {
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const nav = useNavigate();
  const cntxt = useContext(AuthContext);

  const handleClick = async () => {
    setLoading(true);
    console.log({
      idToken: cntxt.token,
      password: password,
      returnSecureToken: true,
    });
    const data = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDqZwDjnF43ZY2c_T6j07yTFfJsQ1_09Rc",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: cntxt.token,
          password: password,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!data.ok) {
      const errorResponse = await data.json();
      console.error("Password change failed:", errorResponse.error.message);
      alert("Password change failed!");
      return;
    }
    setLoading(false);
    setPassword("");
    const json = await data.json();
    alert("password successfully chnaged!");
    nav("/");
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  return (
    <form className={classes.form}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          value={password}
          onChange={handleChangePassword}
        />
      </div>
      <div className={classes.action}>
        {isLoading ? (
          <p style={{ color: "white" }}>Loading</p>
        ) : (
          <button onClick={handleClick}>Change Password</button>
        )}
      </div>
    </form>
  );
};

export default ProfileForm;
