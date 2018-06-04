import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'

const timezones = ["Hawaii", "Alaska", "Pacific Time (US & Canada)", "Arizona", "Mountain Time (US & Canada)", "Central America", "Central Time (US & Canada)", "Eastern Time (US & Canada)", "Atlantic Time (Canada)", "Newfoundland", "Brasilia", "Buenos Aires", "Mid-Atlantic", "Casablanca", "Dublin", "Edinburgh", "Lisbon", "London", "UTC", "Amsterdam", "Berlin", "Bern", "Bratislava", "Brussels", "Budapest", "Copenhagen", "Ljubljana", "Madrid", "Paris", "Prague", "Rome", "Sarajevo", "Skopje", "Stockholm", "Vienna", "Warsaw", "West Central Africa", "Zagreb", "Zurich", "Athens", "Bucharest", "Cairo", "Harare", "Helsinki", "Jerusalem", "Kaliningrad", "Kyiv", "Pretoria", "Riga", "Sofia", "Tallinn", "Vilnius", "Baghdad", "Istanbul", "Kuwait", "Minsk", "Moscow", "Nairobi", "Riyadh", "St. Petersburg", "Volgograd", "Tehran", "Abu Dhabi", "Baku", "Muscat", "Samara", "Tbilisi", "Yerevan", "Kabul", "Ekaterinburg", "Islamabad", "Karachi", "Tashkent", "Chennai", "Kolkata", "Mumbai", "New Delhi", "Sri Jayawardenepura", "Kathmandu", "Almaty", "Astana", "Dhaka", "Urumqi", "Rangoon", "Bangkok", "Hanoi", "Jakarta", "Krasnoyarsk", "Novosibirsk", "Beijing", "Chongqing", "Hong Kong", "Irkutsk", "Kuala Lumpur", "Perth", "Singapore", "Taipei", "Ulaanbaatar", "Osaka", "Sapporo", "Seoul", "Tokyo", "Yakutsk", "Adelaide", "Darwin", "Brisbane", "Canberra", "Guam", "Hobart", "Melbourne", "Port Moresby", "Sydney", "Vladivostok", "Auckland", "Fiji", "Kamchatka", "Wellington"]

class SignUp extends Component {

  signUp(event) {
    event.preventDefault();
    const name = document.getElementById("name").value
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    const password_confirmation = document.getElementById("password_confirmation").value
    const timezone = document.getElementById("timezone").value
    const notify = document.getElementById("notify").checked
    axios.post(
        localStorage.url + '/api/v1/users',
        { user:
          {
            name: name,
            email: email,
            password: password,
            password_confirmation: password_confirmation,
            timezone: timezone,
            notify: notify
          }
        }
      )
      .then(response => {
        console.log(response.data)
        axios.post(
          localStorage.url + '/api/v1/user_token',
          { auth:
            {
              email: email,
              password: password
            }
          }
        )
        .then(response => {
          localStorage.setItem("jwt", response.data.jwt)
          this.props.history.push(`/`)
        })
        .catch(error => console.log(error))
      })
      .catch(error => console.log(error))
  }

  render() {
    return (
      <div className="App">
        <div className="form-container">
          <h3>SIGN UP</h3>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" className="form-control" id="name" aria-describedby="emailHelp" placeholder="Enter name" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" className="form-control" id="password" placeholder="Password" />
            </div>
            <div className="form-group">
              <label htmlFor="password_confirmation">Confirm Password</label>
              <input type="password" className="form-control" id="password_confirmation" placeholder="Confirm Password" />
            </div>
            <div class="form-group">
              <label htmlFor="timezone">Time Zone</label>
              <select className="form-control" id="timezone">
                { timezones.map((timezone, index) => (
                    <option selected={timezone === "Central Time (US & Canada)" ? 'selected' : ""}>{timezone}</option>
                ))}
              </select>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="" id="notify" />
              <label className="form-check-label" htmlFor="notify">
                Notify me when next round starts
              </label>
            </div>
            <div className="form-buttons" >
              <button className="red-button btn"
                onClick={this.signUp.bind(this)}
              >
                  Sign Up
              </button>
              <Link to='/sign_in'>Sign In</Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default SignUp;
