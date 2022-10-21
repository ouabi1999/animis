import React from 'react';
import styled from 'styled-components';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { connect } from 'react-redux';


//import component
import LoginForm from "../../screens/LoginForm"
import { logout } from "../../features/auth/authSlice"
import DropDownMenu from './dropDownMenu';
import DrpDwnMenu_lang from './DrpDwnMenu_lang';
import SearchInput from './SearchInput';
import MainMenu from './MainMenu';

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      showMenu: false
    }
  }

  
  showMenu = ()=>{
    this.setState({
      showMenu: true
    })
  }
  hideMenu = () =>{
    this.setState({
      showMenu: false
    })
  }
  render() {
    return (
      <>
        <Nav_container>
          <Left_section>
            <div className="logo">
              <NavLink to="/">
                <img src="/CORAZON_LOGO-01.png" alt="" />
              </NavLink>
            </div>

            <div>
              <SearchInput />
            </div>
            
          </Left_section>

          <Right_section className="right_section">
            <div className="shopping-cart-container">
            <NavLink to="/shopping-cart" onClick={this.props.switchMode}>
              <ShoppingCartIcon className='shopping-cart-icon' />
              <span className="num-cart-product">
                {this.props.cartItems.cartItems.length}
              </span>
            </NavLink>
            </div>
            <div className="langMenu">
              <DrpDwnMenu_lang />
            </div>
            <User_container>
            {this.props.auth.user !== null ?
              <DropDownMenu  />

              : 

              <NavLink to ="/login" className="sign_in_button" >
                <span>
                  <PersonIcon />
                </span>
                <span>
                  Sign in
                </span>
              </NavLink>
              
            } 
            
              
            </User_container>
            
            <button className="menu_container" onClick={this.showMenu}>
              <MenuIcon className="mainMenu" />
            </button>
             <div style={{ display : !this.state.showMenu ? "none": ""}}>
                  <MainMenu  hideMenu = {this.hideMenu} />
             </div>
          </Right_section>
          
        </Nav_container>
        
        {this.props?.outlet}
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    cartItems: state.cart,
    auth: state.auth

  };
};

export default connect(mapStateToProps)(Nav)

const Nav_container = styled.div`
  width:100%;
  min-width:358px;
  position:sticky;
  top:0;
  z-index:2;
  background: #0052D4;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #6FB1FC, #4364F7, #0052D4);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #6FB1FC, #4364F7, #0052D4); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  padding:2px 0px;
  border-bottom: 1px solid rgb(184, 184, 184); 
  display:flex;
  align-items:center;
  padding:15px 2px;
  
  .menu_container{
    display:none;
  }
  @media only screen and (min-width: 600px) {
    /* For tablets: */
    
    
  }
  @media only screen and (max-width: 1022px) {
    .langMenu{
      display:none;
      
    }
    .menu_container{
      display:flex;
    }
  }
  @media only screen and (max-width: 768px) {
    /* For mobile phones: */
   
    
   
  }
 
`
const Left_section = styled.div`
  flex:2;
  display:flex; 
  align-items: center; 
  justify-content:space-between;
 
  

  .logo{
    margin-left:5px;
    margin-top:7px;
  }

.logo img{
  width:16vw;
  max-width:320px;
  min-width:150px;
  height:auto;
  
  }
 

  

`

const Right_section = styled.div`
  display:flex;
  flex:1;
  justify-content:space-around;
  align-items:center;

  .shopping-cart-container{
    position:relative;
    margin-top:10px;
    color:rgb(255, 255, 255);
    &:hover{
      color:rgb(245, 229, 10);
    }
  }
 
 
  .shopping-cart-icon{
      font-size:30px;
      margin-right:20px;
      color:#FFF;
  }
  .num-cart-product{
    position:absolute;
    background:#000;
    border-radius:50%;
    top:-10px;
    left:15px;
    font-size:12px;
    color:orange;
    width:20px;
    height:20px;
    text-align:center;
    padding:1px 4px;

  }
  button.menu_container{
    
    background:none
  }
  .mainMenu{
    background:none;
    font-size:35px;
    color:#fff;
  }

  `
const User_container = styled.div`
   margin-right:6px;
  .sign_in_button{
    display:flex;
    align-items:center;
    background:#007CFF;
    border-radius:6px;
    color:#ffff;
    
    
    
    padding:3px 8px;

  }
  .sign_in_button span{
    font-size:13px;
    white-space: nowrap;
    
  }
  @media only screen and (max-width: 1022px) {
    &{
      display:none;
      
    }
   
  }
`