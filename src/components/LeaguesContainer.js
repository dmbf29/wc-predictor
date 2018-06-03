import React, { Component } from 'react'
import axios from 'axios'
import './LeaguesContainer.css';

class LeaguesContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      leagues: []
    }
    console.log(localStorage)
    if(localStorage.jwt === undefined) {
      this.props.history.push(`/sign_in`)
    }
  }

  componentDidMount() {
    const self = this;
    let token = "Bearer " + localStorage.getItem("jwt")
    axios.get('http://localhost:3001/api/v1/leagues.json', { headers: { 'Authorization': token }})
    .then(response => {
      self.setState({token: token, leagues: response.data.leagues})
      console.log(self.state)
    })
    .catch(error => console.log(error))
  }

  render() {
    return (
      <div className="matches-container">
        {this.state.leagues.map((league) => {
          <p>{league.name}</p>
        })}
      </div>
    )
  }
}

export default LeaguesContainer
