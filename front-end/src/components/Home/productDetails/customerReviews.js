import React, { useEffect , useState } from 'react'

import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { createTheme } from '@mui/material/styles';
import { styled as styles} from '@mui/material/styles';
import { purple, red, orange } from '@mui/material/colors';
import {Stack} from "@mui/material"
import Box from '@mui/material/Box';
import styled from 'styled-components';
import StarIcon from '@mui/icons-material/Star';
import Flag from 'react-world-flags';
import ClearIcon from '@mui/icons-material/Clear';



const BorderLinearProgress = styles(LinearProgress)(({ theme }) => ({
    height: 4,
    maxWidth:250,
    minWidth:180,
    
    
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
     
      backgroundColor: theme.palette.mode === 'light' ? '#ff9800' : '#308fe8',
    },
  }));
function CustomerReviews(props) {

  const {fiveStars,
    twoStars,
    fourStars,
    threeStars,
    oneStar,
    sum_stars,
    newRatings,
    product} = props;
    
    
    const [selected, setSelected] = useState({index:null, id:null})
    const [reviews , setReviews] = useState(product?.ratings)
     
    const stars = Array(5).fill(0);
   
   useEffect(() => {
       if(newRatings !== null){
       
       setReviews(prev => [...prev, newRatings])
      }

   }, [props.newRatings])
   

  
   
  return (
      <Container>
            
            <h4>Customer Reviews</h4>
                
             <div className="RatingsContainer">
              <div>
                  <span className='star-number'>5 Stars</span>
                  <span>
                  <BorderLinearProgress
                      variant="determinate" 
                      value={sum_stars<=0?0:(fiveStars/sum_stars*100).toFixed(0)} 
                     
                  
                  />
                  </span>
                  <span className='percent'>{sum_stars<=0?0:(fiveStars/sum_stars*100).toFixed(0)}%</span>
              </div>
              <div >
                  <span className='star-number'>4 Stars</span>
                  <span>
                  <BorderLinearProgress 
                       variant="determinate"
                        value={sum_stars<=0?0:(fourStars/sum_stars*100).toFixed(0)}  />
                  </span>
                  <span className='percent'>{sum_stars<=0?0:(fourStars/sum_stars*100).toFixed(0)}%</span>
              </div>
              <div >
                  <span className='star-number'>3 Stars</span>
                  <span >
                  <BorderLinearProgress variant="determinate" value={sum_stars<=0?0:(threeStars/sum_stars*100).toFixed(0)} />
                  </span>
                  <span className='percent'>{sum_stars<=0?0:(threeStars/sum_stars*100).toFixed(0)}%</span>
              </div>
              <div >
                  <span className='star-number'>2 Stars</span>
                  <span>
                  <BorderLinearProgress 
                        variant="determinate" 
                        value={sum_stars<=0?0:(twoStars/sum_stars*100).toFixed(0)} 
                        
                      />
                  </span>
                  <span className='percent'>{sum_stars<=0?0:(twoStars/sum_stars*100).toFixed(0)}%</span>
              </div>
              <div >
                  <span className='star-number star1'>1 Star</span>
                  <span>
                  <BorderLinearProgress 
                      variant="determinate"
                      value={sum_stars<=0?0:(oneStar/sum_stars*100).toFixed(0)} 
                       
                       />
                  </span>
                  <span className='percent'>{sum_stars<=0?0:(oneStar/sum_stars*100).toFixed(0)}%</span>
              </div>
              </div>
              {reviews?.map((rate, index)=>{
                 return(
                    <div className='user-review' key={index}>
                     <div className='user-info'>
                        <span className='user-name'>{
                          rate.userName.slice(0, 2) + "***" + rate.userName.slice(4, rate.userName.length)}</span>
                        <div style={{display:"flex", marginTop:"5px"}}> 
                        <span>
                          <Flag  code={rate.userCountryCode} style={{ width: "25px", height: "18px", marginRight:"4px" }} />
                          </span>
                        <span style={{color:"gray"}}>{rate.userCountryCode}</span>
                        </div>
         
                     </div>
                     
                     <div className = "review-info">
                      <div className = "stars">
                     {stars.map((_, index) => {
                      return (
                        <div  key={index}>
                          <StarIcon
                            className = { index < (rate.stars).toFixed(0)
                              ?
                                "on"
                              :
                                "off"
                              } 
                            />
                        </div>
                      )
                    })}
                    </div>
         

                       <div className='comment'>
                       <div style={{ marginLeft: "3px", color: "gray", fontSize:"12px" }}>{rate.rateDate.slice(0, 16)}</div>
                         <span>
                          {rate.comment.text}
                           
                         </span>
                        
                         
                         <div key={index} className="img-parent-container">
                           {rate.comment.image?.map((img, index) => {
                             return (
                               <div key={index} className="img-container">
                                
                                 <img 
                                  
                                   onClick={() => setSelected({index: index, id:rate.id})} 
                                   
                                   className={index === selected.index && selected.id === rate.id ? "selected" : "reviews-img"} 
                                   src={img} alt=""
                                   
                                   />
                               </div>
                             )
                           })}
                       </div>
                       </div>
                       
                      {selected.index !== null  && selected.id === rate.id && (
                        <>
                      
                            <ClearIcon 
                                className="cancel-icon"
                                onClick={()=> setSelected({index: null, id:null})}/>
                        
                        <img      
                           
                            className=" selected-img" 
                            src={rate.comment.image[selected?.index]} alt=""
                        />
                        
                        </>
                      )}

                    </div>
                  </div>
                )
              })}
          
      </Container>
  )
}

