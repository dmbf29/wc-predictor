import React, { Component } from 'react'
import axios from 'axios'
import './MatchesContainer.css';
import GroupContainer from './GroupContainer'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/fontawesome-free-solid'

class OtherMatchesContainer extends Component {
  constructor() {
    super()
    this.state = {otherGroups: [], currentUser: null, canEdit: "false"}
    let token = "Bearer " + localStorage.getItem("jwt")
    axios.get(localStorage.url + `/api/v1/user`, { headers: { 'Authorization': token }})
    .then(response => {
      this.setState({currentUser: response.data.user, token: token})
      this.setState({canEdit: this.state.currentUser.id == this.props.match.params.userId})
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
      <div className="matches-container">
        {this.state.groups === null &&
          <div className="container">
            <h1><FontAwesomeIcon icon={faClock} /></h1>
          </div>
        }
        {this.state.otherGroups.map(group => (
          <GroupContainer key={group.id} token={this.state.token} group={group} matches={group.matches} canEdit={ this.state.canEdit === true ? "true" : "false"} />
        ))}
      </div>
    )
  }
}

export default OtherMatchesContainer
