
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './app'

import "assets/css/material-dashboard-react.css?v=1.9.0";


const hist = createBrowserHistory();


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

