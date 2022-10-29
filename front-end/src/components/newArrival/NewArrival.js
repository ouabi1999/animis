import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useState , useRef} from 'react'
import { useSelector } from 'react-redux'
import Slider from "react-slick"
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function NewArrival() {

   const products = useSelector((state) => state.products.products)
   const [current, setCurrent ] = useState(0);
   const length = products?.length;
   const carousel = useRef(null);

   const nextArrow = () =>{
       carousel.current.scrollLeft += 200;
    
    }
    const prevArrow = () =>{
      carousel.current.scrollLeft -= 200;
    }
 
    

  return (
     <Parent_container>
     <img  className="title" src="./images/newarrival.png" alt=""/>
     <Wraper>
     <button type="button" onClick = {prevArrow}>
         <ArrowBackIosIcon className="prev-arrow" />
     </button>
     
     <Slide_Container ref={carousel}>
        {products?.slice(0, 12).map((item, index) => {
           return (
              <Wrapp key={index}>
                  <img src={item.product_images[0]}  alt="" />
              </Wrapp>
           )
        })} 
     </Slide_Container>
      <button type="button" onClick = {nextArrow}>
         <ArrowForwardIosIcon className="next-arrow"  />
      </button>
     </Wraper>
     </Parent_container>
   )
}

export default NewArrival
const Parent_container = styled.div`
   width:95%;
   min-height:260px;
   margin: 50px auto;
   box-shadow: 0px 0px 0px 0.5px rgba(50, 50, 93, 0.1),
   0px 2px 5px 0px rgba(50, 50, 93, 0.1),
   0px 1px 1.5px 0px rgba(0, 0, 0, 0.07);
   border-radius: 4px;
  
   background:rgb(255, 255, 255);
   padding: 0px 10px;
   h2{
    
   }
   img.title {
      width:120px;
      height:auto;
      margin-top:10px;
      margin-bottom:2px;
      margin-left:30px;
   }


   @media only screen and (min-width: 600px) {
    /* For tablets: */
    
    
  }
  @media only screen and (max-width: 1022px) {
    
  }
  @media only screen and (max-width: 768px) {
    /* For mobile phones: */
      button{
         display:none;
      }
   
  }
   
`
const Wraper = styled.div`
   width:100%;
   display:flex;
   align-items:center;
   justify-content:space-between;
   
 
button{
   background:rgb(200, 200, 200, 0.2);
   width:30px;
   height:80px;
   border:1px solid lightgrey;
   
}

.next-arrow,
.prev-arrow {
   
   color:#000;
}


`
const Slide_Container = styled.div`
   position:relative; 
   display:flex;
   overflow-x:scroll;
   scroll-behavior: smooth;
   scrollbar-width:none;

   &::-webkit-scrollbar{
   display:none;
}
   
`

const Wrapp = styled.div` 
   margin:0 10px;


   img{
   
      width:180px;
      height:195px;
      object-fit:cover;
      border:1px solid rgba(50, 50, 93, 0.3);
      border-radius: 4px;
      box-shadow: 0px 0px 0px 0.5px rgba(50, 50, 93, 0.1),
                  0px 2px 5px 0px rgba(50, 50, 93, 0.1),
                  0px 1px 1.5px 0px rgba(0, 0, 0, 0.07);
      
}

`


