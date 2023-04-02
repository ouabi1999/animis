import React from 'react'
import MyOrders from '../MyOrders'
import Notifications from '../Notifications'


import SideBar from './SideBar'
import styled from "styled-components"
import { Navigate, Outlet } from 'react-router-dom'
import { useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { getUser } from '../../../features/auth/authSlice'
import { useNavigate  } from 'react-router-dom';
import Nav from '../../Navbar/Nav'
import Header from '../../Header/Header'
import HeadeSeo from '../../../common/Heade'

function UserLayout() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector(state=> state.auth.user)
  const auth = window.localStorage.getItem("isAuthenticated")
  useEffect(() => {
    if (auth === "false"){

        navigate("/" )
        
    }
    
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    
    if(user.admin === true){
      navigate("/admin")
  }
   }, [])

  
  return (
    <>
    
      {auth === "true" ? (
        <>
        <HeadeSeo title="Dashboard"/>
        <Header/>
        <Nav/>
        <Container>
        
        <SideBar />
        
          <Outlet_container>
            <Outlet />
          </Outlet_container>
          </Container>
          </>
        
        ):""}
    </>

  )
}


export default UserLayout

const Container = styled.div`
  display:flex;
  position:relative;
  @media only screen and (max-width: 820px) {
    /* For mobile phones: */
      
     &{
      flex-direction:column;
     }
   
  }


`
const Outlet_container = styled.div`
  padding:10px 2px;
  flex:2;
  margin-left:4px;

 
`
