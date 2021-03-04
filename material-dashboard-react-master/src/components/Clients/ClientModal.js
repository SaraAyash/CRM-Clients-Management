import React, { useEffect, useState } from "react";
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
const getCurrentDate = () => {

    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    //Alert.alert(date + '-' + month + '-' + year);
    // You can turn it in to your desired format
    return date + '-' + month + '-' + year;//format: dd-mm-yyyy;
}

export default connect(mapStateToProps, mapDispatchToProps)(function ClientModal(props) {

    const [error, setError] = useState(false);
    const [show, setShow] = useState(false);
    const genders = [{ name: 'Male', value: 'Male' }, { name: 'Female', value: 'Female' }];
    const [client, setClient] = useState({ "first_name": "", "last_name": "", "client_id": "", "phone_number": "", "email": "", "year_of_birth": "", "gender": "", "startConnectedDate":new Date().getTime()});
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);




    /**
     * new_client.client_id = req.body.client_id
            new_client.first_name = req.body.first_name
            new_client.last_name = req.body.last_name
            new_client.phone_number = req.body.phone_number
            new_client.email = req.body.email
            new_client.gender = req.body.gender
            new_client.year_of_birth = req.body.year_of_birth
            new_client.start_connection_date = req.body.start_connection_date
     */
    function Submit() {

        if (Object.values(client).indexOf("") != -1) {
            setError(true);
        }
        else {
            props.handleFunction(client);
            setError(false);
            handleClose();
        }

    }

    useEffect(() => {
        if (props.addOrUpdate === "Update ") {
            setClient({ ...client, client_id: props.client.client_id })
        }
    }, [])


    return (
        <>
            <Button variant="success" color="primary" onClick={handleShow}>{props.addOrUpdate} Client</Button>{' '}

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
                        <Form.Group as={Row} controlId="first_name">
                            {error ? <Form.Label column sm="3" style={{ color: "red" }}>Please fill all fiels.</Form.Label> : ''}
                        </Form.Group>
                        <Form.Group as={Row} controlId="first_name">
                            <Form.Label column sm="3">First name:</Form.Label>
                            <Col sm="9">
                                <Form.Control onChange={(e) => { setClient({ ...client, first_name: e.target.value }) }} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="last_name">
                            <Form.Label column sm="3">Last name:</Form.Label>
                            <Col sm="9">
                                <Form.Control onChange={(e) => { setClient({ ...client, last_name: e.target.value }) }} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="client_id">
                            <Form.Label column sm="3">ID: </Form.Label>
                            <Col sm="9">
                                {(props.addOrUpdate === "Update ") ?
                                    <Form.Control readOnly value={props.client.client_id} type="number" />
                                    :
                                    <Form.Control type="number" onChange={(e) => { setClient({ ...client, client_id: e.target.value }) }} />
                                }

                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="phone_number">
                            <Form.Label column sm="4">Mobile phone:</Form.Label>
                            <Col sm="8">
                                <Form.Control type="number" onChange={(e) => { setClient({ ...client, phone_number: e.target.value }) }} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="Email">
                            <Form.Label column sm="4">Email address:</Form.Label>
                            <Col sm="8">
                                <Form.Control type="email" onChange={(e) => { setClient({ ...client, email: e.target.value }) }} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="year_of_birth">
                            <Form.Label column sm="2">year_of_birth:</Form.Label>
                            <Col sm="3">
                                <Form.Control type="number" onChange={(e) => { setClient({ ...client, year_of_birth: e.target.value }) }} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            {/* <Form.Check inline label="Male" />
                            <Form.Check inline label="Female"/> */}

                            <ButtonGroup toggle className="pl-5 ">
                                {genders.map((radio, idx) => (
                                    <ToggleButton
                                        key={idx}
                                        type="radio"
                                        variant="outline-info"
                                        name="radio"
                                        value={radio.value}
                                        checked={client.gender == radio.value}
                                        onChange={(e) => { setClient({ ...client, gender: e.target.value }) }}
                                    >
                                        {radio.name}
                                    </ToggleButton>
                                ))}
                            </ButtonGroup>

                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                    <Button variant="primary" onClick={Submit}>Submit</Button>
                </Modal.Footer>
            </Modal>

        </>



    );
}
);
