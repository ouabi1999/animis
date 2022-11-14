import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import styled from "styled-components"
import AdminChat from './AdminChat'
import Users from './Users'
import io from "socket.io-client";
let endPoint = "http://localhost:5000";
let socket = io.connect(`${endPoint}`);
function ChatLayout() {
    const users = useSelector(state=> state.customers.customers)
    const user =  useSelector(state=> state.auth.user)
    const [chatOpend, setChatOpend] = useState(false)
    const [messageLoading, setMessageLoading] = useState(false)
    const [room, setRoom]  = useState(null);
    const [ReceiverUser , setReceiverUser] = useState("")


   

    const startChat =  (receiver) => {
      
           
         setRoom({
              
                owner_id : user.id,
                receiver_id : receiver.id,
    
            })
            setMessageLoading(true)
            setChatOpend(true)
            setReceiverUser(receiver)
            socket.emit("join_room", 
                                        { 
                                            owner_id:user.id,
                                            receiver_id:receiver.id
                                        }
                                        );

            
  
        

    }

   
  return (
      <Container>
          <div className="users">
              <Users  startChat = {startChat} users={users}/>
          </div>
          {chatOpend && (
          <div className="chat">
              <AdminChat 
                  socket ={socket} 
                  setMessageLoading = {setMessageLoading}
                  messageLoading = {messageLoading}
                  room={room} ReceiverUser = {ReceiverUser}/>
          </div>

          )}
      </Container>
  )
}

export default ChatLayout

const Container = styled.div`
  
  
   display:flex;
   .users{
     flex:0.5;
     margin-right:10px;
   }
   .chat{
    flex:1;
   }


`