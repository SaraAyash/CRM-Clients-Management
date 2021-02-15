import React, { useState } from "react";
import { connect } from 'react-redux'
import { actions } from '../../redux/actions'

// @material-ui/core components 
import { BrowserRouter, Router, Switch, Route, Redirect, withRouter } from "react-router-dom";
import { Button, Form, Modal, Row, Col } from 'react-bootstrap';
// import { Router, Route, Switch } from "react-router"
// import Button from "@material-ui/core/Button"


export default function AddProduct({addProduct}) {
    
    const [show, setShow] = useState(false);
    const [insuranceName, setInsuranceName] = useState("");
    const [insuranceDescription, setInsuranceDescription] = useState("");
    const [insurancePrice, setInsurancePrice] = useState("");
    const [insurancePicture, setInsurancePicture] = useState("");
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [error, setError] = useState(false);

    function UdpateDetails() {
        // setFirstName();
        if(insuranceName==""||insuranceDescription==""||insurancePrice==""||insurancePicture=="")
        setError(true);
        else{
        addProduct(insuranceName,insuranceDescription,insurancePrice,insurancePicture);
        setInsuranceName("");
        setInsuranceDescription("");
        setInsurancePrice("");
        setInsurancePicture("");
        // action to update details
        handleClose();
    }
    }
    return (
        <>
            {/* <label >hello {props.client.firstName}</label> */}
            <Button variant="success" color="primary" onClick={handleShow}>Add product</Button>{' '}

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
                {error ? <Form.Label style={{color: "red"}}>Please fill all fiels.</Form.Label> : ''}

                    <Form>
                        <Form.Group as={Row} controlId="NameInsurance">
                            <Form.Label column sm="3">Name of Insurance:</Form.Label>
                            <Col sm="9">
                            <Form.Control   onChange={e =>setInsuranceName(e.target.value)} />
                            
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="InsuranceDescription">
                            <Form.Label column sm="3">Description of insurance:</Form.Label>
                            <Col sm="9">
                            <Form.Control maxLength="400" placeholder="enter until 400 characters" onChange={e =>setInsuranceDescription(e.target.value)} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="InsurancePrice">
                            <Form.Label column sm="4">Price of insurance:</Form.Label>
                            <Col sm="8">
                                <Form.Control type="email"  onChange={e =>setInsurancePrice(e.target.value)}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="InsurancePicture">
                            <Form.Label column sm="5">Picture of insurance:</Form.Label>
                            <Col sm="8">
                                <Form.Control  onChange={e =>setInsurancePicture(e.target.value)} />
                            </Col>
                        </Form.Group>


                    </Form>
                   
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                    <Button variant="primary" onClick={UdpateDetails}>Submit</Button>
                </Modal.Footer>
            </Modal>
        </>



    );
}
;
