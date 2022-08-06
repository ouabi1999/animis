import React, { Component, createRef } from 'react'
import styled from 'styled-components';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import AdminProducts from './Admin_Products';
import EditProduct from './Edit_Product';
import DashProductdetails from './DashProduct_details';
import AddNewProduct from './addNewProduct/Add_New_Product';

export default class ProductsLayout extends Component {
    constructor(props){
        super(props);
        this.state = {

            is_addNewProduct_open :false,
            products:[],
            AdminProducts:false,
            product_images:[],
            product_pics:"",
            sizes: [],
            colors: [],
            price:"",
            discount:"",
            quantity:"",
            title: "",
            description: "",
            reviews: "",
            availability:"",
            category:"",
            tags:[],
            product: null,
            Editproduct:false,
            dashProduct_details:null,
            isUpdated: null,
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
              AdminProducts: true,
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
    this.setState({ product });
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
    Editproduct,
    
     
   })
  }
  close_Edit_Modal = () =>{
    this.setState({
      Editproduct:false,
      
    })
   }

    render() {
        return (
            <div>
                <AdminProducts
                   products = {this.state.products}
                   openModal = {this.openModal}
                   deleteProduct = {this.deleteProduct}
                   open_Edit_Modal = {this.open_Edit_Modal}
                   OpenAddNewProduct = {this.OpenAddNewProduct}
                   AdminProducts = {this.state.AdminProducts}
                   
                />
                <AddNewProduct
                    CloseAddNewProduct = {this.CloseAddNewProduct}
                    products = {this.state.products}
                    responseData = {this.responseData}
                    is_addNewProduct_open = {this.state.is_addNewProduct_open}
                      
                />
                
                {this.state.product && (
                    <DashProductdetails
                        product = {this.state.product}
                        closeModal = {this.closeModal}
                    />
                )}

                <EditProduct
                    close_Edit_Modal = {this.close_Edit_Modal}
                    Editproduct = {this.state.Editproduct}
                    Update_Product_submit = {this.Update_Product_submit}
                    updatedProduct ={ this.updatedProduct}
                />
            </div>
        )
    }
}

