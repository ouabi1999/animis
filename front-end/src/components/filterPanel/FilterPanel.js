import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { handleChangeChecked, handleChangePrice, handleSelectCategory, handleSelectRating } from '../../features/categories/categorySlice'
import CheckboxProton from './controls/CheckboxProton'
import FilterCategoryToggle from './controls/FilterCategoryToggle'
import RatinigFilterToggle from './controls/RatinigFilterToggle'
import SliderProton from './controls/SliderProton'

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
  } = props;
    return (
        <Container>

            <div>
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
    
     padding:2px 15px; 
    .checkbox-list{
        display:grid;
        grid-template-columns: auto auto;
        gap: 10px;
    }
    




`
