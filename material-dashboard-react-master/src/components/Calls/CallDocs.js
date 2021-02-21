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

    // function listenURL() {
    //     props.history.listen((location, action) => {
    //         if (location.pathname === "/admin/table") {
    //             getAllClientFromServer();
    //         }
    //     })
    // }

    function updateCalls(callsJson) {
        const call = callsJson.map(call => <Call CauseOfCall={call.CauseOfCall} date={call.date} description={call.description} selectedProducts={call.selectedProducts} />)
        setCalls([...calls, call]);

    }


    const addNewCall = async (newCall) => {
        axios.post('http://localhost:8080/calls', newCall)
            .then(response =>
                getAllCalls()

            ).catch(err => {
                alert(err);
            });




    }
    const getAllCalls = async () => {
        const callsJson = [{ "date": "17/02/2021", "CauseOfCall": "Complain", "description": "insurence not apply", "selectedProducts": [] }, { "date": "17/02/2021", "CauseOfCall": "Products", "description1": "buy  insurence", "selectedProducts": ["Insurance 1","Insurance 2"] }]
        updateCalls(callsJson);  // until server start work
        axios.get('http://localhost:8080/Calls/'+ props.client.id).then((response) => {
          debugger;
          const callsJson = response.data;
          updateCalls(callsJson);

        }).catch(err => {
          alert(err);
        })
    }


    function addCall(newCall) {
        const call = <Call CauseOfCall={newCall.CauseOfCall} date={newCall.date} description={newCall.description} selectedProducts={newCall.selectedProducts} />;
        setCalls([...calls, call]);        
        addNewCall(newCall);

    }

    return (
        <>

            {calls}
            <CallModal addCall={addCall} />

        </>



    );
}
);
