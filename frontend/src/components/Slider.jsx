import React, { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "@material-ui/icons";

import { sliderData } from "../sliderData";
import styled from "styled-components";
import { mobil } from "../responsive";
import { tablet } from "../responsive";
import {useNavigate } from 'react-router-dom'

const Container = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  position: relative;
  overflow: hidden;
  ${mobil({ display: "none" })}
  ${tablet({ height : "70vh" , marginTop : "0px"  })}

`;
const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: all 1.5s ease;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
`;

const Arrowleft = styled.div`
  width: 50px;
  height: 50px;
  background-color: rgb(201, 18, 18);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 10px;
  opacity: 0.5;
  margin: auto;
  cursor: pointer;
  z-index: 2;
  ${tablet({ top : "150px" ,  backgroundColor : 'yellow'})}
`;
const Arrowright = styled.div`
  width: 50px;
  height: 50px;
  background-color: rgb(237, 22, 22);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 10px;
  opacity: 0.5;
  margin: auto;
  cursor: pointer;
  z-index: 2;
  ${tablet({ top : "150px" ,  backgroundColor : 'yellow'})}
`;
const Slide = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  
`;

const ImagContainer = styled.div`
flex: 1;

`;
const Image = styled.img`
  height: 80vh;
  width: 70vw;
  ${tablet({ height : "70vh", width : "60vw" })}

`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 40px;
  
  ${tablet({ padding : "30px" , marginBottom : "150px" })}
`;

const Title = styled.h1`
  font-size: 50px;
  ${tablet({ fontSize : "30px" })}
`;

const Description = styled.p`
  margin: 50px 0px;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 3px;
  ${tablet({ fontSize : "18px" , marginTop : "40px"})}
`;

const Button = styled.button`
  padding: 10px;
  font-size: 20px;
  background-color: transparent;
  cursor: pointer;
  ${tablet({fontSize : "15px"})}
`;

function Slider() {
  const [slideIndex, setSlideIndex] = useState(0);

  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
    } else {
      setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
    }
  };
  const nevigate = useNavigate()

  const handleShop = (e)=>{
      nevigate('/products/men')
  }
  useEffect(() => {
    const interval = setInterval(() => {
      
      setSlideIndex((prevIndex) => (prevIndex < 2 ? prevIndex + 1 : 0));
    }, 3000);

    
    return () => clearInterval(interval);
  }, [slideIndex]);

  return (
    <Container>
      <Arrowleft onClick={() => handleClick("left")}>
        <ArrowLeft />
      </Arrowleft>

      <Wrapper slideIndex={slideIndex}>
        {sliderData.map((item) => (
          <Slide bg={item.bg} key={item.id}>
            <ImagContainer>
              <Image src={item.img}  />
            </ImagContainer>

            <InfoContainer>
              <Title>{item.title}</Title>
              <Description>{item.desc}</Description>
              <Button onClick={handleShop}>SHOP NOW</Button>
            </InfoContainer>
          </Slide>
        ))}
      </Wrapper>

      <Arrowright onClick={() => handleClick("right")}>
        <ArrowRight />
      </Arrowright>
    </Container>
  );
}

export default Slider;
