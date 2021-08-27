import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter as Router } from 'react-router-dom';
import '@fontsource/roboto';

import App from './controllers/App';

ReactDOM.render(
  <CssBaseline>
    <Router>
      <App />
    </Router>
  </CssBaseline>,
  document.getElementById('root'),
);
