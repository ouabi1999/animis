import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom';



function ProductSubtotal(props) {
  return (
      <Container>
          <table className="total-section">
              <tr>
                  <th>Cart Totals</th>
                  <th></th>
              </tr>
              <tr>
                  <td >Subtotal</td>
                  <td>{props.cartItems.length !== 0 && (
                      <div className="total">
                          <div>
                              {" "}
                              ${props.cartItems.reduce((a, c) => a + c.price * c.selectedQuantity, 0).toFixed(2)}
                          </div>
                      </div>
                  )}
                  </td>
              </tr>
              <tr>
                  <td>Total</td>
                  <td>{props.cartItems.length !== 0 && (
                      <div className="total">
                          <div>
                              {" "}
                              ${props.cartItems.reduce((a, c) => a + c.price * c.selectedQuantity, 0).toFixed(2)}
                          </div>
                      </div>
                  )}
                  </td>
              </tr>
              
          </table>
          <Link to="/checkout">
              <button className="procces-button">

                  Checkout


              </button>
          </Link>



      </Container>
  )
}

export default ProductSubtotal

const Container = styled.div`
    

    border:2px solid rgb(255, 255, 255);
    box-shadow: 2px 4px 8px rgb(129, 126, 126);
    height:350px;
    padding: 10px 5px;
    width:400px;
    position:sticky;
    top:15%;
    background:#fff;
    width:100%;
    font-family: sans-serif;


  .total>div{
    font-size: large;
    font-weight: bold;
    color:#000;

  }
  
  
  .procces-button {
    margin-top:65px;
    padding:8px 0;
    border-radius: 6px; 
    text-align:center;
    background:orange;
    border-radius: 6px;
    color:#fff;
    font-size:20px;
    font-weight: normal;
    width:100%;
    letter-spacing:1px;
  }

  .total-section th{
    border-bottom: 2px solid rgb(208, 209, 207);
    
    
    }
    
    .total-section td{
      border-bottom:1px solid rgb(221, 221, 221);
      width:100%;
      font-size: medium;
      font-weight: bold;
      padding-top:50px ;
    }
    @media only screen and (min-width: 768px) {
        &{
            position:none;
            width:350px;
        }
    }

    @media only screen and (max-width: 1200px){
        &{
            position:none;
            max-width:460px;
        }

    }
    
`