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
    const addNewPrediction = (team) => {
      // console.log(this.props.team.name)
      console.log(this.state)
      // console.log(this.props.match)
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
        // console.log(this.props)
        this.props.updateMatch(response)
        // console.log(response.data)
        // console.log(this)
        // this.setState({status: 'active'})
        // console.log(this.state)
        // console.log(this)
        // const matches = update(this.state.matches, {
        //   $splice: [[0, 0, response.data]]
        // })
        // this.setState({matches: matches})
      })
      .catch(error => console.log(error))
    }
    return (
      <div className={'flag-box ' + this.state.status} onClick={() => { addNewPrediction() }}>
        <img className="team-flag" src={require(`../flags/${this.props.team.abbrev.toLowerCase()}.png`)} atl="team-flag" />
      </div>
    );
  }
}

export default TeamPrediction
