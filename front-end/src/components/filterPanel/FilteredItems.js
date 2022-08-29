import React,{useEffect} from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Fade from "react-reveal/Fade";
import StarIcon from "@mui/icons-material/Star";
import Spinner from "../Spinner/Spinner";
import {Link } from "react-router-dom"

function FilteredItems(props) {
  const filterResult = useSelector(
    (state) => state.filteredProduct.filteredData
  );

  useEffect(() => {
     // 👇️ scroll to top on page load
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }, [])
  
  return (
    <Product_contianer>
      <Fade bottom cascade>
        
          <div className="grid-container">
            {filterResult.map((item) => {
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
    </Product_contianer>
  );
}

export default FilteredItems;
const Product_contianer = styled.div`
   margin:25px 0;
  .grid-container {
    padding: 10px;
    display: grid;
    grid-template-columns: repeat(4, auto);
    gap: 15px;
    place-content: center;

    img {
      border-image: round;
      width:100%;
      height: 200px;
      background-color: rgb(255, 255, 255);
      border-radius: 6px 6px 0 0;
      object-fit: conatin;
    }
  }
  .product_container {
    padding: 0 0 20px;
    background-color: rgb(250, 250, 250);
    border-radius: 6px;
    border: none;
    width: 210px;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
      rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
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
    width: 170px;
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
