import React, { Component } from 'react'
import MatchPredictions from "./MatchPredictions";

class LeaguePredictionsGroup extends Component {

  render() {
    return (
      <div className="group-predictions-box">
        { this.props.matches.map(match => (
          <table className="table table-hover" key={match.id}>
            <thead className="user-sub">
              <tr>
                <th scope="col">{match.team_home.name}</th>
                <th scope="col">vs.</th>
                <th scope="col">{match.team_away.name}</th>
              </tr>
            </thead>
            <MatchPredictions predictions={match.predictions} />
          </table>
        ))}
      </div>
    )
  }
}

export default LeaguePredictionsGroup
