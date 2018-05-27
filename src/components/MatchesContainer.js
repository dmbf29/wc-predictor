import React, { Component } from 'react'
import axios from 'axios'
import './MatchesContainer.css';
import TeamPrediction from './TeamPrediction'
import DrawPrediction from './DrawPrediction'

class MatchesContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      matches: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3001/api/v1/matches.json')
    .then(response => {
      this.setState({matches: response.data.matches})
      console.log(this.state)
    })
    .catch(error => console.log(error))
  }

  updateMatchPrediction = (prediction) => {
    const matches = this.state.matches
    const old_match = matches.find(x => x.id === prediction.data.prediction.match_id);
    old_match["prediction"] = prediction.data.prediction
    this.setState({matches: matches})
    console.log(this.state)
  }

  render() {
    return (
      <div className="matches-container">
        {this.state.matches.map((match) => {
          return(
            <div className="match-tile" key={match.id} >
              <div className="match-info">
                <p>{match.team_home.name} vs. {match.team_away.name}</p>
                <p>{match.group.name}</p>
                <p>{match.kickoff_time}</p>
              </div>
              <div className="flag-group">
                <div className="match-home match-team">
                  <TeamPrediction updateMatch={this.updateMatchPrediction} matches={this.state.matches} match={match} team={match.team_home} />
                </div>
                <div className="match-away match-team">
                  <TeamPrediction matches={this.state.matches} match={match} team={match.team_away} />
                </div>
                <div className="match-draw match-team">
                  <DrawPrediction matches={this.state.matches} match={match} />
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
