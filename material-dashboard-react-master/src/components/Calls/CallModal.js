import React, { useState, useEffect } from "react";
import { connect } from 'react-redux'
import { actions } from '../../redux/actions'
 // @material-ui/core components 
import { Button, Form, Modal, Dropdown, DropdownButton, Toast } from 'react-bootstrap';
import axios from "axios";
import CalcPrice from '../Calculator/CalcPrice.js'
import { FormGroup } from "@material-ui/core";
// import { Router, Route, Switch } from "react-router"
// import upsideEmit Button from "@material-ui/core/Button"
function mapStateToProps(state) {
    return {
        client: state.clientReducer.client,
        employee: state.employeeReducer.employee

    };
}

const mapDispatchToProps = (dispatch) => ({

    setFirstName: (company_name) => dispatch(actions.setFirstName(company_name))

})


export default connect(mapStateToProps, mapDispatchToProps)(function CallModal(props) {

    const [showA, setShowA] = useState(false);

    const toggleShowA = () => setShowA(!showA);

    const [products, setProducts] = useState();

    const [show, setShow] = useState(false);
    const [error, setError] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [call, setCall] = useState({ clientId: props.client.id, date: '', subject: "Select cause of call", description: "", purchasedProducts: [] });
    const [showCalc, setShowCalc] = useState(false);
    const [price, setPrice] = useState(0);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
        axios.get('http://localhost:8080/products/getList').then((response) => {
            const productJson = response.data;
            var arr = [];
            Object.values(productJson).map(product => arr.push({ 'name': product.name, 'id': product._id }))
            setProducts(arr);
            // products;
            debugger


        }).catch(err => {


        })
        setError(false);
    }
    const handleCalcPrice = () => {
        debugger
        setShowCalc(!showCalc);
    }

    useEffect(() => {
        setCall({ ...call, purchasedProducts: selectedProducts })
    }, [selectedProducts, price]);

    useEffect(() => {

    }, [handleCalcPrice]);

    function SubmitCall() {
        debugger;
        if (Object.values(call).indexOf("") !== -1 || call.subject === "Select cause of call") {
            setError(true);
        }
        else {
            if (call.purchasedProducts !== []) {
                debugger
                var arr = [];
                Object.values(call.purchasedProducts).map(purchase => arr.push({ productId: purchase.id, clientId: props.client.id, date: call.date, totalPrice: purchase.totalPrice, employeeId: props.employee.employee_id }))
                arr.forEach((purchase) => {
                    addNewPurches(purchase);
                })
            }
            props.addCall(call);
            handleClose();
        }
        setCall({ ...call, subject: "Select cause of call" });
        setPrice(0);

    }
    function addNewPurches(newPurchase) {
        debugger
        axios.post('http://localhost:8080/purchases/add', newPurchase)
            .then(response => {
              
                 
            }

            ).catch(err => {
                
            });


    }

    function onSelectProduct(product) {
        if (price === 0) {
            setShowA(true);
        }
        else {
            setSelectedProducts([...selectedProducts, { name: product.name, id: product.id, totalPrice: price }])
            setPrice(0);
            debugger
        }


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
                    <Toast show={showA} onClose={toggleShowA}>
                        <Toast.Header>

                            <strong className="mr-auto">Insurece not purchesed</strong>
                        </Toast.Header>
                        <Toast.Body>Please insert total price</Toast.Body>
                    </Toast>
                    <Form.Group controlId="date">
                        {error ? <Form.Label style={{ color: "red" }}>Please fill all fiels.</Form.Label> : ''}
                        <DropdownButton
                            alignRight
                            title={call.subject}
                            id="dropdown-menu-align-right"
                            onSelect={(eventKey) => setCall({ ...call, subject: eventKey })}
                        >
                            <Dropdown.Item eventKey="complaint">complaint</Dropdown.Item>
                            <Dropdown.Item eventKey="Product purchase">Product purchase</Dropdown.Item>
                            <Dropdown.Item eventKey="Post-purchase questions">Post-purchase questions</Dropdown.Item>
                            <Dropdown.Item eventKey="Clarification of a transaction">Clarification of a transaction</Dropdown.Item>
                            <Dropdown.Item eventKey="information">information</Dropdown.Item>
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

                    {call.subject === "Product purchase" ?

                        products.map((prod) =>
                            <Form.Group>
                                <Form.Row>
                                    <Form.Label >{prod.name}</Form.Label>
                                    <Form.Control type="number" onChange={(event) => { setPrice(event.target.value) }} />
                                    <Button variant="secondary" onClick={() => onSelectProduct(prod)}>Insert Price</Button>
                                </Form.Row>
                            </Form.Group>

                        )


                        // < Multiselect
                        //     options={products} // Options to display in the dropdown
                        //     onSelect={onSelectProduct} // Function will trigger on select event
                        //     onRemove={onRemove} // Function will trigger on remove event
                        //     displayValue="name" // Property name to display in the dropdown options
                        // >


                        // </Multiselect>
                        : ''}

                    {call.subject === "Product purchase" ?
                        <FormGroup className="text-center">
                            <CalcPrice />
                        </FormGroup>
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
