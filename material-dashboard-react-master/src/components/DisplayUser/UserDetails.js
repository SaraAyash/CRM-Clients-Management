import React, { useState, useTheme } from "react";
import { connect } from 'react-redux'
import { actions } from '../../redux/actions'
// @material-ui/core components 
import { useParams, BrowserRouter, Router, Switch, Route, Redirect, withRouter } from "react-router-dom";
import UpdateDetails from "components/DisplayUser/UpdateDetails.js"
// import { Router, Route, Switch } from "react-router"
import { Button, Card } from 'react-bootstrap';
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


    const { name } = useParams();



    return (
        <div>
            <UpdateDetails />
            <Button variant="primary">Print client card</Button>{' '}
            <p></p>
            <hr></hr>
            <h3>Client Details:</h3>
            <h4>First Name: {props.client.firstName}</h4>
            <h4>Last Name: {props.client.lastName}</h4>
            <h4>Email: {props.client.email}</h4>
            <h4>Mobile: {props.client.mobile}</h4>
            <hr></hr>
            <h3> Call documentation:</h3>
            <CallDocs></CallDocs>

            {/* <div class="row">
                <div class="col vh25 d-flex justify-content-around">
                    <div class="squra2 m-3">1</div>
                    <div class="squra1 m-2">2</div>
                </div>
            </div> */}

        </div>



    );
});
