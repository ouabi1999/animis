import React from 'react'
import CategorieMain from './CategorieMain'
import MainSlider from './MainSlider'
import styled from 'styled-components'
function AdvertiseMain() {
  return (
    <Container>
       
        <div className="main-slider">
        <MainSlider />
        </div>
      
      <div className="categorie-main">
        <CategorieMain />
      </div>

    </Container>
  )
}
export default AdvertiseMain

const Container = styled.div`
    
    
    height:100%;
    width:95%;
    background: #83a4d4;
    /* fallback for old browsers */
    background:#fff;
    padding:18px 15px;
     
    border-radius:6px;
    margin: 50px auto;
    border-top: 1px solid rgb(255, 165, 0, 0.4);
    border-bottom: 1px solid rgb(255, 165, 0, 0.4);

    display:grid;
    grid-gap:10px;
  
  
    grid-template-columns: 55%  44%;
    
     .main-slider{
       
        margin-bottom:10px;
     }
     .categorie-main{
       
      
     }
     .container{
          
          
    
     }
    
    @media only screen and (max-width:1112px) {
      &{
        
        grid-template-columns: 100%;
      
      }
    
    }
    @media only screen and (max-width:560px) {
      &{
        
        
        padding:10px 5px;
      
      }
    
    }

    

`