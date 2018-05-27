import React, { Component } from 'react'
import axios from 'axios'
import update from 'immutability-helper'

class DrawPrediction extends Component {

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
        console.log(response)
        const predictions = update(this.state.predictions, {
          $splice: [[0, 0, response.data]]
        })
        this.setState({predictions: predictions})
      })
      .catch(error => console.log(error))
    }
    return (
      <div onClick={() => { addNewPrediction() }}>
        <img className="team-flag" src={require(`../flags/draw1.png`)} atl="team-flag" />
      </div>
    );
  }
}

export default DrawPrediction
