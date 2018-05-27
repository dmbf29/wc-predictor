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
              <div className="match-info">
                <p>{match.team_home.name} vs. {match.team_away.name}</p>
                <p>{match.group.name}</p>
                <p>{match.kickoff_time}</p>
              </div>
              <div className="flag-group">
                <div className="match-home match-team">
                  <img className="team-flag" src={require(`../flags/${match.team_home.abbrev.toLowerCase()}.png`)} />
                </div>
                <div className="match-away match-team">
                  <img className="team-flag" src={require(`../flags/${match.team_away.abbrev.toLowerCase()}.png`)} />
                </div>
                <div className="match-draw match-team">
                  <img className="team-flag" src={require('../flags/draw1.png')} />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}

export default MatchesContainer
