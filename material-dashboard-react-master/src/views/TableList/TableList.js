import React, { useState, useEffect } from "react";
import axios from "axios"
 
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
import ClientModal from "components/Clients/ClientModal.js"
import { withRouter } from "react-router-dom";
 
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

export default withRouter(function TableList(props) {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    getAllClientFromServer();
    listenURL();
  }, []);

  function listenURL() {
    props.history.listen((location, action) => {
      if (location.pathname === "/admin/table") {
        getAllClientFromServer();
      }
    })
  }

  function updateClientsTable(clientJson) {
    var arr = [];
    Object.values(clientJson).map(client => arr.push([client.client_id, client.first_name, client.last_name, client.email, client.gender]))
    setClients(clientJson);
  }

  function getAllClientFromServer() {
    // updateClientsTable([{ "id": "1", "first_name": "andris", "last_name": "Inchboard", "email": "ainchboard0@weibo.com", "gender": "Agender" ,"mobile":"054444444"},{ "id": "1", "first_name": "fndris", "last_name": "nchboard", "email": "ainchboard0@weibo.com", "gender": "Agender","mobile":"054444444" },{ "id": "1", "first_name": "bndris", "last_name": "Inchboard", "email": "ainchboard0@weibo.com", "gender": "bender","mobile":"054444444" }]);
    axios.get('http://localhost:8080/clients/getList').then((response) => {
      const clientJson = response.data;
      updateClientsTable(clientJson);

    }).catch(err => {
       
    })

  }

  function addNewClient(clientJson) {
    debugger
    axios.post('http://localhost:8080/clients/add', clientJson)
      .then(response => {
        debugger
        getAllClientFromServer();
      }

      ).catch(err => {
        
      });


  }

  const searchClient = async (clientName) => {

    // const clientToSearch = [{ "id": "1", "first_name": "Andris", "last_name": "Inchboard", "email": "ainchboard0@weibo.com", "gender": "Agender" }];
    // var clientToShowInTable = [];
    // clientToShowInTable.push([clientToSearch.id, clientToSearch.first_name, clientToSearch.last_name, clientToSearch.email, clientToSearch.gender]);
    props.history.push("/admin/table/search")
    // updateClientsTable(clientToSearch);

    debugger

    axios.get('http://localhost:8080/clients/search/'+clientName).then((response) => {
      debugger
      const clientToSearch = response.data;
      updateClientsTable(clientToSearch);
    }).catch(err => {
     
    });

  }

  const classes = useStyles();

  return (

    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <div className="d-flex justify-content-between">
          <div className="p-2 col-example text-left"><ClientModal handleFunction={addNewClient} addOrUpdate="Add " /></div>
          <div className="p-2 col-example text-left"><Search searchClient={searchClient} /> </div>
        </div>

        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Clients Table</h4>
            <p></p>

          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["id", "First Name", "Last Name", "Email" ]}
              tableData={clients}

            />
          </CardBody>
        </Card>
      </GridItem>

    </GridContainer >

  );
});
