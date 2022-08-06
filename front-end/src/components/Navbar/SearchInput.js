import React , {useState} from 'react'
import styled from 'styled-components'
import SearchIcon from '@mui/icons-material/Search';
import { handelChangeInput} from '../../features/categories/categorySlice';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from "react-router-dom";

function SearchInput() {
    const dispatch = useDispatch()
   const navigate = useNavigate()
    const  handleChange = (e)=>{
        dispatch(handelChangeInput(e))
           
    }
   const  searchButton = ()=>{
       if(!value.length){
         return ""
       }
       else{
        navigate("/category")
        dispatch(handelChangeInput())
       }
      
        
    }
    const [searchInput, setSearchInput] = useState('');
    const value  =  useSelector((state) => state.filteredProduct.searchInput);
  return (
      <Container>
          <input type="search"
              value = {value}
              onChange = {(e) =>  handleChange(e.target.value)}
              
              placeholder = "Search For Product"
          />
          <button className="search-btn" onClick ={searchButton}>
              <SearchIcon className='search-icon' />
          </button>
      </Container>
  )
}

export default SearchInput
const Container = styled.div`
    display:flex;
    position:relative;
    margin-left:10px; 
input{
    width:40rem;
    height:40px;
    border:none;
    outline:none;
    padding:0 10px;
    border-radius:5px;
    &:focus{
      outline:2px solid orange;
    }

}
.search-btn{
  background:orange;
  display:flex;
  align-items:center;
  justify-content:flex-end;
  position:relative;
  right:40px;
  border-radius:0px 5px 5px 0px;
  width:40px;
}


     
`