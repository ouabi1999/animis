import React, {useContext, useState, Fragment, useEffect}  from 'react'
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
    const [delivery, setDelivery] = useState(0)
    const [inputRequired, setInputRequired] = useState(false)
  
    const cartItems =  useSelector((state) => state.cart.cartItems)

    const handleChange = (event, value) => {
      setShippingMethod(event.target.name)
      setShippingPrice(event.target.value)
      setDelivery(value)
      setInputRequired(false)
      setFormData({...formData, shippingMethod, shippingPrice, deliveryTime:delivery })
    }

    const nextStep = () =>{
      const totalPrice = Math.round( (Number(total) + Number(formData.shippingPrice)) * 100)
      if(formData.shippingMethod === null ){
        setInputRequired(true)
        
      }else{
        setActiveStepIndex(activeStepIndex + 1)
        console.log(formData)

        setFormData({...formData, totalPrice})
        
      }
     

  }
  useEffect(() => {
   /* return () => {
      setFormData({...formData, shippingMethod:null})
    }*/
  }, [])
  

  return (

    <ShippingMethods>

      <div className='header'>
        <h5>Available shipping methods</h5>
        <InfoIcon className='info-icon' />
      </div>

      {cartItems[0].shippingInfo.length >= 1 ? (

        cartItems[0].shippingInfo?.map((item, index) => {
          return (
            <div className='methods_container' key={index}>
              <div className='shipping-type'>

                <span className='shipping-method'>
                  {item.type.toUpperCase()}
                </span>

                <span className="shipping-time">
                  {item.from + " - " + item.to + " " + "Days"}
                </span>

              </div>
              <div>
                <span>${item.price}</span>
                <Radio
                  style={inputRequired ? { color: "red" } : {}}
                  name={item.type}
                  checked={formData.shippingMethod === item.type}
                  onChange={(e) => handleChange(e, (item.from + " - " + item.to + " " + "Days"))}
                  value={item.price}
                  inputProps={{ 'aria-label': 'A' }}
                />
              </div>
            </div>
          )
        })
      ) :
        <div className='methods_container' >
          <div className='shipping-type'>

            <span className='shipping-method'>
              {"e-packet".toUpperCase()}
            </span>

            <span className="shipping-time">
               15 - 30 Days
            </span>

          </div>
          <div>
            <span>$0.00 </span>
            <Radio
              style={inputRequired ? { color: "red" } : {}}
              name= "e-packet"
              checked={formData.shippingMethod === "e-packet"}
              onChange={(e) => handleChange(e, ("15 - 30 Days"))}
              value={0.00}
              inputProps={{ 'aria-label': 'A' }}
            />
          </div>
        </div>
      }
      <Buttons_container>
        <button className='button' onClick={() => setActiveStepIndex(activeStepIndex - 1)}>Back</button>
        <button className="button" onClick={nextStep} type="submit">Next</button>
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
    .header{
      display:flex;
      align-items:center;
      .info-icon{
        color:gray;
      }
    }
    .shipping-type{
      display:flex;
      gap:10px;
    }
    .shipping-time{
         font-size:0.8rem;
         color:gray;
    }
    .shipping-method{
        font-size:1rem;
        width:180px;
        font-family:monospace;
        font-weight:900
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
  @media only screen and (max-width: 500px){
      &{
        width:100%;
      }
    .shipping-method{
          display:none;
     } 
    }
   `

const Buttons_container = styled.div`
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