import React, { useState, moment } from "react";
import { connect } from 'react-redux'
import { actions } from '../../redux/actions'
import CallModal from "./CallModal.js"
import Call from "./Call.js"

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

    function addCall(CauseOfCall, date, description, selectedProducts) {
        const call = <Call CauseOfCall={CauseOfCall} date={date} description={description} selectedProducts={selectedProducts}  />;
        setCalls([...calls, call]);
        
        debugger;
    }
    return (
        <>
            <CallModal addCall={addCall} />
            {calls}

        </>



    );
}
);
