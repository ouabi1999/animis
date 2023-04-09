import React, { useEffect, useState } from 'react'
import styled from "styled-components"
import Flag from 'react-world-flags'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import OutsideClickHandler from 'react-outside-click-handler';
import data from "../../common/countries.json"
function DrpDwnMenu_lang() {
    const [isActive, setIsActive] = useState(false)
    const [language, setLanguage] = useState("")
    const [currency, setCureency] = useState("")
    const [country, setCountry] = useState(window.localStorage.getItem("country") || "us" )

    const DropDown =  () =>{
        setIsActive(!isActive)
    }
   
    useEffect(() => {
        if(!window.localStorage.getItem("country")){
            fetch("https://ipinfo.io/json?token=ced98efb100ff5")
            .then(response => response.json())
            .then(data => {
              setCountry(data.country)
              console.log(data)
              window.localStorage.setItem("country", data.country)
             })
            .catch(error => console.log(error));
        }
      }, []);
    
  return (
    <OutsideClickHandler
    onOutsideClick={() => {
        setIsActive(false)
    }}
  >
      <Container>
          <div className='Lang_currency'>
              <button onClick={DropDown}  >
                <Flag className='flag-icon' code={country} />
                <span> / English </span>
                <span> / USD </span>
                <ArrowDropDownIcon className='dropDownArrow-icon' />
              </button>
          </div>
            {isActive && (
                <Wrapper>
                    <div>
                        <label> Ship to </label>
                        <select value={country} onChange={((e) => {
                                    setCountry(e.target.value);
                                    window.localStorage.setItem("country", e.target.value);
                                })
                                }
                                >
                            {data?.map((country, index) =>{
                                return(
                                    
                                  <option key={index} value={country.code}>
                                    {country.name}
                                    </option>
                                    
                                    
                                )
                            })}
                            
                        </select>
                    </div>
                    <div>
                        <label> Language </label>
                        <select>
                            <option value="Japan" >English</option>
                           
                        </select>
                    </div>
                    <div>
                        <label> Currency </label>
                        <select>
                            <option value="Japan" >USD</option>
                           
                        </select>
                    </div>
                    <div className='save-button'>
                        <button  onClick={DropDown} type="button">Save</button>
                    </div>
                </Wrapper>
            )}
        </Container>
        </OutsideClickHandler>
    )
}

export default DrpDwnMenu_lang

const Container = styled.div`
    position:relative;
    
   
    .Lang_currency button {
        display:flex;
        align-items:center;
        justify-content:space-between;
        padding:2px 10px;
        background:#fff;
        height:38px;
        border-radius:5px 5px 0px 0;
        z-index: 1;
        
      }
      .Lang_currency span:nth-child(3){
        margin-left:5px;
      }
    
      .Lang_currency .flag-icon{
          width:30px;
          height:20px;
          object-fit:cover;
          margin-right:5px;
      }
      .Lang_currency span{
          font-size:12.5px;
          white-space: nowrap;
          
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
    z-index:2;
    width:255px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
    
    
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