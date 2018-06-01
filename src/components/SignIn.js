import React, { Component } from 'react';
// import banner from './assets/banner.gif';
// import './App.css';
// // import MatchesContainer from './MatchesContainer'
// import Router from "./Router";
import axios from 'axios'
import { Link } from 'react-router-dom'

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matches: []
    };
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

  render() {
    return (
      <div className="App">
        <div className="form-container">
          <form>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" className="form-control" id="password" placeholder="Password" />
            </div>
            <div className="form-group">
              <button className="red-button btn"
                onClick={this.signIn.bind(this)}
              >
                  Sign In
              </button>
            </div>
            <Link to='/sign_up'>Sign up</Link>
          </form>
        </div>
      </div>
    );
  }
}

export default SignIn;
