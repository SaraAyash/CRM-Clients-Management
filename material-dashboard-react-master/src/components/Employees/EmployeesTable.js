import React, { useState, useEffect } from "react";
import { connect } from 'react-redux'
import { actions } from '../../redux/actions'
import { withRouter } from "react-router-dom";

import { Table } from 'react-bootstrap';


function mapStateToProps(state) {
    // debugger;
    return {
        client: state.clientReducer.client,
        employee: state.employeeReducer.employee
    };
}

const mapDispatchToProps = (dispatch) => ({
    setId: (client_id) => dispatch(actions.setId(client_id)),
    setFirstName: (client_name) => dispatch(actions.setFirstName(client_name)),
    setLastName: (client_last_name) => dispatch(actions.setLastName(client_last_name)),
    setEmail: (client_email) => dispatch(actions.setEmail(client_email)),
    setMobile: (client_mobile) => dispatch(actions.setMobile(client_mobile))

})


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(function EmployeesTable(props) {

    const [employees, setEmployees] = useState([{ first_name: 'sara', last_name: 'ayash', email: '00404004', phone: '05040404004' }])
    useEffect(() => {

    }, [])

    return (

        <div  >

            <Table  >
                <thead>
                    <tr>
                        <th>First name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone</th>

                    </tr>
                </thead>

                <tbody>
                    {employees.map((prop, key) => {
                        return (
                            <tr key={key}  >
                                {
                                    [prop.first_name, prop.last_name, prop.email, prop.phone].map((prop, key) => {
                                        return (
                                            <td key={key}>
                                                {prop}
                                            </td>
                                        );
                                    })}
                            </tr>
                        );
                    })}



                </tbody>
            </Table>

        </div>
    );



}));