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
      <div>
        { this.state.leagues.length === 0 &&
          <div className="container">
          <div className="row" style={{justifyContent: 'center'}}>
          <div className="form-buttons col-xs-offset-3 col-xs-offset-6">
            <Link className="red-button btn" to='/league_create'>Create a League</Link>
            <Link className="red-button btn" to='/league_join'>Join a League</Link>
          </div>
          </div>
          </div>
        }
        {this.state.leagues.map(league => (
          <div className="league-container" key={league.id}>
            <div className="league-header">
              <h3>{league.name}</h3>
              <small>key: {league.key} | pass: {league.password}</small>
            </div>
            <table className="table table-hover">
              <thead className="user-sub">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">NAME</th>
                  <th scope="col">PICKS</th>
                  <th scope="col">SCORE</th>
                </tr>
              </thead>
              <tbody>
                {league.users.map((user, index) => (
                  <tr key={user.id}>
                    <td scope="row">{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.picks} / 48</td>
                    <td>{user.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    )
  }
}

export default LeaguesContainer
