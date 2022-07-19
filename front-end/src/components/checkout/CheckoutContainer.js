import React from 'react'
import styled from 'styled-components'
import { createContext, useState, useEffect, useContext } from 'react'
import {Formik} from "formik"
import * as yup from "yup"
import { useSelector, useDispatch } from 'react-redux'

import Stepper from './Stepper'
import Steps from './steps/Steps';
import ProductCart from './productCart';
import { useNavigate } from 'react-router-dom'


export const FormContext = createContext();
function CheckoutContainer() {
 const cartItems =  useSelector((state) => state.cartItems.cartItems)
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [total, setTotal] = useState(cartItems.reduce((a, c) => a + c.price * c.count, 0).toFixed(2))
  const navigate = useNavigate()
  useEffect(() => {
    
  
        if(cartItems.length === 0){
        navigate("/") 
        console.log("test")
     }
      
  }, [])
  
  return (
    
    <FormContext.Provider value={{ activeStepIndex, setActiveStepIndex, total, setTotal}}>

    
    {cartItems.length === 0 ?(
      ""
    )
    
    :
    <Conatiner>
      <Left_Section>
        <ProductCart cartItems = {cartItems}/>
      </Left_Section>
      <Right_Section>
        <Stepper/>
        <Steps/>
      </Right_Section>
        </Conatiner>
  }

    
    
    </FormContext.Provider>
    
  )
}

export default CheckoutContainer
const Conatiner = styled.div`
    width:100%;
    margin:0 auto;
    background:#fff;
    display:flex;
    flex-wrap:wrap;
 


   

`
const Left_Section = styled.div`
  flex:1;
   
`
const Right_Section = styled.div`
    min-width:500px;
    min-height:100vh;
    flex:1;
    position:relative;
    box-shadow: 0px 0px 0px 0.5px rgba(50, 50, 93, 0.1),
        0px 2px 5px 0px rgba(50, 50, 93, 0.1),
        0px 1px 1.5px 0px rgba(0, 0, 0, 0.07);



`