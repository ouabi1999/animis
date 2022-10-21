import React, { Component } from 'react';
import styled from 'styled-components'
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Link, Outlet } from 'react-router-dom'
import StoreIcon from '@mui/icons-material/Store';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import GroupsIcon from '@mui/icons-material/Groups';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import ChatIcon from '@mui/icons-material/Chat';
import MarkunreadIcon from '@mui/icons-material/Markunread';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import MenuIcon from '@mui/icons-material/Menu';

class DashSideBar extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         menuOpen:false,
      }
    }
    
    
    render() {
        return (
            <LinkWrraper>
                <div> 
                    <LogoWrap>
                       <Link to="/" > logo</Link>
                    </LogoWrap>
                   
                    <Wrap>
                        <div>
                            <DashboardIcon className='icon' />
                        </div>
                        <div className='Dash'>
                            <Link to="/admin"> Dashboard</Link>
                        </div>
                    </Wrap>
                    <Wrap>
                        <div>
                            <ShoppingBasketIcon />
                        </div>
                        <div>
                            <Link to="/admin/dashproducts">Products</Link>
                        </div>
                    </Wrap>

                    <Wrap>
                        <div>
                            <StoreIcon />
                        </div>
                        <div>
                            <Link to="orders">Orders</Link>
                        </div>
                    </Wrap>

                    <Wrap>
                        <div>
                            <ProductionQuantityLimitsIcon />
                        </div>
                        <div>
                            <Link to="orders-details">Orders Details</Link>
                        </div>
                    </Wrap>
                    <Wrap>
                        <div>
                            <GroupsIcon />
                        </div>
                        <div>
                            <Link to="customers">Customers</Link>
                        </div>
                    </Wrap>
                    <Wrap>
                        <div className='icons'>
                            <ChatIcon />
                        </div>
                        <div>
                            <Link to="admin-chat">Chat</Link>
                        </div>
                    </Wrap>
                    <Wrap>
                        <div className='icons'>
                            <MarkunreadIcon />
                        </div>
                        <div>
                            <Link to="email-us">Email</Link>
                        </div>
                    </Wrap>
                    <Wrap>
                        <div className='icons'>
                            <LeaderboardIcon />
                        </div>
                        <div>
                            <Link to="analytics">Analytics</Link>
                        </div>
                    </Wrap>
                </div>
            </LinkWrraper>

        )
    }
}

export default DashSideBar;

const LinkWrraper = styled.div`
   display:flex;
   flex-direction:column;
   background:rgb(250, 250, 250);
   box-shadow:10px 4px 15px  rgb(80,80,80,0.8);
   height:100%;
   position:fixed;
   left:0;
   width:250px;
  
`

const Wrap = styled.div`
    display:flex;
    align-items:center;
    margin:5px  0px;
    padding:10px 10px;
    background:rgb(200, 200, 200, 0.2);
    color:black;
    font-size:0.8rem;
    font-weight:900;
    
    
   div{
      color:orange; 
      margin-left:5px; 
   }
    
`
const LogoWrap = styled.div`
    background:rgb(200, 200, 200, 0.2);
    margin-right:  2px;
    padding:10px 10px;
    text-align:center;
    height:65px;
`



