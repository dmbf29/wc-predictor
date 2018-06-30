import React, { Component } from 'react'

class Leaderboard extends Component {

  render() {
    return (
      <div>
        <div className="league-container display-none" key='leaderboard-table'>
          <div className="league-header">
            <h3>Top 10 Leaderboard</h3>
          </div>
          <table className="table table-hover">
            <thead className="user-sub">
              <tr>
                <th scope="col">#</th>
                <th scope="col">NAME</th>
                <th scope="col">CHAMP</th>
                <th scope="col">K/O</th>
                <th scope="col">TOTAL</th>
              </tr>
            </thead>
            <tbody>
              { this.props.leaders &&
                this.props.leaders.map(leader => (
                  <tr key={`leader-${leader.id}`} onClick={() => { this.props.visitPredictions(leader) }}>
                    <td>{leader.position}</td>
                    <td>{leader.name}</td>
                    <td>{leader.champion}</td>
                    <td>{leader.score_sixteen}</td>
                    <td>{leader.score}</td>
                  </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default Leaderboard
