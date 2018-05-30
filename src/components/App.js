import React, { Component } from 'react';
import banner from './assets/banner.gif';
import './App.css';
// import MatchesContainer from './MatchesContainer'
import Router from "./Router";
import { Link } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={banner} className="App-banner" alt="banner" />
        </header>
        <Link to='/store'>Store</Link>
        <Router />
      </div>
    );
  }
}

export default App;
