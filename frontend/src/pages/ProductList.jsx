import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Newsletter from "../components/Newsletter";
import Products from "../components/Products";
import { mobil } from "../responsive";
import { useLocation } from "react-router-dom";
import { useState } from "react";

const Container = styled.div``;
const Title = styled.h1`
  margin: 30px;
  color : teal;
`;
const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Filter = styled.div`
  margin: 20px;
  ${mobil({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;
const Filtertext = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobil({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobil({ margin: "10px 0px" })}
`;
const Option = styled.option``;

export const ProductList = () => {

  const location = useLocation()

 // console.log(location.pathname.split('/')[2])
  const cat = location.pathname.split('/')[2]

  const [filter , setFilter] = useState({})
  const [sort , setSort] = useState("newest")

  const handleFilter = (event)=>{
     
    setFilter({
      ...filter,
      [event.target.name] :event.target.value
    })
  }
  
  return (
    <Container>
      <Announcement />
      <Navbar />
      <Title>{cat}</Title>
      <FilterContainer>
        <Filter>
          <Filtertext>Filter Products :</Filtertext>

          <Select name="color" onChange={handleFilter}>
            <Option disabled  >
              Color
            </Option>
            <Option>WHITE</Option>
            <Option>BLACK</Option>
            <Option>RED</Option>
            <Option>BLUE</Option>
            <Option>YELLOW</Option>
            <Option>GREEN</Option>
            <Option>GRAY</Option>
            <Option>MEROON</Option>
          </Select>
          <Select name="size" onChange={handleFilter}>
            <Option disabled >
              Size
            </Option>
            <Option>XS</Option>
            <Option>S</Option>
            <Option>M</Option>
            <Option>L</Option>
            <Option>XL</Option>
          </Select>
        </Filter>
        <Filter>
          <Filtertext>Sort Products :</Filtertext>
          <Select onChange={(e)=>setSort(e.target.value)}>
            <Option value="newest">Newest</Option>
            <Option value="asc" >price (asc)</Option>
            <Option value="desc" >price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products cat={cat} filter={filter} sort={sort}/>
      <Newsletter />
      <Footer />
    </Container>
  );
};
