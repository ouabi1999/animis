import React from 'react';
import styled from 'styled-components';
class Header extends React.Component {
    render() {
      return (
        <Container>
        <div className="social-call" >
          <div className="social-call" >
          {/* social link */}
          <div className="social">
            <a  rel="noreferrer" target="_blank" href="https://facebook.com/animisstore"><i className="fab fa-facebook-f" /></a>
            <a  rel="noreferrer"   target="_blank" href="https://www.instagram.com/an.imis"><i className="fab fa-instagram" /></a>
            <a  rel="noreferrer"   target="_blank" href="https://twitter.com/animisshop"><i className="fab fa-twitter" /></a>
            <a  rel="noreferrer"   target="_blank" href="https://www.youtube.com/@animisshop" ><i className="fab fa-youtube" /></a>
            {/* phone number*/}
           
          </div>
        </div>
        </div>
        </Container>
      )
    }
  }

  export default Header
  const Container = styled.div`

.social-call{
    height:40px;
    justify-content: center;
    align-items:center;
    display:flex;
    background-color: black; 
  }

.phone,.social a {
    color:white;
    margin-left:20px;
    font-size:0.8rem;
    font-weight: bold;
    display:inline;
}
 .social a:hover{
    color:rgb(250, 0, 0);
    transition: all ease 0.3s;
}






@media only screen and (max-width: 768px) {
  /* For mobile phones: */
  &{
     
      visibility:hidden;
      height:auto;
   }
   .social-call{
    
   }
}
  
  
  `