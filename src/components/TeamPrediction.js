import React, { Component } from 'react'
import axios from 'axios'

class TeamPrediction extends Component {

  render() {
    const addNewPrediction = (team) => {
      console.log(this.props.team.name)
      console.log(this.props.match)
      axios.post(
        'http://localhost:3001/api/v1/predictions',
        { prediction:
          {
            winner_id: this.props.team.id,
            match_id: this.props.match.id,
            round_id: this.props.match.round.id,
            user_id: 1
          }
        }
      )
      .then(response => {
        console.log(response)
      })
      .catch(error => console.log(error))
    }
    return (
      <div onClick={() => { addNewPrediction() }}>
        <img className="team-flag" src={require(`../flags/${this.props.team.abbrev.toLowerCase()}.png`)} atl="team-flag" />
      </div>
    );
  }
}

export default TeamPrediction