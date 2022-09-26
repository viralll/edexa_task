import React from "react";
import { Route, Redirect } from "react-router-dom";
import Details from "./Details";

// check authentication
const AuthenticateRoute = ({ component, ...rest }) => {
  const loginChk = localStorage.getItem("user_login");
  if (!loginChk) {
    <Redirect to="/login" />;
  }
  return (
    <Route
      {...rest}
      render={() => (loginChk ? <Details /> : <Redirect to="/login" />)}
    />
  );
};

export default AuthenticateRoute;
