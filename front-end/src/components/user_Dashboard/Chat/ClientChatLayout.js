import React, { useState , useEffect} from 'react'
import { useSelector } from 'react-redux'
import styled from "styled-components"
import CircularProgress from '@mui/material/CircularProgress';
import io from "socket.io-client";
import Chat from './Chat';
import AdminUsers from './AdminUsers';

let endPoint = "https://animis.herokuapp.com";
let socket = io.connect(`${endPoint}`);
function ClientChatLayout() {
  const AllUsers = useSelector(state => state.customers.customers)
  const sender =  useSelector(state=> state.auth.user);
  const users = AllUsers?.filter(user => user.admin === true);
  const [chatOpend, setChatOpend] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [ReceiverUser, setReceiverUser] = useState("")
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState({
    text :"",
    image : "",
    sender : sender?.id,
    receiver : "",
    room_id:null

});
  

  const startChat = (info)=>{
    
      setReceiverUser(info.receiver)
      setChatOpend(true)
      setMessage({
        ...message,
        receiver: info.receiver.id,
        room_id : info.room_id,
        sender : sender.id,

      })

  }


 const closeChat = () => {
  setChatOpend(false)
  socket.off("join_room");


 }
 
return (
  <>
  {!sender?(
      <div style={{ height:"100%", display:"flex", alignItems:"center", justifyContent:"center" }}><CircularProgress
         
      size={22}
      thickness={6}
      value={100}
    />
    </div>
  ):


    <>
    <Container style={ chatOpend === true ? { display:"none"} : {}}>
        <div className="users">
            {users.map(user =>{
              return(
                <div key={user.id}>
                <AdminUsers 
                  receiver={user}
                  startChat={startChat}
                  sender={sender}
                  chatOpend = {chatOpend}
                  socket={socket}
                />
              </div>

              )
        })}
           
           
            
         
          </div>
            
       
    </Container>

  <ChatContainer style={ chatOpend === false ? { display:"none"} : {}}>
  <Chat 
       
      socket = {socket}  
      closeChat = {closeChat} 
      chatOpend = {chatOpend}
      //setUserRoom = {setUserRoom}
      //userRoom = {userRoom}
      messages = {messages} 
      setMessages = {setMessages}
      isConnected = {isConnected}  
      setIsConnected = {setIsConnected}
      sender = {sender}
      message = {message}
      setMessage = {setMessage}
      ReceiverUser = {ReceiverUser}
      setChatOpend= {setChatOpend}
    />

    </ChatContainer>
    </>
  
      }
  </>
)
}

export default ClientChatLayout

const Container = styled.div`
  
   width:80%;
  
   .users{
     width:300px;
     margin-right:8px;
   }
   


`
const ChatContainer = styled.div`
     display:flex;
     justify-content:center;
     align-content:center


`