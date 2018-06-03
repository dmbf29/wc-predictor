import React, { Component } from 'react'
import axios from 'axios'
import './LeaguesContainer.css';

class LeaguesContainer extends Component {
  constructor() {
    super()
    this.state = {leagues: []}
    console.log(localStorage)
    if(localStorage.jwt === undefined) {
      this.props.history.push(`/sign_in`)
    }
    let token = "Bearer " + localStorage.getItem("jwt")
    axios.get('http://localhost:3001/api/v1/leagues.json', { headers: { 'Authorization': token }})
    .then(response => {
      this.setState({leagues: response.data.leagues, token: token})
      console.log(typeof this.state.leagues)
    })
    .catch(error => console.log(error))
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className="matches-container">
        {this.state.leagues.map(league => (
          <p key={league.id}>{league.name}</p>
        ))}
      </div>
    )
  }
}

export default LeaguesContainer
