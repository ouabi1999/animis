import React,{useEffect} from 'react'
import styled from 'styled-components'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useSelector } from "react-redux"
import { useState, useContext} from 'react';
import { OrderContext } from "../../App"
import { FormContext } from "./CheckoutContainer"
import { Link } from 'react-router-dom';



function ProductCart(props) {
 
  const {total} = useContext(FormContext);
  const {formData} = useContext(OrderContext);

  
  
  return (
    <Container>
      <div className='header-container'>
           
        <Link to = "/shopping-cart" >
        <div style = {{display:"flex", alignItems:"stretch", marginBottom:"3px"}}>
          <span>
            <ArrowBackIcon style={{width:"19px"}} />
          </span>
          <span>
          Back
        </span>
        </div>
        </Link>

        <div>
          <h3>CHECKOUT</h3>
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
                <tr className="child-container">
                  <td>
                    <div className='img-container'>
                      <img src={item.product_images[0]} alt="" />
                      
                    </div>

                    <div className="quantity">
                      <span>{item.selectedQuantity}</span>
                    </div>
                  </td>

                  <td className="product-title">
                  <span>{item.title}</span>
                  </td>

                  <td>
                    <span className='price'>${(item.price * item.selectedQuantity).toFixed(2)}</span>
                  </td>
                </tr>
              )
            })}
          </table>  
        </div>

        <div className='discount'>
          <input type="text" placeholder='Discount code' />
          <button   disabled="true" style={{ opacity:"0.8", cursor:"not-allowed"}} type="button"> Apply </button>
        </div>

        <Totals>
        <div>
              <span>
                Subtotal
              </span>
              <span>
               ${total}
              </span>
            </div>
            <div>
              <span>
                Shipping
              </span>
              <span>
                 ${formData.shippingPrice}
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

    h3{
      letter-spacing:2px;
      margin:0;
    }

    .header-container a {
      color:black;
    }
     .header-container{
      display:flex;
      align-items:center;
      padding: 16.50px 20px;
      border-bottom:1px solid gray;
      margin-bottom:10px;
      width:100%;
      box-shadow: 0px 0px 0px 0.5px rgba(50, 50, 93, 0.1),
      0px 2px 5px 0px rgba(50, 50, 93, 0.1), 0px 1px 1.5px 0px rgba(0, 0, 0, 0.07);
     }

     .header-container span{
      margin-top:10px;
     }
     .header-container img{
         width:220px;
         
         
     }
     .header-container div{
     
      margin: 0 auto;

     }
     .product-title{
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap; 
      width:280px;
      
   
    }
    .product-title span{
       width:100px;
      font-size:10px;
      
    }



`
const Wrraper = styled.div`
  
    width:75%;
    margin: 0 auto;

    .product-container{
        background:rgba(255, 255, 255, 0.5);
        border-radius:6px;
        box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
        padding:5px 10px;
    }
    .child-container{
      display:flex;
      align-items:center;
    }
   
    .product-container img{
     
      margin-right:10px;
      width:60px;
      height:75px;
      object-fit:cover;
      box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0,);
      border:1px solid lightgray;
      padding:1px;
    }
    .img-container{
     
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
      top:-90px;
      left:-6px;
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
      margin-right:8px;
      margin-bottom:3px;

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