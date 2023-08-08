import styled from "styled-components";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Announcement from "../components/Announcement";
import { Add, Remove } from "@material-ui/icons";
import { mobil , tablet } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct} from '../redux/apiCalls'
import StripeCheckout  from 'react-stripe-checkout'


//const kEY = process.env.REACT_APP_STRIPE;

const Constainer = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobil({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  ${tablet({ fontSize : "10px"})}
  ${mobil({fontSize : "10px" , padding : "8px"})}
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;
const TopTexts = styled.div`
  ${mobil({ display: "none" })}
`;

const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
  ${tablet({ fontSize : "15px"})}
`;
const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobil({ flexDirection: "column" })}
  ${tablet({ flexDirection: "column" })}

`;
const Info = styled.div`
  flex: 3;
`;
const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobil({ flexDirection: "column" })}
`;
const ProductDetails = styled.div`
  flex: 2;
  display: flex;
  ${mobil({ flexDirection: "column" })}
`;

const Image = styled.img`
  width: 250px;
  border-radius : 10px;
  margin : 10px;
  ${tablet({ width: "340px" })}
  ${mobil({ margin : "20px" })}
`;

const Details = styled.div`
  display: flex;
  padding: 20px;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span`
font-size : 15px;
`;

const ProductId = styled.span`
font-size : 15px;
`;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span`
font-size : 15px;
margin : 0px;
`;

const PriceDetails = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  ${mobil({ marginLeft: "170px",  })}
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  ${mobil({ margin: "0px",  })}
`;
const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;

  ${mobil({ fontSize : "20px"})}
  ${tablet({ fontSize : "18px" })}
`;
const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${tablet({ fontSize : "22px" })}
  ${mobil({  fontSize : "20px" , marginRight : "360px"})}
`;
const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
  ${tablet({ margin : "0px"})}
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
  ${tablet({ fontSize : "25px"})}
`;
const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  ${tablet({ fontSize : "15px" ,padding : "8px", width : "80%"})}
  &:hover {
    ${mobil({ backgroundColor: "blue" })}
    ${tablet({ backgroundColor: "blue" })}
  }
`;

const DeleteCart = styled.span`
border : 1px solid blue;
color : blue;
padding : 10px;
margin : 140px 10px 10px 10px;
border-radius : 10px;
cursor : pointer;
${tablet({ fontSize : "12px"})}
&:hover{
  color : teal;
  border : 1px solid teal;
  background-color : black;
}
`
const Bold = styled.b`
margin : 0px;`

const SummaryItemText = styled.span`
${tablet({ fontSize : "15px" , margin : "0px" , padding : "0px"})}
`;

const SummaryItemPrice = styled.span`
${tablet({ fontSize : "15px" , margin : "0px" , padding : "0px"})}

`;

const Cart = () => {
  const cart = useSelector(state=> state.cart )
  const dispatch = useDispatch();
  const handleCartDelete = (productId)=>{
    deleteProduct(dispatch ,productId )
  }
  return (
    <Constainer>
      <Announcement />
      <Navbar />
      <Wrapper>
        <Title>Your BAG</Title>
        <Top>
          <TopButton>CONTINUE SHOPING</TopButton>
          <TopTexts>
            <TopText>Shopping Bag(2)</TopText>
            <TopText>Your Wishlist (0)</TopText>
          </TopTexts>
          <TopButton type="filled">CHACKOUT NOW</TopButton>
        </Top>
        <Bottom>
          <Info>

           { cart.products.map(product=>(

             <Product>
              <ProductDetails>
                <Image src={product.img} />
                <Details>
                  <ProductName>
                    <Bold>Product:</Bold> {product.title}
                  </ProductName>
                  <ProductId>
                    <Bold>ID:</Bold> {product._id}
                  </ProductId>
                  <ProductColor style={{margin : "0px"}} color={product.color} />
                  <ProductSize>
                    <Bold>Size:</Bold> {product.size}
                  </ProductSize>
                </Details>
              </ProductDetails>
              <PriceDetails>
               
                <ProductAmountContainer>
                  <Add style={{ fontSize : "18px"}} />
                  <ProductAmount>{product.quantity}</ProductAmount>
                  <Remove  />
                </ProductAmountContainer>
                <ProductPrice>$ {product.price * product.quantity}</ProductPrice>
                <DeleteCart onClick={()=>handleCartDelete(product) } >Remove from Cart</DeleteCart>
              </PriceDetails>
            </Product>
             )) 
}
            <Hr />
           
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated shipping</SummaryItemText>
              <SummaryItemPrice>$ 5.80</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ -5.80</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>

            <Button>Checkout Now</Button>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Constainer>
  );
};

export default Cart;
