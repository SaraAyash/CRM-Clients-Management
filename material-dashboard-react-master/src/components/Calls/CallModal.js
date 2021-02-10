import React, { useState } from "react";
import { connect } from 'react-redux'
import { actions } from '../../redux/actions'

// @material-ui/core components 
import { Button, Form, Modal,   Dropdown, DropdownButton } from 'react-bootstrap';
// import { Router, Route, Switch } from "react-router"
// import upsideEmit Button from "@material-ui/core/Button"
function mapStateToProps(state) {
    return {
        client: state.clientReducer.client
    };
}

const mapDispatchToProps = (dispatch) => ({

    setFirstName: (company_name) => dispatch(actions.setFirstName(company_name))

})

export default connect(mapStateToProps, mapDispatchToProps)(function CallModal(props) {
  
    const [show, setShow] = useState(false);
    const [dropdownTitle, setDropdownTitle] = useState("Select cause of call");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    function UdpateDetailsInServer() {
        // setFirstName();
        // action to update call details
        handleClose();
    }
   
     
    return (
        <>
            {/* <Button variant="warning" color="primary" onClick={handleShow}>Add Call</Button>{' '} */}
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >

                <Modal.Body>
                    <Form.Group controlId="date">
                        <Form.Label>Select Date</Form.Label>
                        <DropdownButton
                            alignRight
                            title={dropdownTitle}
                            id="dropdown-menu-align-right"
                            onSelect={(eventKey)=> setDropdownTitle(eventKey)}
                        >
                            <Dropdown.Item eventKey="option-1">option-1</Dropdown.Item>
                            <Dropdown.Item eventKey="option-2">option-2</Dropdown.Item>
                            <Dropdown.Item eventKey="option-3">option 3</Dropdown.Item>
                             
                        </DropdownButton>


                       
                    </Form.Group>
                    <Form.Group controlId="date">
                        <Form.Label>Select Date</Form.Label>
                        <Form.Control type="date" name="dob" />
                    </Form.Group>
                    <Form.Group controlId="CallDescription">
                        <Form.Label>Call Description:</Form.Label>
                        <Form.Control as="textarea" rows={6} />
                    </Form.Group>


                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                    <Button variant="primary" onClick={UdpateDetailsInServer}>Add call documentition</Button>
                </Modal.Footer>
            </Modal>
        
        
        </>



    );
}
);
