import React, { Component } from 'react'
import './GroupContainer.css';
import TeamPrediction from './TeamPrediction'
import DrawPrediction from './DrawPrediction'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faLock } from '@fortawesome/fontawesome-free-solid'


class GroupContainer extends Component {

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
      <div className="group-container" id={this.props.group.name}>
        <div className="group-header">
          <h3>{this.props.group.name}</h3>
        </div>
        {this.props.group.matches.map(match => (
          <div className="match-tile" id={'match' + match.id} key={match.id} >
            <div className="match-info">
              <p><strong>{match.team_home.name} vs. {match.team_away.name}</strong></p>
              { match.started === false &&
                <small><span className="fifa-rank">Fifa Rank | </span>{match.team_home.ranking} vs. {match.team_away.ranking}</small>
              }
              { match.started === true && match.finished === false &&
                <small><FontAwesomeIcon icon={faLock} /> Match Started </small>
              }
              { match.finished === true &&
                <small>{match.team_home_score} - {match.team_away_score} | <span className={this.predictionResult(match)} >{ this.predictionResult(match) }</span></small>
              }
              <p><em>{match.kickoff_time}</em></p>
            </div>
            <div className="flag-group">
              <div className="match-home match-team">
                <TeamPrediction token={this.props.token} createPrediction={this.createMatchPrediction} match={match} team={match.team_home} canEdit={ match.started === true ? "false" : this.props.canEdit} />
              </div>
              <div className="match-away match-team">
                <TeamPrediction token={this.props.token} createPrediction={this.createMatchPrediction} match={match} team={match.team_away} canEdit={ match.started === true ? "false" : this.props.canEdit} />
              </div>
              <div className="match-draw match-team">
                <DrawPrediction token={this.props.token} createPrediction={this.createMatchPrediction} match={match} canEdit={ match.started === true ? "false" : this.props.canEdit} />
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }
}

export default GroupContainer
