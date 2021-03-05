import React, { useState,useEffect } from "react";
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
import axios from "axios";

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

export default connect(mapStateToProps, mapDispatchToProps)(function UserProfile(props) {
  const [propfile, setProfile] = useState({
    "employee_id": 1,
    "first_name": "Rowe",
    "last_name": "Shallo",
    "email": "rshallo0@yellowpages.com",
    "password": "gagIr0xQPN",
    "image": "https://i.pinimg.com/originals/f4/fa/98/f4fa98e899b1f9b6e19a0c9d8166a28d.jpg",
    "about": "Chemical Engineer"
  });

  useEffect(() => {
    axios.get('http://localhost:8080/employees/' + props.employee.employee_id).then((response) => {
      setProfile(response.data);

    }).catch(err => {

    });


    


  }, []);
  const classes = useStyles();
  return (
    <div>
      <GridContainer>

        <GridItem xs={12} sm={12} md={12}>
          <Card profile>
            <CardAvatar profile>
              <a href="#pablo" onClick={e => e.preventDefault()}>
                <img src={propfile.image} alt="..." />
              </a>
            </CardAvatar>
            <CardBody profile>
              <h6 className={classes.cardCategory}>{propfile.about}</h6>
              <h3 className={classes.cardTitle}>{propfile.first_name + " " +  propfile.last_name}</h3>
              <h3 className={classes.cardTitle}></h3>
              <p>{propfile.email} </p>
              <p> {propfile.phone} </p>
               

            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
});
