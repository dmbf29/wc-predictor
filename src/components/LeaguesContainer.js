import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import LeaguePredictionsContainer from "./LeaguePredictionsContainer";
import Leaderboard from "./Leaderboard";

class LeaguesContainer extends Component {
  constructor() {
    super()
    this.state = {leagues: []}
    // console.log(localStorage)
    this.getLeagues()
  }

  getLeagues() {
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
      delete localStorage.jwt;
    })
  }

  getGroupNames() {
    let token = "Bearer " + localStorage.getItem("jwt")
    axios.get(localStorage.url + `/api/v1/group_names`, { headers: { 'Authorization': token }})
    .then(response => {
      // console.log(response)
      this.setState({groups: response.data.groups})
    })
    .catch(error => console.log(error))
  }

  getLeaderboard() {
    let token = "Bearer " + localStorage.getItem("jwt")
    axios.get(localStorage.url + `/api/v1/users`, { headers: { 'Authorization': token }})
    .then(response => {
      this.setState({leaders: response.data.users})
    })
    .catch(error => console.log(error))
  }

  componentDidMount() {
    this.getGroupNames();
    this.getLeaderboard();
  }

  visitPredictions(user) {
    this.props.history.push(`/predictions/${user.id}/${user.name}`)
  }

  addErrors() {
    const matchesContainer = document.querySelector(".container");
    matchesContainer.insertAdjacentHTML("beforebegin", "<div id='error-messages'><small style='padding-bottom:5px;'>There was an error loading matches.</small><br /><small style='padding-bottom:5px;'>Try signing in again.</small><br /><br /><button class='red-button btn'>Sign In</button></div>");
    const button = document.querySelector('.red-button');
    button.addEventListener("click", (event) => {
      const errorMessages = document.getElementById("error-messages");
      errorMessages.parentNode.removeChild(errorMessages)
      this.signOut();
    });
  }

  signOut() {
    delete localStorage.jwt
    this.props.history.push(`/`)
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
        { this.state.leagues && this.state.leagues.map(league => (
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
                { league.users && league.users.map((user, index) => (
                  <tr key={user.id} onClick={() => { this.visitPredictions(user) }}>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.picks} / 48</td>
                    <td>{user.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
        <Leaderboard leaders={this.state.leaders} visitPredictions={this.visitPredictions} />
      </div>
    )
  }
}

export default LeaguesContainer
