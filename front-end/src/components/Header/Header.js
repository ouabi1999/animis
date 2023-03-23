import React from 'react';
import styled from 'styled-components';
function Header(){
 
    const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      `${"check this amazing anime website shop you may like it"} ${window.location.href}`
    )}`;
    const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=
    ${encodeURIComponent("check this amazing anime website shop you may like it")}`;
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`
      return (

        <Container>
        <div className="social-call" >
          <div className="social-call" >
          {/* social link */}
          <div className="social">
            <a  rel="noreferrer" target="_blank" href={facebookShareUrl}><i className="fab fa-facebook-f" /></a>
            <a  rel="noreferrer"   target="_blank" href={whatsappShareUrl }><i className="fab fa-whatsapp" /></a>
            <a  rel="noreferrer"   target="_blank" href={twitterShareUrl}><i className="fab fa-twitter" /></a>
            {/* phone number*/}
           
          </div>
        </div>
        </div>
        </Container>
      )
    
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