import { Send } from "@material-ui/icons";
import { mobil } from "../responsive";
import styled from "styled-components";
import { useState } from "react";
import { userRequest } from "../requestMethods";

import { BiHappy} from 'react-icons/bi'
import { BsFlower1} from 'react-icons/bs'

const Container = styled.div`
  height: 60vh;
  background-color: #fcf5f5;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Subcribe = styled.div`
 padding : 100px 10px 10px 100px;
 text-align : center;
 
`
const Title = styled.h1`
  font-size: 50px;
  margin-bottom: 20px;
  ${mobil({ fontSize: "35px" })}
`;
const Input = styled.input`
  border: none;
  flex: 8;
  padding-left: 20px;
`;
const Desc = styled.div`
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 20px;
  ${mobil({ textAlign: "center", fontSize: "15px" })}
`;

const Button = styled.button`
  flex: 1;
  border: none;
  background-color: teal;
  cursor : pointer;
  color: #fff;
`;
const InputContainer = styled.div`
  width: 50%;
  height: 40px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  border: 1px solid lightgray;
  ${mobil({ width: "90%" })}
`;

function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubscribe = async () => {
    // Simple email validation using regular expression

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.match(emailPattern)) {
      try {
        const res = await userRequest.post(
          `/Email/${email}`
        );
        if (res) {
          setSubscribed(true);
        }
      } catch (err) {
        alert(err.response.data.message);
      }
    } else {
      alert("Please enter a valid email address.");
    }
  };

  return (
    <Container>
      {!subscribed ? (
        <>
          <Title>Newsletter</Title>
          <Desc>Get timely updates from your favorite projects</Desc>
          <InputContainer>
            <Input
              type="email"
              placeholder="your email"
              value={email}
              onChange={handleEmailChange}
            />
            <Button onClick={handleSubscribe}>
              <Send />
            </Button>
          </InputContainer>
        </>
      ) : (
        <Subcribe>
          <Title>Thank you for subscribing!</Title>
          <BsFlower1 style={{ color: "yellowgreen" }} />{" "}
          <BiHappy style={{ color: "teal" }} />{" "}
          <BsFlower1 style={{ color: "yellowgreen" }} />
        </Subcribe>
      )}
    </Container>
  );
}

export default Newsletter;
