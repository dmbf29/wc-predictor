import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'

class LeagueCreate extends Component {
  leagueCreate(event) {
    event.preventDefault();
    const name = document.getElementById("name").value
    const password = document.getElementById("password").value
    axios.post(
      localStorage.url + '/api/v1/leagues',
      { league:
        {
          name: name,
          password: password
        },
        membership:
        {
          user_token: localStorage.jwt
        }
      }, { headers: { 'Authorization': localStorage.jwt }}
    )
    .then(response => {
      console.log(response.data)
      this.props.history.push(`/leaderboard`)
    })
    .catch(error => {console.log(error)
      this.addErrors();
    })
  }

  addErrors() {
    console.log("sign in error!")
    const form = document.querySelector("form");
    form.insertAdjacentHTML("beforebegin", "<small style='padding-bottom:5px;'>League could not be created</small>");
  }

  render() {
    return (
      <div className="App">
        <div className="form-container">
          <h3>CREATE A LEAGUE</h3>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" className="form-control" id="name" aria-describedby="emailHelp" placeholder="Enter name" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="text" className="form-control" id="password" placeholder="Password" />
            </div>
            <div className="form-group">
              <button className="red-button btn"
                onClick={this.leagueCreate.bind(this)}
              >
                  Create
              </button>
            </div>
            <Link to='/league_join'>Join League</Link>
          </form>
        </div>
      </div>
    );
  }
}

export default LeagueCreate;
