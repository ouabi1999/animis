import React, { useEffect, useState, createContext } from 'react'
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
import { ToastContainer, toast } from 'react-toastify';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HeadeSeo from '../../../common/Heade';


export const UserContext = createContext()

function Profile(props){
    const dispatch = useDispatch()
      
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("")   
    const user = useSelector(state=> state.auth.user)
    const [nameEdit, setNameEdit] = useState(false)
    const [emailEdit, setEmailEdit] = useState(false)
    const [passwordEdit, setPasswordEdit] = useState(false)
    const [countryEdit, setCountryEdit] = useState(false)
    const [genderEdit, setGenderEdit] = useState(false)
    const [birthDateEdit, setBirthDateEdit] = useState(false)
    
    const [formData, setFormData] = useState({
        firstName : "",
        lastName : " ",
        birthDate : "",
        gender : "",
        country : "",
        countryCode:"",
        email : "",
        joined_at:"",
        userAvatar:"",
        oldPassword : "",
        newPassword : "",
        confirmPassword : "",
        id : "",
        showPassword:false,
        showNewPassword:false,
        showConfirmPassword:false
    })
  
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

    useEffect(() => {
        
        setFormData({
         ...formData,
         firstName: user?.firstName,
         lastName : user?.lastName,
         birthDate: user?.birthDate, 
         country: user?.country,
         countryCode : user?.countryCode,
         email: user?.email,
         gender: user?.gender,
         joined_at: user?.joined_at,
         oldPassword: "",
         newPassword: "",
         confirmPassword: "",
         id: user?.id
        })
     }, [ user])
     
    
     
     const updateUserInfo = (values) => {  
         
        setLoading(true)
        const data = new FormData();
        data.append("email", values.email);
        data.append("firstName", values.firstName);
        data.append("lastName", values.lastName);
        data.append("gender", values.gender);
        data.append("birthDate", values.birthday)
        data.append("country", values.country)
        data.append("userAvatar", values.userAvatar)
        data.append("countryCode", values.countryCode)
        
       
         
     
         fetch(`/update-user/${values.id}`, {
           method: 'PUT',
           body: data
         })
           .then((response) => response.json())
           .then((result) => {
             setFormData(result);
             
             setLoading(false)
             toast.success("SAVED")
   
           })
           .catch((error) => {
             console.error('Error:', error);
             setLoading(false)
             toast.error("an error accourd")
           });
       }


       const updateUserPassword = (values) => {  
         
        setLoading(true)
        const data = new FormData();
        data.append("newPassword", values.newPassword);
        data.append("oldPassword", values.oldPassword);
       
     
         fetch(`/update-user-password/${values.id}`, {
           method: 'PUT',
           body: data
         })
           .then((response) =>  response.json())
           .then((result) => {

            if (result.error) {
                console.log(result.error)
                toast.error(result.error)
                setLoading(false)
              } else {
    
                setFormData(result);

                setLoading(false)
                toast.success("Password updated")
              }
    
           
   
           })
           .catch((error) => {
            toast.error("Somthing went wrong..!")
            console.error('There has been a problem with your fetch operation:', error);
            setLoading(false)
            
          
           });
       }

       const updateUserEmail = (values) => {  
         
        setLoading(true)
        const data = new FormData();
        data.append("email", values.email);
        
         fetch(`/update-user-email/${values.id}`, {
           method: 'PUT',
           body: data
         })
           .then((response) =>  response.json())
           .then((result) => {

            if (result.error) {
                console.log(result.error)
                toast.error(result.error)
                setLoading(false)
              } else {
    
                setFormData(result);

                setLoading(false)
                toast.success("Email updated")
              }
    
           
   
           })
           .catch((error) => {
            toast.error("Somthing went wrong..!")
            console.error('There has been a problem with your fetch operation:', error);
            setLoading(false)
            
          
           });
       }
    
    
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
     
        
 
  
     
    
    return (
        <UserContext.Provider value = {{
            formData,
            setFormData,
            updateUserInfo,
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
            birthDateEdit,
            handleClickShowPassword,
            updateUserPassword,
            updateUserEmail,
            loading
        }}   
        >
        <HeadeSeo title= "Dashboard / profile"/>
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

            <Section>

                <ImageWrap>
                    <AccountCircleIcon className='profile-icon'/>
                </ImageWrap>

                <div>
                    <strong> {formData?.firstName} {" "} {formData?.lastName  }</strong>
                    <EditIcon className="edit-icon" onClick={()=> setNameEdit(true)} />
                </div>

                <div className='location'>
                     <div className="flex-icon">
                       <LocationOnIcon className="icon"/>
                       <span> From </span>
                     </div> 
                    <div>
                    <span> {formData?.country}</span>
                    <EditIcon className="edit-icon" onClick={()=> setCountryEdit(true)}  />

                    </div>
                </div>

                
                <div className='member-since'>
                    <div className="flex-icon">
                        <EmailIcon className="icon"/>
                        <span> Email </span>

                    </div>
                 <div className="email">
                     <div className="email-content">
                     <span >{formData?.email}</span>
                     </div>
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
                        <span>{formData?.gender}</span>
                        <EditIcon className="edit-icon" onClick={()=> setGenderEdit(true)}  />
                        
                    </div>
                </div>

                <div className='member-since'>
                    <div className="flex-icon">
                        <PersonIcon className="icon"/>
                        <span> Member since </span>

                    </div>
                 <span> {formData?.joined_at?.slice(4, 16)}</span>
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
                   handleClickShowPassword = {handleClickShowPassword}
               />
            </Container>
            </UserContext.Provider>

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
   .email{
       white-space: nowrap;
       display:flex;
       align-items:center;
       
   }
   .email-content{
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap; 
      max-width:220px; 
      width:100%;
      margin-top:0;
      padding:0 5px;
      
   }
   @media only screen and (max-width: 1048px) {

    &{
        width:80%;
    }
   }
   @media only screen and (max-width: 600px) {
    
    &{
        width:100%;
    }

  }
   
   
   

   
`
const ImageWrap = styled.div` 
    .profile-icon{
    width:150px;
    height:150px;
    color:lightblue
    }
 

`



