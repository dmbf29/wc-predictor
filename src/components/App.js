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
    console.log(this)
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
        console.log(response.data)
        localStorage.setItem("jwt", response.data.jwt)
      })
      .catch(error => console.log(error))
  }

  getMatches () {
    let token = "Bearer " + localStorage.getItem("jwt")
    console.log(token)
    console.log(this)
    axios.get('http://localhost:3001/api/v1/matches.json', { headers: { 'Authorization': token }})
    .then(response => {
      console.log(response)
      this.setState({matches: response.data.matches})
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
        <Link to='/store'>Store</Link>
        <form>
          <label htmlFor="email">Email: </label>
          <br />
          <input
            name="email"
            id="email"
            type="email"
          />
          <br /><br />
          <label htmlFor="password">Password:</label>
          <br />
          <input
            name="password"
            id="password"
            type="password"
          />
          </form>
          <br />
          <button
            onClick={this.login}
          >
              Login
          </button>
        <br />
        <button
          onClick={this.getMatches.bind(this)}
          style={{marginTop: "10vh"}}
          >
          Get Matches
        </button>
      </div>
    );
  }
}

export default App;
