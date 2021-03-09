import React, { useState, useEffect } from "react";
import axios from "axios"
import { connect } from 'react-redux'
import { actions } from '../../redux/actions'
import { Card } from 'react-bootstrap';
import { format } from "date-fns";

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
    const [productDetails, setProductDetails] = useState({
        description: '',
        name: 'sara',
        price: 70
    });
    const formattedDate = new Date(props.date);
    const date = format(formattedDate, "MMMM dd, yyyy ");
    const totalPrice = props.totalPrice;

    const getProductDetails = () => {

        axios.get('http://localhost:8080/products/getProduct/' + props.insuranceId).then((response) => {

            const productJson = response.data[0];
            setProductDetails({ ...productDetails, description: productJson.description, name: productJson.name, price: productJson.price })
            debugger
        }).catch(err => {
            debugger

        })
    }
    useEffect(getProductDetails, []);



    return (
        <>
            <Card border="danger" style={{ width: "100%" }}>
                <Card.Header>{date}</Card.Header>
                <Card.Body >
                    <Card.Title>{productDetails.name}</Card.Title>

                    <Card.Text > {totalPrice} ILS</Card.Text>
                       
                </Card.Body>
            </Card>

        </>



    );
});