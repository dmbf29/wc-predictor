import React, { Component } from 'react'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import KnockoutGroup from './KnockoutGroup'

class KnockoutContainer extends Component {

  render() {
    return (
      <div>
        { this.props.knockout_groups[0] === null &&
          <div className="container">
            <h1><FontAwesomeIcon icon="spinner" spin /></h1>
          </div>
        }
        { this.props.knockout_groups[0] !== undefined &&
            <div id="knockout-container">
              <div className="group-header">
                <h5 className="round-header">ROUND OF 16 | A-D</h5>
              </div>
              <div className="sixteen knockout-group">
                <KnockoutGroup token={this.props.token} matches={this.props.knockout_groups[0].matches} canEdit={this.props.canEdit} />
              </div>

              <div className="group-header">
                <h5 className="round-header">QUARTERFINALS | A-D</h5>
              </div>
              <div className="quarterfinals knockout-group">
                <KnockoutGroup token={this.props.token} matches={this.props.knockout_groups[2].matches} canEdit={this.props.canEdit} />
              </div>

              <div className="group-header">
                <h5 className="round-header">SEMIFINAL | FINAL | SEMIFINAL</h5>
              </div>
              <div className="final-three-container">

                <div className="semifinals knockout-group">
                  <KnockoutGroup token={this.props.token} matches={this.props.knockout_groups[4].matches} canEdit={this.props.canEdit} />
                </div>

                <div className="finals knockout-group">
                  <KnockoutGroup token={this.props.token} matches={this.props.knockout_groups[6].matches} canEdit={this.props.canEdit} />
                </div>

                <div className="semifinals knockout-group">
                  <KnockoutGroup token={this.props.token} matches={this.props.knockout_groups[5].matches} canEdit={this.props.canEdit} />
                </div>
              </div>

              <div className="group-header">
                <h5 className="round-header">QUARTERFINALS | E-H</h5>
              </div>
              <div className="quarterfinals knockout-group">
                <KnockoutGroup token={this.props.token} matches={this.props.knockout_groups[3].matches} canEdit={this.props.canEdit} />
              </div>

              <div className="group-header">
                <h5 className="round-header">ROUND OF 16 | E-H</h5>
              </div>
              <div className="sixteen knockout-group">
                <KnockoutGroup token={this.props.token} matches={this.props.knockout_groups[1].matches} canEdit={this.props.canEdit} />
              </div>
            </div>
        }
      </div>
    )
  }
}

export default KnockoutContainer
