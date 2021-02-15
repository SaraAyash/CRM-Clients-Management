import React, { useState, useEffect } from "react";
import { connect } from 'react-redux'
import { actions } from '../../redux/actions'
// @material-ui/core components 
import { useParams, BrowserRouter, Router, Switch, Route, Redirect, withRouter } from "react-router-dom";
import UpdateDetails from "components/DisplayUser/UpdateDetails.js"
import PrintClient from "components/DisplayUser/PrintClient.js"
// import { Router, Route, Switch } from "react-router"
import { Button, Row, Col, Container } from 'react-bootstrap';
import CallDocs from "../Calls/CallDocs.js"
function mapStateToProps(state) {
    return {
        client: state.clientReducer.client
    };
}

const mapDispatchToProps = (dispatch) => ({

    setFirstName: (company_name) => dispatch(actions.setFirstName(company_name))

})
export default connect(mapStateToProps, mapDispatchToProps)(function UserDetails(props) {

    const [printState, setPrintState] = useState(false);
    const { name } = useParams();

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
                    <Col xs="12" md={{ size: 12, order: 2, offset: 0 }}> <UpdateDetails /></Col>
                    <Col xs="auto"> <Button onClick={() => printCard()}>Print Client Card</Button></Col>
                </Row>
            </Container>


            <p></p>
            <hr></hr>
            <h3>Client Details:</h3>
            <h4>ID: {props.client.id}</h4>
            <h4>First Name: {props.client.firstName}</h4>
            <h4>Last Name: {props.client.lastName}</h4>
            <h4>Email: {props.client.email}</h4>
            <h4>Mobile: {props.client.mobile}</h4>
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
