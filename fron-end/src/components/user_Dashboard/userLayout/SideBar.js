import React from 'react'
import styled from "styled-components"
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import FeedIcon from '@mui/icons-material/Feed';
import { Link } from 'react-router-dom';

function SideBar() {
  return (
    <Side_Bar>
    <ol>
      <li>
        <FeedIcon className="sidebar_icons" />
        <Link to="profile">
          <span>
            My Details
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
        <SettingsIcon className="sidebar_icons" />
        <Link to="setting">
          <span>
            Settings
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
      <li>
        <DeleteIcon className="sidebar_icons" />
        <Link to="delete-account">
          <span>
            Delete Account
          </span>
        </Link>
      </li>
    </ol>
  </Side_Bar>
  )
}

export default SideBar

const Side_Bar = styled.div`
    position: sticky;
    z-index:1;
    top:67px;
    height:100%;
    flex:0.4;
    background:rgb(255, 255, 255);
    box-shadow: 5px 8px 12px rgb(100, 100, 100, 0.4);
    
    ol{
       margin-left:-40px;
       margin-top:0px;
    }
    li{
        background:lightgray;
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
        color:rgb(179, 255, 255);
    }
`