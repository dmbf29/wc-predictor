import React from "react";
import { Route, Switch } from 'react-router-dom';
// import MatchesContainer from "./MatchesContainer";
import MatchesContainer from "./MatchesContainer";
import NotFound from "./NotFound";
import Login from "./Login";
import SignUp from "./SignUp";

const Router = () => (
  <Switch>
    <Route exact path="/" component={MatchesContainer} />
    <Route exact path="/log_in" component={Login} />
    <Route exact path="/sign_up" component={SignUp} />
    <Route path="/store" component={NotFound} />
    <Route component={NotFound} />
  </Switch>
);

export default Router;
