import React from 'react';
import {Router, Route, Switch, Redirect, useHistory } from 'react-router-dom';
import Admin from './layouts/Admin';
import Login from './layouts/login/Login';
import { Provider } from 'react-redux'
import store from "redux/Store.js"
import { createBrowserHistory } from "history";
import { useState } from 'react';


const hist = createBrowserHistory();

  function setToken(userToken) {
    sessionStorage.setItem('token', JSON.stringify(userToken));
  }
  
  function getToken() {
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken?.token
  }


function App() {

    const history = useHistory();
    
    // const token = useState(getToken());
    const token = getToken();
    
    // if(!token) {
    //   return <Login setToken={setToken} />
    // }
    // else console.log(token);
  
    return (
      <Provider store ={store}>
        <Router history={hist}>
          <Switch>
            <Route path="/admin" component={Admin} />
            {/* <Route path="/login" component={Login} /> */}
            <Route path="/login" component={Login}/>
            {/* <Redirect from="/" to="/login" /> */}
          </Switch>
        </Router>
      </Provider>
    );
  }
  
  export default App;