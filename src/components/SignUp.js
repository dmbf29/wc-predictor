import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'

class SignUp extends Component {
  signUp(event) {
    console.log(event)
    event.preventDefault();
    const name = document.getElementById("name").value
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    const password_confirmation = document.getElementById("password_confirmation").value
    const timezone = document.getElementById("timezone").value
    axios.post(
        'http://localhost:3001/api/v1/users',
        { user:
          {
            name: name,
            email: email,
            password: password,
            password_confirmation: password_confirmation,
            timezone: timezone
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
        <div className="form-container">
          <h3>Sign Up</h3>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" className="form-control" id="name" aria-describedby="emailHelp" placeholder="Enter name" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" className="form-control" id="password" placeholder="Password" />
            </div>
            <div className="form-group">
              <label htmlFor="password_confirmation">Confirm Password</label>
              <input type="password" className="form-control" id="password_confirmation" placeholder="Confirm Password" />
            </div>
            <div class="form-group">
              <label for="timezone">Time zone</label>
              <select class="form-control" id="timezone">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>
            <div className="form-group">
              <button className="red-button btn"
                onClick={this.signUp.bind(this)}
              >
                  Sign Up
              </button>
            </div>
            <Link to='/sign_in'>Sign In</Link>
          </form>
        </div>
      </div>
    );
  }
}

export default SignUp;
