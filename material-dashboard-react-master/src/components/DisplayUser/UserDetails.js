import React, { useState, useEffect } from "react";
import { connect } from 'react-redux'
import { actions } from '../../redux/actions'
// @material-ui/core components 
import { useParams, BrowserRouter, Router, Switch, Route, Redirect, withRouter } from "react-router-dom";
import PrintClient from "components/DisplayUser/PrintClient.js"
import ClientModal from "components/Clients/ClientModal.js"
import axios from "axios"

// import { Router, Route, Switch } from "react-router"
import { Button, Row, Col, Container } from 'react-bootstrap';
import CallDocs from "../Calls/CallDocs.js"
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
export default connect(mapStateToProps, mapDispatchToProps)(function UserDetails(props) {

    const [printState, setPrintState] = useState(false);
    const { name } = useParams();
 

    function updateClientDetails(clientJson) {

        axios.put('http://localhost:8080/updateClient', clientJson)
            .then(response => {
                props.setId(clientJson.id);
                props.setFirstName(clientJson.firstName);
                props.setLastName(clientJson.lastName);
                props.setEmail(clientJson.email);
                props.setMobile(clientJson.mobile);
            }


            ).catch(err => {
                alert(err);
            });


    }
    useEffect(() => {
         if (printState) {
            window.print();
            setPrintState(false);
        } 
    }, [printState]);



    return (
        <div>

            {!printState ?
                <div class="d-flex justify-content-start">
                    <div className="text-left"><ClientModal handleFunction={updateClientDetails} addOrUpdate="Update " /></div>
                    <div className="pl-2 text-rigth"> <Button onClick={() => setPrintState(true)}>Print Client Card</Button> </div>
                </div> :
                ''
            }

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
            <CallDocs />
 

        </div>



    );
});
