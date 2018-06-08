import React from "react";
import { Route, Switch } from 'react-router-dom';
import OtherMatchesContainer from "./OtherMatchesContainer";
import MatchesContainer from "./MatchesContainer";
import NotFound from "./NotFound";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import LeagueCreate from "./LeagueCreate";
import LeagueJoin from "./LeagueJoin";
import LeaguesContainer from "./LeaguesContainer";
import Account from "./Account";

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
    { localStorage.jwt === undefined &&
      <Route exact path="/account" component={SignIn} />
    }
    <Route exact path="/account" component={Account} />
    { localStorage.jwt === undefined &&
      <Route exact path="/predictions/:userId/:userName" component={SignIn} />
    }
    <Route exact path="/predictions/:userId/:userName" component={OtherMatchesContainer} />
    <Route component={NotFound} />
  </Switch>
);

export default Router;
