import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { HiOutlineMail } from "react-icons/hi";
import { BiUser } from "react-icons/bi";
import { FaRegUserCircle } from "react-icons/fa";

const Container = styled.div`
position: absolute;
top : 6%;
right : 200px;
z-index: 2;
`;
const Wrapper = styled.div`
  border: 1px solid gray;
  padding: 20px;
  width: 300px;
  height: 300px;
  margin: auto;
  border: 2px solid yellow;
  border-radius: 20px;
  background-color: orange;
  z-index : 9;

`;
const Image = styled.img``;

const Email = styled.span`
  margin-top: 20px;
`;
const UserName = styled.span`
  margin-top: 20px;
`;
const Cont = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;
`;
const Title = styled.h2`
  text-align: center;
  color: teal;
`;

export const MyAccount = () => {
  const user = useSelector((state) => state.user.currentUser);

  const style = {
    color: "blue",
    fontSize: "30px",
    border: "1px solid red",
    padding: "10px",
    borderRadius: "10px",
  };
  return (
    <Container>
      <Wrapper>
        <Title>My Account</Title>

        <Cont>
          <FaRegUserCircle
            style={{
              color: "gray",
              fontSize: "60px",
              border: "1px solid red",
              padding: "10px",
              borderRadius: "20px",
              marginLeft: "40%",
            }}
          />
        </Cont>

        <Cont>
          <BiUser style={style} />
          <UserName>{user.username}</UserName>
        </Cont>
        <Cont>
          <HiOutlineMail style={style} />
          <Email>{user.email}</Email>
        </Cont>
      </Wrapper>
    </Container>
  );
};
