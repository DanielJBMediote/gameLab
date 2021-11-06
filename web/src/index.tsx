import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import '@src:Services/Axios';
import '@src:Styles/animations.scss';
import '@src:Styles/globals.scss';
import 'semantic-ui-css/semantic.min.css'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

