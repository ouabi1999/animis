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
    /* fallback for old browsers */
    background: rgb(241,145,49);
    background: linear-gradient(180deg, rgba(241,145,49,0.18531162464985995) 0%, rgba(255,45,45,1) 100%);
    padding:18px 15px;
    margin: 50px auto;
   

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