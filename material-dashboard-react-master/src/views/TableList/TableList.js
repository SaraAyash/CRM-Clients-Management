import React, { useState, useEffect } from "react";
import axios from "axios"

import { Provider } from 'react-redux'
import store from "../../redux/Store.js"
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Search from "components/Search/Search.js"
import AddClient from "components/Clients/AddClient.js"
import { BrowserRouter, Router, Switch, Route, Redirect, withRouter } from "react-router-dom";

import { createBrowserHistory } from "history";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

const useStyles = makeStyles(styles);
const hist = createBrowserHistory();

export default function TableList() {
  const [clients, setClients] = useState([]);
  // const [clients, setClients] = useState();
  useEffect(() => {
    axios.get('http://localhost:8080/clients').then((response) => {

      const cl = response.data;
      console.log(response.data);

      // Object.values(cl).map(
      //   client=>setClients(...clients,[client.id, client.first_name, client.last_name, client.email, client.gender]));
      var arr = []
      Object.values(cl).map(client => arr.push([client.id, client.first_name, client.last_name, client.email, client.gender]))
      updateClients(arr);
      // Object.entries(response.data).map(
      //   ([key, value]) => ({ [key]: value })
      // );


      // Object.values(response.data).forEach(client => {
      //   const arr = []
      //   Object.keys(client).forEach(key => arr.push([client.id, client.first_name, client.last_name, client.email, client.gender]))
      //   setClients(...clients,arr);
      // });
      // {"id":1,"first_name":"Andris","last_name":"Inchboard","email":"ainchboard0@weibo.com","gender":"Agender"}
      //        setClients(...clients, [client.id, client.first_name, client.last_name, client.email, client.gender])

      debugger;
    }).catch(err => {
      console.log(err);
    });


  });
  function updateClients(arr) {
    setClients(arr);
    debugger;
  }

  function searchClient(value) {
    alert(value);

  }
  const classes = useStyles();
  // debugger;
  return (

    <GridContainer>

      <GridItem xs={12} sm={12} md={12}>
        <Search
          searchClient={searchClient}
        />
        <AddClient />
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Clients Table</h4>
            <p></p>

          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["id", "First Name", "Last Name", "Email", "Mobile"]}
              tableData ={clients}
              // tableData={
              //   [
              //     ["Dakota", "Rice", "sara05485@gmail.com", "856454"],
              //     ["Minerva", "Hooper", "sara05485@gmail.com", "7866669"],
              //     ["Sage", "Rodriguez", "sara05485@gmail.com", "0876786878"],
              //     ["Philip", "Chaney", "sara05485@gmail.com ", "$38,735"],
              //     ["Doris", "Greene", "sara05485@gmail.com", "64653562"],
              //     ["Mason", "Porter", "sara05485@gmail.com", "785453535"]
              //   ]
              // }
            />
          </CardBody>
        </Card>
      </GridItem>

    </GridContainer>

  );
}

