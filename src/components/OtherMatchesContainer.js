import React, { Component } from 'react'
import axios from 'axios'
import GroupContainer from './GroupContainer'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

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
    .catch(error => {console.log(error)
      this.addErrors();
    })
  }

  componentDidMount() {
    const userId = this.props.match.params.userId
    let token = "Bearer " + localStorage.getItem("jwt")
    axios.get(localStorage.url + `/api/v1/matches/` + userId, { headers: { 'Authorization': token }})
    .then(response => {
      this.setState({otherGroups: response.data.matches})
      console.log(this.state)
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

  render() {
    return (
      <div>
        <div className="user-header">
          <h3>{this.state.userName}</h3>
        </div>
        <div className="matches-container">
          {this.state.otherGroups.length === 0 &&
            <div className="container" style={{marginTop: "50px"}}>
              <h1><FontAwesomeIcon icon="spinner" spin /></h1>
            </div>
          }
          {this.state.otherGroups.map(group => (
            <div className="group-container" id={group.name} key={group.id}>
              <div className="group-header">
                <h3>{group.name}</h3>
              </div>
              <GroupContainer key={group.id} token={this.state.token} group={group} matches={group.matches} canEdit={ this.state.canEdit === true ? "true" : "false"} />
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default OtherMatchesContainer
