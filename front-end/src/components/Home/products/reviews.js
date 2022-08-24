import React, { useState } from 'react';
import styled from 'styled-components';
import StarIcon from '@mui/icons-material/Star';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import {useSelector} from "react-redux"

function Reviews(props) {

    const [star_rating, set_star_rating] = useState(null);
    const [comment, setComment] = useState({ image:[], text:""})
    const [hoverValue, setHoverValue] = useState(null)
    const user = useSelector(state => state.auth.user)

    const { product_id, user_id } = props;

    const stars = Array(5).fill(0);
    const imgInput = React.createRef()
    const handel_CommentChange = (e) => {
        setComment({...comment, text:e.target.value})
    }

    const handle_Rating_Click = value => {
        set_star_rating(value + 1)
    }

    const handleMouseOver = (newHoverValue) => {
        setHoverValue(newHoverValue)
    };

    const handleMouseLeave = () => {
        setHoverValue(null)
    }

    const handelRatingSubmit = (event) => {
        event.preventDefault()
        fetch("/ratings", {
            method: "POST",
            body: JSON.stringify({
                product_id: product_id,
                user_id: user.id,
                stars: star_rating,
                comment: comment,
            }),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        }).then(response => response.json())
            .then(message => console.log(message))
    }


    const imageHandler = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setComment({...comment ,image:[...comment.image, reader.result]})
            }
        }
        reader.readAsDataURL(e.target.files[0])
        console.log(comment)
    }

    const handleImageInput = (e) => {
        e.preventDefault()
        if (e.target.id === e.target.name) {
            return false
        } else {
            imgInput.current.click()
        }
    }
 
    return (
        <Conatiner>
            <h2> Write a product review</h2>
            <div className='Stars'>
                {stars.map((_, index) => {
                    return (
                        <StarIcon
                            key={index}
                            className={(star_rating || hoverValue) > index ? "on" : "off"}
                            onClick={() => handle_Rating_Click(index)}
                            onMouseOver={() => handleMouseOver(index + 1)}
                            onMouseLeave={handleMouseLeave}
                        />
                    )
                })}
            </div>
            <Wraper>
                <Wrap>
                    <textarea
                        className="feedback_feild"
                        onChange={handel_CommentChange}
                        value={comment.text}
                        type="text"
                        placeholder="rates"
                    />
                    <input
                        type="file"
                        ref={imgInput}
                        style={{ display: "none" }}
                        accept = "image/*"
                        onChange= {imageHandler}
                    />
                    <Add_image_container>
                        <button
                            className="add-image"
                            name="imageinput"
                            id="imageinput"
                            onClick={handleImageInput}
                        >
                            <AddPhotoAlternateIcon className="add-image-icon" />
                        </button>
                        {comment.image?.map((item, index) => {
                            return (
                                <img key={index} src={item} width="50px" />
                            )
                        })}
                    </Add_image_container>

                    <button
                        type="button"
                        className='submit-button'
                        onClick={(e) => handelRatingSubmit(e, props.product_id, 10100)}>
                        Submit
                    </button>
                </Wrap>
            </Wraper>
        </Conatiner>
    )
}

export default Reviews
const Conatiner = styled.div`

.on{
    color: #FFBA5A;
    cursor:pointer;
}
.off{
    color: #ccc;
    cursor:pointer;
}

`
const Wrap = styled.div`

    display:flex;
    flex-direction:column;
    
    .feedback_feild{

       width:40vw;
       height:250px;
       padding:5px;
       border-color: lightblue;
       border-bottom:none;
       resize: none;

       &:focus{
        border-color: #FFBA5A;
        outline: none
       }
    }
    
    .submit-button{
        background:green;
        color:white;
        padding:5px 10px;
        width:80px;
        
    }
    input{
        position:relative;
        top:-5px;
        padding:5px;
        border-left:1px solid lightblue;
        border-right:1px solid lightblue;
        background:#FFE5B1;
        width:40vw;


    }
    
    
`
const Wraper = styled.div`


`
const Add_image_container = styled.div`
    display:flex;
    flex-wrap:wrap;
    width:40vw;
    background:#F5F5F5;
    padding:5px;
    border: 1px solid lightblue;

    .add-image{
        background:none;
    }

`