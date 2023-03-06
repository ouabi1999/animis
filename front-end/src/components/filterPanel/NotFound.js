import React from 'react'
import { useSelector } from 'react-redux';
import styled from 'styled-components'

function NotFound() {
   
  return (
    <Container>

         <span> Sorry, there were no matches in the Animis category.</span>
       
    </Container>
  )
}

export default NotFound
const Container = styled.div`
     display:flex;
     align-items:center;
     justify-content:center;
     height: calc(100vh - 80px);

     span{
      font-size:14px;
      font-weight:500;
      font-family:Arial, Helvetica, sans-serif
     }


`