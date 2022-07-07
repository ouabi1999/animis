import React from 'react'
import MyOrders from '../MyOrders'
import Notifications from '../Notifications'
import Profile from '../profile'
import Setting from '../Setting'
import SideBar from './SideBar'
import styled from "styled-components"
import { Outlet } from 'react-router-dom'
import { useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { getUser } from '../../../features/auth/authSlice'

function UserLayout() {

  const dispatch = useDispatch()
  useEffect( () =>{
    console.log("yes this is me iam working")
     
  },[])

  
  return (
    <Container>
        <SideBar/>
        <Outlet_container>
          <Outlet/>
        </Outlet_container>
    </Container>

  )
}


export default UserLayout

const Container = styled.div`
  display:flex;

`
const Outlet_container = styled.div`
  flex:2;
  width:100%;
  min-height:100vh;
  background-color:rgb(179, 255, 255);
  margin-left:4px;
  padding-left:10px;
  box-shadow: 5px 8px 12px rgb(100, 100, 100, 0.4);
`
