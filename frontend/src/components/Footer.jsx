import styled from "styled-components";
import {
  Instagram,
  Facebook,
  Twitter,
  Pinterest,
  Place,
  Phone,
  Email,
} from "@material-ui/icons";
import { Data } from "../sliderData";
import { mobil, tablet } from "../responsive";
import {Link} from 'react-router-dom'

const Container = styled.div`
  display: flex;
  ${mobil({ flexDirection: "column" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
  ${tablet({ width : "50px"})}
`;
const Center = styled.div`
  flex: 1;
  padding: 20px;
  ${mobil({ display: "none" })}
`;
const Right = styled.div`
  flex: 1;
  padding: 20px;

  ${mobil({ backgroundColor: "#fff8f8" })}
`;
const Logo = styled.h1`
  ${tablet({ fontSize : "30px"})}
`;
const Desc = styled.p`
  margin: 20px 0px;
  ${tablet({ fontSize : "20px"})}
`;
const Title = styled.h3`
  margin-bottom: 30px;
`;

const List = styled.ul`
  margin: 0px;
  padding: 0px;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
 
`;
const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
  ${tablet({ fontSize: "18px" })}
`;
const SocialContainer = styled.div`
  display: flex;
`;
const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor : pointer;
  ${tablet({ marginRight: "5px" })}
`;
const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const Payment = styled.img`
  width: 70%;
`;

function Footer() {
  const style = {color : "black" , textDecoration : "none"}
  return (
    <Container>
      <Left>
        <Logo>Bhupendra Namdev</Logo>
        <Desc>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deserunt,
          dolor!
        </Desc>
        <SocialContainer>
          <SocialIcon color="385999">
            <Facebook  style={{ fontSize : "30px"}} />
          </SocialIcon>
          <SocialIcon color="E4405F">
            <Instagram />
          </SocialIcon>
          <SocialIcon color="55ACEE">
            <Twitter />
          </SocialIcon>
          <SocialIcon color="E4405F">
            <Pinterest />
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>UseFul Links</Title>
        <List>
          <ListItem><Link style={style} to={'/'}>Home</Link></ListItem>
          <ListItem><Link style={style} to={'/cart'}>Cart</Link></ListItem>
          <ListItem> <Link style={style} to={'/products/men'}> Men Fashion</Link></ListItem>
          <ListItem><Link style={style} to={'/products/women'}>Woman Fashion</Link></ListItem>
          <ListItem><Link  style={style}to={''}>Accessories</Link></ListItem>
          <ListItem><Link  style={style} to={'/'}> My Account</Link></ListItem>
          <ListItem><Link style={style} >Order Tracking</Link></ListItem>
          <ListItem><Link style={style} >Wishlist</Link></ListItem>
          <ListItem><Link style={style}  to={'/products/sports'}>Sports</Link></ListItem>
          <ListItem><Link style={style} >Terms</Link></ListItem>
        </List>
      </Center>
      <Right>
        <Title>Contact</Title>
        <ContactItem>
          {" "}
          <Place style={{ marginRight: "10px" }} /> 1410 kachgher road, lalmati
          jabalpur
        </ContactItem>
        <ContactItem>
          {" "}
          <Phone style={{ marginRight: "10px" }} /> +1 234 56 789
        </ContactItem>
        <ContactItem>
          <Email style={{ marginRight: "10px" }} /> Contact@bhupendra.dev
        </ContactItem>
        <Payment src={Data[0].paymentImg} />
      </Right>
    </Container>
  );
}

export default Footer;
