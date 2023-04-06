import React,{useEffect, useState} from "react";
import { useSelector , useDispatch} from "react-redux";
import styled from "styled-components";
import Fade from "react-reveal/Fade";
import StarIcon from "@mui/icons-material/Star";
import Spinner from "../Spinner/Spinner";
import {Link } from "react-router-dom"
import { setCategory } from "../../features/categories/categorySlice";
import NotFound from "./NotFound";
import MenuIcon from '@mui/icons-material/Menu';

function FilteredItems(props) {
  const filteredData = useSelector((state) => state.filteredProduct.filteredData);

 
 
 
  
  return (

    <Product_contianer>
      
      

      {filteredData.length >= 1 ? (

        <Fade bottom cascade>

          <div className="grid-container">
            {props.filteredData.map((item) => {
              return (
                <div  key={item.id} className="product_container"   >
                <Link   to={"/product_details/" + item.id}>
                  <img src={item.colors[0]} alt="img"/>
                </Link>
              <Product_info>
            
                <FirstSection>
                  <p className="producttitle">{item.title}</p>
                </FirstSection>
                
                <SeccondSection>
                 
                  <div className="orders">
                    <span>
                          {`Orders(${item.orders + item.ratings.length})`}
                    </span>
                  </div>
                   {item.ratings.length > 0 && (
                      <div className="reviews-container">
                   
                           <span className="reviews">
                           {(item.ratings.reduce((total, value) => total += value.stars, 0) / item.ratings.length).toFixed(1)}
                            </span>
                           <StarIcon className='star-icon' />
                      </div> 

                   )}
                   
                </SeccondSection>

                <ThirthSection>
                  <span className="productprice"> US ${item.price}</span>
                  <span className={ item.discount > item.price && item.discount && "productdiscount"}>{item.discount > item.price ? `- ${((  item.discount - item.price  )  / item.discount * 100).toFixed(0)}% `  : ""}
                  </span>

                  
                </ThirthSection>
                {item.shippingInfo?.map((ship, index)=>{
                  if(ship.type === "Free"){
                    return(
                    <span  key={index} className="shipping"> Free Shipping </span>
                    )
                  }
                 
                }
                    
                )}
                

              </Product_info>
            </div>
              );
            })}
          </div>
        </Fade>

      ): 
      
    
          <NotFound/>
        }
    

    </Product_contianer>
  );
}

export default FilteredItems;
const Product_contianer = styled.div`
   min-width:300px;
   overflow:hidden;
   
   font-family:'Arial Narrow', Arial, sans-serif;
  .grid-container{
      padding:10px;
      display: grid;
      grid-template-columns: repeat(4,auto);
      gap:20px;
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
@media only screen and (max-width: 1280px) {
  .grid-container{
     
    grid-template-columns: repeat(3,30%);
  }
}
@media only screen and (max-width: 1018px) {
  .grid-container{
     
    grid-template-columns: repeat(2,auto);
  }
}
@media only screen and (max-width: 780px) {
  .grid-container{
     
    grid-template-columns: repeat(3,auto);
    
  }
}

@media only screen and (max-width: 480px) {
  .grid-container{
    grid-gap:10px;
   
  }
  p{
      
      width:100%;
   
  }

  
}
  @media only screen and (max-width: 730px) {
  .grid-container{
      grid-template-columns: repeat(2,auto); 
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
    
  }
  }

  @media only screen and (max-width: 360px) {
   
  }
  
    
    
    
   
    
  
  
`

const Product_info = styled.div`

    display:flex;
    align-content:center;
    flex-direction:column;
   
   
    .shipping{
        font-size:11px;
        margin-left:4px;
        margin-top:10px;
        color:#006622;
        font-family:'Arial Narrow', Arial, sans-serif;
  }

`
const FirstSection = styled.div`


    p{
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap; 
      font-size:12px;
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
    
    font-size:0.7em;
    font-weight:smaller;
    padding:0 5px;
    

}

.reviews-container{
  
  position:absolute;
  right:10px;
  display:flex;
  align-items:center;
  
  
}
.reviews{
  font-size:12px;
  
   
}
.star-icon{
  color:#1f1f2e;
  font-size:16px;
  float:right;
  margin-left:2px;
  margin-bottom:3px;

  
  

}
`
const ThirthSection = styled.div`
    margin-top:10px;
    width:100%;
    display:flex;

    .productprice{
      color:#000000;
      margin-left:2px;
      font-family:'Trebuchet MS', sans-serif;
      font-size:20px;
      font-weight:bold;
      margin-right:30px;
      white-space: nowrap; 
    }
   
    .productdiscount{
      font-size:11px;
      font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
      color:#ffff;
      padding:4px 8px;
      background:rgb(255, 0, 0, 0.5);
      border-radius: 0px 8px 0 8px;
    
      
    }

    
  @media only screen and (max-width: 400px) {
      .productprice{
        
        margin-right:20px;
        font-size:15px;
      }
      .productdiscount{
          font-size:12px;
          padding:3px 4px;
          border-radius:0;
      }
  }

 
`


