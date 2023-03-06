import React, { useState, useEffect, useMemo, useLayoutEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from "styled-components"
import Fade from "react-reveal/Fade"
import StarIcon from '@mui/icons-material/Star';
import Spinner from '../components/Spinner/Spinner';
import FilterPanel from '../components/filterPanel/FilterPanel';
import FilteredItems from '../components/filterPanel/FilteredItems';
import {
    setCategory,
    setProductType,
    setMinPrice,
    setMaxPrice,
    setSearch,
    setCurrentPage,
    setRatings,
    setFiltredData

  } from '../features/categories/categorySlice';
import NotFound from '../components/filterPanel/NotFound';
import { CircularProgress, Pagination, Stack } from "@mui/material";
import axios from 'axios';


function ProductsFilter() {

  const [showMenu, setShowMenu] = useState(false)

  const {
    ratings,
    filteredData,
    product_type_list,
    category,
    productType,
    minPrice,
    maxPrice,
    search,
    } = useSelector((state) => state.filteredProduct);
    const [products, setProducts] = useState([]);
    const [paginateClicked, setPaginateClicked] = useState("")
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(12);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(false)
 

  const dispatch = useDispatch()
  
  const selectCategory = (value) => {
    dispatch(setCategory(value))
  }
  
  const selectRating = (value) => {
    dispatch(setRatings(value))
    
  }

  const changeChecked = (value) => {
    dispatch(setProductType(value));
  }
  const changePrice = (value) => {
  
   dispatch(setMinPrice(value[0]))
   dispatch(setMaxPrice(value[1]))
  }
 
 

  function handleSubmit() {
   
    setIsLoading(true)
    axios.get('/api/get_filtred_products', {
      params: {
        category: category,
        product_type: productType,
        min_price: minPrice,
        max_price: maxPrice,
        search: search,
        ratings : ratings,
        page: currentPage,
        per_page: perPage
      }
    }).then(response => {
   
      dispatch(setFiltredData(response.data.products))
      console.log(response.data.products)
      setTotalPages(response.data.total_pages);
      
      setIsLoading(false)
    }).catch(error => {
      // handle error
      setIsLoading(false)
      console.log(error)
    });
  }

  const  handlePageChange = (event, value)=> {
    setCurrentPage(value);
    setPaginateClicked(value)
    
  }

 useEffect(() => {
  setCurrentPage(1)
  
 }, [   
        ratings,
        product_type_list,category,
        productType,
        minPrice,
        maxPrice,
        search
    ])
 
  useEffect(() => {
   
    handleSubmit();
    
   
    }, [
        ratings,
        product_type_list,
        category,
        productType,
        minPrice,
        maxPrice,
        search,
        paginateClicked
    ])
  
   
  useEffect(() => {
    window.scrollTo({top: 0, left: 0});
  }, [paginateClicked])
  
        
  
  
 

 
  
  return (

     <Container>
         
         <div>
           <FilterPanel 
             selectedCategory = {category}
             selectedRating = {ratings}
             selectedPrice = {[minPrice, maxPrice]}
             product_type = {product_type_list}
             handleChangeChecked  = {changeChecked}
             handleSelectCategory = {selectCategory}
             handleSelectRating   = {selectRating}
             handleChangePrice    = {changePrice}
    
           />
         </div>
      <div style={{ display: "flex", justifyContent:"center", flexDirection:"column", width:"100%"}}>
      {/* List & Empty View */}
      <div className='filteredItems'>
        {isLoading === false ? (


          <FilteredItems
            filteredData={filteredData}
          />

        ) :
          <div style={{ display: "flex", justifyContent: "center", marginTop: "100px" }}>
            <CircularProgress
              size={25}
              thickness={4}

            />

          </div>}
      </div>

      <div style={{ display: "flex", margin: "10px 0", justifyContent: "center", width: "100%" }}>
        <Stack spacing={2}>
          <Pagination onChange={handlePageChange} page={currentPage} count={totalPages} variant="outlined" shape="rounded" />
        </Stack>
      </div>
      </div>
    </Container>
  )

}

export default ProductsFilter
const Container = styled.div`
     display:flex;
  
    
    .filterPanel{
      position:relative;
      z-index:1;
      flex:0.5;
      
      
  
    }
   
   
     .filteredItems{
         flex:2;
         min-height:200px;
     }

    .show{
       display:flex
    }

    .hide{
      display:none;
    }
    @media only screen and (min-width: 1022px) {
    
    .hide{
       display:flex;
    }
    .filterPanel{
      display:flex;
      
    }
  }

  
  @media only screen and (max-width: 1024px) {
  
    
  }
     @media only screen and (max-width: 780px) {
    /* For mobile phones: */
      
    &{
       display:flex;
       flex-direction:column;
       width:100%;
    }
    .filterPanel{
      flex:0;
    }
   
  }

    
`

