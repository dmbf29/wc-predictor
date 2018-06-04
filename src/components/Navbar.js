import React, { Component } from 'react'
import './Navbar.css';
import avatar from './assets/avatar.png';
import icon from './assets/icon.png';
import { Link } from 'react-router-dom'

class Navbar extends Component {
  toggleDrop() {
    const dropdown = document.querySelector(".dropdown-menu")
    if(dropdown.style.display === 'block') {
      dropdown.style.display = 'none'
    } else {
      dropdown.style.display = 'block'
    }
  }

  signOut() {
    delete localStorage.jwt
    this.props.history.push(`/`)
    this.toggleDrop();
  }

  render() {
    return (
      <div className="navbar-wagon">
        <img src={icon} className="navbar-wagon-brand" alt="banner" />
        <div className="navbar-wagon-right">
        <div className="subnav-wagon">
          { localStorage.jwt === undefined &&
            <div>
              <Link to='/sign_in' className="subnav-wagon-item subnav-wagon-link subnav-spacing subnav-border-right">SIGN IN</Link>
              <Link to='/sign_up' className="subnav-wagon-item subnav-wagon-link subnav-spacing subnav-border-right">SIGN UP</Link>
            </div>
          }
          { localStorage.jwt !== undefined &&
            <div>
              <Link to='/' className="subnav-wagon-item subnav-wagon-link subnav-spacing subnav-border-right">PREDICTIONS</Link>
              <Link to='/leagues' className="subnav-wagon-item subnav-wagon-link subnav-spacing subnav-border-right">LEAGUES</Link>
            </div>
          }
        </div>

        <div className="hidden-xs">
          <div className="dropdown">
            <img onClick={this.toggleDrop} src={avatar} className="avatar dropdown-toggle" alt="avatar" id="navbar-wagon-menu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" />
            <ul className="dropdown-menu dropdown-menu-right navbar-wagon-dropdown-menu">
              { localStorage.jwt === undefined &&
                <div>
                  <li><Link to='/sign_in' onClick={this.toggleDrop} className="dropdown-item">Sign In</Link></li>
                  <li><Link to='/sign_up' onClick={this.toggleDrop} className="dropdown-item">Sign Up</Link></li>
                </div>
              }
              { localStorage.jwt !== undefined &&
                <div>
                  <li><Link onClick={this.toggleDrop} to='/account' className="dropdown-item">Account</Link></li>
                  <li><Link onClick={this.toggleDrop} to='/league_join' className="dropdown-item">Join League</Link></li>
                  <li><Link onClick={this.toggleDrop} to='/league_create' className="dropdown-item">Create League</Link></li>
                  <li><Link to='/' onClick={this.signOut} className="dropdown-item">Sign Out</Link></li>
                </div>
              }
            </ul>
          </div>
        </div>
        </div>
      </div>
    )
  }
}

export default Navbar
