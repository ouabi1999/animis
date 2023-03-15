import React from 'react'
import styled from 'styled-components'
import HeadeSeo from './Heade'

function PageNotFound() {
  return (
    <Container>
      <HeadeSeo title = "Page not found"/>
        <img src='../images/pageNotFound.png' alt="" />
    </Container>
  )
}

export default PageNotFound
const Container = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    background: #000420;
    height:100vh;
   

`