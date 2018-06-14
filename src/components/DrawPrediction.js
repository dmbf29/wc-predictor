import React, { Component } from 'react'
import axios from 'axios'

class DrawPrediction extends Component {
  constructor() {
    super()
    this.state = {
      status: 'inactive'
    }
  }

  updateActivePredictions = () => {
    const match_row = document.getElementById('match' + this.props.match.id)
    const flags = match_row.querySelectorAll('.flag-box')
    flags.forEach((flag) => {
      flag.classList.remove('active')
    })
    const thisFlag = match_row.querySelector('.draw')
    thisFlag.classList.add('active')
  }


  render() {
    const canEdit = this.props.canEdit
    const noPredictionMade = this.props.match.prediction == null

    const predictionStatus = () => {
      if(this.props.match.prediction === null) {
        return "inactive"
      } else if (this.props.match.draw === true ) {
        return "correct-prediction"
      } else if (this.props.match.prediction.draw === true && this.props.match.prediction.correct === true ) {
        return "correct-prediction"
      } else if (this.props.match.prediction.draw === true && this.props.match.prediction.correct === false ) {
        return "incorrect-prediction"
      } else if (this.props.match.prediction.correct === null && this.props.match.prediction.draw === true) {
        return "active"
      }
    }

    const addNewPrediction = () => {
      if(canEdit === "true") {
        axios.post(
          localStorage.url + '/api/v1/predictions',
          { prediction:
            {
              draw: true,
              winner_id: null,
              loser_id: null,
              match_id: this.props.match.id,
              round_id: this.props.match.round.id
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
    }
    const updatePrediction = (prediction_id) => {
      if(canEdit === "true") {
        axios.post(
          localStorage.url + `/api/v1/predictions/${prediction_id}`,
          { prediction:
            {
              draw: true,
              winner_id: null,
              loser_id: null,
              match_id: this.props.match.id,
              round_id: this.props.match.round.id
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
    }
    return (
      <div className={`flag-box draw ${predictionStatus()}`} onClick={() => { noPredictionMade ? (addNewPrediction()) : (updatePrediction(this.props.match.prediction.id)) }}>
        <img className={"team-flag " + (canEdit === "true" ? "team-flag-hover" : "locked")  } src={require(`./flags/draw1.png`)} alt="team-flag" />
      </div>
    );
  }
}

export default DrawPrediction
