import React, { Component } from 'react'
import axios from 'axios'
import './MatchesContainer.css';
import GroupContainer from './GroupContainer'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

class MatchesContainer extends Component {
  constructor() {
    super()
    this.state = {groups: [], sort: "groups", matches: [], stage: "groups", knockouts: []}
    this.getGroups()
  }

  getGroups() {
    let token = "Bearer " + localStorage.getItem("jwt")
    axios.get(localStorage.url + '/api/v1/groups.json', { headers: { 'Authorization': token }})
    .then(response => {
      this.setState({groups: response.data.groups, token: token})
    })
    .catch(error => {console.log(error)
      this.addErrors();
    })
  }

  getMatches() {
    let token = "Bearer " + localStorage.getItem("jwt")
    axios.get(localStorage.url + '/api/v1/matches', { headers: { 'Authorization': token }})
    .then(response => {
      this.setState({ matches: response.data.matches })
    })
    .catch(error => {console.log(error)
      this.addErrors();
    })
  }

  getKnockouts() {
    let token = "Bearer " + localStorage.getItem("jwt")
    axios.get(localStorage.url + '/api/v1/knockouts', { headers: { 'Authorization': token }})
    .then(response => {
      console.log(response)
      this.setState({knockouts: response.data.knockouts, token: token})
    })
    .catch(error => {console.log(error)
      this.addErrors();
    })
  }

  addErrors() {
    const matchesContainer = document.querySelector(".matches-container");
    matchesContainer.classList.add('display-none')
    matchesContainer.insertAdjacentHTML("beforebegin", "<small style='padding-bottom:5px;'>There was an error loading matches.</small><br /><small style='padding-bottom:5px;'>Try signing in again.</small>");
  }

  sortByTime() {
    this.setState({sort: "time"})
    this.getMatches()
  }

  sortByGroups() {
    this.setState({sort: "groups"})
    this.getGroups()
  }

  displayKnockouts() {
    this.setState({stage: "knockouts"})
    this.getKnockouts()
  }

  displayGroups() {
    this.setState({stage: "groups"})
    this.getGroups()
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className="matches-container">
        <div className="nav-btns">
          <div className="stages-container">
            <div className="groups-btn" onClick={ this.displayGroups.bind(this) }>Groups</div>
            <div className="knockout-btn" onClick={ this.displayKnockouts.bind(this) }>Knockout</div>
          </div>
          <div className="sortby-btn" onClick={this.state.sort === "time" ? this.sortByGroups.bind(this) : this.sortByTime.bind(this) }><FontAwesomeIcon icon="sort" /> { this.state.sort === "time" ? "Groups" : "Kickoff Time" }</div>
        </div>
        {this.state.groups.length === 0 &&
          <div className="container">
            <h1><FontAwesomeIcon icon="spinner" spin /></h1>
          </div>
        }
        {this.state.sort === "groups" &&
          this.state.groups.map(group => (
            <div className="group-container" id={group.name} key={group.id}>
              <div className="group-header">
                <h3>{group.name}</h3>
              </div>
              <GroupContainer key={group.id} token={this.state.token} group={group} matches={group.matches} canEdit="true" />
            </div>
          ))
        }
        { this.state.sort === "time" && this.state.matches.length === 0 &&
          <div className="container">
            <h1><FontAwesomeIcon icon="spinner" spin /></h1>
          </div>
        }
        {this.state.sort === "time" &&
          <div className="group-container" id='matchesSort' key='matchesSort'>
            <div className="group-header">
              <h3>Matches</h3>
            </div>
            <GroupContainer token={this.state.token} matches={this.state.matches} canEdit="true" />
          </div>
        }
      </div>
    )
  }
}

export default MatchesContainer
