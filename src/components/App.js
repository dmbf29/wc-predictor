import React, { Component } from 'react';
import './App.css';
import Router from "./Router";
import Navbar from "./Navbar";
import axios from 'axios'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matches: []
    };
    localStorage.setItem("url", 'https://wc-predictor-api.herokuapp.com')
    if(process.env.NODE_ENV !== 'production') {
      localStorage.setItem("url", 'http://localhost:3001')
    }
    console.log(localStorage.url)
  }

  signIn () {
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    axios.post(
        localStorage.url + '/api/v1/user_token',
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
        <div>
          <Navbar />
          <header className="App-header">
          </header>
          <Router />
        </div>
        <a className="doug" href="mailto:douglasmberkley@gmail.com">dberkley</a>
      </div>
    );
  }
}

export default App;
