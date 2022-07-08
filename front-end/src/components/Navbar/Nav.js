import React from 'react';
//import component
import LoginForm from "../../screens/LoginForm"
import { Link, Outlet } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from "../../features/auth/authSlice"
import DropDownMenu from './dropDownMenu';
import styled from 'styled-components';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DrpDwnMenu_lang from './DrpDwnMenu_lang';

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: "",

    }

  }

  handlChange = (event) => {
    this.setState({
      searchInput: event.target.value
    })
  }

  hideLoginBar = () => {
    let loginBar = document.querySelector(".form")
    if (loginBar.style.display === "none") {
      loginBar.style.display = "flex";
    } else {
      loginBar.style.display = "none";
    }
  }
  render() {
    return (
      <>
        <Nav_container>
          <Left_section>
            <div className="logo">
              <Link to="/">
                <img src="./CORAZON_LOGO-01.png" alt="" /></Link>
            </div>
            <div className="search-container">
              <input type="search"
                value={this.state.searchInput}
                onChange={this.handlChange}
                onKeyPress={this.searchProduct}
                placeholder="Search For Product"
              />
              <button className="search-btn">
                <SearchIcon className='search-icon' />
              </button>
            </div>
          </Left_section>
          <Right_section>
          <DrpDwnMenu_lang/>
            <div className="shopping-cart-container">
            <Link to="/shopping-cart" onClick={this.props.switchMode}>
              <ShoppingCartIcon className='shopping-cart-icon' />
              <span className="num-cart-product">
                {this.props.cartItems.cartItems.length}
              </span>
            </Link>
            </div>

            <User_container>
            {this.props.auth.user !== null ?
              <DropDownMenu/>

              : 

              <button className="sign_in_button" onClick={this.hideLoginBar}>
                <span>
                  <PersonIcon />
                </span>
                <span>
                  Sign in
                </span>
              </button>
            } 
              
            </User_container>
            
          </Right_section>
          
        </Nav_container>
        
        <Outlet />
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartItems,
    auth: state.auth

  };
};

export default connect(mapStateToProps)(Nav)

const Nav_container = styled.div`
  position:sticky;
  top:0;
  z-index:1;
  background: #0052D4;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #6FB1FC, #4364F7, #0052D4);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #6FB1FC, #4364F7, #0052D4); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  padding:2px 0px;
  border-bottom: 1px solid rgb(184, 184, 184); 
  display:flex;
  padding:15px 2px;
 
`
const Left_section = styled.div`
  flex:2;
  display:flex; 
  align-items: center; 
  justify-content:space-between;

  .logo{
    margin:0 15px;
  }

.logo img{
  width:16vw;
  max-width:320px;
  min-width:200px;
  
  }
  .search-container{
    display:flex;
    position:relative;
    margin-left:10px;
  }

  .search-container  input{
      width:40rem;
      height:40px;
      border:none;
      outline:none;
      padding:0 10px;
      border-radius:5px;
      &:focus{
        outline:2px solid orange;
      }
  
  }
  .search-btn{
    background:orange;
    display:flex;
    align-items:center;
    justify-content:flex-end;
    position:relative;
    right:35px;
    border-radius:0px 5px 5px 0px;
    width:40px;
  }
 

`

const Right_section = styled.div`
  display:flex;
  flex:1;
  justify-content:flex-end;
  align-items:center;

  .shopping-cart-container{
    position:relative;
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

  `
const User_container = styled.div`
   margin-right:6px;
  .sign_in_button{
    display:flex;
    align-items:center;
    justify-content:center;
    background:#007CFF;
    border-radius:6px;
    color:#ffff;
    margin: 0 0 10px 8px;
    padding:4px 8px;

  }
`