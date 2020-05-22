import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth"
import { useHistory } from "react-router-dom"
import styled from "styled-components"


const LoginForm = styled.form`
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-flow: row;
  label {
    width: 10%;
  }
  input {
    width: 20%;
  }
  button {
    width: 10%;
  }
`

const initialLogin = {
  username: "",
  password: ""
}

const Login = () => {
  const { push } = useHistory()
  const [loginInputs, setLoginInputs] = useState(initialLogin)
 
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const captureLogin = (e) => {
    setLoginInputs({
      ...loginInputs,
      [e.target.name]: e.target.value
    })
  }

  const submitLogin = (e) => {
    e.preventDefault()
    axiosWithAuth()
    .post("/api/login", loginInputs)
    .then(res => {
      // console.log(res.data)
      localStorage.setItem("token", res.data.payload)
      push("/protected")
    })
    .catch(err => {
      console.log(err)
    })
  }

  return (
    <div>
      <h1>Welcome to the Bubble App!</h1>
      <LoginForm onSubmit={submitLogin}>
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
      </LoginForm>
    </div>
  );
};

export default Login;
