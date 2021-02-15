

import React from "react";
import { connect } from 'react-redux'
import { actions } from '../../redux/actions'

// import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import styles from "assets/jss/material-dashboard-react/components/tableStyle.js";
// import UserDetails from "./../DisplayUser/UserDetails.js"
import { BrowserRouter, Router, Switch, Route, Redirect, withRouter } from "react-router-dom";
// import { createBrowserHistory } from "history";
// import { render } from "react-dom";
// import { Component } from "react";
import { Table } from 'react-bootstrap';


function mapStateToProps(state) {
  // debugger;
  return {
    client: state.clientReducer.client
  };
}

const mapDispatchToProps = (dispatch) => ({
  setFirstName: (client_name) => dispatch(actions.setFirstName(client_name)),
  setLastName: (client_last_name) => dispatch(actions.setLastName(client_last_name)),
  setEmail: (client_email) => dispatch(actions.setEmail(client_email)),
  setMobile: (client_mobile) => dispatch(actions.setMobile(client_mobile))

})


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(function CustomTable(props) {

  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const { tableHead, tableData } = props;

  function clickRow(value) {

    props.history.push("/admin/table/client/" + value[0]);
    props.setFirstName(value[0]);
    props.setLastName(value[1]);
    props.setEmail(value[2]);
    props.setMobile(value[3]);

  }
  return (

    <div className={classes.tableResponsive}>
      <label>{props.client.firstName}</label>
      <Table  >
        <thead>
          <tr>
            {tableHead !== undefined ? (tableHead.map((prop, key) => {
              return (
                <th
                  className={classes.tableCell + " " + classes.tableHeadCell}
                  key={key}
                >
                  {prop}
                </th>
              );
            })) : null}
          </tr>
        </thead>

        <tbody>

          {tableData.map((prop, key) => {
            return (
              <tr key={key} className={classes.tableBodyRow} onClick={() => clickRow(prop)}>
                {prop.map((prop, key) => {
                  return (
                    <td className={classes.tableCell} key={key}>
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