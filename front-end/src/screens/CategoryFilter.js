import React, { useState } from 'react'
import { useSelector } from 'react-redux'

function CategoryFilter() {
  const filterResult = useSelector(state=> state.filteredProduct.data)
  
  return (
    <div>
        {filterResult?.map(item =>{
          return(
           <div>
            <span>
              {item.price}
              
            </span>
            </div>
          )
        }
      )}
    </div>
  )
}

export default CategoryFilter