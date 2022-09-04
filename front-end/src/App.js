import React, {createContext} from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'


import Girls from "./components/categories/girls"
import Boys from "./components/categories/boys"
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
import Chat from './components/user_Dashboard/Chat'
import Notifications from './components/user_Dashboard/Notifications'
import HelpCenter from './components/user_Dashboard/HelpCenter'
import CheckoutContainer from './components/checkout/CheckoutContainer'
import PrivacyPolicy from './screens/polices/PrivacyPolicy';
import TermsOfServices from './screens/polices/TermsOfServices';
import Footer from './components/Footer/footer';
import styled from 'styled-components';
import RefundPolicy from './screens/polices/RefundPolicy';
import SuccessfulOrder from "./components/checkout/SuccessfulOrder";
import ProductsFilter from './screens/ProductsFilter';
import Profile from './components/user_Dashboard/profile/profile';
import ProductDetails from './components/Home/products/productDetails';
import { getProductsDetails } from './features/categories/categorySlice';


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
    shippingPrice:"",
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
    fetch('/productsinfo').then(response => {
      if (response.ok) {
        return response.json()
      }
    }).then(data => dispatch(setProducts(data)))
      .then(err => console.log(err))
  }

  // fetch product info from the backend or server
  useEffect(() => {
    getProductsInfo()
    dispatch(getUser())
    dispatch(getProductsDetails())
    
     // 👇️ scroll to top on page load
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
   

  }, [])
  
  

    return (
      <Container>
        <OrderContext.Provider value={{  formData, setFormData}}>
        <BrowserRouter >
          <Routes>
            <Route path = "/" element={<Header />} />
            <Route path = "/successful-order"  element={<SuccessfulOrder/>}/>
          </Routes>
          
          <Routes>
            <Route   path = "/"                   element={<><Nav/><Footer/></>}>
              <Route path = "/"                   element = {<Home />} />
              <Route path = "girls"               element = {<Girls />} />
              <Route path = "boys"                element = {<Boys />} />
              <Route path = "contact-us"          element = {<Contact />} />
              <Route path = "about-us"            element = {<About />} />
              <Route path = "shopping-cart"       element = {<Card />} />
              <Route path = "privacy-policy"      element = {<PrivacyPolicy/>}/>
              <Route path = "terms-of-services"   element = {<TermsOfServices/>}/>
              <Route path = "return-policy"       element = {<RefundPolicy/>}/>
              <Route path = "/userinfo"           element = {<Userinfo />} />
              <Route path= "category"             element =  {<ProductsFilter/>}/>
              <Route path= "product_details/:id"  element = {<ProductDetails/>}/>

              <Route   path = "/profile"       element = {<UserLayout />} >
                <Route path = "/profile"       element = {<Profile />} />
                <Route path = "myorders"       element = {<MyOrders />} />
                <Route path = "chat"        element = {<Chat />} />
                <Route path = "help-center"    element = {<HelpCenter />} />
             
                <Route path = "notifications"  element = {<Notifications />} />
              </Route>
            </Route>
            <Route path = "/login"              element = {<LoginForm />} />
              <Route path = "/register"           element = {<Signup />} />
            <Route path = "/checkout"      element = {<CheckoutContainer/>} />
            
            <Route   path = "/admin"       element = {<DashLayout />} >
              <Route path = "/admin"       element = {<Dashboard />} />
              <Route path = "dashproducts" element = {<ProductsLayout />} />
              <Route path = "analytics"    element = {<Chart />} />
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








