import React, { Component } from 'react'
import axios from 'axios'
import './LeaguePredictionsContainer.css';
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
  }

  openPredictionsContainer(groupId, e) {
    const sameDiv = e.target.classList.contains('active-tab') || e.target.parentNode.classList.contains('active-tab')
    const league = e.target.closest(".league-container")
    const activeDiv = league.querySelector('.active-tab');
    const container = league.querySelector('.match-predictions-container');
    if (activeDiv) {
      activeDiv.classList.remove('active-tab');
    }
    if (sameDiv) {
      container.classList.toggle("display-none")
      activeDiv.classList.remove('active-tab');
    } else {
      container.classList.remove("display-none")
      const newDiv = league.querySelector(`.tab-${this.props.league.id}-${groupId}`);
      newDiv.classList.add('active-tab');
    }
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
            <div className={`group-tab tab-${this.props.league.id}-${group.id}` } key={`tab-${this.props.league.id}-${group.id}`} onClick={(e) => { this.openPredictionsContainer(group.id, e) }}>
              <h6 className={`tab-${this.props.league.id}-${group.id}`}>{group.name.split(' ')[1]}</h6>
            </div>
          ))}
        </div>
        <div className="match-predictions-container display-none">
          { this.state.matches && this.state.matches.map(match => (
            <MatchPredictions key={`match-${this.props.league.id}-${match.id}`} match={match} league={this.props.league} />
          ))}
        </div>
      </div>
    )
  }
}

export default LeaguePredictionsContainer
