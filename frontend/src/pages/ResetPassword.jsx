import React, { useState } from 'react'
import styled from 'styled-components'
import { publicRequest } from '../requestMethods'
const Container = styled.div`
background-color : black;
height : 40vh;
padding : 200px;
`
const Form = styled.form`
padding : 20px;
margin : auto;
border : 1px solid red;
width : 400px;
height : 200px;
margin-top : 10px;
`
const Input = styled.input`
border : none;
padding : 10px;
outline : none;
color : yellow;
background-color : transparent;
`
const InputCont = styled.div`
border : 1px solid yellow;
margin : 10px;
`
const Button = styled.button`
padding : 10px;
background-color : transparent;
outline : none;
margin : 10px;
cursor : pointer;
border : 1px solid blue;
color : blue;

&:hover{
    border: 1px solid teal;
    color : teal;
}
`


const Error = styled.span`
color : red;
font-size : 12px;
padding : 0px 0px 0px 10px;
`

export const ResetPassword = () => {
    const [password , setPassword] = useState('')
    const [confirmPassword , setConfirmPassword] = useState('')
    const [error , setError] = useState('')

    const handleSubmit = async (e)=>{
        e.preventDefault()
        try{
            if(password.length <= 8){
                setError("your password must be 8 char long")
            }
            else if(password === confirmPassword){

               const res = await publicRequest.post('/reset-password' , password)
            }else {
             setError(" your password doesn't match")
            }
        
        }catch(err){
        setError(err.response.data)
        }
    }

  return (
    <Container>
        <Form onSubmit={handleSubmit}>
            <InputCont>
            <Input type='password' placeholder='Enter new password' required onChange={(e)=>setPassword(e.target.value)} />
            </InputCont>
            <InputCont>
            <Input type='text' placeholder='Confirm new password' required onChange={(e)=>setConfirmPassword(e.target.value)} />
            </InputCont>
          
            {error && <Error>{error}</Error>}  <br/>
            <Button type='submit'>Submit Now</Button>
        </Form>
    </Container>
  )

}
