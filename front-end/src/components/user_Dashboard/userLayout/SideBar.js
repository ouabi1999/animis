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
        <FeedIcon className="sidebar_icons" />
        <Link to="/profile">
          <span>
            My Profile
          </span>
        </Link>
      </li>
      <li>
        <ShoppingBasketIcon className="sidebar_icons" />
        <Link to="myorders">
          <span>My Orders</span>
        </Link>
      </li>
      <li>
        <NotificationsIcon className="sidebar_icons" />
        <Link to="notifications">
          <span>
            Notifications
          </span>
        </Link>
      </li>
      <li>
        <EmailIcon className="sidebar_icons" />
        <Link to="chat">
          <span>
            Chat
          </span>
        </Link>
      </li>
      <li>
        <SupportAgentIcon className="sidebar_icons" />
        <Link to="help-center">
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
    flex:0.6;
    box-shadow: 5px 8px 12px rgb(100, 100, 100, 0.4);
    padding-left:10px;
    
    ol{
       margin-left:-40px;
       margin-top:0px;
    }

    li{ 
        margin-bottom:5px;
        padding:10px 5px;
        display:flex;
        align-items:stretch;

        i{
          color:#ffff;
        }

       a{
          color:black;
          margin-left:2px;
       }
    }
    .sidebar_icons{
      color:orange;
    }
`