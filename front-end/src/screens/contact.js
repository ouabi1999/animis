import React, { Component } from 'react'
import styled from "styled-components"


class Contact extends Component {
    render() {
        return (
            <Container>
            <div className="contact_container">
                <form>
                    <div className="contact_sections">
                        <label for="email">Please fell free and text us about anything you think about </label>
                        <input type="email" placeholder="email@example.com" required/>
                        <textarea type="text" max="105" required placeholder="Message"></textarea>
                        <button type="submit"> Send </button>
                    </div>
                </form>
            </div>

            </Container>
        )
    }
}

export default Contact

const Container = styled.div`


.contact_container{
    display:flex;
    justify-content: center;
    align-items: center;
}
.contact_sections{
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width:50vw;
}
.contact_sections input[type="email"]{
    border:none;
    border-radius: 4px;
    padding:10px 6px;
    box-shadow: 2px 4px 15px rgb(122, 121, 121);
    margin:10px  0px;
    outline: none;
    align-self: flex-start;
    width:25vw;
    background-color: rgba(100, 148, 237, 0.623);
    color:rgb(0, 0, 0);
    font-weight: bold;
}
.contact_sections label[for="email"]{
    align-self: flex-start;
    padding-top: 20px;
    font-weight: bold;
    color:rgb(1, 39, 1);
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    text-transform: uppercase;
    
}
.contact_sections textarea{
    width:50vw;
    border-radius: 4px;
    border: 1px solid rgba(100, 148, 237, 0.623);
    outline: none;
    padding:2px 5px;
    height: 50vh;
    font-weight: bold;
}
.contact_sections button{
    margin-top: 5px;
    margin-bottom: 10px;
    background: #0052D4; 
    border-radius: 6px;
    padding:5px  15px;
    color:rgb(255, 255, 255);
    border:none;
    font-weight: bold;
    height:35px;
    

}



`
