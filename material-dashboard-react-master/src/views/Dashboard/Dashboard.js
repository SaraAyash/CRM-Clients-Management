
import React, { useState, moment, useEffect } from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import { FcDataProtection, FcBusinessman } from "react-icons/fc";
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
import PolicyIcon from '@material-ui/icons/Policy';
import Typography from '@material-ui/core/Typography';
// core components
// import Class  from '@material-ui/icons/Class ';
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import ListItem from "@material-ui/core/ListItem";
import axios from "axios"
import Tasks from "components/Tasks/Tasks.js";
import EmployeesTable from "components/Employees/EmployeesTable.js"


import {
  monthlySalesGraph,
  weeklyClientsGraph,
  completedTasksChart
} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const [products, setPro] = useState(["atara", "sara"]);
  const [days, setDays] = useState(['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']);
  const [months, setMonths] = useState(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']);
  const [amountPurchases, setAmountPurchases] = useState();
  const [newProducts, setNewProducts] = useState([]);
  const [newClients, setNewClients] = useState([]);
  const [jsonString, setJsonString] = useState([]);
  const [lastPurchasesNum, setLastPurchasesNum] = useState([]);
  const [monthlySales, setMonthlySales] = useState(
    {
      labels: [],
      series: []
    })
  const [weeklyClients, setWeeklyClients] = useState(
    {
      labels: [],
      series: [[]]
    })
  const classes = useStyles();
  function getMonthlySales() {
    // const jsonString =  {Tue: 2, Thu: 1};
    axios.get('http://localhost:8080/purchases/dayDistribution')
      .then(response => {
        const jsonString = response.data[0].data;

        // setMonthlySales({ labels: Object.keys( jsonString), series: [Object.values( jsonString)] })
        const d = Object.keys(jsonString);
        const v = Object.values(jsonString);
        const date1 = new Date().toDateString();
        const date = date1.split(" ")[0];

        var i = 9;
        var fl = 0;
        for (const [index, value] of days.entries()) {
          if (fl === 1) {
            monthlySales.labels.push(value);
          }
          if (value === date) {
            i = index;
            fl = 1;
          }

        }

        for (const [index, value] of days.entries()) {
          if (value === date) {
            monthlySales.labels.push(value);
            break;

          }
          else {
            monthlySales.labels.push(value);
          }
        }
        var f = [0, 0, 0, 0, 0, 0, 0]
        for (const [index, value] of monthlySales.labels.entries()) {
          if (d.includes(value)) {
            // debugger
            f[index] = v[d.indexOf(value)]
            setMonthlySales({ labels: monthlySales.labels, series: [f] })
          }

        }
        debugger;
      }
      ).catch(err => {
        alert("m" + err);

      });


  }


  function getWeeklyClients() {

    axios.get('http://localhost:8080/clients/monthDistribution')
      .then(response => {
        const jsonString = response.data[0].data;
        const d = Object.keys(jsonString);
        const v = Object.values(jsonString);
        const date1 = new Date().toDateString();
        const date = date1.split(" ")[1];

        var i = 9;
        var fl = 0;


        for (const [index, value] of months.entries()) {
          if (fl === 1) {
            weeklyClients.labels.push(value);
          }
          if (value === date) {
            i = index;
            fl = 1;
          }

        }

        for (const [index, value] of months.entries()) {
          if (value === date) {
            weeklyClients.labels.push(value);
            break;

          }
          else {
            weeklyClients.labels.push(value);
          }
        }
        var f = [0, 0, 0, 0, 0, 0, 0]
        for (const [index, value] of weeklyClients.labels.entries()) {
          if (d.includes(value)) {
            // debugger
            f[index] = v[d.indexOf(value)]
            setWeeklyClients({ labels: weeklyClients.labels, series: [f] })
          }

        }
        debugger;
      }
        //setWeeklyClients({ labels: Object.keys(jsonString), series: [Object.values(jsonString)] })


      ).catch(err => {
        alert("m" + err);

      });



  }


  function getAmountOfRecentPurchases() {
    axios.get('http://localhost:8080/purchases/getLastWeek')
      .then(response => {
        const jsonString = response.data.length;
        setLastPurchasesNum(jsonString)
      }
      ).catch(err => {
        alert(err);

      });

  }

  function getweekRecentPurchases() {
    axios.get('http://localhost:8080/purchases/getLastWeek')
      .then(response => {
        setJsonString(response.data)
      }
      ).catch(err => {
        //  alert(err);
      });

  }

  function getNewPolicy() {
    axios.get('http://localhost:8080/products/getLastWeek')
      .then(response => {
        const jsonString = response.data;


        const items = jsonString.map((item, i) =>
          <ListItem key={i} >

            <div className={classes.cardCategory} ><FcDataProtection /> </div>
            <div className={classes.cardCategory} >{item.name} </div>
          </ListItem>
        )
        setNewProducts(items)
        //setAmountPurchases(response.data)
      }
      ).catch(err => {
        alert("policy" + err);
      });
  }
  // function getLastPurchases() {
  //   axios.get('http://localhost:8080/purchases/getLastWeek')
  //     .then(response => {
  //       const jsonString = response.data;
  //       const items = jsonString.map((item, i) =>
  //         <ListItem key={i}  >

  //           <div className={classes.cardCategory} ><FcDataProtection /> </div>
  //           <div className={classes.cardCategory} >{item.clientId} </div>
  //           <div className={classes.cardCategory} >{item.productId} </div>
  //         </ListItem>
  //       )
  //       setLastPurchases(items)
  //       //setAmountPurchases(response.data)
  //     }
  //     ).catch(err => {
  //       alert("lh" + err);
  //     });
  // }


  function getNewclients() {
    axios.get('http://localhost:8080/clients/getLastWeek')
      .then(response => {

        const jsonString = response.data;
        debugger
        const items = jsonString.map((client, i) => (
          <ListItem button key={i}  >
            <div className={classes.cardCategory} ><FcBusinessman /> </div>
            <div className={classes.cardCategory} >{client.first_name + " " + client.last_name} </div>
          </ListItem>
        ))
        setNewClients([items])
        // setAmountPurchases(response.data)
      }
      ).catch(err => {
        debugger
        alert(err);
      });
  }
  useEffect(() => {
    //alert("lk"+monthlySales)
  }, [weeklyClients, monthlySales]);
  useEffect(() => {
    getAmountOfRecentPurchases();
    getMonthlySales();
    getWeeklyClients();
    getNewPolicy();
    getNewclients();
  }, []);
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <ShoppingBasketIcon>info_outline</ShoppingBasketIcon>
              </CardIcon>
              <p className={classes.cardCategory}>amount of recent purchases:</p>
              <h3 className={classes.cardTitle}> {lastPurchasesNum}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Purchases from the last week
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <PolicyIcon />
              </CardIcon>
              <h1 className={classes.cardCategory} > New policy:</h1>
              {newProducts}

            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                New insurences from the last two weeks
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Accessibility />
              </CardIcon>
              <p className={classes.cardCategory}>New Client:</p>
              {newClients}
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Update />
      New clients from the last two weeks
    </div>
            </CardFooter>
          </Card>
        </GridItem>

      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={5}>
          <Card chart>
            <CardHeader color="success">
              <ChartistGraph
                className="ct-chart"
                data={monthlySales}
                type="Line"
                options={monthlySalesGraph.options}
                listener={monthlySalesGraph.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Weekly sales:</h4>
              <p className={classes.cardCategory}>
                <span className={classes.successText}>
                  <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                </span>{" "}
                increase in today sales.
              </p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> updated 4 minutes ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={5}>
          <Card chart>
            <CardHeader color="warning">
              <ChartistGraph
                className="ct-chart"
                data={weeklyClients}
                type="Bar"
                options={weeklyClientsGraph.options}
                responsiveOptions={weeklyClientsGraph.responsiveOptions}
                listener={weeklyClientsGraph.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>New customers this month:</h4>
              <p className={classes.cardCategory}>Last Campaign Performance</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> campaign sent 2 days ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="danger">
              <ChartistGraph
                className="ct-chart"
                data={completedTasksChart.data}
                type="Line"
                options={completedTasksChart.options}
                listener={completedTasksChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Completed Tasks</h4>
              <p className={classes.cardCategory}>Last Campaign Performance</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> campaign sent 2 days ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="info">
              <h4 className={classes.cardTitleWhite}>Tasks</h4>

            </CardHeader>
            <CardBody>
              <Tasks />
            </CardBody>
          </Card>


        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>Employees Stats</h4>
              <p className={classes.cardCategoryWhite}>
                New employees on 15th September, 2016
      </p>
            </CardHeader>
            <CardBody>
              <EmployeesTable />

            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>

    </div>
  );
}