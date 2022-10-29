import React from 'react'
import styled from "styled-components"
import SearchInput from './SearchInput'

function MainFilter() {
  return (
    <Container>
      <Wrapp>
           <img src="./logos/onepunch.png" alt=""/>
        </Wrapp>
     
        
        
        
        <Wrapp>
           <img src="./logos/One_Piece_Logo.png" alt="" />
        </Wrapp>
        <Wrapp>
           <img src="./logos/Dragon_Ball_Logo.png" alt="" />
        </Wrapp>
        <Wrapp>
           <img src="./logos/baki.png" alt="" />
        </Wrapp>
        <Wrapp>
           <img src="./logos/hunterxhunter.png" alt=""/>
        </Wrapp>
        <Wrapp>
           <img src="./logos/Attack-on-Titan-Logo.png" alt="" />
        </Wrapp>
        
        
    </Container>
  )
}

export default MainFilter
const Container = styled.div`
     display:flex;
     justify-content:flex-end;
     align-items:center;
     padding-right:10px;
     color:rgba(60, 60, 60, 0.9);
     margin-top:10px;
     border-bottom:1px solid lightgray;

     img{
         width:100%;
         height:100%;
         
       }
     @media only screen and (max-width:768px) {
    &{
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


`