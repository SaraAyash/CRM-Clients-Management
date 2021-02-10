import React from "react";
// @material-ui/core components 
import { CardGroup } from 'react-bootstrap';
import ProductCard from "./../../components/ProductsGroup/PruductCard.js"
export default function Products() {


  return (
    <>
      <CardGroup>
        <ProductCard
          title="Card title"
          text=" This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer."
          footer="product 1"
        />
        
        <ProductCard
          title="Card title"
          text=" This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer."
          footer="product 2"
        />
        <ProductCard
          title="Card title"
          text=" This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer."
          footer="product 3"
        />
      </CardGroup>
      <p></p>
      <CardGroup>
        <ProductCard
          title="Card title"
          text=" This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer."
          footer="product 4"
        />
        <ProductCard
          title="Card title"
          text=" This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer."
          footer="product 5"
        />
        <ProductCard
          title="Card title"
          text=" This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer."
          footer="product 6"
        />
      </CardGroup>
    </>
  );
}
