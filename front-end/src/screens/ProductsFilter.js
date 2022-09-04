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
 
            
  
/*
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState([5, 200]);

  const [product_type, setProduct_type] = useState([
    { id: 1, checked: false, label: 't-shirt' },
    { id: 2, checked: false, label: 'shirt' },
    { id: 3, checked: false, label: 'rings' },
    { id: 4, checked: false, label: 'braclet' },
    { id: 5, checked: false, label: 'key-chain' },
    { id: 6, checked: false, label: 'earring' },
  ],);

  const [list, setList] = useState(dataList);
  const [resultsFound, setResultsFound] = useState(true);
  const [searchInput, setSearchInput] = useState('');

  const handleSelectCategory = (event, value) =>
    !value ? null : setSelectedCategory(value);

  const handleSelectRating = (event, value) =>
    !value ? null : setSelectedRating(value);

  const handleChangeChecked = (id) => {
    const product_type_list = product_type;
    const CheckedProduct_type = product_type_list.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setProduct_type(CheckedProduct_type);
  };

  const handleChangePrice = (event, value) => {
    setSelectedPrice(value);
  };

  const applyFilters = () => {
    let updatedList = dataList;

    // Rating Filter
    if (selectedRating) {
      updatedList = updatedList.filter(
        (item) => parseInt(item.rating) === parseInt(selectedRating)
      );
    }

    // Category Filter
    
    if (selectedCategory === "all") {
      updatedList = dataList
     
     
    }else{
      updatedList = updatedList.filter(
        (item) => item.category === selectedCategory
      )
    }

    // product type Filter
    const product_type_checked = product_type.slice()
      .filter((item) => item.checked)
      .map((item) => item.label.toLowerCase());

    if (product_type_checked.length) {
     
      updatedList = dataList.filter((item) =>
      product_type_checked.includes(item.product_type)
      );
    }

    // Search Filter
    if (searchInput) {
      updatedList = updatedList.filter(
        (item) => item.title.toLowerCase().search(searchInput.toLowerCase().trim()) !== -1
      );
    }

    // Price Filter
    const minPrice = selectedPrice[0];
    const maxPrice = selectedPrice[1];

    updatedList = updatedList.filter(
      (item) => item.price >= minPrice && item.price <= maxPrice
    );

    setList(updatedList);


    !updatedList.length ? setResultsFound(false) : setResultsFound(true);
  };*/
  
  const innerFunction = useCallback(() => {
    // do something!
    dispatch(handleSelectCategory())
},[4]);
useEffect(() => {


    

 
  
},[])


 

 
  
  return (

     <Container>
         <div className='filterPanel'>
           <FilterPanel 
             selectedCategory = {selectedCategory}
             selectedRating = {selectedRating}
             selectedPrice = {selectedPrice}
             product_type = {product_type_list}
             handleChangeChecked  = {changeChecked}
             handleSelectCategory = {selectCategory}
             handleSelectRating   = {selectRating}
             handleChangePrice    = {changePrice}

           
           />
         </div>
         
          {/* List & Empty View */}
        <div className='filteredItems'>
        {isLoading === false && hasError === false   ? (
          
          
          <FilteredItems filteredData={filteredData} />
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
    .filterPanel{
      position:sticky;
      top:10%;
      bottom:0;
      height: calc(100vh - 80px);
      overflow-y:scroll;
      
       flex:0.5;
       background:#fff;
       padding:10px;

     
       ::-webkit-scrollbar {
         width: 6px;
       }
       
     
       ::-webkit-scrollbar-track {
         box-shadow: inset 0 0 5px grey; 
         border-radius: 10px;
       }
        
    
       ::-webkit-scrollbar-thumb {
         background: gray; 
         border-radius: 10px;
       }
       
       
       ::-webkit-scrollbar-thumb:hover {
         background: lightgray;
       }
      
      
       

    }
     .filteredItems{
         flex:2;
     }

    
`
 /* const selectedCategory = useSelector(state=> state.filteredProduct.selectedCategory)
   
  const selectedRating = useSelector(state=> state.filteredProduct.selectedRating)
  const selectedPrice = useSelector(state=> state.filteredProduct.selectedPrice )
  const product_type_list = useSelector(state=> state.filteredProduct.product_type_list )
  const resultsFound = useSelector(state=> state.filteredProduct.resultsFound)
  const list = useSelector(state=> state.filteredProduct.filetredData)
  const searchInput = useSelector(state=> state.filteredProduct.fsearchInput)
  */