import React, { Component } from 'react'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux'

import Girls from "./components/categories/girls"
import Boys from "./components/categories/boys"
import Contact from "./screens/contact"
import About from "./screens/about"
import Card from "./screens/shoppingCart/Card"
import Header from './components/Header/Header'
import LoginForm from './screens/LoginForm'
import Signup from './components/Home/signup'
import Userinfo from './components/Home/userInfo'
import Dashboard from './components/Dashboard/Dashboard'
import Chart from './components/Dashboard/Chart'
import DashLayout from './components/Dashboard/DashLayout'
import ProductsLayout from './components/Dashboard/Products/Products_Layout'
import { setProducts } from "./features/products/productsSlice"

import Home from "./screens/Home"
import Nav from './components/Navbar/Nav'
import Profile from './components/user_Dashboard/profile'
import { getUser } from "./features/auth/authSlice"
import UserLayout from './components/user_Dashboard/userLayout/UserLayout'
import MyOrders from './components/user_Dashboard/MyOrders'
import Setting from './components/user_Dashboard/Setting'
import DeleteAccount from './components/user_Dashboard/DeleteAccount'
import Notifications from './components/user_Dashboard/Notifications'
import HelpCenter from './components/user_Dashboard/HelpCenter'
import CheckoutContainer from './components/checkout/CheckoutContainer'
import PrivacyPolicy from './screens/polices/PrivacyPolicy';
import TermsOfServices from './screens/polices/TermsOfServices';
import Footer from './components/Footer/footer';
import styled from 'styled-components';
import RefundPolicy from './screens/polices/RefundPolicy';
import SuccessfulOrder from './screens/SuccessfulOrder';



class App extends Component {

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
  getProductsInfo = () => {
    fetch('/productsinfo').then(response => {
      if (response.ok) {
        return response.json()
      }
    }).then(data => this.props.dispatch(setProducts(data)))
      .then(err => console.log(err))
  }
  // fetch product info grom the backend or server
  componentDidMount() {

    //this.getUser()
    this.getProductsInfo()
    this.props.dispatch(getUser())
    console.log("its working ")

  }

  render() {
    return (
      <Container>
        <BrowserRouter >

          <Routes>
            <Route path = "/" element={<Header />} />
          </Routes>
          
          <Routes>
            <Route   path = "/"                   element={<><Nav/><Footer/></>}>
              <Route path = "/"                   element = {<Home />} />
              <Route path = "girls"               element = {<Girls />} />
              <Route path = "boys"                element = {<Boys />} />
              <Route path = "contact-us"             element = {<Contact />} />
              <Route path = "about-us"            element = {<About />} />
              <Route path = "shopping-cart"       element = {<Card />} />
              <Route path = "privacy-policy"      element = {<PrivacyPolicy/>}/>
              <Route path = "terms-of-services"   element = {<TermsOfServices/>}/>
              <Route path = "return-policy"       element = {<RefundPolicy/>}/>

             
              <Route path = "/login"         element = {<LoginForm />} />
              <Route path = "/register"      element = {<Signup />} />
              <Route path = "/userinfo"      element = {<Userinfo />} />


              <Route   path = "/profile"       element = {<UserLayout />} >
                <Route path = "/profile"       element = {<Profile />} />
                <Route path = "myorders"       element = {<MyOrders />} />
                <Route path = "setting"        element = {<Setting />} />
                <Route path = "help-center"    element = {<HelpCenter />} />
                <Route path = "delete-account" element = {<DeleteAccount />} />
                <Route path = "notifications"  element = {<Notifications />} />
              </Route>
            </Route>
            <Route path = "/checkout"      element = {<CheckoutContainer/>} />
            <Route path = "/successful-order" element = {<SuccessfulOrder/>}/>
            <Route   path = "/admin"       element = {<DashLayout />} >
              <Route path = "/admin"       element = {<Dashboard />} />
              <Route path = "dashproducts" element = {<ProductsLayout />} />
              <Route path = "analytics"    element = {<Chart />} />
            </Route>

          </Routes>
        </BrowserRouter>
      </Container>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    cartItems: state.cartItems,
    products: state.products,
    auth : state.auth
  };
};

export default connect(mapStateToProps)(App)

const Container = styled.div`

  



`




