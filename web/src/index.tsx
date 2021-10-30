import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import './services/axios';

import './styles/globals.scss';
import 'semantic-ui-css/semantic.min.css';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

