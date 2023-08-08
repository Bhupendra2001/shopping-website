import styled from "styled-components";
import { mobil } from "../responsive";
import { tablet } from "../responsive";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import { Badge } from "@material-ui/core";
import { Link } from "react-router-dom";
import {useDispatch, useSelector } from "react-redux";
import { Logout } from "../redux/apiCalls";
import {BiSolidUserCircle} from 'react-icons/bi'
import { useState } from "react";
import { MyAccount} from '../pages/MyAccount'
const Container = styled.div`
  height: 60px;

  ${mobil({ height: "50px" })}
  ${tablet({ height: "30px" })}
`;
const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobil({ padding: "10px 0px" })}
  ${tablet({ padding: "10px 0px" })}
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;
const Center = styled.div`
  flex: 1;
  text-align: center;
  ${mobil({ fontSize: "10px" })};
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  ${mobil({ flex: 2, justifyContent: "center", marginRight: "8px" })}
`;
const ManuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  color: black;
  ${mobil({ fontSize: "12px", marginLeft: "10px" })}
`;

const Input = styled.input`
  border: none;
  outline: none;

  ${mobil({ width: "60px" , marginLeft : "5px" })}
  ${tablet({ width: "130px" })}
`;

const Searchbox = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
  border-radius: 5px;
  ${mobil({ marginLeft: "0px"  })};
`;
const Title = styled.h1`
  font-weight: bold;
  ${mobil({ display: "none" })}
  ${tablet({ fontSize: "20px" })}
`;
const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobil({ display: "none" })}
`;

const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  const user = useSelector((state)=>state.user.currentUser)
 
  const dispatch = useDispatch()
  const [accountVisible, setAccountVisible] = useState(false);

  const toggleAccount = () => {
    setAccountVisible(!accountVisible);
  };

  const handleLogout = ()=>{
  Logout(dispatch )

  }

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>ENG</Language>

          <Searchbox>
            <Input placeholder="Search" />
            <Search style={{ color: "gray", fontSize: 16 }} />
          </Searchbox>
        </Left>
        <Center>
          <Title>Bhupendra Namdev</Title>
        </Center>

        <Right>
        {accountVisible && <MyAccount  />}
        { user &&  <BiSolidUserCircle  onClick={toggleAccount}  style={{fontSize : "30px" , cursor: "pointer", color : 'teal'}}/>}

         { !user && <ManuItem>
            <Link
              to="/register"
              style={{
                textDecoration: "none",
                color: "black",
                cursor: "pointer",
              }}
            >
              {" "}
              REGISTER{" "}
            </Link>
          </ManuItem>}

        { !user && <ManuItem>
            <Link
              to="/login"
              style={{
                textDecoration: "none",
                color: "black",
                cursor: "pointer",
              }}
            >
              SIGN IN
            </Link>
          </ManuItem>}

        {  user && <ManuItem>
            <Link onClick={handleLogout}
             to={'/login'}
             style={{
                textDecoration: "none",
                color: "black",
                cursor: "pointer",
              }}>LOGOUT</Link>
          </ManuItem>}

          <Link to="/cart">
            <ManuItem>
              <Badge badgeContent={quantity} color="primary">
                {" "}
                <ShoppingCartOutlined />{" "}
              </Badge>
            </ManuItem>
          </Link>


        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
