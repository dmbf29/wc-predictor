import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faTrophy, faFutbol, faUsers } from '@fortawesome/fontawesome-free-solid'

const BannerCards = () => (
  <div className="home-steps">
    <div className="home-step">
      <div className="home-step-image">
        <FontAwesomeIcon icon={faFutbol} />
      </div>
      <div className="home-step-title">
        <h5>Predict a Match</h5>
      </div>
      <div className="home-step-content">
        <p>Choose the right results for all of the World Cup games.</p>
      </div>
    </div>
    <div className="home-step">
      <div className="home-step-image">
        <FontAwesomeIcon icon={faUsers} />
      </div>
      <div className="home-step-title">
        <h5>Create/Join a League</h5>
      </div>
      <div className="home-step-content">
        <p>Join in with your friends and compete for the highest score.</p>
      </div>
    </div>
    <div className="home-step">
      <div className="home-step-image">
        <FontAwesomeIcon icon={faTrophy} />
      </div>
      <div className="home-step-title">
        <h5>Come Out on Top</h5>
      </div>
      <div className="home-step-content">
        <p>Compete against all of the users in the overall leaderboard.</p>
      </div>
    </div>
  </div>
);

export default BannerCards;
