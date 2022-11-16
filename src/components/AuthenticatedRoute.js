import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { Context } from "../services/redux";

const AuthenticatedRoute = ({ path, component }) => {
  const { User } = useContext(Context);

  return User ? (
    <Route exact path={path} component={component} />
  ) : (
    <Redirect to="/" />
  );
};

export default AuthenticatedRoute;
