import styled from "styled-components";
import { mobil } from "../responsive";
import { useState } from "react";
import { publicRequest } from "../requestMethods";
import { Link } from "react-router-dom";
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
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;
const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;
const Wrapper = styled.div`
  padding: 20px;
  width: 40%;
  background-color: white;
  ${mobil({ width: "75%" })}
`;
const Agreement = styled.span`
  font-size: 12px;
  margin: 10px 0px;
`;
const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  color: white;
  background-color: teal;
  cursor: pointer;
`;

const Error = styled.span`
color : red;
font-size : 14px;
margin-top : 4px;
`

export const Register = () => {

  const [error , setError] = useState('') 
  const [ inputs, setInputs] = useState({
    firstName : "",
    lastName : "",
    email : "",
    password : "",
    confirmPassword : ""
  })

  console.log(inputs.firstName , inputs.lastName)
  const HandleChange = (e)=>{
    setInputs({
      ...inputs,
      [e.target.name] : e.target.value
    })
  }

  const handleSubmit =  async (e)=>{
    e.preventDefault()
    try{
      
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!inputs.email.match(emailPattern)){
    setError('please enter valid email')
      }
      else if(inputs.password !== inputs.confirmPassword){
        setError('please enter same password')

      }else {
        const response = await publicRequest.post('/auth/register', inputs)
        if(response) alert(response.data.message)
      }

    }catch(error){
      setError(error.response.data)
    }

  }
  return (
    <Container>
      <Wrapper>
        <Title>Create An Account</Title>
        <Form onSubmit={handleSubmit}>
          <Input placeholder="first name" type="text" name="firstName" required onChange={HandleChange} />
          <Input placeholder="last name" type="text" name="lastName" required onChange={HandleChange} />
          <Input placeholder="email"  type="email" name="email"  required onChange={HandleChange} />
          <Input placeholder="password"  type="password" name="password" required onChange={HandleChange} />
          <Input placeholder="confirm password" type="password" required name="confirmPassword" onChange={HandleChange} />
         { error && <Error> {error}</Error>}
          <Agreement>
            By creating an account, i consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button type="submit">Register</Button>
          <Agreement>If already have an account <Link style={{textDecoration : "none" , color : 'blue'}} to='/login'>Login</Link> now.</Agreement>
        </Form>
      </Wrapper>
    </Container>
  );
};
