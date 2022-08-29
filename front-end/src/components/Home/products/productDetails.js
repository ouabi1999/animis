import React,{useEffect, useState} from 'react'
import Modal from "react-modal"
import Zoom from "react-reveal/Zoom";
import { addToCart } from '../../../features/shopping_cart/cartSlice';
import Spinner from "../../Spinner/Spinner"
import styled from 'styled-components';
import StarIcon from '@mui/icons-material/Star';
import Reviews from './reviews';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useDispatch, useSelector } from 'react-redux';
import { setProductDetails, getProductDetails } from '../../../features/productDetails/productDetails_slice';
import { useParams } from 'react-router-dom';
import {Link} from "react-router-dom"
import CircularProgress from '@mui/material/CircularProgress';

function ProductDetails() {
    const {product, hasError, isLoading} = useSelector(state=> state.productDetails)
    const params = useParams()
    const user = useSelector(state=> state.auth.user)
    const products = useSelector(state=> state.products.products)
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
      items: 12,
      color: 0,
      picsDetailsIndex:0,
      size:0,
      rating: 0,
      IndexRating: 0,
      stars: 1,
    })
    const [isColorActive, setIsColorActive] = useState(true)
    const [isPicsDetailsActive, setisPicsDetailsActive] = useState(false)

    


  useEffect(() => {
    dispatch(getProductDetails(params.id))
   
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
   
  }, [dispatch, params.id])
    
  // show more products
  

  

  // select thumb img to render specific image
  const colorRef = React.createRef();
  const sizeRef = React.createRef();


  const selectColor = index => {
    setFormData({...formData, color: index })
    setIsColorActive(true)
    setisPicsDetailsActive(false)

    
  };
  const selectPicsDetails = (index)=>{
    setFormData({...formData, picsDetailsIndex : index })
    setIsColorActive(false)
    setisPicsDetailsActive(true)
       
  }

 

  const mouseLeavePicsDetails = (e)=>{
   
    e.preventDefault()
    setIsColorActive(true)
    setisPicsDetailsActive(false)
       
   }

  const selectSize = index =>{
    setFormData({...formData, size : index })

  }
 


    const stars = Array(5).fill(0);
   
    
    let sum_stars = product?.ratings.length > 0 ? product?.ratings.reduce((total, value) => {
      return total += value.stars
    }, 0) : ""

    return (
     <Product_details_Wrapp>
        {isLoading === false  && product ? (
          
          
          <>  
                
          <LeftSide>

            <div className="product-details-img">
                {isColorActive && (
                  <img
                    src={product.product_images[formData.color]}
                    title={product.title}
                  />
                )}
                {isPicsDetailsActive &&(
                  <img
                  src={product.product_images[formData.picsDetailsIndex]}
                  title={product.title}
                />


                )}
                  </div>
                 
                  <div className="thumb"  >
                  {product.product_images.map((img, index) => (
                      <img src={img}
                       alt="" 
                       key={index} 
                       onMouseOver={() => selectPicsDetails(index)}
                       onMouseLeave = {mouseLeavePicsDetails}
                     />
                  ))}
                  </div>

                  
                </LeftSide>

                <RightSide>
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

              
                  <Product_type_of_container>

                    <h5>Color:</h5>
                    <div className='product-colors '>
                    {product.product_images.map((img, index) => (
                      <img src={img}
                       
                        className={index === formData.color ? "active" : "notActive"}
                        alt=""
                        key={index}
                        onClick={() => selectColor(index)}
                       
   
                      />
          
                    ))}
                     </div>
                   
                    <h5> Size:</h5>
                    <div className='product-sizes'>

                      {product.sizes.map((size, index) => (
                      <button 
                        key={index} 
                        ref = {sizeRef}
                        className={index === formData.size ? "active": "notActive"}
                        onClick={() => selectSize(index)}
                        
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                    <h4>Quantity:</h4>
                    <div className='product-quantity'>
                      <button>
                        <AddIcon className='add-icon'/>
                      </button>
                      <span>15</span>
                      <button>
                        <RemoveIcon className='minus-icon'/>
                      </button>
                      <span>262 Pieces are available</span>
                    </div>
                  </Product_type_of_container>
                  <Buttons_container>
                    <button
                      className="buy-button"
                      type="button" onClick={() => {
                        dispatch(addToCart(product))
                      
                      }}>
                      Buy Now
                    </button>

                    <button
                      className="add-to-cart-button"
                      type="button" onClick={() => {
                        dispatch(addToCart({...product, color:formData.index}))
                        
                       
                      }}>
                      Add to Cart
                    </button>
                  </Buttons_container>
                  <Buyer_protection_wrap>
                    <img src="../images/safe-and-secure-checkout.png" alt="image"/>
                  </Buyer_protection_wrap>
                  <div className="description">
                    <h1>Description:</h1>
                    <p>{product.description}</p>
                  </div>

                  <Reviews
                    product_id={product.id}
                    user_id={user?.id}
                  />

                </RightSide>
                <RecommendedForYou>
                     <h5>Recommended For You </h5>
                     <div className="recommended-container">
                       {products.filter(item=>{
                         return item.category === product.category
                         
                       }).slice(0, 3).map(product=>{
                        return(
                          <>
                          <Link to={"/product_details/" + product.id }>
                              <img src={product.product_images[0]} alt=""/>
                          </Link>
                            <span className="recommnded-product-price">${product.price}</span>
                          </>
                        )
                       })}
                     
                     </div>
                      
                </RecommendedForYou>

                </>
        ):
        <div className='loader'>
          <CircularProgress  />
          </div>
        }
      </Product_details_Wrapp>
    )
}

 
export default ProductDetails

const Product_details_Wrapp = styled.div`
    display:flex;
    min-height:100vh;
    width:100%;
    margin-left:15px;
    margin-top:15px;
    padding:15px 20px;
    background:#fff;
    .loader{
      width:100%;
       display:flex;
       margin-top:100px;
       justify-content:center;
    }
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

    .product-details-img>img{
      width:400px;
      height:490px;
    }

    .active{
      border:2px solid rgb(255, 126, 126);
      border-radius:4px;
    }
    .notActive{
      border: 1px solid lightgray;
      border-radius:4px;

    }

    .close-button-conatiner{
      position:relative;
      right:-98%;
      top:-20px;
    }

    .close-button-conatiner>button{
      border:none;
      color:rgb(129, 126, 126);
      background: bottom;
      font-size: xx-large;
      font-weight:bolder; 
      text-shadow: 2px 4px 5px black;
      top:-20px;
      position:sticky;
    }

    
`
const LeftSide = styled.div`
    margin-right:10px;

    

`
const RightSide = styled.div`
     flex:1;
     margin-left:20px;

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
    padding: 5px 10px;
  }
  .price-info-container>div{
    margin-top:9px;
    width: 145px;
    display:flex;
    align-items:center;
    justify-content:space-between;

  }
  .price{
    font-size:30px;
  }
  .discount{
    text-decoration:line-through;
    color:rgb(95, 93, 93);

  }
  .discount-percent{
     background:rgb(255, 0, 0, 0.3);
     padding:0 2px;
     font-size:12px;
     
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
      width:30vw;
      display:flex;
      flex-wrap:wrap;
      justify-content:space-between;
      
     .add-to-cart-button{
       width:200px;
       background:orange;
       color:white;
       padding:15px;
       border-radius:8px;
       font-size:15px;
      font-weight:bold;
     }   

     .buy-button{
      width:200px;
      background:lightgreen;
      color:white;
      padding:15px;
      border-radius:8px;
      font-size:15px;
      font-weight:bold;
      
     }  


`
const Buyer_protection_wrap = styled.div`
      width:40vw;
      height:100px;
      margin-top:15px;
      
      img{
        width:100%;
        height:100%;
      }
`
const Product_type_of_container = styled.div`
    h5{
      margin:8px 0;
    }
    .product-colors{
        display:flex;  
    }
    .product-colors img{
        width:60px;
        height:60px;
        margin-right:10px;
        cursor:pointer;
    }
    .product-colors img:hover{
      border:2px solid rgb(255, 126, 126);
      border-radius:4px;
    }
    .product-sizes{
        display:flex;
        margin-bottom:20px;
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
    }

    .product-quantity button{
      display:flex;
      justify-content:center;
      align-items:center;
      background:rgb(227, 227, 227);
      border-radius:50%;
      font-size:20px;
      width:32px;
      height:32px;  
    }

    .product-quantity span{
      margin:2px 10px;
    }

    .product-quantity{
      padding:1px;
    }

    .minus-icon, .add-icon{
       font-size:14px;
    }

`
const RecommendedForYou = styled.div`
      
      flex:0.5;
      height:fit-content;
      display:flex;
      flex-direction:column;
      align-items:center;
      
      .recommnded-product-price{
        position:relative;
        
        top:-154px;
        left:46px;
        background:#fff;
        padding:2px 10px;

      }
      .recommended-container{
        position:relative;
        display:flex;
        flex-direction:column;
        align-items:center;
        
        

      }
      .recommended-container img{
        position:relative;
        width:140px;
        margin-bottom:0px;
        height:145px;
        box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
      }

`
      

/*


.addToCart-details{
  display: inline;
  margin:0px 10px
}
.addToCart-details>button{
  color:rgb(243, 241, 241);
  background-color: darkgoldenrod;
  border-radius: 8px;
  position:absolute;
  right:-100px;
  bottom:-20px;
  padding:5px;
  box-shadow: 2px 4px 15px black;
  border:none;
  outline-style: none; 
}
.description{
  color:rgb(20, 67, 236); 
  width:600px;
  grid-column: 2;
}
.d-container{
  grid-column: 2 / span 4;
  grid-row: 1;
}

.description-discount{
  color:black;
  text-decoration:line-through 2px;
  font-weight: bold;
  font-size: x-large;

}
.description-title, .product-type{
  font-size: larger;
  font-weight: 900;
}
.description-price{
  font-size: larger;
  font-weight: 900;
  margin:10px
}

}*/