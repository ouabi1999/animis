import React, { Component } from 'react'
import { Outlet } from 'react-router-dom';
import styled from 'styled-components'
import Dasheader from './Dasheader';

import DashSideBar from './DashSideBar';
class DashLayout extends Component {
    constructor(props) {
      super(props)
      this.state = {
        isOpen :null,
        showBar:""


      }
    }
    
    showSidebar = () =>{
        if (this.state.isOpen){
            this.setState({
                showBar:"none",
                isOpen:false,
                
            })
        }
        else{
            this.setState({
                showBar:"flex",
                isOpen:true,
            })
        }
    }
    
    render() {
        const { showBar} = this.state;
        return (
            <Wrapper>
                <div className='sidebar' style={{ display: showBar}}>
                    <DashSideBar/>
                </div>
                <div className='Headbar'>
                    <Dasheader showSidebar={this.showSidebar}/>
                </div>
                <div className='outlet'>
                    <Outlet />
               </div>
            </Wrapper>
        )
    }

}
export default DashLayout

const Wrapper = styled.div`
   display:flex;
   margin:auto;
   .sidebar{
       flex:1;
       transition:2s;
   }
   .Headbar{
       position:fixed;
       flex:4;
       width:100%;
       z-index:1000;
   }
   .outlet{
       border-radius:6px;
       margin-top:80px;
       padding:15px;
       background:rgb(25, 250, 250, 0.4);
       min-width:780px;
       width:calc(100vw - 260px);
       flex:4;
       
   }
   @media only screen and (max-width:1200px) {
    .sidebar{
        display:none;
    }
    .Headbar{
        left:0px;
        flex:0;
        width:100%;
        

    }
  }
}


`







