import React,{useEffect, useRef, useState} from 'react'
import SendIcon from '@mui/icons-material/Send';
import styled from "styled-components"
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import FilledInput from '@mui/material/FilledInput';
import InputAdornment from '@mui/material/InputAdornment';
import CircularProgress, {
  circularProgressClasses,
} from '@mui/material/CircularProgress';
import { format } from "timeago.js";
import DoneAllIcon from '@mui/icons-material/DoneAll';
import {useSelector} from "react-redux";
let selectedChatCompare ;
function Chat(props) {
  const {socket, setMessages, messages } = props;
  const user =  useSelector(state=> state.auth.user)
  
  const [isConnected, setIsConnected] = useState(false);
  const [lastPong, setLastPong] = useState(null);
  const [userRoom, setUserRoom] = useState("")
  const [message, setMessage] = useState({
     text :"",
     image : "",
     owner_id : user.id,
     receiver_id :props.ReceiverUser.id,
     room_id:null

  });
 
  const messagesEndRef = useRef()
  // scrool to bottom 
  const scrollToBottom = () => {
    
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })

 }


  useEffect(() => {
   
    socket.on("messages", msg => {
      //   let allMessages = messages;
      //   allMessages.push(msg);
      //   setMessages(allMessages);
  

        setMessages((list) => [...list, msg.messages]);
        scrollToBottom()

    });
   
    socket.on('connect', () => {
      setIsConnected(true);
      console.log("user connected")
    });


    socket.on('disconnect', () => {
      setIsConnected(false);
    })
    return () => {
      socket.off("connect");
      socket.off("disconnect")
      socket.off("messages")
      props.setReceiverUser(null)

     

    }
  

  }, [socket]);
 
  useEffect(() => {
    socket.on("open_room", (data)=>{
     setMessage({
      ...message,
      room_id : data.room_id
     })
     setUserRoom(data.room_id)
     
  })
 
  


  }, [props.ReceiverUser])

  useEffect(() => {

    const getMessages =  async () => {
     
      fetch(`/getMessages/${message.room_id}`)
      
      .then(response => response.json())
      
      .then(data => {
        setMessages(data.messages)
        props.setMessageLoading(false)
        props.setNotification([])
        scrollToBottom()
        
      })
        
      .catch(err => console.log(err))
    }

    const clearNoofication = () =>{
      fetch("/clearnotification",{
        method:"POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          room_id: message.room_id,
          receiver_id : message.receiver_id
    
        })
      
     }).then(response=> response.json())
     .catch(err => console.log(err))
    }
    if(message.room_id  !== null) {
      getMessages(); 
      clearNoofication()
    }
  
  }, [userRoom]);
  
  

  // On Change
  const hendleChange = e => {
    console.log(messages)
    setMessage(
      {
        ...message, 
        text : e.target.value,
        image : "",

      }
      );
      
  };

  // send messsage to the back-end server 
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

  const {ReceiverUser, closeChat, messageLoading}= props;
  return (
      <Container>
          
        
          <div className="header">
        <div className="user-avatar">
          <img src="../avatars/boy.jpg" alt="profile" />
        </div>
        <div className="user-info">
          <span>{ReceiverUser.firstName + " " + ReceiverUser.lastName}</span>
        </div>
        <div className='close-container'>
           <CloseIcon onClick={closeChat} className="close-icon" />
        </div>
      </div>
          <ChatContainer >
        {messageLoading === false ? (


        messages?.map(msg => {
          return (

            <div key={msg.id} id="messages" ref= {messagesEndRef} className={msg.sender === user.id ? "senderMessage" : "receiverMessage"}>

              <span> {msg.message} </span>

              <span  className='time-ago'>
                {format(msg.created_at)}
                {msg.sender === user.id ? <DoneAllIcon className="sending-icon" /> : ""}

              </span>
              
            </div>
          )

        })
        ):<div style={{ height:"100%", display:"flex", alignItems:"center", justifyContent:"center" }}><CircularProgress
           
           size={22}
           thickness={6}
           value={100}
         />
         </div>} 
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

export default Chat
const Container = styled.div`
    
    display:flex;
    flex-direction:column;
    
     width:40%;
     min-width:340px;
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
  
  `