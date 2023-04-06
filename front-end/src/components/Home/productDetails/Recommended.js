import React from 'react'
import styled from "styled-components"
import {Link } from "react-router-dom"
function Recommended({products, isLoading}) {
    return (
        <RecommendedForYou>
            <span>Recommended For You </span>
            <div>
                {products?.map((product, index ) => {
                    return (
                        <div key={index} className="recommended-container">
                            <Link to={"/product_details/" + product.id}>
                                <img src={product.colors[0]} alt="" />
                            </Link>
                            <span className="product-price">${product.price}</span>
                        </div>
                    )
                })}
            </div>
             {isLoading &&(
                       [1, 2, 3].map((index ) => {
                        return (
                            <div key={index} style={{width:"140px", marginBottom:"8px", height:"145px"}} 
                                className="recommended-container skeleton"
                              >            

                            </div>
                        )
                    })
             )}
        </RecommendedForYou>
    )
}

export default Recommended

const RecommendedForYou = styled.div`
      
      height:fit-content;
      display:flex;
      flex-direction:column;
      align-items:center;
      
    
     
      span{
        font-size:13px;
        color:gray;
        font-weight:bold;
        margin-bottom:4px;
      }
      .product-price{
        font-size:13px;
        color:gray;
        margin-bottom:4px;

      }
      
      .recommended-container{
        position:relative;
        display:flex;
        flex-direction:column;
        align-items:center;
        
        
        

      }
      .recommended-container img{
        position:relative;
        width:140px;
        margin-bottom:0px;
        height:145px;
        box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
      }
    
      @media only screen and (max-width: 1160px){
     &{
      display:none;
     }
}
/*@media only screen and (max-width: 768px){
     .recommended-container{
      display:none;
     }

     &{
      padding:10px 10px;
    }
}*/

`