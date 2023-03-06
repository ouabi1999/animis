import React, { Component, useState } from 'react'
import styled  from "styled-components"
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { CircularProgress } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import { Grid, TextField, Button, IconButton, InputAdornment } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from "yup"

function Newsletter(){
    const [isLoading,  setIsLoading] = useState(false)
    const [email, setEmail] = useState("")
    const [error, setError] = useState(null)


   
    
    
     
    const handleSubscribe = (values)=>{
      
        setIsLoading(true)
        fetch("/subscribe-newsletter", {
          method: "POST",
          credentials: 'same-origin',
          body: JSON.stringify({
            email: values.email,
          }),
    
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        }).then(response => response.json())
    
          .then(result => {
            if (result.error) {
              setError(result.error)
              toast.error(result.error)
              setIsLoading(false);
            } else {
    
              setError(false)
              setEmail("")
              values.email = ""
              toast.success("You are subscribed")
              setIsLoading(false);
        
            }
    
    
          })
          .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
            setError("Somthing went wrong..!")
            toast.error("Somthing went wrong..!")
            setIsLoading(false)
    
          });
    }
    const editSechema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Required'),
    
      })
    const formik = useFormik({
        initialValues: {email: email},
        validationSchema: editSechema, 
        onSubmit:  values => {
            setEmail(values.email)
          
            handleSubscribe( values)
           
            
          // same shape as initial values
          
        }
      });

        return (
            <Container  onSubmit={formik.handleSubmit}>
                
                <Wrapp>
               
                    <span className="title">Newsletter</span>
                    <p>
                        Signup for our newsletter to get notified about sales.

                    </p>
                    
                    <div className="subscribe">
                        <span>
                            <MailOutlineIcon className="mail-icon" />
                        </span>

                        <input
                            id="email"
                            name="email"
                            type="email"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                        />
                        <button type="submit" > 
                        
                        {isLoading && (
                
                    <span>
                        
                    <CircularProgress 
                        style={{marginLeft:"3px" , marginRight:"3px"}}
                        size={18} 
                        thickness={4} 
                        value={100}
                     />
                     </span>
                    )}         
                    <span>Subscribe</span>
                    </button>
                        
                    </div>
                    
                </Wrapp>
                <ToastContainer
                  position="top-right"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                />
            </Container>
        )
    }

export default Newsletter
const Container = styled.form`
    min-width:300px;
   
    margin-top:20px;
    
`
const Wrapp = styled.div`
      
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;
    border-radius:6px;
    box-shadow:  0px 1px 2px 0px, rgba(255, 255, 255, 0.1) 0px 2px 6px 2px;
    background:rgb(255, 255, 255, 0.2);
    padding:10px 0;
    margin-right:6px;
    
    p{
        font-size:15px;
        font-weight:bold;
        width:50%;
        word-break: keep-all;;
        text-align:center;
        margin:0 0 10px  0px;
        color:#fff;
        
        
    }
    .title{
        color:orange;
        font-size:20px;
        font-weight:600;
    }
    .subscribe{
        display:flex;
        justify-content:center;
        height:30px;
        min-width:300px;
        width:100vw;
        max-width:360px;
        
    
    }
    
    
    
    .subscribe input[type="email"]{
         border:1px solid lightgray;
        
         border-left:none;
         outline:none;
         width:50vw;
       
    }
    .subscribe button{
        height:30px;
        background-color:rgb(0, 26, 51);
        color:#fff;
        border:1px solid lightgray;
        border-left:none;
        display:flex;
        align-items:center;
      
       
    }
    
    
    .mail-icon{
        background:rgb(0, 26, 51);
        color:#fff;
        font-weight:600;
        padding:0;
        margin:0;
        font-size:30px;
        border:1px solid lightgrey;
    
        
    }
`
