import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import OutsideClickHandler from 'react-outside-click-handler';
import { logout } from '../../features/auth/authSlice'
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';

export class DropDownMenu extends Component {

  constructor(props) {
    super(props);
    this.state={
      isOpen : false,
    }
  }

  

  logout = () =>{
    fetch("/logout",{
      method:"POST",
      credentials: 'same-origin'
    }
    ).then(response => {
      if (response.ok) {
        this.props.dispatch(logout())
        window.location.href = "/"
        return response.json()
    }
  }).catch(error=> console.log(error))   
}
  render() {
    return (
      <OutsideClickHandler
      onOutsideClick={() => {
          this.setState({isOpen:false})
      }}
    >
      {this.props.auth.user !== null ?
      <Contanier>
        <Profile_wrap>
                <PersonIcon 
                      onClick={() => this.setState({ isOpen: !this.state.isOpen }) }
                      style={{color:"gray", cursor:"pointer"}}
                />  
        </Profile_wrap>

          {this.state.isOpen && (
          <DropDown_Container>
            <div className='DropDown_Container'>
             
                  <Link onClick={this.props.hideMenu} to="/profile" className='profile-container'>
                    <PersonIcon className="profile-icon" />
                    <span>
                        Profile

                    </span>
                  </Link>

                <button onClick={this.logout} className='logout-container'>
                   <LogoutIcon className="logout-icon"/>
                    <span> Logout </span>
                </button>
            </div>  
          </DropDown_Container>
          )}
      </Contanier>
      : ""
     }
      </OutsideClickHandler>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    cartItems: state.cartItems,
    auth : state.auth
    
  };
};

export default  connect(mapStateToProps)(DropDownMenu)

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
    left:-38px;
    bottom:-85px;
    z-index:2;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    
    .DropDown_Container{
      display:flex;
      flex-direction:column;
      margin:auto;
      padding:15px 20px;
     

    }

    .logout-container{ 
       display:flex;
       align-items:center;
       background:none;

    }
    li span{
      font-size:15px;
      font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    }
  .logout-icon, .profile-icon{
      font-size:20px;

    }

  .profile-container{
    display:flex;
    align-items:center;
    color:#000;
    margin-bottom:8px;

  }
 



`