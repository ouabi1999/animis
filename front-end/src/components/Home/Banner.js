import React from 'react'
import { useSelector } from 'react-redux';
import styled from "styled-components"
function Banner() {
  const displayData = useSelector(state => state.display.display);
  
  return (
    <Container>
        {displayData?.banners?.[0] && (
        <img src = {displayData.banners[0]} alt=""/>
      )}
    </Container>
  )
}
  
export default Banner
const Container = styled.div`
    margin:auto;
    width:90%;
     img{
        width:100%;
        height:100%;
     }
`