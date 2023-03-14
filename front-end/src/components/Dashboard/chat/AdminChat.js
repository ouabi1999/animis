import React, {useEffect, useRef, useLayoutEffect } from 'react'
import SendIcon from '@mui/icons-material/Send';
import styled from "styled-components"
import CircularProgress, {
  circularProgressClasses,
} from '@mui/material/CircularProgress';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import FilledInput from '@mui/material/FilledInput';
import InputAdornment from '@mui/material/InputAdornment';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import {useDispatch, useSelector} from "react-redux";

import * as timeago from 'timeago.js';
import { setReadMessages } from '../../../features/customers/customers_slice';



function AdminChat(
  {
    ReceiverUser,
    closeChat, 
    socket,
    chatOpend,
    sender,
    message,
    setMessage, 
  }

  ){
 
  
  const AllUsers = useSelector(state => state.customers.customers)
  const reciever = AllUsers.find(user => user.id === ReceiverUser?.id);
  const receiverRooms = reciever?.rooms?.filter(room => [sender?.id,  reciever?.id].includes(room.sender) && [sender?.id,  reciever?.id].includes(room.receiver));
  const dispatch = useDispatch()
  const messagesEndRef = useRef()
  // scrool to bottom 
  const scrollToBottom = () => {

    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })

   }
  
    
    

   
  
  
  useEffect(() => { 

      scrollToBottom()  
    
  }, [receiverRooms?.[0]?.messages]);

  useEffect(() => {
     
    socket.on("seenMessages", (msg) => {
     
    
   
    dispatch(setReadMessages({ user_id:msg.receiver, room_id: msg.room_id, messages: msg.messages }))
    
   })
 
   
  }, [socket]);
  
  useLayoutEffect(() => {

    messagesEndRef.current?.scrollIntoView({ behavior: "auto" })
    if (message.room_id !== null && chatOpend) {

        socket.emit("readMessage", message);    
    }
        

  }, [message.room_id, chatOpend]);



  // On Change
  const hendleChange = e => {
    setMessage(
      {
        ...message,
        text: e.target.value,
        image: "",

      }
    );

  };

  // send messsage to the back-end server 
  const handleMessage = async () => {
      console.log(message)
    if (message.text !== "") {
      socket.emit("message", message);

      setMessage({
        ...message,
        text: "",
        image: "",

      });
    } else {
      return ""
    }

    try {

      await socket.on("message", msg => {
   
      })
    } catch (err) {
      console.log(err)
    }
  };
  
  return (

    <Container>
      <div className="header">
        <div>
          <AccountCircleIcon className="user-avatar"/>
        </div>
        <div className="user-info">
          <span>{ReceiverUser?.firstName + " " + ReceiverUser?.lastName}</span>
        </div>
        <div className='close-container'>
          <CloseIcon onClick={closeChat} className="close-icon" />
        </div>
      </div>
      <ChatContainer>

        {receiverRooms?.[0]?.messages?.map(msg => {
          return (

            <div key={msg.id} id="messages" ref={messagesEndRef} className={msg.sender === sender?.id ? "senderMessage" : "receiverMessage"}>

              <span> {msg.message} </span>

              <span className='time-ago'>
                {timeago.format(msg.created_at)}
                {msg.sender === sender?.id ? <DoneAllIcon className = {msg.is_Read === false ? "sending-icon" : "readed-icon"} /> : ""}

              </span>

            </div>
          )

        })
        }
      </ChatContainer>
      <div className="input-field">

        <FilledInput
          fullWidth
          id="filled-adornment-password"
          placeholder="Message"
          value={message.text}
          onChange={hendleChange}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"

              >
                <SendIcon onClick={handleMessage} />
              </IconButton>
            </InputAdornment>
          }
        />
      </div>
    </Container>

  )
}

export default AdminChat
const Container = styled.div`

display:flex;
flex-direction:column;

width:40%;
min-width:320px;
height:450px;
background:#ffff;

.input-field{
z-index:1;
background:lightgray;
width:100%; 

}
.header{
display:flex;
background:rgb(0,0,0, 0.8);
padding:2px 5px;
align-items:center;
width:100%;
border-radius: 8px  8px 0 0;  


}
.close-container{
display:flex;

align-items:flex-end;
justify-content:center;
margin-left:auto;


}
.close-icon{
color:#ffff;
cursor:pointer;
}
.close-icon:hover{
color:blue;
}
color: #000;
.user-avatar{
    height:45px;
    width:45px;
   }
.user-info{
    color:#ffff;
    margin-left:10px;
    text-transform:capitalize;
}

`

const ChatContainer = styled.div`
display:flex;
flex-direction:column;
overflow-y:scroll;
width:100%;
padding:5px 10px;
height:100%;

#messages{
display:flex;
flex-direction:column;
margin-bottom:2.5px;
border-radius:4px;
font-size:12px;
padding:2px 5px;
width:fit-content;
max-width: 28rem;
}
.senderMessage{
background-color:lightgreen;
margin-left:auto;


}

.receiverMessage{
background-color:lightblue;
margin-right:auto;

}

.time-ago{
font-size:8px;
margin:2px 0;
color:rgba(0.0.0, 0.7);
display:flex;
align-items:center;
}
.sending-icon{
font-size:12px;
margin-left:4px;
}
.readed-icon{
font-size:12px;
margin-left:4px;
color:blue;
}

`