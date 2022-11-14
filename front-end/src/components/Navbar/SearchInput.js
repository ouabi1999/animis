import React , {useState} from 'react'
import styled from 'styled-components'
import Fade from 'react-reveal/Fade';
import SearchIcon from '@mui/icons-material/Search';
import { handelChangeInput} from '../../features/categories/categorySlice';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from "react-router-dom";
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';

function SearchInput() {
    const dispatch = useDispatch()
   const navigate = useNavigate()
   const [isOpen , setIsOpen] = useState(false)
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
    
  const showSearchInput = () => {
    let search_input = document.querySelector("#input-container")
    let search_icon = document.querySelector("#search-icon")
    let cancel_button = document.querySelector(".cancel-button")
    let container = document.querySelector("#input-container")
    let input = document.querySelector(".input")
    if (search_input.style.display === "flex") {
      search_icon.style.display = "none";
      search_input.style.display = "flex";
      cancel_button.style.display = "flex";




    } else {
      search_icon.style.display = "none";
      search_input.style.display = "flex";
      cancel_button.style.display = "flex";
      input.style.paddingLeft = "45px"
      container.style.position = "absolute"
      container.style.right = "-65px";
      container.style.zIndex = "1";
      setIsOpen(true)
      
        //container.style.left = "-270px"

       

      }
    }

    const hideSearchInput = () =>{
      let search_input = document.querySelector("#input-container")
      let search_icon = document.querySelector("#search-icon")
      let cancel_button = document.querySelector(".cancel-button")
      if (search_input.style.display === "flex"){
         search_input.style.display = "none"
         cancel_button.style.display = "none"
         search_icon.style.display = "flex"
      
    }


    }
    const [searchInput, setSearchInput] = useState('');
    const value  =  useSelector((state) => state.filteredProduct.searchInput);
  return (
    
    <Container >
    
      <Wrapper id='input-container'>
      <Fade top >
        <input type="search" className='input'
          value={value}
          onChange={(e) => handleChange(e.target.value)}

          placeholder="Search For Product"
        />
        <button className="search-btn" onClick={searchButton}>
          <SearchIcon className='search-icon' />
        </button>
        
        <button className = "cancel-button" >
          <DisabledByDefaultIcon onClick={hideSearchInput} className="cancel-icon" />
        </button>
        </Fade>
        
      </Wrapper>

      <SearchIcon onClick={showSearchInput} id="search-icon" />
      
    </Container>
  
  )
}

export default SearchInput
const Container = styled.div`
    position:relative;
    display:flex;
    align-items:center;
#search-icon{
  cursor:pointer;
  color:#fff;
  font-size:28px;
  margin-right:10px;
  justify-content:flex-end;
  display:none;
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
  height:inherit;
  color:#fff;
  
}
.cancel-button{
  display:flex;
  align-items:center;
  position:sticky;
  right:100%;
  display:none;
  height:40px;
  border-radius: 5px 0 0 5px;
}
.cancel-icon{
 
  color:lightgray;
}
@media only screen and (min-width: 600px) {
  /* For tablets: */
  input{
   
  }
   
  
}
@media only screen and (max-width: 768px) {
  /* For mobile phones: */
  
   #search-icon{
    display:flex;
  }
  
 
}

@media only screen and (max-width: 1022px) {
     &{
      display:flex;
     }
  
  
}
      

     
`
const Wrapper = styled.div`
    display:flex;
    position:relative;
    margin-left:40px;
   

      

    input{
        width:40vw;
        min-width:220px;
        height:40px;
        border:none;
        outline:none;
        padding:0 15px;
        border-radius:5px;
       
  

        &:focus{
        outline:2px solid orange;

      };
     
          

   


}

@media only screen and (max-width: 768px) {
  /* For mobile phones: */
  &{
       display:none;
   }

}


`