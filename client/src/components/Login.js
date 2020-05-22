import React, { useState } from "react";

const initialLogin = {
  username: "",
  password: ""
}

const Login = () => {
  const [loginInputs, setLoginInputs] =useState(initialLogin)
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const captureLogin = (e) => {
    setLoginInputs({
      ...loginInputs,
      [e.target.name]: e.target.value
    })
  }


  return (
    <div>
      <h1>Welcome to the Bubble App!</h1>
      <p>Build a login page here</p>
      <form>
        <label htmlFor="username">Username:</label>
        <input 
        name="username"
        value={loginInputs.username}
        onChange={captureLogin}
        />
        <label htmlFor="password">Password:</label>
        <input
        name="password"
        value={loginInputs.password}
        onChange={captureLogin}
        />
        <button>Login</button>
      </form>
    </div>
  );
};

export default Login;
