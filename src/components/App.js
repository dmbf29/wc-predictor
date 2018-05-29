import React, { Component } from 'react';
import banner from './assets/banner.gif';
import './App.css';
import MatchesContainer from './MatchesContainer'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={banner} className="App-banner" alt="banner" />
        </header>
        <MatchesContainer />
      </div>
    );
  }
}

export default App;
