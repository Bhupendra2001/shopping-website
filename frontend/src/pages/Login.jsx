import { useNavigate} from 'react-router-dom'
import styled from "styled-components";
import { mobil } from "../responsive";
import {login} from '../redux/apiCalls'
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: gray;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0px;
  padding: 10px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const Wrapper = styled.div`
  padding: 20px;
  width: 25%;
  background-color: white;
  ${mobil({ width: "75%" })}
`;
const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  cursor: pointer;
  text-decoration: none;
  color : blue;
`;

const ChangePassword = styled.span`
font-size : 12px;
color : black;
`
const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  color: white;
  background-color: teal;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled{
    color : green;
    cursor : not-allowed;
  }
`;

const Error = styled.span`
color : red;`
export const Login = () => {

  const [username , setUsername] = useState('')
  const [password , setPassword] = useState('')
 const [ error , setError] = useState(false)
  const dispatch = useDispatch()
  const {isFetching  } = useSelector((state)=> state.user)
  const nevigate =  useNavigate()
  const handleClick = (e)=>{
  e.preventDefault()
  login(dispatch , {username, password }, nevigate , setError)
}

  return (
    <Container>
      <Wrapper>
        <Title>Login</Title>
        <Form>
          <Input placeholder="username"  required
          onChange={(e)=> setUsername(e.target.value)}
          />
          <Input placeholder="password" type="password" required
          onChange={(e)=> setPassword(e.target.value)}
          />
          <Button onClick={handleClick} disabled={isFetching}>LOGIN</Button>
        { error && <Error>{error}</Error>}
          <ChangePassword>Do Not You Remember the password? <Link href="/change">Forgot Password</Link></ChangePassword>
          <Link href="/register">CREATE A NEW ACCOUNT</Link>
        </Form>
      </Wrapper>
    </Container>
  );
};
