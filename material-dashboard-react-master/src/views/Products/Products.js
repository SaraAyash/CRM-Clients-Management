import React from "react";
// @material-ui/core components 
import { Card, Container, Row, Col } from 'react-bootstrap';
import life from '../../assets/img/life.jpg'
import { CardGroup } from 'react-bootstrap';
import ProductCard from "./../../components/ProductsGroup/PruductCard.js"
export default function Products() {


  return (
    <>
      <Container>
        <Row >
          <Col md="4" >
            <ProductCard
              title="Life insurance"
              text=" Life insurance is an insurance agreement between an insurance company and the insured, which provides a monetary benefit in case of injury to the body of the insured, especially in the case of his death. The monetary benefit is given in the form of a lump sum, or in the form of a monthly allowance. In exchange for insurance, the policyholder pays a one-time or periodic premium"
              footer="Price: Starting from 100 ILS per month"
              id={0}
            /></Col>
          <Col md="4">
            <ProductCard
              title="Home insurance"
              text=" The insurance covers damage to the property structure (walls, ceiling and floor) and accessories attached to it such as windows, doors, carpets from floor to floor, and damage to infrastructure such as water pipes, electricity, telephone, heating system."
              footer="Price: Starting from 30 ILS per month"
              id={1}
            /></Col>
          <Col md="4">
            <ProductCard
              title="Travel insurance"
              text="Overseas travel insurance is insurance that covers medical care expenses while staying abroad. A common extension to this insurance is property insurance that is taken abroad such as luggage and a cell phone."
              footer="Price: Starting from 20 ILS per day"
              id={2}
            /></Col>
          <Col md="4">
            <ProductCard
              title="Business insurance"
              text=" Provides comprehensive protection for the main risks relevant to the business and the employment of its employees"
              footer="Price: Starting from 40 ILS per month"
              id={3}
            /></Col>
          <Col md="4">
            <ProductCard
              title="health insurance"
              text="Insurance that covers expenses related to medical care. The insured pays a relatively low amount, in exchange for paying for high medical expenses that will be required when needed"
              footer="Price: Starting from 35 ILS per month"
              id={4}
            /></Col>
          <Col md="4">
            <ProductCard
              title="Work incapacity insurance"
              text=" Insurance designed to guarantee the insured a monthly benefit in the event that he loses his ability to work due to illness, accident, etc., for a period or permanently.
          The benefit paid under the insurance coverage comes to replace the income from work, occupation or business that the insured has (taxable income), and therefore will usually be determined according to this income. This taxable income can be salary (employee) or self-employed income and the like"
              footer="Price: Starting from 25 ILS per month"
              id={5}
            />

          </Col>
        </Row>
      </Container>

    </>
  );
}

