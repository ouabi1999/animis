import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { getUser } from '../../features/auth/authSlice'
import { Link } from "react-router-dom"
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import FeedIcon from '@mui/icons-material/Feed';

class Profile extends Component {
    render() {
        return (
            <Section>
                <ImageWrap>
                    <img src="../avatars/boy.jpg" alt="" />
                </ImageWrap>
                <span> Ouabi Abdessamad</span>
                <Wrapper>
                <div className='headers'>
                    <h2>
                    Personal information :
                    </h2>
                    
                </div>
                <div className="info_container">
                    <div className='item1'>
                        <label htmlFor='first_name'> First Name</label>
                        <input type='text' />
                    </div>
                    <div className='item2'>
                        <label htmlFor='last_name'> Last Name</label>
                        <input type='text' />
                    </div>
                    <div className='item3'>
                        <label htmlFor='Email'> Email </label>
                        <input type='text' />
                    </div>
                    <div className='item4'>
                        <label htmlFor='birthday'> Countery </label>
                        <input type='text' />
                    </div>
                    <div className='item5'>
                        <label htmlFor='old Password'> Old Password </label>
                        <input type='text' />
                    </div>
                    <div className='item6'>
                        <label htmlFor='New Password'> New Password</label>
                        <input type='text' />
                    </div>
                    <div className='item7'>
                        <label htmlFor='Confirm Password'> Confirm Password</label>
                        <input type='text' />
                    </div>
                    <ButtonWrapper>
                         <button type="button">Save Changes</button>
                     </ButtonWrapper>
                </div>
                </Wrapper>
                

            </Section>

        )
    }
}
const mapStateToProps = (state) => {

    return{
        auth: state.auth,
    }
}

export default  connect(mapStateToProps)(Profile)


const Section = styled.div`
    
   input{
   
       height:35px;
       border:1px solid lightgray;
       border-radius:4px;
       min-width:200px;
       background-color:rgb(255, 255, 255);
   }
   .headers{
       margin-left:10px;
   }
   
   
   .info_container>div {
     display:flex;
     flex-direction:column;
     margin-left:10px;
     margin-bottom:15px;
   }
   .info_container {
       margin:auto;
       display:grid;
       
       width:50%; 
      
   }
   .item1{
       grid-column:1 / span 1;
       grid-row:1 / span 1;
   }
   .item2{
    grid-column:2 / span 1;
    grid-row:1 / span 1;
    
    }
    .item3{
        grid-column:1 / span 2;
        grid-row:2 ;
    }


   
`
const ImageWrap = styled.div`
   img{
        border-radius:50%;
        width:150px;
        height:150px;
        object-fit: fill;
   }

`
const SideBar = styled.div`
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
const Wrapper = styled.div`
     display:flex;
`