import React, { Component, createRef } from 'react'
import styled from 'styled-components';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import AdminProducts from './Admin_Products';
import AddNewProduct from './addNewProduct/Add_New_Product';
import EditProductLyout from './editProduct/EditProductLyout';

export default class ProductsLayout extends Component {
    constructor(props){
        super(props);
        this.state = {

            is_addNewProduct_open :false,
            products:[],
            AdminProducts:true,
            slectedProduct: null,
            selectedEditProduct:false,
            dashProduct_details:null,
            isUpdated: null,
            loaded : false
        }
        this.imgInput = createRef()
    }
    responseData =(data)=>{
        this.setState({
        
            products: data

        })
    }
    
    componentDidMount() {
        fetch("/productsinfo")
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
          })
          .then((data) =>
            this.setState({
              
              products: data,
              loaded : true
            })
          )
  
          .then((err) => console.log(err));
      }

    updatedProduct = (editedProduct) =>{
        const newProducts = this.state.products.map(product=>{
            if(editedProduct.id === product.id){
               return editedProduct
            }else{
                return product
            }
        })
        this.setState({
            products:newProducts,
            isUpdated:true,
        })

    }

    

    OpenAddNewProduct =()=>{
        this.setState({
            is_addNewProduct_open:true,
            AdminProducts : null ,

        })
        console.log(this.state.addNewProduct)
    }
    
    CloseAddNewProduct =()=>{
        this.setState({
            is_addNewProduct_open:false,
            AdminProducts : true,
        })
    }
    
    deleteProduct =  (id)=>{
        this.setState({
           products:this.state.products.filter((x) => x.id !== id)
        })
        fetch(`/delete/${id}`,{
            method:"DELETE",
            
         }).then(response=> response.json())
         .catch(err => console.log(err))
        
    }
      // show product details
  openModal = (product) => {
    this.setState({ slectedProduct: product });
  }
  /// close product details
  closeModal = () => {
    this.setState({
      product: null,
      index: 0,
    })

  }

  open_Edit_Modal = (Editproduct)=>{
    this.setState({
    selectedEditProduct:Editproduct,
    AdminProducts:false,

     
   })
  }
  close_Edit_Modal = () =>{
    this.setState({
      selectedEditProduct:false,
      AdminProducts:true,
      
    })
   }

    render() {
        return (
            <div>
                {this.state.AdminProducts === true && (

                    <AdminProducts
                        products={this.state.products}
                        loaded={this.state.loaded}
                        openModal={this.openModal}
                        deleteProduct={this.deleteProduct}
                        open_Edit_Modal={this.open_Edit_Modal}
                        OpenAddNewProduct={this.OpenAddNewProduct}
                        AdminProducts={this.state.AdminProducts}

                    />
                )}
                {this.state.is_addNewProduct_open && (
                <AddNewProduct
                    CloseAddNewProduct = {this.CloseAddNewProduct}
                    products = {this.state.products}
                    responseData = {this.responseData}
                    is_addNewProduct_open = {this.state.is_addNewProduct_open}
                      
                />
                )}
                
               

                {this.state.selectedEditProduct &&(

                <EditProductLyout 
                    close_Edit_Modal = {this.close_Edit_Modal}
                    selectedEditProduct = {this.state.selectedEditProduct}
                    Update_Product_submit = {this.Update_Product_submit}
                    updatedProduct ={ this.updatedProduct}
                />
                )}
            </div>
        )
    }
}

