
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import { Provider } from 'react-redux'
import store from "redux/Store.js"

// core components
import Admin from "layouts/Admin.js";
//import RTL from "layouts/RTL.js";

import Login from "layouts/login/Login.js";

import "assets/css/material-dashboard-react.css?v=1.9.0";


const hist = createBrowserHistory();

ReactDOM.render(
  <Provider store ={store}>
    <Router history={hist}>
      <Switch>
        <Route path="/login" component={Login}/>
        <Route path="/admin" component={Admin} />
        <Redirect from="/" to="/admin/dashboard" />
      </Switch>
    </Router>
  </Provider>
  ,
  document.getElementById("root")
);
