import React, { useState, useEffect, useMemo, useLayoutEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from "styled-components"
import Fade from "react-reveal/Fade"
import StarIcon from '@mui/icons-material/Star';
import Spinner from '../components/Spinner/Spinner';
import FilterPanel from '../components/filterPanel/FilterPanel';
import FilteredItems from '../components/filterPanel/FilteredItems';
import { applyFilters, getProductsDetails, handleChangeChecked, handleChangePrice, handleSelectCategory, handleSelectRating } from '../features/categories/categorySlice';
import NotFound from '../components/filterPanel/NotFound';
import { CircularProgress } from "@mui/material";


function ProductsFilter() {

  const products = useSelector((state) => state.products.products)
  const [showMenu, setShowMenu] = useState(false)

  const {
      selectedCategory,
      selectedRating, 
      searchInput, 
      selectedPrice,
      product_type_list,
      isLoading, hasError, filteredData
    
    } = useSelector((state) => state.filteredProduct);
 

  const dispatch = useDispatch()
  
  const selectCategory = (value) => {
    dispatch(handleSelectCategory(value))
  }
  const selectRating = (value) => {
    dispatch(handleSelectRating(value))
  }
  const changeChecked = (value) => {
    dispatch(handleChangeChecked(value))
  }
  const changePrice = (value) => {
    dispatch(handleChangePrice(value))
  }
 
            
  
  
  const innerFunction = useCallback(() => {
    // do something!
    dispatch(handleSelectCategory())
},[4]);
useEffect(() => {


    

 
  
},[])

const showingMenu = ()=>{
  setShowMenu(true)
}
const hideMenu = () =>{
  setShowMenu(false)
}
 

 
  
  return (

     <Container>
         
         <div className={`filterPanel ${showMenu ? "show" : "hide"}`}  /*style={{display:`${showMenu ? "flex" : "none"}`}}*/>
           <FilterPanel 
             selectedCategory = {selectedCategory}
             selectedRating = {selectedRating}
             selectedPrice = {selectedPrice}
             product_type = {product_type_list}
             handleChangeChecked  = {changeChecked}
             handleSelectCategory = {selectCategory}
             handleSelectRating   = {selectRating}
             handleChangePrice    = {changePrice}
             hideMenu = {hideMenu}
             showMenu = {showMenu}

           
           />
         </div>
          
          {/* List & Empty View */}
        <div className='filteredItems'>
        {isLoading === false && hasError === false   ? (
          
          
          <FilteredItems
           filteredData = {filteredData}
           showingMenu = {showingMenu}
           showMenu = {showMenu}
           
           />
        ) : isLoading === true ?
          <div style={{ display: "flex", justifyContent: "center", marginTop: "100px" }}>
            <CircularProgress
              size={25}
              thickness={4}
             
            />

          </div> : hasError === true && <div>an error accord in the server</div>}
      </div>


    </Container>
  )

}

export default ProductsFilter
const Container = styled.div`
     display:flex;
     min-height:calc(100vh - 90px);
    .filterPanel{
      position:relative;
      z-index:1;
      flex:0.5;
      
      
  
    }
   
   
     .filteredItems{
         flex:2;
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
  
    .filterPanel{
      position:fixed;
      width:320px;
      transition: width 0.8s;
    }
  }
     @media only screen and (max-width: 1000px) {
    /* For mobile phones: */
      
     
   
  }

    
`

