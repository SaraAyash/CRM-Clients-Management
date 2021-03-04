import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { FcDataProtection } from "react-icons/fc";
import { SiFacebook } from "react-icons/si";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";

import { connect } from 'react-redux'
import { actions } from '../../redux/actions'
import avatar from "assets/img/faces/marc.jpg";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

const useStyles = makeStyles(styles);
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

export default connect(mapStateToProps, mapDispatchToProps)(
  function UserProfile(props) {
    const classes = useStyles();
    return (
      <div>
        <GridContainer>

          <GridItem xs={12} sm={12} md={12}>
            <Card profile>
              <CardAvatar profile>
                <a href="#pablo" onClick={e => e.preventDefault()}>
                  <img src={avatar} alt="..." />
                </a>
              </CardAvatar>
              <CardBody profile>
                <h6 className={classes.cardCategory}>CEO / CO-FOUNDER</h6>
                <h3 className={classes.cardTitle}>{props.employee.first_name}</h3>
                <h3 className={classes.cardTitle}>{props.employee.last_name}</h3>
                <p className={classes.description}>
                  {props.employee.email}  

              </p>
              <p className={classes.description}>
                   {props.employee.phone}

              </p>
                <FcDataProtection ></FcDataProtection>
                <SiFacebook></SiFacebook>

              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  });
