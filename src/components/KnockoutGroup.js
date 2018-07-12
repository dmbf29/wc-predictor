import React, { Component } from 'react'
import TeamPrediction from './TeamPrediction'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faLock } from '@fortawesome/fontawesome-free-solid'


class KnockoutGroup extends Component {

  createMatchPrediction = (prediction) => {
    this.props.getKnockoutGroups();
  }

  predictionResult = (match) => {
    if (match.prediction === null){
      return "Incorrect"
    } else if(match.prediction.correct === true){
      return "Correct"
    } else if (match.prediction.correct === false){
      return "Incorrect"
    }
  }
  homeTeam = (match) =>  {
    if (match.prediction && match.prediction.team_home && match.prediction.team_home.name) {
      return match.prediction.team_home.name
    } else {
      return match.team_home.name
    }
  }

  awayTeam = (match) =>  {
    if (match.prediction && match.prediction.team_away && match.prediction.team_away.name) {
      return match.prediction.team_away.name
    } else {
      return match.team_away.name
    }
  }
  render() {
    return (
        this.props.matches.map(match => (
          <div className="knockout-tile" id={'match' + match.id} key={match.id} >
            <div className="match-info">
              <p><strong>{this.homeTeam(match)} vs. {this.awayTeam(match)} </strong></p>
              { match.started === false && match.round.started === true &&
                <small><span className="fifa-rank">Fifa Rank | </span>{match.team_home.ranking} vs. {match.team_away.ranking}</small>
              }
              { match.started === true && match.finished === false &&
                <small><FontAwesomeIcon icon={faLock} /> Knockout Round Started </small>
              }
              { match.finished === true &&
                <small>{match.team_home_score} - {match.team_away_score} | <span className={this.predictionResult(match)} >{ this.predictionResult(match) }</span></small>
              }
              <p className="match-kickoff">{match.kickoff_time}</p>
            </div>
            <div className="flag-group">
              <div className="match-home match-team">
                <TeamPrediction
                  token={this.props.token}
                  createPrediction={this.createMatchPrediction}
                  match={match}
                  team={match.prediction === null || match.prediction.team_home === null ? match.team_home : match.prediction.team_home}
                  canEdit={ match.started === true ? "false" : this.props.canEdit } />
              </div>
              <div className="match-away match-team">
                <TeamPrediction
                  token={this.props.token}
                  createPrediction={this.createMatchPrediction}
                  match={match}
                  team={match.prediction === null || match.prediction.team_away === null ? match.team_away : match.prediction.team_away}
                  canEdit={ match.started === true ? "false" : this.props.canEdit } />
              </div>
            </div>
          </div>
        ))
    )
  }
}

export default KnockoutGroup
