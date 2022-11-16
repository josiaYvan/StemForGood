import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { Context } from "../services/redux";

const RouteGuard = ({ path, component }) => {
  const { User } = useContext(Context);

  return User && User[10] === "STAFF" ? (
    <Route exact path={path} component={component} />
  ) : (
    <Redirect to="/accueil" />
  );
};

export default RouteGuard;
