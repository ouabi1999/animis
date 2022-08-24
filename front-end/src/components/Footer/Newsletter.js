import React, { Component } from 'react'
import styled  from "styled-components"
import MailOutlineIcon from '@mui/icons-material/MailOutline';


class Newsletter extends Component {
    render() {
        return (
            <Container>
                <Wrapp>
                    <span className="title">Newsletter</span>
                    <p>
                        Signup for our newsletter to get notified about sales.

                    </p>
                    <div className="subscribe">
                        <span>
                            <MailOutlineIcon className="mail-icon" />
                        </span>
                        <input type="email" placeholder="Email" required />
                        <button type="submit" > Subscribe</button>
                    </div>
                </Wrapp>
            </Container>
        )
    }
}
export default Newsletter
const Container = styled.form`
    min-width:200px;
    max-width:400;
    margin-top:20px;
    
`
const Wrapp = styled.div`
      
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;
    border-radius:6px;
    box-shadow:  0px 1px 2px 0px, rgba(255, 255, 255, 0.1) 0px 2px 6px 2px;
    background:rgb(255, 255, 255, 0.2);
    padding:10px 0;
    margin-right:6px;
    
    p{
        font-size:15px;
        font-weight:bold;
        width:50%;
        word-break: keep-all;;
        text-align:center;
        margin:0 0 10px  0px;
        color:#fff;
        
        
    }
    .title{
        color:orange;
        font-size:20px;
        font-weight:600;
    }
    .subscribe{
        display:flex;
        justify-content:center;
        
    
    }
    
    
    
    .subscribe input[type="email"]{
         border:1px solid lightgray;
         height:30px;
         min-width:200px;
         max-width:360px;
         border-left:none;
         outline:none;
       
    }
    .subscribe button{
        height:30px;
        background-color:rgb(0, 26, 51);
        color:#fff;
        border:1px solid lightgray;
        border-left:none;
       
    }
    
    
    .mail-icon{
        background:rgb(0, 26, 51);
        color:#fff;
        font-weight:600;
        padding:0;
        margin:0;
        font-size:30px;
        border:1px solid lightgrey;
    
        
    }
`
