import React,{useEffect, useLayoutEffect, useState} from 'react';
import { addToCart, buyNowItem } from '../../../features/shopping_cart/cartSlice';
import styled from 'styled-components';
import StarIcon from '@mui/icons-material/Star';
import Feedback from './Feedback';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useDispatch, useSelector } from 'react-redux';
import { setProductDetails, getProductDetails } from '../../../features/productDetails/productDetails_slice';
import { useNavigate, useParams } from 'react-router-dom';
import {Link} from "react-router-dom"
import CircularProgress from '@mui/material/CircularProgress';
import { ToastContainer, toast } from 'react-toastify';
import CustomerReviews from './customerReviews';
import 'react-toastify/dist/ReactToastify.css';
import SuperDeals from './SuperDeals';
import Recommended from './Recommended';
import MostSelling from './MostSelling';
import DescriptionProduct from './DescriptionProduct';
import { v4 as uuidv4 } from "uuid";
import { faIR } from 'date-fns/locale';

function ProductDetailsLayout() {

  const dispatch = useDispatch()

  const params = useParams()
  const [maxOrderWorning, setMaxOrderWorning] = useState(false)
  const [formData, setFormData] = useState({
      items: 12,
      rating: 0,
      IndexRating: 0,
      stars: 1,
      
    })
    const index = uuidv4();
    useLayoutEffect(() => {

      dispatch(getProductDetails(params.id))
      window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
      
    
       
    }, [dispatch, params.id, formData])

   
    
    const {product, hasError, isLoaded} = useSelector(state => state.productDetails)
    const user = useSelector(state=> state.auth.user)
    const products = useSelector(state=> state.products.products)
    const [isLoading, setIsLoading] = useState(false)
    const [newRatings, setNewRatings ] = useState(null)
    const [required,  setRequired] = useState(false)
    const navigate = useNavigate()

    const [selected, setSelected] = useState({
      isDescription:true,
      isReviews : false
    })

    const [star_rating, set_star_rating] = useState(1);
    const [comment, setComment] = useState({ image:[], text:""})

    
    const [isColorActive, setIsColorActive] = useState(true)
    const [isPicsDetailsActive, setisPicsDetailsActive] = useState(false)

    const handelRatingSubmit = (event) => {
      if(comment.text !== ""){

      
      event.preventDefault()
      setIsLoading(true)
      fetch("/ratings", {
          method: "POST",
          body: JSON.stringify({
              product_id: product.id,
              user_id: user.id,
              userName : user.firstName,
              country : user.country,
              countryCode : user.countryCode,
              stars: star_rating,
              comment: comment,

          }),
          headers: { "Content-type": "application/json; charset=UTF-8" }
      }).then(response => response.json())
        .then( (data) => {
          setNewRatings(data)
          setIsLoading(false)
          setComment({text:"", image:[]})
          set_star_rating(1)
          setRequired(false)
        })
        .catch(message => {
              console.log(message)
              setIsLoading(false)
              setRequired(false)
          })
      }
    else{
      setRequired(true)
    }
  }


  

  
    

  

  

  // select thumb img to render specific image
  const colorRef = React.createRef();
  const sizeRef = React.createRef();
  const [selectedColor, setSelectedColor] = useState(0)
  const [selectedSize, setSelectedSize] =  useState(0)
  const [picsDetailsIndex, setPicsDetailsActive] = useState(0)
  const [quantity, setQuantity] = useState(1)

  const selectColor = index => {
    setSelectedColor(index)
    setIsColorActive(true)
    setisPicsDetailsActive(false)

    
  };
 
  const selectPicsDetails = (index)=>{
    setPicsDetailsActive(index)
    setIsColorActive(false)
    setisPicsDetailsActive(true)
       
  }


  const mouseLeavePicsDetails = (e) =>{
    e.preventDefault()
    setIsColorActive(true)
    setisPicsDetailsActive(false)
       
   }

  const selectSize = index =>{
    setSelectedSize(index)

  }
  const addQuantity = ()=>{
    if(quantity < product.quantity  && quantity < 5 ){
      setQuantity(quantity+1)
    }else{
      setMaxOrderWorning(true)
    }
    setTimeout(() => {
      setMaxOrderWorning(false)
    }, 5000);
  }
  
  const subtractQuantity = ()=>{
    
    if(quantity>1) {
      setQuantity(quantity-1)
    }
  }



    const stars = Array(5).fill(0);
    const fiveStars = product?.ratings.length > 0 ? product?.ratings.filter(item => item.stars === 5).reduce((total, value) => {
      return total += value.stars
    }, 0) : ""
    const twoStars = product?.ratings.length > 0 ? product?.ratings.filter(item => item.stars === 2).reduce((total, value) => {
      return total += value.stars
    }, 0) : ""
    const fourStars = product?.ratings.length > 0 ? product?.ratings.filter(item => item.stars === 4).reduce((total, value) => {
      return total += value.stars
    }, 0) : ""
    const threeStars = product?.ratings.length > 0 ? product?.ratings.filter(item => item.stars === 3).reduce((total, value) => {
      return total += value.stars
    }, 0) : ""
    const oneStar = product?.ratings.length > 0 ? product?.ratings.filter(item => item.stars === 1).reduce((total, value) => {
      return total += value.stars
    }, 0) : ""
    let sum_stars = product?.ratings.length > 0 ? product?.ratings.reduce((total, value) => {
      return total += value.stars
    }, 0) : ""
   
    return (
     <Product_details_Wrapp>
        {isLoaded === false && product !== null  ? (
          
          <>
          <Container>
                
          <LeftSide>

            <div className="product-details-img">
              
                {isColorActive && (
                  <img
                    src={product.colors[selectedColor]}
                    alt={product.title.slice(0, 20)}
                  />
                )}

                {isPicsDetailsActive && product.pics_info.length>0 && (
                  <img
                  src={product.pics_info[picsDetailsIndex]}
                  title={product.title}
                />


                )}
                  </div>
                 
                  <div className="thumb"  >
                  {product.pics_info?.map((img, index) => (
                      <img src={img}
                        className={index === picsDetailsIndex ? "active" : "notActive"}
                       alt="product thumb" 
                       key={index} 
                       onClick={() => selectPicsDetails(index)}
                       
                     />
                  ))}
                  </div>

                  
                </LeftSide>

                <CenterSide>
                  <div className="product-title">
                    <p>{product.title}</p>
                  </div>
                  <Reveiwes_container>
                    {stars.map((_, index) => {
                      return (
                        <span key={index} className="ratings">
                          <StarIcon
                            className={
                              index < (sum_stars /
                                product.ratings.length).toFixed(0)
                                ?
                                "on"
                                :
                                "off"} />
                        </span>
                      )
                    })}
                    <span
                      className='rating-number'>
                      {product?.ratings?.length > 0 ?
                        (sum_stars / product.ratings.length).toFixed(1) : ""}
                    </span>
                    <span
                      className="reviews-number">
                      {product?.ratings?.length > 0
                        ? product?.ratings?.length : 0} Reviews
                    </span>
                    <span className="orders-number">  100 orders </span>
                  </Reveiwes_container>

                  <div className='price-info-container'>
                    <div>

                    <span
                      className="price">
                      ${product.price}
                    </span>
                    <span
                      className="discount">
                      ${product.discount}
                    </span>
                    <span
                      className="discount-percent">
                      -30%
                    </span>
                    </div>
                  </div>

              
                  <Product_info>
                  {product.colors?.length >0  &&(
                    <>
                    <h5>Color : </h5>
                    <div className='product-colors '>
                    {product.colors.map((img, index) => (
                      <div key={index}>
                      <img src={img}
                       
                        className={index === selectedColor? "active" : "notActive"}
                        alt=""
                       
                        onClick={() => selectColor(index)}
                      />
                      </div>
          
                    ))}
                     </div>
                     </>
                   )}
                   {product.sizes?.length >0  &&(
                    <>
                   
                    <h5> Size :</h5>
                    <div className='product-sizes'>

                      {product.sizes.map((size, index) => (
                      <button 
                        key={index} 
                        ref = {sizeRef}
                        className={index === selectedSize ? "active": "notActive"}
                        onClick={() => selectSize(index)}
                        
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                    </>
                    )}

                    <h4>Quantity :</h4>
                    <div className='product-quantity'>
                      <button onClick={subtractQuantity}>
                        <RemoveIcon className='minus-icon'/>
                      </button>
                      { maxOrderWorning &&(
                          <span className="max-order-worning">You can't order more than 5 items</span>
                      ) }
                      
                      <span>{quantity}</span>
                      <button onClick={addQuantity}>
                        <AddIcon className='add-icon'/>
                      </button>
                   
                      
                      <span className='available-qauantity'>{product.quantity - quantity} Pieces 
                      available</span>
                    </div>
                  </Product_info>
                <ToastContainer
                  position="top-right"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                />
             
               
                  <Buttons_container>
                    <button
                      className="buy-button"
                      type="button" onClick={() => {
                        

                          dispatch(buyNowItem(
                            {...product,
                               selectedColor:selectedColor, 
                               selectedSize:selectedSize,
                               selectedQuantity : quantity,
                               index : index
  
                            
                            }
                            
                            ))
                          
                          navigate("/checkout")
                      
                      }}>
                      Buy Now
                    </button>

                    <button
                      className="add-to-cart-button"
                      type="button" onClick={() => {
                        dispatch(addToCart(
                          {...product,
                            selectedColor:selectedColor, 
                            selectedSize:selectedSize,
                            selectedQuantity : quantity,
                
                           
                          }
                          
                          ))
                        
                       
                      }}>
                      Add to Cart
                    </button>
                  </Buttons_container>
                  <Buyer_protection_wrap>
                    <img src="../images/safe-and-secure-checkout.png" alt="image"/>
                  </Buyer_protection_wrap>

                </CenterSide>
                <RightSide>
                  <Recommended products = {products} product = {product} />
               
                </RightSide>
                 
            </Container>


            <Wrapper>
              <div className="most-selling">
                <MostSelling products={products} product={product} />
              </div>
              <div className='description-container'>
                <div className='headers'>
                  <button
                    className={selected.isDescription ? "selected" : ""}
                    onClick={() =>
                      setSelected({isDescription: true, isReviews: false })}
                  >
                    Description
                  </button>
                  <span className="separateBorder"></span>
                  <button
                    className={selected.isReviews ? "selected" : ""}
                    onClick={() =>
                      setSelected({isDescription: false, isReviews: true })}
                  >
                    Reviews
                  </button>
                </div>
                
                {selected.isDescription && (
                  <DescriptionProduct product= {product}/>
                  
                  )}
                {selected.isReviews &&(
                  <>
                    <div className="reviews-container">
                      <div>
                    <CustomerReviews 
                        fiveStars={fiveStars}
                        twoStars={twoStars}
                        fourStars={fourStars}
                        threeStars={threeStars}
                        oneStar={oneStar}
                        product={product}
                        sum_stars ={sum_stars}
                        newRatings ={newRatings}
                    />
                    
                   
                  <Feedback
                    product_id={product.id}
                    user_id={user?.id}
                    handelRatingSubmit = {handelRatingSubmit}
                    isLoading = {isLoading}
                    set_star_rating = {set_star_rating}
                    setComment = {setComment}
                    comment = {comment}
                    star_rating = {star_rating}
                    required = {required}
                  />
                  </div>
                  <SuperDeals/>
                </div>
                </>

                )}
                </div>
            </Wrapper>
          </>
        ):
        <div className='loader'>
           <CircularProgress
             size={25}
             thickness={4}
           />
          </div>
        }
      </Product_details_Wrapp>
    )
}

 
export default ProductDetailsLayout

const Product_details_Wrapp = styled.div`
    position:relative;
    margin: 15px auto;
    min-height:100vh;
    width:100%;
    min-width:320px;
    
    .active{
      border:2px solid rgb(255, 126, 126);
      border-radius:4px;
    }
    .notActive{
      border: 1px solid lightgray;
      border-radius:4px;

    } 
   
    
    .loader{
       width:100%;
       display:flex;
       margin-top:100px;
       justify-content:center;
    }

    .reviews-container{
         display:flex;
         
    }


    
`
const Container = styled.div`
    display:grid;
    background:#ffff;
    width:97%;
    margin:auto;
    padding:15px 20px;
    .thumb img{
      width:50px;
      height:50px;
      cursor: pointer;
      margin:8px;
      border:1px solid orange;
      padding:2px;
      
    }
    .thumb img:hover{
      border:2px solid rgb(255, 126, 126);

    }

    

  

 

      
`

const RightSide = styled.div`
    display:flex;
    flex-direction:column;
    grid-column: 3 / span 1;
    grid-row:1;

`
const LeftSide = styled.div`
    margin-right:20px;
    grid-column: 1 ;

    .product-details-img>img{
      
      max-width:400px;
      min-width:320px;
      height:490px;
      box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;

    }

    .active{
      border:2px solid rgb(255, 126, 126);
      border-radius:4px;
    }
    .notActive{
      border: 1px solid lightgray;
      border-radius:4px;

    }

    @media only screen and (max-width: 480px) {
      .max-order-worning{
        left:80px;
        top:-40px;
      
      }
     
      .product-details-img>img{
      
        margin-right:0px;
        min-width:280px;
        width:100%;
        max-width:480px;
        height:auto;
        box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  
      }
      &{
        margin-right:0;
      }
      
  }

    
`

const CenterSide = styled.div`
     max-width:650px;
     padding-left:0 5px;
     margin-right:10px;
     grid-column:2 / span 1;
     grid-row:1;

     @media only screen and (max-width: 820px) {

      &{
        margin-left:10px;
      }
     }

     @media only screen and (max-width: 480px) {

&{
  margin-left:0px;
}
}
  .product-title p{
    font-size:14px;
  }

  .on{
    color: #FFBA5A;
    font-size:20px;
  }
  .off{
    color: #ccc;
    font-size:20px;
  }  

  .price-info-container{
    background:rgb(237, 237, 240, 0.3);
    padding: 5px 0px;
  }
  .price-info-container>div{
    margin-top:9px;
    width: 145px;
    display:flex;
    align-items:center;
    justify-content:space-between;

  }
  .price{
    font-size:25px;
    margin-right:8px;
    font-family:'Trebuchet MS', sans-serif;
  }
  .discount{
    text-decoration:line-through;
    color:rgb(95, 93, 93);
    font-family: sans-serif;

  }
  .discount-percent{
     background:rgb(255, 0, 0, 0.2);
     padding:0 2px;
     font-size:12px;
     
  }

  @media only screen and (max-width: 800px) {
      &{
        grid-row:2;
        grid-column:1;
      }
      

  }
      

`

const Reveiwes_container = styled.div`
       display:flex;
       border-bottom:1px solid  lightgray;
       box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;

      .reviews-number,
      .rating-number,
      .orders-number{
        margin-left:5px;
        font-size:15px;
      }

      .ratings{
        margin-bottom:10px
      }

`
const Buttons_container = styled.div`
      width:35vw;
      display:flex;
      justify-content:space-between;
      
     .add-to-cart-button{
       max-width:200px;
       width:100%;
       min-width:143px;
       background:orange;
       color:white;
       border-radius:5px;
       font-size:15px;
       font-weight:bold;
       padding:6px 10px;
       white-space:nowrap;
     }   

     .buy-button{
      width:100%;
      max-width:200px;
      min-width:143px;
      background:lightgreen;
      color:white;
      padding:15px;
      border-radius:5px;
      font-size:15px;
      font-weight:bold;
      margin-right:10px;
      white-space:nowrap;
      
     }  
     button:hover{
           opacity:0.8;
     }


`
const Buyer_protection_wrap = styled.div`
      width:40vw;
      min-width:295px;
      height:auto;
      margin-top:15px;
      
      img{
        width:100%;
        height:100%;
      }
`
const Product_info = styled.div`
    h5{
      margin:8px 0;
    }
    .available-qauantity{
      color:gray;
      font-size:14px;
    }
    .product-colors{
        display:flex;  
        flex-wrap:wrap;
    }
    .product-colors img{
        width:60px;
        height:60px;
        margin-right:10px;
        cursor:pointer;
    }
    .product-colors img:hover{
      border:2px solid lightgreen;
      border-radius:4px;
    }
    .product-sizes{
        display:flex;
        margin-bottom:20px;
        display:flex;  
        flex-wrap:wrap;
    }

    .product-sizes button{
      cursor:pointer;
      margin-right:10px;
      text-transform: uppercase;
      font-size:20px;
      padding:5px 10px;
      background:none;
     
    }

    .product-quantity{
      margin-bottom:10px;
      display:flex;
      align-items:center;
      position:relative;
    }
    .max-order-worning{
         font-size:11px;
         color:red;
         min-width:200px;

         background:lightblue;
         border-raduis:6px;
         padding:5px 5px;
         position:absolute;
         top:-15px;
         left:200px; 
         animation:max-order-show 1s;
         transform: translate(-50%, -50%);
         box-shadow: 0px 10px 15px -5px rgba(0, 0, 0, 0.2), 0px 20px 25px 5px rgba(255, 255, 255, 0.3);

    }
    
    @keyframes max-order-show {
      from {
        opacity: 0;
        transform: translate(-50%, -50%) scale(0.5);
      }
      to {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
      }
    }
    @media only screen and (max-width: 480px) {
      .max-order-worning{
        left:180px;
        top:-20px;
      
      }
    }
    
    
    
    .product-quantity button{
      display:flex;
      justify-content:center;
      align-items:center;
      background:rgb(227, 227, 227);
      border-radius:50%;
      font-size:20px;
      width:26px;
      height:26px;  
    }
    .product-quantity button:hover{
      background:lightblue;
    }

    .product-quantity span{
      margin:2px 10px;
      font-size:15bpx;
    }

    .product-quantity{
      padding:1px;
    }

    .minus-icon, .add-icon{
       font-size:13px;
    }

`

const Wrapper =  styled.div`
  display:flex;
  margin:30px auto;
  width:97%;

  .headers{

    border-top:1px solid lightgray;
    border-bottom:1px solid lightgray;
    padding-left:3px;
    background:#f2f2f2;
    display:flex;
    flex-wrap:nowrap;
  }
  .selected{
    background:#ffe680;
   
  }
  .separateBorder{
    border-right:2px solid lightgray;
    margin-right:15px;
  }
  .headers button{
    margin-right:15px;
    padding:10px 4px;
    font-size:19px;
    font-family:Helvetica, sans-serif
  }

  
 
  .description-container{
    flex:2;
    
    padding:10px;
    
    background:#ffff;
  

    
  }
  
 
  
`
