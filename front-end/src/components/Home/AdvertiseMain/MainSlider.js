import React from "react"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"
import Slider from "react-slick";
import styled from "styled-components";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import { useSelector } from "react-redux";
import { Pagination, Navigation, Autoplay } from "swiper";
import { v4 as uuidv4 } from 'uuid';
import { Link } from "react-router-dom";
const MainSlider = () => {

  const displayData = useSelector(state => state.display.display)
  

  return (
    <Container>


      
        <Swiper

          loop={true}
          modules={[Pagination, Navigation, Autoplay]} 
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}

          pagination={{
          clickable: true,
          }}

          className="mySwiper skeleton"
        >
          
          
          {displayData?.slider?.[0] && (
       
             <SwiperSlide>
              <Link to={`/super_deals/${uuidv4()}`}>
                  <img src={displayData?.slider[0]} alt="slider" />
               </Link>
            </SwiperSlide>
              
            )}
             {displayData?.slider?.[1] && (
       
       <SwiperSlide>
        <Link to={`/super_deals/${uuidv4()}`}>
            <img src={displayData?.slider[1]} alt="slider" />
         </Link>
      </SwiperSlide>
        
      )}
       {displayData?.slider?.[2] && (
       
       <SwiperSlide>
        <Link to={`/super_deals/${uuidv4()}`}>
            <img src={displayData?.slider[2]} alt="slider" />
         </Link>
      </SwiperSlide>
        
      )}
        {displayData?.slider?.[4] && (
       
       <SwiperSlide>
        <Link to={`/super_deals/${uuidv4()}`}>
            <img src={displayData?.slider[4]} alt="slider" />
         </Link>
      </SwiperSlide>
        
      )}   
       {displayData?.slider?.[5] && (
       
       <SwiperSlide>
        <Link to={`/super_deals/${uuidv4()}`}>
            <img src={displayData?.slider[5]} alt="slider" />
         </Link>
      </SwiperSlide>
        
      )}
           
        </Swiper>
    </Container>
  )
}

export default MainSlider;

const Container = styled.div`
    
   
   min-width:200px;
   
   
   div{
      display:flex;
      border-radius: 4px;
      box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
    }
  .skeleton a{
    height:52vh;
  }
  .skeleton {
      min-height:52vh;
      animation: skeleton-loading 1s linear infinite alternate;
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
   

 img{
    border-radius: 4px;
    object-fit: cover;
    min-width:200px;
    height:100%;
    
   
}

.slick-dots {

  bottom:10px;
  
}



@media only screen and (max-width:480px){

img{
  height:230px;
 
}
div{
  height:230px;
  }
}

@media only screen and (max-width:820px){

img{
  height:355px;
 
  } 
}

@media only screen and (max-width:1112px){

img{
  width:100vw;

 
  } 
}
`
