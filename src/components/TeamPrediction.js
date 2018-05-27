import React, { Component } from 'react'
import axios from 'axios'

class TeamPrediction extends Component {
  addNewPrediction = (team) => {
    axios.post(
      'http://localhost:3001/api/v1/predictions',
      { prediction:
        {
          winner_id: team.id,
          match_id: ,
          round_id: 1,
          user_id: 1
        }
      }
    )
    .then(response => {
      console.log(response)
    })
    .catch(error => console.log(error))
  }


  render() {
    return (
      <div onClick={this.addNewPrediction(this.props.team)}>
        <img className="team-flag" src={require(`../flags/${this.props.team.abbrev.toLowerCase()}.png`)} />
      </div>
    )
  }
}

export default TeamPrediction
