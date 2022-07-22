import React from 'react'
import styled from 'styled-components'
import { useState , useRef} from 'react'
import { useSelector } from 'react-redux'
import Slider from "react-slick"
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function NewArrival() {

   const products = useSelector((state) => state.products.products)
   const [current, setCurrent ] = useState(0);
   const length = products.length;
   const carousel = useRef(null);

   const nextArrow = () =>{
       carousel.current.scrollLeft += 201;
    
    }
    const prevArrow = () =>{
      carousel.current.scrollLeft -= 201;
    }

  return (
     <Parent_container>
     <img  className="title" src="./images/newarrival.png" alt=""/>
     <Wraper>
     <button type="button" onClick = {prevArrow}>
         <ArrowBackIosIcon className="prev-arrow" />
     </button>
     
     <Slide_Container ref={carousel}>
        {products.map((item, index) => {
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
   min-height:300px;
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
      width:200px;
      margin:5px 30px;
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
   
   color:orange;
}


`
const Slide_Container = styled.div`
   display:flex;
   overflow-x:hidden;
   scroll-behavior: smooth;
   
`

const Wrapp = styled.div` 
   margin:0 5px;
   

   img{
      
      width:190px;
      height:225px;
      object-fit:cover;
      border:1px solid lightblue;
      border-radius: 4px;
      box-shadow: 0px 0px 0px 0.5px rgba(50, 50, 93, 0.1),
                  0px 2px 5px 0px rgba(50, 50, 93, 0.1),
                  0px 1px 1.5px 0px rgba(0, 0, 0, 0.07);
      
}

`


