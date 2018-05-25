import React, { Component } from 'react';
import banner from './banner.gif';
import './App.css';
import MatchesContainer from './components/MatchesContainer'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={banner} className="App-banner" alt="banner" />
          <h1 className="App-title"></h1>
        </header>
        <MatchesContainer />
      </div>
    );
  }
}

export default App;
