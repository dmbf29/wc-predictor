import React, { Component } from 'react'
import './Navbar.css';
import avatar from './assets/avatar.png';
import icon from './assets/icon.png';
import { Link } from 'react-router-dom'

class Navbar extends Component {
  toggleDrop() {
    console.log("clicked dropdown")
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
  }

  render() {
    return (
      <div className="navbar-wagon">
        <img src={icon} className="navbar-wagon-brand" alt="banner" />

        <div className="subnav-wagon">
          <Link to='/' className="subnav-wagon-item subnav-wagon-link subnav-spacing subnav-border-right">Picks</Link>
          <Link to='/leagues' className="subnav-wagon-item subnav-wagon-link subnav-spacing subnav-border-right">Leagues</Link>
          <Link to='/' className="subnav-wagon-item subnav-wagon-link subnav-spacing">Groups</Link>
        </div>

        <div className="navbar-wagon-right hidden-xs">
          <div className="dropdown">
            <img onClick={this.toggleDrop} src={avatar} className="avatar dropdown-toggle" alt="avatar" id="navbar-wagon-menu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" />
            <ul className="dropdown-menu dropdown-menu-right navbar-wagon-dropdown-menu">
              <li><Link onClick={this.toggleDrop} to='/league_join' className="dropdown-item">Join League</Link></li>
              <li><Link onClick={this.toggleDrop} to='/league_create' className="dropdown-item">Create League</Link></li>
              <li><Link onClick={this.toggleDrop} to='/' onClick={this.signOut} className="dropdown-item">Sign Out</Link></li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Navbar
