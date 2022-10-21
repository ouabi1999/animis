import React from "react"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"
import Slider from "react-slick";
import styled from "styled-components";

const MainSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    pauseOnHover: true,
    arrows:false
  };

  return (
    <Container>
      
        <Slider {...settings}>
          
          <div>
            <img src="image-slide/background-img.jpg" alt="image-slide" />
          </div>
          <div>
            <img src="image-slide/toy-3631315.jpg" alt="image-slide" />
          </div>
          <div>
            <img src="image-slide/danbo-1206484.jpg" alt="image-slide" />
          </div>
        
        </Slider>
      
      
      
    </Container>
  )
}

export default MainSlider;

const Container = styled.div`
    
   
   min-width:20px;
   
   
   
   div{
      display:flex;
      max-height:53vh;
      border-radius: 4px;
      background-color: lightblue;
      box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
    }
   
   

 img{
    
    border-radius: 4px;
    object-fit: cover;
    max-height:53vh;
    min-width:20px;
    
    width:100%;
    
   
}

.slick-dots {

  bottom:10px;
  
}

`

