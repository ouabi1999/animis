import React from 'react'
import styled from "styled-components"


function CategorieMain() {
  return (
    <Container>
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
    
    
    
    height:52vh;
    
    display:grid;
    gap: 10px;

  

   div{
      
      border-radius: 4px;
      background-color: lightblue;
      box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
    }
    
    .item1{
        grid-column: 1 / span 1;
        grid-row: 1 /span 2;
        background:url("./catogorey/anime-clothes.jpg");
      
    }

    .item2{
      grid-column: 2 / span 1;
      grid-row: 1 / span 2;
      background:url("./catogorey/braclet.jpg");
      background-repeat:no-repeat;
      
    }

    .item3{
      grid-column: 3 / span 2;
      grid-row: 1 /span 2;
      background:url("./catogorey/anime-toys.jpg");
      background-repeat:no-repeat;
      width:100%;
      height:auto;
      object-fit:cover;
     

    }

    .item4{
      grid-column: 1 / span 2;
      grid-row: 3 / span 2;
      background:url("./catogorey/anime-bags.jpg");
      background-repeat:no-repeat;
    }

    .item5{
      grid-column: 3 / span 1;
      grid-row: 3 / span 2;
      background:url("./catogorey/poster-wall.jpg");
      background-repeat:no-repeat;
    }
    .item6{
      grid-column: 4 / span 1;
      grid-row: 3 / span 2;
      background:url("./catogorey/anime-clothes.jpg");
      background-repeat:no-repeat;
    }


 
       
`