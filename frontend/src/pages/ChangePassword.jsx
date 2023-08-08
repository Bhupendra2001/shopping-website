import React, { useState } from 'react'
import styled from 'styled-components'
import { publicRequest } from '../requestMethods'

const Container = styled.div`

`
const Email = styled.input`

outline : none;
padding : 8px;
border-radius : 4px;
border : 1px solid gray;
color : teal;
margin-top : 4px;

`
const Wrapper = styled.div`
border : 1px solid red;
border-radius : 10px;
width : 250px;
height : auto;
padding : 20px;
margin : auto;
border-radius 
`

const Button = styled.button`
background-color : #fff;
border : 1px solid gray;
padding : 10px;
margin : 20px 0px;
 border-radius : 5px;
 cursor : pointer;
font-size : 12px;
 &:hover{
    color : blue;
    border : 1px solid blue;
 }
`
const Head = styled.span`
font-size : 20px;

`
const Heading = styled.p`
text-align : center;

`

const Error = styled.span`
color : red;
padding : 0px;
margin : 0px;
font-size : 15px;
`


export const ChangePassword = () => {

  const [username , setUsername] = useState('')
  const [error , setError ] = useState('')
  const [isFetch , setIsFetch ] = useState(false)
  
  const handleClick = async (e)=>{
    try{

      const res = await publicRequest.post(`/forgotPassword/${username}`)
      if(res){
        setIsFetch(true)
      }
    }catch(err){
      setError(err.response.data)
    }
  }
  return (
    <Container>
      { !isFetch ? (

      <>
       <Heading> Shopping  website</Heading>
        <Wrapper>
            <Head>Enter your name that register in your account</Head>
        <Email type='text' placeholder='Enter username' onChange={(e)=>setUsername(e.target.value)}/>
        {error && <Error>{error}</Error>}
        <Button onClick={handleClick}>Send password reset  Email</Button>
        </Wrapper>
      </>
      ) : <><p>password Reset Link sended to your email</p>
      </>}
    </Container>
  )
}
