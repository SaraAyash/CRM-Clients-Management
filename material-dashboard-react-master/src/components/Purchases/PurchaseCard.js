import React, { useState, useEffect } from "react";
import axios from "axios"

import { Card, ListGroup, Accordion } from 'react-bootstrap';
// import { Router, Route, Switch } from "react-router"
// import upsideEmit Button from "@material-ui/core/Button"


export default function PurchaseCard(props) {
    const [productDetails, setProductDetails] = useState([]);



    useEffect(() => {
        axios.get('http://localhost:8080/products/' + props.insuranceId).then((response) => {
            setProductDetails(response.data)
        }).catch(err => {
            console.log(err);
        })
    }, []);

    return (
        <>
            <Card border="danger" style={{ width: "100%" }}>
                <Card.Header>{props.date}</Card.Header>
                <Card.Body>
                    <Card.Title>{props.insuranceId}</Card.Title>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the bulk
                        of the card's content. </Card.Text>
                </Card.Body>
            </Card>

        </>



    );
}