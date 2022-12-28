import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useState , useRef} from 'react'
import { useSelector } from 'react-redux'
import "../../App.css"
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
     <img  className="title" src="./images/newarrivals.svg" alt=""/>
     <Wraper>
     <button type="button" onClick = {prevArrow}>
         <ArrowBackIosIcon className="prev-arrow" />
     </button>
         <Slide_Container ref={carousel}>
            {products.length > 0 ? (
                  products?.slice(0, 12).map((item, index) => {
                    return (
                       <Wrapp key={index}>
                          <img src={item.colors[0]} alt="" />
                       </Wrapp>
                    )
                 })

              ) :
              <>
                <Wrapp>
                <div className="skeleton"/> 
                </Wrapp>
                <Wrapp>
                <div className="skeleton"/> 
                </Wrapp>
                <Wrapp>
                <div className="skeleton"/>
                </Wrapp>
                <Wrapp> 
                <div className="skeleton"/> 
                </Wrapp>
                <Wrapp>
                <div className="skeleton"/> 
                </Wrapp>
                <Wrapp>
                <div className="skeleton"/>
                </Wrapp> 

              </>

           
            }
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
   background: rgb(241,145,49);
   background: linear-gradient(180deg, rgba(241,145,49,0.18531162464985995) 0%, rgba(255,45,45,1) 100%);
   padding: 0px 10px;
   h2{
    
   }
   img.title {
      width:125px;
      height:auto;
      margin-top:10px;
      margin-bottom:2px;
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
  
   .skeleton {
    animation: skeleton-loading 1s linear infinite alternate;
    width:180px;
    height:195px;
    border:1px solid lightgray;
   }
  
  @-webkit-keyframes skeleton-loading {
    0% {
      background-color: #c2cfd6;
    }
    100% {
      background-color: #f0f3f5;
    }
  }
  
  @keyframes skeleton-loading {
    0% {
      background-color: #c2cfd6;
    }
    100% {
      background-color: #f0f3f5;
    }
  }
`
const Wraper = styled.div`
   width:100%;
   display:flex;
   align-items:center;
   justify-content:space-between;
   
 
button{
   background:rgb(200, 200, 200, 0.8);
   width:30px;
   height:80px;
   border:1px solid lightgrey;
   
}

.next-arrow,
.prev-arrow {
   
   color:#000;
}
    .prev-arrow {
   margin-right:30px;
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


