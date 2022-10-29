import React from 'react'
import styled from "styled-components"
import FiberNewIcon from '@mui/icons-material/FiberNew';

function AdminUsers(props) {
  return (
    <Container>
        {props.users.filter(user => user.admin === true).map(user =>{
            return(
                <button onClick={()=> props.startChat(user)}className='message-container'>
                <div className='message-container'>
                    <div className="user-avatar">
                        <img src="../avatars/boy.jpg" alt="kkk" />
                    </div>
                    <div className="message-content">
                        <span>{user.firstName}</span>
                        <span className="message">
                           {props.notification.length}
                        </span>
                     
                    </div>
                    
                </div>
                {props.messages?.filter(msg => msg.is_Read === false).length >0 ? props.messages.filter(msg => msg.is_Read === false).length : ""}
                </button>
            )
        })
    }
    </Container>
  )
}

export default AdminUsers

const Container = styled.div`
     background:rgb(26, 26, 26, 0.8);
     border-radius:8px;
     padding:3px 5px;
     .user-avatar img{
         border-radius:50%;
         
         height:60px;
         width:60px;
         

     }
     .message-container{
         display:flex;
         align-items:center;
         width:100%;

         
     }
     .message-content{
        
        display:flex;
        flex-direction:column;
        margin-left:10px;
        align-items:flex-start;
     }
     .message-content span:nth-child(2){
        color:#a6a6a6;
        font-size:12px;
        
         
     }
     
     .message-content span:nth-child(1){
        margin-bottom:8px;
        color:#ffff;
        text-transform:capitalize;
     }
   
     .message{
        font-size:10px;
     }
     button{
        color:none;
        background:none;
     }
    .notification-icon{
        color:lightgreen;
        font-size:30px;
        display:flex;
        align-items:flex-end;
        justify-content:flex-end;
        

    }
     


`