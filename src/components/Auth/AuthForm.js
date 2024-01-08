import { useState, useRef } from "react";

import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setLoading(true);
    if (isLogin) {
    } else {
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDqZwDjnF43ZY2c_T6j07yTFfJsQ1_09Rc",
        {
          method: "POST",
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => {
          setLoading(false);
          if (!response.ok) {
            throw new Error("Authentication failed!");
          }
          return response.json();
        })
        .then((data) => {
          // Handle successful registration
          console.log("Registration successful:", data);
        })
        .catch((error) => {
          // Handle errors
          alert(error.message);
          console.error("Registration error:", error.message);
        });
    }
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleChangeEmail}
            required
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handleChangePassword}
            required
          />
        </div>
        <div className={classes.actions}>
          {isLoading ? (
            <p style={{color:"white"}}>...Loading</p>
          ) : (
            <button>{isLogin ? "Login" : "Create Account"}</button>
          )}

          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
