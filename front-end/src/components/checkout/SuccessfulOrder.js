import { useState, useEffect, useContext } from "react";
import React from 'react'
import { FormContext } from "./CheckoutContainer";
import { OrderContext } from "../../App"
import styled from "styled-components";
import { Link } from "react-router-dom";
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';


function SuccessfulOrder() {
  const {formData, setFormData } =  useContext(OrderContext);
  const [order, setOrder] = useState({})

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },

      body: JSON.stringify({
        userId: formData.userId,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        city: formData.city,
        address1: formData.address1,
        address2: formData.address2,
        zip: formData.zip,
        state: formData.state,
        country: formData.country,
        shippingMethod: formData.shippingMethod,
        shippingPrice: formData.shippingPrice,
        totalPrice: formData.totalPrice

      }),
    })
      .then((res) => res.json())
      .then((data) => setOrder(data));
  }, []);

  return (
    <Container>
      <div className="close-container">
        <Link to = "/">
         <DisabledByDefaultIcon className="close-icon"/>
      </Link>

      </div>
      <Wrapper>

      
      </Wrapper>
      <div className="image">
        <img src="./images/thankyou.jpg" alt="" />
      </div>
      
    </Container>
  )
}

export default SuccessfulOrder

const Container = styled.div`
     position:relative;
     width:100%;
     height:100vh;
  
    .image{
     display:flex;
     justify-content:center;
     
    
     
    }
    img{
      width:600px;
      height:400px;
      object-fit:cover;
      box-shadow: 2px 4px 8px rgb(12, 12, 12 , 0.5);
      border-radius:6px;  
      position:absolute; 
      top:15%;
     
    }
    .close-container{
      position:absolute;
      z-index:1;
      
    }
    .close-icon{
      font-size:40px;
      margin:15px 20px;
    }
  .close-icon:hover{
    color:lightblue;
    transition:250ms;
   }


`
const Wrapper = styled.div`
        background-image:url("./images/congratulation.jpg");
        height: 100vh; /* You must set a specified height */
        background-position: center; /* Center the image */
        background-repeat: no-repeat; /* Do not repeat the image */
        background-size: cover;
        opacity:.4
         
`