import React from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Navbar from "components/Navbars/Navbar.js";
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import { viewRoutes, generalRoutes } from "routes.js";
import styles from "assets/jss/material-dashboard-react/layouts/adminStyle.js";
import bgImage from "assets/img/sidebar-2.jpg";
import logo from "assets/img/reactlogo.png";
import UserDetails from "./../components/DisplayUser/UserDetails.js"
import { Button } from 'react-bootstrap';


let ps;

// const switchRoutes = (
//   <Switch>
// {/* add all routing  */}
//     {generalRoutes.map((prop, key) => {
//       return (
//         <Route
//           path={prop.path}
//           component={prop.component}

//         />
//       );
//     })
//     }
// {/* add routing for view  */}
//     {viewRoutes.map((prop, key) => {

//       if (prop.layout === "/admin") {
//         return (
//           <Route
//             path={prop.layout + prop.path}
//             component={prop.component}
//             key={key}
//           />
//           // <Redirect to={prop.layout + prop.path} /> 
//         );
//       }

//       return null;
//     })
//     }
//     <Redirect from="/admin" to="/admin/user" />
//   </Switch>
// );

const useStyles = makeStyles(styles);

export default withRouter(function Login(props) {


    function move() {
        props.history.push("/admin")
    }
    return (
        <>
            <div>
                {/* <Route path="/admin" component={Admin} /> */}
            </div>

            <Button onClick={move}>click</Button>
            <h1>hi im login</h1>
        </>
    );
});
