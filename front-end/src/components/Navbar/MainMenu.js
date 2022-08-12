import React, { useEffect } from 'react'
import  styled  from "styled-components"
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import DropDownMenu  from './dropDownMenu'
import { handleSelectCategory } from '../../features/categories/categorySlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import OutsideClickHandler from 'react-outside-click-handler';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import PersonIcon from '@mui/icons-material/Person';
import DrpDwnMenu_lang from './DrpDwnMenu_lang';


function MainMenu(props) {
  const dispatch = useDispatch()
  const user = useSelector( state => state.auth.user)
  const filter = (itemCategory) =>{
  
    dispatch(handleSelectCategory(itemCategory))
    props.hideMenu()
      
  }
  
 
  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        props.hideMenu()
      }}
    >
      <Container>
        <div className='first-section'>
          <DisabledByDefaultIcon onClick={props.hideMenu} />
          <User_container>
          {user !== null ?
              <div className="user">
                <span> {user.fullname.slice(0,20)} </span>
                <DropDownMenu />
                
              </div>

              : 
              
              <Link to ="/login" className="sign_in_button" >
                <span>
                  <PersonIcon />
                </span>
                <span>
                  Sign in
                </span>
              </Link>

            } 
            </User_container>
        </div>
        <div className="lang">
        <DrpDwnMenu_lang/>
        </div>
        <h4>Series</h4>
        <Wrapper>
        
          <Wrapp>
            <Link to="/category" onClick={() => filter("onepiece")}> One Piece </Link>
            <Link to="/category" onClick={() => filter("attackontiten")}> Attack On Titan</Link>
          </Wrapp>

          <Wrapp>
            <Link to="/category" onClick={() => filter("hunterxhunter")}> Hunter X Hunter </Link>
            <Link to="/category" onClick={() => filter("dragonball")}> Dragon Ball </Link>
          </Wrapp>

          <Wrapp>
            <Link to="/category" onClick={() => filter("onepunchman")}>One Punch Man</Link>
            <Link to="/category" onClick={() => filter("baki")}>Baki</Link>
          </Wrapp>

          <Wrapp>
            <Link to="/category" onClick={() => filter("tokyoghoul")}>Tokyo Ghoul</Link>
            <Link to="/category" onClick={() => filter("naruto")}>Naruto</Link>
          </Wrapp>

        </Wrapper>
        <h4>Follow us</h4>
        <SocialMedia>

          <FacebookIcon className='social-icon'/>
          <YouTubeIcon className='social-icon' />
          <InstagramIcon className='social-icon' />
          <TwitterIcon className='social-icon' />
        </SocialMedia>
      </Container>
    </OutsideClickHandler>
   
  )
}

export default MainMenu

const Container = styled.div`
    
    position:fixed;
    z-index:2;
    top:0;
    right:0;
    padding:2px 5px;
    width:300px;

    background: #d9d9d9;
    height:100%;
    transition:ease-in-out;
    animation-duration: 1s;
    animation-name:hideShowMenu;

   

   
    
    @keyframes hideShowMenu {

      from  { width: 0; }
      to { width:300px;; }
    }
    .first-section {
       display:flex;
       align-items:center;
       justify-content:space-between;
       
    }
  .user{
    display:flex;
    align-items:center;
    
  }
  .user span{
    margin-right:10px;
    font-size:13px;
    white-space: nowrap;
  }
  h4, .lang{
    margin-left:15px;
  }
`
const Wrapper = styled.div`
     display:flex;
     flex-direction:column;
     font-size:1.2ch;
     width:100%;
     align-items:center;
     
     
    
    
     a{

      padding:10px 5px;
      color: black;
      background-color:white;
      border-radius:6px;
      margin-right:8px;
      margin-bottom:15px;
     
      width:130px;
      text-align:center;


     }
     
`
const SocialMedia =  styled.div`
     display:flex;
     justify-content:space-evenly;
     .social-icon{
         color:orange;
     }

`
const Wrapp =  styled.div`
     display:flex;
     
     
`
const User_container = styled.div`
   margin-right:6px;
   margin-top:10px;
   margin-bottom:10px;

  .sign_in_button{
    display:flex;
    align-items:center;
    background:#007CFF;
    border-radius:6px;
    color:#ffff;
    padding:3px 8px;
    font-size:12px;
    white-space:nowrap;
   

  }
  `