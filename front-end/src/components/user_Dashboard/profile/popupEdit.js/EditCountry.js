import React, { useContext, useEffect, useState } from 'react'
import { Button, IconButton,MenuItem, InputAdornment, TextField } from '@mui/material';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Formik, useFormik } from 'formik';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { UserContext } from '../EditProfile';
import * as Yup from "yup"
import Flag from 'react-world-flags'
import  Data from "../../../../common/countries.json"


function EditCountry(props) {
    const countriesData = Data.slice()
    const { formData, setFormData} = useContext(UserContext)
    const editSechema = Yup.object({
        country: Yup.string().required("Please select yoyr country "),
      
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
            {countryEdit && (
                <form onSubmit={formik.handleSubmit}>
                <PopUpEdit>
                    <div className='edit-title'>
                        <span>Edit your Country</span>
                        <DisabledByDefaultIcon className="disable-icon" onClick={closeCountryEdit} />
                    </div>
                    <div className='text'>

                        <span>
                            Changes made to your profile Country here,
                            will be shown anywhere your profile is used
                        </span>


                    </div>
                    <div className="input">
                        <TextField
                            label="Country"
                            id="filled-size-small"
                            select
                            fullWidth
                            variant="filled"
                            name ="country"
                            value = {formik.values.country}
                            error = {formik.touched.country && Boolean(formik.errors.country)}
                            helperText = {formik.touched.country && formik.errors.country}
                          
                            onChange={formik.handleChange}
                            >
                            {countriesData.map((country, index) =>{
                                  return(
                                    
                                   <MenuItem key={index}   value={country.name}>
                                    <div style={{display:"flex" , alignItems:"center"}}>
                                    <Flag code={country.code} style={{width:"30px", height:"20px" , marginRight:"10px"}} />
                                    <span>{country.name}</span>
                                    </div>
                                   </MenuItem>
                                  
                                   
                                  )

                                }
                           )}
                        </TextField>
                    </div>

                    <div className='save-button'>

                        <Button type="submit" variant="contained">Save changes</Button>
                    </div>  
                </PopUpEdit>
                </form>
            )}

    </Container>
  )
}

export default EditCountry

const Container = styled.div`
      .flagicon{
        width:30px;
        height:20px;
      }

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

     .flag-icon{
          width:30px;
          height:10px;
          
          
      }
`