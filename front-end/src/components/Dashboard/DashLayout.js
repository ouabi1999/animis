import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import { getUser } from '../../features/auth/authSlice';
import Dasheader from './Dasheader';

import DashSideBar from './DashSideBar';



function DashLayout(props){

    const user = useSelector( state => state.auth.user)
    const auth = window.localStorage.getItem("isAuthenticated")
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    
    
   
        

        

     
      const [data , setData] = useState({
        isOpen : null,
        showBar : ""


      })
    
    
    const showSidebar = () =>{
        if (this.state.isOpen){
            setData({
                ...data,
                showBar:"none",
                isOpen:false,
                
            })
        }
        else{
            setData({
                ...data,
                showBar:"flex",
                isOpen:true,
            })
        }
    }
    
    useEffect(() => {
       
        if (auth === "false"){
    
            navigate("/" )
            
        }
        
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
        
       
       }, [])
    
        const { showBar} = data;
        return (
            <>
          
           
           {user?.admin === true  ?  (

            <Wrapper>
                <div className='sidebar' style={{ display: showBar}}>
                    <DashSideBar/>
                </div>
                <div className='Headbar'>
                    <Dasheader showSidebar={showSidebar}/>
                </div>
                <div className='outlet'>
                    <Outlet />
               </div>
            </Wrapper>
            ):
            navigate("/")
            
            }
            
            </>
        )
    
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



`







