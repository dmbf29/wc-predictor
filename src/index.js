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
    <Favicon src="https://raw.githubusercontent.com/dmbf29/wc-predictor/master/public/favicon.ico" />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </div>
), document.getElementById('root'));

registerServiceWorker();
