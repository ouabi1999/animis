import React from 'react'
import styled from "styled-components"
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import FeedIcon from '@mui/icons-material/Feed';
import { Link } from 'react-router-dom';
import EmailIcon from '@mui/icons-material/Email';
import EditIcon from '@mui/icons-material/Edit';

function SideBar() { 
  return (
    <Side_Bar>
    <div className='container'>
     
      <Link to="/profile">
        <FeedIcon className="sidebar_icons" />
        
          <span>
            My Profile
          </span>
        </Link>
      
      <Link to="myorders">
        <ShoppingBasketIcon className="sidebar_icons" />
        
          <span>My Orders</span>
        </Link>
      
      <Link to="notifications">
        <NotificationsIcon className="sidebar_icons" />
        
          <span>
            Notifications
          </span>
        </Link>
      
      <Link to="chat">
        <EmailIcon className="sidebar_icons" />
        
          <span>
            Chat
          </span>
        </Link>
     
      <Link to="help-center">
        <SupportAgentIcon className="sidebar_icons" />
        
          <span>
            Help Center
          </span>
        </Link>
      </div>
  </Side_Bar>
  )
}

export default SideBar

const Side_Bar = styled.div`
    background-color:#fff;
    width:100%;
    min-height:calc(100vh - 80px);
    flex:0.5;
    min-width:250px;
    padding-left:10px;
    
    .container{
       
       position:sticky;
       top:10%;
       bottom:10%;
       left:5%;
      
    }
    span{
      font-size:15px;
    }
   


    .container a{
          display:flex;
          align-items:center;
          color:black;
          
          padding: 10px;
       }
    
    .sidebar_icons{
      color:gray;
      margin-right:8px;
    }

    @media only screen and (min-width: 600px) {
    /* For tablets: */
    }

  
  @media only screen and (max-width: 820px) {
    /* For mobile phones: */
      
      
    .container{
        display:flex;
        width:100%;
        justify-content:space-between;
        background:#fff;
       
        height:70px;
        
      }
    

      &{
        z-index:2;
        position:sticky;
        
        top:0%;
        bottom:0%;
        left:0;
        min-height:0;
        border-bottom:1px solid lightgray;
        padding-left:0px;
        margin-right:10px;
        margin-left:0;
      }

     
   
  }

  @media only screen and (max-width: 640px) {
    
    .container a span{
        display:none;
      }

  }
`