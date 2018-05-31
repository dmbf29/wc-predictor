import React, { Component } from 'react';
import Router from "./Router";
import axios from 'axios'
import { Link } from 'react-router-dom'

class SignUp extends Component {
  signUp () {
    const name = document.getElementById("name").value
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    const password_confirmation = document.getElementById("password_confirmation").value
    axios.post(
        'http://localhost:3001/api/v1/users',
        { user:
          {
            name: name,
            email: email,
            password: password,
            password_confirmation: password_confirmation
          }
        }
      )
      .then(response => {
        console.log(response.data)
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
      })
      .catch(error => console.log(error))
  }

  render() {
    return (
      <div className="App">
        <form>
          <label htmlFor="name">Name:</label>
          <br />
          <input
            name="name"
            id="name"
            type="name"
          />
          <br /><br />
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
          <br /><br />
          <label htmlFor="password_confirmation">Password Confirm:</label>
          <br />
          <input
            name="password_confirmation"
            id="password_confirmation"
            type="password_confirmation"
          />
        </form>
        <br />
        <button style={{backgroundColor:'#0f4583', color: 'white'}} className="btn"
          onClick={this.signUp.bind(this)}
        >
            Sign Up
        </button>
        <br />
        <Link to='/sign_in'>Sign In</Link>
      </div>
    );
  }
}

export default SignUp;
