import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import OutsideClickHandler from 'react-outside-click-handler';
import { logout } from '../../features/auth/authSlice'



export class DropDownMenu extends Component {
  state = {
    isOpen : false,
  }

  logout = () =>{
    fetch("/logout",{
      method:"POST",
      credentials: 'same-origin'
    }
    ).then(response => {
      if (response.ok) {
        this.props.dispatch(logout())
        return response.json()
    }
  })   
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
            <Image 
               src={`../avatars/${this.props.auth.user.avatar}`}
               alt="image" 
               onClick={() => this.setState({ isOpen: !this.state.isOpen })}
            />
        </Profile_wrap>
          {this.state.isOpen && (
          <DropDown_Container>
            <ul className='DropDown_Container'>
              <li>
                <Link to="profile">Profile</Link>
              </li>
              
              <li>
                <button onClick={this.logout}>
                  Logout
                </button>
              </li>
            </ul>
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
    width:150px;
    border-radius:4px;
    background:#fff;
    position:absolute;
    left:-140px;
    bottom:-80px;
    z-index:2;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;


`