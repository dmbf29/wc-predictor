import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'

class LeagueJoin extends Component {
  leagueJoin(event) {
    event.preventDefault();
    const key = document.getElementById("key").value
    const password = document.getElementById("password").value
    axios.post(
      'http://localhost:3001/api/v1/memberships',
      { league:
        {
          key: key,
          password: password
        }
      }, { headers: { 'Authorization': localStorage.jwt }}
    )
    .then(response => {
      console.log(response.data)
      this.props.history.push(`/`)
    })
    .catch(error => console.log(error))
  }

  render() {
    return (
      <div className="App">
        <div className="form-container">
          <h3>Join a League</h3>
          <form>
            <div className="form-group">
              <label htmlFor="key">Key</label>
              <input type="text" className="form-control" id="key" aria-describedby="emailHelp" placeholder="Enter key" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="text" className="form-control" id="password" placeholder="Password" />
            </div>
            <div className="form-group">
              <button className="red-button btn"
                onClick={this.leagueJoin.bind(this)}
              >
                  Join
              </button>
            </div>
            <Link to='/league_create'>Create League</Link>
          </form>
        </div>
      </div>
    );
  }
}

export default LeagueJoin;
