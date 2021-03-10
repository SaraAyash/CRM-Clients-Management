

import React from "react";
import { connect } from 'react-redux'
import { actions } from '../../redux/actions'
import { FaSort } from "react-icons/fa";
// import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import styles from "assets/jss/material-dashboard-react/components/tableStyle.js";
// import UserDetails from "./../DisplayUser/UserDetails.js"
import { withRouter } from "react-router-dom";
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
  setId: (client_id) => dispatch(actions.setId(client_id)),
  setFirstName: (client_name) => dispatch(actions.setFirstName(client_name)),
  setLastName: (client_last_name) => dispatch(actions.setLastName(client_last_name)),
  setEmail: (client_email) => dispatch(actions.setEmail(client_email)),
  setMobile: (client_mobile) => dispatch(actions.setMobile(client_mobile))

})


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(function CustomTable(props) {

  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const {  tableData } = props;
  const useSortableData = (items, config = null) => {
    const [sortConfig, setSortConfig] = React.useState(config);

    const sortedItems = React.useMemo(() => {
      let sortableItems = [...items];
      if (sortConfig !== null) {
        sortableItems.sort((a, b) => {
          if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
          }
          if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
          }
          return 0;
        });
      }
      return sortableItems;
    }, [items, sortConfig]);

    const requestSort = (key) => {

      let direction = 'ascending';
      if (
        sortConfig &&
        sortConfig.key === key &&
        sortConfig.direction === 'ascending'
      ) {
        direction = 'descending';
      }
      setSortConfig({ key, direction });
    };

    return { items: sortedItems, requestSort, sortConfig };
  };
 
  const { items, requestSort, sortConfig } = useSortableData(tableData);

  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };


  function clickRow(value) {

    props.history.push("/admin/table/client/" + value.client_id);
    props.setId(value.client_id);
    props.setFirstName(value.first_name);
    props.setLastName(value.last_name);
    props.setEmail(value.email);
    props.setMobile(value.mobile);

  }
  return (

    <div className={classes.tableResponsive}>

      <Table  >
        <thead>
          <tr>
            <th className={getClassNamesFor('first_name ')}>
              {"First name  "}
              <FaSort onClick={() => requestSort('first_name')} />
            </th>

            <th className={getClassNamesFor('last_name')}>
              {"Last name  "}
              <FaSort onClick={() => requestSort('last_name')} />
            </th>


            <th className={getClassNamesFor('gender')}>
              {"Gender "}
              <FaSort onClick={() => requestSort('gender')} />
            </th>
            <th>
              {"email"}
            </th>
           

          </tr>
        </thead>

        <tbody>

          {items.map((prop, key) => {

            return (
              <tr key={key} className={classes.tableBodyRow} onClick={() => clickRow(prop)}>
                {/* {"name":atara,"last":elmal} */}
                {
                  [prop.first_name, prop.last_name, prop.gender, prop.email, prop.mobile].map((prop, key) => {

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