import React,{useEffect} from 'react'
import styled from 'styled-components'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useSelector } from "react-redux"
import { useState, useContext} from 'react';
import { OrderContext } from "../../App"
import { FormContext } from "./CheckoutContainer"



function ProductCart(props) {
  const {total} = useContext(FormContext);
  const {formData} = useContext(OrderContext);
  useEffect(() => {
    console.log(props.cartItems)
  }, [])
  
  
  return (
    <Container>

      <div className='header-container'>
        <span>
          <ArrowBackIcon />
        </span>
        <span>
          Back
        </span>
        <div>
          <img src="./CORAZON_LOGO-01.png" alt="" />
        </div>
      </div>
      
      <Wrraper>

        <div className="product-container">
          <table>
            <tr>
              <th></th>
              <th></th>  
            </tr>
            {props.cartItems?.map(item => {
              return (
                <tr>
                  <td>
                    <div className='img-container'>
                      <img src={item.product_images[0]} alt="" />
                      <div>
                        <p>{item.title}</p>
                      </div>
                    </div>
                    <div className="quantity">
                      <span>{item.count}</span>
                    </div>
                  </td>
              
                  <td>
                    <span>${item.price * item.count}</span>
                  </td>
                </tr>
              )
            })}
          </table>  
        </div>

        <div className='discount'>
          <input type="text" placeholder='Discount code' />
          <button type="button"> Apply </button>
        </div>

        <Totals>
        <div>
              <span>
                Subtotal
              </span>
              <span>
               $2
              </span>
            </div>
            <div>
              <span>
                shipping
              </span>
              <span>
                 Free
              </span>
            </div>
          <div className='Total-price'>
            <span>
              Total
            </span>
            <span>
              ${Number(total) + Number(formData.shippingPrice)}
            </span>
          </div>
        </Totals>
        
      </Wrraper>   
    </Container>
  )
}

export default ProductCart

const Container = styled.div`
     
     height:100%;
    
     background: rgb(63,231,251);
     background: linear-gradient(90deg, rgba(63,231,251,0.4) 0%, rgba(68,55,251,0.5) 100%);
     display:flex;
     flex-direction:column;
    


     .header-container{
      display:flex;
      align-self:center;
      padding: 15px 20px;
      border-bottom:1px solid gray;
      margin-bottom:10px;
      width:100%;
      box-shadow: 0px 0px 0px 0.5px rgba(50, 50, 93, 0.1),
      0px 2px 5px 0px rgba(50, 50, 93, 0.1), 0px 1px 1.5px 0px rgba(0, 0, 0, 0.07);
      
     }
     .header-container span{
      margin-top:15px;
     }
     .header-container img{
         width:220px;
         
         
     }
     .header-container div{
     
      margin: 0 auto;

     }


`
const Wrraper = styled.div`
  
    width:75%;
    margin: 0 auto;

    .product-container{
        background:rgba(255, 255, 255, 0.5);
        border-radius:6px;
        box-shadow: 0px 0px 0px 0.5px rgba(50, 50, 93, 0.1),
        0px 2px 5px 0px rgba(50, 50, 93, 0.1), 0px 1px 1.5px 0px rgba(0, 0, 0, 0.07);
        
        padding:5px 10px;
    }

   
    .product-container img{
      margin-bottom:6px;
      margin-right:10px;
      width:60px;
      height:75px;
      object-fit:cover;
      box-shadow: 2px 4px 8px rgb(12, 12, 12 , 0.5);
    }
    .img-container{
      display:flex;
      align-items:center;
    }
     .quantity{
      border-radius:50%;
      padding:1px 4px;
      font-size:12px;
      width:20px;
      height:20px;
      text-align:center;
      background:#000;
      color:#ffff;
      position:relative;
      top:-96px;
      left:-8px;
     }
    table{
      width:100%;
    }

     p{
      font-size:13px;
      
    }
    td:nth-child(3){
      text-align:center;
      font-size:13px;
    
    }
   
    .discount{
     
      margin-top:10px;
      background:#fff;
   
      padding: 15px 10px;
      border-radius:6px;
    }
    .discount input{
      height:40px;
      width:87%;
      padding-left:5px;
      border-radius:4px;
      border:1px solid lightgray;

      &:focus{
        border:1px solid lightblue;
        outline-style:none;
        
      }
    }
    
    .discount button{
      height:40px;
      background:#000;
      color:#ffff;
      border-radius:4px;
      margin-left:8px;
      padding:0 10px;
      
    }
    
`


const Totals = styled.div`
    margin:15px 0;
    width:100%;
    background:#fff;
    border-radius:6px;
    padding:15px;
    & div{
      display:flex;
      justify-content:space-between;
      
      padding:10px 5px;
      margin-bottom:4px;
    }
    & div:last-child{
         border-top:1px solid lightgray;
    }

    .Total-price{
         font-size:24px;
         font-weight:bold;

    }

    



`