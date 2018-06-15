import React, { Component } from 'react'
import TeamPrediction from './TeamPrediction'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faLock } from '@fortawesome/fontawesome-free-solid'


class KnockoutGroup extends Component {

  createMatchPrediction = (prediction) => {
    const matches = this.props.matches
    const old_match = matches.find(x => x.id === prediction.data.prediction.match_id);
    old_match["prediction"] = prediction.data.prediction
    this.setState({matches: matches})
  }

  predictionResult = (match) => {
    if(match.prediction.correct === true){
      return "Correct"
    } else if (match.prediction.correct === false){
      return"Incorrect"
    }
  }

  render() {
    return (
        this.props.matches.map(match => (
          <div className="knockout-tile" id={'match' + match.id} key={match.id} >
            <div className="match-info">
              <p><strong>{match.team_home.name} vs. {match.team_away.name}</strong></p>
              { match.started === false && match.round.started === true &&
                <small><span className="fifa-rank">Fifa Rank | </span>{match.team_home.ranking} vs. {match.team_away.ranking}</small>
              }
              { match.started === true && match.finished === false &&
                <small><FontAwesomeIcon icon={faLock} /> Match Started </small>
              }
              { match.finished === true &&
                <small>{match.team_home_score} - {match.team_away_score} | <span className={this.predictionResult(match)} >{ this.predictionResult(match) }</span></small>
              }
              <p className="match-kickoff">{match.kickoff_time}</p>
            </div>
            <div className="flag-group">
              <div className="match-home match-team">
                <TeamPrediction token={this.props.token} createPrediction={this.createMatchPrediction} match={match} team={match.team_home} canEdit={ match.started === true ? "false" : "false" } />
              </div>
              <div className="match-away match-team">
                <TeamPrediction token={this.props.token} createPrediction={this.createMatchPrediction} match={match} team={match.team_away} canEdit={ match.started === true ? "false" : "false" } />
              </div>
            </div>
          </div>
        ))
    )
  }
}

export default KnockoutGroup
