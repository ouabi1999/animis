import React, { useCallback, useEffect, useState } from 'react'
import { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import PageNoteFound from '../../common/PageNotFound';
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
    useLayoutEffect(() => {
       
        if (auth === "false"){
    
            navigate("/")
            
        }
        
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
        
       
       }, [])
    
        const { showBar} = data;
        return (
            <>
          
           
           {user?.admin === true  ? (

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
            ): <PageNoteFound/>
            
            }
            
            </>
        )
    
    }

export default DashLayout

const Wrapper = styled.div`
   display:flex;
   margin:auto;
   min-height:100vh;
   .sidebar{
       flex:1;
       transition:2s;
       background:#262626;
       border-right:1px solid lightgray;
       
   }
   .Headbar{
       position:fixed;
       flex:4;
       width:100%;
       z-index:1000;
   }
   .outlet{
       
       margin-top:70px;
       padding:15px;
      
       min-width:780px;
       width:calc(100vw - 260px);
       flex:4;
       background-color:rgb(248, 222, 196);
       
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







