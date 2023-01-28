import React, { useContext, useState } from 'react'
import { Button, CircularProgress, IconButton, InputAdornment, TextField } from '@mui/material';
import { Form, Formik, useFormik } from 'formik';
import styled from 'styled-components';
import * as Yup from "yup"
function ForgotPassword() {



    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)

    const editSechema = Yup.object({

        email: Yup.string().email('Invalid email address').required('Required'),
    })

    const formik = useFormik({
        initialValues: { email: email },
        validationSchema: editSechema,
        onSubmit: values => {

            // same shape as initial values
            setEmail(values.email)

        },
    });

    return (

        <Container>
        <PopUpEdit onSubmit={formik.handleSubmit}>
            <div className='text'>

                <span>
                    Changes made to your profile email here,
                    will be shown anywhere your profile is used
                </span>


            </div>
            <div className="input">
                <TextField
                    label="email"
                    id="filled-size-small"
                    fullWidth
                    variant="filled"
                    size="small"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />
            </div>
            <div className='save-button'>

                <Button type="submit" variant="contained">
                    <span>Reset password</span>
                    {loading && (

                        <CircularProgress
                            style={{ marginLeft: "5px", color: "white" }}
                            size={23}
                            thickness={6}
                            value={100}
                        />
                    )
                    }
                </Button>
            </div>

        </PopUpEdit>
        </Container>
    )
}

export default ForgotPassword


const Container = styled.div`

    display:flex;
    justify-content:center;
    align-items:center;
    height:100vh;
`
const PopUpEdit = styled.form`
         box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
         border:2px solid lightgray;
         border-radius:6px;
         min-width:280px;
         background:#fff;
         max-width:500px;
         height:200px;
         
         
    
    
         .edit-title{
            border-radius: 4px 4px 0px 0px;
            border-bottom:1px solid lightgray;
            padding:8px 10px;
            background-color:lightgray;
            font-weight:900;
            font-size:19px;
            font-family:'Trebuchet MS', sans-serif;
            display:flex;
            justify-content:space-between;
            
           
         }
         .text{
             font-size:14px;
             margin:15px 10px;
         }
         .save-button{
            padding:10px;
            display:flex;
            justify-content:flex-end;
         }
         .input{
             margin-top:8px;
         }
    `