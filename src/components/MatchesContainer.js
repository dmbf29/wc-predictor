import React, { Component } from 'react'
import axios from 'axios'
import './MatchesContainer.css';

class MatchesContainer extends Component {
  componentDidMount() {
    axios.get('http://localhost:3001/api/v1/matches.json')
    .then(response => {
      console.log(response.data.matches)
      this.setState({matches: response.data.matches})
    })
    .catch(error => console.log(error))
  }

  constructor(props) {
    super(props)
    this.state = {
      matches: []
    }
  }

  render() {
    return (
      <div className="matches-container">
        {this.state.matches.map((match) => {
          return(
            <div className="match-tile">
              <div className="match-home match-team">
                <h4>{match.team_home.name}</h4>
                <img className="team-flag" src={require(`../flags/${match.team_home.abbrev.toLowerCase()}.png`)} />
              </div>
              <div>
              </div>
              <div className="match-info">
                <p>{match.kickoff_time}</p>
              </div>
              <div>
              </div>
              <div className="match-away match-team">
                <h4>{match.team_away.name}</h4>
                <img className="team-flag" src={require(`../flags/${match.team_away.abbrev.toLowerCase()}.png`)} />
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}

export default MatchesContainer
