import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'

const timezones = ["Hawaii", "Alaska", "Pacific Time (US & Canada)", "Arizona", "Mountain Time (US & Canada)", "Central America", "Central Time (US & Canada)", "Eastern Time (US & Canada)", "Atlantic Time (Canada)", "Newfoundland", "Brasilia", "Buenos Aires", "Mid-Atlantic", "Casablanca", "Dublin", "Edinburgh", "Lisbon", "London", "UTC", "Amsterdam", "Berlin", "Bern", "Bratislava", "Brussels", "Budapest", "Copenhagen", "Ljubljana", "Madrid", "Paris", "Prague", "Rome", "Sarajevo", "Skopje", "Stockholm", "Vienna", "Warsaw", "West Central Africa", "Zagreb", "Zurich", "Athens", "Bucharest", "Cairo", "Harare", "Helsinki", "Jerusalem", "Kaliningrad", "Kyiv", "Pretoria", "Riga", "Sofia", "Tallinn", "Vilnius", "Baghdad", "Istanbul", "Kuwait", "Minsk", "Moscow", "Nairobi", "Riyadh", "St. Petersburg", "Volgograd", "Tehran", "Abu Dhabi", "Baku", "Muscat", "Samara", "Tbilisi", "Yerevan", "Kabul", "Ekaterinburg", "Islamabad", "Karachi", "Tashkent", "Chennai", "Kolkata", "Mumbai", "New Delhi", "Sri Jayawardenepura", "Kathmandu", "Almaty", "Astana", "Dhaka", "Urumqi", "Rangoon", "Bangkok", "Hanoi", "Jakarta", "Krasnoyarsk", "Novosibirsk", "Beijing", "Chongqing", "Hong Kong", "Irkutsk", "Kuala Lumpur", "Perth", "Singapore", "Taipei", "Ulaanbaatar", "Osaka", "Sapporo", "Seoul", "Tokyo", "Yakutsk", "Adelaide", "Darwin", "Brisbane", "Canberra", "Guam", "Hobart", "Melbourne", "Port Moresby", "Sydney", "Vladivostok", "Auckland", "Fiji", "Kamchatka", "Wellington"]

class Account extends Component {
  constructor() {
    super();
    this.state = { user: [], token: [] };
    let token = "Bearer " + localStorage.getItem("jwt")
    axios.get(localStorage.url + `/api/v1/user`, { headers: { 'Authorization': token }})
    .then(response => {
      console.log(response)
      this.setState({user: response.data, token: token})
    })
    .catch(error => console.log(error))
  }

  updateUser(event) {
    event.preventDefault();
    const name = document.getElementById("name").value
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    const password_confirmation = document.getElementById("password_confirmation").value
    const timezone = document.getElementById("timezone").value
    const notify = document.getElementById("notify").checked
    let token = "Bearer " + localStorage.getItem("jwt")
    axios.post(
        localStorage.url + `/api/v1/user`,
        { user:
          {
            name: name,
            email: email,
            password: password,
            password_confirmation: password_confirmation,
            timezone: timezone,
            notify: notify
          }
        }, { headers: { 'Authorization': token }}
      )
      .then(response => {
        console.log(response)
        this.props.history.push(`/`)
      })
      .catch(error => console.log(error))
  }

render() {
    return (
      <div className="App">
        <div className="form-container">
          <h3>EDIT ACCOUNT</h3>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" className="form-control" id="name" aria-describedby="emailHelp" value={this.state.user.name} />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" className="form-control" id="email" aria-describedby="emailHelp" value={this.state.user.email} />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" className="form-control" id="password" placeholder="Password" />
            </div>
            <div className="form-group">
              <label htmlFor="password_confirmation">Confirm Password</label>
              <input type="password" className="form-control" id="password_confirmation" placeholder="Confirm Password" />
            </div>
            <div className="form-group">
              <label htmlFor="timezone">Time Zone</label>
              <select className="form-control" id="timezone">
                { timezones.map((timezone, index) => (
                    <option key={timezone} selected={timezone === this.state.user.timezone ? 'selected' : ""}>{timezone}</option>
                ))}
              </select>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" checked={ this.state.user.notify === true ? "checked" : ""} id="notify" />
              <label className="form-check-label" htmlFor="notify">
                Notify me when next round starts
              </label>
            </div>
            <div className="form-buttons" >
              <button className="red-button btn"
                onClick={this.updateUser.bind(this)}
              >
                  Update
              </button>
              <Link to='/sign_in'>Sign In</Link>
            </div>
          </form>
        </div>
      </div>
    );
  }}

export default Account;
