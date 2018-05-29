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
    const noPredictionMade = this.props.match.prediction == null
    const isInactive = () => {
      if(noPredictionMade) {
        return true;
      } else if(this.props.match.prediction.draw === true) {
        return false;
      } else {
        return true;
      }
    }
    const addNewPrediction = () => {
      axios.post(
        'http://localhost:3001/api/v1/predictions',
        { prediction:
          {
            draw: true,
            winner_id: null,
            loser_id: null,
            match_id: this.props.match.id,
            round_id: this.props.match.round.id,
            user_id: 1
          }
        }
      )
      .then(response => {
        this.props.createPrediction(response)
        this.updateActivePredictions()
      })
      .catch(error => console.log(error))
    }
    const updatePrediction = (prediction_id) => {
      axios.post(
        `http://localhost:3001/api/v1/predictions/${prediction_id}`,
        { prediction:
          {
            draw: true,
            winner_id: null,
            loser_id: null,
            match_id: this.props.match.id,
            round_id: this.props.match.round.id,
            user_id: 1
          }
        }
      )
      .then(response => {
        this.props.createPrediction(response)
        this.updateActivePredictions()
      })
      .catch(error => console.log(error))
    }
    return (
        <div className={'flag-box draw ' + ' ' + (isInactive() ? ("inactive") : ("active"))} onClick={() => { noPredictionMade ? (addNewPrediction()) : (updatePrediction(this.props.match.prediction.id)) }}>
        <img className="team-flag" src={require(`./flags/draw1.png`)} alt="team-flag" />
      </div>
    );
  }
}

export default DrawPrediction
