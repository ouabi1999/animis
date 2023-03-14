import React from 'react'
import styled from 'styled-components'
import Newsletter from './Newsletter'
import { Link, NavLink, useNavigate } from "react-router-dom"
import {setCategory } from '../../features/categories/categorySlice'
import { useDispatch } from 'react-redux'


const Footer = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const SelectedCategory = (value)=>{
    dispatch(setCategory(value))
    

  }
  return (
  
      <Container>

        <Wrapper>
          <Wrapp>

            <ul className="policy">
              <li className="text-info">Polices</li>
              <li><Link  to="terms-of-services">Terms Of services</Link></li>
              <li><Link to="about-us"> About us </Link ></li>
              <li><Link  to="contact-us"> Contact us </Link ></li>
              <li><Link  to="privacy-policy"> Privacy Policy </Link></li>
            </ul>


            <ul className="social-categorie">
              <li className="text-info">Follow us</li>
              <li>
              <i className="fab fa-facebook-f" />
                <a target="_blank" href="https://facebook.com/animisstore"> Facebook</a>
              </li>
              <li>
                <i className="fab fa-instagram" />
                <a   target="_blank" href="https://www.instagram.com/an.imis">Instagram</a>
              </li>
              <li>
                <i className="fab fa-twitter" />
                <a   target="_blank" href="https://twitter.com/animisshop">Twitter</a>
              </li>
              <li>
                <i className="fab fa-youtube" />
                <a   target="_blank" href="https://www.youtube.com/@animisshop" >Youtube</a>
              </li>
            </ul>
   
            
            
            
            <ul className="footer-categorie">
              <li className="text-info">Categorie</li>
              <li>
                <Link to="/category"onClick={(e)=> SelectedCategory("accessoires")} >Accessoires</Link>
                </li>
              <li>
                <Link to="/category" onClick={(e)=> SelectedCategory("clothing")}>Clothes </Link>
                </li>
              <li>
                <Link to="/category" onClick={(e)=> SelectedCategory("bags")}>Bags</Link>
                </li>
              <li>
                <Link to="/category" onClick={(e)=> SelectedCategory("figures")}>Figures</Link>
                </li>
              <li>
                <Link to="/category" onClick={(e)=> SelectedCategory("posters")}>Anime Poster</Link>
                </li>
            </ul>

            <Newsletter />
          </Wrapp>
         
         
        </Wrapper>
        <div className='CopyRight'>
          <span className='copy'>All right reserved <i className="fa fa-copyright"> Copyright {new Date().getFullYear()}</i></span>
        </div>
      </Container>



  )
}
export default Footer


const Container = styled.div`
    width:100%;
    min-width:320px;
    border:1px solid rgb(243, 240, 240);
    background-color:#262626;
    padding:0px 10px;
    
    
    

    .CopyRight{
        display:flex;
        justify-content:flex-end;
        margin: 0 15px 10px 0;
        
    }
    .CopyRight span{
      margin-left:20px;
      color:#fff;
      font-size:14px;
      margin-top:5px;
    
    }
    .copy {
      
      
    }
    


`
const Wrapp = styled.div`
     display:grid;
     grid-template-columns: repeat(4, auto);
    
     
     @media only screen and (max-width: 870px) {
  &{
     
    grid-template-columns: repeat(2,auto);

  }
}
@media only screen and (max-width: 700px) {
  &{ 
    grid-template-columns: repeat(1, auto);
  }
}
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
