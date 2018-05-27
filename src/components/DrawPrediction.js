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
    console.log(match_row)
    thisFlag.classList.add('active')
  }


  render() {
    const addNewPrediction = () => {
      console.log(this.props.match)
      axios.post(
        'http://localhost:3001/api/v1/predictions',
        { prediction:
          {
            draw: true,
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
      <div className={'flag-box draw ' + this.state.status} onClick={() => { addNewPrediction() }}>
        <img className="team-flag" src={require(`../flags/draw1.png`)} alt="team-flag" />
      </div>
    );
  }
}

export default DrawPrediction
