import React, { Component } from 'react'
import axios from 'axios'
import './LeaguesContainer.css';
import { Link } from 'react-router-dom'
import LeaguePredictionsContainer from "./LeaguePredictionsContainer";

class LeaguesContainer extends Component {
  constructor() {
    super()
    this.state = {leagues: []}
    // console.log(localStorage)
    let token = "Bearer " + localStorage.getItem("jwt")
    axios.get(localStorage.url + '/api/v1/leagues', { headers: { 'Authorization': token }})
    .then(response => {
      this.setState({leagues: response.data.leagues, token: token})
      // console.log(this.state)
      const leaguesContainers = document.querySelectorAll(".league-container");
      leaguesContainers.forEach(function (container) {
        container.classList.remove('display-none')
      })
    })
    .catch(error => {console.log(error)
      this.addErrors();
    })
  }

  componentDidMount() {
    let token = "Bearer " + localStorage.getItem("jwt")
    axios.get(localStorage.url + `/api/v1/group_names`, { headers: { 'Authorization': token }})
    .then(response => {
      this.setState({groups: response.data.groups})
    })
    .catch(error => console.log(error))
  }

  visitPredictions(user) {
    this.props.history.push(`/predictions/${user.id}/${user.name}`)
  }

  addErrors() {
    const MatchesContainer = document.querySelector(".container");
    MatchesContainer.insertAdjacentHTML("beforebegin", "<small style='padding-bottom:5px;'>There was an error loading leagues.</small><br /><small style='padding-bottom:5px;'>Try signing in again.</small>");
  }

  render() {
    return (
      <div>
        { this.state.leagues.length === 0 &&
          <div className="container league-container display-none">
            <div className="row" style={{justifyContent: 'center'}}>
              <div className="form-buttons col-xs-offset-3 col-xs-offset-6">
                <Link className="red-button btn" to='/league_create'>Create a League</Link>
                <Link className="red-button btn" to='/league_join'>Join a League</Link>
              </div>
            </div>
          </div>
        }
        {this.state.leagues.map(league => (
          <div className="league-container display-none" key={league.id}>
            <div className="league-header">
              <h3>{league.name}</h3>
              <small>key: {league.key} | password: {league.password}</small>
            </div>
            <LeaguePredictionsContainer groups={this.state.groups} league={league} />
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
                  <tr key={user.id} onClick={() => { this.visitPredictions(user) }}>
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
