import React from "react";
import { Route, Switch } from 'react-router-dom';
// import MatchesContainer from "./MatchesContainer";
import MatchesContainer from "./MatchesContainer";
import NotFound from "./NotFound";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import LeagueCreate from "./LeagueCreate";
import LeagueJoin from "./LeagueJoin";
import LeaguesContainer from "./LeaguesContainer";

const Router = () => (
  <Switch>
    { localStorage.jwt === undefined &&
      <Route exact path="/" component={SignIn} />
    }
    <Route exact path="/" component={MatchesContainer} />
    <Route exact path="/sign_in" component={SignIn} />
    <Route exact path="/sign_up" component={SignUp} />
    <Route exact path="/leagues" component={LeaguesContainer} />
    <Route exact path="/league_create" component={LeagueCreate} />
    <Route exact path="/league_join" component={LeagueJoin} />
    <Route path="/store" component={NotFound} />
    <Route component={NotFound} />
  </Switch>
);

export default Router;
