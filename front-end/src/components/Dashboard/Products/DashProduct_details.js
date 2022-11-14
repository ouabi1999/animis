import React, { Component } from 'react'
import styled from 'styled-components'
import Modal from "react-modal"
import Zoom from "react-reveal/Zoom";
import EditProduct from './Edit_Product';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

export default class DashProductdetails extends Component {
  constructor(props) {
    super(props)

    this.state = {
     
      index:0,
      
    }
  }

  // show product details
  openModal = (product) => {
    this.setState({ product });
  }
  /// close product details
  closeModal = () => {
    this.setState({
      product: null,
      index: 0,
    })

  }
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

  render() {
    const { product, closeModal} = this.props;
    
    return (
      <Product_Container>
        {product && (
          <Modal isOpen={true} ariaHideApp={false} >
            <Zoom>
              <div className="product-details">
                <div className="close-button">
                  <button onClick={closeModal}>X</button>
                </div>
                <a href={"#" + product.id}>
                  <img width="80" height="80" src={product.product_images[this.state.index]} alt="productImage" />
                </a> 
                <div className="thumb" ref={this.myRef} onLoad={this.handFirstProduct}>

                  {product.product_images.map((img, index) => {
                    return(
                    <img src={`data:image/jpeg;base64,${img}`} title="" key={index} onClick={() => this.handleTab(index)} />
                     )
                  })}
                </div>
                <div className="d-container">
                  <div className="description-title">
                    <p>{product.title}</p>
                  </div>
                  <span className="description-discount">${product.discount}</span>
                  <span className="description-price">${product.price}</span>
                  <div>
                    <p className="product-type">revewies:</p>
                  </div>
                  <div>
                    <p className="product-type">Type:</p>
                    <p>{product.colors[0]}</p>
                  </div>
                 
                </div>
                <div className="description">
                  <h1>Description:</h1>
                  <p>{product.description}</p>
                </div>
              </div>
            </Zoom>
          </Modal>
        )}
      </Product_Container>
    )
  }
}

const Product_Container = styled.div`
  box-shadow: 0px 10px 15px -3px rgba(0,0,0,0.1);
  padding:10px 50px;
  background:rgb(250,250,250,0.8);
  border-radius:6px;
  width:100%;  
      
`

const TableWrap = styled.div`

 `
 const AddNewProduct = styled.div`
 input{
     width:30vw;
     min-width:280px;
     max-width:380px;
 
 }
 .productImg-container{
     display:flex;
 }
 .imgprview{
     margin-right:25px
     width:150px;
     height:150px;
     object-fit:cover;
     display:flex;
 }
    .size-container, .colors-container{
     display: flex;
     align-items:center;
     padding:5px;
     flex-wrap: wrap;
     min-height: 48px;
     border: 1px solid rgb(214, 216, 218);
     border-radius: 6px;
     background:white;
     width:30vw;
     min-width:280px;
     max-width:380px;

      .size_wrapper, .color_wrapper{
         display:flex;
         align-items:center;
         


          .size_name, .color_name{
             padding:0px 5px;
             background:blue;
             color:white;
             border-radius:6px;
             margin-right:1px;
             margin-bottom:2px;

          }
          .remove_size, .remove_color{
             cursor:pointer;
             margin-right:4px;
             background:lightgrey;
             border-radius:50%;
             padding:0 5px;
             font-size:10px;
             color:red;
          }
      }
     input{
         border: 0;
         outline: none;
         padding: 0;
         min-width: 80px;
         flex:1;
         margin-bottom:0px;
         height:auto;
     }
   }
  textarea{
      height:50vh;
      width:60vw;
  }
  .submitButton{
      display:flex;
      padding:10px 20px;
      background:green;
      border-radius:8px;
      color:white;
      font-weight:bold
      width:80px;
      margin:auto;
  }
  .description-container{
     width:60vw;

  }
`
