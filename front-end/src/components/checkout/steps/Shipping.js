import React, {useContext, useState, Fragment}  from 'react'
import styled from "styled-components"
import InfoIcon from '@mui/icons-material/Info';
import { FormContext } from '../CheckoutContainer';
import {OrderContext} from "../../../App"
import Radio from '@mui/material/Radio';
import {useSelector} from "react-redux"

function Shipping() {
    const { activeStepIndex, setActiveStepIndex, total} = useContext(FormContext);
    const { formData, setFormData} = useContext(OrderContext);
    const [shippingMethod, setShippingMethod] = useState("")
    const [shippingPrice, setShippingPrice] = useState(0)
    const [shippingDelivery, setShippingDelivery] = useState(0)
    const cartItems =  useSelector((state) => state.cart.cartItems)

    const handleChange = (event) => {
      setShippingMethod(event.target.name)
      setShippingPrice(event.target.value)
      setFormData({...formData, shippingMethod, shippingPrice})
    }
    const nextStep = () =>{
      const totalPrice = Math.round( (Number(total) + Number(formData.shippingPrice))* 100)
      setActiveStepIndex(activeStepIndex + 1)
      console.log(formData)
      setFormData({...formData, totalPrice})

    }

  return (

    <ShippingMethods>

    <div className='header'>
      <h5>Available shipping methods</h5>
      <InfoIcon className='info-icon' />
    </div>
    
    
      {cartItems[0].shippingInfo.map(item =>{
        return(

          <div className='methods_container'>
            <div className='shipping-type'>
              <span>
                <span style={{
                          fontSize:"14px",
                          fontFamily:"-moz-initial",
                          fontWeight:"900"}}>
                          {item.type.toUpperCase()}
                  </span>{" "}{item.delivery}
              </span>
            </div>
            <div>
              <span>${item.price}</span>
              <Radio
                name={item.type}
                checked={formData.shippingMethod === item.type}
                onChange={handleChange}
                value={item.price}
                inputProps={{ 'aria-label': 'A' }}
              />
            </div>
          </div>
        )
      })}
    <Buttons_container>
            <button className='button' onClick={()=> setActiveStepIndex(activeStepIndex - 1)}>Back</button>
            <button  className="button" onClick={nextStep} type="submit">Next</button>
    </Buttons_container>
  </ShippingMethods>
  )
}

export default Shipping

const ShippingMethods = styled.div`
    border:1px solid lightgray;
    width:85%;
    background:#fff;
    margin:15px 0;
    box-shadow: 0px 0px 0px 0.5px rgba(50, 50, 93, 0.1),
    0px 2px 5px 0px rgba(50, 50, 93, 0.1), 0px 1px 1.5px 0px rgba(0, 0, 0, 0.07);

    padding: 5px 10px;
    border-radius:6px;
    .header{
      display:flex;
      align-items:center;
    }
    
  .methods_container{
       position:relative;
       display:flex;
       align-items:center;
       justify-content:space-between;
       border:1px solid lightgray;
       border-radius:6px;
       padding:3px 8px;
       margin-bottom:10px;
  }
  .methods_container img{
    width:80px;
    height:40px;
    object-fit:cover;
    position:absolute;
    top:2px;
    left:-5px;
    
  }

  .shipping-type:nth-child(1){
       font-size:12px;
  }
    .info-icon{
      color:gray;
    }
    input{
      
    }
    strong{
      
      font-weight:bold;
      font-family:arial;
     

    }
    table{
      border-collapse: collapse;
      width:100%;
      
      
    }
    td {
    border:1px solid lightgray;
     text-align: left;
     padding:15px 5px;
     
   }
   td:nth-child(2){
    border-left:none;
   }
   `
   
const Buttons_container =  styled.div`
  display:flex;
  justify-content:space-evenly;
  button{
    color:#fff;
    background:blue;
    padding:8px 15px;
    border-radius:6px;
    margin-top:10px;
    font-size: 17px;

    &:hover{
      opacity:0.8;
    }
  }
 


`