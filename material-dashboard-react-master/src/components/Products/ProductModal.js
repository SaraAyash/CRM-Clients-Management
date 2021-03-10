import React, { useEffect, useState } from "react";

// @material-ui/core components 
import { Button, Form, Modal, Row, Col } from 'react-bootstrap';

// import { Router, Route, Switch } from "react-router"
// import Button from "@material-ui/core/Button"


export default function ProductModal(props) {

    const [show, setShow] = useState(false);
    const [product, setProduct] = useState({ name: "", description: "", price: 0, date: new Date().getTime(), image: '' });
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [error, setError] = useState(false);

    function UdpateDetails() {
        // setFirstName();
        if (product.name === "" || product.description === "" || product.price === 0 || product.image === "")
            setError(true);
        else {
            debugger
            props.handleFunction(product);
            setProduct({ ...product, name: "", description: "", price: 0, image: "" })
            // action to update details
            handleClose();
        }
    }
    useEffect(() => { }, [product])
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
                    {error ? <Form.Label style={{ color: "red" }}>Please fill all fiels.</Form.Label> : ''}

                    <Form>
                        <Form.Group as={Row} controlId="NameInsurance">
                            <Form.Label column sm="3">Name of Insurance:</Form.Label>
                            <Col sm="9">
                                <Form.Control onChange={(e) => { setProduct({ ...product, name: e.target.value }) }} />

                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="description">
                            <Form.Label column sm="3">Description of insurance:</Form.Label>
                            <Col sm="9">
                                <Form.Control maxLength="250" placeholder="enter until 250 characters" onChange={(e) => { setProduct({ ...product, description: e.target.value }) }} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="price">
                            <Form.Label column sm="4">Price of insurance:</Form.Label>
                            <Col sm="8">
                                <Form.Control type="number" onChange={(e) => { setProduct({ ...product, price: e.target.value }) }} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="picture">
                            <Form.Label column sm="5">Picture of insurance:</Form.Label>
                            <Col sm="8">
                                <Form.Control onChange={(e) => { setProduct({ ...product, image: e.target.value }) }} />
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
