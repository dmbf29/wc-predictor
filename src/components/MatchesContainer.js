import React, { Component } from 'react'
import axios from 'axios'
import './MatchesContainer.css';
import GroupContainer from './GroupContainer'

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
        {this.state.groups.map(group => (
          <GroupContainer key={group.id} token={this.state.token} group={group} matches={group.matches} />
        ))}
      </div>
    )
  }
}

export default MatchesContainer
