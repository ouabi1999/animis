import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import Zoom from 'react-reveal/Zoom'
import { Link, Navigate, useNavigate}  from 'react-router-dom'
import styled from 'styled-components';
import { login } from "../features/auth/authSlice";


function LoginForm() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(state => state.auth.auth)
  const [formData, setFormData] = useState({email:"", password:""})
  const [isLoading, setIsLoading] = useState(false)
  const [error , setError] = useState(false)


  const handleChange =(event)=>{
    setFormData({...formData,
      [event.target.name] : event.target.value,
      
      
    })
    console.log(formData)
  }

  const hideerror =()=>{
    setError(null)
  }


  const Login_Submit = (event)=>{
     event.preventDefault()
     setIsLoading(true)
      fetch("/login",{
      method:"POST",
      credentials: 'same-origin',
      body: JSON.stringify({
        email:formData.email,
        password:formData.password
      }),
      
      headers:{
        "Content-type":"application/json; charset=UTF-8"
      }
    }).then(response => {
      if (!response.ok) {
        throw new Error('Network response was not OK');
      }
      return response.json()

    }).then(result => {
      dispatch(login(result))
      setIsLoading(false);
      navigate("/") 
    })
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
      setIsLoading(false)

    });
  }
 
  useEffect(() => {
    if(user == null ) {
        return ""
    }
    else{
      navigate("/")
    }
  }, [])
  
  return (
    <Container>
        {user == null ? (
            

        <form className="form">
          <i className="fas fa-user-circle" />
          <strong>Sign in</strong>

          <div>
            <input type="email" value={formData.email}
              name="email"
              onMouseDown={hideerror}
              onChange={handleChange}
              placeholder="Email"
              required autoFocus
            />
          </div>
          <div>

            <input type="password"
              value={formData.password}
              name="password" onMouseDown={hideerror}
              onChange={handleChange}
              placeholder="Password" required
            />
          </div>
          <button type="button" disabled={isLoading} id="submit" onClick={Login_Submit} >
            <span id="button-text">
              {isLoading ? <div className="spinner" id="spinner"></div> : "Login"}
            </span>
          </button>
          <div className="forgit-already">
            <a href="#" className="f-password"> Forget Password</a>
            <Link to="/register">Create an account</Link>
          </div>
        </form>
         ) :""

        }
      </Container>
  )
}

export default LoginForm

 


const Container = styled.div`
  display:flex;
  justify-content:center;
  align-content:center;
  margin-top:15px;
  height:100vh;
.form input{
  display:flex;
  align-items:center;
  justify-content:center;
  width:300px;
  height:50px;
  border-radius:6px;
  border:1px solid lightblue;
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
  margin-top:10px;
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

button:hover {
  opacity:0.9;
}

button:disabled {
  opacity: 0.5;
  cursor: default;
}

/* spinner/processing state, errors */
.spinner,
.spinner:before,
.spinner:after {
  border-radius: 50%;
}

.spinner {
  color: #ffffff;
  font-size: 22px;
  text-indent: -99999px;
  margin: 0px auto;
  position: relative;
  width: 20px;
  height: 20px;
  box-shadow: inset 0 0 0 2px;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
}

.spinner:before,
.spinner:after {
  position: absolute;
  content: '';
}

.spinner:before {
  width: 10.4px;
  height: 20.4px;
  background: #5469d4;
  border-radius: 20.4px 0 0 20.4px;
  top: -0.2px;
  left: -0.2px;
  -webkit-transform-origin: 10.4px 10.2px;
  transform-origin: 10.4px 10.2px;
  -webkit-animation: loading 2s infinite ease 1.5s;
  animation: loading 2s infinite ease 1.5s;
}

.spinner:after {
  width: 10.4px;
  height: 10.2px;
  background: #5469d4;
  border-radius: 0 10.2px 10.2px 0;
  top: -0.1px;
  left: 10.2px;
  -webkit-transform-origin: 0px 10.2px;
  transform-origin: 0px 10.2px;
  -webkit-animation: loading 2s infinite ease;
  animation: loading 2s infinite ease;
}

@keyframes loading {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

`