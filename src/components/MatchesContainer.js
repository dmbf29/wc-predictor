import React, { Component } from 'react'
import axios from 'axios'
import './MatchesContainer.css';
import GroupContainer from './GroupContainer'

class MatchesContainer extends Component {
  constructor() {
    super()
    this.state = {groups: []}
    // console.log(localStorage)
    // if(localStorage.jwt === undefined) {
    //   this.props.history.push(`/sign_in`)
    // }
    let token = "Bearer " + localStorage.getItem("jwt")
    axios.get('http://localhost:3001/api/v1/groups.json', { headers: { 'Authorization': token }})
    .then(response => {
      this.setState({groups: response.data.groups, token: token})
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
