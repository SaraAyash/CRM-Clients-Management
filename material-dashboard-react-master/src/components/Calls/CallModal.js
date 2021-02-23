import React, { useState } from "react";
import { connect } from 'react-redux'
import { actions } from '../../redux/actions'
import { Multiselect } from 'multiselect-react-dropdown';
// @material-ui/core components 
import { Button, Form, Modal, Dropdown, DropdownButton } from 'react-bootstrap';
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

const getCurrentDate = () => {

    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();


    return date + '-' + month + '-' + year;
}
export default connect(mapStateToProps, mapDispatchToProps)(function CallModal(props) {


    const [products, setProducts] = useState([{ name: 'Insurance 1', id: 1 }, { name: 'Insurance 2', id: 2 }, { name: 'Insurance 3', id: 3 }]);
    const [selectedProducts, setSelectedProducts] = useState([]);

    const [show, setShow] = useState(false);
    const [dropdownTitle, setDropdownTitle] = useState("Select cause of call");
    const [error, setError] = useState(false);

    const [call, setCall] = useState({ "clientId": props.client.id, "date": new Date().getDate(), "CauseOfCall": "Select cause of call", "description": "", "selectedProducts": selectedProducts });



    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    function SubmitCall() {
        debugger;
        if (Object.values(call).indexOf("") != -1 || call.CauseOfCall === "Select cause of call") {
            setError(true);
        }
        else {
            if(selectedProducts!=[]){}
            props.addCall(call);
            handleClose();
        }

    }
    function onSelectProduct(selectedList, selectedItem) {

        setSelectedProducts([...selectedProducts, { name: selectedItem.name, id: selectedItem.id }])
        debugger;
    }

    function onRemove(selectedList, removedItem) {
        // selectedProducts.indexOf()
        setSelectedProducts([selectedProducts.filter(prod => prod = { name: removedItem.name, id: removedItem.id })])
        debugger;
    }


    return (
        <>
            <Button variant="warning" color="primary" onClick={handleShow}>Add Call</Button>{' '}
            <p></p>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >

                <Modal.Body>
                    <Form.Group controlId="date">
                        {error ? <Form.Label style={{ color: "red" }}>Please fill all fiels.</Form.Label> : ''}
                        <DropdownButton
                            alignRight
                            title={call.CauseOfCall}
                            id="dropdown-menu-align-right"
                            onSelect={(eventKey) =>setCall({ ...call, CauseOfCall: eventKey }) }
                        >
                            <Dropdown.Item eventKey="complaint">complaint</Dropdown.Item>
                            <Dropdown.Item eventKey="Product purchase">Product purchase</Dropdown.Item>
                            <Dropdown.Item eventKey="option-3">option 3</Dropdown.Item>

                        </DropdownButton>



                    </Form.Group>
                    <Form.Group controlId="date">
                        <Form.Label>Select Date</Form.Label>
                        <Form.Control type="date" onChange={(event) => setCall({ ...call, date: event.target.value })} />

                    </Form.Group>

                    <Form.Group controlId="CallDescription">
                        <Form.Label>Call Description:</Form.Label>
                        <Form.Control as="textarea" rows={6} onChange={(event) => setCall({ ...call, description: event.target.value })} />

                    </Form.Group>

                    {dropdownTitle === "Product purchase" ?
                        <Multiselect
                            options={products} // Options to display in the dropdown
                            onSelect={onSelectProduct} // Function will trigger on select event
                            onRemove={onRemove} // Function will trigger on remove event
                            displayValue="name" // Property name to display in the dropdown options
                        />
                        : ''}




                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                    <Button variant="primary" onClick={SubmitCall}>Add call documentition</Button>
                </Modal.Footer>
            </Modal>

            {/* <h1> date from call state is : {callDate.date} sare</h1> */}
        </>



    );
}
);
