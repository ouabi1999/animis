import React,{useEffect, useState} from 'react'
import { useDispatch } from 'react-redux';
import styled from "styled-components"
import { setNewMessage, setReadMessages, setRoom} from '../../../features/customers/customers_slice';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';



function Users({

              startChat,
              socket,
              sender,
              receiver,
              chatOpend

          }){

    const receiverRooms = receiver?.rooms?.filter(room => [sender?.id,  receiver?.id].includes(room.sender) && [sender?.id,  receiver?.id].includes(room.receiver));
  
    const [isConnected, setIsConnected] = useState(false);
    const messages = receiverRooms?.[0]?.messages
    const [roomInfo, setRoomInfo] = useState({
       
        sender : sender?.id,
        receiver : receiver,
        room_id: receiverRooms?.[0]?.id,
  
      });
    const dispatch = useDispatch()
    const getRoom =  async () => {
     
        fetch(`/getRoom`,{
          method:"POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            
              owner_id: sender?.id,
              receiver_id: receiver?.id
          

          })
        })
        
        .then(response => response.json())
        
        .then(data => {
          dispatch(setRoom({room:data, user_id: receiver?.id}))
          setRoomInfo({
            ...roomInfo,
            room_id : data.id
          
          }) 
        })
        .catch(err => console.log(err))
        }
  
        useEffect(() => {
            if( !receiverRooms[0] && receiver && sender ){
        
            getRoom()
          }
    
        }, [])
   
    

    useEffect(() => {
      
      socket.on("seenMessages", (msg) => {
         
        if (msg.room_id === receiverRooms?.[0]?.id && msg.sender === receiver?.id){

            dispatch(setReadMessages({ user_id:msg.sender, room_id: msg.room_id, messages: msg.messages}))
            
          }
          
          })

        socket.on("newMessage", (msg) => {
          
          if(msg.newMessage.room_id === receiverRooms?.[0]?.id){
            
            dispatch(setNewMessage({user_id:receiver.id, message:msg.newMessage}))
            if(chatOpend === true && msg.newMessage.sender !== sender.id){
                socket.emit("readMessage", { sender:msg.newMessage.receiver , receiver:msg.newMessage.sender, room_id: msg.newMessage.room_id });   
            } 
          }
        });

       
    
    
       
        return () => {
          socket.off("newMessage")
    
        }
      
        
      }, [socket, chatOpend]);
    

   

        
        
  

     
  
  
 
  const lastMessage = messages?.[messages.length-1]
   

  return (
        <Container>
            <button onClick={() => startChat(roomInfo)} className='message-container'>

                <div>
                    <AccountCircleIcon className="user-avatar"/>
                </div>
              <div className="message-content">
                  <span className="user-name">{receiver?.firstName + " " + receiver?.lastName}</span>

                  {messages?.length <= 0 ? (
                    
                      <span className="none-message">
                          You are now connected
                      </span>

                  ) :  
                  <div className="last-message-container">
                     
                     
                      {messages?.filter(msg => msg.is_Read === false && msg.sender !== sender.id).length > 0 &&
                       
                          <span className='unread-messages'>
                              {messages.filter(msg =>  msg.sender !== sender.id).filter( msg => msg.is_Read === false ).length} 
                          </span> 
                             
                    }
                     <span className={
                          lastMessage?.is_Read === false && lastMessage?.sender !== sender.id ? "new-message" : "last-message"}>
                          {lastMessage?.message}
                    </span>
                        
                  </div>
                  }


              
                
                
            </div>

            </button>
           

        </Container>
    )
}

export default Users

const Container = styled.div`
     background:rgb(26, 26, 26, 0.9);
     padding:10px;
     .user-avatar{
         
         height:45px;
         width:45px;
         

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
        width:100%;
     }
     .none-message, .last-message{
        color:#a6a6a6;
        font-size:12px;
        margin-bottom:8px;
        
         
     }
     
     .user-name{
        margin-bottom:8px;
        color:#ffff;
        text-transform:capitalize;
      }
      
     .new-message{
      font-weight:bolder;
      font-size:12px;
      color:#ffff;
     }
    .unread-messages{
        padding:1px 5px;
        border-radius:50%;
        background:#cc0000;
        color: rgb(26, 26, 26, 0.8);
        margin-right:3px;

    }
     
     button{
        color:none;
        background:none;
     }

    .last-message-container{
        
        display:flex;
        align-items:baseline;
        justify-content:center;
      


    }
   


`