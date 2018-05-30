import React from "react";
import { Route, Switch } from 'react-router-dom';
// import MatchesContainer from "./MatchesContainer";
import MatchesContainer from "./MatchesContainer";
import NotFound from "./NotFound";

const Router = () => (
  <Switch>
    <Route exact path="/" component={MatchesContainer} />
    <Route path="/store" component={NotFound} />
    <Route component={NotFound} />
  </Switch>
);

export default Router;
