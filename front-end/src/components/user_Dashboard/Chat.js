import React from 'react'
import TextField from '@mui/material/TextField';
import { Box } from '@mui/material'
import styled from "styled-components"

function Chat() {
  return (
    <Wrapper>
    <div className="setting-container">
        <div className='item1'>
        <TextField id="outlined-basic" label="Full Name" variant="outlined" />
        </div>
        
        <div className='item3'>    
            <TextField id="outlined-basic" label = "Email" variant="outlined" />
        </div>
        
        <div className='item4'>
          
            <TextField id="outlined-basic" label = "Countery " variant="outlined" />
        </div>
        <div className='item5'>

            <TextField id="outlined-basic" label = "Old Password" variant="outlined" />
        </div>
        <div className='item6'>
        
            <TextField id="outlined-basic" label = "New Password" variant="outlined" />
        </div>
        <div className='item7'>
            <TextField id="outlined-basic" label = "Confirm Password" variant="outlined" />
        </div>
        <ButtonWrapper>
             <button type="button">Save Changes</button>
         </ButtonWrapper>
    </div>
    
    </Wrapper>
    
  )
}

export default Chat

const Wrapper = styled.div`
     display:flex;
     justify-content:center;
     margin-top:25px;

    .setting-container{
      display:grid;
      grid-template-columns:auto auto;
      grid-gap:10px;
    }
     
`

const ButtonWrapper =  styled.div`
    grid-column:1 / span 2;
    grid-row: 5 ;
   

    button{
        font-size:15px;
        font-weight:550;
        padding:10px 6px;
        border-radius:4px;
        color:#ffff;
        margin-bottom:4px;
        background: #0052D4;   
    }

    


`