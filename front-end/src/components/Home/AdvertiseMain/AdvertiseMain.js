import React from 'react'
import CategorieMain from './CategorieMain'
import MainSlider from './MainSlider'
import styled from 'styled-components'
function AdvertiseMain() {
  return (
    <Container>
      
        <MainSlider />
      
    
        <CategorieMain />
    

    </Container>
  )
}
export default AdvertiseMain

const Container = styled.div`
    display:flex;
    background: rgb(63,94,251);
    background: radial-gradient(circle, rgba(63,94,251,0.5746673669467788) 0%, rgba(252,70,107,0.227328431372549) 100%);
    padding:18px 25px;
    width:95%; 
    margin: 50px auto;
    border-top: 1px solid rgb(194, 193, 193);
    border-bottom: 1px solid rgb(194, 193, 193);

    

`