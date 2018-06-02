import React, { Component } from 'react'
import axios from 'axios'
import './MatchesContainer.css';
import TeamPrediction from './TeamPrediction'
import DrawPrediction from './DrawPrediction'

class GroupContainer extends Component {
  constructor(props) {
    super(props)
  }


  createMatchPrediction = (prediction) => {
    const matches = this.props.matches
    const old_match = matches.find(x => x.id === prediction.data.prediction.match_id);
    old_match["prediction"] = prediction.data.prediction
    this.setState({matches: matches})
  }

  render() {
    return (
      <div className="group-container">
        <div className="group-header">
          <h3>{this.props.matches.first.group.name}</h3>
        </div>
        {this.props.matches.map((match) => {
          const noPredictionMade = (match.prediction == null)
          return(
            <div className="match-tile" id={'match' + match.id} key={match.id} >
              <div className="match-info">
                <p><strong>{match.team_home.name} vs. {match.team_away.name}</strong></p>
                <p>{match.group.name}</p>
                <p><em>{match.kickoff_time}</em></p>
              </div>
              <div className="flag-group">
                <div className="match-home match-team">
                  <TeamPrediction token={this.props.token} createPrediction={this.createMatchPrediction} match={match} team={match.team_home} />
                </div>
                <div className="match-away match-team">
                  <TeamPrediction token={this.props.token} createPrediction={this.createMatchPrediction} match={match} team={match.team_away} />
                </div>
                <div className="match-draw match-team">
                  <DrawPrediction token={this.props.token} createPrediction={this.createMatchPrediction} match={match} />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}

export default GroupContainer
