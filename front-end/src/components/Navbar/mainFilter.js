import React from 'react'
import styled from "styled-components"
import SearchInput from './SearchInput'
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
function MainFilter() {
  return (
    <Container>
     
      <MinWrap>
          <MonetizationOnIcon className="icon"/>
          <span>
            Money back guarantee
          </span>
      </MinWrap>
      <MinWrap>
        <VerifiedUserIcon className= "icon"/>
        <span>Safe & reliable payments</span>
      </MinWrap>
      <MinWrap>
          <SupportAgentIcon className= "icon"/>
          <span> 24/7 Customer service</span>
      </MinWrap>
      

     <div className="series-container">

      <Wrapp>
           <img  className="skeleton" src="./logos/baki.png" alt="" />
        </Wrapp>
        <Wrapp>
           <img className="skeleton" src="./logos/hunterxhunter.png" alt=""/>
        </Wrapp>
        <Wrapp>
           <img className="skeleton" src="./logos/Attack-on-Titan-Logo.png" alt="" />
        </Wrapp>
      <Wrapp>
           <img className="skeleton" src="https://res.cloudinary.com/dzpzy1o1y/image/upload/v1681526190/naruto-37644_fb2gcy.png" alt=""/>
      </Wrapp>
        <Wrapp>
           <img className="skeleton" src="./logos/One_Piece_Logo.png" alt="" />
        </Wrapp>
        <Wrapp>
           <img className="skeleton" src="./logos/Dragon_Ball_Logo.png" alt="" />
        </Wrapp>
     </div>
    </Container>
  )
}

export default MainFilter
const Container = styled.div`
     display:flex;
     align-items:center;
     justify-content:space-between;
     padding-right:10px;
     padding:8px;
     color:rgba(60, 60, 60, 0.9);
     border-bottom:1px solid lightgray;
     background:#ffff;

     img{
         width:100%;
         height:100%;
         
       }
       .series-container{
        display:flex;
         align-items:center;

       }
     @media only screen and (max-width:1115px) {
      .series-container{
        display:none;
      
     
      
    }
    
   
  }


`
const Wrapp = styled.div`
     
     
     padding: 2px 15px ;
     border-left:1px solid rgba(60, 64, 67, 0.1);
     width:120px;
     height:35px;
    
     span{
        font-size:12px;
     }

     .skeleton {
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


`
const MinWrap = styled.div`
    font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    display:flex;
    align-items:center;
    padding: 2px 5px ;
    flex-wrap:nowrap;
    border-left:1px solid rgba(60, 64, 67, 0.1);

     span{
       font-size:1rem;
       color:#000;
     }
    .icon{
      color:#e65c00;
      margin-right:3px;
    }

`