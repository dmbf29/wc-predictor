import React, { Component } from 'react'

class MatchPredictions extends Component {
  constructor() {
    super()
    this.state = {
      match: []
    }
  }

  render() {
    return (
      <div className="match-predictions">
        <div className="predictions-teams">
          <div className="predictions-teams-home predictions-team predictions-header">
            <p className={ this.props.match.winner_id === this.props.match.team_home.id ? "Correct" : "" } >{this.props.match.team_home.abbrev}</p>
          </div>
          <div className="predictions-teams-vs predictions-team predictions-header">
            <p className={ this.props.match.draw === true ? "Correct" : "" }>vs.</p>
          </div>
          <div className="predictions-teams-away predictions-team predictions-header">
            <p className={ this.props.match.winner_id === this.props.match.team_away.id ? "Correct" : "" }>{this.props.match.team_away.abbrev}</p>
          </div>
        </div>
        <div className="predictions-teams">
          <div className="predictions-teams-home predictions-team">
            { this.props.match.team_home_names && this.props.match.team_home_names.map(name => (
              <p key={`${this.props.league.id}-${this.props.match.id}-${name}`}>{name.split(' ')[0]}</p>
            ))}
          </div>
          <div className="predictions-teams-vs predictions-team">
            { this.props.match.draw_names && this.props.match.draw_names.map(name => (
              <p key={`${this.props.league.id}-${this.props.match.id}-${name}`}>{name.split(' ')[0]}</p>
            ))}
          </div>
          <div className="predictions-teams-away predictions-team">
            { this.props.match.team_away_names && this.props.match.team_away_names.map(name => (
              <p key={`${this.props.league.id}-${this.props.match.id}-${name}`}>{name.split(' ')[0]}</p>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default MatchPredictions
