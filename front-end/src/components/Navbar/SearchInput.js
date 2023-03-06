import React , {useState} from 'react'
import styled from 'styled-components'
import Fade from 'react-reveal/Fade';
import SearchIcon from '@mui/icons-material/Search';
import {setCategory, setProductType, setRatings, setSearch} from '../../features/categories/categorySlice';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from "react-router-dom";


function SearchInput() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [searchValue, setSearchValue] = useState("")
  const [required, setRequired] = useState(false)

  const handleChange = (value) => {
     setSearchValue(value)

  }
  const handleSearchSubmit =()=>{
    if (searchValue !== ""){
      dispatch(setCategory(""))
      dispatch(setProductType(""))
      dispatch(setRatings(""))
      dispatch(setSearch(searchValue))
      navigate("/category")
    }else{
      setRequired(true)
    }
    
  }


  return (

    <SearchContainer >
      <Wrapper>
      <Fade top >
        
          <input type="search" className='input' style={required ? {border:"1px solid red"}:{}}
            value={searchValue}
            onChange={(e) => handleChange(e.target.value)}
            onMouseDown={()=> setRequired(false)}
            placeholder="Search For Product"
            
           
     
          />
          <button className="search-btn" onClick={handleSearchSubmit}>
            <SearchIcon className='search-icon' />
          </button>
      
      </Fade>
      </Wrapper>

      <Fade top >
        <div className='mobile-input'>
          <input type="search" className='input'
               value={searchValue}
               onChange={(e) => handleChange(e.target.value)}
               placeholder="Search For Product"
            
      
          />
          <button className="search-btn-mobile"  onClick={handleSearchSubmit}>
            <SearchIcon className='search-icon' />
          </button>
        </div>
      </Fade>
    </SearchContainer>

  )
}

export default SearchInput
const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;


#search-icon{
  cursor:pointer;
  color:#fff;
  font-size:28px;
   
   display:none;
   
   
}
.search-btn{
  background:orange;
  display:flex;
  align-items:center;
  justify-content:flex-end;
  position:relative;
  border-radius:0px 5px 5px 0px;
  width:40px;
  height:inherit;
  color:#fff;
  
}




@media only screen and (max-width: 1022px) {
     &{
      display:flex;
     }
  
  
}
      
.mobile-input{
  display:none;
  width:100%;
  position:absolute;
 
  left:0%;
  top:-70%;
  input{
      width:100%; 
      height:40px;
      border:none;
      outline:none;
      padding:0 15px;
     
    
      &:focus{
        outline:1px solid orange;

      };
    }

    .search-btn-mobile{
  background:orange;
  display:flex;
  align-items:center;
  justify-content:flex-end;
  position:relative;
  border-radius:0;
  width:40px;
  height:inherit;
  color:#fff;
  
}

}

@media only screen and (max-width: 768px) {
  /* For mobile phones: */
  
   #search-icon{
    display:flex;
  }

  .mobile-input{
    display:flex;
   }

  
 
}
     
`
const Wrapper = styled.div`
    display:flex;
    width:45vw;
    max-width:600px;
    min-width:100px;
    height: 40px;
   

   
  
      

    input{
        width:100%;
        
        height:40px;
        border:none;
        outline:none;
        padding:0 15px;
        border-radius:5px 0 0 5px;
       
  

        &:focus{
        outline:1px solid orange;

      };
     
          

   


}

@media only screen and (max-width: 768px) {
  /* For mobile phones: */
  &{
     
        display:none;
   }
 
}


`