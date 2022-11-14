import React from 'react'
import styled from "styled-components"
function Banner() {
  return (
    <Container>
        <img src="./images/banner.jpg" alt=""/>
    </Container>
  )
}

export default Banner
const Container = styled.div`
    margin:auto;
     width:90%;
     img{
         width:100%;
     }
`