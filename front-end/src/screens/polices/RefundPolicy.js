import React,{ useLayoutEffect} from 'react'
import styled from "styled-components"
import HeadeSeo from '../../common/Heade';

function RefundPolicy() {
  useLayoutEffect(() => {
    window.scrollTo({top: 0, left: 0,});
  }, [])
  return (
    <Container>
      <HeadeSeo title = " Animis - Return Policy"/>
        <div>
            <h1>RETURN AND REFUND POLICY</h1>
        </div>
        <div>
            <h3>Returns:</h3>
              <p>
                  Simply put, you can return merchandise for a refund ONLY if the item is in BRAND NEW, UNOPENED CONDITION, including its original packaging and accessories. We know this seems a little extreme, but without this stipulation, we would not be able to offer our amazing prices.
              </p>
              <p>
                  We will honor refunds for unopened items up until 15 - 25 days from when you have received your product. All refunds will be issued back to your original payment method and can take up will 7-10 business days to apply back to your original payment method.
              </p>
        </div>
        <div>
            <h3> Your refund will be rejected if your items are returned due to the issues related to the following:</h3>
            <ol>
                <li> <span>If you are wanting to return your product due to damage on the item’s original box.</span> </li>
                <li> <span>If the product you have returned has been opened and unsealed. </span></li>
                <li>  <span>Items with minor cosmetic paint problems for prize figures as these are expected.</span> </li>
            </ol>
        </div>
        <div>
            <h3>Exceptions / Non-Returnable items:</h3>
              <p>
                  Pre-orders are final sales and are non-returnable once shipped out. If you do happen to receive a defective product, please contact us for more important on contacting the manufacturer.

                  Items with box imperfections and general flaws.

                  If your figure quality

                  Please get in contact with us if you have questions or concerns about your specific item.</p>
          </div>
        <div>
            <h3>Return Shipping:</h3>
              <p>
                  In order to return a product, please contact our customer support with your order number and reason for return and you will be provided with a return label if your return request is approved.
              </p>
        </div>
        
        <div>
            <h3>Damages and issues</h3>
              <p>
                  Please inspect your order upon reception and contact us immediately if the item is defective, damaged or if you receive the wrong item so that we can evaluate the issue and make it right.
              </p>
        </div>
        <div>
            <h3>Refunds</h3>
              <p>
                  We will notify you once we’ve received and inspected your return, and let you know if the refund was approved or not. If approved, you’ll be automatically refunded on your original payment method. Please remember it can take some time for your bank or credit card company to process and post the refund too
              </p>
        </div>


    </Container>
  )
}

export default RefundPolicy

const Container = styled.div`
    width:90%;
    min-height:100vh;
    margin: 10px auto;
    padding: 10px 15px;
    border-radius:4px;
    background: #D3CCE3;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #E9E4F0, #D3CCE3);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #E9E4F0, #D3CCE3); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

    a{
    word-break:break-all;
    }

    p{
        font-size:13px;
        line-height:3;
        font-weight:600;
    }

    h3{
        font-weight:900;
        font-size:18px;
        border-bottom:2px solid lightgray;
        width:fit-content;
        padding:5px 0;
    }
  
  ol li  {
    list-style-type: circle;
    
  }
  ol li >span{
    font-size:0.84em;
    font-weight:normal;
    color:#000

  }

  ol li strong{
    
     font-size:0.86em;
     font-weight:900;
  }
      h1{
        font-weight:900;
        font-size:30px;
        margin:auto;
        display:flex;
        justify-content:center;
      }
`