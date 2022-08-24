import React from 'react'
import styled from "styled-components"
import SearchInput from './SearchInput'

function MainFilter() {
  return (
    <Container>
        <Wrapp>
           <span>One Piece</span>
        </Wrapp>
        <Wrapp>
           <span> Attack On Titan</span>
        </Wrapp>
        <Wrapp>
           <span>Hunter X Hunter </span>
        </Wrapp>
        <Wrapp>
           <span> Dragon Ball</span>
        </Wrapp>
        <Wrapp>
           <span> One Punch Man</span>
        </Wrapp>
        <Wrapp>
           <span> Baki </span>
        </Wrapp>
        
        
    </Container>
  )
}

export default MainFilter
const Container = styled.div`
     display:flex;
     justify-content:flex-end;
     height:40px;
     align-items:center;
     padding-right:10px;
     color:rgba(60, 60, 60, 0.9);

     border-bottom:1px solid lightgray;

     
     @media only screen and (max-width: 1022px) {
    &{
      display:none;
      
     
      
    }
    
   
  }


`
const Wrapp = styled.div`
     
     
     padding: 2px 15px ;
     border-left:1px solid rgba(60, 64, 67, 0.1);
    
    
    
     span{
        font-size:12px;
     }


`