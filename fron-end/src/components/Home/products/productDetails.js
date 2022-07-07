import React from 'react'
import Fade from "react-reveal/Fade";
import Modal from "react-modal"
import Zoom from "react-reveal/Zoom";
import { addToCart } from '../../../features/shopping_cart/cartSlice';
import { connect } from "react-redux"
import Spinner from "../../Spinner/Spinner"
import styled from 'styled-components';
import StarIcon from '@mui/icons-material/Star';
import Reviews from './reviews';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

class ProductDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      product: null,
      items: 12,
      index: 0,
      rating: 0,
      IndexRating: 0,
      stars: 1,
    }
  }


  // show more products
  viewMore = () => {
    this.setState({
      items: this.state.items + 10
    })
  }
  //
  //show product details
  openModal = (product) => {
    this.setState({ product });
  }
  ///close product details
  closeModal = () => {
    this.setState({
      product: null
    })

  }

  // select thumb img to render specific image
  myRef = React.createRef();
  handleTab = index => {
    this.setState({ index: index })
    const images = this.myRef.current.children;
    for (let i = 0; i < images.length; i++) {
      images[i].className = images[i].className.replace("active", "");
    }
    images[index].className = "active";
  };
  handFirstProduct = () => {
    const { index } = this.state;
    this.myRef.current.children[index].className = "active";
  }
  style = {
    content: {
      position: 'absolute',
      top: '11%',
      left: '2%',
      right: '2%',
      bottom: '2%',
      border: '1px solid #ccc',
      background: '#fff',
      borderRadius: '4px',
      outline: 'none',
      overflowY: "scroll",
      scrollbarColor: "rebeccapurple green",
      scrollbarWidth: "thin"

    },
  }

  render() {
    const stars = Array(5).fill(0);
    const slice = this.props.products.products.slice(0, this.state.items);
    const { product, closeModal } = this.props;

    let sum_stars = product?.ratings.length > 0 ? product?.ratings.reduce((total, value) => {
      return total += value.stars
    }, 0) : ""

    return (
      <>
        {product && (
          <Modal 
              isOpen={true} 
              style={this.style} 
              ariaHideApp={false}
          >
            <Zoom>
              <Product_details_Wrapp>
                <div className="close-button-conatiner">
                  <button onClick={closeModal}>
                    <DisabledByDefaultIcon className="close-button"/>
                  </button>
                </div>
                <LeftSide>

                  <div className="product-details-img">
                    <img
                      src={product.product_images[this.state.index]}
                      title={product.title}
                    />
                  </div>
                  <div className="thumb" ref={this.myRef} onLoad={this.handFirstProduct}>
                    {product.product_images.map((img, index) => (
                      <img src={img}
                       alt="" 
                       key={index} 
                       onClick={() => this.handleTab(index)}
                     />
                    ))}
                  </div>
                </LeftSide>

                <RightSide>
                  <div className="description-title">
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

                  <div>
                    <span
                      className="description-discount">
                      $ {product.discount}
                    </span>
                    <span
                      className="description-price">
                      $ {product.price}
                    </span>
                    <span
                      className="description-price">
                      30 %
                    </span>
                  </div>

              
                  <Product_type_of_container>

                    <h4>Colors:</h4>
                    <div className='product-colors'>
                    {product.product_images.map((img, index) => (
                      <img src={img}
                        alt=""
                        key={index}
                        onClick={() => this.handleTab(index)}
                      />
          
                    ))}
                     </div>
                   
                    <h4> Sizes:</h4>
                    <div className='product-sizes'>

                      {product.sizes.map((size, index) => (
                        <span key={index}>
                          {size}
                        </span>
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
                        this.props.dispatch(addToCart(product))
                        closeModal();
                      }}>
                      Buy Now
                    </button>

                    <button
                      className="add-to-cart-button"
                      type="button" onClick={() => {
                        this.props.dispatch(addToCart(product))
                        closeModal();
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
                    user_id={this.props.auth?.user?.id}
                  />

                </RightSide>
              </Product_details_Wrapp>
            </Zoom>
          </Modal>
        )
        }
      </>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    cartItems: state.cartItems,
    products : state.products,
    auth : state.auth
  };
};
export default connect(mapStateToProps)(ProductDetails)

const Product_details_Wrapp = styled.div`
    display:flex;
  
    .thumb img{
      width:50px;
      height:50px;
      cursor: pointer;
      margin:8px;
    }

    .product-details-img>img{
      width:400px;
      height:500px;
    }

    .thumb img.active{
      border:2px solid rgb(255, 126, 126);
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

    .close-button{
        font-size:25px;
        border-radius:100%;
    }
`
const LeftSide = styled.div`
    margin-right:10px;

    

`
const RightSide = styled.div`
  margin-left:20px;
  .on{
    color: #FFBA5A;
    font-size:20px;
  }
.off{
    color: #ccc;
    font-size:20px;
  }  
 
      

`
const Reveiwes_container = styled.div`
       display:flex;

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
    .product-colors{
        display:flex;  
    }
    .product-colors img{
        width:60px;
        height:60px;
        border: 1px solid lightgreen;
        border-radius:8px;
        margin-left:10px;
    }
    .product-sizes{
        dsiplay:flex;
        margin-bottom:20px;
    }

    .product-sizes span{
      width:100px;
      height:80px;
      margin-left:10px;
      text-transform: uppercase;
      font-size:20px;
      padding:5px 10px;
      border:1px solid lightblue;
    }

    .product-quantity{
      margin-bottom:10px;
      display:flex;
    }

    .product-quantity button{
      display:flex;
      justify-content:center;
      align-items:center;
      background:#fff70;
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