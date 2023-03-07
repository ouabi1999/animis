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
        firstName: "",
        lastName : "",
        birthday: user?.birthDate,
        country: "",
        gender : "",
        email: user?.email,
        oldPassword: "********",
        newPassword: "",
        confirmPassword: "",
        userId: user?.userId,
        showNewPassword : false,
        showPassword : false,
        showConfirmPassword : false,

    })

   
    

    
    
   
     
   
    
    
       

 
    

    


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
            />
        </Container>
        </UserContext.Provider>
    )

}

export default EditProfile



const  Container = styled.div`
`  
