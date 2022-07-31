import React, { Component } from 'react';
import styled from 'styled-components';
import MarkunreadIcon from '@mui/icons-material/Markunread';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import MenuIcon from '@mui/icons-material/Menu';

 class Dasheader extends Component {
   constructor(props) {
     super(props)
   
     this.state = {
        
     }
   }
   
  render() {
    return (
      <HeaderWrap>
        <div className="menu">
        <li>
           <button onClick={this.props.showSidebar}>
             <MenuIcon />
            </button>
        </li>
        </div>
        <div className="profile">
          <li >
            <NotificationsNoneIcon />
          </li>
          <li>
            <MarkunreadIcon className='message' />
          </li>
          <li>
            <img src="../catogorey/anime-bags.jpg" alt="" />
          </li>
        </div>
      </HeaderWrap>
    )
  }
}
export default Dasheader

const HeaderWrap = styled.div`
   z-index:1000;
   background:rgb(245, 245, 245);
   box-shadow:10px 4px 15px  rgb(150,150,150,0.8);
   height:65px;
   display:flex;
   justify-content:flex-end;
  
   
.profile{
   display:flex;
   align-items:center;
   padding:8px 15px;
   margin-left:2px;
  li{
    margin-left:10px;
  }

img{
  width:45px;
  height:45px;
  border-radius: 50%
 }
}
.menu{
  flex:1;
  li>button{
    cusor:pioter;
  }
}

}
`