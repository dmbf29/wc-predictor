import React, { Component } from 'react'
import axios from 'axios'
import './MatchesContainer.css';
import TeamPrediction from './TeamPrediction'
import DrawPrediction from './DrawPrediction'

class GroupContainer extends Component {

  createMatchPrediction = (prediction) => {
    const matches = this.props.matches
    const old_match = matches.find(x => x.id === prediction.data.prediction.match_id);
    old_match["prediction"] = prediction.data.prediction
    this.setState({matches: matches})
  }

  showProps(){
    console.log(this.props)
  }

  render() {
    return (
      <div className="group-container">
        <div className="group-header">
          <h3 onClick={ this.showProps.bind(this) }>{this.props.token}</h3>
        </div>

      </div>
    )
  }
}

export default GroupContainer
