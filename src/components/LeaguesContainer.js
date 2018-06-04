import React, { Component } from 'react'
import axios from 'axios'
import './LeaguesContainer.css';
import { Link } from 'react-router-dom'

class LeaguesContainer extends Component {
  constructor() {
    super()
    this.state = {leagues: []}
    console.log(localStorage)
    let token = "Bearer " + localStorage.getItem("jwt")
    axios.get(localStorage.url + '/api/v1/leagues.json', { headers: { 'Authorization': token }})
    .then(response => {
      this.setState({leagues: response.data.leagues, token: token})
      console.log(this.state.leagues)
    })
    .catch(error => console.log(error))
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className="matches-container">
        { this.state.leagues.length === 0 &&
            <Link className="red-button btn" to='/league_create'>Create a League</Link>
        }
        {this.state.leagues.map(league => (
          <div className="league-container" key={league.id}>
            <div className="group-header">
              <h3>{league.name}</h3>
            </div>
            <div className="user-tile user-sub">
              <div className="user-position user-sub-item">
                  <p>POS</p>
                </div>
              <div className="user-name user-sub-item">
                <p>NAME</p>
              </div>
              <div className="user-overall user-sub-item">
                <p>SCORE</p>
              </div>
            </div>
            {league.users.map((user, index) => (
              <div className="user-tile" key={user.id}>
                <div className="user-position user-tile-item ">
                  <p>{index + 1}</p>
                </div>
                <div className="user-name user-tile-item ">
                  <p>{user.name}</p>
                </div>
                <div className="user-overall user-tile-item ">
                  <p>{user.score}</p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    )
  }
}

export default LeaguesContainer
