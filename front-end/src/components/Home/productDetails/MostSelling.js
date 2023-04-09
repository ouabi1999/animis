import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

function MostSelling({products, isLoading}) {
  return (
      <Container>
          <span> Most selling</span>
          
          {isLoading ?(
                       [1, 2, 3].map((index ) => {
                        return (
                            <div key={index} style={{width:"140px", marginBottom:"8px", height:"145px"}} 
                                className="recommended-container skeleton"
                              >            

                            </div>
                        )
                    })
             ):
             products?.map((product, index) => {
              return (
                  <div key={index}>
                      <Link to={"/product_details/" + product.id}>
                          <img src={product.colors[0]} alt="" />
                      </Link>
                      <span className="product-price">${product.price}</span>
                  </div>
              )
          })
             
             }
      </Container>
  )
}

export default MostSelling
const Container = styled.div`
      display:flex;
      flex:0.5;
      flex-direction:column;
      align-items:center;
      height:fit-content;
      margin-right:14px;

      div{
       
        display:flex;
        flex-direction:column;
        align-items:center;
        
      }
    
     
       span{
        font-size:15px;
        color:gray;
        font-weight:bold;
        margin-bottom:4px;
      }
      .product-price{
        font-size:13px;
        color:gray;
        margin-bottom:4px;

      }
        img{
        position:relative;
        width:140px;
        margin-bottom:0px;
        height:145px;
        box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
      }
    
     
  @media only screen and (max-width: 820px) {
  
      &{
        display:none;
       }
    }
`