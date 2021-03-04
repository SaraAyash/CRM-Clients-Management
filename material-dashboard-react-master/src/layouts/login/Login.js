import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { actions } from '../../redux/actions'
import { withRouter } from "react-router-dom";
import { FcLock, FcBusinessman, FcCheckmark } from "react-icons/fc";
import { FormGroup, Button, Container, InputGroup, FormControl, Form, Modal, Row, Col } from 'react-bootstrap';
import './Login.css';
import { FaAlignCenter } from "react-icons/fa";
const style = {
  backgroundImage: "url( https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/slider-2.jpg)",
  'font-size': "62.5%"
}

function mapStateToProps(state) {
  // debugger;
  return {
    client: state.clientReducer.client,
    employee: state.employeeReducer.employee
  };
}

const mapDispatchToProps = (dispatch) => ({

  setFirstName: (employee_name) => dispatch(actions.setFirstName(employee_name)),
  setLastName: (employee_last_name) => dispatch(actions.setLastName(employee_last_name)),
  setEmail: (employee_email) => dispatch(actions.setEmail(employee_email)),
  setPhone: (employee_phone) => dispatch(actions.setPhone(employee_phone))

})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(function Login(props) {


  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  //sending a post request to the server with the username and password inserted by the user.
  async function loginUser(credentials) {
    debugger
    console.log(JSON.stringify(credentials));
    return fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(response => {
        console.log(response);
        // props.setFirstName(response.data.first_name);
        // props.setLastName(response.data.last_name);
        // props.setEmail(response.data.email);
        // props.setPhone(response.data.phone);
        debugger
        props.setFirstName("response.data.first_name");
        props.setLastName("response.data.last_name");
        props.setEmail("response.data.email");
        props.setPhone("response.data.phone");
        props.history.push("/admin");

      }).catch(err => {
        debugger

      });
  };
  //handling the press on the submut button.
  const handleSubmit = e => {
    debugger
    e.preventDefault();
    const token = loginUser({
      username,
      password
    });
    debugger
    //setToken(token);
  }


  useEffect(() => { }, [username, password]);
  const style = {
    backgroundImage: "url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/slider-2.jpg)",
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    overflow: 'auto',
    backgroundRepeat: 'no-repeat'
  }
  return (
    <>
      <div id="root">


        <div style={style} className="vh-100 align-items-center" >
          <Container className="vh-100 align-items-center"   >
            <Row></Row>
            <Row md="4" className="justify-content-md-center ">
              <Col md="4" className="text-center align-items-center" style={{ height: '100%', backgroundColor: 'rgba(238, 238, 238, 0.5) ' }}>
                <FcCheckmark FaAlignCenter style={{ width: 200, height: 200 }} />
                <Form onSubmit={handleSubmit} >

                  <InputGroup className="mt-5 mb-2" >
                    <InputGroup.Prepend>
                      <InputGroup.Text><FcBusinessman /></InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl size="lg" placeholder="Username" onChange={e => setUserName(e.target.value)} />

                  </InputGroup>

                  <InputGroup className="mb-2">
                    <InputGroup.Prepend>
                      <InputGroup.Text><FcLock /></InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl type="password" size="lg" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                  </InputGroup>


                  <Form.Group className="mt-5 mb-5"> <button type="submit" className="login__submit">Sign in</button></Form.Group>




                </Form>

              </Col>
            </Row>
          </Container>

        </div>

      </div>



      {/* <div className="cont"   >
        <div className="demo" >
          <div className="login"  >
            <div className="login__check"></div>

            <Form className="login__form" onSubmit={handleSubmit}>
              <div className="login__row">
                <svg className="login__icon name svg-icon" viewBox="0 0 20 20">
                  <path d="M0,20 a10,8 0 0,1 20,0z M10,0 a4,4 0 0,1 0,8 a4,4 0 0,1 0,-8" />
                </svg>
                <input type="text" className="login__input name" onChange={e => setUserName(e.target.value)} />
              </div>
              <div className="login__row">
                <svg className="login__icon pass svg-icon" viewBox="0 0 20 20">
                  <path d="M0,20 20,20 20,8 0,8z M10,13 10,16z M4,8 a6,8 0 0,1 12,0" />
                </svg>
                <input type="password" className="login__input pass" onChange={e => setPassword(e.target.value)} />
              </div>
              <button type="submit" className="login__submit">Sign in</button>
              <p className="login__signup">Don't have an account? &nbsp;<a>Sign up</a></p>
            </Form>

          </div>
        </div>
      </div>
    */}
    </>
  );

  Login.propTypes = {
    setToken: PropTypes.func.isRequired
  }
})

);


