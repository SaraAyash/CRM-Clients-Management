import React, { useState } from "react";
import { connect } from 'react-redux'
import { actions } from '../../redux/actions'

// @material-ui/core components 
import { BrowserRouter, Router, Switch, Route, Redirect, withRouter } from "react-router-dom";
import { ToggleButton, ButtonGroup, Button, Form, Modal, Row, Col } from 'react-bootstrap';
// import { Router, Route, Switch } from "react-router"
// import Button from "@material-ui/core/Button"
function mapStateToProps(state) {
    return {
        client: state.clientReducer.client
    };
}

const mapDispatchToProps = (dispatch) => ({

    setFirstName: (company_name) => dispatch(actions.setFirstName(company_name))

})

export default connect(mapStateToProps, mapDispatchToProps)(function AddClient(props) {

    const [show, setShow] = useState(false);
    const [genders, setGenders] = useState({ name: 'Male' }, { name: 'Female' });
    const [gender, setGender] = useState();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    function UdpateDetailsInServer() {
        // update server
        console.log({ gender });
        debugger;
        handleClose();
    }
    function updateGenderMale(e) {
        setGender("Male");
        debugger;
    }
    function updateGenderFeale(e) {
        setGender("Female");
        debugger;
    }
    return (
        <>
            {/* <label >hello {props.client.firstName}</label> */}
            <Button variant="success" color="primary" onClick={handleShow}>Update details</Button>{' '}

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Fill details:</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group as={Row} controlId="FirstName">
                            <Form.Label column sm="3">First name</Form.Label>
                            <Col sm="9">
                                <Form.Control />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="LastName">
                            <Form.Label column sm="3">Last name</Form.Label>
                            <Col sm="9">
                                <Form.Control />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="LastName">
                            <Form.Label column sm="3">Mobile phone</Form.Label>
                            <Col sm="9">
                                <Form.Control type="number" />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="Email">
                            <Form.Label column sm="4">Email address</Form.Label>
                            <Col sm="8">
                                <Form.Control type="email" />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                           

                            <Button class="btn btn-primary" variant="primary" onClick={(e) => updateGenderMale(e)}>Male</Button>
                            <Button variant="secondary" onClick={(e) => updateGenderFeale(e)}>Female</Button>
                            {/* <Col sm={10}>
                                    <Form.Check
                                        type="radio"
                                        label="Male"
                                        name="Male"
                                        id="formHorizontalRadios1"
                                        onChange={(e)=>updateGender(e )}
                                        
                                    />
                                    <Form.Check
                                        type="radio"
                                        label="Femal"
                                        name="Feale"
                                        id="formHorizontalRadios2"
                                        onChange={(e)=>updateGender(e)}
                                    />
                                    
                                </Col> */}
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                    <Button variant="primary" onClick={UdpateDetailsInServer}>Submit</Button>
                </Modal.Footer>
            </Modal>
        </>



    );
}
);
