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

    function updatePurchases(purchesesJson) {
        
        const purchese = purchesesJson.map(purchese => <Col xs={6} sm={4} md={4} lg={3} className="p-2 colPurchases "    >  <PurchaseCard date={purchese.date} insuranceId ={purchese.productId} />  </Col>)
        setPurcheses([...purcheses, purchese]);

    }

    useEffect(() => {
        // const purchesesJson = [{ "date": "17/02/2021", "insuranceId": "insurence 2" }, { "date": "17/02/2021", "insuranceId": "insurence 1 " }]
        // updatePurchases(purchesesJson);  // until server start work

        axios.get('http://localhost:8080/purchases/search/' + props.client.id).then((response) => {
            debugger;
            const purchesesJson = response.data;
             updatePurchases(purchesesJson);

        }).catch(err => {
            debugger;
            // alert(err);
        })

    },[]);


    return (
        <>
            <Container fluid >
                <Row className="row overflow-auto">
                    {purcheses}
                </Row>
            </Container>

        </>



    );
}); 