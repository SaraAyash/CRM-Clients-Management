import React, { useState, useEffect } from "react";
import { connect } from 'react-redux'
import { actions } from '../../redux/actions'
// @material-ui/core components 
import { Button, Row, Col, Container, Card } from 'react-bootstrap';
import ProductModal from "components/Products/ProductModal";
import CalcPrice from "../Calculator/CalcPrice"
import axios from "axios"
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



export default connect(mapStateToProps, mapDispatchToProps)(function ProductDetails(props) {

    const [printState, setPrintState] = useState(false);

    function updateProduct(productJson) {

        axios.put('http://localhost:8080/products/update/' + props.product.insuranceId, productJson)
            .then(response => {
                debugger
                props.setInsuranceName(productJson.insuranceName);
                props.setInsuranceDescription(productJson.insuranceDescription);
                props.setInsurancePrice(productJson.insurancePrice);
                props.setInsurancePicture(productJson.insurancePicture);
            }


            ).catch(err => {
                debugger
            });




    }
    function printCard() {
        setPrintState(true);


    }
    useEffect(() => {
        if (printState) {
            window.print();
            setPrintState(false);
        }
    }, [printState]);

    return (
        <div
        >

            {!printState ?
                <div class="d-flex justify-content-start">
                    <div className="text-left"> <ProductModal handleFunction={updateProduct} addOrUpdate="update product" ></ProductModal></div>
                    <div className="pl-2 text-rigth"> <Button onClick={() => printCard()}>Print Client Card</Button> </div>
                </div> :
                ''
            }

            <Container className="themed-container" fluid={true}>
                <Row>
                    {!printState ?
                        <Col className="align-self-end" ><CalcPrice /></Col> : ''}
                    <Col>
                        <Card className="shadow-lg text-center" style={{ "width": '30rem', "height": '40rem' }}>
                            <Card.Img variant="top" src={props.product.insurancePicture} style={{ position: 'relative', left: '10rem', top: '1rem', width: '30%', height: '10vh' }} />
                            <Card.Body>
                                <Card.Title ><h3><strong>{props.product.insuranceName}</strong></h3> </Card.Title>

                                <Card.Text>  {props.product.insuranceDescription}</Card.Text>
                            </Card.Body>
                            <Card.Title > Price: starting from {props.product.insurancePrice} ILS per month </Card.Title>

                            <Card.Footer />
                        </Card>
                    </Col>
                </Row>
            </Container>

        </div >



    );
});
