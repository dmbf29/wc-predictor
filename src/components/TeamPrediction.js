import React, { Component } from 'react'
import axios from 'axios'
import update from 'immutability-helper'

class TeamPrediction extends Component {
  constructor() {
    super()
    this.state = {
      status: 'inactive'
    }
  }

  render() {
    const noPredictionMade = this.props.match.prediction == null
    const addNewPrediction = () => {
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
        this.props.createPrediction(response)
      })
      .catch(error => console.log(error))
    }
    const updatePrediction = (prediction_id) => {
      axios.post(
        `http://localhost:3001/api/v1/predictions/${prediction_id}`,
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
        this.props.createPrediction(response)
      })
      .catch(error => console.log(error))
    }
    return (
      <div className={'flag-box ' + this.state.status} onClick={() => { noPredictionMade ? (addNewPrediction()) : (updatePrediction(this.props.match.prediction.id)) }}>
        <img className="team-flag" src={require(`../flags/${this.props.team.abbrev.toLowerCase()}.png`)} atl="team-flag" />
      </div>
    );
  }
}

export default TeamPrediction