export default CustomerReviews

const Container = styled.div`
    width:80%;
    min-width:300px;
    max-width:800px;
    flex:1;
    
   .user-name{
    font-size:15px;
    font-family:Arial, Helvetica, sans-serif
   }
   .stars{
    display:flex;
    flex-direction:row;
   } 

.on{
    color: #FFBA5A;
    font-size:20px;
  }
  .off{
    color: #ccc;
    font-size:20px;
  }  
    .user-review{
      display:flex;
      border-top:1px solid lightgray;
      margin-top:15px;
      padding:10px 5px;
     
    }
    .review-info{
      display:flex;
      flex-direction:column;
      padding-bottom:15px;
    }
    .user-info{
      display:flex;
      flex-direction:column;
      margin-right:30px;
      
    }
    .reviews-img{
      position:relative;
      width:50px;
      height:55px;
      border:1px solid lightgray;
      padding:2px;
      margin-right:5px;
      object-fit:contain;
      cursor:pointer;
      transition: width  1s, height 1s;

    }

    .selected{
      width:50px;
      height:55px;
      border:1px solid orange;
      padding:2px;
      cursor:pointer;
    }
    .selected-img{
    
      height: 45vh;
      min-width:160px;
      min-height:200px;
      max-height:300px;
      max-width:200px;
      width: 40vw;
      border:1px solid lightgray;
      padding:2px;
      margin-right:5px;
      object-fit:contain;
      cursor:pointer;
      transition: width  1s, height 1s
      
    }
    @media only screen and (max-width:640px){
      .selected-img{
        height:200px;
        width:160px;
      }
    }
  
    .cancel-icon{
      position:relative;
      color:gray;
      top:25px;
      font-weight:900;
      z-index:1;
      cursor:pointer;
    }
    .cancel-icon:hover{
      color:royalblue;
    }
    .img-parent-container{
      display:flex;
      flex-wrap:wrap;
    


    }
    .img-container{
      position:relative;
      padding:2px;

    }

    .RatingsContainer >div{
        display:flex;
        align-items:center;
        flex-direction:row;
        margin-bottom:5px;
        
     }
     span{
       
        font-size:13px;
       
       
     }
     .star-number{
        width:50px 
     }
     .star1{
            padding-left:2px;
     }
    .percent{
      display:flex;
      justify-content:center;
      padding:0px 8px;
      border:1px solid lightgray;
      width:45px;
      border-radius:4px;
      margin-left:8px;
}
.comment{
  word-wrap:wrap;
  word-break:break-all;
}
.comment span{
  
  word-wrap:wrap;
  word-break:break-all;

}

`


