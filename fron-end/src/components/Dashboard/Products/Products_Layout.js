import React, { Component, createRef } from 'react'
import styled from 'styled-components';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import AdminProducts from './Admin_Products';
import EditProduct from './Edit_Product';
import DashProductdetails from './DashProduct_details';
import AddNewProduct from './Add_New_Product';

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

     /// send products info to the backend
     AddNew_Product_submit = (event)=>{
        event.preventDefault()
        const data = new FormData();
        for (let i = 0; i < this.state.product_images.length; i++) {
            data.append("images", this.state.product_images[i]);
        }

        this.state.sizes.forEach(size => {
            data.append("sizes", size)
        });
        this.state.colors.forEach(color => {
            data.append("colors", color)
        });
        this.state.tags.forEach(tag => {
            data.append("tags", tag)
        });
        data.append("title", this.state.title)
        data.append("quantity", this.state.quantity)
        data.append("price", this.state.price)
        data.append("discount", this.state.discount)
        data.append("description",this.state.description)
        data.append("reviews", this.state.reviews)
        data.append("category",this.state.category)
         fetch("/products",{
          method:"POST",
          body: data,
       }).then(response => response.json())
        .then( data => this.setState({products : data}))
       .catch(err => console.log(err))
     }

    // fetch product info grom the backend or server
    componentDidMount(){   
        fetch('/productsinfo').then(response=>{
            if( response.ok){
              return  response.json()
            }
           
          }).then(data => this.setState({
              products:data,
              AdminProducts:true,
              
            }))
          
          .then(err=> console.log(err))
        
    }
    
    /// add colors
addColor = (e) => {
    if (e.key === "Enter") {
      if (e.target.value.length > 0) {
        this.setState({
            colors:[...this.state.colors, e.target.value]
        });
        e.target.value = "";
      }
      console.log(this.state.colors)
    }
}
//remove colors
removeColors = (color) => {
    const colors = this.state.colors.slice();
    this.setState({
        colors: colors.filter((x) => x !== color),
    })
}
/// add tags
addTag = (e) => {
    if (e.key === "Enter") {
      if (e.target.value.length > 0) {
        this.setState({
            tags:[...this.state.tags, e.target.value]
        });
        e.target.value = "";
      }
    }
}
removeImage = (index) => {
    const product_images = this.state.product_images.slice();
    this.setState({
        product_images: product_images.filter((x) => x !== index),
    })
}
/// remove tags 
removeTag = (tag) => {
    const tags = this.state.tags.slice();
    this.setState({
        tags: tags.filter((x) => x !== tag),
    })
}
///remove size
removeSize = (size) =>{
    const sizes = this.state.sizes.slice();
    this.setState({
        sizes: sizes.filter((x) => x !== size)
    })
}
///add size
addSize = (e) =>{
    if (e.key === "Enter") {
        if (e.target.value.length > 0) {
          this.setState({
              sizes:[...this.state.sizes, e.target.value]
          });
          e.target.value = "";
    }   }
}
// handle change input
handelChange = (event) =>{
    this.setState({
      [event.target.name]:event.target.value,
      
    })
    console.log(event.target.value)
   
  }

// handle image input 
handleImageInput = (e) =>{
    e.preventDefault()
    if(e.target.id === e.target.name){
        return false
    }else{
        this.imgInput.current.click()
    }
}

    /// handel image change
    handleImageChange = (e) => {
        e.preventDefault()
    if (e.target.files){
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                this.setState({
                    product_images: [...this.state.product_images, reader.result]
                })
            }
        }
        reader.readAsDataURL(e.target.files[0])
 
    }
};

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
                    is_addNewProduct_open = {this.state.is_addNewProduct_open}
                    addColor = {this.addColor}
                    removeColors = {this.removeColors}
                    addTag = {this.addTag}
                    removeTag = {this.removeTag}
                    removeImage = {this.removeImage}
                    removeSize = {this.removeSize}
                    addSize = {this.addSize}
                    handleImageChange = {this.handleImageChange}
                    imgInput = {this.imgInput}
                    handleImageInput = {this.handleImageInput}
                    state = {this.state}
                    AddNew_Product_submit = {this.AddNew_Product_submit}
                    handelChange = {this.handelChange}
                      
                />
                
                {this.state.product && (
                    <DashProductdetails
                        product = {this.state.product}
                        closeModal = {this.closeModal}
                    />
                )}

                <EditProduct
                    addColor = {this.addColor}
                    removeColors = {this.removeColors}
                    addTag = {this.addTag}
                    removeTag = {this.removeTag}
                    removeSize = {this.removeSize}
                    addSize = {this.addSize}
                    handleImageChange = {this.handleImageChange}
                    imgInput = {this.imgInput}
                    handleImageInput = {this.handleImageInput}
                    handelChange = {this.handelChange}
                    close_Edit_Modal = {this.close_Edit_Modal}
                    Editproduct = {this.state.Editproduct}
                    Update_Product_submit = {this.Update_Product_submit}
                    updatedProduct ={ this.updatedProduct}
                />
            </div>
        )
    }
}

