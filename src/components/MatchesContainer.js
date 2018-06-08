import React, { Component } from 'react'
import axios from 'axios'
import './MatchesContainer.css';
import GroupContainer from './GroupContainer'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/fontawesome-free-solid'

class MatchesContainer extends Component {
  constructor() {
    super()
    this.state = {groups: []}
    let token = "Bearer " + localStorage.getItem("jwt")
    axios.get(localStorage.url + '/api/v1/groups.json', { headers: { 'Authorization': token }})
    .then(response => {
      this.setState({groups: response.data.groups, token: token})
      console.log(this.state)
    })
    .catch(error => console.log(error))
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className="matches-container">
        {this.state.groups === null &&
          <div className="container">
            <h1><FontAwesomeIcon icon={faClock} /></h1>
          </div>
        }
        {this.state.groups.map(group => (
          <GroupContainer key={group.id} token={this.state.token} group={group} matches={group.matches} canEdit="true" />
        ))}
      </div>
    )
  }
}

export default MatchesContainer
