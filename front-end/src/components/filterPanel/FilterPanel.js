import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { handleChangeChecked, handleChangePrice, handleSelectCategory, handleSelectRating } from '../../features/categories/categorySlice'
import CheckboxProton from './controls/CheckboxProton'
import FilterCategoryToggle from './controls/FilterCategoryToggle'
import RatinigFilterToggle from './controls/RatinigFilterToggle'
import SliderProton from './controls/SliderProton'
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
function FilterPanel(props){
  const list = useSelector((state) => state.filteredProduct.filteredData);

  useEffect(() => {
  
     // 👇️ scroll to top on page load
     window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }, [list]);

      const ratingList = [
        {
          id: 1,
          value: '1',
          label: '1🌟',
        },
        {
          id: 2,
          value: '2',
          label: '2🌟',
        },
        {
          id: 3,
          value: '3',
          label: '3🌟',
        },
        {
          id: 4,
          value: '4',
          label: '4🌟',
        },
        {
          id: 5,
          value: '5',
          label: '5🌟',
        },
      ];
  const {
    selectedCategory,
    selectedRating,
    selectedPrice,
    product_type,
    handleChangeChecked,
    handleSelectCategory,
    handleSelectRating,
    handleChangePrice,
    hideMenu,
    showMenu
  } = props;

  
    return (
        <Container>
           
            
              

               <div>
                <DisabledByDefaultIcon onClick={hideMenu} className="icon" />
                <div className='category-input-group'>
                    <p className='label'>Category</p>
                    <FilterCategoryToggle
                      selectedCategory = {selectedCategory}
                      handleSelectCategory={handleSelectCategory}
                    />

                </div>
                <div className='input-group'>
                    <p className='label'>Product type</p>
                    <div className='checkbox-list'>
                      <CheckboxProton 
                        handleChangeChecked = {handleChangeChecked}
                        product_type ={product_type}                       
                      />

                    </div>
                </div>
                <div className='input-group'>
                    <p className='label-range'>Price Range</p>
                    <SliderProton
                        value={selectedPrice} 
                        
                        handleChangePrice = {handleChangePrice}
                       />
                </div>
                <div className='input-group'>
                    <p className='label'>Star Rating</p>
                    <RatinigFilterToggle
                        options={ratingList}
                        value={selectedRating}
                        handleSelectRating = {handleSelectRating}
                        
                    />
                </div>
            </div>
            

        </Container>
    )
}

export default FilterPanel 
const Container = styled.div`
      position:sticky;
      top:10%;
      bottom:0;
      height: calc(100vh - 80px);
      overflow-y:scroll;
      background:#fff;
      padding:10px 20px; 

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
      
    .checkbox-list{
        display:grid;
        grid-template-columns: auto auto;
        gap: 10px;
    }
    @media only screen and (min-width: 1022px) {
      .icon{
      display:none;
    }
    
  }
 
    



`
