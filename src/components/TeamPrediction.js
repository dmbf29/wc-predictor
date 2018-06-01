import React, { Component } from 'react'
import axios from 'axios'

class TeamPrediction extends Component {
  constructor() {
    super()
    this.state = {
      status: 'inactive'
    }
    console.log(this.props)
  }

  updateActivePredictions = () => {
    const match_row = document.getElementById('match' + this.props.match.id)
    const flags = match_row.querySelectorAll('.flag-box')
    flags.forEach((flag) => {
      flag.classList.remove('active')
    })
    const thisFlag = match_row.querySelector('.' + this.props.team.abbrev)
    thisFlag.classList.add('active')
  }

  render() {
    const noPredictionMade = this.props.match.prediction == null
    const isInactive = () => {
      if(noPredictionMade) {
        return true;
      } else if(this.props.match.prediction.winner_id === this.props.team.id) {
        return false;
      } else {
        return true;
      }
    }
    const addNewPrediction = () => {
      axios.post(
        'https://wc-predictor-api.herokuapp.com/api/v1/predictions',
        { prediction:
          {
            winner_id: this.props.team.id,
            match_id: this.props.match.id,
            round_id: this.props.match.round.id,
            draw: false,
            user_id: 1
          }
        },
        { headers: { 'Authorization': this.props.token }}
      )
      .then(response => {
        console.log(response.data)
        this.props.createPrediction(response)
        this.updateActivePredictions()
      })
      .catch(error => console.log(error))
    }
    const updatePrediction = (prediction_id) => {
      axios.post(
        `https://wc-predictor-api.herokuapp.com/api/v1/predictions/${prediction_id}`,
        { prediction:
          {
            winner_id: this.props.team.id,
            loser_id: null,
            match_id: this.props.match.id,
            round_id: this.props.match.round.id,
            draw: false,
            user_id: 1
          }
        },
        { headers: { 'Authorization': this.props.token }}
      )
      .then(response => {
        console.log(response.data)
        this.props.createPrediction(response)
        this.updateActivePredictions()
      })
      .catch(error => console.log(error))
    }
    return (
      <div className={'flag-box ' + this.props.team.abbrev + ' ' + (isInactive() ? ("inactive") : ("active"))} onClick={() => { noPredictionMade ? (addNewPrediction()) : (updatePrediction(this.props.match.prediction.id)) }}>
        <img className="team-flag" src={require(`./flags/${this.props.team.abbrev.toLowerCase()}.png`)} alt="team-flag" />
      </div>
    );
  }
}

export default TeamPrediction
