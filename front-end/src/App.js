import React, {createContext} from 'react'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import {useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'


import Contact from "./screens/contact"
import About from "./screens/about"
import Card from "./screens/shoppingCart/Card"
import Header from './components/Header/Header'
import LoginForm from './screens/LoginForm'
import Signup from './screens/signup'
import Userinfo from './components/Home/userInfo'
import Dashboard from './components/Dashboard/Dashboard'
import Chart from './components/Dashboard/Chart'
import DashLayout from './components/Dashboard/DashLayout'
import ProductsLayout from './components/Dashboard/Products/Products_Layout'
import { setProducts } from "./features/products/productsSlice"

import Home from "./screens/Home"
import Nav from './components/Navbar/Nav'

import { getUser } from "./features/auth/authSlice"
import UserLayout from './components/user_Dashboard/userLayout/UserLayout'
import MyOrders from './components/user_Dashboard/MyOrders'
import Notifications from './components/user_Dashboard/Notifications'
import HelpCenter from './components/user_Dashboard/Help-center/HelpCenter'
import CheckoutContainer from './components/checkout/CheckoutContainer'
import PrivacyPolicy from './screens/polices/PrivacyPolicy';
import TermsOfServices from './screens/polices/TermsOfServices';
import Footer from './components/Footer/footer';
import styled from 'styled-components';
import RefundPolicy from './screens/polices/RefundPolicy';
import SuccessfulOrder from "./components/checkout/SuccessfulOrder";
import ProductsFilter from './screens/ProductsFilter';
import Profile from './components/user_Dashboard/profile/profile';
import ProductDetailsLayout from './components/Home/productDetails/ProductDetailsLayout';
import { getProductsDetails } from './features/categories/categorySlice';
import { getCustomers } from './features/customers/customers_slice';
import ClientChatLayout from './components/user_Dashboard/Chat/ClientChatLayout';
import ChatLayout from './components/Dashboard/chat/ChatLayout';
import DisplayLyout from './components/Dashboard/display/DisplayLyout';
import { getDisplayInfo } from './features/display/displaySlice';
import ForgotPassword from './screens/resetPassword/ForgotPassword';
import ResetPassword from './screens/resetPassword/ResetPassword';
import SuperDeals from './screens/SuperDeals';
import NavBar from './components/Navbar/NavBar';


export const OrderContext = createContext();
function App() {
 const dispatch = useDispatch()
 
  const [formData, setFormData ] = useState({
    firstName: "",
    lastName:"",
    userId:"",
    email: "",
    city:"",
    address2:"",
    zip:"",
    state:"",
    country:"",
    address1:"",
    shippingMethod:"",
    shippingPrice:"0.00",
    totalPrice:"",
    currency:"usd",
    products:"",
    orderInfo:"",

});

  /* getUser = () =>{
     fetch("/user")
     .then( response =>
       {if (!response.ok) {
 
         throw Error(response.status +' '+ response.statusText)
         
     }else{
       
       return response.json()
       
     }
   })
     .then(data =>  this.props.dispatch(login(data)))
     
     .catch(error=> console.log(error))
   }*/
  const getProductsInfo = () => {
    fetch('/productsinfo')
    .then(response => {
      if (response.ok) {
        return response.json()
      }
    }).then(data => dispatch(setProducts(data)))
      .catch(err => console.log(err))
  }

  // fetch product info from the backend or server
  useEffect(() => {
    getProductsInfo()
    dispatch(getUser())
    dispatch(getProductsDetails())
    dispatch(getCustomers())
    dispatch(getDisplayInfo())
    
     // 👇️ scroll to top on page load
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
   

  }, [])
  
  

    return (
      <Container>
        <OrderContext.Provider value={{  formData, setFormData}}>
        <BrowserRouter >
          <Routes>
            
            <Route path = "/successful-order"  element={<SuccessfulOrder/>}/>
          </Routes>
          
          <Routes>
            <Route   path = "/"                   element={<> <Header /> <Nav outlet ={<Outlet/>}/><Footer/></>}>
              <Route path = "/"                   element = {<Home />} />
              <Route path = "contact-us"          element = {<Contact />} />
              <Route path = "about-us"            element = {<About />} />
              <Route path = "shopping-cart"       element = {<Card />} />
              <Route path = "privacy-policy"      element = {<PrivacyPolicy/>}/>
              <Route path = "terms-of-services"   element = {<TermsOfServices/>}/>
              <Route path = "return-policy"       element = {<RefundPolicy/>}/>
              <Route path = "/userinfo"           element = {<Userinfo />} />
              <Route path= "category"             element =  {<ProductsFilter/>}/>
              <Route path= "product_details/:id"  element = {<ProductDetailsLayout/>}/>
              <Route path= "super_deals/:id"  element = {<SuperDeals/>}/>
              
            </Route>
            <Route path = "/login"              element = {<LoginForm />} />
              <Route path = "/register"           element = {<Signup />} />
            <Route path = "/checkout"      element = {<CheckoutContainer/>} />


            <Route   path = "/profile"       element = {<UserLayout />} >
                <Route path = "/profile"       element = {<Profile />} />
                <Route path = "myorders"       element = {<MyOrders />} />
                <Route path = "chat"        element = {<ClientChatLayout/>} />
                
                <Route path = "help-center"    element = {<HelpCenter />} />
             
                <Route path = "notifications"  element = {<Notifications />} />
            </Route>
              <Route path='/forget-password' element={<ForgotPassword/>}/>

              <Route path='/reset_password-token/:id' element={<ResetPassword/>}/>

            <Route   path = "/admin"         element = {<DashLayout />} >
              <Route path = "/admin"         element = {<Dashboard />} />
              <Route path = "dashproducts"   element = {<ProductsLayout />} />
              <Route path = "analytics"      element = {<Chart />} />
              <Route path = "admin-chat"     element = {<ChatLayout/>}/>
              <Route path = "displaySetting" element = {<DisplayLyout/>} />
            </Route>

            

          </Routes>
        </BrowserRouter>
        </OrderContext.Provider>
      </Container>
    )
  }



export default App

const Container = styled.div`
  

  



`








