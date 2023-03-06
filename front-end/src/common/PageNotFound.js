import React from 'react'
import styled from 'styled-components'

function PageNotFound() {
  return (
    <Container>
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