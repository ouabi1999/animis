import React, { useState } from 'react'

import LoginForm from './LoginForm'
import Signup from './signup'
import ForgotPassword from "../resetPassword/ForgotPassword"

function Auth() {
  const [loginActive, setLoginActive] = useState(false) 
  const [signupActive, setSignupActive] = useState(true) 
  const [resetActive, setResetActive] = useState(false) 
  
  const show = (value)=>{
    if (value === "reset"){
      setResetActive(true)
      setSignupActive(false)
      setLoginActive(false)
    }
    if(value === "login"){
      setResetActive(false)
      setSignupActive(false)
      setLoginActive(true)
    }
    if(value === "signup"){
      setResetActive(false)
      setSignupActive(true)
      setLoginActive(false)
    }
  }

  return (
    <div>

      {loginActive && <LoginForm show={show} />}
      {signupActive && <Signup show={show} />}
      {resetActive && <ForgotPassword show={show} />}



    </div>
  )
}

export default Auth