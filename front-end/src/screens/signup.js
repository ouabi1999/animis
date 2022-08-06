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
            <Form>
                <h3>Sign up</h3>
                <Formwrapper>
                    <input type="text"  value={this.state.fullname} onChange={this.handleChange} placeholder='Full Name' name="fullname" required />
                    <input type="email" value={this.state.email} onChange={this.handleChange} placeholder='Email' name="email" required />
                    <input type="date" value={this.state.date}  onChange={this.handleChange} name="date" required />
                    <input type="password" value={this.state.password} onChange={this.handleChange} name="password" placeholder='Password' />
                    <input type="password"   placeholder='Confirme password' />
                    <input type="submit"  onClick={this.handel_Register_Submit} value="Sign up" />
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
    margin-top:40px;
    width:30%;
    max-width:30%;
    min-width:300px;
    border-radius:8px;
    border-style:none;
    
    box-shadow:0px 5px 5px 5px rgba(27, 27, 27, 0.3);
    background-color: azure;
    padding:10px;
    display:flex;
    flex-direction:column;
    align-items:center;
`
const Formwrapper = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;
    input:not(input[type="submit"]){
        margin:10px;
       
        width:25vw;
        min-width:250px;
        max-width:30vw;
        height:45px;
        outline:none;
        border-radius:6px;
        border-style: none;
        box-shadow:2px 5px 6px rgb(151, 151, 151);
        padding:10px 5px;
    }

    input[type="submit"]{
        background-color: rgba(59, 73, 223, 1);;
        width:200px;
        color:#ffff;
        border-radius:6px;
        outline:none;
        border-style: none;
        padding:8px; 
        font-weight:normal;
        margin-bottom:12px;
        height:40px;
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
