import React, { Component } from 'react';
import banner from './assets/banner.gif';
import './App.css';
// import MatchesContainer from './MatchesContainer'
import Router from "./Router";
import axios from 'axios'
import { Link } from 'react-router-dom'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matches: []
    };
  }

  logOut() {
    delete localStorage.jwt
    this.props.history.push(`/`)
  }

  login () {
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    axios.post(
        'http://localhost:3001/api/v1/user_token',
        { auth:
          {
            email: email,
            password: password
          }
        }
      )
      .then(response => {
        localStorage.setItem("jwt", response.data.jwt)
        this.props.history.push(`/`)
      })
      .catch(error => console.log(error))
  }

  getMatches () {
    let token = "Bearer " + localStorage.getItem("jwt")
    axios.get('http://localhost:3001/api/v1/matches.json', { headers: { 'Authorization': token }})
    .then(response => {
      this.setState({matches: response.data.matches})
      console.log(localStorage)
      console.log(this.state)
    })
    .catch(error => console.log(error))
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={banner} className="App-banner" alt="banner" />
        </header>
        <Link to='/' onClick={this.logOut}>Log out</Link>
        <Router />
      </div>
    );
  }
}

export default App;
