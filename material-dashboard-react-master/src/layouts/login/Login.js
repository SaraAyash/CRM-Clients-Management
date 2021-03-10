import React, { useState, useEffect } from "react";
import { connect } from 'react-redux'
import { actions } from '../../redux/actions'
import { withRouter } from "react-router-dom";
import { FcLock, FcAddressBook, FcNeutralDecision, FcBusinessman, FcCheckmark, FcGraduationCap, FcPhone, FcCompactCamera, FcAssistant, FcAddImage } from "react-icons/fc";
import { Container, InputGroup, FormControl, Form, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios'

function mapStateToProps(state) {
  // debugger;
  return {
    client: state.clientReducer.client,
    employee: state.employeeReducer.employee
  };
}

const mapDispatchToProps = (dispatch) => ({
  setIdEmployee: (employee_id) => dispatch(actions.setIdEmployee(employee_id)),
  setFirstNameEmployee: (client_name) => dispatch(actions.setFirstNameEmployee(client_name)),
  setLastNameEmployee: (client_last_name) => dispatch(actions.setLastNameEmployee(client_last_name)),

})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(function Login(props) {

  const [newEmployee, setNewEmployee] = useState({
    employee_id: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    image: '',
    about: '',
    phone_number: ''
  });
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [loginState, setLoginState] = useState(true);
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
      .then(response => {
        axios.get('http://localhost:8080/employees/getEmployeeByEmail/' + username).then((response) => {


          props.setIdEmployee(response.data[0].employee_id);
          props.setFirstNameEmployee(response.data[0].first_name);
          props.history.push("/admin");
          debugger
        }).catch(err => {

        });


      }).catch(err => {

      });
  };
  //handling the press on the submut button.
  const handleSubmit = e => {
    e.preventDefault();
    loginUser({
      username,
      password
    });
  }
  const putUser = (e) => {
    setUserName(e.target.value);
    setNewEmployee({ ...newEmployee, email: e.target.value });
  }
  const putPassword = (e) => {
    setPassword(e.target.value);
    setNewEmployee({ ...newEmployee, password: e.target.value });
  }
  const handleNewEmployee = e => {
    // setUserName(newEmployee.email);
    // setPassword(newEmployee.password);

    e.preventDefault();
    axios.post("http://localhost:8080/employees/add", newEmployee).then((response) => {
      debugger
      loginUser({
        username,
        password
      });
    }).catch(err => {
      debugger
    });

  }
  useEffect(() => { props.setIdEmployee("") }, []);
  useEffect(() => { }, [username, password, newEmployee]);
  const style = {
    backgroundImage: "url(https://i.pinimg.com/564x/ae/74/7c/ae747c669ede5a97c191aea61eb675df.jpg)",
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

            <Row md="4" className="justify-content-md-center lg">
              <Col>

              </Col>
              <Col md="4" className="text-center align-items-center" style={{ height: '100%', backgroundColor: 'rgba(238, 238, 238, 0.5) ' }}>
                <FcCheckmark FaAlignCenter style={{ width: 200, height: 200 }} />
                {loginState === true ?
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
                      <FormControl type="password" size="lg" placeholder="Password" onChange={e => putPassword} />
                    </InputGroup>

                    <Form.Label style={{ color: "green", size: '25px' }} onClick={() => setLoginState(false)}>New Employee? confirm here</Form.Label>
                    <Form.Group className="mt-5 mb-5"> <Button type="submit" className="login__submit">Sign in</Button></Form.Group>


                  </Form>
                  :
                  <Form onSubmit={handleNewEmployee} >

                    <InputGroup className="mb-2" >
                      {/* {error ? <Form.Label style={{ color: "red" }}>Please fill all fiels.</Form.Label> : ''} */}

                      <InputGroup.Prepend>
                        <InputGroup.Text><FcAssistant /></InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl size="lg" defaultValue='' placeholder="First Name" onChange={e => setNewEmployee({ ...newEmployee, first_name: e.target.value })} />
                    </InputGroup>

                    <InputGroup className="mb-2" >
                      <InputGroup.Prepend>
                        <InputGroup.Text><FcAssistant /></InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl size="lg" defaultValue='' placeholder="Last Name" onChange={e => setNewEmployee({ ...newEmployee, last_name: e.target.value })} />
                    </InputGroup>

                    <InputGroup className="mb-2">
                      <InputGroup.Prepend>
                        <InputGroup.Text><FcNeutralDecision /></InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl type="number" size="lg" placeholder="ID:" onChange={e => setNewEmployee({ ...newEmployee, employee_id: e.target.value })} />
                    </InputGroup>

                    <InputGroup className="mb-2" >
                      <InputGroup.Prepend>
                        <InputGroup.Text><FcAddressBook /></InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl size="lg" placeholder="Email address" onChange={e => { putUser(e) }} />
                    </InputGroup>

                    <InputGroup className="mb-2" >
                      <InputGroup.Prepend>
                        <InputGroup.Text><FcLock /></InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl size="lg" placeholder="Password" onChange={e => { putPassword(e) }} />
                    </InputGroup>

                    <InputGroup className="mb-2">
                      <InputGroup.Prepend>
                        <InputGroup.Text><FcPhone /></InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl type="number" size="lg" placeholder="Phone number" onChange={e => setNewEmployee({ ...newEmployee, phone_number: e.target.value })} />
                    </InputGroup>



                    <InputGroup className="mb-2">
                      <InputGroup.Prepend>
                        <InputGroup.Text><FcGraduationCap /></InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl size="lg" placeholder="About you" onChange={e => setNewEmployee({ ...newEmployee, about: e.target.value })} />
                    </InputGroup>


                    <InputGroup className="mb-2">
                      <InputGroup.Prepend>
                        <InputGroup.Text><FcCompactCamera /></InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl size="lg" placeholder="Insert URL for image profile" onChange={e => setNewEmployee({ ...newEmployee, image: e.target.value })} />
                    </InputGroup>
                    <Form.Group className="mt-5 mb-5" > <Button variant="danger" type="submit" className="login__submit">Confirm</Button></Form.Group>
                    <InputGroup className="mb-5 mt-5">
                    </InputGroup>
                  </Form>

                }
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


})

);


