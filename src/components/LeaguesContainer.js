import React, { Component } from 'react'
import axios from 'axios'
import './LeaguesContainer.css';

class LeaguesContainer extends Component {
  constructor() {
    super()
    this.state = {leagues: []}
    console.log(localStorage)
    // if(localStorage.jwt === undefined) {
    //   this.props.history.push(`/sign_in`)
    // }
    let token = "Bearer " + localStorage.getItem("jwt")
    axios.get('http://localhost:3001/api/v1/leagues.json', { headers: { 'Authorization': token }})
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
        {this.state.leagues.map(league => (
          <div className="league-container" key={league.id}>
            <div className="group-header">
              <h3>{league.name}</h3>
            </div>
            <div className="user-tile user-sub">
              <div className="user-position user-sub-item">
                  <p>Position</p>
                </div>
              <div className="user-name user-sub-item">
                <p>Name</p>
              </div>
              <div className="user-overall user-sub-item">
                <p>Score</p>
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
