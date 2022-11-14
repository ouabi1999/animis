import React, { useEffect, useState, useCallback, createContext } from 'react'

import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../../features/auth/authSlice';

import EditBirthday from './popupEdit.js/EditBirthday';
import EditCountry from './popupEdit.js/EditCountry';
import EditEmail from './popupEdit.js/EditEmail';
import EditGender from './popupEdit.js/EditGender';
import EditPassword from './popupEdit.js/EditPassword';
import EditName from './popupEdit.js/EditName';
export const UserContext = createContext()
function EditProfile(props) {
   
    const user = useSelector(state => state.auth.user)
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState("")
    const [error, setError] = useState("")

    const [formData, setFormData] = useState({
        firstName: "vv",
        lastName : "vv",
        birthday: user?.birthDate,
        country: "",
        gender : "",
        email: user?.email,
        oldPassword: "********",
        newPassword: "",
        confirmPassword: "",
        userId: user?.userId
    })

    const handleClickShowPassword = (password) => {

        if(password === "old"){
        setFormData({
          ...formData,
          showPassword: !formData.showPassword,
        });
     }
       if(password === "new"){
      setFormData({
        ...formData,
        showNewPassword: !formData.showNewPassword,
      });
     }
      if(password === "confirm"){
        setFormData({
            ...formData,
            showConfirmPassword: !formData.showConfirmPassword,
          });
      }
    }

      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };
    

    useEffect(() => {
       setFormData({
        ...formData,
        fullname: user?.fullname,
        birthday: user?.birthday,
        country: "",
        email: user?.email,
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
        userId: user?.userId
       })
    }, [props])
    
   
     
   
    
    
       

 
    

    const updateUserInfo = () => {

        fetch("/create-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },

            body: JSON.stringify({
                userId: formData.userId,
                fullName: formData.fullname,
                email: formData.email,
                country: formData.country,
                newPassword: formData.newPassword,
                oldPassword: formData.oldPassword

            })
                .then((res) => res.json())
                .then((data) => {

                    dispatch(getUser(data));


                },
                )
        })

    }


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
        closeBirthDateEdit,
        birthDateEdit } = props;

    return (
        <UserContext.Provider value = {{formData, setFormData}}>
        <Container>
            <EditBirthday
               closeBirthDateEdit={closeBirthDateEdit}
               birthDateEdit = {birthDateEdit}
            />
            <EditCountry
                countryEdit={countryEdit}
                closeCountryEdit={closeCountryEdit}

            />
            <EditEmail
                closeEmailEdit={closeEmailEdit}
                emailEdit={emailEdit}
            />
            <EditGender
                genderEdit={genderEdit}
                closeGenderEdit={closeGenderEdit}
            />
            

            <EditName
                nameEdit={nameEdit}
                closeNameEdit={closeNameEdit}
            />
            
           
            <EditPassword
                passwordEdit={passwordEdit}
                closePasswordEdit={closePasswordEdit}
                handleClickShowPassword = {handleClickShowPassword}
                handleMouseDownPassword = {handleMouseDownPassword}
            />
        </Container>
        </UserContext.Provider>
    )

}

export default EditProfile



const  Container = styled.div`


`  


    
     
     
