import React from 'react'
import { useSelector } from 'react-redux';
import styled from 'styled-components'

function NotFound() {
  const search  = useSelector((state) => state.filteredProduct.search);
  const selectedCategory = useSelector((state) => state.filteredProduct.category)

  return (
    <Container>

        <span> Sorry, there were no matches in the animis category {search !== "" && `for "${search}"`}.</span>
       
    </Container>
  )
}

export default NotFound
const Container = styled.div`
     display:flex;
     align-items:center;
     justify-content:center;
     height: calc(100vh - 80px);
     padding:10px;

     span{
      font-size:14px;
      word-wrap:break-word;
      word-break:break-all;
      font-weight:500;
      font-family:Arial, Helvetica, sans-serif
     }


`