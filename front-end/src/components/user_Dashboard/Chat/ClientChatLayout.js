import React, { useState , useEffect, useCallback, useMemo} from 'react'
import { useSelector } from 'react-redux'
import styled from "styled-components"
import io from "socket.io-client";
import Chat from './Chat';
import AdminUsers from './AdminUsers';
let endPoint = "http://localhost:5000";
let socket = io.connect(`${endPoint}`);
function ClientChatLayout() {
    const users = useSelector(state=> state.customers.customers)
    const user =  useSelector(state=> state.auth.user)
    const [chatOpend, setChatOpend] = useState(false)
    const [messageLoading, setMessageLoading] = useState(false)
    const [notification , setNotification] = useState([])
    const [messages, setMessages] = useState([]); 
    
    const [room, setRoom]  = useState({
        owner_id :  "",
        receiver_id : ""
   
     });
    const [ReceiverUser , setReceiverUser] = useState(null)

    const startChat = (admin_receiver)=>{
        setRoom({
            ...room,
            owner_id:user?.id,
            receiver_id:admin_receiver.id,

        })
        setMessageLoading(true)
        
        setReceiverUser(admin_receiver)
        setChatOpend(true)
        socket.emit("join_room", 
        { 
            owner_id:user.id,
            receiver_id:admin_receiver.id
        }
        );

    }
    
  useEffect(() => {

    socket.on("messages", msg => {
      if (ReceiverUser === null){
        console.log("test1")
        setNotification((prev) => [msg.messages, ...prev]);
      

      } else{
        return ""
      }
    })
  
  }, [socket, ReceiverUser ])
     
     
    
      
    
    
   const closeChat = () => {
    setChatOpend(false)
    socket.off("join_room");
    setReceiverUser(null)

   }

  return (
    <>
    {chatOpend === false? (

      <Container>
          <div className="users">
            
              <AdminUsers 
                messages = {messages} 
                setMessages = {setMessages}
                notification = {notification}
                startChat = {startChat} users={users}/>
          </div>
         
      </Container>
    ):
    <ChatContainer>
    <Chat 
          notification = {notification}
          setNotification = { setNotification}
          socket = {socket} 
          setMessageLoading = {setMessageLoading}
          messageLoading = {messageLoading} 
          closeChat = {closeChat} 
          chatOpend = {chatOpend}
          room = {room}
          ReceiverUser = {ReceiverUser}
          setReceiverUser = {setReceiverUser}
          messages = {messages} 
          setMessages = {setMessages}
          

          
          />

      </ChatContainer>
    
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