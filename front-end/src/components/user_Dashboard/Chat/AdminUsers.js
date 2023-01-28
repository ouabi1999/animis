import React,{useEffect, useState} from 'react'
import styled from "styled-components"
import FiberNewIcon from '@mui/icons-material/FiberNew';
import { useDispatch } from 'react-redux';
import { setNewMessage, setReadMessages } from '../../../features/customers/customers_slice';

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
                setRoomInfo({
                    ...roomInfo,
                    room_id: data.room_id

                })


            })
            .catch(err => console.log(err))
    }

     useEffect(() => {
        if (!receiverRooms[0] && receiver && sender) {

            getRoom()
        }

    }, [])


    useEffect(() => {

        socket.on("seenMessages", (msg) => {
         
            if(msg.room_id === receiverRooms?.[0]?.id && msg.sender === receiver?.id){
            console.log("seen client mesage")
            dispatch(setReadMessages({ user_id:msg.receiver, room_id: msg.room_id, messages: msg.messages }))

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
                    <div className="user-avatar">
                        <img src="../avatars/boy.jpg" alt="s" />
                    </div>
                    <div className="message-content">
                        <span className="user-name">{receiver?.firstName}</span>

                        <span className={lastMessage?.is_Read === false && lastMessage?.sender !== sender.id ? "new-message" : "last-message"}>
                            {lastMessage?.message}
                        </span>


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
      .user-name{
        text-transform:capitalize;
        color:#fff;
      }
     .message-content{
        display:flex;
        flex-direction:column;
        margin-left:10px;
        align-items:flex-start;
    }
     
    
    .unread-messages{
        padding:2px 6px;
        border-radius:50%;
        background:#cc0000;
        color: rgb(26, 26, 26, 0.8);

    }
    .last-message{
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