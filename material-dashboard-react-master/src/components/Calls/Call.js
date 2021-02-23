import React, { useState, moment } from "react";
import { connect } from 'react-redux'
import { actions } from '../../redux/actions'
import CallModal from "components/Calls/CallModal.js"

import { Card, ListGroup, Accordion } from 'react-bootstrap';
// import { Router, Route, Switch } from "react-router"
// import upsideEmit Button from "@material-ui/core/Button"


export default function Call(props) {
    const { CauseOfCall, date, description, selectedProducts } = props;
    const products = selectedProducts.map((prod) => { return prod.name + ", " });


    return (
        <>
            

            <Accordion style={{ width :"80%"}}>
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="0">
                        <Card.Header class="font-weight-bold " >
                            <div className="d-flex justify-content-between">
                                <div className="p-2 col-example text-left">  {CauseOfCall}</div>
                                <div className="p-2 col-example text-left">  {date}  </div>
                            </div>

                        </Card.Header></Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            <ListGroup.Item class="font-weight-bold ">Description Call: {description}</ListGroup.Item>
                            {/* <ListGroup.Item class="font-weight-bold ">{date}</ListGroup.Item> */}
                            {products.length > 0 ?
                                <ListGroup.Item class="font-weight-bold ">Purchased products:  {products} </ListGroup.Item>
                                : ''}


                        </Card.Body>
                    </Accordion.Collapse>
                </Card>

            </Accordion>
            <p></p>

        </>



    );
}  