import React, { useState } from 'react'
import styled from "styled-components"
import Flag from 'react-world-flags'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

function DrpDwnMenu_lang() {
    const [isActive, setIsActive] = useState(false)

    const DropDown =  () =>{
        setIsActive(!isActive)
    }

  return (
      <Container>
          <div className='Lang_currency'>
              <button onClick={DropDown}  >
                <Flag className='flag-icon' code="us" />
                <span> / English </span>
                <span> / USD </span>
                <ArrowDropDownIcon className='dropDownArrow-icon' />
              </button>
          </div>
            {isActive && (
                <Wrapper>
                    <div>
                        <label> Ship to </label>
                        <select>
                            <option value="Japan" >Spain</option>
                            <option value="Japan" >French</option>
                            <option value="Japan" >United State</option>
                        </select>
                    </div>
                    <div>
                        <label> Language </label>
                        <select>
                            <option value="Japan" >English</option>
                            <option value="Japan" >Japan</option>
                            <option value="Japan" >spanish</option>
                        </select>
                    </div>
                    <div>
                        <label> Currency </label>
                        <select>
                            <option value="Japan" >USD</option>
                            <option value="Japan" >EUR</option>
                            <option value="Japan" >DH</option>
                        </select>
                    </div>
                    <div className='save-button'>
                        <button type="button">Save</button>
                    </div>
                </Wrapper>
            )}
        </Container>
    )
}

export default DrpDwnMenu_lang

const Container = styled.div`
    position:relative;
    
    margin-right:80px;
    .Lang_currency button {
        display:flex;
        align-items:center;
        justify-content:space-between;
        padding:2px 10px;
        background:#fff;
      }
      .Lang_currency span:nth-child(3){
        margin-left:5px;
      }
    
      .Lang_currency .flag-icon{
          width:30px;
          height:20px;
          object:cover;
          margin-right:5px;
      }
      .Lang_currency span{
          font-size:12.5px;
          
      }
    select{
        width:100%;
        border-radius:4px;
        padding:10px;
        border:1px solid lightgrey;
        color:black;
        background-image:linear-gradient(45deg, transparent 84%, rgb(240, 240, 240, 0.7) 20%);
        cursor:pointer; 
    }
  

`
const Wrapper = styled.div`
    transition: 2s;
    position:absolute;
    background:#fff;
    padding:5px 10px;
    z-index:1;
    width:250px;
   .save-button{
       display:flex;
       justify-content:center;
   }
   .save-button button{
       background:orange;
       border-radius:4px;
       margin-top:10px;
       color:#fff;
       padding: 8px 15px;
       font-size:15px;
       width:100%;

   }
`