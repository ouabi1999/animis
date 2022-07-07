import React, { Component } from 'react';

import FlipMove from "react-flip-move"
import { removeFromCart, addToCart, subtractQuantity } from "../../features/shopping_cart/cartSlice"
import { connect } from "react-redux"
import { loadStripe } from "@stripe/stripe-js";
import styled from 'styled-components';
import EmptyCart from './emptyCart';
import ProductSubtotal from './ProductSubtotal';
class Card extends Component {
  constructor() {
    super();
    this.state = {
      index: 0,
      product: null
    }
  }

  handelCheckoutSubmit = (e) => {
    const stripePromise = loadStripe("pk_test_51Kzld4FGZ1B5XcX95l9rrN89UMl5swzNbu2a5OVXSdGnLjA9ONctUbeoQ2hG6nV3RfOr0RxuDEL6D49myf72SwEo00iOZtxg26");

    e.preventDefault()
    fetch("/create-checkout-session", {
      method: "POST",
      headers: { 'Content-Type': 'text/plain' },
    })
      .then((result) => { console.log(result.json()) })
      .then((data) => {
        console.log(data);
        // Redirect to Stripe Checkout
        return stripePromise.redirectToCheckout({ sessionId: data.sessionId })
      })
      .then((res) => {
        console.log(res);
      });
  }
  render() {
    const { product } = this.state;
    return (
      <Container>

        <h1>Shopping Cart</h1>
        {this.props.cartItems.cartItems.length === 0 ? (
          <EmptyCart />
        )
          :
          (
            <div>
              <div className="cartnumber">
                You have <span>{this.props.cartItems.cartItems.length}</span>
                {" "}items in cart
              </div>
              <Wrapper>



                <div>
                  <Table >
                    <FlipMove
                      staggerDurationBy="30"
                      duration={500}
                      enterAnimation={'chronological'}
                      leaveAnimation={'accordianVertical'}
                      typeName={"table"}
                    >

                      <tr>
                        <th>PRODUCT</th>
                        <th>PRICE</th>
                        <th>QUANTITY</th>
                        <th> SUBTOTAL</th>
                        <th>DELETE</th>
                      </tr>
                      {this.props.cartItems.cartItems.map(item => {
                        return (

                          <tr key={item.id} style={{ position: "relative" }}>
                            <td className="product-img">
                              <img src={item.product_images[this.state.index]} alt={item.title} />
                              <div>
                                <p>{item.title}</p>
                                <span>{item.price}$</span>
                              </div>
                            </td>

                            <td className="shoping-cart-price">
                              <span>{item.price}$</span>
                            </td>

                            <td>
                              <div className="Quantity">
                                <button
                                  className="subtract-quantity-button"
                                  onClick={() => this.props.dispatch(subtractQuantity(item))}>
                                  -
                                </button>
                                <span>{item.count}</span>
                                <button
                                  className="add-quantity-button"
                                  onClick={() => this.props.dispatch(addToCart(item))}>
                                  +
                                </button>
                              </div>

                            </td>
                            {this.props.cartItems.cartItems.length !== 0 && (
                              <td className="subtotal">
                                {" "}
                                <span>${item.subtotal.toFixed(2)}</span>
                              </td>
                            )}

                            <td className="delete-button">
                              <button onClick={() => this.props.dispatch(removeFromCart(item))}>
                                <i class="fas fa-trash"></i>
                              </button>
                            </td>

                          </tr>

                        )
                      })}


                    </FlipMove>
                  </Table>

                </div>
                <ProductSubtotal
                  cartItems={this.props.cartItems.cartItems}

                />
              </Wrapper>
            </div>
          )}


      </Container>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    cartItems: state.cartItems,
  };
};

export default connect(mapStateToProps)(Card)

const Container = styled.div`
  background-color: #fff;
  min-height:90vh;
  padding-bottom:60px;
  position:relative;
  width:100%;
  min-width:400px;
  
  
  
  h1 {
      font-weight:bolder;
      color:#000;
      padding:15px;
      background-image:linear-gradient(to right,rgb(200, 200, 200),rgb(167, 164, 164));
      
}


.product-img{
  display:flex;
  align-items:center;
}

.product-img img{
  width:75px;
  height:90px;
  box-shadow: 2px 4px 8px rgb(12, 12, 12 , 0.5);
  margin-top: 10px;
  margin-right:12px;
  object-fit:cover;
}

.product-img>button{
  width:0px;
  height:0
  padding: 0;
  margin:0;
  border:none;
  background-color:none;
  cursor: pointer;
}
.product-img div{
  display:flex;
  flex-direction:column;

}

.product-img p{
  color:black;   
  font-size: 12px;
  font-weight: bold;
  letter-spacing: 1px;
  padding-right:10px;
 
  
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



.Quantity{
  border: 1px solid rgb(196, 193, 193);
  display:flex;
  justify-content: space-between;
  border-radius: 4px;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  width:85px;
}





`

const Wrapper = styled.div`
    width:100%;
    display:flex;
    flex-direction:column;
    padding:0 10px;

    @media only screen and (min-width: 768px) {
      &{
        flex-direction:row;
        justify-content:space-around;
      }
      .product-img span{
         display:none;
      }



    }

     


`
const Table = styled.table`
  
  padding: 10px 5px;

  th{
      text-align:left;
      border-bottom: 2px solid rgb(208, 209, 207);
      padding:5px 20px;
  }
  

td:nth-child(3) {
    padding:0 10px;
  
}
td:nth-child(1){
   width:100%;
   max-width:25rem;
   min-width:12rem;
  
}

td:nth-child(1)> p {
  padding:0 10px;
  white-space: wrap;
 
  font-size:0.9em;
  
}
td:nth-child(3){
   
   
  
  
}

td:nth-child(2), td:nth-child(4), td:nth-child(3), td:nth-child(5){
    
  text-align:center;


}

td:nth-child(4), td:nth-child(5),
td:nth-child(2), th:nth-child(2),
th:nth-child(4), th:nth-child(5) {
     
       display:none;

      }
  .subtotal>span{
    color:#000
  }

  .subtract-quantity-button{
    border-bottom-left-radius: 4px;
    border-top-left-radius: 4px;
    border:none;
    width:25px;
    outline-style: none; 
    height:25px; 
  }
  
  .add-quantity-button{
    border:none;
    border-bottom-right-radius: 4px;
    border-top-right-radius: 4px;
    width:25px;
    outline-style: none;
    height:25px;
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

   @media only screen and (min-width: 768px) {
    td:nth-child(4), td:nth-child(5),
    td:nth-child(2), th:nth-child(2),
    th:nth-child(4), th:nth-child(5){

   
   display:table-cell;

  }

  
 
}

  
`