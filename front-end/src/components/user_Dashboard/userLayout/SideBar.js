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
    <ol>
      <li>
      <Link to="/profile">
        <FeedIcon className="sidebar_icons" />
        
          <span>
            My Profile
          </span>
        </Link>
      </li>
      <li>
      <Link to="myorders">
        <ShoppingBasketIcon className="sidebar_icons" />
        
          <span>My Orders</span>
        </Link>
      </li>
      <li>
      <Link to="notifications">
        <NotificationsIcon className="sidebar_icons" />
        
          <span>
            Notifications
          </span>
        </Link>
      </li>
      <li>
      <Link to="chat">
        <EmailIcon className="sidebar_icons" />
        
          <span>
            Chat
          </span>
        </Link>
      </li>
      <li>
      <Link to="help-center">
        <SupportAgentIcon className="sidebar_icons" />
        
          <span>
            Help Center
          </span>
        </Link>
      </li>
    </ol>
  </Side_Bar>
  )
}

export default SideBar

const Side_Bar = styled.div`
    background-color:#fff;
    width:100%;
    min-height:calc(100vh - 80px);
    flex:0.5;

    padding-left:10px;
    
    ol{
       margin-left:-40px;
      
    }
    span{
      font-size:15px;
    }
    li{ 
       
        padding:10px 5px;
       

        i{
          color:#ffff;
        }

       a{
          display:flex;
          align-items:center;
          color:black;
          margin-left:2px;
       }
    }
    .sidebar_icons{
      color:#330000;
    }

    @media only screen and (min-width: 600px) {
    /* For tablets: */
  }

  
  @media only screen and (max-width: 768px) {
    /* For mobile phones: */
      
      
      ol{
        display:flex;
        width:100vw;
        justify-content:space-between;
      }
      &{
       
        min-height:0;
        border-bottom:1px solid lightgray;
      }
      
   
  }

  @media only screen and (max-width: 600px) {
    
    li a span{
        display:none;
      }

  }
`