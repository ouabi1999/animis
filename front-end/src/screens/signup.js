import React, { useState } from 'react'
import styled from "styled-components";
import { Link, useNavigate}  from 'react-router-dom'
import { Grid, TextField, MenuItem, Button, IconButton, InputAdornment, CircularProgress } from '@mui/material';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import Flag from 'react-world-flags';
import countriesData from "../common/countries.json"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {useFormik } from 'formik';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import * as Yup from "yup"
import { useDispatch } from 'react-redux';
import {register } from '../features/auth/authSlice';
import { useLayoutEffect } from 'react';




function Signup() {

    const dispatch = useDispatch()
    const navigate= useNavigate()
    const auth = window.localStorage.getItem("isAuthenticated")
    const [formData, setFormData] = useState({

        firstName: "",
        lastName : "",
        gender : "",
        email: "",
        password: "",
        confirmPassword: "",
        country : "",
        countryCode : "ES",
        birthDate: new Date(),
        isLoading : false,
        showPassword : false,
        error : null,

    })

    useLayoutEffect(() => {
        if( auth === "true" ) {
          window.location.href = "/"
        }
       
      
      }, [])
      
      


    
        
      


   

    const genders = [
        { gender: "Male", icon: <MaleIcon /> },
        { gender: "Female", icon: <FemaleIcon /> }
    ]
    const handleClickShowPassword = () => {

        setFormData({
          ...formData,
          showPassword: !formData.showPassword,
        });
      
    }

      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };
    

    const editSechema = Yup.object({
        firstName: Yup.string()
          .max(15, 'Must be 15 characters or less')
          .required('Please enter your Fist Name'),
          
        lastName: Yup.string()
          .max(15, 'Must be 15 characters or less')
          .required('Required'),
        country: Yup.string().required("Please select yoyr country "),
        email: Yup.string().email('Invalid email address').required('Required'),
        gender :  Yup.mixed().oneOf(['Male', 'Female']).defined(),
        birthDate: Yup.date().required('Please enter a date of birth')
        .max(new Date(), "You can't be born in the future!"),
        password: Yup.string()
        .required("Please Enter your password"), 
    })
        

    const formik = useFormik({
        initialValues : formData,
        validationSchema :editSechema,
        onSubmit: values => {
           
            // same shape as initial values
            setFormData({...formData, isLoading : true })
            fetch("/register", {
                method: "POST",
                body: JSON.stringify({
                    firstName : values.firstName,
                    lastName : values.lastName,
                    gender : values.gender,
                    email : values.email,
                    password : values.password,
                    confirmPassword : values.confirmPassword,
                    country : values.country,
                    countryCode : formData.countryCode,
                    birthDate : values.birthDate,

                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }).then(response => response.json())
            .then(result => {
                if (result.error) {
                  console.log(result.error)
                  setFormData({...formData, isLoading : false , error : result.error})
            
                } else {
      
                  dispatch(register(result))
                  setFormData({...formData, isLoading : false })
                  navigate(-2);
                }
      
      
              })
              .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
            
                setFormData({...formData, isLoading : false , error:"Somthing went wrong..!"})
      
              });
        },
    });
    return (
        <>
        {auth === "false" &&(

       
        <Form onSubmit = {formik.handleSubmit}>

            <img className="logo" src='../logo_icon.png'  alt=""/> 
            <strong>Register</strong>
            <Formwrapper>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            autoComplete="given-name"
                            name="firstName"
                            fullWidth
                            id="firstName"
                            label="First Name"
                            variant="filled"
                            size="small"
                            value={formik.values.firstName}
                            onChange={formik.handleChange}
                            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                            helperText={formik.touched.firstName && formik.errors.firstName}

                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            autoComplete="given-name"
                            name="lastName"
                            fullWidth
                            id="firstName"
                            label="Last Name"
                            variant="filled"
                            size="small"
                            value={formik.values.lastName}
                            onChange={formik.handleChange}
                            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                            helperText={formik.touched.lastName && formik.errors.lastName}

                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            variant="filled"
                            size="small"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                            
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Gender"
                            id="filled-size-small"
                            fullWidth
                            variant="filled"
                            size="small"
                            name="gender"
                            select
                            error={formik.touched.gender && Boolean(formik.errors.gender)}
                            helperText={formik.touched.gender && formik.errors.gender}
                            value={formik.values.gender}
                            onChange={formik.handleChange}

                        >
                            {genders.map((sex, index) => {
                                return (
                                    <MenuItem key={index} value={sex.gender}>
                                        <div style={{ display: "flex", alignItems: "center" }}>
                                            {sex.icon}
                                            <span>{sex.gender}</span>
                                        </div>
                                    </MenuItem>
                                )
                            })}
                        </TextField>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Country"
                            id="filled-size-small"
                            select
                            fullWidth
                            variant="filled"
                            name="country"
                            size="small"
                           
                            value = {formik.values.country}
                            error = {formik.touched.country && Boolean(formik.errors.country)}
                            helperText = {formik.touched.country && formik.errors.country}
                            autoComplete="false"
                            onChange={formik.handleChange}
                        >   
                    {countriesData?.map((country, index) => {
                        return (

                            <MenuItem key={index} value={country.name} defaultValue="" 
                                onClick = {()=> setFormData({...formData, countryCode:country.code })}
                                >
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <Flag  code={country.code} style={{ width: "30px", height: "20px", marginRight: "10px" }} />
                                    <span>{country.name}</span>
                                </div>
                            </MenuItem>
                          )

                        }
                        )}
                        </TextField>
                    </Grid>
                    <Grid item xs={12} >
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            renderInput={(props) => <TextField  
                                error={formik.touched.birthDate && Boolean(formik.errors.birthDate )}
                                helperText={formik.touched.birthDate  && formik.errors.birthDate }
                                fullWidth size="small"  variant="filled" {...props} />}
                            label="Birth Date"
                            
                            value={formik.values.birthDate}
                            name = "birthDate"
                            onChange= {value => formik.setFieldValue("birthDate", value)}
                        />
                    </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                            label="Password"
                            id="filled-size-small"
                            fullWidth
                            variant="filled"
                            size="small"
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                            type={formData.showPassword ? "text" : "password"}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={ handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {formData.showNewPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>

                                </InputAdornment>,
                            }}
                        />
                    </Grid>
                    {formData.error && (
                        <Grid item xs={12} container
                            justifyContent="center" >
                            <span style={{ color: "red", fontSize: "14px" }}>{formData.error}</span>
                        </Grid>
                    )}
                    <Grid item xs={12}
                        container
                        justifyContent="center"
                        alignItems="center">
                        <Button type="submit" variant="contained" disabled={formData.isLoading} >
                            
                            {formData.isLoading ? (
                                <>
                                    <span>Sign up</span>

                                    <CircularProgress
                                        style={{ marginLeft: "3px" }}
                                        size={22}
                                        thickness={6}
                                        value={100}
                                    />
                                </>)
                                : "Sign up"}

                        </Button>
                    </Grid>

               
                </Grid>
        
            </Formwrapper>
            
            <Wrapper>
                <span> By clicking "Sign up", I agree to the </span>
                <Link to = "/terms-of-services"> Terms of service</Link>
                <Link to = "/login"> I have already an account</Link>
            </Wrapper>       
        </Form>
        )}
        </>
    )

}

export default Signup
const Form = styled.form`
    margin:auto;
    margin-top:15px;
    
    width:40%;
    position:relative;
    
    max-width:33%;
    min-width:300px;
    border-radius:8px;
    border-style:none;
    box-shadow:0px 5px 5px 3px rgba(27, 27, 27, 0.1);
    background-color: #fff;
    padding:0 10px;
    display:flex;
    flex-direction:column;
    align-items:center;

    .logo{
        color:lightblue;
        margin:20px 0;
        width:90px;
        
    }
    strong{
        margin-bottom:15px;
        margin-top:0;
        font-family:sans-serif;
        font-size:20px;
    }


   
`
const Formwrapper = styled.div`



`

const Wrapper = styled.div`
    margin-top:6px;
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
        margin:10px 10px;
        color:gray;
    }
    a:hover{
        text-decoration:underline;
        opacity:0.7;
    }

`






