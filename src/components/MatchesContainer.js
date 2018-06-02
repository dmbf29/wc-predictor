import React, { Component } from 'react'
import axios from 'axios'
import './MatchesContainer.css';
import GroupContainer from './GroupContainer'

class MatchesContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      matches: [],
      groups: []
    }
    console.log(this.state)
    console.log(localStorage)
    if(localStorage.jwt === undefined) {
      this.props.history.push(`/sign_in`)
    }
  }

  componentDidMount() {
    let token = "Bearer " + localStorage.getItem("jwt")
    axios.get('http://localhost:3001/api/v1/groups.json', { headers: { 'Authorization': token }})
    .then(response => {
      console.log(response.data)
      this.setState({token: token, groups: response.data.groups})
      console.log(this.state)
    })
    .catch(error => console.log(error))
  }

  render() {
    return (
      <div className="matches-container">
        {this.state.groups.map((group) => {
        })}
      </div>
    )
  }
}

export default MatchesContainer
