import React, { useState, useEffect } from "react";
import { connect } from 'react-redux'
import { actions } from '../../redux/actions'
// @material-ui/core components 
import { useParams, BrowserRouter, Router, Switch, Route, Redirect, withRouter } from "react-router-dom";
// import { Router, Route, Switch } from "react-router"
import { Button, Row, Col, Container } from 'react-bootstrap';
import CallDocs from "../Calls/CallDocs.js"
import ProductModal from "components/Products/ProductModal";
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
    const { name } = useParams();
    function updateProduct(productJson) 
    {
       axios.put('http://localhost:8080/products', productJson)
       .then(response => {

        props.setInsuranceName(productJson.insuranceName);
        props.setInsuranceDescription(productJson.insuranceDescription);
        props.setInsurancePrice(productJson.insurancePrice)  ;
        props.setInsurancePicture(productJson.insurancePicture);
       }


       ).catch(err => {
           alert(err);
       });




         }
    function printCard() {
        setPrintState(true);

        window.print();
        setPrintState(false);

    }
    useEffect(() => { }, [printState]);

    return (
        <div>
            <Container className="themed-container" fluid={true}>
                <Row>
                    <Col xs="12" md={{ size: 12, order: 2, offset: 0 }}>  <ProductModal handleFunction={updateProduct} addOrUpdate="update product" ></ProductModal></Col>
                    <Col xs="auto"> <Button onClick={() => printCard()}>print</Button></Col>
                </Row>
            </Container>


            <p></p>
            <hr></hr>
            <h3>Product Details:</h3>
            <h4>Insurance Name: {props.product.insuranceName}</h4>
            <h4>Insurance Description: {props.product.insuranceDescription}</h4>
            <h4>Insurance Price: {props.product.insurancePrice}</h4>
            <h4>Insurance Picture: {props.product.insurancePicture}</h4>
            <hr></hr>
            <h3> Call documentation:</h3>
            <CallDocs ></CallDocs>

            {/* <div class="row">
                <div class="col vh25 d-flex justify-content-around">
                    <div class="squra2 m-3">1</div>
                    <div class="squra1 m-2">2</div>
                </div>
            </div> */}

        </div>



    );
});
