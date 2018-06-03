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
    { localStorage.jwt === undefined &&
      <Route exact path="/leagues" component={SignIn} />
    }
    <Route exact path="/leagues" component={LeaguesContainer} />
    { localStorage.jwt === undefined &&
      <Route exact path="/league_create" component={SignIn} />
    }
    <Route exact path="/league_create" component={LeagueCreate} />
    { localStorage.jwt === undefined &&
      <Route exact path="/league_join" component={SignIn} />
    }
    <Route exact path="/league_join" component={LeagueJoin} />
    <Route component={NotFound} />
  </Switch>
);

export default Router;
