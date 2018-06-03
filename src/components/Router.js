import React from "react";
import { Route, Switch } from 'react-router-dom';
// import MatchesContainer from "./MatchesContainer";
import MatchesContainer from "./MatchesContainer";
import NotFound from "./NotFound";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import LeagueCreate from "./LeagueCreate";

const Router = () => (
  <Switch>
    <Route exact path="/" component={MatchesContainer} />
    <Route exact path="/sign_in" component={SignIn} />
    <Route exact path="/sign_up" component={SignUp} />
    <Route exact path="/league_create" component={LeagueCreate} />
    <Route path="/store" component={NotFound} />
    <Route component={NotFound} />
  </Switch>
);

export default Router;
