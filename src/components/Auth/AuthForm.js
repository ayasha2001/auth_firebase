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

  const handleSignUp = async () => {
    try {
      const response = await fetch(
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
      );

      if (!response.ok) {
        alert("Registration failed");
      }

      const data = await response.json();
      console.log("Registration successful:", data);
      setEmail("");
      setPassword("");
      alert("Registration successful");
    } catch (error) {
      console.error("Registration error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    const data = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDqZwDjnF43ZY2c_T6j07yTFfJsQ1_09Rc",
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
    );
    if (!data.ok) {
      alert("Authentication failed!");
    }
    setLoading(false);
    setEmail("");
    setPassword("");
    const json = await data.json();
    alert("Login successful!")
    console.log(json.idToken);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setLoading(true);
    if (isLogin) {
      handleLogin();
    } else {
      handleSignUp();
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
            <p style={{ color: "white" }}>...Loading</p>
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
