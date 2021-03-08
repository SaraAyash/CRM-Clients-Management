import React, { useState } from "react";
import { Card, ListGroup, Accordion } from 'react-bootstrap';
import { withRouter } from "react-router-dom";
import { format } from "date-fns";

export default withRouter(function Call(props) {
    const { subject,  description } = props;
    const [purchasedProducts] = useState(props.purchasedProducts);     
    const formattedDate = new Date(props.date); 
     
    const date = format(formattedDate, "MMMM dd, yyyy ");
    
    
    return (
        <>

            <Accordion style={{ width: "80%" }}>
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="0">
                        <Card.Header class="font-weight-bold " >
                            <div className="d-flex justify-content-between">
                                <div className="p-2 col-example text-left">  {subject}</div>
                                <div className="p-2 col-example text-left">  {date}  </div>
                            </div>

                        </Card.Header></Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            <ListGroup.Item ><p class="font-weight-bold ">Description Call:</p> {description}</ListGroup.Item>
                            {purchasedProducts.length  > 0 ? <>
                                <ListGroup.Item>
                                    <p class="font-weight-bold ">Purchased products:</p>
                                    {purchasedProducts.map((purchased) =>
                                        <li
                                            key={purchased.id}
                                            onClick={() => { props.history.push("/admin/products/" + purchased.id) }}>
                                            {purchased.name}
                                        </li>
                                    )}

                                </ListGroup.Item>

                            </> : ''}



                        </Card.Body>
                    </Accordion.Collapse>
                </Card>

            </Accordion>
            <p></p>

        </>



    );
});