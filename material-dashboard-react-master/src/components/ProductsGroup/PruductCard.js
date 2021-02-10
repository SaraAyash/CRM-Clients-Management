import React from "react";
import { Card } from 'react-bootstrap';

export default function ProductCard(props) {
  const { title, text, footer } = props;

  return (
    <Card style={{ width: '1rem' }}>
      {/* <Card.Img variant="top" src="holder.js/100px160" /> */}
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          {text}
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">{footer}</small>
      </Card.Footer>
    </Card>
  );
}