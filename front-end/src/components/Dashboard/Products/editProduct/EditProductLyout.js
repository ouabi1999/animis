import React, { Component, useState, createRef, useEffect, useLayoutEffect } from 'react'
import styled from 'styled-components';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Button, InputLabel, MenuItem, OutlinedInput, TextField } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { ToastContainer, toast } from 'react-toastify';
import CircularProgress from '@mui/material/CircularProgress';
import EditTags from './EditTags';
import EditInventory from './EditInventory';
import EditPricing from './EditPricing';
import EditDescription from './EditDescription';
import EditShipping from './EditShipping';
import EditOrganization from './EditOrganization';
import EditVariant from './EditVariant';
import EditProductTitle from './EditProductTitle';
import EditMedia from './EditMedia';
import EditPicsInfo from './EditPicsInfo';





function EditProductLyout(props) {

    const [formData, setFormData] = useState({
      sizes: [],
      colors: [],
      series:"",
      price: "",
      discount: "",
      quantity: "",
      title: "",
      description: "",
      reviews: "", 
      availability: "",
      product_type:"",
      pics_info : [],
      seo : "",
      category: "",
      tags: [],
      products: [],
      shippingData: [],
      id : "",
      globalCoupon:"",
      coupon:""
    });
    const [loading , setLoading] = useState(false)
    const [isUpdated , setIsUpdated] = useState(false)
    const [hasError , setHasError] = useState(false)
    

    const  {
      availability,
      category,
      colors,
      description,
      discount,
      globalCoupon,
      id,
      pics_info,
      price,
      product_images,
      product_type,
      quantity,
      ratings,
      reviews,
      seo,
      shippingInfo,
      sizes,
      tags,
      title,
      series,
      coupon
      } = props.selectedEditProduct; 

    

         
          
       
    /// UPDATE products info API;
    const Update_Product_submit = () => {
      setLoading(true)
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

      fetch(`/editproduct/${formData.id}`,{
          method: "PUT",
          body: data,
      }).then(response => response.json())

      .then(data => {
        props.updatedProduct(data)
        setLoading(false);
        setIsUpdated(true);
        setHasError(false);
        toast.success("product have been updated")
      })

      .catch(error => {
        console.log(error.message)
        setLoading(false);
        setHasError(true);
        setIsUpdated(false);
        toast.error("Oops an error accourd")
      
      })
  
  }
 
    useEffect(() => {
      console.log(props.selectedEditProduct)
      setFormData({
        ...formData,
        id : id,
        category:category,
        colors:colors,
        description : description,
        series:series,
        discount:discount,
        globalCoupon:globalCoupon,
        coupon:coupon,
        pics_info : pics_info,
        price: price,
        product_images:product_images,
        product_type:product_type,
        quantity:quantity,
        ratings:ratings,
        reviews:reviews,
        seo:seo,
        shippingData:shippingInfo,
        sizes:sizes,
        tags:tags,
        title:title,
        availability:availability,
       
      })
            
  }, [props])
   
    // handle change input
    const handelChange = (event) => {
      setFormData({
        ...formData,
        [event.target.name]: event.target.value,
      });

    };

   

   
    return (
      <Container>
        <div className="buttons-container">
          <CancelIcon className="exit-button" onClick={props.close_Edit_Modal} />
          <button
            type="submit"
            onClick={Update_Product_submit}
            className="submitButton"
            disabled = {loading === true ? true : false}
          >
             <span>UPDATE</span>
            {loading === true ? <CircularProgress  className="progres" size={18} thickness={4} /> : "" }
          </button>
        </div>
          <Edit_Product>

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
              
              <div className="wrapper">

               
                <EditProductTitle 
                    formData = {formData}
                    setFormData = {setFormData}
                    handelChange = {handelChange}
                
                />
                <EditMedia
                    formData = {formData}
                    setFormData = {setFormData}
                />
                
                <EditPicsInfo
                    formData = {formData}
                    setFormData = {setFormData}
                />
               
                

              </div>

              
               <EditPricing
                    formData={formData}
                    handelChange = {handelChange}
               
               />
               
              <EditDescription
                    setFormData = {setFormData}
                    formData={formData}
                    handelChange = {handelChange}
                  />

              
            </Left_container>
            <Right_container>
              
             

              <EditShipping
                formData={formData}
                handelChange = {handelChange}
                setFormData = {setFormData}
                />
              <EditOrganization
                formData={formData}
                handelChange = {handelChange}
                setFormData = {setFormData}
              />
              <EditInventory 
                  formData={formData}
                  handelChange = {handelChange}
                  setFormData = {setFormData}
                />
              <EditVariant 
                formData={formData}
                handelChange = {handelChange}
                setFormData = {setFormData}
              
              />

              <EditTags
                  formData={formData}
                  handelChange = {handelChange}
                  setFormData = {setFormData}
              />
            </Right_container>
           
          </Edit_Product>
         
      </Container>
    );
  }
  export default EditProductLyout;
  const Container = styled.div`
      .submitButton{
        display:flex;
        align-items:center;
        justify-content:center;
        padding:10px 15px;
        background:goldenrod;
        border-radius:4px;
        color:white;
        font-weight:bold;
        
    }
    .progres{
      margin-left:5px;
    }
    .buttons-container{
      display:flex;
      justify-content:space-between;
    }
    .exit-button{
      cursor:pointer;
    }
  `
  const Edit_Product = styled.div`
     display:flex;
     position:relative;
    
     
    
   
   
    
 `
  const Left_container = styled.div`
    flex: 2;
    
    border-radius: 6px;
    padding: 10px;
    margin-right: 10px;

  `;
  const Right_container = styled.div`
    padding: 10px;
    
    flex: 0.7;
    margin-top:25px;
    .text_input{
      width: 100%;
      background:#fff;
      margin-bottom:15px;
    }
  `
  
  





 
 

 