
import React, { useState } from "react";
import { Card } from 'react-bootstrap';
import { connect } from 'react-redux'
import { actions } from '../../redux/actions'
import Switch from "react-bootstrap/esm/Switch";
import life from '../../assets/img/life.jpg'
import home from '../../assets/img/home2.jpg'
import travel from '../../assets/img/travel.jpg'
import business from '../../assets/img/buss.png'
import health from '../../assets/img/health.jpg'
import disability from '../../assets/img/disability.jpg'
import { BrowserRouter, Router,  Route, Redirect, withRouter } from "react-router-dom";
function mapStateToProps(state) {
  // debugger;
  return {
    product: state.productReducer.product
  };
}

const mapDispatchToProps = (dispatch) => ({
  setInsuranceId: (insurance_Id) => dispatch(actions.setInsuranceId(insurance_Id)),
  setInsuranceName: (insurance_Name) => dispatch(actions.setInsuranceName(insurance_Name)),
  setInsuranceDescription: (Insurance_Description) => dispatch(actions.setInsuranceDescription(Insurance_Description)),
  setInsurancePrice: (insurance_Price) => dispatch(actions.setInsurancePrice(insurance_Price)),
  setInsurancePicture: (insurance_Picture) => dispatch(actions.setInsurancePicture(insurance_Picture))

})
export default connect(mapStateToProps, mapDispatchToProps) ( withRouter(function ProductCard(props) {
  const [imageName, setImageName] = useState();
  const {IdProduct, title,text, price,picture } = props;
 function clickProduct() {
  
   props.history.push("/admin/products/"+IdProduct);
   props.setInsuranceName(title);
   props.setInsuranceDescription(text);
   props.setInsurancePrice(price);
   props.setInsurancePicture(picture);
   props.setInsuranceId(IdProduct);
 }
  

  return (
    <Card   onClick={clickProduct} style={{ width: '17rem' ,height:'27rem',margin:'1rem'}}>
      <p></p>
      <Card.Img variant="top" style={{ width: '6rem', position: 'relative', left: '100px' }} src={picture}/>

      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          {text}
        </Card.Text>
      </Card.Body>
      <Card.Footer >
        <small style={{ color: 'green' }} >Price: starting from { price} ILS per month</small>
      </Card.Footer>
    </Card>
  );
})
)