import React, { useState } from 'react'

import styled from 'styled-components';
import Fade from "react-reveal/Fade"
import Spinner from '../../Spinner/Spinner';
import StarIcon from '@mui/icons-material/Star';
import {useSelector} from "react-redux"
 

function HomeProducts(props) {
  
   
  const products = useSelector((state) => state.products.products)
  const isProducts = useSelector((state) => state.products.isProducts)
  
  const {openModal} = props;
  return (
    <Product_contianer>
        <Fade bottom cascade>
            {isProducts !==  null ? (
               <div className="grid-container">
                {products.map(item => {
                  return (
                      <div  key={item.id} className="product_container">
                        <a href={"#" + item.id} onClick={() => props.openModal(item)}>
                          <img src={item.product_images[0]} alt="img"/>
                        </a>
                      <Product_info>
                    
                        <FirstSection>
                          <p className="producttitle">{item.title}</p>
                        </FirstSection>
                        
                        <SeccondSection>
                         
                          <div className="orders">
                            <span>1800 sold</span>
                          </div>
                          <div className="reviews-container">
                            <StarIcon className='star-icon' />
                            <span className="reviews">{item.reviews}</span>
                          </div>  
                        </SeccondSection>

                        <ThirthSection>
                          <span className="productprice">${item.price}</span>
                          <span className="productdiscount">{item.discount} % </span>
                        </ThirthSection>

                      </Product_info>
                    </div>
                  )
                }
                )}
                </div>
          ) :(
            <div style={{margin:"auto"}}> <Spinner/> </div>
          )
        }
        </Fade>

    </Product_contianer>
  )
}

export default HomeProducts
const Product_contianer = styled.div`
   min-width:320px;
  .grid-container{
      padding:10px;
      display: grid;
      grid-template-columns: repeat(5,auto);
      gap:15px;
      place-content: center;
      

      img{
        border-image: round;
        width:100%;
        height:215px;
        background-color:rgb(255, 255, 255);
        border-radius: 6px 6px 0 0;
        object-fit:contain;
      }   
}
.product_container{
   padding: 0 0  20px;
   background-color:rgb(250, 250, 250);
   border-radius:8px;
   border:none;
   width:100%;
   box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
}
@media only screen and (max-width: 1200px) {
  .grid-container{
     
    grid-template-columns: repeat(4,auto);
  }
}

@media only screen and (max-width: 1000px) {
  .grid-container{
     
    grid-template-columns: repeat(3,auto);
  }
}
@media only screen and (max-width: 900px) {
  .grid-container{
      grid-template-columns: repeat(2,auto); 
  }

  @media only screen and (max-width: 490px) {
  .grid-container{
     
    grid-template-columns: repeat(2, 50%);
    place-items: center;
    
 
    img{
        border-image: round;
        
        height:auto;
        background-color:rgb(255, 255, 255);
        border-radius: 6px 6px 0 0;
        object-fit:contain;
      } 

      .product_container{
           padding: 0 0  5px;
           background-color:rgb(250, 250, 250);
           border-radius:8px;
           border:none;
           width:80%;
           height:auto;
           box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
           rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
      }
      p{
      
        width:100%;
     
    } 
  }
  }
}

`

const Product_info = styled.div`

    display:flex;
    align-content:center;
    flex-direction:column;
   
   
    

`
const FirstSection = styled.div`


    p{
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap; 
      font-size:13px;
      width:215px;
      margin-top:0;
      padding:0 5px;
    }  

`
const SeccondSection = styled.div`
  display:flex;
  align-items:center;
  .orders{
    
    font-size:13px;
    padding:0 5px;

}

.reviews-container{
  display:flex;
  align-items:center;
  position:absolute;
  right:10px;
  
}
.reviews{
  font-size:12px;
  
   
}
.star-icon{
  color:gold;
  font-size:18px;
  float:right

  
  

}
`
const ThirthSection = styled.div`
    margin-top:6px;
    .productprice{
      color:blue;
      padding:0 5px;
      


    }
    .productdiscount{
      font-size:13px;
      text-decoration:line-through;
      color:green;
      margin-left:20px;
      
    }


`

