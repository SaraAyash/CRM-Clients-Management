
import React, { useState } from "react";
import { Card } from 'react-bootstrap';
import Switch from "react-bootstrap/esm/Switch";
import life from '../../assets/img/life.jpg'
import home from '../../assets/img/home2.jpg'
import travel from '../../assets/img/travel.jpg'
import business from '../../assets/img/buss.png'
import health from '../../assets/img/health.jpg'
import disability from '../../assets/img/disability.jpg'

export default function ProductCard(props) {
  const [imageName, setImageName] = useState();
  const { title, text, price,picture } = props;
 
  

  return (
    <Card style={{ width: '17rem' ,height:'26rem',margin:'1rem'}}>
      <p></p>
      <Card.Img variant="top" style={{ width: '6rem', position: 'relative', left: '100px' }} src={picture}/>

      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          {text}
        </Card.Text>
      </Card.Body>
      <Card.Footer >
        <small style={{ color: 'green' }} >Price: starting from {price} ILS per month</small>
      </Card.Footer>
    </Card>
  );
}
