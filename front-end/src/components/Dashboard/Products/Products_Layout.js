import React, { Component, createRef, useEffect, useRef, useState } from 'react'
import styled from 'styled-components';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import AdminProducts from './Admin_Products';
import AddNewProduct from './addNewProduct/Add_New_Product';
import EditProductLyout from './editProduct/EditProductLyout';
import { Stack } from '@mui/system';
import { Pagination } from '@mui/material';
import axios from 'axios';
import HeadeSeo from '../../../common/Heade';

export default function ProductsLayout(){
   
    const imgInput = createRef()
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const PER_PAGE = 20;
    const [totalProucts, setTotalProucts] = useState(0)
    const [totalPages, setTotalPages] = useState(1)
    const scrollRef = useRef()

    const [formData, setFormData] = useState({

        is_addNewProduct_open :false,
        products:[],
        AdminProducts:true,
        slectedProduct: null,
        selectedEditProduct:false,
        dashProduct_details:null,
        isUpdated: null,
        loaded : false
        })
        
    
    const responseData = (data) =>{
        setFormData({
            ...formData,
            products: data

        })
    }
    
    useEffect(() => {
        setLoading(true)
        axios.get('/api/get_dashboard_products', { params: {currentPage, per_page: PER_PAGE } })
          .then(response => {
            setLoading(false)
            setFormData({...formData, products : response.data.products});
            setTotalProucts(response.data.total_products);
            setTotalPages(response.data.total_pages)
            
          })
          .catch(error => {
            setLoading(false)
            console.error(error);
          });
        
        
      }, [currentPage]);
      

    const updatedProduct = (editedProduct) =>{
        const newProducts = formData.products.map(product=>{
            if(editedProduct.id === product.id){
               return editedProduct
            }else{
                return product
            }
        })
        setFormData({
            ...formData,
            products:newProducts,
            isUpdated:true,
        })

    }

    

   const OpenAddNewProduct =()=>{
        setFormData({
            ...formData,
            is_addNewProduct_open:true,
            AdminProducts : null ,

        })
        
    }
    
    const CloseAddNewProduct =()=>{
        setFormData({
            ...formData,
            is_addNewProduct_open:false,
            AdminProducts : true,
        })
    }
    
    const deleteProduct =  (id)=>{
        setFormData({
            ...formData,
           products:formData.products.filter((x) => x.id !== id)
        })
        fetch(`/delete/${id}`,{
            method:"DELETE",
            
         }).then(response=> response.json())
         .catch(err => console.log(err))
        
    }
      // show product details
 const openModal = (product) => {
    setFormData({...formData, slectedProduct: product });
  }
  /// close product details
  const closeModal = () => {
    setFormData({
        ...formData,
      product: null,
      index: 0,
    })

  }

 const open_Edit_Modal = (Editproduct)=>{
    setFormData({
    ...formData,
    selectedEditProduct:Editproduct,
    AdminProducts:false,

     
   })
  }
  const close_Edit_Modal = () =>{
    setFormData({
      ...formData,
      selectedEditProduct:false,
      AdminProducts:true,
      
    })
   }
   
   const handleChange = (event, value) => {
    setCurrentPage(value);
    scrollRef.current?.scrollIntoView({ behavior: "auto"})
     };
   
    return (
            <div ref={scrollRef}>
                <HeadeSeo title = "Dashboard / products"/>
                {formData.AdminProducts === true && (
               <>
                    <AdminProducts
                        products={formData.products}
                        loaded={loading}
                        openModal={openModal}
                        deleteProduct={deleteProduct}
                        open_Edit_Modal={open_Edit_Modal}
                        OpenAddNewProduct={OpenAddNewProduct}
                        AdminProducts={formData.AdminProducts}

                    />
                    
                    <div style={{display:"flex",margin:"10px 0", justifyContent:"center", width:"100%"}}>
                    <Stack spacing={2}>
                      <Pagination  onChange = {handleChange}  count={totalPages} variant="outlined" shape="rounded" />
                    </Stack>
                </div>
                </>
                )}
                {formData.is_addNewProduct_open && (
                <AddNewProduct
                    CloseAddNewProduct = {CloseAddNewProduct}
                    products = {formData.products}
                    responseData = {responseData}
                    is_addNewProduct_open = {formData.is_addNewProduct_open}
                      
                />
                )}
                
               

                {formData.selectedEditProduct &&(

                <EditProductLyout 
                    close_Edit_Modal = {close_Edit_Modal}
                    selectedEditProduct = {formData.selectedEditProduct}
                    updatedProduct = {updatedProduct}
                />
                )}
            </div>
        )

    }

