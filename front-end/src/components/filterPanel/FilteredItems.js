import React,{useEffect, useState} from "react";
import { useSelector , useDispatch} from "react-redux";
import styled from "styled-components";
import Fade from "react-reveal/Fade";
import StarIcon from "@mui/icons-material/Star";
import Spinner from "../Spinner/Spinner";
import {Link } from "react-router-dom"
import { handleSelectCategory } from "../../features/categories/categorySlice";
import NotFound from "./NotFound";
import MenuIcon from '@mui/icons-material/Menu';

function FilteredItems(props) {
  const filteredData = useSelector((state) => state.filteredProduct.filteredData);
  const [loaded, setLoaded] = useState(false)
 const selectCategory = window.localStorage.getItem('selectedCategory')
 const dispatch = useDispatch()
  useEffect(() => {
    dispatch(handleSelectCategory(selectCategory))
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});

    setTimeout(() => {
       setLoaded(true)
    },1000)
    return () => clearTimeout()
    
  
}, [])
 
  const {showingMenu, showMenu} = props;
  return (

    <Product_contianer>
      
       {!showMenu &&(

       <button className="menu_container" onClick={showingMenu}>
              <MenuIcon className="mainMenu" />
        </button>
       )}
      

      {filteredData.length > 1 && (

        <Fade bottom cascade>

          <div className="grid-container">
            {props.filteredData.map((item) => {
              return (
                <div key={item.id} className="product_container">
                  <Link to={"/product_details/" + item.id}>
                    <img src={item.product_images[0]} alt="img" />
                  </Link>
                  <Product_info>
                    <FirstSection>
                      <p className="producttitle">{item.title}</p>
                    </FirstSection>

                    <SeccondSection>
                      <div className="orders">
                        <span>1800 sold</span>
                      </div>
                      <div className="reviews-container">
                        <StarIcon className="star-icon" />
                        <span className="reviews">{item.reviews}</span>
                      </div>
                    </SeccondSection>

                    <ThirthSection>
                      <span className="productprice">${item.price}</span>
                      <span className="productdiscount">
                        {item.discount} %{" "}
                      </span>
                    </ThirthSection>
                  </Product_info>
                </div>
              );
            })}
          </div>
        </Fade>

      )}
      
      {filteredData.length < 1 && loaded === true  && (
          <NotFound/>
        )}
    

    </Product_contianer>
  );
}

export default FilteredItems;
const Product_contianer = styled.div`
   min-width:320px;
  
  .grid-container{
      padding:10px;
      display: grid;
      grid-template-columns: repeat(4,auto);
      gap:15px;
      place-content: center;
      

      img{
        border-image: round;
        width:100%;
        height:215px;
        background-color:rgb(255, 255, 255);
        border-radius: 6px 6px 0 0;
        object-fit:cover;
      }   
}
.product_container{
   padding: 0 0  12px;
   background-color:rgb(250, 250, 250);
   border-radius:8px;
   border:none;
   width:100%;
   box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
}
  .menu_container{
    display:none;
  }
  @media only screen and (max-width: 1024px) {
    .menu_container{
    display:flex;
  }
  
}

@media only screen and (max-width: 1200px) {
  .grid-container{
     
    grid-template-columns: repeat(4,auto);
  }
}

@media only screen and (max-width: 950px) {
  .grid-container{
     
    grid-template-columns: repeat(3, 25%);
  }
  p{
      
      width:100%;
   
  }

  
}
  @media only screen and (max-width: 730px) {
  .grid-container{
      grid-template-columns: repeat(2,auto); 
  }
  .shipping{
    
    top:295px;
  }
}

  @media only screen and (max-width:420px) {
  .grid-container{
     
    grid-template-columns: repeat(2, 50%);
    place-items:center;
    padding:5px;
    grid-gap:5px;
  
  .product_container {
    padding: 0 0 5px;
    background-color: rgb(250, 250, 250);
    border-radius: 6px;
    border: none;
    width:100%;
    min-width: 165px;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
      rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  }
 

      img{
        height:180px;
      }
      p{
        width:100%;
        font-size:11px;
      }
     
    .shipping{
      font-size:10px;
      right:5px;
    
      top:215px;
    }
  }
  }
  
`;
const Product_info = styled.div`
  display: flex;
  align-content: center;
  flex-direction: column;
  padding-left: 10px;
`;
const FirstSection = styled.div`
  p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 13px;
    max-width: 200px;
    margin-top: 0;
  }
`;
const SeccondSection = styled.div`
  display: flex;
  align-items: center;
  .orders {
    font-size: 13px;
  }
  .reviews-container {
    display: flex;
    align-items: center;
    position: absolute;
    right: 10px;
  }
  .reviews {
    font-size: 12px;
  }
  .star-icon {
    color: gold;
    font-size: 18px;
    float: right;
  }
`;
const ThirthSection = styled.div`
  margin-top: 6px;
  .productprice {
    color: blue;
  }
  .productdiscount {
    font-size: 13px;
    text-decoration: line-through;
    color: green;
    margin-left: 20px;
  }
`;
