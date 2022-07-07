import React from 'react';
import { connect } from 'react-redux';
import Zoom from 'react-reveal/Zoom'
import { Link}  from 'react-router-dom'
import styled from 'styled-components';
import { login } from "../features/auth/authSlice";

class LoginForm extends React.Component{
  constructor(){
    super();
    this.state={
      userinfo:[],
      email:"",
      password:"",
      error:null,
      message:null,
      isLoaded:null,
    }
  }
 

   handleChange =(event)=>{
    this.setState({
      [event.target.name] : event.target.value,
      
    })
  }

  hideerror =()=>{
    this.setState({
      error:null,
      
    })
  }


    Login_Submit = (event)=>{
     event.preventDefault()
      fetch("/login",{
      method:"POST",
      credentials: 'same-origin',
      body: JSON.stringify({
        email:this.state.email,
        password:this.state.password
      }),
      
      headers:{
        "Content-type":"application/json; charset=UTF-8"
      }
    }).then(res => {
      if(res.ok){
        return res.json()
      }
    })
    .then(data => this.props.dispatch(login(data)))
    .catch((error) => {
        console.log(error) })

  }

  render(){
    let { isLoaded, error} = this.state;
    if (isLoaded){
      return(<p> login succcsufuly</p>)
    }
    return (
        <Container>
          <form className="form">
            {error && (<p> invalid password or Email </p>)}
            <i className="fas fa-user-circle" />
            <strong>Login</strong>
            <div>
            <label htmlFor='EMAIL'>Email </label>
            <input type="email" value={this.state.email}
                    name="email"  
                    onMouseDown={this.hideerror} 
                    onChange={this.handleChange} 
                    placeholder="Email"
                    required autoFocus 
                />
            </div>
            <div>
              <label htmlFor='password'>Password </label>
            <input type="password" 
                   value={this.state.password}
                   name="password" onMouseDown={this.hideerror} 
                   onChange={this.handleChange} 
                   placeholder="Password" required 
                />
              </div>
            <button type="submit"
                 onClick={this.Login_Submit}>
                   Login
            </button>

            <div className="forgit-already">
              <a href="#" className="f-password"> Forget Password</a>
              <Link to="/register">Create an account</Link>
            </div>
          </form>
          </Container>
     
      

    )
  }
}
const mapStateToProps = (state) => {
  return {
    cartItems: state.cartItems,
    products: state.products,
    auth: state.auth
  };
};
export default  connect(mapStateToProps)(LoginForm)
const Container = styled.div`
  display:flex;
  justify-content:center;
  align-content:center;
  margin-top:15px;
.form input{
  display:flex;
  align-items:center;
  justify-content:center;
  width:300px;
  height:40px;
  border-radius:6px;
  border:none;
  padding-left:10px;
  margin:10px 0px;

  &:focus{
    outline:1px solid lightblue;
    
 
 }
}

.form{
  display:flex;
  align-items:center;
  flex-direction:column;
  border:1px solid black;
  border-radius:6px;
  border-style:none;
  width:350px;
  height:420px;
 
  box-shadow:0 5px 8px 6px rgba(27, 27, 27, 0.1);
  padding-left:10px;

  
}
.form i{
  font-size:100px;
  margin: 10px 10px;
  color:rgb(107, 107, 107);
}
form .fa-times{ 
  font-size:25px;
  position:relative;
  left:170px;
  top:-18px;
  text-shadow:6px 6px 20px rgb(71, 71, 71);
}

.form button{
  color:white;

  background-color: rgba(59, 73, 223, 1);
  border-radius:6px;
  padding:6px 8px;
  letter-spacing:1px;
  font-weight: bold;
   width:10rem;
   height:40px;
}

.form input[type="submit"]:hover{
  background-color:rgb(2, 92, 39);
}
.forgit-already{
  margin-top:25px;
}
.forgit-already a{
  font-size:0.8rem;
  font-weight:bold;
  color:rgb(30, 100, 80);
  margin-left:20px;
  
}

.form label{
  margin-left:5px;
}

`