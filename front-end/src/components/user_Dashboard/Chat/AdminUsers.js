import React,{useEffect, useState} from 'react'
import styled from "styled-components"
import FiberNewIcon from '@mui/icons-material/FiberNew';
import { useDispatch } from 'react-redux';
import { setNewMessage, setReadMessages, setRoom } from '../../../features/customers/customers_slice';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';


function AdminUsers({

    startChat,
    socket,
    sender,
    receiver,
    chatOpend

    }){  
    
    const receiverRooms = receiver?.rooms?.filter(room => [sender?.id, receiver?.id].includes(room.sender) && [sender?.id, receiver?.id].includes(room.receiver));

    const [isConnected, setIsConnected] = useState(false);
    const messages = receiverRooms?.[0]?.messages
    const [roomInfo, setRoomInfo] = useState({

        sender_id: sender?.id,
        receiver: receiver,
        room_id: receiverRooms?.[0]?.id,

    });
    const dispatch = useDispatch()
    const getRoom = async () => {

        fetch(`/getRoom`, {
            method: "POST",
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
                    room_id: data.id

                })
            })
            .catch(err => console.log(err))
        }

     useEffect(() => {
        
        if (!receiverRooms[0] && receiver && sender.admin === false) {

            getRoom()
        }

    }, [])


    useEffect(() => {

        socket.on("seenMessages", (msg) => {
         
            if(msg.room_id === receiverRooms?.[0]?.id && msg.sender === receiver?.id){
            console.log("seen client mesage")
            dispatch(setReadMessages({ user_id:msg.sender, room_id: msg.room_id, messages: msg.messages }))

            }
           })

        socket.on("newMessage", (msg) => {

            if (msg.newMessage.room_id === receiverRooms?.[0]?.id) {

                dispatch(setNewMessage({ user_id: receiver?.id, message: msg.newMessage}))
                if(chatOpend === true && msg.newMessage.sender !== sender.id){

                    socket.emit("readMessage", { sender:msg.newMessage.receiver , receiver:msg.newMessage.sender, room_id: msg.newMessage.room_id }); 
                    console.log("read admin mesage")
                }

               
              
            }
        });

        return () => {
            socket.off("connect");
            socket.off("disconnect")
            socket.off("newMessage")

        }
    }, [socket, chatOpend]);












    const lastMessage = messages?.[messages.length - 1]


    return (
        <Container>
            <button onClick={() => startChat(roomInfo)} className='message-container'>
                <div className='message-container'>
                    <SupportAgentIcon className="support-agent-icon" />
                    <div className="message-content">
                        <span className="user-name">Support team</span>

                   
                        <span className={lastMessage?.is_Read === false && lastMessage?.sender !== sender.id ? "new-message" : "last-message"}>
                            {lastMessage?.message}
                        </span>
                       
                        {messages?.length <= 0 && (

                            <span className="none-message">
                                You are now connected
                            </span>

                        )}
                    </div>

                </div>
                
                <div>
                    {messages?.filter(msg => msg.is_Read === false && msg.sender !== sender.id).length > 0 ?
                        <span className='unread-messages'>
                            {messages.filter(msg => msg.is_Read === false && msg.sender !== sender.id).length}

                        </span>
                        :
                        ""
                    }

                
                </div>
            </button>
        </Container>
    )
}

export default AdminUsers

const Container = styled.div`
     background:rgb(26, 26, 26, 0.8);
     border-radius:8px;
     padding:10px 5px;
     max-width:320px;
     overflow:hidden;

     .support-agent-icon{
        height:45px;
        width:45px;
        color:lightblue;
     }
     
     .message-container{
         display:flex;
         align-items:center;
         width:100%;    
     }
      .user-name{
        color:#fff;
      }
     .message-content{
        display:flex;
        flex-direction:column;
        margin-left:10px;
        align-items:flex-start;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
     
    
    .unread-messages{
        padding:2px 6px;
        border-radius:50%;
        background:#cc0000;
        color: rgb(26, 26, 26, 0.8);

    }
    .none-message, .last-message{
        margin-top:10px;
        color:#a6a6a6;
        font-size:12px;
        
    }

     .new-message{
        font-weight:bolder;
        margin-top:10px;
        color:#fff;
     }

     button{
        color:none;
        background:none;
     }
    
     


`