import React from 'react'
import styled from "styled-components"


function Users(props) {
  return (
    <Container>
        {props.users.map(user =>{
            return(
                <button onClick={()=> props.startChat(user)}className='message-container'>
                
                    <div className="user-avatar">
                        <img src="../avatars/boy.jpg" alt="kkk" />
                    </div>
                    <div className="message-content">
                        <span>{user.firstName +" "+user.lastName }</span>
                        <span className="message">
                        You are now connected
                        </span>
                    </div>
               
                </button>
            )
        })
    }
    </Container>
  )
}

export default Users

const Container = styled.div`
     background:rgb(26, 26, 26, 0.9);
     padding:10px;
     .user-avatar img{
         border-radius:50%;
         
         height:60px;
         width:60px;
         

     }
     .message-container{
         display:flex;
         align-items:center;
         
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


`