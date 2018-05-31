import React, { Component } from 'react';
// import banner from './assets/banner.gif';
// import './App.css';
// // import MatchesContainer from './MatchesContainer'
// import Router from "./Router";
import axios from 'axios'
import { Link } from 'react-router-dom'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matches: []
    };
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

  render() {
    return (
      <div className="App">
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
        <button style={{backgroundColor:'#0f4583', color: 'white'}} className="btn"
          onClick={this.login.bind(this)}
        >
            Login
        </button>
        <br />
        <Link to='/sign_up'>Sign up</Link>
      </div>
    );
  }
}

export default Login;
