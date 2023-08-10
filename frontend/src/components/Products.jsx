import styled from "styled-components";
import { popularProducts } from "../sliderData";
import Product from "./Product";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
function Products({ cat, filter, sort }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await axios.get(
          cat
            ? `https://shopping-website-server.vercel.app/api/products?category=${cat}`
            : `https://shopping-website-server.vercel.app/api/products`
        );
        setProducts(response.data);
      } catch (err) {}
    };
    getProduct();
  }, [cat]);

  useEffect(() => {
    cat &&
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filter).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [products , cat, filter]);

 useEffect(()=>{
  if(sort === 'newest'){
    setFilteredProducts((prev)=>
    [...prev].sort((a,b)=> a.createdAt - b.createdAt)
    );
    
  }else if (sort === 'asc'){
    setFilteredProducts((prev)=>
    [...prev].sort((a, b)=> a.price - b.price))
  }else {
    setFilteredProducts((prev)=>
    [...prev].sort((a, b)=> b.price - a.price))
  }
 }, [sort]);

  return (
    <Container>
      { 
      cat ? 
      filteredProducts.map((item) => (
        <Product item={item} key={item.id} />
      )) : products.slice(0,10).map((item)=> <Product item={item} key={item.id} />)}
    </Container>
  );
}

export default Products;
