import React, { useContext, useEffect, useState } from 'react'
import { Button, IconButton, InputAdornment, TextField } from '@mui/material';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Formik, useFormik } from 'formik';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { UserContext } from '../EditProfile';
import * as Yup from "yup"
function EditEmail(props) {
    const { formData, setFormData} = useContext(UserContext)
    const editSechema = Yup.object({
        
        email: Yup.string().email('Invalid email address').required('Required'),
        
        })

    const formik = useFormik({
        initialValues : formData,
        validationSchema :editSechema,
        onSubmit: values => {
           
            // same shape as initial values
            setFormData({...values})
            console.log(values);
        },
    });
    const {
        nameEdit,
        emailEdit,
        passwordEdit,
        countryEdit,
        genderEdit,
        closeNameEdit,
        closeEmailEdit,
        closePasswordEdit,
        closeCountryEdit,
        closeGenderEdit,
        closeAgeEdit,
        ageEdit } = props;

    return (
        <Container>
            <form onSubmit={formik.handleSubmit}>
            {emailEdit && (
                <PopUpEdit>
                    <div className='edit-title'>
                        <span>Edit your email</span>
                        <DisabledByDefaultIcon className="disable-icon" onClick={closeEmailEdit} />
                    </div>
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

                        <Button type="submit" variant="contained">Save changes</Button>
                    </div>
                </PopUpEdit>
            )}
            </form>
        </Container>
  )
}

export default EditEmail

const Container = styled.div`



`
const  PopUpEdit = styled.div`
     box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
     border:2px solid lightgray;
     border-radius:6px;
     min-width:280px;
     background:#fff;
     position:absolute;
     bottom:25%;
     max-width:500px;
     right:25%;


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