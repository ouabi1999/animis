import React,{Fragment, useEffect, useRef, useState} from 'react'
import SendIcon from '@mui/icons-material/Send';
import styled from "styled-components"
import CircularProgress, {
  circularProgressClasses,
} from '@mui/material/CircularProgress';

import IconButton from '@mui/material/IconButton';
import FilledInput from '@mui/material/FilledInput';
import InputAdornment from '@mui/material/InputAdornment';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import {useSelector} from "react-redux";
import io from "socket.io-client";
import  {format}  from "timeago.js";
let endPoint = "http://localhost:5000";
let socket = io.connect(`${endPoint}`);

function AdminChat(props) {
  const user =  useSelector(state=> state.auth.user)
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [userRoom, setUserRoom] = useState("")
  const [lastPong, setLastPong] = useState(null);
  const [message, setMessage] = useState({
     text :"",
     image : "",
     owner_id : user.id,
     receiver_id :props.ReceiverUser.id,
     room_id:null

  });

  const  messagesEndRef = useRef()

 /* useEffect(() => {
    socket.emit("join_room", props.room);
  }, [props.chatOpend])
  */
  useEffect(() => {

    socket.on("messages", msg => {
      //   let allMessages = messages;
      //   allMessages.push(msg);
      //   setMessages(allMessages);
      setMessages((list) => [...list, msg.messages]);
      socket.emit("msgnotification", msg.messages);
      scrollToBottom()

    });
    
    socket.on('connect', () => {
      setIsConnected(true);
      console.log("user connected")
      
    });


    socket.on('disconnect', () => {
      setIsConnected(false);
    });
    
  
    
    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('pong');

    };

  },[socket]);

  
  // scrool to bottom 
  const scrollToBottom = () => {
    
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
   
   }

   useEffect(() => {

    const getMessages = () => {
     
      fetch(`/getMessages/${message.room_id}`)
      
      .then(response => response.json())
      
      .then(data => {
        setMessages(data.messages) 
        props.setMessageLoading(false)
        scrollToBottom()
        
      })
        
      .catch(err => console.log(err))
    }
    if(message.room_id  !== null)  getMessages()
  
  }, [userRoom]);

  


  useEffect(() => {
    socket.on("open_room", (data)=>{
     setMessage({
      ...message,
      room_id : data.room_id
     })
     setUserRoom(data.room_id)
  })
  

  }, [props.ReceiverUser])
  

  // On Change
  const hendleChange = e => {
    setMessage(
      {
        ...message, 
        text : e.target.value,
        image : "",

      }
      );
      
  };


  // send message to the server
  const handleMessage = async () => {
    if (message.text !== "") {
      socket.emit("message", message);
      
      setMessage({
        ...message,
        text: "",
        image: "",

      });
      console.log(message)
    } else {
      return ""
    }

    try {

      await socket.on("messages", msg => {
        
        scrollToBottom()
        
      })
    } catch (err) {
      console.log(err)
    }
  };

  const {ReceiverUser, messageLoading} = props;
  return (
    <Container>

      <div className="header">
        <div className="user-avatar">
          <img src="../avatars/boy.jpg" alt="profile" />
          <div></div>
        </div>
        <div className="user-info">
          <span>{ReceiverUser.firstName + " " + ReceiverUser.lastName}</span>
        </div>
      </div>

      <ChatContainer >
       
        {messageLoading === false ? (


        messages?.map(msg => {
          return (
             
            <div ref = {messagesEndRef}  key={msg.id}  className={msg.sender === user.id ? "senderMessage" : "receiverMessage"}>
              
            
              <span > {msg.message} </span>

              <span  className='time-ago'>
                {format(msg.created_at)}
                {msg.sender === user.id ? <DoneAllIcon className="sending-icon" /> : ""}

               </span>
               
            </div>
          )

        })
        
        ):
          <div style={{ height:"100%", display:"flex", alignItems:"center", justifyContent:"center" }}><CircularProgress
           
            size={25}
            thickness={4}
            value={100}
          />
          </div>
          
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
                  <SendIcon onClick={handleMessage}/>
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
     min-width:340px;
     height:465px;
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
    }
     .user-avatar img{
         border-radius:50%;
         height:60px;
         width:60px;

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
      height:inherit;
      
      .senderMessage{
        max-width: 28rem;
        background-color:lightgreen;
        padding:2px 5px;
        width:fit-content;
        margin-bottom:2.5px;
        border-radius:4px;
        font-size:12px;
        margin-left:auto;
        display:flex;
        flex-direction:column;

      }
      
        
      .receiverMessage{
        max-width: 28rem;
        background-color:lightblue;
        padding:2px 5px;
        width:fit-content;
        margin-bottom:2.5px;
        border-radius:4px;
        font-size:12px;
        margin-right:auto;
        display:flex;
        flex-direction:column;

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
  
  `