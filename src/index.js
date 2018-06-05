import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css'
import App from './components/App';
import { BrowserRouter } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';
import Favicon from 'react-favicon';

ReactDOM.render((
  <div>
    <Favicon url="http://res.cloudinary.com/dmbf29/image/upload/v1528177294/favicon_ciov6y.png" />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </div>
), document.getElementById('root'));

registerServiceWorker();
