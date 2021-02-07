import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// core components
import styles from "assets/jss/material-dashboard-react/components/tableStyle.js";
import UserDetails from "./../DisplayUser/UserDetails.js"
import { Router, Switch, Route, Redirect, withRouter } from "react-router-dom";
import { createBrowserHistory } from "history";

const useStyles = makeStyles(styles);

export default withRouter(function CustomTable(props) {
  const classes = useStyles();
  const { tableHead, tableData, tableHeaderColor, history } = props;

  function clickRow(value) {

    // return Redirect
    history.push("/admin/table/sara")
    
  }
  const hist = createBrowserHistory();
  return (
     
      <Switch>
        <Route path="/admin/table" >
          <div className={classes.tableResponsive}>
            <Table className={classes.table}>
              {tableHead !== undefined ? (
                <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
                  <TableRow className={classes.tableHeadRow}>
                    {tableHead.map((prop, key) => {
                      return (
                        <TableCell
                          className={classes.tableCell + " " + classes.tableHeadCell}
                          key={key}
                        >
                          {prop}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                </TableHead>
              ) : null}
              <TableBody>
                {tableData.map((prop, key) => {
                  return (
                    <TableRow key={key} className={classes.tableBodyRow} type="button" onClick={() => clickRow(prop)} >
                      {prop.map((prop, key) => {
                        return (
                          <TableCell className={classes.tableCell} key={key}>
                            {prop}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

        </Route>
        <Route path="/admin/table/sara">
          <UserDetails />
        </Route>

        <Redirect from="/" to="/admin/dashboard" />
      </Switch>
    

  );


  CustomTable.defaultProps = {
    tableHeaderColor: "gray"
  };

  CustomTable.propTypes = {
    tableHeaderColor: PropTypes.oneOf([
      "warning",
      "primary",
      "danger",
      "success",
      "info",
      "rose",
      "gray"
    ]),
    tableHead: PropTypes.arrayOf(PropTypes.string),
    tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
  };

});