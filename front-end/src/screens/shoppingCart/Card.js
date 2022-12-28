import React from 'react';

import FlipMove from "react-flip-move"
import { removeFromCart, addQuantity, subtractQuantity } from "../../features/shopping_cart/cartSlice"
import DeleteIcon from '@mui/icons-material/Delete';
import styled from 'styled-components';
import EmptyCart from './emptyCart';
import ProductSubtotal from './ProductSubtotal';
import { useLayoutEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


function Card() {

  const [formData, setFormData] = useState({
    index: 0,
    product: null
  })

  const dispatch = useDispatch()
  const cartItems =  useSelector((state) => state.cart.cartItems)
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [])



  const { product } = formData;
  return (
    <Container>

      <h2 style={{ fontFamily: "sans-serif" }}>Shopping Cart ({cartItems?.length})</h2>
      {cartItems?.length === 0 ? (
        <EmptyCart />
      )
        :
        (
          <div>

            <Wrap>
             
              <Wrapper>
                

                  {cartItems?.map(item => {
                    return (

                      <div key={item.id} className="product-container">
                        <div className="product-img">
                          <img src={item.colors[item.selectedColor]} alt={item.title} />

                        </div>

                        <div className='flex-container'>

                          <div className="first-child">
                            <span>

                              {item.title}
                            </span>
                            <div className="delete-button">
                              <button onClick={() => dispatch(removeFromCart(item))}>
                                <DeleteIcon />
                              </button>
                            </div>

                          </div>
                          <div className="selected-size">
                            <span>

                              {item.sizes[item.selectedSize]}
                            </span>


                          </div>
                          <div className="thired-child">
                            <span className="price"> US ${item.price}</span>
                            <div className="Quantity">
                              <button
                                className="subtract-quantity-button"
                                onClick={() => dispatch(subtractQuantity(item))}>
                                -
                              </button>
                              <span>{item.selectedQuantity}</span>
                              <button
                                className="add-quantity-button"
                                onClick={() => dispatch(addQuantity(item))}>
                                +
                              </button>
                            </div>

                          </div>





                          {/*this.props.cartItems.cartItems.length !== 0 && (
                              <div className="subtotal">
                                {" "}
                                <span>${item.subtotal.toFixed(2)}</span>
                              </div>
                            )*/}

                        </div>
                      </div>

                    )
                  })}


              </Wrapper>

              <ProductSubtotal
                cartItems={cartItems}

              />

            </Wrap>

          </div>
        )}


    </Container>
  )
}



export default Card

const Container = styled.div`
  background-color: #fff;
  min-height:90vh;
  min-width:320px;
  padding-bottom:60px;
  background-color:rgba(250, 250, 250, 0.4);
 
  
  
  h2 {
      font-weight:bolder;
      color:#000;
      margin-top:0;
      padding: 15px 35px;
      background:#fff;
      
}



 
.cartnumber{
  margin:20px 35px;
  font-size: large;
  font-weight: bold;
  text-shadow: 10px 8px  4px rgb(85, 84, 84);
  letter-spacing: 1px;
}
.cartnumber>span{
  color:red
}

.delete-button>button{
  
  border:none;
  color:#000;
  background:none;
 
}

.delete-button>button:hover{
  color:tomato
}





`
const Wrap = styled.div`
   width:95vw;
   margin:auto;
  
   display:flex;
   @media only screen and (max-width: 1200px){

  &{
        flex-direction:column;
        
   }
   


}   

`
const Wrapper = styled.div`
    position:relative;
    box-shadow: rgba(60, 64, 67, 0.12) 0px 1px 2px 0px, rgba(60, 64, 67, 0.12) 0px 2px 6px 2px;
    background:#ffff;
    margin-right:45px;
    @media only screen and (max-width: 1200px){


    &{
     margin-right:0;
  }


} 

    .product-container{
        display:flex;
        padding:10px;
        border-radius:4px;
        border-bottom:1px solid lightgray;
       
    }

    .flex-container{
      display:flex;
      flex-direction:column;
      max-width:768px;
      width:calc(95vw - 100px);
      min-width:175px;
    
      
     

    }
    
.product-img{
  display:flex;
  align-items:center;
  
}

.product-img img{
  width:100px;
  height:120px;
  box-shadow: rgba(60, 64, 67, 0.12) 0px 1px 2px 0px, rgba(60, 64, 67, 0.40) 0px 2px 6px 2px;
  margin-right:10px;
  object-fit:cover;
}



.product-img div{
       display:flex;
       flex-direction:column;
 
  

      }

    .first-child{
      display:flex;
      align-items:center;
      justify-content: space-between;
      width:100%;
      
      
      
    }
    .first-child span{
      text-overflow:ellipsis;
      white-space: nowrap; 
      overflow: hidden;
      font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      opacity:0.6;

    }

    .selected-size{
      font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
      text-transform:uppercase;
      color:rgb(20, 51, 102);
    }

    .price{
      font-family:'Trebuchet MS', sans-serif;
      margin-top:8px;
    }

    .thired-child{
         display:flex;
       
         justify-content: space-between;
         align-items:center;
    }

    .Quantity{
 
        border: 1px solid rgb(196, 193, 193);
        display:flex;
        justify-content: space-between;
        border-radius: 4px;
        align-items: center;
        font-size: 20px;
        font-weight: bold;
        width:85px;
        height:25px; 
      
}
    .subtract-quantity-button{
    border-bottom-left-radius: 4px;
    border-top-left-radius: 4px;
    border:none;
    width:25px;
    outline-style: none; 
    height:100%;
     
  }
  
  .add-quantity-button{
    border:none;
    border-bottom-right-radius: 4px;
    border-top-right-radius: 4px;
    width:25px;
    outline-style: none;
    height:100%;
    
  }

  .Quantity button:hover{
    color:white;
    background-color:rgb(199, 196, 196)
   }
   
   .Quantity>span{
    
     text-align: center;
     font-size: small;
     color:blue
   }

  
  

`