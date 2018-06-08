import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './LeaguePredictionsContainer.css';
import LeaguePredictionsGroup from "./LeaguePredictionsGroup";
import MatchPredictions from "./MatchPredictions";

class LeaguePredictionsContainer extends Component {
  constructor() {
    super()
    this.state = {
      matches: [],
      groups: [{}]
    }
  }
  componentDidMount() {
    console.log('this props')
    console.log(this)
  }

  openPredictionsContainer(groupId) {
    const hiddenDiv = document.querySelector('.active-tab');
    if (hiddenDiv) {
      hiddenDiv.classList.remove('active-tab');
    }
    const newDiv = document.querySelector(`.tab-${this.props.league.id}-${groupId}`);
    newDiv.classList.add('active-tab');
    let token = "Bearer " + localStorage.getItem("jwt")
    axios.get(localStorage.url + `/api/v1/leagues/` + this.props.league.id + `/groups/` + groupId, { headers: { 'Authorization': token }})
    .then(response => {
      this.setState({matches: response.data.league_groups})
    })
    .catch(error => console.log(error))
  }

  render() {
    return (
      <div>
        <div className="group-tabs">
          { this.props.groups && this.props.groups.map((group, index) => (
            <div className={`group-tab tab-${this.props.league.id}-${group.id} ` } key={group.id} onClick={() => { this.openPredictionsContainer(group.id) }}>
              <h6>{group.name.split(' ')[1]}</h6>
            </div>
          ))}
        </div>
        <div className="match-predictions-container default-hidden">
          { this.state.matches && this.state.matches.map(match => (
            <MatchPredictions key={match.id} match={match} />
          ))}
        </div>
      </div>
    )
  }
}

export default LeaguePredictionsContainer
