import React, { useState, moment } from "react";
import { connect } from 'react-redux'
import { actions } from '../../redux/actions'
import CallModal from "components/Calls/CallModal.js"

import { Card, ListGroup } from 'react-bootstrap';
// import { Router, Route, Switch } from "react-router"
// import upsideEmit Button from "@material-ui/core/Button"


export default function Call(props) {
    const {CauseOfCall, date, description, selectedProducts } = props;
    const products =selectedProducts.map((prod) => { return prod.name +", "});
    debugger;

    return (
        <>
            <Card border="primary" style={{ width: '50rem' }}>
                <Card.Body>
                <Card.Header class="font-weight-bold " > {CauseOfCall}</Card.Header>
                   
                    <ListGroup.Item class="font-weight-bold ">{date}</ListGroup.Item>
                    {products.length>0?
                    <ListGroup.Item class="font-weight-bold ">Purchased products:  {products} </ListGroup.Item>
                    :''}
                    <ListGroup.Item class="font-weight-bold ">Description Call: {description}</ListGroup.Item>


                    {/* <h5> selectedProducts:</h5>
                    <h5>   {selectedProducts.map((prod) => { return prod.name })}</h5>
                    <h5> date is: {date}</h5>
                    <h5> description is: {description}</h5> */}
                    </Card.Body>
            </Card>
            <p></p>

        </>



    );
}  