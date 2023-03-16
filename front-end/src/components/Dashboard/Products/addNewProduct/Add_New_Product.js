import React, { Component, useState, createRef, useEffect } from 'react'
import styled from 'styled-components';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Button, InputLabel, MenuItem, OutlinedInput, TextField } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { ToastContainer, toast } from 'react-toastify';
import CircularProgress from '@mui/material/CircularProgress';
import Tags from './Tags';
import Inventory from './Inventory';
import Pricing from './Pricing';
import Description from './Description';
import Shipping from './Shipping';
import Organization from './Organization';
import Variant from './Variant';
import ProductTitle from './ProductTitle';
import Media from './Media';
import PicsInfo from './PicsInfo';





function AddNewProduct(props) {


  const [formData, setFormData] = useState({
    product_images: [],
    sizes: [],
    colors: [],
    price: "",
    discount: "",
    quantity: "",
    title: "",
    description: "",
    reviews: "",
    availability: "",
    product_type: "",
    pics_info: [],
    seo: "",
    category: "",
    tags: [],
    products: [],
    Description_images: {},
    shippingData: [],
    series: "",
    globalCoupon:"",
    coupon:""
  });
  const [loading, setLoading] = useState(false)


  const {
    CloseAddNewProduct,
    is_addNewProduct_open,
  } = props;



  /// send products info to the backend
  const AddNew_Product_submit = (event) => {
    event.preventDefault();
   
    const data = new FormData();
  

    formData.sizes.forEach((size) => {
      data.append("sizes", size);
    });
    formData.colors.forEach((color) => {
      data.append("colors", color);
    });

    formData.tags.forEach((tag) => {
      data.append("tags", tag);
    });
    formData.pics_info.forEach((pics) => {
      data.append("pics_info", pics);
    });

   

    data.append("coupon", formData.coupon);
    data.append("globalCoupon", formData.globalCoupon);
    data.append("title", formData.title);
    data.append("series", formData.series);
    data.append("quantity", formData.quantity);
    data.append("price", formData.price);
    data.append("discount", formData.discount);
    data.append("description", formData.description);
    data.append("reviews", formData.reviews);
    data.append("category", formData.category);
    data.append("shipping_Method", JSON.stringify(formData.shippingData));
    data.append("seo", formData.seo);
   
    data.append("product_type", formData.product_type);
    data.append("availability", formData.availability);
   

    setLoading(true)
    fetch("/api/add_products", {
      method: "POST",
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        props.responseData(data)
        setLoading(false)
        setFormData({})

        toast.success("A new Product has been added .")

      })
      .catch((err) => {
        console.log(err)
        setLoading(false)

      });
  };
  
   

   
    // handle change input
    const handelChange = (event) => {
      setFormData({
        ...formData,
        [event.target.name]: event.target.value,
      });

    };

   

   
    return (
    
        
          <AddNew_Product>

            {loading && (
                 <div className='loader'>
                 <CircularProgress
                   size={25}
                   thickness={4}
                 />
                </div>
            )}
           
            <ToastContainer
                  position="top-right"
                  autoClose={3000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                />
            <Left_container id="useform">
              <div className="exit-button-container">
                <CancelIcon className="exit-button" onClick={CloseAddNewProduct}/>
              </div>
              <div className="wrapper">

               
                <ProductTitle 
                formData = {formData}
                setFormData = {setFormData}
                handelChange = {handelChange}
                
                />
                <Media
                    formData = {formData}
                    setFormData = {setFormData}
                />
                
                <PicsInfo
                      formData = {formData}
                      setFormData = {setFormData}
                />
               
                <Description
                setFormData = {setFormData}
                formData={formData}
                handelChange = {handelChange}/>

              </div>

              
               <Pricing
                formData={formData}
                handelChange = {handelChange}
               
               />
              

              
          <Button
              type="submit"
              onClick={AddNew_Product_submit}
              variant="contained"
              className="submitButton"
              disabled={loading}>

            <span>Add Product</span>
                {loading && (
                <CircularProgress
                  style={{ marginLeft: "3px" }}
                  size={22}
                  thickness={6}
                  value={100}
                />
              )
              }
              
          </Button>
            </Left_container>
            <Right_container>
              
              <Inventory 
                formData={formData}
                handelChange = {handelChange}
                setFormData = {setFormData}
                />

              <Shipping
                formData={formData}
                handelChange = {handelChange}
                setFormData = {setFormData}
                />
              <Organization
                formData={formData}
                handelChange = {handelChange}
                setFormData = {setFormData}
              />
             
              <Variant 
                formData={formData}
                handelChange = {handelChange}
                setFormData = {setFormData}
              
              />

              <Tags
                  formData={formData}
                  handelChange = {handelChange}
                  setFormData = {setFormData}
              />
            </Right_container>
          </AddNew_Product>
       
    );
  }
  export default AddNewProduct;

  const AddNew_Product = styled.div`
     display:flex;
     position:relative;
    
     .loader{
      position:absolute;
      top:50%;
      right:50%;
     }
    
    .submitButton{
        display:flex;
        padding:10px 15px;
        background:goldenrod;
        border-radius:4px;
        color:white;
        font-weight:bold;
        margin:auto;
    }
    .exit-button{
      cursor:pointer;
    }
    
 `
  const Left_container = styled.div`
    flex: 2;
    
    border-radius: 6px;
    padding: 10px;
    margin-right: 10px;

  `;
  const Right_container = styled.div`
 
    
    flex: 0.7;
    .text_input{
      width: 100%;
      background:#fff;
      margin-bottom:15px;
    }
  `
  
  





 
 

 