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
            <a href="#"><i className="fab fa-facebook-f" /></a>
            <a href="#"><i className="fab fa-instagram" /></a>
            <a href="#"><i className="fab fa-twitter" /></a>
            <a href="#"><i className="fab fa-youtube" /></a>
            {/* phone number*/}
            <p className="phone"> Call us +21289027499</p>
          </div>
        </div >
        </div >
        </Container>
      )
    }
  }

  export default Header
  const Container = styled.div`

@media only screen and (max-width: 768px) {
  /* For mobile phones: */
  &{
     
      visibility:hidden;
   }
 
}
  
  
  `