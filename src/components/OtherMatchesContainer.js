import React, { Component } from 'react'
import axios from 'axios'
import './MatchesContainer.css';
import GroupContainer from './GroupContainer'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/fontawesome-free-solid'

class OtherMatchesContainer extends Component {
  constructor() {
    super()
    this.state = {otherGroups: [], currentUser: {name: ""}, canEdit: "false"}
    let token = "Bearer " + localStorage.getItem("jwt")
    axios.get(localStorage.url + `/api/v1/user`, { headers: { 'Authorization': token }})
    .then(response => {
      this.setState({currentUser: response.data.user, token: token})
      this.setState({canEdit: this.state.currentUser.id === parseInt(this.props.match.params.userId, 10), userName: this.props.match.params.userName})
    })
    .catch(error => console.log(error))
  }

  componentDidMount() {
    const userId = this.props.match.params.userId
    let token = "Bearer " + localStorage.getItem("jwt")
    axios.get(localStorage.url + `/api/v1/matches/` + userId, { headers: { 'Authorization': token }})
    .then(response => {
      this.setState({otherGroups: response.data.matches})
      console.log(this.state)
    })
    .catch(error => console.log(error))
  }

  render() {
    return (
      <div>
        <div className="user-header">
          <h3>{this.state.userName}</h3>
        </div>
        <div className="matches-container">
          {this.state.groups === null &&
            <div className="container">
              <h1><FontAwesomeIcon icon={faClock} /></h1>
            </div>
          }
          {this.state.otherGroups.map(group => (
            <div className="group-container" id={group.name} key={group.id}>
              <div className="group-header">
                <h3>{group.name}</h3>
              </div>
              <GroupContainer key={group.id} token={this.state.token} group={group} matches={group.matches} canEdit="true" />
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default OtherMatchesContainer
