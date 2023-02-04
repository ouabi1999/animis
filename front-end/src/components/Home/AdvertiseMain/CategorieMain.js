import React,{useEffect} from 'react'
import { useSelector } from 'react-redux'
import styled from "styled-components"


function CategorieMain() {
  const displayData = useSelector(state => state.display.display)
  
  return (
    <Container data ={displayData?.main_category}>
        <div className='item1'>
            
        </div>
        <div className='item2'>
            
        </div>

        <div className='item3'>
            
        </div>
        <div className='item4'>
           
          </div>
          <div className='item5'>
           
          </div>
  
          <div className='item6'>
          
          </div>
        
    </Container>
  )
}

export default CategorieMain

const Container =  styled.div`
    
    
    min-width:320px;
    height:52vh;
    
    display:grid;
    gap: 10px;

  

   div{
      background-size: cover;
      border-radius: 4px;
      background-color: lightblue;
      box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
      animation: skeleton-loading 1s linear infinite alternate;
      -webkit-animation: skeleton-loading 1s linear infinite alternate;
      animation: skeleton-loading 1s linear infinite alternate;
}

@-webkit-keyframes skeleton-loading {
  0% {
    background-color: #c2cfd6;
  }
  100% {
    background-color: #f0f3f5;
  }
}

@keyframes skeleton-loading {
  0% {
    background-color: #c2cfd6;
  }
  100% {
    background-color: #f0f3f5;
  }
}
    .item1{
        grid-column: 1 / span 1; 
        grid-row: 1 /span 2;
        background-image: url(${props => props?.data?.[0]?.img[0]});
      
    }

    .item2{
      grid-column: 2 / span 1;
      grid-row: 1 / span 2;
      width:100%;
    
      background-image: url(${props => props?.data?.[1]?.img[0]});
      
    }

    .item3{
      grid-column: 3 / span 2;
      grid-row: 1 /span 2;
      width:100%;
      background-image: url(${props => props?.data?.[2]?.img[0]});
    
     

    }

    .item4{
      grid-column: 1 / span 2;
      grid-row: 3 / span 2;
      background-image: url(${props => props?.data?.[3]?.img[0]});
    }

    .item5{
      grid-column: 3 / span 1;
      grid-row: 3 / span 2;
      background-image: url(${props => props?.data?.[4]?.img[0]});
      
      
      
    }
    .item6{
      grid-column: 4 / span 1;
      grid-row: 3 / span 2;
       background-image: url(${props => props?.data?.[5]?.img[0]});
  
    }


    @media only screen and (max-width:1024px) {
      .item1{
        grid-column: 1 / span 1;
        grid-row: 1 /span 3;
       
      
    }

    .item2{
      grid-column: 2 / span 1;
      grid-row: 1 / span 6;
    
     
      
    }

    .item3{
      grid-column: 3 / span 1;
      grid-row: 1 / span 3;
    }

    .item4{
      grid-column: 4 / span 1;
      grid-row: 1 / span 6;
    }

    .item5{
      grid-column: 1 / span 1;
      grid-row: 4 / span 3;
    }
    .item6{

      grid-column: 3 / span 1;
      grid-row: 4 / span 3;
    
    }
    
    }


    @media only screen and (max-width:885px) {
       &{
        height:100vh
       }
      .item1{
       grid-row:1 / span 3;
       grid-column:1 / span 1
      
    }

    .item2{
     
      grid-row:1 / span 3;
      grid-column:2;
     
      
    }

    .item3{
      grid-row:4 / span 3;
      grid-column:1;
     
    }

    .item4{
      grid-row:4 / span 3;
      grid-column:2;
     
    }

    .item5{
      grid-row: 7 / span 3 ;
      grid-column:1;
    
    }
    .item6{
      grid-row: 7 / span 3 ;
      grid-column:2;
    
    }
    
    }

    @media only screen and (max-width:420px){
      &{
        height:420px;
        min-width:300px;
      }
      .item1{
       grid-row:1 / span 2;
       grid-column:1 / span 1
      
    }

    .item2{
     
      grid-row:1 / span 2;
      grid-column:2;
     
      
    }

    .item3{
      grid-row:3 / span 2;
      grid-column:1;
     
    }

    .item4{
      grid-row:3 / span 2;
      grid-column:2;
     
    }

    .item5{
      grid-row: 5 / span 2 ;
      grid-column:1;
    
    }
    .item6{
      grid-row: 5 / span 2 ;
      grid-column:2;
    
    }
    }
       
`