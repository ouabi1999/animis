import React from 'react'
import { useSelector } from 'react-redux';
import styled from 'styled-components'

function NotFound() {
   
    const list = useSelector((state) => state.filteredProduct.filteredData);
  return (
    <Container>

         <span> No Product found..! </span>
       
    </Container>
  )
}

export default NotFound
const Container = styled.div`
     display:flex;
     align-items:center;
     justify-content:center;
     height: calc(100vh - 80px);


`