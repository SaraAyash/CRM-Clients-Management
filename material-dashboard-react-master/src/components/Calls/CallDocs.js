import React, { useState, useEffect } from "react";
import { connect } from 'react-redux'
import { actions } from '../../redux/actions'
import CallModal from "./CallModal.js"
import Call from "./Call.js"
import axios from "axios"
// @material-ui/core components 
import { Button, Form, Modal, Dropdown, DropdownButton } from 'react-bootstrap';
// import { Router, Route, Switch } from "react-router"
// import upsideEmit Button from "@material-ui/core/Button"
function mapStateToProps(state) {
    return {
        client: state.clientReducer.client
    };
}

const mapDispatchToProps = (dispatch) => ({

    setFirstName: (company_name) => dispatch(actions.setFirstName(company_name))

})


export default connect(mapStateToProps, mapDispatchToProps)(function CallDocs(props) {

    // const [date, setDate] = useState("");
    const [calls, setCalls] = useState([]);

    useEffect(() => {
        getAllCalls();
        // listenURL();
    }, []);

     


    function updateCalls(callsJson) {
        const call = callsJson.map(call => <Call subject={call.subject} date={call.date} description={call.description} purchasedProducts={call.purchasedProducts} />)
        setCalls([call]);

    }


    const addCall = async (newCall) => {
        axios.post('http://localhost:8080/calls/add', newCall)
            .then(response => {
                debugger
                getAllCalls()
                
            }

            ).catch(err => {
                console.log("post, http://localhost:8080/calls");
                debugger
            });




    }
    const getAllCalls = async () => {
        axios.get('http://localhost:8080/calls/getList/' + props.client.id).then((response) => {
            debugger;
            const callsJson = response.data;
            updateCalls(callsJson);

        }).catch(err => {
            debugger
        })
    }

 
    return (
        <>

            {calls}
            <CallModal addCall={addCall} />

        </>



    );
}
);
