import React, { useState, useEffect } from "react";
import { connect } from 'react-redux'
import { actions } from '../../redux/actions'
// @material-ui/core components  
import { Alert, ToggleButton, ButtonGroup, Button, Form, Card, Row, Col, Container } from 'react-bootstrap';
import { FcLike, FcHome, FcAutomotive } from "react-icons/fc";
import CalcCar from "./CalcCar"
import CalcApar from "./CalcApar"

function mapStateToProps(state) {
    // debugger;
    return {
        product: state.productReducer.product
    };
}

const mapDispatchToProps = (dispatch) => ({
    setInsuranceId: (insurance_Id) => dispatch(actions.setInsuranceId(insurance_Id)),
    setInsuranceName: (insurance_Name) => dispatch(actions.setInsuranceName(insurance_Name)),
    setInsuranceDescription: (Insurance_Description) => dispatch(actions.setInsuranceDescription(Insurance_Description)),
    setInsurancePrice: (insurance_Price) => dispatch(actions.setInsurancePrice(insurance_Price)),
    setInsurancePicture: (insurance_Picture) => dispatch(actions.setInsurancePicture(insurance_Picture))

})



export default connect(mapStateToProps, mapDispatchToProps)(function CalcPrice(props) {


    const [insurenceTypeValue, setInsurenceTypeValue] = useState(0);
    const [show, setShow] = useState(false);

    function select(value) {
        setInsurenceTypeValue(value)
    }
    useEffect(() => {
        if (insurenceTypeValue == 0)
            debugger
        else debugger

    }, [insurenceTypeValue]);

    return (
        <div>

            <Alert className="fixed-bottom" show={show} variant="light" style={{ width: '25rem' }}>

                <Container className="themed-container" fluid={true}>
                    <Row md={{ span: 6, offset: 6 }} >
                        {/* <Col md={{ span: 6, offset: 4 }}> */}
                        <Form>
                            {(insurenceTypeValue == 0) ?
                                <Form.Group as={Col}>

                                    <Form.Row>
                                        <Card
                                            className="text-center"
                                            style={{ width: '10rem' }}
                                            onClick={() => setInsurenceTypeValue(1)}>
                                            <Card.Body>
                                                <Card.Text> <FcHome style={{ fontSize: '50' }} />  </Card.Text>
                                                <Card.Title>Apartment and property insurance</Card.Title>
                                            </Card.Body>
                                        </Card>

                                        <Card
                                            className="text-center"
                                            style={{ width: '10rem' }}
                                            onClick={() => setInsurenceTypeValue(2)}>
                                            <Card.Body>
                                                <Card.Text> <FcLike style={{ fontSize: '50' }} />  </Card.Text>
                                                <Card.Title>Life and Health insurance</Card.Title>
                                            </Card.Body>
                                        </Card>
                                        <Card
                                            className="text-center"
                                            style={{ width: '10rem' }}
                                            onClick={() => setInsurenceTypeValue(2)}>
                                            <Card.Body>
                                                <Card.Text> <FcLike style={{ fontSize: '50' }} />  </Card.Text>
                                                <Card.Title>Life and Health insurance</Card.Title>
                                            </Card.Body>
                                        </Card>
                                        <Card
                                            className="text-center"
                                            style={{ width: '10rem' }}
                                            onClick={() => setInsurenceTypeValue(3)}>

                                            <Card.Body>
                                                <Card.Text> <FcAutomotive style={{ fontSize: '50' }} />  </Card.Text>
                                                <Card.Title>Car insurance</Card.Title>
                                            </Card.Body>
                                        </Card>
                                    </Form.Row>

                                </Form.Group> : ''}

                            {(insurenceTypeValue === 1) ?
                                <CalcApar /> : ''}

                            {(insurenceTypeValue === 2) ?
                                <CalcCar /> : ''}

                            {(insurenceTypeValue == 3) ?
                                <CalcCar /> : ''}

                        </Form>
                        {/* </Col> */}
                    </Row>
                </Container>
                <hr />
                <div className="d-flex justify-content-end">
                    <Button onClick={() => setShow(false)} variant="outline-success">Close</Button>
                </div>
            </Alert>

            {!show && <Button onClick={() => setShow(true)}>Open Calculetor</Button>}

        </div >



    );
});
