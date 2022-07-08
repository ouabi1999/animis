import React, { Component } from 'react'
import styled from 'styled-components'
import Modal from "react-modal"
import Zoom from "react-reveal/Zoom";
import EditProduct from './Edit_Product';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import Spinner from '../../Spinner/Spinner';


export default class AdminProducts extends Component {
  constructor(props) {
    super(props)
    this.state = {
     
      index:0,
      
    }
  }


  myRef = React.createRef();
  handleTab = index => {
    this.setState({ index: index })
    const images = this.myRef.current.children;
    for (let i = 0; i < images.length; i++) {
      images[i].classnNameName = images[i].classnNameName.replace("active", "");
    }
    images[index].classnNameName = "active";
  };
  handFirstProduct = () => {
    const { index } = this.state;
    this.myRef.current.children[index].classnNameName = "active";
  }
 
  render() {
    const { products, openModal, AdminProducts, deleteProduct, open_Edit_Modal } = this.props;

    return (
      <>
      { AdminProducts ? (
        <Product_Container>
          <button onClick={this.props.OpenAddNewProduct}>AddNew_Product</button>
          <TableWrap>
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>InStock</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Delete</th>
                  <th>Edite</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => {
                  return (
                    <tr key={product.id} >
                      <td>
                        <a href={"#" + product.id} onClick={() => openModal(product)}>
                          <img width="80" height="80" src={product.product_images[0]} alt="productImage" />
                        </a>
                      </td>
                      <td>{product.colors}</td>
                      <td>{product.price}</td>
                      <td>{product.quantity}</td>
                      <td>
                        <button onClick={() => deleteProduct(product.id)}>Delete</button>
                      </td>
                      <td>
                        <button onClick={() => open_Edit_Modal(product)}>Edite</button>
                      </td>
                    </tr>
                  )
                }
                )
              }
              </tbody>
            </table>
          </TableWrap>
        </Product_Container>
      )
      : AdminProducts === false ? (
          <Spinner/> 
      )
      : null 
      }
      </>
    )
  }
}

const Product_Container = styled.div`
  box-shadow: 0px 10px 15px -3px rgba(0,0,0,0.1);
  padding:10px 50px;
  background:rgb(250,250,250,0.8);
  border-radius:6px;
  width:calc(100vw - 300px);
  height:100%;
      
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
