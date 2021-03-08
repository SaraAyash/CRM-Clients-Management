import React from 'react';
import {Router, Route, Switch, Redirect } from 'react-router-dom';
import Admin from './layouts/Admin';
import Login from './layouts/login/Login';
import { Provider } from 'react-redux'
import store from "redux/Store.js"
import { createBrowserHistory } from "history";


const hist = createBrowserHistory();

function App() {
    return (
      <Provider store ={store}>
        <Router history={hist}>
          <Switch>
            <Route path="/admin" component={Admin} />
            {/* <Route path="/login" component={Login} /> */}
            <Route path="/login" component={Login}/>
            <Redirect from="/" to="/login" />
          </Switch>
        </Router>
      </Provider>
    );
  }
  
  export default App;