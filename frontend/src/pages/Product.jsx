import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { Add, Remove } from "@material-ui/icons";
import { mobil, tablet } from "../responsive";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { publicRequest } from "../requestMethods";
import { addProduct } from "../redux/cartRedux";
import { useDispatch , useSelector} from "react-redux";

const Container = styled.div``;

const Image = styled.img`
  width: 90%;
  height: 90%;
  object-fit: cover;
  ${mobil({ height: "40vh" })}
  ${tablet({ width : "45vw" ,  height: "70vh"})}
`;

const ImgContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobil({ padding: "10px" })}
  ${tablet({ padding : "0px"})}
`;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobil({ padding: "10px", flexDirection: "column" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
width : 50%:

display : flex;
${tablet({ flexDirection : "column" })}
justify-content : space-between;
${mobil({ width: "100%" })}
`;
const Filter = styled.div`
  display: flex;
  align-items: center;
  margin-top:10px;
`;
const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.select`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;
const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;
const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction : column;
  align-items: center;
  justify-content: space-between;
  ${mobil({ width: "100%" })}
  ${tablet({ marginTop : "0px" })}

`;
const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
  margin : 20px 87% 0px 0px;
  ${tablet({ margin : "20px 60% 0px 0px" })}
 
`;
const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  
`;

const Login = styled.a`
color : teal;
font-size : 14px;
margin-top : 40px;
border:1px solid teal;
padding : 10px;
text-decoration :none;
`
const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  cursor: pointer;
  width : 200px;
  background-color: white;
  font-weight: 500;
  
  margin : 20px 67% 0px 0px;
  ${tablet({ width : "150px" , margin : "20px 24% 0px 0px"})}
  &:hover {
    background-color: teal;
    color: white;
  }
`;
export const Product = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state)=>state.user.currentUser)
 
  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/products/" + id);
        setProduct(res.data);
      } catch {}
    };
    getProduct();
  }, [id]);

  const handleQuantity = (type) => {
    if (type == "inc") {
      setQuantity(quantity + 1);
    } else {
      setQuantity(quantity - 1);
      if (quantity <= 0) {
        setQuantity(0);
      }
    }
  };

  const handleClick = () => {
    // update cart
    dispatch(
      addProduct({
        ...product,
        quantity,
        color , 
        size
      })
    );
  };
  return (
    <Container>
      <Announcement />
      <Navbar />
      <Wrapper>
        <ImgContainer>
          <Image src={product.img} />
        </ImgContainer>
        <InfoContainer>
          <Title>{product.title}</Title>
          <Desc>{product.desc}</Desc>
          <Price>$ {product.price}</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>

              {product.color?.map((c) => (
                <FilterColor color={c} key={c} onClick={() => setColor(c)} />
              ))}
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize onChange={(e) => setSize(e.target.value)}>
                {product.size?.map((s) => (
                  <FilterSizeOption key={s}>{s}</FilterSizeOption>
                ))}
              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <Remove onClick={() => handleQuantity("dec")} />
              <Amount>{quantity}</Amount>
              <Add onClick={() => handleQuantity("inc")} />
            </AmountContainer>
         { user ?  <Button onClick={handleClick}>Add to Cart</Button> : <Login href="/login">login now after add cart</Login>}

          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};
