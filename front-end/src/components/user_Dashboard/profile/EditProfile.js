import React, { useEffect, useState,   } from 'react'

import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../../features/auth/authSlice';

import EditBirthday from './popupEdit.js/EditBirthday';
import EditCountry from './popupEdit.js/EditCountry';
import EditEmail from './popupEdit.js/EditEmail';
import EditGender from './popupEdit.js/EditGender';
import EditPassword from './popupEdit.js/EditPassword';
import EditName from './popupEdit.js/EditName';
import { ToastContainer, toast } from 'react-toastify';

function EditProfile(props) {
   
    const user = useSelector(state => state.auth.user)
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("")

    


      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };
    

   



    

    return (
        
        <Container>
        <ToastContainer
                  position="top-right"
                  autoClose={3000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  className = 'foo-bar'
                />
            <EditBirthday/>
            <EditCountry/>
            <EditEmail/>
            <EditGender/>
            <EditName/>
            <EditPassword/>
        </Container>
      
    )

}

export default EditProfile



const  Container = styled.div`


`  


    
     
     
