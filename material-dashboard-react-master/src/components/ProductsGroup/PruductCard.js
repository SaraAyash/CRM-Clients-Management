
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
  const { title, text, footer, id } = props;
  const image = getType();

  function getType() {

    switch (id) {
      case 0:
        return <Card.Img variant="top" style={{ width: '6rem', position: 'relative', left: '100px' }} src={life} />
        break;
      case 1:
        return <Card.Img variant="top" style={{ width: '6rem', position: 'relative', left: '100px' }} src={home} />
        break;
      case 2:
        return <Card.Img variant="top" style={{ width: '6rem', position: 'relative', left: '100px' }} src={travel} />
        break;
      case 3:
        return <Card.Img variant="top" style={{ width: '6rem', position: 'relative', left: '100px' }} src={business} />
        break;
      case 4:
        return <Card.Img variant="top" style={{ width: '7rem', position: 'relative', left: '100px' }} src={health} />
        break;
      case 5:
        return <Card.Img variant="top" style={{ width: '6rem', position: 'relative', left: '100px' }} src={disability} />
        break;
    }
    return null;


  }

  return (
    <Card style={{ width: '23rem', height:'30rem',  margin:'1rem'}}>
      <p></p>
      {image}

      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          {text}
        </Card.Text>
      </Card.Body>
      <Card.Footer >
        <small style={{ color: 'green' }} >{footer}</small>
      </Card.Footer>
    </Card>
  );
}
