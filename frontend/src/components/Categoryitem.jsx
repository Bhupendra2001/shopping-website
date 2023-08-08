import { mobil } from "../responsive";
import { tablet } from "../responsive";
import styled from "styled-components";
import { Link } from "react-router-dom"; 
const Container = styled.div`
  flex: 1;
  margin: 3px;
  height: auto;
  position: relative;
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  padding: 10px;
  ${mobil({ height: "39vh" })}
  ${tablet({ height: "55vh" })}
`;
const Button = styled.button`
  border: none;
  padding: 10px;
  cursor: pointer;
  background-color: white;
  color: gray;
  font-weight: 600;
  margin-bottom: 1px;
  ${mobil({ width : "90px" , height : "30px", fontSize : "12px"})}
`;
const Info = styled.div`
  position: absolute;
  top: 60px;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${tablet({top : "20px" })}
 
`;
const Title = styled.h1`
  color: red;
  margin-bottom: 20px;
  ${mobil({fontSize : "20px" , marginBottom : "0px"})}
  ${tablet({fontSize : "23px" , marginTop : "10px"})}
`;

const Categoryitem = ({ item }) => {
  return (
    <Container>
      <Link to={`/products/${item.cat}`}>
      <Image src={item.img} />
      <Info>
        <Button>SHOP NOW</Button>
        <Title>{item.title}</Title>
      </Info>
      </Link>
    </Container>
  );
};

export default Categoryitem;
