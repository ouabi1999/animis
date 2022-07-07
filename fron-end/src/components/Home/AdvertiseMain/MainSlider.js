import React from "react"
import Fade from "react-reveal/Fade";
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
    autoplay: false,
    pauseOnHover: true,
    arrows:false
  };

  return (
    <Container className="asides-container">
     
      <div className="center-aside ">
        <Slider {...settings}>
          <div>
            <img src="shop/background-img.jpg" alt="Los Angeles" />
          </div>
          <div>
            <img src="shop/image-slide/toy-3631315.jpg" alt="Chicago" />
          </div>
          <div>
            <img src="shop/image-slide/danbo-1206484.jpg" alt="New York" />
          </div>
        </Slider>
      </div>
      
    </Container>
  )
}

export default MainSlider;

const Container = styled.div`



.center-aside, .center-aside img{
  box-shadow: 0px 0px 0px 0.5px rgba(50, 50, 93, 0.1),
    0px 2px 5px 0px rgba(50, 50, 93, 0.1),
    0px 1px 1.5px 0px rgba(0, 0, 0, 0.07);
  border-radius: 4px;
  width:690px;
  height:360px;
  object-fit: cover;
   
}
.slick-dots {
  bottom: 10px;  // play with the number of pixels to position it as you want
  font-size:80px;
  
}

`

