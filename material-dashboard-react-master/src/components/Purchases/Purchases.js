import React, { useState, useEffect } from "react";
import { connect } from 'react-redux'
import { actions } from '../../redux/actions'
import PurchaseCard from "./PurchaseCard.js"
import axios from "axios"
import { Container, Row, Col } from 'react-bootstrap';
import "./Purchase.css"



function mapStateToProps(state) {
    return {
        client: state.clientReducer.client
    };
}

const mapDispatchToProps = (dispatch) => ({

    setFirstName: (company_name) => dispatch(actions.setFirstName(company_name))

})
export default connect(mapStateToProps, mapDispatchToProps)(function Purchases(props) {
    const [purcheses, setPurcheses] = useState([]);

    const getAllPurchases = () => {

        axios.get('http://localhost:8080/purchases/getList/' + props.client.id).then((response) => {
          
            const purchesesJson = response.data;
            const purchese = purchesesJson.map(purchese => <Col xs={6} sm={4} md={4} lg={3} className="p-2 colPurchases "    >  <PurchaseCard date={purchese.date} insuranceId={purchese.productId} totalPrice={purchese.totalPrice} />  </Col>)
            setPurcheses(purchese);

        }).catch(err => {


        })


    }

     
    useEffect(() => {
        getAllPurchases(); 

    }, [purcheses]);

    return (
        <>
            <Container fluid >
                <Row className="row overflow-auto">
                    {purcheses}
                </Row>
                <Row>
                    {purcheses === 0 ? 'No purcheses to show' : ''}
                </Row>

            </Container>

        </>



    );
});