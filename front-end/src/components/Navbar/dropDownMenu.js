import React, { Component, useState } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import OutsideClickHandler from 'react-outside-click-handler';
import { logout } from '../../features/auth/authSlice'
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';

function DropDownMenu(props) {
    const auth = window.localStorage.getItem("isAuthenticated")
    const dispatch = useDispatch()
    const user = useSelector(state => state.auth.user)
    
    const [isOpen, setIsOpen] = useState(false)
    

  

  

  const setLogout = () =>{
    fetch("/logout",{
      method:"POST",
      credentials: 'same-origin'
    }
    ).then(response => {
      if (response.ok) {
        dispatch(logout())
        window.location.href = "/"
        return response.json()
    }
  }).catch(error=> console.log(error))   
}
  
    return (
      <OutsideClickHandler
      onOutsideClick={() => {
          setIsOpen(false)
      }}
      >
    
      <Contanier>
        <Profile_wrap>
                <PersonIcon 
                      onClick={() => setIsOpen(!isOpen) }
                      style={{color:"gray", cursor:"pointer"}}
                />  
        </Profile_wrap>

          {isOpen && (
          <DropDown_Container>
            <div className='DropDown_Container'>
             
                  <Link onClick={props.hideMenu} to="/profile" className='profile-container'>
                    <PersonIcon className="profile-icon" />
                    <span>
                        Profile

                    </span>
                  </Link>

                <button onClick={setLogout} className='logout-container'>
                   <LogoutIcon className="logout-icon"/>
                    <span> Logout </span>
                </button>
            </div>  
          </DropDown_Container>
          )}
      </Contanier>
      
      </OutsideClickHandler>
    )
  }



export default DropDownMenu

const Contanier = styled.div`
    margin-bottom:4px;
    padding:0;
    position:relative;
    
`

const Profile_wrap = styled.div`

  background:lightblue;
  width:40px;
  height:40px;
  border-radius:50%;
  display:flex;
  justify-content:center;
  align-items:center;

`

const Image = styled.img`

  object-fit: cover;
  width:35px;
  height:35px;
  border-radius:50%;
  cursor:pointer;

`
const DropDown_Container = styled.div`
    border-radius:4px;
    background:#fff;
    position:absolute;
    left:-55px;
    bottom:-75px;
    z-index:2;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    
    .DropDown_Container{
          display:flex;
          flex-direction:column;
          justify-content:center;
          margin:auto;
          padding:10px 15px;
      }

    .logout-container{ 
       display:flex;
       align-items:center;
       background:none;
      }
      
    span, a{
      font-size:15px;
      font-family: 'Arial Narrow', Arial, sans-serif;
      color:#000;
      font-weight:bold;
    }
    .logout-icon, .profile-icon{
        font-size:20px;
      }

  .profile-container{
        display:flex;
        align-items:center;
        margin-left:3px;
        margin-bottom:8px;
      }
 



`