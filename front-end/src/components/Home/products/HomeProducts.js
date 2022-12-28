import React, { useRef, useState } from 'react'

import styled from 'styled-components';
import Fade from "react-reveal/Fade"
import Spinner from '../../Spinner/Spinner';
import StarIcon from '@mui/icons-material/Star';
import {useSelector, useDispatch} from "react-redux"
import { Link } from 'react-router-dom';
import { CircularProgress } from '@mui/material';


function HomeProducts(props) {
  const dispatch = useDispatch()
  const scrolltobottom = useRef()
  
  const isProducts = useSelector((state) => state.products.isProducts)
  const [viewMoreProduct, setViewMoreProduct] = useState(10)
 
    
  const viewMore = () => {
    setViewMoreProduct(
      viewMoreProduct.items + 10
    )
  }

  const {products, scrolTo} = props;

  return (
    <Product_contianer >
        <Fade bottom cascade >
            {isProducts !==  null ? (
               <div className="grid-container">

                {products?.map(item => {
                  return (
                      <div  key={item.id} className="product_container" ref= {scrolTo}  >
                        <Link   to={"product_details/" + item.id}>
                          <img src={item.colors[0]} alt="img"/>
                        </Link>
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
                          <span className="productdiscount">{item.discount > item.price ? `${((item.discount - item.price) / item.discount * 100).toFixed(0)} % `  : ""}
                          </span>
                          <span className="shipping"> Free Shipping </span>
                        </ThirthSection>

                      </Product_info>
                    </div>
                    
                  )
                }
                
                )}
               
                </div>
          ) :(
          <div style={{ height:"200px", marginTop:"100px", display:"flex" , justifyContent:"center"}}>
             <CircularProgress
                  size={25}
                  thickness={4}
              /> 
          </div>
        )  
        }
        </Fade>

    </Product_contianer>
  )
}

export default HomeProducts
const Product_contianer = styled.div`
   min-width:300px;
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
        object-fit:cover;
      }   
}
.product_container{
   padding: 0 0  12px;
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

@media only screen and (max-width: 950px) {
  .grid-container{
     
    grid-template-columns: repeat(3, 30%);
  }
  p{
      
      width:100%;
   
  }

  
}
  @media only screen and (max-width: 730px) {
  .grid-container{
      grid-template-columns: repeat(2,auto); 
  }
  .shipping{
    
    top:295px;
  }
}

  @media only screen and (max-width: 490px) {
  .grid-container{
     
    grid-template-columns: repeat(2, 50%);
   
    
    
 
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
           width:100%;
           height:auto;
           box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
           rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
      }
      p{
      
        width:100%;
        font-size:11px;
     
    } 
    .shipping{
      font-size:10px;
      right:5px;
    
      
    }
  }
  }
  @media only screen and (max-width: 360px) {
    .shipping{
      font-size:9px;
      top:222px; 
      margin-right:10px; 

    }
  }
  @media only screen and (max-width: 320px) {
    
    
    
   
    
    .shipping{
      font-size:9px;
      top:206px; 
      margin-right:0px;  

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
      max-width:220px;
      width:100%;
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
  color:#ff9933;
  font-size:18px;
  float:right

  
  

}
`
const ThirthSection = styled.div`
    margin-top:10px;
    width:100%;
    display:flex;

    .productprice{
      color:#000000;
      padding:2px 5px;
      margin-left:2px;
      background:rgb(255, 0, 0, 0.2);
      border-radius: 6px 6px 0 6px;
      font-family:'Trebuchet MS', sans-serif;
    }

    .productdiscount{
      font-size:13px;
      text-decoration:line-through;
      color:#cc0000;
      margin-left:20px;
      align-self:end;
      
    }

  .shipping{
    font-size:12px;
    position:absolute;
    right:4px;
    bottom:13px;
  }
`

