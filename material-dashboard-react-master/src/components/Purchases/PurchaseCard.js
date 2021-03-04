import React, { useState, useEffect } from "react";
import axios from "axios"
import { connect } from 'react-redux'
import { actions } from '../../redux/actions'
import { Card, ListGroup, Accordion } from 'react-bootstrap';
// import { Router, Route, Switch } from "react-router"
// import upsideEmit Button from "@material-ui/core/Button"

function mapStateToProps(state) {
    return {
        client: state.clientReducer.client
    };
}

const mapDispatchToProps = (dispatch) => ({

    setId: (client_id) => dispatch(actions.setId(client_id)),
    setFirstName: (client_name) => dispatch(actions.setFirstName(client_name)),
    setLastName: (client_last_name) => dispatch(actions.setLastName(client_last_name)),
    setEmail: (client_email) => dispatch(actions.setEmail(client_email)),
    setMobile: (client_mobile) => dispatch(actions.setMobile(client_mobile))

})
export default connect(mapStateToProps, mapDispatchToProps)(function PurchaseCard(props) {
    const [productDetails, setProductDetails] = useState();

    useEffect(() => {

        axios.get('http://localhost:8080/products/' + props.insuranceId).then((response) => {
            setProductDetails(response.data)
        }).catch(err => {


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
});