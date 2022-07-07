import React from 'react'
import styled from 'styled-components'
import Newsletter from '../newsletter/Newsletter'
import { Link, NavLink } from "react-router-dom"


const Footer = () => {
  return (
    <Parent_Container>
    <Container>
      
      <Wrapper>
        <Wrapp>
        <ul className="policy">
           <li className="text-info">Polices</li>
            <li><Link reloadDocument to="terms-of-services">Terms Of services</Link></li>
            <li><Link reloadDocument to="about-us"> About us </Link ></li>
            <li><Link reloadDocument to="contact-us"> Contact us </Link ></li>
            <li><Link  reloadDocument  to = "privacy-policy"> Privacy Policy </Link></li>
        </ul>
       

      
          <ul className="social-categorie">
            <li className="text-info">Follow us</li>
            <li>
              <i className="fab fa-facebook-f" />
              <a href="#">Facebook</a>
            </li>
            <li>
              <i className="fab fa-instagram" />
              <a href="#">Twitter</a>
            </li>
            <li>
              <i className="fab fa-twitter" />
              <a href="#">Instagram</a>
            </li>
            <li>
              <i className="fab fa-youtube" />
              <a href="#">Youtube</a>
            </li>
          </ul>
          
         
        
          <ul className="footer-categorie">
            <li className="text-info">Categorie</li>
            <li><a href="#">Accessories</a></li>
            <li><a href="#">Clothes </a></li>
            <li><a href="#">Bags</a></li>
            <li><a href="#">Toys</a></li>
            <li><a href="#">Anime Poster</a></li>
          </ul>
          <Newsletter/>
          </Wrapp>
         
      </Wrapper>
      
      
      <div className='CopyRight'>
       
       <span className='copy'>All right reserved <i className="fa fa-copyright"> Copyright 2021</i></span>
     </div>
     
    </Container>

    </Parent_Container>
    

  )
}
export default Footer
const Parent_Container = styled.div`

    display:flex;
    align-items:flex-end;

`
const Container = styled.div`
    width:100%;
    border:1px solid rgb(243, 240, 240);
    background-color:#262626;
    

    .CopyRight{
        display:flex;
        justify-content:flex-end;
        margin: 0 15px 10px 0;
        
    }
    .CopyRight span{
      margin-left:20px;
      color:#fff;
      font-size:14px;
    
    }
    .copy {
      
      
    }
    


`
const Wrapp = styled.div`
    display:flex;
    justify-content:space-between;
`
const Wrapper = styled.div`

  a{
      color:#fff;
      font-weight: bold;
      font-size: 0.9rem;
      line-height: 2;
    
    }

  

    .categorie li a {
      font-weight:normal;
      color:rgb(93, 147, 151);
      font-size:15px;
       
    }
    .text-info{
      font-weight: bolder;
      font-size:20px;
      color:orange
    
    }
    
    
    .social-categorie li i{
      color: #b3b3b3;
      margin-right:5px;
      
    }
   

`
