import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Login.css';


//sending a post request to the server with the username and password inserted by the user.
async function loginUser(credentials) {
  console.log(JSON.stringify(credentials));

  return fetch('http://localhost:8080/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
 };

 
 
export default function Login( { setToken } ) {
  
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const history = useHistory();  

  //handling the press on the submut button.
  const handleSubmit = async (e, history) => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password
    });
    setToken(token);
    history.push('/admin/dashboard');
  }
  
  return (
  <div class="cont">
    <div class="demo">
      <div class="login">
        <div class="login__check"></div>
          <form class="login__form" onSubmit={e => handleSubmit(e, history)}>
            <div class="login__row">
              <svg class="login__icon name svg-icon" viewBox="0 0 20 20">
                <path d="M0,20 a10,8 0 0,1 20,0z M10,0 a4,4 0 0,1 0,8 a4,4 0 0,1 0,-8" />
              </svg>
              <input type="text" class="login__input name" placeholder="username" onChange={e => setUserName(e.target.value)} required/>
            </div>
            <div class="login__row">
              <svg class="login__icon pass svg-icon" viewBox="0 0 20 20">
                <path d="M0,20 20,20 20,8 0,8z M10,13 10,16z M4,8 a6,8 0 0,1 12,0" />
              </svg>
              <input type="password" class="login__input pass" placeholder="password" onChange={e => setPassword(e.target.value)} required/>
            </div>
            <button type="submit" class="login__submit">Sign in</button>
            <p class="login__signup">Don't have an account? &nbsp;<a>Sign up</a></p>
          </form>
      </div>
    </div>
  </div>
  );
};

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}