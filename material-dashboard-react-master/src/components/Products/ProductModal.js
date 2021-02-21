import React, { useState } from "react";
import { connect } from 'react-redux'
import { actions } from '../../redux/actions'
import _uniqueId from 'lodash/uniqueId';

// @material-ui/core components 
import { BrowserRouter, Router, Switch, Route, Redirect, withRouter } from "react-router-dom";
import { Button, Form, Modal, Row, Col } from 'react-bootstrap';

// import { Router, Route, Switch } from "react-router"
// import Button from "@material-ui/core/Button"


export default function ProductModal(props) {
    
    const [show, setShow] = useState(false);
    const [product, setProduct] = useState({ "insuranceId": "","insuranceName": "", "insuranceDescription": "", "insurancePrice": "","insurancePicture": "" });
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [error, setError] = useState(false);
   
    function UdpateDetails() {
        // setFirstName();
        if(product.insuranceName==""||product.insuranceDescription==""||product.insurancePrice==""||product.insurancePicture=="")
        setError(true);
        else{
        
        props.handleFunction(product);
        setProduct({ ...product, insuranceName: "",insuranceDescription: "",insurancePrice: "" ,insurancePicture: "" } ) 
        // action to update details
        handleClose();
    }
    }
    return (
        <>
            {/* <label >hello {props.client.firstName}</label> */}
            <Button variant="success" color="primary" onClick={handleShow}>{props.addOrUpdate}</Button>{' '}

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
                            <Form.Control   onChange={(e) => { setProduct({ ...product, insuranceName: e.target.value }) }} />
                            
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="InsuranceDescription">
                            <Form.Label column sm="3">Description of insurance:</Form.Label>
                            <Col sm="9">
                            <Form.Control maxLength="250" placeholder="enter until 250 characters" onChange={(e) => { setProduct({ ...product, insuranceDescription: e.target.value }) }} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="InsurancePrice">
                            <Form.Label column sm="4">Price of insurance:</Form.Label>
                            <Col sm="8">
                                <Form.Control type="email"  onChange={(e) => { setProduct({ ...product, insurancePrice: e.target.value }) }}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="InsurancePicture">
                            <Form.Label column sm="5">Picture of insurance:</Form.Label>
                            <Col sm="8">
                                <Form.Control  onChange={(e) => { setProduct({ ...product, insurancePicture: e.target.value }) }} />
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
