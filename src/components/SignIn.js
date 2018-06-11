import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'
import BannerCards from './BannerCards'

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matches: []
    };
  }

  signIn(event) {
    event.preventDefault();
    console.log('signing in')
    console.log(localStorage)
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
      console.log("response->")
      console.log(response)
      localStorage.setItem("jwt", response.data.jwt)
      this.props.history.push(`/`)
    })
    .catch(error => {console.log(error)
      this.addErrors();
    })
  }

  addErrors() {
    console.log("sign in error!")
    const form = document.querySelector("form");
    form.insertAdjacentHTML("beforebegin", "<small style='padding-bottom:5px;'>Incorrect username/password</small>");
  }

  render() {
    return (
      <div className="App">
        <div className="form-container">
          <h3>SIGN IN</h3>
          <form>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" className="form-control" id="password" placeholder="Password" required />
            </div>
            <div className="form-buttons" >
              <button className="red-button btn"
                onClick={this.signIn.bind(this)}
              >
                  Sign In
              </button>
              <Link to='/sign_up'>Sign up</Link>
            </div>
          </form>
        </div>
        <BannerCards />
      </div>
    );
  }
}

export default SignIn;
