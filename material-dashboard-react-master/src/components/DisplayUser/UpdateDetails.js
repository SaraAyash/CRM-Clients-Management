import React, { useState } from "react";
import { connect } from 'react-redux'
import { actions } from '../../redux/actions'

// @material-ui/core components 
import { BrowserRouter, Router, Switch, Route, Redirect, withRouter } from "react-router-dom";
import { Button, Form, Modal, Row, Col } from 'react-bootstrap';
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

export default connect(mapStateToProps, mapDispatchToProps)(function UpdateDetails(props) {
    
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    function UdpateDetailsInServer() {
        // setFirstName();
        // action to update details
        handleClose();
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

                        <Form.Group as={Row} controlId="Email">
                            <Form.Label column sm="4">Email address</Form.Label>
                            <Col sm="8">
                                <Form.Control type="email" />
                            </Col>
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
