import React, { useState, useEffect } from "react";
import { connect } from 'react-redux'
import { actions } from '../../redux/actions'
// @material-ui/core components 
import ClientModal from "components/Clients/ClientModal.js"
import Purchases from "components/Purchases/Purchases.js"
import axios from "axios"
import { Button } from 'react-bootstrap';
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
    const [client, setClient] = useState({
        client_id: '',
        first_name: '',
        last_name: '',
        phone_number: '',
        email: '',
        year_of_birth: '',
        start_connection_date: '',

    });

    const [uniqeId, setUniqeId] = useState('');
    function updateClientDetails(clientJson) {
        debugger
        axios.put('http://localhost:8080/clients/update/' + uniqeId, clientJson)
            .then((response) => {
                debugger
                getClientById();
                // props.setId(clientJson.id);
                // props.setFirstName(clientJson.firstName);
                // props.setLastName(clientJson.lastName);
                // props.setEmail(clientJson.email);
                // props.setMobile(clientJson.mobile);
            }
            ).catch(err => {
                debugger

            });


    }

    useEffect(() => {
        if (printState) {
            window.print();
            setPrintState(false);
        }
    }, [printState]);

    useEffect(() => {
        getClientById();

    }, []);


    const getClientById = () => {
        axios.get('http://localhost:8080/clients/getClientById/' + props.client.id).then((response) => {
            debugger
            setClient(response.data[0])
            setUniqeId(response.data[0]._id)

        }).catch(err => {

        });
    }

    return (
        <div>

            {!printState ?
                <div className="d-flex justify-content-start">
                    <div className="text-left"><ClientModal handleFunction={updateClientDetails} client={client} addOrUpdate="Update " /></div>
                    <div className="pl-2 text-rigth"> <Button onClick={() => setPrintState(true)}>Print Client Card</Button> </div>
                </div> :
                ''
            }

            <p></p>
            <hr></hr>
            <h3>Client Details:</h3>

            <h3 class="font-weight-bold "> ID: <small>{client.client_id}</small></h3>
            <h3 class="font-weight-bold "> First Name: <small>{client.first_name}</small></h3>
            <h3 class="font-weight-bold "> Last Name: <small>{client.last_name}</small></h3>
            <h3 class="font-weight-bold "> Email: <small>{client.email}</small></h3>
            <h3 class="font-weight-bold "> Mobile: <small>{client.phone_number}</small></h3>
            <h3 class="font-weight-bold "> Year of birth: <small>{client.year_of_birth}</small></h3>

            <h3 class="font-weight-bold "> Start connection date: <small>{client.start_connection_date}</small></h3>

            <hr></hr>
            <h3> Purchases:</h3>
            <Purchases />
            <hr></hr>
            <h3> Call documentation:</h3>
            <CallDocs />
        </div>



    );
});


