import React from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Navbar from "components/Navbars/Navbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import { viewRoutes, generalRoutes } from "routes.js";
import styles from "assets/jss/material-dashboard-react/layouts/adminStyle.js";
import bgImage from "assets/img/sidebar-2.jpg";
import logo from "assets/img/reactlogo.png";
import { connect } from 'react-redux'
import { actions } from '../redux/actions'
let ps;

const switchRoutes = (
  <Switch>
    {/* add all routing  */}
    {generalRoutes.map((prop, key) => {
      return (
        <Route
          path={prop.path}
          component={prop.component}

        />
      );
    })
    }
    {/* add routing for view  */}
    {viewRoutes.map((prop, key) => {

      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
          // <Redirect to={prop.layout + prop.path} /> 
        );
      }

      return null;
    })
    }
    <Redirect from="/admin" to="/admin/user" />
  </Switch>
);
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
const useStyles = makeStyles(styles);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(function Admin(props) {
  // styles
  const classes = useStyles();
  // ref to help us initialize PerfectScrollbar on windows devices
  const mainPanel = React.createRef();
  // states and functions
  const [image] = React.useState(bgImage);
  const [color] = React.useState("green");
  // const [fixedClasses, setFixedClasses] = React.useState("dropdown show");
  const [mobileOpen, setMobileOpen] = React.useState(false);


  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const getRoute = () => {
    return window.location.pathname;
  };
  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };
  // initialize and destroy the PerfectScrollbar plugin
  React.useEffect(() => {
    if(props.employee.first_name === ""){
      props.history.push("/login");
    }

    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false
      });
      document.body.style.overflow = "hidden";
    }
    window.addEventListener("resize", resizeFunction);
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
      window.removeEventListener("resize", resizeFunction);
    };
  }, [mainPanel]);
  const style = {
    backgroundImage: "url(http://getwallpapers.com/wallpaper/full/3/c/2/1392833-simple-background-pictures-1920x1200-retina.jpg#.YDO8w_cK51o.link)",
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat'
  }

  return (
    <div className={classes.wrapper}
      style={style}
    >
      <Sidebar
        routes={viewRoutes}
        logoText={"CRM"}
        logo={logo}
        image={image}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        color={color}
        // {...rest}
      />
      <div className={classes.mainPanel} ref={mainPanel}>
        <Navbar
          routes={viewRoutes}
          handleDrawerToggle={handleDrawerToggle}
          // {...rest}
        />

        {getRoute() ? (
          <div className={classes.content}>
            <div className={classes.container}>{switchRoutes}</div>
          </div>
        ) : null
        }

      </div>
    </div>
  );
})

);
