import React, { useEffect, useState } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { getUser } from '../../../features/auth/authSlice'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import EditIcon from '@mui/icons-material/Edit';
import LockIcon from '@mui/icons-material/Lock';
import EditProfile from './EditProfile';
import FemaleIcon from '@mui/icons-material/Female';



function Profile(props){
    const dispatch = useDispatch()
       
       
        
    const user = useSelector(state=> state.auth.user)
    const [nameEdit, setNameEdit] = useState(false)
    const [emailEdit, setEmailEdit] = useState(false)
    const [passwordEdit, setPasswordEdit] = useState(false)
    const [countryEdit, setCountryEdit] = useState(false)
    const [genderEdit, setGenderEdit] = useState(false)
    const [birthDateEdit, setBirthDateEdit] = useState(false)
    
  
    const closeNameEdit = ()=>{
        setNameEdit(false)
    }
    const closeEmailEdit = () =>{
        setEmailEdit(false)
    }
    const closePasswordEdit = () =>{
        setPasswordEdit(false)
    }
    const closeCountryEdit = ()=>{
        setCountryEdit(false)
    }
    const closeGenderEdit  = ()=>{
        setGenderEdit(false)
    }
    const closeBirthDateEdit = ()=>{
        setBirthDateEdit(false)
    }
    
    return (
        
        <Container>
            <Section>

                <ImageWrap>
                    <img src="../avatars/boy.jpg" alt="" />
                </ImageWrap>

                <div>
                    <strong> {user?.firstName} {" "} {user?.lastName  }</strong>
                    <EditIcon className="edit-icon" onClick={()=> setNameEdit(true)} />
                </div>

                <div className='location'>
                     <div className="flex-icon">
                       <LocationOnIcon className="icon"/>
                       <span> From </span>
                     </div> 
                    <div>
                    <span> Morocco</span>
                    <EditIcon className="edit-icon" onClick={()=> setCountryEdit(true)}  />

                    </div>
                </div>

                
                <div className='member-since'>
                    <div className="flex-icon">
                        <EmailIcon className="icon"/>
                        <span> Email </span>

                    </div>
                 <div className="email">
                     <span >{user?.email}</span>
                      <EditIcon className="edit-icon" onClick={()=> setEmailEdit(true)}  />
                 </div>
                </div>
                

                <div className='member-since'>
                    <div className="flex-icon">
                        <LockIcon  className="icon"/>
                        
                        <span> Password </span>
                          
                    </div>

                
                    <div>
                        <span> ******** </span>
                        <EditIcon className="edit-icon" onClick={()=> setPasswordEdit(true)} />
                    </div>
                </div>

                <div className='member-since'>
                    <div className="flex-icon">
                        <FemaleIcon   className="icon"/>
                        
                        <span> Gender </span>
                          
                    </div>

                
                    <div>
                        <span> Male</span>
                        <EditIcon className="edit-icon" onClick={()=> setGenderEdit(true)}  />
                        
                    </div>
                </div>

                <div className='member-since'>
                    <div className="flex-icon">
                        <PersonIcon className="icon"/>
                        <span>Member since </span>

                    </div>
                 <span> {user?.joined_at.slice(4, 16)}</span>
                </div>
                

            </Section>
           
               <EditProfile
                   nameEdit = {nameEdit}
                   emailEdit = {emailEdit}
                   passwordEdit = {passwordEdit}
                   countryEdit = {countryEdit}
                   genderEdit = {genderEdit}
                   birthDateEdit = {birthDateEdit}
                   closeNameEdit = {closeNameEdit}
                   closeEmailEdit = {closeEmailEdit}
                   closePasswordEdit = {closePasswordEdit}
                   closeCountryEdit = {closeCountryEdit}
                   closeGenderEdit = {closeGenderEdit}
                   closeBirthDateEdit  = {closeBirthDateEdit}
               />
            </Container>

        )
    }



export default  Profile

const Container = styled.div`
    position:relative;
`
const Section = styled.div`
    
    margin:auto;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
    padding:2px 10px;
    width:55%;
    min-width:320px;
    
    border:1px solid lightgray;
    display:flex;
    flex-direction:column;
    align-items:center;
    background:#fff;
     

  
   .headers{
       margin-left:10px;
   }
   .location,
    .member-since{
        border-top:1px solid lightgray;
        margin-top:10px;
        padding:15px 5px;
        width:100%;
        display:flex;
        justify-content:space-between;
        align-items:center;
        

    }
    .flex-icon{
        display:flex;
        align-items:center;

    }
    .flex-icon span{
        color:gray;
        font-size:15px;
    }
   .icon{
       font-size:20px;
       color:gray;
   }
   .edit-icon{
      font-size:16px;
       color:gray;
       margin-left:5px;
       cursor:pointer;
   }
   
   
   

   
`
const ImageWrap = styled.div`
   img{
        border-radius:50%;
        width:150px;
        height:150px;
        object-fit: fill;
   }

`



