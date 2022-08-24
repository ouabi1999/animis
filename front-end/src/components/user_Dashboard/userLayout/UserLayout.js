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

function UserLayout() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector(state=> state.auth)
  const auth = window.localStorage.getItem("isAuthenticated")
  useEffect(() => {
    console.log(auth)
    if (auth === "false"){

        navigate("/" )
        
    }
    
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    
   
   }, [])

  
  return (
     
    <Container>
      {auth === "true" ? (
        <>
        <SideBar />
          <Outlet_container>
            <Outlet />
          </Outlet_container>
        </>
        ):""}
    </Container>

  )
}


export default UserLayout

const Container = styled.div`
  display:flex;
  min-height:calc(100vh - 80px);

`
const Outlet_container = styled.div`
  padding:10px 2px;
  flex:2;
  min-height:calc(100vh - 80px);
  background-color:#f2f2f2;
  margin-left:4px;
  padding-left:10px;
  box-shadow: 5px 8px 12px rgb(100, 100, 100, 0.4);
`
