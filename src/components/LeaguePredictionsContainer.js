import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './LeaguePredictionsContainer.css';
import LeaguePredictionsGroup from "./LeaguePredictionsGroup";

class LeaguePredictionsContainer extends Component {
  constructor() {
    super()
    this.state = {leagues: []}
    console.log(localStorage)
    let token = "Bearer " + localStorage.getItem("jwt")
    axios.get(localStorage.url + '/api/v1/leagues.json', { headers: { 'Authorization': token }})
    .then(response => {
      this.setState({leagues: response.data.leagues, token: token})
      console.log(this.state.leagues)
    })
    .catch(error => console.log(error))
  }

  componentDidMount() {
  }

  render() {
    return (
      <div>
        <div className="group-tabs">
          <div className="group-tab">
            <h6>A</h6>
          </div>
          <div className="group-tab">
            <h6>B</h6>
          </div>
          <div className="group-tab">
            <h6>C</h6>
          </div>
          <div className="group-tab">
            <h6>D</h6>
          </div>
          <div className="group-tab">
            <h6>E</h6>
          </div>
          <div className="group-tab">
            <h6>F</h6>
          </div>
          <div className="group-tab">
            <h6>G</h6>
          </div>
          <div className="group-tab">
            <h6>H</h6>
          </div>
        </div>



      </div>
    )
  }
}

export default LeaguePredictionsContainer
