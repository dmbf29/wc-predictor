import React, { Component } from 'react'

class MatchPredictions extends Component {

  render() {
    return (
      <tbody>
        {this.props.predictions(prediction => (
          <tr key={predicition.id}>
            <td>{index + 1}</td>
            <td>{user.name}</td>
            <td>{user.picks} / 48</td>
          </tr>
        ))}
      </tbody>
    )
  }
}

export default MatchPredictions
