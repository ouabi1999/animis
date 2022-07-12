import React, { useState } from 'react'

import styled from 'styled-components';
import Fade from "react-reveal/Fade"
import Spinner from '../../Spinner/Spinner';
import StarIcon from '@mui/icons-material/Star';
import {useSelector} from "react-redux"
 

function HomeProducts(props) {
    const [items, setItems] = useState(5)
   
  const products = useSelector((state) => state.products.products)
  const isProducts = useSelector((state) => state.products.isProducts)
  const slice = products.slice(0, items);
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
                          <img src={item.product_images[0]} title={item.title} />
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
  .grid-container{
      padding:10px;
      display: grid;
      grid-template-columns: repeat(6,auto);
      gap:12px;
      place-content: center;
      

      img{
        border-image: round;
        width:190px;
        height:200px;
        background-color:rgb(255, 255, 255);
        border-radius: 6px 6px 0 0;
        object-fit:conatin;
      }   
}
.product_container{
   padding: 0 0 20px;
   background-color:rgb(250, 250, 250);
   border-radius:8px;
   border:none;
   width:190px;
   box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
}


`
const Product_info = styled.div`
   
    display:flex;
    align-content:center;
    flex-direction:column;
    padding-left:10px;
   
    

`
const FirstSection = styled.div`


    p{
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap; 
      font-size:13px;
      width:170px;
      margin-top:0;
    }  

`
const SeccondSection = styled.div`
  display:flex;
  align-items:center;
  .orders{
    
    font-size:13px;

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
      


    }
    .productdiscount{
      font-size:13px;
      text-decoration:line-through;
      color:green;
      margin-left:20px;
      
    }


`
/*

.product-box{
  position: relative;
}


.producttitle{
  position:relative;
  margin-left:6px;
  font-size:13px;
  font-weight:bolder;
  width:170px;
  height: 0;
  top:-85px;
}
.productprice{
  width:180px;
  font-weight: bolder;
  position:relative;
  margin-left:6px;
  display:inline;
  top:-60px;
  font-size: 13px;
  color:rgb(231, 28, 28)
}
.productdiscount{
  text-decoration: line-through;
  font-weight: bold;
  position:relative;
  color:rgb(2, 2, 2);
  display:inline;
  font-weight: bolder;
  font-size: 11px;
  top:-60px;
  left:85px;
}*/