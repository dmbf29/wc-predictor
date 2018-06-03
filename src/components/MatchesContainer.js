import React, { Component } from 'react'
import axios from 'axios'
import './MatchesContainer.css';
import GroupContainer from './GroupContainer'

class MatchesContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      groups: []
    }
    console.log(localStorage)
    if(localStorage.jwt === undefined) {
      this.props.history.push(`/sign_in`)
    }
  }

  componentDidMount() {
    const self = this;
    let token = "Bearer " + localStorage.getItem("jwt")
    axios.get('http://localhost:3001/api/v1/groups.json', { headers: { 'Authorization': token }})
    .then(response => {
      self.setState({token: token, groups: response.data.groups})
      console.log(self.state.groups)
    })
    .catch(error => console.log(error))
  }

  render() {
    return (
      <div className="matches-container">
        {this.state.groups.map((group) => {
          <p>{group.name}</p>
        })}
      </div>
    )
  }
}

export default MatchesContainer
