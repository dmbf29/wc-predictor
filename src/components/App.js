import React, { Component } from 'react';
import banner from './assets/banner.png';
import './App.css';
// import MatchesContainer from './MatchesContainer'
import Router from "./Router";
import Navbar from "./Navbar";
import axios from 'axios'
import { Link } from 'react-router-dom'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matches: []
    };
    console.log(localStorage)
  }

  signIn () {
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    axios.post(
        'https://wc-predictor-api.herokuapp.com/api/v1/user_token',
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
    axios.get('https://wc-predictor-api.herokuapp.com/api/v1/matches.json', { headers: { 'Authorization': token }})
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
        <Navbar />
        <header className="App-header">
        </header>
        <Router />
      </div>
    );
  }
}

export default App;
