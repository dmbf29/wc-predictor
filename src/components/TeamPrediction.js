import React, { Component } from 'react'
import axios from 'axios'

class TeamPrediction extends Component {

  updateActivePredictions = () => {
    const match_row = document.getElementById('match' + this.props.match.id)
    const flags = match_row.querySelectorAll('.flag-box')
    flags.forEach((flag) => {
      flag.classList.remove('active')
    })
    const thisFlag = match_row.querySelector('.' + this.props.team.abbrev)
    thisFlag.classList.add('active')
  }

  tryRequire = (path) => {
    try {
     return require(`${path}`);
    } catch (err) {
     return null;
    }
  };

  loserId() {
    if (this.props.team.id === this.props.match.team_home.id) {
      return this.props.match.team_away.id
    } else {
      return this.props.match.team_home.id
    }
  }

  render() {
    const canEdit = this.props.canEdit
    const noPredictionMade = this.props.match.prediction == null
    const predictionStatus = () => {
      if(this.props.match.prediction === null) {
        return "inactive"
      } else if (this.props.match.prediction.correct === true && this.props.match.prediction.winner_id === this.props.team.id) {
        return "correct-prediction"
      } else if (this.props.match.prediction.correct === false && this.props.match.prediction.winner_id === this.props.team.id) {
        return "incorrect-prediction"
      } else if (this.props.match.prediction.correct === false && this.props.match.winner_id === this.props.team.id) {
        return "correct-prediction"
      } else if (this.props.match.prediction.correct === null && this.props.match.prediction.winner_id === this.props.team.id) {
        return "active"
      }
    }

    const addNewPrediction = () => {
      if(canEdit === "true") {
        axios.post(
          localStorage.url + '/api/v1/predictions',
          { prediction:
            {
              winner_id: this.props.team.id,
              loser_id: this.loserId(),
              match_id: this.props.match.id,
              round_id: this.props.match.round.id,
              draw: false
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
            winner_id: this.props.team.id,
            loser_id: this.loserId(),
            match_id: this.props.match.id,
            round_id: this.props.match.round.id,
            draw: false
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
      <div className={`flag-box ${this.props.team.abbrev} ${predictionStatus()}`} onClick={() => { noPredictionMade ? (addNewPrediction()) : (updatePrediction(this.props.match.prediction.id)) }}>
        <img className={"team-flag " + (canEdit === "true" ? "team-flag-hover" : "locked")  } src={ this.tryRequire(`./flags/${this.props.team.abbrev.toLowerCase()}.png`) ? require(`./flags/${this.props.team.abbrev.toLowerCase()}.png`) : require('./flags/placeholder.png')} alt="team-flag" />
      </div>
    );
  }
}

export default TeamPrediction
