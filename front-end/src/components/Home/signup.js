import React, { Component } from 'react'
import styled from "styled-components";
import { Link}  from "react-router-dom"
 class Signup extends Component {
     constructor(props) {
         super(props)
         this.state = {
            fullname:"",
            date:"",
            email:"",
            password:"",
            confirmPassword:""
         }
     }
     componentDidMount(){

     }
     handel_Register_Submit = (event) =>{
        event.preventDefault()
        fetch("/register",{
            method:"POST",
            body:JSON.stringify({
                fullname:this.state.fullname,
                birthday:this.state.date,
                email:this.state.email,
                password:this.state.password,
            }),
            headers:{
            "Content-type":"application/json; charset=UTF-8"
            }
        }).then(response=> response.json())
          .then(message=>{console.log(message)})
     }
     handleChange = (event) =>{
         this.setState({
            [event.target.name]:event.target.value
        })
        console.log(this.state.date)
    }
    render(){
        return(
            <Form >
                <Formwrapper>
                    <input type="text"  value={this.state.fullname} onChange={this.handleChange} placeholder='Full Name' name="fullname" required />
                    <input type="email" value={this.state.email} onChange={this.handleChange} placeholder='Email' name="email" required />
                    <input type="date" value={this.state.date}  onChange={this.handleChange} name="date"required />
                    <input type="password" value={this.state.password} onChange={this.handleChange} name="password" placeholder='Password' />
                    <input type="password"   placeholder='Confirme password' />
                    <input type="submit"  onClick={this.handel_Register_Submit} value="Sign Up" />
                </Formwrapper>
                <Wrapper>
                    <span>By clicking "Sign up", I agree to the</span>
                    <Link to="/Terms_of_service"> Terms of service</Link>
                    <Link to="/login"> I have already an account</Link>
                </Wrapper>
             </Form>    
        )
    }
}

export default Signup
const Form = styled.form`
    margin:auto;
    margin-top:10px;
    width:28%;
    border-radius:15px;
    border-style:none;
    height:440px;
    box-shadow:0px 5px 5px 5px rgba(27, 27, 27, 0.3);
    background-color: azure;
    padding-left:10px;

`
const Formwrapper = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;
    input:not(input[type="submit"]){
        margin:10px;
        width:300px;
        height:40px;
        outline:none;
        border-radius:10px 0px;
        border-style: none;
        box-shadow:2px 5px 6px rgb(151, 151, 151);
        padding:10px 5px;
    }

    input[type="submit"]{
        background-color:green;
        width:25%;
        color:#ffff;
        border-radius:8px;
        outline:none;
        border-style: none;
        padding:7px; 
        font-weight:normal;
        margin-bottom:12px;
    }

`
const Wrapper = styled.div`
    span{
        font-weight:bold;
    }
    a[href="/Terms_of_service"]{
        color:rgb(2, 19, 168);
        font-weight:bold;
        font-size:16px;

    }
    a[href="/login"]{
        display:flex;
        justify-content:flex-end;
        font-weight:bold;
        margin:9px 10px;
        color:red;
    }
    a:hover{
        text-decoration:underline;
        opacity:0.7;
    }

`
