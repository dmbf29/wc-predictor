import React, { Component } from 'react'
import axios from 'axios'
import KnockoutContainer from './KnockoutContainer'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

class OtherMatchesContainer extends Component {
  constructor() {
    super()
    this.state = {knockout_groups: [], currentUser: {name: ""}, canEdit: "false"}
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
    axios.get(localStorage.url + `/api/v1/knockouts/` + userId, { headers: { 'Authorization': token }})
    .then(response => {
      this.setState({knockout_groups: response.data.knockouts, token: token})
      console.log(this.state)
    })
    .catch(error => {console.log(error)
      this.addErrors();
      delete localStorage.jwt;
    })
  }

  addErrors() {
    const matchesContainer = document.querySelector(".matches-container");
    matchesContainer.insertAdjacentHTML("beforebegin", "<div id='error-messages'><small style='padding-bottom:5px;'>There was an error loading matches.</small><br /><small style='padding-bottom:5px;'>Try signing in again.</small><br /><br /><button class='red-button btn'>Sign In</button></div>");
    matchesContainer.classList.add('display-none')
    const button = document.querySelector('.red-button');
    button.addEventListener("click", (event) => {
      const errorMessages = document.getElementById("error-messages");
      errorMessages.parentNode.removeChild(errorMessages)
      this.signOut();
    });
  }

  getKnockoutGroups() {
    let token = "Bearer " + localStorage.getItem("jwt")
    axios.get(localStorage.url + '/api/v1/knockouts', { headers: { 'Authorization': token }})
    .then(response => {
      console.log(response)
      this.setState({knockout_groups: response.data.knockouts, token: token})
    })
    .catch(error => {console.log(error)
      this.addErrors();
      delete localStorage.jwt;
    })
  }

  signOut() {
    delete localStorage.jwt
    this.props.history.push(`/`)
  }

  render() {
    return (
      <div>
        <div className="user-header">
          <h3>{this.state.userName}</h3>
        </div>
        <div className="matches-container">
          { this.state.knockout_groups && this.state.knockout_groups.length === 0 &&
            <div className="container" style={{marginTop: "50px"}}>
              <h1><FontAwesomeIcon icon="spinner" spin /></h1>
            </div>
          }
          {this.state.knockout_groups !== 0 &&
          <div className="group-container" id='matchesSort' key='matchesSort'>
            <KnockoutContainer
              token={this.state.token}
              getKnockoutGroups={this.getKnockoutGroups.bind(this)}
              knockout_groups={this.state.knockout_groups}
              canEdit={ this.state.canEdit === true ? "true" : "false"} />
          </div>
        }
        </div>
      </div>
    )
  }
}

export default OtherMatchesContainer
