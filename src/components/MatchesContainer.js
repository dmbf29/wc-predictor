import React, { Component } from 'react'
import axios from 'axios'
import GroupContainer from './GroupContainer'
import KnockoutContainer from './KnockoutContainer'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

class MatchesContainer extends Component {
  constructor() {
    super()
    this.state = {groups: [], sort: "groups", matches: [], knockout_groups: []}
    this.getGroups()
  }

  getGroups() {
    let token = "Bearer " + localStorage.getItem("jwt")
    axios.get(localStorage.url + '/api/v1/groups.json', { headers: { 'Authorization': token }})
    .then(response => {
      console.log(response)
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

  getKnockoutGroups() {
    let token = "Bearer " + localStorage.getItem("jwt")
    axios.get(localStorage.url + '/api/v1/knockouts', { headers: { 'Authorization': token }})
    .then(response => {
      console.log(response)
      this.setState({knockout_groups: response.data.knockouts})
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

  sortByKnockoutGroups() {
    this.setState({sort: "knockouts"})
    this.getKnockoutGroups()
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className="matches-container">
        <div className="nav-btns">
          <div className="stages-container">
            <div className={`groups-btn stage-btn ${this.state.sort === "groups" ? "stage-active" : ""}`} onClick={ this.sortByGroups.bind(this) }>Groups</div>
            <div className={`sortby-btn stage-btn ${this.state.sort === "time" ? "stage-active" : ""}`} onClick={ this.sortByTime.bind(this) }>List</div>
            <div className={`knockout-btn stage-btn ${this.state.sort === "knockouts" ? "stage-active" : ""}`} onClick={ this.sortByKnockoutGroups.bind(this) }>Knockout</div>
          </div>
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
        {this.state.sort === "time" &&
          <div className="group-container" id='matchesSort' key='matchesSort'>
            <div className="group-header">
              <h3>Matches</h3>
            </div>
            <GroupContainer token={this.state.token} matches={this.state.matches} canEdit="true" />
          </div>
        }
        { this.state.sort === "time" && this.state.matches.length === 0 &&
          <div className="container" style={{marginTop: "50px"}}>
            <h1><FontAwesomeIcon icon="spinner" spin /></h1>
          </div>
        }
        {this.state.sort === "knockouts" &&
          <div className="group-container" id='matchesSort' key='matchesSort'>
            <KnockoutContainer token={this.state.token} knockout_groups={this.state.knockout_groups} canEdit="false" />
          </div>
        }
      </div>
    )
  }
}

export default MatchesContainer
