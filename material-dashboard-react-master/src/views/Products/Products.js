import React, { useEffect, useState } from "react";
// @material-ui/core components 
import axios from "axios"
import ProductCard from "./../../components/ProductsGroup/PruductCard.js"
import ProductModal from "components/Products/ProductModal";
import { Container, Row, Col } from 'react-bootstrap';

export default function Products() {
  const [products, setProducts] = useState([]);



  function displayProducts(jsonString) {
    const items = jsonString.map((item) =>
      <Col md="4" > <ProductCard
        IdProduct={item._id}
        name={item.name}
        description={item.description}
        price={item.price}
        picture={item.image}
      /></Col>
    )
    setProducts(...products, items);

  }
  const initialize = () => {

    axios.get('http://localhost:8080/products/getList').then((response) => {
      const productJson = response.data;
      displayProducts(productJson);

    }).catch(err => {
      
    })

  }

  function addProduct(productJson) {

    axios.post('http://localhost:8080/products/add', productJson)
      .then(() => {

        const productCol = <Col md="4" > <ProductCard
           
          title={productJson.name}
          text={productJson.description}
          price={productJson.price}
          picture={productJson.image}
        /></Col>

        setProducts([...products, productCol]);
      }


      ).catch(err => {

      });






  }

  useEffect(initialize, []);

  return (
    <>


      <ProductModal handleFunction={addProduct} addOrUpdate="add product" ></ProductModal>

      <Container>
        <Row>
          {products}

        </Row>
      </Container>

    </>
  );
}

