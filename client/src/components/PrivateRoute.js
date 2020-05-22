import React from "react"
import { Route, Redirect } from "react-router-dom"


export default function PrivateRoute({ component: Component, ...rest }) {
    // console.log(props)
    // console.log(component)
    const token = localStorage.getItem("token")
    return (
        <Route
      {...rest}
      render={() => {
        if (token) {
          // render component
          return <Component />;
        } else {
          // redirect to login
          return <Redirect to="/" />;
        }
      }}
    />
    )
}